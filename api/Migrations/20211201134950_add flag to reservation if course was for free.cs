using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class addflagtoreservationifcoursewasforfree : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFree",
                table: "UserCourseReservations",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFree",
                table: "UserCourseReservations");
        }
    }
}
