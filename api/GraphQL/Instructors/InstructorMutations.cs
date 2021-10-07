using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace api.GraphQL.Instructors
{
    [ExtendObjectType(name: "Mutation")]
    public class InstructorMutations
    {
        [UseDbContext(typeof(AppDbContext))]
        public async Task<Instructor> AddInstructorAsync([ScopedService] AppDbContext context, AddInstructorInput input)
        {
            var instructor = new Instructor
            {
                Name = input.Name,
                Surname = input.Surname,
                About = input.About,
                PhotoUrl = input.PhotoUrl
            };

            await context.Instructors.AddAsync(instructor);
            await context.SaveChangesAsync();

            return instructor;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Instructor> UpdateInstructorAsync([ScopedService] AppDbContext context, int id, UpdateInstructorInput input)
        {
            if (id != input.Id)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.BadRequest);

            var instructorExists = context.Instructors.Any(c => c.Id == id);
            if (!instructorExists)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            var instructorUpdated = new Instructor
            {
                Id = input.Id,
                Name = input.Name,
                Surname = input.Surname,
                About = input.About,
                PhotoUrl = input.PhotoUrl
            };

            context.Instructors.Update(instructorUpdated);
            await context.SaveChangesAsync();

            return instructorUpdated;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<int> DeleteInstructorAsync([ScopedService] AppDbContext context, int id)
        {
            var instructor = await context.Instructors.FindAsync(id);

            if (instructor is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            context.Instructors.Remove(instructor);
            await context.SaveChangesAsync();

            return instructor.Id;
        }
    }
}
