using api.Externals;
using api.Options;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace api.Services
{
    public class FacebookAuthService
    {
        private const string TokenValidationUrl = "https://graph.facebook.com/debug_token?input_token={0}&access_token={1}|{2}";
        private const string UserInfoUrl = "https://graph.facebook.com/me?fields=first_name,last_name,picture,email&access_token={0}";

        private IHttpClientFactory httpClientFactory;

        public FacebookAuthService(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
        }

        public async Task<FacebookUserInfo> GetUserInfoAsync(string accessToken)
        {
            var formatedUrl = string.Format(UserInfoUrl, accessToken);
            var result = await httpClientFactory.CreateClient().GetAsync(formatedUrl);
            result.EnsureSuccessStatusCode();
            var responseAsString = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<FacebookUserInfo>(responseAsString);
        }

        public async Task<FacebookTokenValidation> ValidateAccessTokenAsync(string accessToken, FacebookAuthSettings facebookAuthSettings)
        {
            var formatedUrl = string.Format(TokenValidationUrl, accessToken, facebookAuthSettings.AppId, facebookAuthSettings.AppSecret);
            var result = await httpClientFactory.CreateClient().GetAsync(formatedUrl);
            result.EnsureSuccessStatusCode();
            var responseAsString = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<FacebookTokenValidation>(responseAsString);
        }
    }
}
