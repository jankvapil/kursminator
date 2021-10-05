using CourseApi.Models;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.UserCourseReservations
{
    public record AddUserCourseReservationInput(int UserId, int CourseId);
}
