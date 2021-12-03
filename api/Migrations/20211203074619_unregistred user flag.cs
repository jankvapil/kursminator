using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class unregistreduserflag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Unregistred",
                table: "Users",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Unregistred",
                table: "Users");
        }
    }
}
