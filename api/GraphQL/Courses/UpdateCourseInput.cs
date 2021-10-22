using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Courses
{
    public record UpdateCourseInput(int Id, string Name, string PhotoUrl, int Capacity, string Type, DateTime Date, int Duration, int Price, string Description, float Evalution, int InstructorId, int PlaceId);
}
