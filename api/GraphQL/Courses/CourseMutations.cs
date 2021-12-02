using api.Services;
using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace api.GraphQL.Courses
{
    [ExtendObjectType(name: "Mutation")]
    public class CourseMutations
    {
        private readonly SmtpService smtpService;
        private IHttpContextAccessor contextAccessor;
        public CourseMutations(SmtpService smtpService, IHttpContextAccessor contextAccessor)
        {
            this.smtpService = smtpService;
            this.contextAccessor = contextAccessor;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Course> AddCourseAsync([ScopedService] AppDbContext context, AddCourseInput input)
        {
            var course = new Course
            {
                Name = input.Name,
                PhotoUrl = input.PhotoUrl,
                Capacity = input.Capacity,
                Type = input.Type,
                Difficulty = input.Difficulty,
                Date = input.Date,
                Duration = input.Duration,
                Price = input.Price,
                Description = input.Description,
                _Skills = string.Join("|", input.Skills),
                _Content = JsonSerializer.Serialize(input.Content),
                InstructorId = input.InstructorId,
                PlaceId = input.PlaceId
            };

            await context.Courses.AddAsync(course);
            await context.SaveChangesAsync();

            return course;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Course> UpdateCourseAsync([ScopedService] AppDbContext context, int id, UpdateCourseInput input)
        {
            if (id != input.Id)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.BadRequest);

            var courseExists = context.Courses.Any(c => c.Id == id);
            if (!courseExists)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            var courseUpdated = new Course
            {
                Id = input.Id,
                Name = input.Name,
                PhotoUrl = input.PhotoUrl,
                Capacity = input.Capacity,
                Type = input.Type,
                Difficulty = input.Difficulty,
                Date = input.Date,
                Duration = input.Duration,
                Price = input.Price,
                Description = input.Description,
                _Skills = string.Join("|", input.Skills),
                _Content = JsonSerializer.Serialize(input.Content),
                InstructorId = input.InstructorId,
                PlaceId = input.PlaceId
            };

            context.Courses.Update(courseUpdated);
            await context.SaveChangesAsync();

            return courseUpdated;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<int> DeleteCourseAsync([ScopedService] AppDbContext context, int id)
        {
            var course = await context.Courses.FindAsync(id);

            if (course is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            context.Courses.Remove(course);
            await context.SaveChangesAsync();

            return course.Id;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<int> CheckCoursesAsync([ScopedService] AppDbContext context)
        {
            var nonEvaluatedCourses = context.Courses
                .Include(c => c.UserCourseReservation)
                .ThenInclude(r => r.User)
                .Where(c => !c.Finished).ToArray();

            var finishedCourses = 0;
            foreach (Course course in nonEvaluatedCourses)
            {
                if (course.Date.AddMinutes(course.Duration) <= DateTime.Now)
                {
                    foreach (UserCourseReservation reservation in course.UserCourseReservation)
                    {
                        var url = contextAccessor.HttpContext.Request.Scheme + "://" + contextAccessor.HttpContext.Request.Host.Value;
                        _ = smtpService.Send(context, reservation.UserId, 6, "Absolvoval jsi kurz",
                            new string[] { course.Name, url, reservation.UserId.ToString(), reservation.CourseId.ToString() });
                        reservation.State = ReservationState.COMPLETED;
                    }
                    course.Finished = true;
                    finishedCourses++;
                }
            }

            await context.SaveChangesAsync();

            return finishedCourses;
        }
    }
}
