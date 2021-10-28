using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class addCourseContent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "_Content",
                table: "Courses",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "_Content",
                table: "Courses");
        }
    }
}
