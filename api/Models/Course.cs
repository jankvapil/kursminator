using System.ComponentModel.DataAnnotations;

namespace CourseApi.Models
{
    public class Course
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Type { get; set; }

        // public int PlaceId { get; set; }

        public System.DateTime Date { get; set; } 

        public int Price { get; set; }
        
        public float Evaluation { get; set; }

        public string Description { get; set; }
        
        // public int InstructorId { get; set; }
    }
}