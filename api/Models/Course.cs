using System.ComponentModel.DataAnnotations;

namespace CourseApi.Models
{
    public class Course
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public System.DateTime Date { get; set; } 

        [Required]
        public int Price { get; set; }
        
        [Required]
        public float Evaluation { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int InstructorId { get; set; }

        public Instructor Instructor { get; set; } 

        // public int PlaceId { get; set; }
    }
}