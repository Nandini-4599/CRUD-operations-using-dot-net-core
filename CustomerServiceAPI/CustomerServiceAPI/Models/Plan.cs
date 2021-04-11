#nullable disable

namespace CustomerServiceAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Microsoft.EntityFrameworkCore;

    public partial class Plan
    {
        public Plan()
        {
            this.Customers = new HashSet<Customer>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("name")]
        [StringLength(50)]

        public string Name { get; set; }

        [InverseProperty(nameof(Customer.Plan))]

        public virtual ICollection<Customer> Customers { get; set; }
    }
}
