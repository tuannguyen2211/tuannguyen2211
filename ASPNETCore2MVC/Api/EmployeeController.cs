using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPNETCore2MVC.IService;
using ASPNETCore2MVC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ASPNETCore2MVC.Api
{
    [Route("api/employee")]
    [Authorize(Policy = "AuthorizeFirstName")]
    [Authorize(Policy = "Over3Months")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        // GET: api/<controller>
        [HttpGet]
        [Route("index")]
        public async Task<IActionResult> GetEmployees()
        {
            var model = await _employeeService.GetEmployees();
            return Json(model);
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("detail/{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var model = await _employeeService.GetEmployeeById(id);
            return Json(model);
        }

        // POST api/<controller>
        [HttpPost]
        [Route("edit")]
        public async Task<int> UpdateEmployee([FromBody]Employee employee)
        {
            return await _employeeService.UpdateEmployee(employee);
        }

        // POST api/<controller>
        [HttpPost]
        [Route("add")]
        public async Task<int> AddNewEmployee([FromBody]Employee employee)
        {
            return await _employeeService.AddEmployee(employee);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [Route("delete/{id}")]
        public async Task<int> Delete(int id)
        {
            return await _employeeService.DeleteEmployee(id);
        }
    }
}
