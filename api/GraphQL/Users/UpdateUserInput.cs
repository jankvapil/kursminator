using Graph.ArgumentValidator;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Users
{
    [Validatable]
    public class UpdateUserInput
    {
        [Required] [Range(1, int.MaxValue)]
        public int Id { get; set; }

        [Required] [MinLength(3)]
        public string Name { get; set; }

        [Required] [MinLength(3)]
        public string Surname { get; set; }

        [Required] [EmailAddress]
        public string Email { get; set; }

        [Required] [Url]
        public string PhotoUrl { get; set; }

        [Required] [Range(1, int.MaxValue)]
        public int RoleId { get; set; }

        [Required]
        public int Credits { get; set; }
    }
}
