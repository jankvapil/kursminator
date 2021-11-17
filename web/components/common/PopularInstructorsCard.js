import { Image } from 'antd';
import { useRouter } from 'next/router'

///
/// PopularInstructorsCard component
///
const PopularInstructorsCard = (props) => {
  const router = useRouter()
  const courses = props.courses.slice(0, 3)

  return (
    <div className="flex mb-5 w-72 md:w-2/5" style={{ background: "#F0F2F5" }}>
      <Image
        className="cursor-pointer"
        onClick={() => router.push(`instructorDetail?id=${props.id}`)}
        width={200}
        src={props.photoUrl}
        preview={false}
      />
      <div className="flex-col justify-center pl-3 pt-3 md:pl-12 md:pt-3">
        <p className="font-bold mb-2 cursor-pointer" onClick={() => router.push(`instructorDetail?id=${props.id}`)}>{props.name}</p>
        <p className="text-gray-400 mb-2">kurzy</p>
        {courses.map((c, i) => (<p className="mb-2 cursor-pointer" onClick={() => router.push(`courseDetail?id=${c.id}`)} key={i} >{c.name}</p>))}
      </div>
    </div>
  )
}

export default PopularInstructorsCard