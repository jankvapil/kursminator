import { Layout } from 'antd';

///
/// ProCard component
///
const ProCard = (props) => {

    return (
        <Layout.Content
            className={`${props?.className} w-full sm:w-5/6`}
            style={{
                padding: "24px",
                backgroundColor: "white",
            }}
        >
            {props.children}
        </Layout.Content>
    )
}

export default ProCard