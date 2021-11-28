import React from 'react'
import { Typography, Input, Form, Button, Select, message } from 'antd'
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

import '@/core/types'
import { addInstructorMutation } from '@/core/graphql/mutations/instructorMutations'

///
/// Create instructor component
///
const CreateInstructor = () => {
    const onFinish = async (values) => {
        const newInstructor = {
            name: values.name,
            surname: values.surname,
            age: values.age,
            specialization: values.specialization,
            about: values.about,
            contact: values.contact,
            // TODO - default image
            photoUrl: "https://www.shutterstock.com/image-photo/young-man-teacher-posing-classroom-344044361"
        }
        const res = await addInstructorMutation(newInstructor)
        if (res.addInstructor) {
            message.success('Nový lektor byl úspěšně přidán')
            //clear field
            form.resetFields()
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <div className="flex flex-col w-full h-full">
            <div className="mt-10 mb-5 border-b w-full text-center">
                <Title level={3}>Nový lektor</Title>
            </div>
            <div className="flex flex-col items-center w-full">
                <Form
                    form={form}
                    name="addInstructor"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 32 }}
                    layout="horizontal"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ type: "online"}}
                >
                    <Form.Item
                        label="Jméno"
                        name="name"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Input placeholder="Jméno lektora" />
                    </Form.Item>

                    <Form.Item
                        label="Přijmení"
                        name="surname"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Input placeholder="Příjmeni lektora" />
                    </Form.Item>

                    <Form.Item
                        label="Věk"
                        name="age"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Specializace"
                        name="specialization"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Select
                            placeholder="Specializace lektora"
                        >
                            <Option value="IT">IT</Option>
                            <Option value="Sport">Sport</Option>
                            <Option value="Matematika">Matematika</Option>
                            <Option value="Management">Management</Option>
                            <Option value="Marketing">Marketing</Option>
                            <Option value="Finance">Finance</Option>
                            <Option value="Historie">Historie</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Něco o mě"
                        name="about"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <TextArea placeholder="Minimum je 10 znaku." autoSize={true} />
                    </Form.Item>

                    <Form.Item
                        label="Kontakt"
                        name="contact"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Input placeholder="Telefon nebo email" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Vytvořit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default CreateInstructor