import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewRequestThunk } from "../../redux/thunks/requestThunk";

const NewRequest = () => {


  const dispatch = useDispatch()
  const userID = useSelector(state => state.user._id)

  const [title, setTitle] = useState('');
  const [isPermanentSupply, setIsPermanentSupply] = useState('');
  const [supplyVolume, setSupplyVolume] = useState('');
  const [price, setPrice] = useState('');
  const [about, setAbout] = useState('');
  const [sort, setSort] = useState('');

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

  const newRequestHandler = async () => {
    dispatch(addNewRequestThunk({
      bar: userID,
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
      <div className="modal fade" id="newRequestModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Новый запрос</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <ul className="list-unstyled mt-3 mb-4">
                  <li>
                    <div className="row">
                      <div className="col-4 d-flex align-items-center">
                        <span>Название запроса</span>
                      </div>
                      <div className="col-8">
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
                    <div className="row mt-3">
                      <div className="col-4 d-flex align-items-center">
                        <span>Вид поставки</span>
                      </div>
                      <div className="col-8">
                        <select class="form-select" value={isPermanentSupply} onChange={isPermanentSupplyHandler}>
                          <option value="...">...</option>
                          <option value={true}>Постоянная</option>
                          <option value={false}>Разовая</option>
                        </select>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row mt-3">
                      <div className="col-4 d-flex ">
                        <span>Краткое описание</span>
                      </div>
                      <div className="col-8">
                        <textarea
                          rows="4"
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
                    <div className="row mt-3">
                      <div className="col-4 d-flex align-items-center">
                        <span>Объем поставки</span>
                      </div>
                      <div className="col-8">
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
                    <div className="row mt-3">
                      <div className="col-4 d-flex align-items-center">
                        <span>Сорт</span>
                      </div>
                      <div className="col-8">
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
                    <div className="row mt-3">
                      <div className="col-4 d-flex align-items-center">
                        <span>Цена</span>
                      </div>
                      <div className="col-8">
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
            </div>
            <div className="modal-footer">
              <div className="container">
                <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={newRequestHandler}>Создать</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewRequest;
