using System.ComponentModel.DataAnnotations;

namespace CourseApi.Models
{
    public class Place
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public bool Virutal { get; set; }

        [Required]
        public string Name { get; set; }
        
        public string Url { get; set; }

        public string Address { get; set; }

        public string City { get; set; }
    }
}