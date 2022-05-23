using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryAPI.Data;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        

        // GET: api/values
        [HttpGet]
        [Route("all")]
        public List<Book> Get()
        {
            using(var context = new LibraryContext())
            {
                context.Database.EnsureCreated();
                
                List<Book> books = context.Books.ToList();
                Console.WriteLine(books);
                return books;
            }
        }

        // GET api/values/5
        [HttpGet]
        public Book GetBook(Guid id)
        {
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();
                return context.Books.Where(o => o.bookId == id).FirstOrDefault();
            }
        }

        // POST api/values
        [HttpPost]
        public Book Post([FromBody]Book book)
        {
            book.bookId = Guid.NewGuid();
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();

                context.Books.Add(book);

                context.SaveChanges();

                return book;
            }
        }

        [HttpPost]
        [Route("checkout")]
        public string Checkout([FromBody] CheckOutRequest request)
        {
            using (var context = new LibraryContext())
            {
                Console.WriteLine("I was hit: Guid: " + request.bookId + ", accountNumber" + request.accountNumber);
                context.Database.EnsureCreated();

                Book book = context.Books.Where(o => o.bookId == request.bookId).FirstOrDefault();
                if(book != null)
                {
                    book.checkedOut = true;
                    book.checkedOutBy = request.accountNumber;
                    book.checkedOutDate = DateTime.Now;

                    Transaction t = new Transaction {
                        bookId = book.bookId,
                        date = DateTime.Now,
                        detail = "Checked out by " + request.accountNumber,
                        transactionId = Guid.NewGuid()
                    };
                    context.Transactions.Add(t);
                    context.SaveChanges();

                    return "Checked out: " + book.title;
                }

                return "Book does not exist";
            }
        }

        [HttpPost]
        [Route("return")]
        public string Return([FromBody] ReturnRequest request)
        {
            using (var context = new LibraryContext())
            {
                Console.WriteLine("I was hit: Guid: " + request.bookId + ", accountNumber" + request.accountNumber);
                context.Database.EnsureCreated();

                Book book = context.Books.Where(o => o.bookId == request.bookId).FirstOrDefault();
                if (book != null)
                {
                    book.checkedOut = false;
                    book.checkedOutBy = -1;
                    book.checkedOutDate = DateTime.MinValue;

                    Transaction t = new Transaction
                    {
                        bookId = book.bookId,
                        date = DateTime.Now,
                        detail = "Returned by " + request.accountNumber,
                        transactionId = Guid.NewGuid()
                    };

                    context.Transactions.Add(t);
                    context.SaveChanges();

                    return "Returned: " + book.title;
                }

                return "Failed to return";
            }
        }


        // DELETE api/values/5
        [HttpDelete]
        public string Delete([FromBody]DeleteBookRequest id)
        {
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();
                Console.WriteLine(id.id);
                Book book = context.Books.Where(o => o.bookId == id.id).FirstOrDefault();
                if (book != null)
                {
                    context.Books.Remove(book);
                }
                context.SaveChanges();

                return "Deleted: " + book.title;
            }

        }
    }

    public class CheckOutRequest
    {
        public Guid bookId { get; set; }
        public int accountNumber { get; set; }
    }

    public class ReturnRequest
    {
        public Guid bookId { get; set; }
        public int accountNumber { get; set; }
    }

    public class DeleteBookRequest
    {
        public Guid id { get; set; }
    }

}

