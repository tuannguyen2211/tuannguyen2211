using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ASPNETCore2MVC.CustomAuthorize
{
    public class JoingDateRequirement : IAuthorizationRequirement
    {
        public int MinimumMonth { get; set; }
        public JoingDateRequirement(int number)
        {
            MinimumMonth = number;
        }
    }
}
