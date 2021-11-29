using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using CourseApi.Data;
using Microsoft.EntityFrameworkCore;
using CourseApi.GraphQL;
using GraphQL.Server.Ui.Voyager;
using api.GraphQL.Courses;
using api;
using api.GraphQL.Instructors;
using api.GraphQL.Users;
using api.GraphQL.Places;
using api.GraphQL.UserCourseFavourites;
using api.GraphQL.UserCourseReservations;
using api.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using api.Services;
using Microsoft.AspNetCore.Http;
using api.GraphQL;
using api.GraphQL.Logins;
using api.GraphQL.Emails;
using Graph.ArgumentValidator;

namespace CourseApi
{
    public class Startup
    {
        private readonly IConfiguration Configuration;

        public Startup(IConfiguration config)
        {
            Configuration = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("DefaultPolicy", builder =>
                {
                    builder.AllowAnyHeader()
                           .WithMethods("GET", "POST")
                           .WithOrigins("*");
                });
            });

            services.AddPooledDbContextFactory<AppDbContext>(opt => opt.UseSqlite(Configuration.GetConnectionString("Database")))
                .AddGraphQLServer()
                .AddArgumentValidator()
                .AddQueryType<Query>()
                .AddType<CourseType>()
                .AddMutationType<Mutation>()
                .AddTypeExtension<CourseMutations>()
                .AddTypeExtension<InstructorMutations>()
                .AddTypeExtension<UserMutations>()
                .AddTypeExtension<PlaceMutations>()
                .AddTypeExtension<UserCourseFavouriteMutations>()
                .AddTypeExtension<UserCourseReservationMutations>()
                .AddTypeExtension<LoginMutations>()
                .AddTypeExtension<EmailMutations>()
                .AddErrorFilter<ErrorFilter>()
                .AddProjections()
                .AddFiltering()
                .AddAuthorization();

            // email sending
            services.Configure<GmailSettings>(Configuration.GetSection(nameof(GmailSettings)));
            services.AddScoped<SmtpService>();

            // jwt
            services.Configure<JwtSettings>(Configuration.GetSection(nameof(JwtSettings)));
            services.AddAuthentication(configuration =>
            {
                configuration.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                configuration.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                configuration.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(configuration =>
                {
                    configuration.SaveToken = true;
                    configuration.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("JwtSettings").GetSection("Secret").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        RequireExpirationTime = false,
                        ValidateLifetime = true
                    };

                });
            services.AddScoped<IdentityService>();

            //fcb
            services.Configure<FacebookAuthSettings>(Configuration.GetSection(nameof(FacebookAuthSettings)));
            services.AddHttpClient();
            services.AddScoped<FacebookAuthService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseCors("DefaultPolicy");

            app.UseRouting();

            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
            });

            app.UseGraphQLVoyager(new VoyagerOptions()
            {
                GraphQLEndPoint = "/graphql"
            }, "/voyager");
        }
    }
}
