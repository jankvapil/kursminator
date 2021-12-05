import React from 'react'
import moment from 'moment'
import { Typography, Input, Form, Button, Radio, Select, DatePicker, message, InputNumber } from 'antd'
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

import '@/core/types'
import { updatePlaceMutation } from '@/core/graphql/mutations/placesMutations'
import { updateCourseMutation } from '@/core/graphql/mutations/coursesMutations'

///
/// Edit course component
///
const EditCourse = (props) => {
    const course = props.course
    const [courseType, setCourseType] = React.useState(course.place.virtual ? "online" : "present");
    const onRadioChange = e => {
        setCourseType(e.target.value);
    };
    const dateFormat = "YYYY-MM-DD HH:mm";
    const onFinish = async (values) => {
        // update Place
        const coursePlaceId = course.place.id
        const isVirtual = courseType == "online"
        if (course.place.virtual && !isVirtual || !course.place.virtual && isVirtual) {
            const updatePlace = {
                id: course.place.id,
                virtual: isVirtual,
                name: course.place.name,
                url: course.place.url ?? "https://www.google.com/maps",
                address: values.address ?? course.place.address,
                city: course.place.city ?? "Brno"
            }
            const placeRes = await updatePlaceMutation(updatePlace)
            if (placeRes.updatePlace) {
                coursePlaceId = placeRes.updatePlace.id
            }
        }

        const updatedCourse = {
            id: course.id,
            name: values.name,
            photoUrl: values.photoUrl ?? course.photoUrl,
            capacity: values.capacity ?? course.capacity,
            type: values.category,
            difficulty: values.difficulty,
            date: moment(values.date).format(dateFormat),
            duration: values.duration,
            price: values.price,
            description: values.message,
            skills: course.skills,
            content: course.content,
            instructorId: values.instructorId,
            placeId: coursePlaceId
        }
        const res = await updateCourseMutation(updatedCourse)
        if (res.updateCourse) {
            message.success('Kurz byl úspěšně aktualizován')
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex flex-col w-full h-full">
            <div className="mt-10 mb-5 border-b w-full text-center">
                <Title level={3}>Editace kurzu</Title>
            </div>
            <div className="flex flex-col w-3/4 pl-28">
                <Form
                    name="addCourse"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 32 }}
                    layout="horizontal"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ 
                            name: course.name,
                            date: moment(course.date, dateFormat),
                            duration: course.duration,
                            price: course.price,
                            category: course.type,
                            instructorId: course.instructor.id,
                            difficulty: course.difficulty,
                            message: course.description,
                            capacity: course.capacity,
                            photoUrl: course.photoUrl,
                            address: course.place.address
                        }}
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
                        <DatePicker
                            placeholder="Začátek kurzu"
                            showTime={{ format: 'HH:mm' }}
                            format={dateFormat}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Délka trvání"
                        name="duration"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <Input type="number" placeholder="Počet minut" />
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
                        label="Místo konání"
                        name="address"
                        rules={[{ required: false}]}
                    >
                        <Input placeholder="Vyplňte pouze pro prezenční kurz" />
                    </Form.Item>

                    <Form.Item
                        label="Zpráva"
                        name="message"
                        rules={[{ required: true, message: 'Toto pole je povinné!' }]}
                    >
                        <TextArea placeholder="Minimum je 10 znaku." autoSize={true} />
                    </Form.Item>

                    <Form.Item
                        label="Kapacita"
                        name="capacity"
                        rules={[{ required: false }]}
                    >
                        <InputNumber min={10} max={100} />
                    </Form.Item>

                    <Form.Item
                        label="Url obrázku"
                        name="photoUrl"
                        rules={[{ required: false }]}
                    >
                        <TextArea placeholder="Zde mužete vložit url obrazku kurzu" autoSize={true} />
                    </Form.Item>
                    {/* TODO - miss input for place - adress, city, url */}
                    {/* TODO - miss input for skills, content */}
                    <Form.Item wrapperCol={{ offset: 22, span: 16 }}>
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