using CourseApi.Models;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Places
{
    public record AddPlaceInput(bool Virtual, string Name, string Url, string Address, string City);
}
