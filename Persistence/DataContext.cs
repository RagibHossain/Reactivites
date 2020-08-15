using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activites { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);

            builder.Entity<Value>()
            .HasData(
                new Value { Id = 1, Name = "Ragib" },
                new Value { Id = 2, Name = "Ninad" },
                new Value { Id = 3, Name = "Ashik" }
            );

            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.ActivityId, ua.AppUserId }));

            builder.Entity<UserActivity>()
            .HasOne(a => a.Activity)
            .WithMany(ua => ua.UserActivities)
            .HasForeignKey(a => a.ActivityId);

            builder.Entity<UserActivity>()
            .HasOne(u => u.AppUser)
            .WithMany(ua => ua.UserActivities)
            .HasForeignKey(u => u.AppUserId);
        }

    }
}
