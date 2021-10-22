using CourseApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Courses
{
    public record AddCourseInput(string Name, string PhotoUrl, int Capacity, string Type, DateTime Date, int Duration, int Price, string Description, string[] Skills, int InstructorId, int PlaceId);
}
