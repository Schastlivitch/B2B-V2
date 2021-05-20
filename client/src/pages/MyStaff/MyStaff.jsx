import { useSelector } from "react-redux";
import StaffCardBeer from "../../components/StaffCards/StaffCardBeer";
import StaffCardRequest from "../../components/StaffCards/StaffCardRequest";


const MyStaff = () => {

  const currenUser = useSelector(state => state.user)
  const allRequests = useSelector(state => state.requests)
  const allBeers = useSelector(state => state.beers)
  const currenUserRequests = allRequests?.filter((request) => currenUser?._id === request.bar)
  const currenUserBeers = allBeers?.filter((beer) => currenUser?._id === beer.brewery)

  return (
    <div style={{backgroundImage:'url(images/background1.jpg)', height:'100vh'}} className="pt-4">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 mb-3">
          {
            currenUser?.role === 'bar' && currenUserRequests?.length ?
              currenUserRequests.map(request => {
                return (<StaffCardRequest key={request._id} request={request} />)
              })
              :
              currenUser?.role === 'brew' && currenUserBeers?.length ?
              currenUserBeers.map(beer => {
                  return (<StaffCardBeer key={beer._id} beer={beer} />)
                })

                :
                null
          }


        </div>
      </div>
    </div>
  )
}

export default MyStaff;


