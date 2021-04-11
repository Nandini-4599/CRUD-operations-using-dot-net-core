#nullable disable

namespace CustomerServiceAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.Json.Serialization;
    using Microsoft.EntityFrameworkCore;

    public partial class Customer
    {
        [Key]
        [Column("id")]

        public int Id { get; set; }

        public int CustomerCode { get; set; }

        [Required]
        [StringLength(50)]

        public string FullName { get; set; }

        
        public int CustomerType { get; set; }

        public int? PlanId { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal AmtDue { get; set; }

        [Column(TypeName = "date")]
     
        public DateTime FirstOrderDate { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        public int? PinCode { get; set; }

        public bool IsActive { get; set; }

        [ForeignKey(nameof(PlanId))]
        [InverseProperty("Customers")]

        public virtual Plan Plan { get; set; }   
    }
}
