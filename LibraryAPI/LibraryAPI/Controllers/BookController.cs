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
        private Book[] defaultBooks = new Book[]
        {
            new Book {bookId = Guid.NewGuid(),
                title = "Harry Potter",
                author = "J.K. Rowling",
                checkedOut = false,
                checkedOutBy = -1,
                isbnThirteen = "9780590353427",
                imgUrl = "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
                checkedOutDate = DateTime.MinValue
            },
            new Book {bookId = Guid.NewGuid(),
                title = "1984",
                author = "George Orwell",
                checkedOut = false,
                checkedOutBy = -1,
                isbnThirteen = "9780451524935",
                imgUrl = "https://m.media-amazon.com/images/P/0451524934.01._SCLZZZZZZZ_SX500_.jpg",
                checkedOutDate = DateTime.MinValue
            }
        };

        //For dev
        [HttpGet]
        [Route("reset")]
        public async Task Reset()
        {
            using (var context = new LibraryContext())
            {
                await context.Database.EnsureDeletedAsync();
                await context.Database.EnsureCreatedAsync();

                foreach(Book book in defaultBooks)
                {
                    context.Books.Add(book);
                }
                context.SaveChanges();
            }
        }


        // GET: api/values
        [HttpGet]
        public List<Book> Get()
        {
            using(var context = new LibraryContext())
            {
                context.Database.EnsureCreated();

                return context.Books.ToList();
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Book Get(Guid id)
        {
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();

                return context.Books.Where(o => o.bookId == id).FirstOrDefault();
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Book book)
        {
            book.bookId = Guid.NewGuid();
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();

                context.Books.Add(book);

                context.SaveChanges();
            }
        }

        [HttpPost]
        [Route("checkout")]
        public void Post([FromBody] Guid bookId, [FromBody] int accountNumber)
        {
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();

                Book book = context.Books.Where(o => o.bookId == bookId).FirstOrDefault();
                if(book != null)
                {
                    book.checkedOut = true;
                    book.checkedOutBy = accountNumber;
                    book.checkedOutDate = DateTime.Now;
                    context.Books.Add(book);
                    context.SaveChanges();
                }
            }
        }


        // DELETE api/values/5
        [HttpDelete("{isbn}")]
        public void Delete(string isbn)
        {
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();

                Book book = context.Books.Where(o => o.isbnThirteen == isbn).FirstOrDefault();
                if(book != null)
                {
                    context.Books.Remove(book);
                }
            }
        }
    }
}

