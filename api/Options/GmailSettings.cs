using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Options
{
    public class GmailSettings
    {
        public string Server { get; set; }
        public int Port { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
