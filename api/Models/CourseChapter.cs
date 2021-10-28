using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CourseApi.Models
{
    public class CourseChapter
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string[] Subchapters { get; set; }
    }
}
