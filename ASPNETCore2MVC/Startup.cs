using System.Text;
using ASPNETCore2MVC.CustomAuthorize;
using ASPNETCore2MVC.IService;
using ASPNETCore2MVC.Models;
using ASPNETCore2MVC.Security;
using ASPNETCore2MVC.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace ASPNETCore2MVC
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Configutations
            services.Configure<SecuritySettings>(Configuration.GetSection("Security"));
            var jwtSecurityKey = Configuration.GetValue<string>("Security:Jwt:SecurityKey");
            services.AddDbContext<EFContext>(option => option.UseSqlServer(Configuration.GetConnectionString("EFContext")));
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IEmployeeService, EmployeeService>();
            services.AddSingleton<IAuthorizationHandler, MinimumMonthHandler>();
            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration.GetValue<string>("Issuer"),
                    ValidAudience = Configuration.GetValue<string>("Audience"),
                    IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtSecurityKey))
                };
            });
            services.AddAuthorization(option =>
            {
                option.AddPolicy("AuthorizeFirstName", policy => policy.RequireClaim("MaleAccess",  "true"));
                option.AddPolicy("Over3Months",
                      policy => policy.Requirements.Add(new JoingDateRequirement(0)));
                //option.AddPolicy("AuthorizeUserName", policy => policy.RequireRole("R1", "R2"));
            });
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            // CORS

            app.UseCors(builder => { builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials(); });

            app.UseAuthentication(); // TODO: remove this one ?
            app.UseMvc();
            app.UseStaticFiles();
            // Server route for '/api/' use route attribute
            app.MapWhen(
                context => context.Request.Path.Value.ToLower().StartsWith("/api"),
                builder => builder.UseMvc());
            // Server route for else
            app.MapWhen(
                context => !context.Request.Path.Value.ToLower().StartsWith("/api"),
                builder => builder.UseMvc(routes =>
                {
                    routes.MapRoute(name: "default", template: "{controller=Home}/{action=Index}/{id?}");
                    routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
                })
                );
        }
    }
}
