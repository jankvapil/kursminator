using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Users
{
    public record UpdateUserInput(int Id, string Name, string Surname, string Email, string PhotoUrl, int RoleId, int Credits)
    {
    }
}
