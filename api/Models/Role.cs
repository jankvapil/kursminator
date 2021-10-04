using System.ComponentModel.DataAnnotations;
using CourseApi.Models;

namespace CourseApi.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

    }
}