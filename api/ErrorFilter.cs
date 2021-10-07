using HotChocolate;
using System.Net.Http;

namespace api
{
    internal class ErrorFilter : IErrorFilter
    {
        public IError OnError(IError error)
        {
            if (error.Exception is HttpRequestException exception)
            {
                var statusCode = exception.Message == string.Empty ? exception.StatusCode.Value.ToString() : exception.Message;
                var errorCode = (int)exception.StatusCode;

                return ErrorBuilder.FromError(error)
                    .SetMessage(statusCode)
                    .SetCode(errorCode.ToString())
                    .Build();
            }

            return ErrorBuilder.FromError(error).Build();
        }
    }
}