using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using CourseApi.Models;

namespace CourseApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        public string PhotoUrl { get; set; }

        public int RoleId { get; set; }

        public Role Role { get; set; }

        public int Credits { get; set; } = 0;

        public ICollection<UserCourseFavourite> UserCourseFavourites { get; set; } = new List<UserCourseFavourite>();

        public ICollection<UserCourseReservation> UserCourseReservations { get; set; } = new List<UserCourseReservation>();
    }
}