import React from 'react'
import moment from 'moment'
import { Typography, Input, Form, Button, Radio, Select, DatePicker, message } from 'antd'
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

import '@/core/types'
import { addCourseMutation } from '@/core/graphql/mutations/coursesMutations'
import { addPlaceMutation } from '@/core/graphql/mutations/placesMutations'

///
/// Create course component
///
const CreateCourse = (props) => {
    const [courseType, setCourseType] = React.useState("online");
    const onRadioChange = e => {
        setCourseType(e.target.value);
    };
    const onFinish = async (values) => {
        // add Place
        const isVirtual = courseType == "online"
        const newPlace = {
            virtual: isVirtual,
            name: isVirtual ? "Portal online kurzů" : "Sportovni hala",
            url: isVirtual ? "https://www.youtube.com/" : "https://www.google.com/maps",
            address:  isVirtual ? "online" : "U Sportovni haly 552, 778 21",
            city: isVirtual ? "online" : "Brno"
        }
        var placeRes = await addPlaceMutation(newPlace)
        const placeId = placeRes.addPlace.id

        // add course
        var duration = moment.duration(values.date[1].diff(values.date[0]));
        const newCourse = {
            name: values.name,
            // TODO - default image
            photoUrl: "https://www.shutterstock.com/image-photo/business-entrepreneurship-symposium-speaker-giving-talk-627815009",
            capacity: 200,
            type: values.category,
            difficulty: values.difficulty,
            date: moment(values.date[0]).format('YYYY-MM-DD'),
            duration: duration.asHours(),
            price: values.price,
            description: values.message,
            skills: ["Networks", "Smart TV"],
            instructorId: values.instructorId,
            placeId: placeId
        }
        const res = await addCourseMutation(newCourse)
        if (res.addCourse) {
            message.success('Nový kurz byl úspěšně vytvořen')
            //clear field
            form.resetFields()
            setCourseType("online");
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <div className="flex flex-col w-full h-full">
            <div className="mt-10 mb-5 border-b w-full text-center">
                <Title level={3}>Nový kurz</Title>
            </div>
            <div className="flex flex-col items-center w-full">
                <Form
                    form={form}
                    name="addCourse"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 32 }}
                    layout="horizontal"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ type: "online"}}
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
                        <DatePicker.RangePicker placeholder={["Začátek", "Konec"]}/>
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
                        valuePropName={courseType}
                    >
                        <Radio.Group onChange={onRadioChange} value={courseType}>
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
                    {/* TODO - miss input for place - adress, city, url */}
                    {/* TODO - miss input for skills, content */}
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

export default CreateCourse