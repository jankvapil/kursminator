import FacebookLogin from 'react-facebook-login'

import { useRouter } from 'next/router'


///
/// FbLoginButton component
///
const FbLoginButton = () => {
  const router = useRouter()

  const responseFacebook = async (e) => {
    console.log(e)
    console.log(e.picture.data.url)
    
    localStorage.setItem('isLogged', 'true')
    localStorage.setItem('pictureUrl', e.picture.data.url)
    router.push("/myProfile")
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