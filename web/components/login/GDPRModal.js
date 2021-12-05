
import { Modal } from 'antd'
import { useRouter } from 'next/router'

///
/// GDPR Modal Form component
///
const GDPRModal = ({ isModalVisible, setIsModalVisible }) => {
  const router = useRouter()

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    router.push("/")
  }

  return (
    <Modal title="Souhlas s GDPR" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} closable={false} maskClosable={false}>
      <p>Přihlášením pomocí svého emailu nebo Facebook účtu udělujete souhlas se zpracováním osobních údajů v rámci této aplikace </p>
      <p>
        Z osobních informací ukládáme Vaši emailovou adresu, na kterou budeme odesílat informace související s rezervacemi kurzů.
        Dále ukládáme Vaše jméno a přijímení v případě, že se přihlašujete pomocí Vašeho Facebookového účtu.  
      </p>
      <p>Tyto údaje budou sloužit výhradně k usnadnění zprostředkování kurzů a nebou poskytnuty třetím stranám.</p>
    </Modal>
  )
}

export default GDPRModal
