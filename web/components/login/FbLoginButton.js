import FacebookLogin from 'react-facebook-login'

import { useRouter } from 'next/router'
import { getToken } from '@/core/graphql/mutations/loginMutations'

///
/// FbLoginButton component
///
const FbLoginButton = ({ url }) => {
  const router = useRouter()

  ///
  /// Calls get API token from FB token
  ///
  const responseFacebook = async (e) => {
    localStorage.setItem('isLogged', 'true')
    localStorage.setItem('pictureUrl', e.picture.data.url)
    await getToken(e.accessToken)
    if (url) {
      router.push(`/${url}`)
    } else {
      router.push("/myProfile")
    }
  }

  return (
    <FacebookLogin 
      appId="344073607406912" 
      version="11.0" 
      fields="name, email, picture"
      xfbml={true} 
      callback={responseFacebook}
    />
  )
}

export default FbLoginButton