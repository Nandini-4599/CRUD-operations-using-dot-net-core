namespace CustomerServiceAPI.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CustomerServiceAPI.Models;
    using CustomerServiceAPI.ViewModel;
    using Microsoft.EntityFrameworkCore;
    
    public class CustomerRepository : ICustomerRepository
    {
        private CoreDbContext db;

        public CustomerRepository(CoreDbContext db1)
        {
            this.db = db1;
        }

        public async Task<List<Plan>> GetPlans()
        {
            if (this.db != null)
            {
                return await this.db.Plans.ToListAsync();
            }

            return null;
        }

        public async Task<List<CustomerViewModel>> GetCustomers()
        {
            if (this.db != null)
            {
                return await(from c in this.db.Customers
                              from p in this.db.Plans
                              where c.PlanId == p.Id
                              select new CustomerViewModel
                              {
                                  Id = c.Id,
                                  CustomerCode = c.CustomerCode,
                                  FullName = c.FullName,
                                  CustomerType = c.CustomerType,
                                  PlanId = p.Id,
                                  Name = p.Name,
                                  AmtDue = c.AmtDue,
                                  FirstOrderDate = c.FirstOrderDate,
                                  Address = c.Address,
                                  PinCode = c.PinCode,
                                  IsActive = c.IsActive
                              }).ToListAsync();
            }

            return null;
        }

        public async Task<CustomerViewModel> GetCustomer(int? custId)
        {
            if (this.db != null)
            {
                return await(from c in this.db.Customers
                             from p in this.db.Plans
                             where c.Id == custId
                             select new CustomerViewModel
                             {
                                 Id = c.Id,
                                 CustomerCode = c.CustomerCode,
                                 FullName = c.FullName,
                                 CustomerType = c.CustomerType,
                                 PlanId = p.Id,
                                 AmtDue = c.AmtDue,
                                 FirstOrderDate = c.FirstOrderDate,
                                 Address = c.Address,
                                 PinCode = c.PinCode,
                                 IsActive = c.IsActive
                             }).FirstOrDefaultAsync();
            }

            return null;
    }

        public async Task<int> AddCustomer(Customer customer)
        {

            if (this.db != null)
            {
                await this.db.Customers.AddAsync(customer);
                await this.db.SaveChangesAsync();

                return customer.Id;
            }

            return 0;
        }

        public async Task<int> DeleteCustomer(int? id)
        {
            int result = 0;

            if (this.db != null)
            {
                ////Find the post for specific post id
                var customer = await this.db.Customers.FirstOrDefaultAsync(x => x.Id == id);

                if (customer != null)
                {
                    ////Delete that post
                    this.db.Customers.Remove(customer);

                    ////Commit the transaction
                    result = await this.db.SaveChangesAsync();
                }

                return result;
            }

            return result;
        }

        public async Task UpdateCustomer(Customer customer)
        {
            if (this.db != null)
            {
                ////Update that post
                this.db.Customers.Update(customer);

                ////Commit the transaction
                await this.db.SaveChangesAsync();
            }
        }     
    }
}
