using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class fixtypocaceledtocanceled : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Caceled",
                table: "Courses",
                newName: "Canceled");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Canceled",
                table: "Courses",
                newName: "Caceled");
        }
    }
}
