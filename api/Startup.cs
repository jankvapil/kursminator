using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using CourseApi.Data;
using Microsoft.EntityFrameworkCore;
using CourseApi.GraphQL;
using GraphQL.Server.Ui.Voyager;
using API.GraphQL;
using api.GraphQL.Courses;
using api;
using api.GraphQL.Instructors;
using api.GraphQL.Users;
using api.GraphQL.Places;
using api.GraphQL.UserCourseFavourites;
using api.GraphQL.UserCourseReservations;

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
            
            // services.AddDbContext<AppDbContext>(opt => opt.UseSqlite(Configuration.GetConnectionString("Database")));
            services.AddPooledDbContextFactory<AppDbContext>(opt => opt.UseSqlite(Configuration.GetConnectionString("Database")))
                .AddGraphQLServer()
                .AddQueryType<Query>()
                .AddMutationType<Mutation>()
                .AddTypeExtension<CourseMutations>()
                .AddTypeExtension<InstructorMutations>()
                .AddTypeExtension<UserMutations>()
                .AddTypeExtension<PlaceMutations>()
                .AddTypeExtension<UserCourseFavouriteMutations>()
                .AddTypeExtension<UserCourseReservationMutations>()
                .AddErrorFilter<ErrorFilter>()
                .AddProjections()
                .AddFiltering();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseCors("DefaultPolicy");
            app.UseRouting();

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
