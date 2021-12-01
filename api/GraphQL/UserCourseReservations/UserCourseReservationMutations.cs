using api.GraphQL.UserCourseFavourites;
using api.GraphQL.Users;
using api.Services;
using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace api.GraphQL.UserCourseReservations
{
    [ExtendObjectType(name: "Mutation")]
    public class UserCourseReservationMutations
    {
        private readonly SmtpService smtpService;

        public UserCourseReservationMutations(SmtpService smtpService)
        {
            this.smtpService = smtpService;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<UserCourseReservation> AddUserCourseReservationAsync([ScopedService] AppDbContext context, AddUserCourseReservationInput input)
        {
            var user = await context.Users.FindAsync(input.UserId);
            if (user is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            var course = await context.Courses.Include(c => c.Instructor).Include(c => c.Place).FirstOrDefaultAsync(c => c.Id == input.CourseId);
            if (course is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            user.Credits -= course.Price;

            if (user.Credits < 0)
                throw new HttpRequestException("Nemáte dostatek kreditů", null, HttpStatusCode.BadRequest);

            var userCourseReservation = new UserCourseReservation
            {
                UserId = input.UserId,
                CourseId = input.CourseId,
                State = ReservationState.APPROVED
            };

            await context.UserCourseReservations.AddAsync(userCourseReservation);
            await context.SaveChangesAsync();

            var args = new List<string>()
            {
                course.Name,
                course.Date.ToString(),
                course.Price.ToString(),
                course.Duration.ToString(),
                course.Description,
                course.Instructor.Name + ' ' + course.Instructor.Surname,
                course.Place.Name
            };

            if (course.Place.Virtual)
                args.Add(course.Place.Url);
            else
            {
                args.Add(course.Place.Address);
                args.Add(course.Place.City);
            }

            smtpService.Send(context, user.Id, course.Place.Virtual ? 3 : 2, "Potvzení rezervace kurzu", args.ToArray());

            return userCourseReservation;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<int> DeleteUserCourseReservationAsync([ScopedService] AppDbContext context, int id)
        {
            var userCourseReservation = await context.UserCourseReservations.FindAsync(id);

            if (userCourseReservation is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            context.UserCourseReservations.Remove(userCourseReservation);
            await context.SaveChangesAsync();

            return userCourseReservation.Id;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<int> CancelReservationAsync([ScopedService] AppDbContext context, int userId, int courseId)
        {
            var userCourseReservation = await context.UserCourseReservations
                .Include(r => r.Course)
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.UserId == userId && r.CourseId == courseId);

            if (userCourseReservation is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            userCourseReservation.State = ReservationState.CANCELLED;
            userCourseReservation.User.Credits += userCourseReservation.Course.Price;

            await context.SaveChangesAsync();

            smtpService.Send(context, userId, 4, "Zrušení rezervace na kurzu",
                new string[] { userCourseReservation.Course.Name, userCourseReservation.Course.Date.ToString(), userCourseReservation.Course.Price.ToString() });

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
