using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class flagifCoursewascanceledadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Caceled",
                table: "Courses",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Caceled",
                table: "Courses");
        }
    }
}
