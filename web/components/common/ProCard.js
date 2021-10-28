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
                backgroundColor: "white",
                width: "1169px",
                margin: "auto"
            }}
        >
            {props.children}
        </Layout.Content>
    )
}

export default ProCard