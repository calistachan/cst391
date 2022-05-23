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
    public class UserController : Controller
    {
        [HttpGet]
        public int Get(string name)
        {
            using(var context = new LibraryContext())
            {
                int amt = context.Users.Count();
                User user = new User { name = name, accountNumber = amt + 1};
                context.Users.Add(user);
                context.SaveChanges();

                return user.accountNumber;
            }
        }
    }
}

