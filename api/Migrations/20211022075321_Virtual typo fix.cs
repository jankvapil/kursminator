using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class Virtualtypofix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Virutal",
                table: "Places",
                newName: "Virtual");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Virtual",
                table: "Places",
                newName: "Virutal");
        }
    }
}
