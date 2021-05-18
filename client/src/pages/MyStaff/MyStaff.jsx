import { useSelector } from "react-redux";


const MyStaff = () => {

  const currenUser = useSelector(state => state.user)
  
  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 mb-3">
          Staff page
        </div>
      </div>
    </>
  )
}

export default MyStaff;


