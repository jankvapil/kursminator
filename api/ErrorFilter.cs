using HotChocolate;
using System.Net.Http;

namespace api
{
    internal class ErrorFilter : IErrorFilter
    {
        public IError OnError(IError error)
        {
            if (error.Exception is not HttpRequestException)
                return ErrorBuilder.FromError(error).Build();

            var exception = error.Exception as HttpRequestException;
            var statusCode = exception.StatusCode.Value;
            var errorCode = (int)exception.StatusCode;

            return ErrorBuilder.FromError(error)
                .SetMessage(statusCode.ToString())
                .SetCode(errorCode.ToString())
                .Build();
        }
    }
}