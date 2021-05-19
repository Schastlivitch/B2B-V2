import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editRequestThunk } from "../../redux/thunks/requestThunk";

const EditRequest = ({request}) => {

  const dispatch = useDispatch()
  // const userID = useSelector(state => state.user._id)
  const requestID = request._id

  const [title, setTitle] = useState('');
  const [isPermanentSupply, setIsPermanentSupply] = useState('');
  const [supplyVolume, setSupplyVolume] = useState('');
  const [price, setPrice] = useState('');
  const [about, setAbout] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    setTitle(request.title)
    setIsPermanentSupply(request.isPermanentSupply)
    setSupplyVolume(request.supplyVolume)
    setPrice(request.price)
    setAbout(request.about)
    setSort(request.sort)
  }, [])

  const isPermanentSupplyHandler = (e) => {
    setIsPermanentSupply(e.target.value);
  };
  const supplyVolumeHandler = (e) => {
    setSupplyVolume(e.target.value);
  };
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const aboutHandler = (e) => {
    setAbout(e.target.value);
  };
  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  const editRequestHandler = async () => {
    dispatch(editRequestThunk({
      _id: requestID,
      isPermanentSupply,
      supplyVolume,
      price,
      title,
      about,
      sort
    }));
    setIsPermanentSupply('');
    setSupplyVolume('');
    setPrice('');
    setTitle('')
    setAbout('')
    setSort('')
  }

  return (
    <>
      <div className="modal fade" id={`editRequest${request._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Новый запрос</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  <div className="row">
                    <div className="col-3 d-flex align-items-center">
                      <span>Название запроса</span>
                    </div>
                    <div className="col-9">
                      <input
                        value={title}
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={titleHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-2">
                    <div className="col-3 d-flex align-items-center">
                      <span>Вид поставки</span>
                    </div>
                    <div className="col-9">
                      <select class="form-select" value={isPermanentSupply} onChange={isPermanentSupplyHandler}>
                        <option value="...">...</option>
                        <option value={true}>Постоянная</option>
                        <option value={false}>Разовая</option>
                      </select>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-2">
                    <div className="col-3 d-flex ">
                      <span>Краткое описание</span>
                    </div>
                    <div className="col-9">
                      <textarea
                        rows="5"
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={about}
                        onChange={aboutHandler}
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div className="row mt-2">
                    <div className="col-3 d-flex align-items-center">
                      <span>Объем поставки</span>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={supplyVolume}
                        onChange={supplyVolumeHandler}
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div className="row mt-2">
                    <div className="col-3 d-flex align-items-center">
                      <span>Сорт</span>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={sort}
                        onChange={sortHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-2">
                    <div className="col-3 d-flex align-items-center">
                      <span>Цена</span>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={price}
                        onChange={priceHandler}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={editRequestHandler} >Изменить</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditRequest;
