using CourseApi.Models;
using Graph.ArgumentValidator;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Courses
{
    [Validatable]
    public class AddCourseInput
    {
        [Required] [MinLength(5)]
        public string Name { get; set; }

        [Required] [Url]
        public string PhotoUrl { get; set; }

        [Required] [Range(10, 100)]
        public int Capacity { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public Difficulty Difficulty { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public int Price { get; set; }

        [Required] [MinLength(10)]
        public string Description { get; set; }

        [Required] [MinLength(1)]
        public string[] Skills { get; set; }

        public CourseChapter[] Content { get; set; }

        [Required]
        public int InstructorId { get; set; }

        [Required]
        public int PlaceId { get; set; }
    };
}
