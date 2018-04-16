using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPNETCore2MVC.Models;
using ASPNETCore2MVC.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ASPNETCore2MVC.Api
{
    [Route("api/user")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // GET api/<controller>/5
        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result =  await _userService.GetUser(id);
            return Json(result);
        }
    }
}
