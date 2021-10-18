using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CourseApi.Models
{
    public class Instructor
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Surname { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        public string Specialization { get; set; }

        [Required]
        public string About { get; set; }

        [Required]
        public string Contact { get; set; }

        [Required]
        public string PhotoUrl { get; set; }

        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}