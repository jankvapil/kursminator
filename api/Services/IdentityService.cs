using api.GraphQL.Logins;
using api.Options;
using CourseApi.Data;
using CourseApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace api.Services
{
    public class IdentityService
    {
        private readonly FacebookAuthService facebookAuthService;
        private readonly SmtpService smtpService;

        public IdentityService(FacebookAuthService facebookAuthService, SmtpService smtpService)
        {
            this.facebookAuthService = facebookAuthService;
            this.smtpService = smtpService;
        }

        public async Task<string> FbLoginAsync(AppDbContext context, JwtSettings jwtSettings, FacebookAuthSettings facebookAuthSettings, string accessToken)
        {
            var validatedTokenResult = await facebookAuthService.ValidateAccessTokenAsync(accessToken, facebookAuthSettings);

            if (!validatedTokenResult.Data.IsValid)
                throw new HttpRequestException("Invalid Facebook token", null, HttpStatusCode.BadRequest);

            var userInfo = await facebookAuthService.GetUserInfoAsync(accessToken);

            if (userInfo.Email is null)
                throw new HttpRequestException("Email is required", null, HttpStatusCode.BadRequest);

            var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Email == userInfo.Email);

            if (existingUser == default)
            {
                var newUser = new User
                {
                    Email = userInfo.Email,
                    Name = userInfo.FirstName,
                    Surname = userInfo.LastName,
                    PhotoUrl = userInfo.Picture.Data.Url.OriginalString,
                    Unregistred = false,
                    RoleId = 1  // id role user
                };

                await context.Users.AddAsync(newUser);
                await context.SaveChangesAsync();

                _ = smtpService.Send(context, newUser.Id, 1, "Potvzení registrace na protálu Kursminátor", Array.Empty<string>());

                return await generateJwtTokenAsync(newUser, jwtSettings, context);
            }

            return await generateJwtTokenAsync(existingUser, jwtSettings, context);
        }

        private async Task<string> generateJwtTokenAsync(User user, JwtSettings jwtSettings, AppDbContext context)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim("email", user.Email),
                    new Claim("id", user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddYears(1), // aby se nemusel rešit refresh token
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var userRole = user.RoleId;
            if (userRole != default)
            {
                var role = await context.Roles.FindAsync(userRole);
                tokenDescriptor.Subject.AddClaim(new Claim("role", role.Name));
            }

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
