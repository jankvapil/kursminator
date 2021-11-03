using CourseApi.Models;
using Graph.ArgumentValidator;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Places
{
    [Validatable]
    public class AddPlaceInput
    {
        [Required]
        public bool Virtual { get; set; }

        [Required] [MinLength(5)]
        public string Name { get; set; }

        [Required] [Url]
        public string Url { get; set; }

        [Required] [MinLength(5)]
        public string Address { get; set; }

        [Required] [MinLength(2)]
        public string City { get; set; }
    }
}
