using System.Linq;
using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;

namespace CourseApi.GraphQL
{
    public class Query 
    {
        public IQueryable<Course> GetCourses([Service] AppDbContext context)
        {
            return context.Courses;
        }
    }
}