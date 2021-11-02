
import Content from '@/components/common/Content'
import ProCard from '@/components/common/ProCard'
import FbLoginButton from '@/components/login/FbLoginButton'

///
/// Login page includes login over Google or Facebook
///
export default function loginPage() {
  return (
    <Content>
      <ProCard>
        Login page
        <FbLoginButton />
      </ProCard>
    </Content>
  )
}
