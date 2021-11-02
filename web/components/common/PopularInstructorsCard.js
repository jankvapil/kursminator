import { Image } from 'antd';

///
/// PopularInstructorsCard component
///
const PopularInstructorsCard = (props) => {
    const courses = props.courses.slice(0, 3)

    return (
        <div className="flex " style={{ width: 470, background: "#F0F2F5" }}>
            <Image
              width={237}
              src={props.photoUrl}
              preview={false}
            />
            <div className="flex-col justify-center pl-12 pt-12">
              <p className="font-bold">{props.name}</p>
              <p className="text-gray-400">kurzy</p>
              {courses.map((c, i) => (<p key={i}>{c.name}</p>))}
            </div>
          </div>
    )
}

export default PopularInstructorsCard