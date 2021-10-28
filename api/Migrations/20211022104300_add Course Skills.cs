using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class addCourseSkills : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "_Skills",
                table: "Courses",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "_Skills",
                table: "Courses");
        }
    }
}
