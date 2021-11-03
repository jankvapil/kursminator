using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Users
{
    public class UpdateCurrentUserInput {

        [Required] [Range(1, int.MaxValue)]
        public int Id { get; set; }

        [Required] [MinLength(3)]
        public string Name { get; set; }

        [Required] [MinLength(3)]
        public string Surname { get; set; }

        [Required] [Url]
        public string PhotoUrl { get; set; }
    }
}
