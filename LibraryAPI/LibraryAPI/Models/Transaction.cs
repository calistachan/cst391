using System;
namespace LibraryAPI.Models
{
	public class Transaction
	{
		public Guid transactionId { get; set; }
		public Guid bookId { get; set; }
		public string detail { get; set; }
		public DateTime date { get; set; }
	}
}

