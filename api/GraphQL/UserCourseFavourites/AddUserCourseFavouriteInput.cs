using CourseApi.Models;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.UserCourseFavourites
{
    public class AddFavouriteInput {

        [Required] [Range(1, int.MaxValue)]
        public int UserId { get; set; }

        [Required] [Range(1, int.MaxValue)]
        public int CourseId { get; set; }
    }
}
