using CourseApi.Models;
using Graph.ArgumentValidator;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Instructors
{
    [Validatable]
    public class AddInstructorInput {

        [Required] [MinLength(3)]
        public string Name { get; set; }

        [Required] [MinLength(3)]
        public string Surname { get; set; }

        [Required] [Range(15, 120)]
        public int Age { get; set; }

        [Required]
        public string Specialization { get; set; }

        [Required] [MinLength(10)]
        public string About { get; set; }

        [Required]
        public string Contact { get; set; }

        [Required] [Url]
        public string PhotoUrl { get; set; }
    }
}
