using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class typo_fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Roles_RoleId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCourseFavourites_User_UserId",
                table: "UserCourseFavourites");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCourseReservation_Courses_CourseId",
                table: "UserCourseReservation");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCourseReservation_User_UserId",
                table: "UserCourseReservation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserCourseReservation",
                table: "UserCourseReservation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.RenameTable(
                name: "UserCourseReservation",
                newName: "UserCourseReservations");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameIndex(
                name: "IX_UserCourseReservation_UserId",
                table: "UserCourseReservations",
                newName: "IX_UserCourseReservations_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCourseReservation_CourseId",
                table: "UserCourseReservations",
                newName: "IX_UserCourseReservations_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_User_RoleId",
                table: "Users",
                newName: "IX_Users_RoleId");

            migrationBuilder.AlterColumn<string>(
                name: "Surname",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserCourseReservations",
                table: "UserCourseReservations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCourseFavourites_Users_UserId",
                table: "UserCourseFavourites",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCourseReservations_Courses_CourseId",
                table: "UserCourseReservations",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCourseReservations_Users_UserId",
                table: "UserCourseReservations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserCourseFavourites_Users_UserId",
                table: "UserCourseFavourites");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCourseReservations_Courses_CourseId",
                table: "UserCourseReservations");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCourseReservations_Users_UserId",
                table: "UserCourseReservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserCourseReservations",
                table: "UserCourseReservations");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "UserCourseReservations",
                newName: "UserCourseReservation");

            migrationBuilder.RenameIndex(
                name: "IX_Users_RoleId",
                table: "User",
                newName: "IX_User_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCourseReservations_UserId",
                table: "UserCourseReservation",
                newName: "IX_UserCourseReservation_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCourseReservations_CourseId",
                table: "UserCourseReservation",
                newName: "IX_UserCourseReservation_CourseId");

            migrationBuilder.AlterColumn<string>(
                name: "Surname",
                table: "User",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "User",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserCourseReservation",
                table: "UserCourseReservation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Roles_RoleId",
                table: "User",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCourseFavourites_User_UserId",
                table: "UserCourseFavourites",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCourseReservation_Courses_CourseId",
                table: "UserCourseReservation",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCourseReservation_User_UserId",
                table: "UserCourseReservation",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
