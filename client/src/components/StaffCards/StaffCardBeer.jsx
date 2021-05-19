import { useSelector } from "react-redux";
import EditBeer from "../../modals/EditBeer/EditBeer"
import GetBeer from "../../modals/GetBeer/GetBeer"

const StaffCardBeer = ({ beer }) => {

  const currentUser = useSelector(state => state.user)

  return (
    <>
      <div className="col-4">
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">{beer.title}</h4>

          </div>
          <div className="card-body">
            <h4 className="card-title pricing-card-title">{beer.sort}</h4>

            <ul className="list-unstyled mt-3 mb-4">
              <li>
                <div className="row">
                  <div className="col-5"><span className="text-muted">Крепость</span></div>
                  <div className="col-4">{beer.abv}</div>
                </div>
              </li>
              <li>
                <div className="row mt-2">
                  <div className="col-5"><span className="text-muted">Горечь</span></div>
                  <div className="col-4">{beer.ibu}</div>
                </div>
              </li>
              <li>
                <div className="row mt-2">
                  <div className="col-5"><span className="text-muted">Кислотность</span></div>
                  <div className="col-4">{beer.ph}</div>
                </div>
              </li>
            </ul>

            {
              currentUser?.role === 'bar' ?
                <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target={`#getBeerModal${beer._id}`}>Смотреть</button>
                :
                <div className="d-flex align-items-center justify-content-center">
                  <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target={`#getBeerModal${beer._id}`}>Смотреть</button>
                  <button type="button" className="btn btn-outline-success mx-3" data-bs-toggle="modal" data-bs-target={`#editBeerModal${beer._id}`}>Изменить</button>
                  <button type="button" className="btn btn-outline-danger">Удалить</button>
                </div>
            }

          </div>
        </div>
      </div>
      <GetBeer beer={beer} />
      <EditBeer beer={beer} />
    </>
  );
}

export default StaffCardBeer;
