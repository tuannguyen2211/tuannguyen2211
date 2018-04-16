using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPNETCore2MVC.Models;

namespace ASPNETCore2MVC.IService
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetEmployees();
        Task<Employee> GetEmployeeById(int id);
        Task<int> AddEmployee(Employee emp);
        Task<int> UpdateEmployee(Employee emp);
        Task<int> DeleteEmployee(int emp);
    }
}
