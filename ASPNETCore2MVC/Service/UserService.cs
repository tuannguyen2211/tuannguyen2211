using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPNETCore2MVC.IService;
using ASPNETCore2MVC.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPNETCore2MVC.Service
{
    public class UserService: IUserService
    {
        private readonly EFContext _context;
        public UserService(EFContext context)
        {
            _context = context;
        }
        public async Task<User> ValidateUser(string userName, string password)
        {
            var model = await _context.User.Where(x => x.UserName == userName && x.Password == password).FirstOrDefaultAsync();
            return model;
        } 
        public async Task<User> GetUser(int id)
        {
            var result = await _context.User.Where(x => x.ID == id).FirstOrDefaultAsync();
            return result;
        }
    }
}
