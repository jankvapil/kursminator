using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CourseApi.GraphQL
{
    public class Query 
    {
        [UseDbContext(typeof(AppDbContext))]
        [UsePaging(IncludeTotalCount = true, DefaultPageSize = int.MaxValue, MaxPageSize = int.MaxValue)]
        [UseFiltering]

        public IQueryable<Course> GetCourses([ScopedService] AppDbContext context)
        {
            return context.Courses;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UsePaging(IncludeTotalCount = true, DefaultPageSize = int.MaxValue, MaxPageSize = int.MaxValue)]
        [UseProjection]
        [UseFiltering]
        public IQueryable<Instructor> GetInstructors([ScopedService] AppDbContext context)
        {
            return context.Instructors;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UsePaging(IncludeTotalCount = true, DefaultPageSize = int.MaxValue, MaxPageSize = int.MaxValue)]
        [UseProjection]
        [UseFiltering]
        public IQueryable<Place> GetPlaces([ScopedService] AppDbContext context)
        {
            return context.Places;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UsePaging(IncludeTotalCount = true, DefaultPageSize = int.MaxValue, MaxPageSize = int.MaxValue)]
        [UseProjection]
        [UseFiltering]
        public IQueryable<User> GetUsers([ScopedService] AppDbContext context)
        {
            return context.Users;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        public async Task<User> GetCurrentUsersAsync([ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var currentUser = contextAccessor.HttpContext.User;

            if (!currentUser.Identity.IsAuthenticated)
                throw new HttpRequestException("No user is logged in", null, HttpStatusCode.Unauthorized);

            var userId = int.Parse(currentUser.FindFirstValue("id"));

            var thatUser = await context.Users.Include(u => u.UserCourseReservations).ThenInclude(u => u.Course).FirstOrDefaultAsync(u => u.Id == userId);

            return thatUser;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UsePaging(IncludeTotalCount = true, DefaultPageSize = int.MaxValue, MaxPageSize = int.MaxValue)]
        [UseProjection]
        [UseFiltering]
        public IQueryable<Role> GetRoles([ScopedService] AppDbContext context)
        {
            return context.Roles;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UsePaging(IncludeTotalCount = true, DefaultPageSize = int.MaxValue, MaxPageSize = int.MaxValue)]
        [UseProjection]
        [UseFiltering]
        public IQueryable<UserCourseFavourite> GetUserCourseFavourites([ScopedService] AppDbContext context)
        {
            return context.UserCourseFavourites;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UsePaging(IncludeTotalCount = true, DefaultPageSize = int.MaxValue, MaxPageSize = int.MaxValue)]
        [UseProjection]
        [UseFiltering]
        public IQueryable<UserCourseReservation> UserCourseReservations([ScopedService] AppDbContext context)
        {
            return context.UserCourseReservations;
        }
    }
}