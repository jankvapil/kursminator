using HotChocolate;
using System;
using System.Net.Http;
using System.Text;

namespace api
{
    internal class ErrorFilter : IErrorFilter
    {
        public IError OnError(IError error)
        {
            if (error.Exception is not null)
            {
                if (error.Exception is HttpRequestException requestException)
                {
                    var statusCode = requestException.Message == string.Empty ? requestException.StatusCode.Value.ToString() : GenerateExceptionMessage(requestException);
                    var errorCode = (int)requestException.StatusCode;

                    return ErrorBuilder.FromError(error)
                        .SetMessage(statusCode)
                        .SetCode(errorCode.ToString())
                        .Build();
                }

                var message = GenerateExceptionMessage(error.Exception);
                return ErrorBuilder.FromError(error)
                        .SetMessage(message)
                        .Build();
            }

            return ErrorBuilder.FromError(error).Build();
        }

        private string GenerateExceptionMessage(Exception exception)
        {
            var message = new StringBuilder();

            while (exception is not null)
            {
                message.AppendLine(exception.Message);
                exception = exception.InnerException;
            }

            return message.ToString();
        }
    }
}