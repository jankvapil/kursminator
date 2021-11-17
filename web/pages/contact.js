import Content from '../components/common/Content'
import { Typography, Form, Input, Button, Checkbox } from 'antd';
import ProCard from '@/components/common/ProCard';

const { Title } = Typography;

///
/// Contact page
///
export default function contact() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Content >
            <ProCard>
                <Title className="text-center" level={2}>Kontaktujte nás</Title>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Jméno"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Chybí vaše jméno',
                            },
                        ]}
                    >
                        <Input placeholder="Vaše jmén"/>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Chybí váš email',
                            },
                        ]}
                    >
                        <Input placeholder="Váš email"/>
                    </Form.Item>

                    <Form.Item
                        label="Zpráva"
                        name="message"
                        rules={[
                            {
                                required: true,
                                message: 'Chybí zpráva',
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="Zpráva" />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        wrapperCol={{
                            xs: { offset: 0 }, sm: { offset: 8 },
                            span: 8,
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Musíte souhlasit',
                            },
                        ]}
                    >
                        <Checkbox>S odesláním toho furmuláře souhlasíte se zpracovaním
                            osobních údáju</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            xs: { offset: 0 }, sm: { offset: 8 },
                            span: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Odeslat
                        </Button>
                    </Form.Item>
                </Form>
            </ProCard>
        </Content>
    )
}
