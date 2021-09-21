using CourseApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseApi.Data 
{
    public class AppDbContext : DbContext 
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
    
    
        public DbSet<Course> Courses { get; set; }
    }
}