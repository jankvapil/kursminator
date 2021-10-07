using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Users
{
    public record UpdateCurrentUserInput(int Id, string Name, string Surname, string PhotoUrl);
}
