using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class uniquereservations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserCourseReservations_UserId",
                table: "UserCourseReservations");

            migrationBuilder.CreateIndex(
                name: "IX_UserCourseReservations_UserId_CourseId",
                table: "UserCourseReservations",
                columns: new[] { "UserId", "CourseId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserCourseReservations_UserId_CourseId",
                table: "UserCourseReservations");

            migrationBuilder.CreateIndex(
                name: "IX_UserCourseReservations_UserId",
                table: "UserCourseReservations",
                column: "UserId");
        }
    }
}
