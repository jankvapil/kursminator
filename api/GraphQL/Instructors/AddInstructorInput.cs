using CourseApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Instructors
{
    public record AddInstructorInput(string Name, string Surname, int Age, string Specialization, string About, string Contact, string PhotoUrl);
}
