using api.GraphQL.Instructors;
using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace api.GraphQL.Users
{
    [ExtendObjectType(name: "Mutation")]
    public class UserMutations
    {
        [UseDbContext(typeof(AppDbContext))]
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
        public async Task<int> DeleteUserAsync([ScopedService] AppDbContext context, int id)
        {
            var user = await context.Users.FindAsync(id);

            if (user is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            context.Users.Remove(user);
            await context.SaveChangesAsync();

            return user.Id;
        }
    }
}
