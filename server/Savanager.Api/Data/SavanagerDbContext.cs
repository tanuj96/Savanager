using Microsoft.EntityFrameworkCore;
using Savanager.Api.Models;

namespace Savanager.Api.Data
{
    public class SavanagerDbContext : DbContext
    {
        public SavanagerDbContext(DbContextOptions<SavanagerDbContext> options)
            : base(options)
        {
        }

        public DbSet<Investment> Investments { get; set; }
        public DbSet<InvestmentType> InvestmentTypes { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
