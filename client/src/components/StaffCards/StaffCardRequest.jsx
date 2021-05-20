import { useDispatch, useSelector } from "react-redux";
import EditRequest from "../../modals/EditRequest/EditRequest";
import PartnerModalB from "../../modals/PartnerModal/PartnerModalB";
import { deleteRequestThunk } from "../../redux/thunks/requestThunk";

const StaffCardRequest = ({ request }) => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)

  const allBars = useSelector(state => state.bars)
  const currentBar = allBars?.filter(bar => bar._id === request.bar)


  const deleteHandler = (id) => {
    dispatch(deleteRequestThunk(id))
  }

  return (
    <>
      <div className="col-4">
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">{request.title}</h4>
          </div>
          <div className="card-body">
            <h4 className="card-title pricing-card-title">{request.sort}</h4>

            <ul className="list-unstyled mt-3 mb-4">
              <li>
                <div className="row">
                  <div className="col-6"><span className="text-muted">Вид поставки</span></div>
                  <div className="col-5">{request.isPermanentSupply ? "Постоянная" : "Разовая"}</div>
                </div>
              </li>
              <li>
                <div className="row mt-2">
                  <div className="col-6"><span className="text-muted">Объем поставки</span></div>
                  <div className="col-5">{request.supplyVolume}</div>
                </div>
              </li>
              <li>
                <div className="row mt-2">
                  <div className="col-6"><span className="text-muted">Цена</span></div>
                  <div className="col-5">{request.price}</div>
                </div>
              </li>
            </ul>

            {
              currentUser?.role === 'brew' ?
                <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target={`#showPartnerB${currentBar[0]?._id}`}>Перейти к бару</button>
                :
                <div className="d-flex align-items-center justify-content-center">
                  <button type="button" className="btn btn-outline-success mx-3" data-bs-toggle="modal" data-bs-target={`#editRequest${request._id}`}>Изменить</button>
                  <button type="button" className="btn btn-outline-danger" onClick={() => deleteHandler(request._id)} >Удалить</button>
                </div>
            }
          </div>
        </div>
      </div>
      <EditRequest request={request} />
      <PartnerModalB key={currentBar[0]?._id} partner={currentBar[0]} />
    </>
  );
}

export default StaffCardRequest;
