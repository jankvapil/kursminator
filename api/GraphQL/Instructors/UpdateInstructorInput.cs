using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Instructors
{
    public record UpdateInstructorInput(int Id, string Name, string Surname, string About, string PhotoUrl)
    {
    }
}
