using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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

        [Required]
        public System.DateTime Date { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public string Description { get; set; }

        public string _Skills { get; set; }

        [NotMapped]
        [Required]
        public virtual string[] Skills { get; set; }

        public string _Content { get; set; }

        [NotMapped]
        [Required]
        public virtual CourseChapter[] Content { get; set; }

        public float Evaluation { get; set; } = 0;

        [Required]
        public int InstructorId { get; set; }

        public Instructor Instructor { get; set; } 

        [Required]
        public int PlaceId { get; set; }

        public Place Place { get; set; }
    }
}