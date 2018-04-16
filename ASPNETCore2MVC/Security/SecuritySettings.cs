using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNETCore2MVC.Security
{
    public class SecurityJwtSettings
    {
        public string SecurityKey { get; set; }
    }
    public class SecuritySettings
    {
        public SecurityJwtSettings Jwt { get; set; }
    }
}
