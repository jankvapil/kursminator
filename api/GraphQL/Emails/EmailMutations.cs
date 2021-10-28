using api.Services;
using CourseApi.Data;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.GraphQL.Emails
{
    [ExtendObjectType(name: "Mutation")]
    public class EmailMutations
    {
        //[Authorize(Roles = new[] { "User" })]
        [UseDbContext(typeof(AppDbContext))]
        public async Task<string> SendEmailToCurrentUserAsync([ScopedService] AppDbContext context, [Service] SmtpService smtpService, int type, string subject, params string[] args)
        {
            var sendBody = await smtpService.Send(context, type, subject, args);
            return sendBody;
        }

        //[Authorize(Roles = new[] { "Manager", "Admin" })]
        [UseDbContext(typeof(AppDbContext))]
        public async Task<string> SendEmailAsync([ScopedService] AppDbContext context, [Service] SmtpService smtpService, int userId, string subject, int type, params string[] args)
        {
            var sendBody = await smtpService.Send(context, userId, type, subject, args);
            return sendBody;
        }
    }
}
