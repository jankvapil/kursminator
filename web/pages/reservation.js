import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Typography, Form, Input, Button, Checkbox, message } from 'antd'
const { Title, Text } = Typography

import { validateEmail } from '@/core/helpers'
import '@/core/types'
import { bookUnregisteredCourseMutation } from '@/core/graphql/mutations/userMutations'
import Content from '@/components/common/Content'
import ProCard from '@/components/common/ProCard'

import FbLoginButton from '@/components/login/FbLoginButton'

///
/// Course detail page
///
export default function courseDetailPage() {
  const router = useRouter()
  const [completed, setCompleted] = useState(false)

  ///
  /// Handles on reservation click event
  ///
  const onFinish = async (e) => {
    const isValid = validateEmail(e.email)
    if (isValid) {
      const res = await bookUnregisteredCourseMutation(e.email, router.query.courseId)
      if (res?.addUnregistredCourseReservation) {
        setCompleted(true)
      } else {
        message.error("Nepodařilo se provézt rezervaci kurzu")
      }
    } else {
      message.error("Zadejte email ve správném formátu")
    }
  }

  ///////////////// GUI ///////////////////

  return (
    <Content>
      <ProCard>
        { completed ? "Děkujeme za rezervaci. Podrobnosti k rezervaci po uhrazení kurzu odešleme na Váš email!" : ( 
          <div className="flex flex-col md:flex-row w-full justify-between">
            <div className="flex flex-col md:w-3/5 w-full m-auto">

              <Title level={5}><p className="text-center text-2xl">Dokončení rezervace</p></Title>
              <p className="text-center m-auto pb-1 text-lg">Přihlásit se pomocí facebooku</p>

            <div className="m-auto pb-7 pl-2"><FbLoginButton /></div>
            <p className="text-center m-auto text-lg">nebo emailu</p>

              <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input />
                </Form.Item>

                <div className="mr-10 md:mr-0">
                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Rezervovat
                  </Button>
                </Form.Item>
              </div>
              </Form>

            </div>
          </div>
        )}
      </ProCard>
    </Content>
  )
}
