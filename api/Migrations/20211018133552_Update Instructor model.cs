using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class UpdateInstructormodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Instructors",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Contact",
                table: "Instructors",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Specialization",
                table: "Instructors",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "Contact",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "Specialization",
                table: "Instructors");
        }
    }
}
