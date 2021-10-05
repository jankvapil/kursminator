using api.GraphQL.UserCourseFavourites;
using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace api.GraphQL.UserCourseReservations
{
    [ExtendObjectType(name: "Mutation")]
    public class UserCourseReservationMutations
    {
        [UseDbContext(typeof(AppDbContext))]
        public async Task<UserCourseReservation> AddUserCourseReservationAsync([ScopedService] AppDbContext context, AddUserCourseReservationInput input)
        {
            var userCourseReservation = new UserCourseReservation
            {
                UserId = input.UserId,
                CourseId = input.CourseId
            };

            await context.UserCourseReservations.AddAsync(userCourseReservation);
            await context.SaveChangesAsync();

            return userCourseReservation;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<int> DeleteUserCourseReservationAsync([ScopedService] AppDbContext context, int id)
        {
            var userCourseReservation = await context.UserCourseReservations.FindAsync(id);

            if (userCourseReservation is null)
                throw new HttpRequestException(null, null, HttpStatusCode.NotFound);

            context.UserCourseReservations.Remove(userCourseReservation);
            await context.SaveChangesAsync();

            return userCourseReservation.Id;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<IQueryable<int>> DeleteUserCourseReservationByAttrsAsync([ScopedService] AppDbContext context, int userId, int courseId)
        {
            var userCourseReservations = context.UserCourseReservations.Where(f => f.UserId == userId && f.CourseId == courseId);

            context.UserCourseReservations.RemoveRange(userCourseReservations);
            await context.SaveChangesAsync();

            return userCourseReservations.Select(f => f.Id);
        }
    }
}
