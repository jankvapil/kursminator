using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class addCourseDifficulty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Difficulty",
                table: "Courses",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Difficulty",
                table: "Courses");
        }
    }
}
