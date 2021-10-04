using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using CourseApi.Models;

namespace CourseApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        public int RoleId { get; set; }

        public Role Role { get; set; }

        public int Credits { get; set; } = 0;

        public ICollection<UserCourseFavourite> UserCourseFavourites { get; set; } = new List<UserCourseFavourite>();

        public ICollection<UserCourseReservation> UserCourseReservations { get; set; } = new List<UserCourseReservation>();
    }
}