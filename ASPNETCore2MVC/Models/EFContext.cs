using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ASPNETCore2MVC.Models
{
    public class EFContext: DbContext
    {
        public EFContext (DbContextOptions<EFContext> options) : base(options)
        {

        }
        public DbSet<User> User { get; set; }
        public DbSet<Employee> Employee { get; set; }
    }
}
