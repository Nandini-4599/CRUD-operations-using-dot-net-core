namespace CustomerServiceAPI.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CustomerServiceAPI.Models;
    using CustomerServiceAPI.ViewModel;

    public interface ICustomerRepository
    {
        Task<List<Plan>> GetPlans();

        Task<List<CustomerViewModel>> GetCustomers();

        Task<CustomerViewModel> GetCustomer(int? custId);

        Task<int> AddCustomer(Customer customer);

        Task<int> DeleteCustomer(int? id);

        Task UpdateCustomer(Customer customer);
    }
}
