namespace CustomerServiceAPI.Controllers
{
    using System;
    using System.Threading.Tasks;
    using CustomerServiceAPI.Models;
    using CustomerServiceAPI.Repository;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
         private ICustomerRepository customerRepository;
        private readonly ILogger<CustomerController> logger;

        public CustomerController(ICustomerRepository customerRepository,ILogger<CustomerController> logger)
        {
            this.customerRepository = customerRepository;
            this.logger = logger;
        }

        public string Message { get; set; }
        [HttpGet]
        [Route("GetPlans")]
        public async Task<IActionResult> GetPlans()
        {
            try
            {
                var plans = await customerRepository.GetPlans();
                if (plans == null)
                {
                    Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                    logger.LogInformation(Message);
                    logger.LogInformation("Plans not found");
                    return NotFound();
                    
                }

                Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                logger.LogInformation(Message);
                logger.LogInformation("Plans found ");
                return Ok(plans);
            }
            catch (Exception)
            {
                Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                logger.LogInformation(Message);
                logger.LogInformation("Some error occured");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetCustomers")]
        public async Task<IActionResult> GetCustomers()
        {
            try
            {
                var customers = await customerRepository.GetCustomers();
                if (customers == null)
                {
                    Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                    logger.LogInformation(Message);
                    logger.LogInformation("customer not found");
                    return NotFound();
                }

                Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                logger.LogInformation(Message);
                logger.LogInformation("Customer found");
                return Ok(customers);
            }
            catch (Exception)
            {
                Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                logger.LogInformation(Message);
                logger.LogError("Some error occured");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetCustomer")]
        public async Task<IActionResult> GetCustomer(int? custId)
        {
            if (custId == null)
            {
                Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                logger.LogInformation(Message);
                logger.LogInformation($"customer id is null");
                return BadRequest();
            }

            try
            {
                var customer = await customerRepository.GetCustomer(custId);

                if (customer == null)
                {
                    Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                    logger.LogInformation(Message);
                    logger.LogInformation($"customer id {custId} not found");
                    return NotFound();
                }

                Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                logger.LogInformation(Message);
                logger.LogInformation($"customer id {custId} found");
                return Ok(customer);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
        [HttpPost]
        [Route("AddCustomer")]
        public async Task<IActionResult> AddCustomer([FromBody] Customer model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    int id = await customerRepository.AddCustomer(model);
                    if (id > 0)
                    {
                        Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                        logger.LogInformation(Message);
                        logger.LogInformation($"Customer Added");
                        return Ok("Added Successfully");
                    }
                    else
                    {
                        Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                        logger.LogInformation(Message);
                        logger.LogInformation($"Error in adding customer");
                        return NotFound("Error");
                    }
                }
                catch (Exception)
                {

                    return BadRequest("Bad Request");
                }
            }

            return BadRequest("Bad Request");
        }

        [HttpDelete]
        [Route("DeleteCustomer")]
        public async Task<IActionResult> DeleteCustomer(int? id)
        {
            int result = 0;

            if (id == null)
            {
                return BadRequest("Id Not Found");
            }

            try
            {
                result = await customerRepository.DeleteCustomer(id);
                if (result == 0)
                {
                    return NotFound();
                }

                Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                logger.LogInformation(Message);
                logger.LogInformation($"Customer Deleted");
                return Ok("Deleted Successfully");
            }
            catch (Exception)
            {
                return BadRequest("Error");
            }
        }

        [HttpPost]
        [Route("UpdateCustomer")]
        public async Task<IActionResult> UpdateCustomer([FromBody] Customer model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await customerRepository.UpdateCustomer(model);

                    Message = $"About page visited at {DateTime.Now.ToLongTimeString()}";
                    logger.LogInformation(Message);
                    logger.LogInformation($"Customer Updated");
                    return Ok("Updated successfully");
                }
                catch (Exception ex)
                {
                    if (ex.GetType().FullName == "Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException")
                    {
                        return NotFound("Not Found");
                    }

                    return BadRequest("Unable to update");
                }
            }

            return BadRequest("Unable to update");
        }

            
        
    }
}
