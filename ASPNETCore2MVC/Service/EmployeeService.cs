using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPNETCore2MVC.IService;
using ASPNETCore2MVC.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPNETCore2MVC.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly EFContext _context;
        public EmployeeService(EFContext context)
        {
            _context = context;
        }
        public async Task<List<Employee>> GetEmployees()
        {
            var result = await _context.Employee.ToListAsync();
            return result;
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            var result = await _context.Employee.Where(x => x.ID == id).FirstOrDefaultAsync();
            return result;
        }

        public async Task<int> AddEmployee(Employee emp)
        {
            try
            {
                var employee = new Employee
                {
                    Name = emp.Name,
                    Email = emp.Email,
                    Phone = emp.Phone,
                    Password = emp.Password,
                    Gender = emp.Gender,
                    City = emp.City,
                    Department = emp.Department
                };
                 _context.Add(employee);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateEmployee(Employee emp)
        {
            try
            {
                var employee = await _context.Employee.Where(x => x.ID == emp.ID).FirstOrDefaultAsync();
                if(employee != null)
                {
                    employee.Name = emp.Name;
                    employee.Phone = emp.Phone;
                    employee.Email = emp.Email;
                    employee.City = emp.City;
                    employee.Gender = emp.Gender;
                    employee.Department = emp.Department;
                }
                _context.Entry(employee).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return 1;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteEmployee(int id)
        {
            try
            {
                var employee = await _context.Employee.Where(x => x.ID == id).FirstOrDefaultAsync();
                if (employee != null)
                {
                    _context.Remove(employee);
                    await _context.SaveChangesAsync();
                }
                return 1;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

    }
}
