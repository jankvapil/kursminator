import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Typography, Form, Input, Button, Checkbox, message } from 'antd'
const { Title, Text } = Typography

import { validateEmail } from '@/core/helpers'
import '@/core/types'
import { bookUnregisteredCourseMutation } from '@/core/graphql/mutations/userMutations'
import Content from '@/components/common/Content'
import ProCard from '@/components/common/ProCard'

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
            <div className="flex flex-col w-full md:w-2/5">

              <Title level={5}>Dokončení rezervace</Title>
              <p>Pro rezervování kurzu se přihlaště pomocí svého Facebook účtu nebo emailové adresy</p>

              <Form
                name="basic"
                labelCol={{ span: 8 }}
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

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Rezervovat
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
      </ProCard>
    </Content>
  )
}
