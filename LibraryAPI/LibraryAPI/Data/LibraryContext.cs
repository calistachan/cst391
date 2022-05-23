using System;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;

namespace LibraryAPI.Data
{
	public class LibraryContext: DbContext
	{
		public DbSet<Book> Books;
		public DbSet<Admin> Admins;
		public DbSet<Transaction> Transactions;
		public DbSet<User> Users;

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
			//Connection string goes here
			optionsBuilder.UseMySQL(DBProp.connectionString);
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

