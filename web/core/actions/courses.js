
///
/// sets courses
///
export const setCourses = (store, courses) => {
  console.log("Setting courses")
  console.log(courses)
  console.log(store)
  console.log(store.setState)

  store.setState(state => { state.courses = courses })
  console.log(store)
}
  