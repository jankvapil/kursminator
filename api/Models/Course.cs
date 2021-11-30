using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace CourseApi.Models
{
    public class Course
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string PhotoUrl { get; set; }

        [Required]
        public int Capacity { get; set; }

        [Required]
        public string Type { get; set; }

        public Difficulty Difficulty { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public string Description { get; set; }

        public string _Skills { get; set; }

        [NotMapped]
        public virtual string[] Skills { get; set; }

        public string _Content { get; set; }

        [NotMapped]
        public virtual CourseChapter[] Content { get; set; }

        public float Evaluation { get; set; } = 0;

        public bool Finished { get; set; } = false;

        [Required]
        public int InstructorId { get; set; }

        public Instructor Instructor { get; set; } 

        [Required]
        public int PlaceId { get; set; }

        public Place Place { get; set; }

        [NotMapped]
        public int Occupancy { get; set; }

        public ICollection<UserCourseReservation> UserCourseReservation { get; set; } = new List<UserCourseReservation>();
    }

    public enum Difficulty
    {
        UNSPECIFIED,
        BEGINNER,
        INTERMEDIATE,
        ADVANCED,
        EXPERT
    }
}