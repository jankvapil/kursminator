using CourseApi.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Courses
{
    public class UpdateCourseInput : AddCourseInput {

        [Required] [Range(1, int.MaxValue)]
        public int Id { get; set; }
    };
}
