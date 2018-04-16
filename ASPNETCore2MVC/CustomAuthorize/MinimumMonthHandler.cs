using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ASPNETCore2MVC.CustomAuthorize
{
    public class MinimumMonthHandler: AuthorizationHandler<JoingDateRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, JoingDateRequirement requirement)
        {
            if (!context.User.HasClaim(c => c.Type == "date"))
            {
                return Task.CompletedTask;
            }

            var joingDate = Convert.ToDateTime(context.User.FindFirst(c => c.Type == "date").Value);

            var compareDate = joingDate.AddMonths(requirement.MinimumMonth);

            if (compareDate <= DateTime.Now)
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
