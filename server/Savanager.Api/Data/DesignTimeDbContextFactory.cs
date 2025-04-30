using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Savanager.Api.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<SavanagerDbContext>
    {
        public SavanagerDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<SavanagerDbContext>();

            // Set up the configuration for DbContext (use your connection string here)
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));

            return new SavanagerDbContext(optionsBuilder.Options);
        }
    }
}
