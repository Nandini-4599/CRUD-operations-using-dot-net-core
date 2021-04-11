namespace CustomerServiceAPI.Controllers
{
    using System;
    using System.Threading.Tasks;
    using CustomerServiceAPI.Models;
    using CustomerServiceAPI.Repository;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
         private ICustomerRepository customerRepository;

        public CustomerController(ICustomerRepository customerRepository)
        {
            this.customerRepository = customerRepository;
        }
        
        [HttpGet]
        [Route("GetPlans")]
        public async Task<IActionResult> GetPlans()
        {
            try
            {
                var plans = await customerRepository.GetPlans();
                if (plans == null)
                {
                    return NotFound();
                }

                return Ok(plans);
            }
            catch (Exception)
            {
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
                    return NotFound();
                }

                return Ok(customers);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetCustomer")]
        public async Task<IActionResult> GetCustomer(int? custId)
        {
            if (custId == null)
            {
                return BadRequest();
            }

            try
            {
                var customer = await customerRepository.GetCustomer(custId);

                if (customer == null)
                {
                    return NotFound();
                }

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
                        return Ok("Added Successfully");
                    }
                    else
                    {
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
