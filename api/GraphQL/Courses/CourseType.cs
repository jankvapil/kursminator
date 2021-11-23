using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Pagination;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace api.GraphQL.Courses
{
    public class CourseType : ObjectType<Course>
    {
        protected override void Configure(IObjectTypeDescriptor<Course> descriptor)
        {
            descriptor.Ignore(c => c._Skills);

            descriptor.Field(c => c.Skills)
                .ResolveWith<Resolvers>(r => r.GetSkillsArray(default!));

            descriptor.Field(c => c.Instructor)
                .ResolveWith<Resolvers>(r => r.GetInstructor(default!, default!))
                .UseDbContext<AppDbContext>();

            descriptor.Field(c => c.Place)
                .ResolveWith<Resolvers>(r => r.GetPlace(default!, default!))
                .UseDbContext<AppDbContext>();

            descriptor.Field(c => c.Content)
                .ResolveWith<Resolvers>(r => r.GetContent(default!))
                .UseDbContext<AppDbContext>();

            descriptor.Field(c => c.UserCourseReservation)
                .ResolveWith<Resolvers>(r => r.GetUserCourseResevation(default!, default!))
                .UseDbContext<AppDbContext>();

            descriptor.Field(c => c.Occupancy)
                .ResolveWith<Resolvers>(r => r.GetCourseOccupancy(default!, default!))
                .UseDbContext<AppDbContext>();
        }

        private class Resolvers
        {
            public string[] GetSkillsArray([Parent] Course course)
            {
                return course._Skills is null ? Array.Empty<string>() : course._Skills.Split('|');
            }

            public CourseChapter[] GetContent([Parent] Course course)
            {
                return course._Content is null ? null : JsonSerializer.Deserialize<CourseChapter[]>(course._Content);
            }

            public Instructor GetInstructor([Parent] Course course, [ScopedService] AppDbContext context)
            {
                return context.Instructors.FirstOrDefault(i => i.Id == course.InstructorId);
            }

            public Place GetPlace([Parent] Course course, [ScopedService] AppDbContext context)
            {
                return context.Places.FirstOrDefault(i => i.Id == course.PlaceId);
            }

            public ICollection<UserCourseReservation> GetUserCourseResevation([Parent] Course course, [ScopedService] AppDbContext context)
            {
                return context.UserCourseReservations.Include(r => r.User).Where(r => r.CourseId == course.Id).ToList();
            }

            public int GetCourseOccupancy([Parent] Course course, [ScopedService] AppDbContext context)
            {
                double numberOfReservations = GetUserCourseResevation(course, context).Count;

                return (int) (numberOfReservations / course.Capacity * 100);
            }
        }
    }
}
