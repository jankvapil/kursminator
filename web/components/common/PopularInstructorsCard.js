import { Image } from 'antd';

///
/// PopularInstructorsCard component
///
const PopularInstructorsCard = (props) => {
    
    return (
        <div className="flex " style={{ width: 470, background: "#F0F2F5" }}>
            <Image
              width={237}
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              preview={false}
            />
            <div className="flex-col justify-center pl-12 pt-12">
              <p className="font-bold">{props.name}</p>
              <p className="text-gray-400">kurzy</p>
              <p>{props.courses}</p>
              <p>angular</p>
              <p>sport </p>
            </div>
          </div>
    )
}

export default PopularInstructorsCard