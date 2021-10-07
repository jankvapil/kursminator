using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace api.GraphQL.UserCourseFavourites
{
    [ExtendObjectType(name: "Mutation")]
    public class UserCourseFavouriteMutations
    {
        [UseDbContext(typeof(AppDbContext))]
        public async Task<UserCourseFavourite> AddUserCourseFavouriteAsync([ScopedService] AppDbContext context, AddFavouriteInput input)
        {
            var userCourseFavourite = new UserCourseFavourite
            {
                UserId = input.UserId,
                CourseId = input.CourseId
            };

            await context.UserCourseFavourites.AddAsync(userCourseFavourite);
            await context.SaveChangesAsync();

            return userCourseFavourite;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<int> DeleteUserCourseFavouriteAsync([ScopedService] AppDbContext context, int id)
        {
            var userCourseFavourite = await context.UserCourseFavourites.FindAsync(id);

            if (userCourseFavourite is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            context.UserCourseFavourites.Remove(userCourseFavourite);
            await context.SaveChangesAsync();

            return userCourseFavourite.Id;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<IQueryable<int>> DeleteUserCourseFavouriteByAttrsAsync([ScopedService] AppDbContext context, int userId, int courseId)
        {
            var userCourseFavourites = context.UserCourseFavourites.Where(f => f.UserId == userId && f.CourseId == courseId);

            context.UserCourseFavourites.RemoveRange(userCourseFavourites);
            await context.SaveChangesAsync();

            return userCourseFavourites.Select(f => f.Id);
        }
    }
}
