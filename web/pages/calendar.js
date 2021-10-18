import Content from '../components/common/Content'
import { Calendar, Badge, List, ConfigProvider } from 'antd'
import "moment/locale/cs";
import locate from "antd/lib/locale/cs_CZ";

///
/// Data List
///
const dataList = [
    {
        title: '8:00 - 10:00',
        description: '120 min',
        name: 'Angular zaciname',
        author: 'Leos Mares'
    },
    {
        title: '8:00 - 10:00',
        description: '120 min',
        name: 'Angular zaciname',
        author: 'Leos Mares'
    },
    {
        title: '8:00 - 10:00',
        description: '120 min',
        name: 'Angular zaciname',
        author: 'Leos Mares'
    },
    {
        title: '8:00 - 10:00',
        description: '120 min',
        name: 'Angular zaciname',
        author: 'Leos Mares'
    },
];

///
/// Data calendar
///
function getCalendarData(value) {
    let listData;
    switch (value.date()) {
        case 5:
            listData = [
                { type: 'warning', content: 'React začínáme' },
                { type: 'success', content: 'Angular začínáme' },
                { type: 'error', content: 'Joga' },
                { type: 'error', content: 'Fit trening' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'React začínáme' },
                { type: 'success', content: 'React začínáme' },
                { type: 'error', content: 'Fit trening' },
            ];
            break;
        case 24:
            listData = [
                { type: 'warning', content: 'Joga' },
                { type: 'success', content: 'React typescript' },
            ];
            break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getCalendarData(value);
    return (
        <ul className="events">
            {listData.map(item => (
                <li key={item.content}>
                    <Badge status={item.type} text={item.content} />
                </li>
            ))}
        </ul>
    );
}

///
/// Calendar page
///
export default function calendarPage() {

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    return (
        <Content>
            <div className="flex">
                <ConfigProvider locale={locate}>
                    <Calendar dateCellRender={dateCellRender} className="w-5/6" onPanelChange={onPanelChange} />
                    <List
                        className="w-1/6"
                        header={<p className="font-bold">15.12.2020</p>}
                        dataSource={dataList}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.title}
                                    description={item.description}
                                />
                                <List.Item.Meta
                                    title={item.name}
                                    description={item.author}
                                />
                            </List.Item>
                        )}
                    />
                </ConfigProvider>
            </div>
        </Content>
    )
}
