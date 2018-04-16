using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPNETCore2MVC.Models;

namespace ASPNETCore2MVC.IService
{
    public interface IUserService
    {
        Task<User> ValidateUser(string userName, string password);
        Task<User> GetUser(int id);
    }
}
