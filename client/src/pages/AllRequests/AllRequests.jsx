import { useSelector } from "react-redux";
import StaffCardRequest from "../../components/StaffCards/StaffCardRequest";

const AllRequests = () => {

  const allRequests = useSelector(state => state.requests)
  const allBars = useSelector(state => state.bars)

  return (
    <>
      <div className="container">
        <div id="mobile-filter" className="row">
          <div className='col-2'>
            <div className="py-3">
              <h5 className="font-weight-bold">Бар</h5>
              <div class="form-check">
                {
                  allBars?.map(bar => {
                    return (
                      <>
                        <input class="form-check-input" type="checkbox" value={bar.title} />
                        <label class="form-check-label" for="flexCheckDefault">{bar.title}</label>
                        <br />
                      </>
                    )
                  })
                }
              </div>
              <h5 className="font-weight-bold mt-4">Вид поставки</h5>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value={true} />
                <label class="form-check-label" for="flexCheckDefault">Постоянная поставка</label>
                <br />
                <input class="form-check-input" type="checkbox" value={false} />
                <label class="form-check-label" for="flexCheckDefault">Разовая поставка</label>
                <br />
              </div>
            </div>
          </div>
          <div className='col-10'>
            <div className="row mb-3">
              {allRequests?.length ? allRequests.map(request => <StaffCardRequest key={request._id} request={request} />) : 'Запросов нет'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllRequests;
