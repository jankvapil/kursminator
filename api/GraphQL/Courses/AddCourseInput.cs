using CourseApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Courses
{
    public record AddCourseInput(string Name, int Capacity, string Type, DateTime Date, int Price, string Description, int InstructorId, int PlaceId);
}
