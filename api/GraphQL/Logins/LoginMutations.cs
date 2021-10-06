using api.Options;
using api.Services;
using CourseApi.Data;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace api.GraphQL.Logins
{
    [ExtendObjectType(name: "Mutation")]
    public class LoginMutations
    {
        private readonly IdentityService identityService;
        public LoginMutations(IdentityService identityService)
        {
            this.identityService = identityService;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<string> UserFbLogin([ScopedService] AppDbContext context, [Service] IOptions<JwtSettings> jwtSettings, [Service] IOptions<FacebookAuthSettings> facebookAuthSettings, string accessToken)
            => await identityService.FbLoginAsync(context, jwtSettings.Value, facebookAuthSettings.Value, accessToken);
    }
}
