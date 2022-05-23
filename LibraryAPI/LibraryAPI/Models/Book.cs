using System;
namespace LibraryAPI.Models
{
	public class Book
	{
		public Guid bookId { get; set; }
		public string isbnThirteen { get; set; }
		public string title { get; set; }
		public string author { get; set; }
		public bool checkedOut { get; set; }
		public int checkedOutBy { get; set; }
		public DateTime checkedOutDate { get; set; }
		public string imgUrl { get; set; }
	}
}

