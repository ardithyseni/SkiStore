using System;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>(); // log to the terminal any error that we get

            try 
            {
                context.Database.Migrate();
                DbInitializer.Initialize(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Problem with migrating data");
            }
            // finally
            // {
            //     scope.Dispose(); // dispose the scope and any resource it uses
            // }
            host.Run();
        }
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
