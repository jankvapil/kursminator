
import { useState } from 'react'
import Content from '@/components/common/Content'
import FbLoginButton from '@/components/login/FbLoginButton'
import GDPRModal from '@/components/login/GDPRModal'

///
/// Login page includes login over Facebook
///
export default function loginPage() {
  const [isModalVisible, setIsModalVisible] = useState(true)

  return (
    <Content>
      <section>
        <header className="my-16">
          <h1 className="text-3xl">Přihlašte se pomocí svého Facebook účtu</h1>
        </header>
        <div className="flex justify-center">
          <FbLoginButton />
          <GDPRModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </div>
      </section>
    </Content>
  )
}
