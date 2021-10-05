using CourseApi.Models;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.UserCourseFavourites
{
    public record AddFavouriteInput(int UserId, int CourseId);
}
