using System.ComponentModel.DataAnnotations;
using CourseApi.Models;

namespace CourseApi.Models
{
    public class UserCourseReservation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int CourseId { get; set; }

        public Course Course { get; set; }

        [Required]
        public ReservationState State { get; set; }
    }

    public enum ReservationState
    {
        WAITING,
        APPROVED,
        COMPLETED,
        CANCELLED
    }
}