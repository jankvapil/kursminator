
import Content from '@/components/common/Content'
import { useEffect, useState } from 'react'
import { Row, Col, message } from 'antd'
import { getUserInfo } from '@/core/graphql/queries/userQueries'
import { Table, Popover, Button } from 'antd'
import { useRouter } from 'next/router'
import { cancelReservationMutation } from '@/core/graphql/mutations/userMutations'
import ProCard from '@/components/common/ProCard'

///
/// My profile page includes favourite courses, personal info, 
///  credit history and past/next courses overview 
///
export default function myProfilePage(props) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [favouriteCourses, setFavouriteCourses] = useState([])
  const [ls, setLs] = useState(null)
  useEffect(() => {
    setLs(window.localStorage)
    loadUserInfo()
  }, [])

  const loadUserInfo = async () => {
    const res = await getUserInfo()
    const reservations = res.userCourseReservations.map(c => { return { ...c.course, state: c.state }})
    const sorted = reservations.sort((a, b) => new Date(b.date) - new Date(a.date))
    setFavouriteCourses(sorted)
    setCurrentUser(res)
  }

  const cancelCourseReservation = async (userId, courseId) => {
    const res = await cancelReservationMutation(userId, courseId)
    if (res?.cancelReservation) {
      message.success("Zrušení rezervace proběhlo úspěšně")
      await loadUserInfo()
    } else {
      message.error("Nepodařilo se rezervaci zrušit")
    }
  }

  return (
    <Content>
      <ProCard>
        {
          ls && ls.getItem("isLogged") === 'true' && currentUser ? (
            <Row className="min-h-screen">
              <Col span={6} className="my-10">
                <h1 className="text-3xl text-center mb-8">{currentUser.name} {currentUser.surname}</h1>
                <img className="h-32 w-32 rounded-full mx-auto" src={currentUser.photoUrl}></img>

                <span className="block w-full text-center my-8 text-2xl"> {currentUser.credits} kreditů </span>

                {/* <button onClick={showLocalStorage}>My Profile</button> */}
                {/* <button className="text-xl m-6" onClick={() => localStorage.clear()}>logout</button> */}
              </Col>
              <Col span={18}>

                <section className="mt-10 mr-4">
                  <h2 className="text-2xl mb-8 pt-1">Moje kurzy</h2>
                  <Table
                    rowKey="id"
                    columns={[
                      {
                        title: 'Název',
                        dataIndex: 'id',
                        render: id => <button onClick={() => router.push(`courseDetail?id=${id}`)}>{favouriteCourses.filter(c => c.id == id)[0].name}</button>,
                      },
                      {
                        title: 'Datum',
                        dataIndex: 'date',
                        render: text => text.substring(0, 10)
                      },
                      {
                        title: 'Status',
                        dataIndex: 'state',
                        render: text => <span className="bg-blue-200 rounded-md py-1 px-1.5">{ text }</span>
                      },
                      {
                        title: 'Zrušit rezervaci',
                        dataIndex: 'id',
                        // render: id => <CancelReservationButton userId={currentUser.id} course={favouriteCourses.filter(c => c.id == id)[0]}/>
                        render: id => {
                          const course = favouriteCourses.filter(c => c.id == id)[0]
                          const shouldRender = course.state == "APPROVED"
                          
                          return (shouldRender ? <button onClick={() => cancelCourseReservation(currentUser.id, course.id)}>zrusit</button> : "")
                        }
                      },
                      {
                        title: 'Cena',
                        dataIndex: 'price',
                      }]}
                    dataSource={favouriteCourses} />
                </section>

              </Col>
            </Row>
          ) : (<h1>Sorry, you are not logged in.</h1>)
        }
      </ProCard>
    </Content>
  )
}

// ///
// /// This gets called on every request
// ///
// export const getServerSideProps = async () => {
//   const courses = await fetchAllCourses()
//   return { props: { data: { ...courses } } }
// }
