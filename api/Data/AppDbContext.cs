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

            modelBuilder.Entity<User>()
                .HasMany(u => u.UserCourseFavourites)
                .WithOne(f => f.User)
                .HasForeignKey(f => f.UserId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.UserCourseReservations)
                .WithOne(f => f.User)
                .HasForeignKey(f => f.UserId);
        }
    
        public DbSet<Course> Courses { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserCourseFavourite> UserCourseFavourites { get; set; }
        public DbSet<UserCourseReservation> UserCourseReservations { get; set; }
    }
}