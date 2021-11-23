import React from 'react'
import moment from 'moment'
import { Typography, Input, Form, Button, Radio, Select, DatePicker } from 'antd'
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

import '@/core/types'
import { updateCourseMutation } from '@/core/graphql/mutations/coursesMutations'

///
/// Edit course component
///
const EditCourse = (props) => {
    const course = props.course
    const [value, setValue] = React.useState(1);
    const onRadioChange = e => {
        setValue(e.target.value);
    };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        var duration = moment.duration(values.date[1].diff(values.date[0]));
        const updatedCourse = {
            id: course.id,
            name: values.name,
            photoUrl: course.photoUrl,
            capacity: course.capacity,
            type: values.category,
            difficulty: values.difficulty,
            date: moment(values.date[0]).format('YYYY-MM-DD'),
            duration: duration.asHours(),
            price: values.price,
            description: values.message,
            skills: course.skills,
            content: course.content,
            instructorId: values.instructorId,
            placeId: course.placeId // todo map correct place
        }
        const result = updateCourseMutation(updatedCourse)
        console.log(result)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex flex-col w-full h-full">
            <div className="mt-10 mb-5 border-b w-full text-center">
                <Title level={3}>Editace kurzu</Title>
            </div>
            <div className="flex flex-col w-full items-center">
                <Form
                    name="addCourse"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 32 }}
                    layout="horizontal"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ 
                            name: course.name,
                            /* initial date */
                            price: course.price,
                            category: course.type,
                            instructorId: course.instructor.id,
                            difficulty: course.difficulty,
                            /* map type */
                            message: course.description
                        }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Název"
                        name="name"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Input placeholder="Název kurzu" />
                    </Form.Item>

                    <Form.Item
                        label="Datum"
                        name="date"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <DatePicker.RangePicker />
                    </Form.Item>

                    <Form.Item
                        label="Cena"
                        name="price"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Kategorie"
                        name="category"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Select
                            placeholder="Kategorie kurzu"
                        >
                            <Option value="IT">IT</Option>
                            <Option value="sport">Sport</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Lektor"
                        name="instructorId"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Select
                            placeholder="Lektor"
                        >
                            {props.instructors.map((instructor) =>
                                <Option value={instructor.id}>{instructor.name} {instructor.surname}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Obtížnost"
                        name="difficulty"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Select
                            placeholder="Obtížnost kurzu"
                        >
                            <Option value="BEGINNER">Začátečník</Option>
                            <Option value="INTERMEDIATE">Středně pokročilý</Option>
                            <Option value="ADVANCED">Pokročilý</Option>
                            <Option value="EXPERT">Expert</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Typ"
                        name="type"
                        valuePropName={value}
                    >
                        <Radio.Group onChange={onRadioChange} value={value}>
                            <Radio value="online">Online</Radio>
                            <Radio value="present">Prezenční</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Zpráva"
                        name="message"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <TextArea placeholder="Minimum je 10 znaku." autoSize={true} />
                    </Form.Item>
                    {/* TODO - miss load own photo/image of course */}
                    {/* TODO - miss input for place - adress, city, aood */}
                    {/* TODO - miss input for skills, content */}
                    <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Upravit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default EditCourse