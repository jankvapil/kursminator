
import Content from '@/components/common/Content'
import FbLoginButton from '@/components/login/FbLoginButton'

///
/// Login page includes login over Facebook
///
export default function loginPage() {
  return (
    <Content>
      <section>
        <header className="my-16">
          <h1 className="text-3xl">Přihlašte se pomocí svého Facebook účtu</h1>
        </header>
        <div className="flex justify-center">
          <FbLoginButton />
        </div>
      </section>
    </Content>
  )
}
