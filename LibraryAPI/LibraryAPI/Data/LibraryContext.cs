using System;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;

namespace LibraryAPI.Data
{
	public class LibraryContext: DbContext
	{
		public DbSet<Book> Books { get; set; }
		public DbSet<Admin> Admins { get; set; }
		public DbSet<Transaction> Transactions { get; set; }
		public DbSet<User> Users { get; set; }

		//I am a comment
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

			var serverVersion = new MySqlServerVersion(new Version(8, 0, 28));

			optionsBuilder.UseMySql(DBProp.connectionString, serverVersion);
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Book>(entity =>
			{
				entity.HasKey(e => e.bookId);
				entity.Property(e => e.author);
				entity.Property(e => e.title);
				entity.Property(e => e.isbnThirteen);
				entity.Property(e => e.checkedOut);
				entity.Property(e => e.checkedOutBy);
				entity.Property(e => e.checkedOutDate);
				entity.Property(e => e.imgUrl);
			});

			modelBuilder.Entity<User>(entity =>
			{
				entity.HasKey(e => e.accountNumber);
				entity.Property(e => e.name);
			});

			modelBuilder.Entity<Transaction>(entity =>
			{
				entity.HasKey(e => e.transactionId);
				entity.Property(e => e.detail);
				entity.Property(e => e.bookId);
				entity.Property(e => e.date);
			});

			modelBuilder.Entity<Admin>(entity =>
			{
				entity.HasKey(e => e.username);
				entity.Property(e => e.password);
			});
		}
	}
}

