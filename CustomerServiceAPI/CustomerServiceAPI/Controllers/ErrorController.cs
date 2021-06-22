using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerServiceAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CustomerServiceAPI.Controllers
{
    
    [ApiController]
    public class ErrorController : ControllerBase
    {
      
            private readonly ILogger<ErrorController> logger;

            // Inject ASP.NET Core ILogger service. Specify the Controller
            // Type as the generic parameter. This helps us identify later
            // which class or controller has logged the exception
            public ErrorController(ILogger<ErrorController> logger)
            {
                this.logger = logger;
            }

            [AllowAnonymous]
            [Route("Error")]
            public IActionResult Error()
            {
                // Retrieve the exception Details
                var exceptionHandlerPathFeature =
                    HttpContext.Features.Get<IExceptionHandlerPathFeature>();
                // LogError() method logs the exception under Error category in the log
                logger.LogError($"The path {exceptionHandlerPathFeature.Path} " +
                    $"threw an exception {exceptionHandlerPathFeature.Error}");

                return BadRequest("Error");
            }

            [Route("Error/{statusCode}")]
            public IActionResult HttpStatusCodeHandler(int statusCode)
            {
                var statusCodeResult =
                    HttpContext.Features.Get<IStatusCodeReExecuteFeature>();

                switch (statusCode)
                {
                    case 404:
                       
                        // LogWarning() method logs the message under
                        // Warning category in the log
                        logger.LogWarning($"404 error occured.");
                        break;
                }

                return BadRequest("Not Found");
            }
        }
    }
    

