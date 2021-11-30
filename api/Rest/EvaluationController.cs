using CourseApi.Data;
using HotChocolate;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace api.Rest
{
    [ApiController]
    [Route("[controller]")]
    public class EvaluationController : Controller
    {
        public IDbContextFactory<AppDbContext> _factory { get; set; }

        public EvaluationController(IDbContextFactory<AppDbContext> factory)
        {
            _factory = factory;
        }

        // /evaluation?userId=1&courseId=153&stars=3
        [HttpGet]
        public async Task<ContentResult> Evaluate(int userId, int courseId, [Range(1, 5)] int stars)
        {
            using (var context = _factory.CreateDbContext())
            {
                var userCourseReservation = await context.UserCourseReservations
                .FirstOrDefaultAsync(r => r.UserId == userId && r.CourseId == courseId);

                if (userCourseReservation is null)
                    return base.Content(string.Empty);

                userCourseReservation.Evaluation = stars;
                await context.SaveChangesAsync();

                return base.Content($"<div><div>Vaše hodnocení je: {stars}</div><h1>Děkujeme!</h1></div>", "text/html", Encoding.UTF8);
            }
        }
    }
}
