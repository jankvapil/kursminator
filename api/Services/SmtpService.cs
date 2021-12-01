using api.Options;
using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;

namespace api.Services
{
    public class SmtpService
    {
        private readonly GmailSettings gmailSettings;
        private readonly IHttpContextAccessor httpContext;

        public SmtpService([Service] IOptions<GmailSettings> gmailSettings, [Service] IHttpContextAccessor httpContext)
        {
            this.gmailSettings = gmailSettings.Value;
            this.httpContext = httpContext;
        }

        public async Task<string> Send(AppDbContext context, int userId, int type, string subject, string[] args)
        {
            User recipient = await context.Users.FindAsync(userId);

            var body = GetEmailBody(recipient, type, args);

            Execute(recipient, subject, body);

            return body;
        }

        public async Task<string> Send(AppDbContext context, int type, string subject, string[] args)
        {
            var contextUser = httpContext.HttpContext.User;
            if (!contextUser.Identity.IsAuthenticated)
                throw new HttpRequestException("No user is logged in", null, HttpStatusCode.Unauthorized);

            var userId = int.Parse(contextUser.FindFirstValue("id"));

            return await Send(context, userId, type, subject, args);
        }

        private string GetEmailBody(User recipient, int type, string[] args)
        {
            if (recipient is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            var file = Directory.GetFiles(@"wwwroot/templates", type + "_*.html")[0];
            var body = File.ReadAllText(file);
            var properties = recipient.GetType().GetProperties();
            foreach (var property in properties)
            {
                var oldValue = '@' + property.Name;
                var newValue = property.GetValue(recipient);
                if (newValue is not null)
                    body = body.Replace(oldValue, newValue.ToString());
            }
            try
            {
                body = string.Format(body, args);
            }
            catch (Exception ex)
            {
                for (int i = 0; i < args.Length; i++)
                {
                    body = body.Replace("{" + i + "}", args[i]);
                }
            }

            return body;
        }

        private void Execute(User recipient, string subject, string body)
        {
            string to = recipient.Email;
            string from = this.gmailSettings.Email;
            MailMessage message = new(from, to)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            SmtpClient client = new(this.gmailSettings.Server, this.gmailSettings.Port)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential
                {
                    UserName = this.gmailSettings.Email,
                    Password = this.gmailSettings.Password
                },
                EnableSsl = true
            };

            try
            {
                client.Send(message);
            }
            catch (Exception ex)
            {
                var a = ex;
            }
        }
    }
}
