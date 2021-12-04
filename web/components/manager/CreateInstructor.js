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
            photoUrl: values.photoUrl ? values.photoUrl : "https://media.istockphoto.com/photos/portrait-of-smiling-young-man-in-city-on-sunny-day-picture-id863488868?k=20&m=863488868&s=612x612&w=0&h=0nlCVra-NlgrCFhmhbRNZMRaLDxz6or4hspVpIfzKnQ="
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
            <div className="flex flex-col w-3/4 pl-26">
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

                    <Form.Item
                        label="Avatar"
                        name="photoUrl"
                        rules={[{ required: false }]}
                    >
                        <TextArea placeholder="Zde mužete vložit url profiloveho obrazku lektora" autoSize={true} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 21, span: 16 }}>
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