import { Layout } from 'antd';

///
/// ProCard component
///
const ProCard = (props) => {

    return (
        <Layout.Content
            className=""
            style={{
                padding: "24px",
                backgroundColor: "white"
            }}
        >
            {props.children}
        </Layout.Content>
    )
}

export default ProCard