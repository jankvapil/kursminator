using api.GraphQL.Courses;
using api.GraphQL.UserCourseFavourites;
using api.GraphQL.Users;
using api.Services;
using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using System;
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

            if (course.Finished || course.Caceled)
                throw new HttpRequestException("This course is already finished or canceled", null, HttpStatusCode.BadRequest);

            var courseType = new CourseType.Resolvers();

            if (courseType.GetUserCourseResevation(course, context).Count(r => r.State != ReservationState.CANCELLED) + 1 > course.Capacity)
                throw new HttpRequestException("Kurz je už plně zaplněn", null, HttpStatusCode.BadRequest);

            var isFree = courseType.GetCourseOccupancy(course, context) <= 10;
            if (!isFree)
                user.Credits -= course.Price;

            if (user.Credits < 0)
                throw new HttpRequestException("Nemáte dostatek kreditů", null, HttpStatusCode.BadRequest);

            var userCourseReservation = new UserCourseReservation
            {
                UserId = input.UserId,
                CourseId = input.CourseId,
                State = ReservationState.APPROVED,
                IsFree = isFree
            };

            await context.UserCourseReservations.AddAsync(userCourseReservation);
            await context.SaveChangesAsync();

            var args = new List<string>()
            {
                course.Name,
                course.Date.ToString(),
                isFree ? "0" : course.Price.ToString(),
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

            _ = smtpService.Send(context, user.Id, course.Place.Virtual ? 3 : 2, "Potvzení rezervace kurzu", args.ToArray());

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

            if (userCourseReservation.Course.Date.AddDays(-1) <= DateTime.Now)
                throw new HttpRequestException("It is too late to cancel the course.", null, HttpStatusCode.BadRequest);

            if (!userCourseReservation.IsFree)
                userCourseReservation.User.Credits += userCourseReservation.Course.Price;
            userCourseReservation.State = ReservationState.CANCELLED;

            await context.SaveChangesAsync();

            var coursePrice = userCourseReservation.IsFree ? 0 : userCourseReservation.Course.Price;

            _ = smtpService.Send(context, userId, 4, "Zrušení rezervace na kurzu",
                new string[] { userCourseReservation.Course.Name, userCourseReservation.Course.Date.ToString(), coursePrice.ToString() });

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

        [UseDbContext(typeof(AppDbContext))]
        public async Task<int> AddUnregistredCourseReservationAsync([ScopedService] AppDbContext context, [EmailAddress] string email, int courseId)
        {
            var course = await context.Courses
                .Include(c => c.Instructor)
                .Include(c => c.Place)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            var courseType = new CourseType.Resolvers();

            if (courseType.GetUserCourseResevation(course, context).Count(r => r.State != ReservationState.CANCELLED) + 1 > course.Capacity)
                throw new HttpRequestException("Kurz je už plně zaplněn", null, HttpStatusCode.BadRequest);

            var isFree = courseType.GetCourseOccupancy(course, context) <= 10;

            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                user = new User()
                {
                    Email = email,
                    Name = string.Empty,
                    Surname = string.Empty,
                    PhotoUrl = string.Empty,
                    Unregistred = true,
                    RoleId = 1
                };
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
            }

            var reservation = new UserCourseReservation()
            {
                UserId = user.Id,
                CourseId = courseId,
                State = ReservationState.WAITING,
                IsFree = isFree
            };

            await context.UserCourseReservations.AddAsync(reservation);
            await context.SaveChangesAsync();

            var args = new string[]
            {
                course.Name,
                course.Date.ToString(),
                isFree ? "0" : course.Price.ToString(),
                course.Duration.ToString(),
                course.Description,
                course.Instructor.Name + ' ' + course.Instructor.Surname,
                course.Place.Name
            };

            smtpService.Send(email, 7, "Potvrzení rezervace", args);

            return course.Id;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<int> AproveReservationAsync([ScopedService] AppDbContext context, int userId, int courseId)
        {
            var userCourseReservation = await context.UserCourseReservations
                .Include(r => r.Course).ThenInclude(c => c.Place)
                .Include(r => r.Course).ThenInclude(c => c.Instructor)
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.UserId == userId && r.CourseId == courseId);

            if (userCourseReservation is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            userCourseReservation.State = ReservationState.APPROVED;

            await context.SaveChangesAsync();

            var coursePrice = userCourseReservation.IsFree ? 0 : userCourseReservation.Course.Price;

            var args = new List<string>()
            {
                userCourseReservation.Course.Name,
                userCourseReservation.Course.Date.ToString(),
                coursePrice.ToString(),
                userCourseReservation.Course.Duration.ToString(),
                userCourseReservation.Course.Description,
                userCourseReservation.Course.Instructor.Name + ' ' +  userCourseReservation.Course.Instructor.Surname,
                userCourseReservation.Course.Place.Name
            };

            if (userCourseReservation.Course.Place.Virtual)
                args.Add(userCourseReservation.Course.Place.Url);
            else
            {
                args.Add(userCourseReservation.Course.Place.Address);
                args.Add(userCourseReservation.Course.Place.City);
            }

            _ = smtpService.Send(context, userCourseReservation.UserId, userCourseReservation.Course.Place.Virtual ? 3 : 2, "Platba proběhla úspěšně", args.ToArray());

            return userCourseReservation.Id;
        }
    }
}
