using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ASPNETCore2MVC.IService;
using ASPNETCore2MVC.Security;
using ASPNETCore2MVC.Service;
using ASPNETCore2MVC.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ASPNETCore2MVC.Api
{
    [Route("api/user")]
    public class AuthenticationController : Controller
    {
        private readonly IUserService _userService;
        private readonly IOptions<SecuritySettings> _securitySettings;
        private readonly IConfiguration _configuration;
        public AuthenticationController(IUserService userService, IOptions<SecuritySettings> securitySettings, IConfiguration configuration)
        {
            _userService = userService;
            _securitySettings = securitySettings;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserViewModel credentials)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var s = _configuration["issuer"];
                    var user = await _userService.ValidateUser(credentials.UserName, credentials.Password);
                    if (user != null)
                    {
                        var issueDate = DateTimeOffset.UtcNow;
                        var expiredDate = issueDate.AddDays(1);
                        var claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Name, user.UserName),
                            new Claim("Id", user.ID.ToString()),
                            new Claim(ClaimTypes.Role, user.Role),
                            new Claim(ClaimTypes.GivenName,user.FullName),
                            new Claim("date", user.JoingDate.ToString("dd MMMM yyyy")),
                            new Claim("MaleAccess", user.UserName == "Tuan" ? "true" : "false"),
                            new Claim(JwtRegisteredClaimNames.Nbf, issueDate.ToUnixTimeSeconds().ToString()),
                            new Claim(JwtRegisteredClaimNames.Exp, expiredDate.ToUnixTimeSeconds().ToString())
                        };
                        
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_securitySettings.Value.Jwt.SecurityKey));
                        var signingCredential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(
                        issuer: _configuration["issuer"],
                        audience: _configuration["audience"],
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: signingCredential);
                        return Json(new
                        {
                            access_token = new JwtSecurityTokenHandler().WriteToken(token),
                            issue_date = issueDate,
                            expires_date = expiredDate
                        });
                    }
                    return BadRequest("Username or Password do not match");
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return BadRequest(ModelState.Values.First().Errors.First().ErrorMessage);
        }
    }
}
