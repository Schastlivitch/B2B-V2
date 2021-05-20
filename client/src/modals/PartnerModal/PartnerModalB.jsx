import { useDispatch, useSelector } from "react-redux";
import { addToFavThunk } from "../../redux/thunks/userThunk";
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import Chat from "../Chat/Chat";


const PartnerModalB = ({ partner }) => {

  console.log("PARTNER",partner);

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.user)
  const currentUserID = currentUser?._id

  const addToFavHandler = (userID, partnerID) => {
    dispatch(addToFavThunk(userID, partnerID))
  }

  console.log(partner?.location?.longitude, partner?.location?.latitude);
  const mapData = {
    center: [Number(partner?.location?.latitude), Number(partner?.location?.longitude) ],
    zoom: 9,
  };

  const coordinates = [
    [Number(partner?.location?.latitude), Number(partner?.location?.longitude)]
  ];

  return (
    <>
      <div class="modal fade" id={`showPartnerB${partner?._id}`} tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Информация</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <>
                <div className="container">
                  <div className="row mb-5">
                    <div className="col-5 d-flex justify-content-center align-items-center">
                      <img src={partner?.imageUrl} alt="Аватар" width="400px" height="190px" />
                    </div>
                    <div className='col-7'>
                      <div className="container ms-3">
                        <h3>{partner?.title}</h3>
                        <hr />
                        <div className="row mt-3">
                          <div className="col-3">
                            <span>Почта</span>
                          </div>
                          <div className="col-8">
                            <span>{partner?.email}</span>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-3">
                            <span>Адрес</span>
                          </div>
                          <div className="col-8">
                            <span>{partner?.location?.fullAddress}</span>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-3">
                            <span>Телефон</span>
                          </div>
                          <div className="col-8">
                            <span>{partner?.contacts?.telephone}</span>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-3">
                            <span>Telegram</span>
                          </div>
                          <div className="col-8">
                            <span>{partner?.contacts?.telegram}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="container ">
                      <h3>Описание</h3>
                      <hr />
                      <p>{partner?.about}</p>

                    </div>
                    <div className="container ">
                      <h3>Расположение</h3>
                      <hr />
                      <YMaps >
                        <Map defaultState={mapData} width="100%">
                          {coordinates.map(coordinate => <Placemark geometry={coordinate} />)}
                        </Map>
                      </YMaps>
                    </div>
                  </div>
                </div>
              </>
            </div>
            <div class="modal-footer">
              {
                currentUser?.favourites.includes(partner?._id) ?
                  <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" data-bs-target={`#getChat${partner?._id}`} data-bs-toggle="modal" >Начать чат</button>
                  :
                  <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal" onClick={() => addToFavHandler(currentUserID, partner?._id)}>Добавить в избранное</button>
              }
            </div>
          </div>
        </div>
      </div>
      <Chat partner={partner} />
    </>
  );
}

export default PartnerModalB
