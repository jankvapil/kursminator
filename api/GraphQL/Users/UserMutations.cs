using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace api.GraphQL.Users
{
    [ExtendObjectType(name: "Mutation")]
    public class UserMutations
    {
        [UseDbContext(typeof(AppDbContext))]
        //[Authorize(Roles = new[] { "Manager", "Admin" })]
        public async Task<User> UpdateUserAsync([ScopedService] AppDbContext context, int id, UpdateUserInput input)
        {
            if (id != input.Id)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.BadRequest);

            var userExists = context.Users.Any(c => c.Id == id);
            if (!userExists)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            var userUpdated = new User
            {
                Id = input.Id,
                Name = input.Name,
                Surname = input.Surname,
                Email = input.Email,
                PhotoUrl = input.PhotoUrl,
                RoleId = input.RoleId,
                Credits = input.Credits
            };

            context.Users.Update(userUpdated);
            await context.SaveChangesAsync();

            return userUpdated;
        }

        [UseDbContext(typeof(AppDbContext))]
        //[Authorize(Roles = new[] { "User" })]
        public async Task<User> UpdateCurrentUserAsync([ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor, UpdateCurrentUserInput input)
        {
            var contextUser = contextAccessor.HttpContext.User;
            if (!contextUser.Identity.IsAuthenticated)
                throw new HttpRequestException("No user is logged in", null, HttpStatusCode.Unauthorized);

            var userId = int.Parse(contextUser.FindFirstValue("id"));
            if (userId != input.Id)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.BadRequest);

            var currentUser = await context.Users.FindAsync(userId);
            if (currentUser is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            currentUser.Name = input.Name;
            currentUser.Surname = input.Surname;
            currentUser.PhotoUrl = input.PhotoUrl;

            context.Users.Update(currentUser);
            await context.SaveChangesAsync();

            return currentUser;
        }


        [UseDbContext(typeof(AppDbContext))]
        //[Authorize(Roles = new[] { "Manager", "Admin" })]
        public async Task<int> DeleteUserAsync([ScopedService] AppDbContext context, int id)
        {
            var user = await context.Users.FindAsync(id);

            if (user is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            context.Users.Remove(user);
            await context.SaveChangesAsync();

            return user.Id;
        }

        [UseDbContext(typeof(AppDbContext))]
        //[Authorize(Roles = new[] { "Manager", "Admin" })]
        public async Task<int> AddUserCredist([ScopedService] AppDbContext context, int userId, int credits)
        {
            var user = context.Users.Find(userId);
            if (user is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            user.Credits += credits;

            if (user.Credits < 0)
                throw new HttpRequestException("User cannot have a negative number of credits.", null, HttpStatusCode.BadRequest);

            await context.SaveChangesAsync();

            return user.Credits;

        }
    }
}
