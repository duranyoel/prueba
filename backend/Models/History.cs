using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class History
    {
        [Key]
        public int Id { get; set; }

        
        [Column(TypeName = "varchar(100)")]
        public string ciudad { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string info { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime fecha { get; set; }

    }
}
