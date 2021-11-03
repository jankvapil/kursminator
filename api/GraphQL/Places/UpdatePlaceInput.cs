using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Places
{
    public class UpdatePlaceInput : AddPlaceInput {

        [Required] [Range(1, int.MaxValue)]
        public int Id { get; set; }
    }
}
