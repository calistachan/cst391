using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryAPI.Data;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    public class TestController : Controller
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
        [Route("clear")]
        public void Reset()
        {
            using (var context = new LibraryContext())
            {
                context.Database.EnsureDeleted();
            }
        }

        [HttpGet]
        [Route("fill")]
        public void Fill()
        {
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();

                foreach (Book book in defaultBooks)
                {
                    context.Books.Add(book);
                }
                context.SaveChanges();
            }
        }

        [HttpGet]
        [Route("createAdmin")]
        public Guid CreateAdmin()
        {
            using (var context = new LibraryContext())
            {
                Admin admin = new Admin
                {
                    username = "calista",
                    password = "calista",
                    id = Guid.NewGuid()
                };
                context.Admins.Add(admin);

                context.SaveChanges();

                return admin.id;
            }
        }
    }
}

