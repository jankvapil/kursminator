using System.ComponentModel.DataAnnotations;
using CourseApi.Models;
using System.Collections.Generic;

namespace CourseApi.Models
{
    public class UserCourseFavourite
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int CourseId { get; set; }

        public Course Course { get; set; }
    }
}