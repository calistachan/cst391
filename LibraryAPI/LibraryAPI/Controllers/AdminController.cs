using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryAPI.Data;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
	public class AdminController: Controller
	{
        [HttpPost]
        [Route("create")]
        public void Create([FromBody] AdminCreateRequest request)
        {
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();

                Admin authorized = context.Admins.Where(o => o.id == request.adminId).FirstOrDefault();

                if (authorized == null) return;

                Admin admin = new Admin { username = request.username, password = request.password };
                admin.id = Guid.NewGuid();
                context.Admins.Add(admin);

                context.SaveChanges();
            }
        }

        [HttpPost]
        [Route("login")]
        public Guid Login([FromBody] AdminLoginRequest request)
        {
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();

                Admin admin = context.Admins.Where(o => o.username == request.username && o.password == request.password).FirstOrDefault();
                if (admin != null)
                    return admin.id;

                return Guid.Empty;
            }
        }

    }

    public class AdminCreateRequest
    {
        public string username { get; set; }
        public string password { get; set; }
        public Guid adminId { get; set; }
    }

    public class AdminLoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}

