using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Places
{
    public record UpdatePlaceInput(int Id, bool Virtual, string Name, string Url, string Address, string City);
}
