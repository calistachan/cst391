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
	public class TransactionController
	{
		[HttpGet]
		public List<Transaction> Get()
        {
            using (var context = new LibraryContext())
            {
                context.Database.EnsureCreated();

                return context.Transactions.ToList();
            }
        }
	}
}

