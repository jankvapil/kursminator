using CourseApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseApi.Data 
{
    public class AppDbContext : DbContext 
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
    
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Instructor>()
                .HasMany(i => i.Courses)
                .WithOne(c => c.Instructor)
                .HasForeignKey(i => i.InstructorId);

            modelBuilder.Entity<Course>()
                .HasOne(c => c.Instructor)
                .WithMany(i => i.Courses)
                .HasForeignKey(c => c.InstructorId);
        }
    
        public DbSet<Course> Courses { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
    }
}