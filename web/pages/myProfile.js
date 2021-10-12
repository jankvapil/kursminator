
import Content from '@/components/common/Content'
import Image from 'next/image'
import { useEffect, useState } from 'react'

///
/// My profile page includes favourite courses, personal info, 
///  credit history and past/next courses overview 
///
export default function myProfilePage() {
  const [ls, setLs] = useState(null)
  useEffect(() => {
    setLs(window.localStorage)
  }, [])

  const myLoader = ({ src, width, quality }) => {
    if (!ls)
      return src
    else return ls.getItem("pictureUrl")
  }

  const showLocalStorage = () => {
    console.log(localStorage)    
  }

  return (
    <Content>
      {
        ls && ls.getItem("isLogged") === 'true' ? (
          <>
            <Image
              loader={myLoader}
              src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
              alt="Picture of the author"
              width={50}
              height={50}
            />
            My profile page
            <button onClick={showLocalStorage}>My Profile</button>
          </>
        ) : (<h1>Sorry, you are not logged in.</h1>)
      }
      
    </Content>
  )
}
