import { AddressSuggestions } from "react-dadata"; // Для автозаполнения адреса
import "react-dadata/dist/react-dadata.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { editProfileThunk } from "../../redux/thunks/userThunk";

const LKedit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currenUser = useSelector((state) => state.user);
  const ID = currenUser?._id;

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [telephone, setTelephone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(false); // для обработки ошибки, если неверно ввели формат адреса

  useEffect(() => {
    setTitle(currenUser.title);
    setCity(currenUser.location?.city);
    setTelephone(currenUser.contacts?.telephone);
    setTelegram(currenUser.contacts?.telegram);
    setAbout(currenUser.about);
  }, []);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const cityHandler = (e) => {
    setCity(e.target.value);
  };
  const telephoneHandler = (e) => {
    setTelephone(e.target.value);
  };
  const telegramHandler = (e) => {
    setTelegram(e.target.value);
  };
  const aboutHandler = (e) => {
    setAbout(e.target.value);
  };
  const avatarHandler = (e) => {
    setAvatar(e.target.files[0]);
  };
  const randomNum = Math.floor(Math.random() * 1000)

  const submitHandler = (id, fileAvatar, changes) => {
    dispatch(editProfileThunk(ID, fileAvatar, changes, randomNum));
    history.push("/lk");
  };

  function checkAvatar (img, random){
    if (img) {
      return `http://localhost:8080/images/avatars/${random}.jpg`
    } else {
      return currenUser?.imageUrl
    }
  }

  return (
    <div style={{backgroundImage:'url(images/background1.jpg)', height:'100vh'}} className="pt-4">
      <div className="container">
        <div className="row mb-5">
          <div className="col-5 d-flex justify-content-center align-items-center">
          <img
              src={currenUser?.imageUrl}
              alt="avatar"
              width="504"
              height="240px"
              
            />
          </div>
          <div className="col-7">
            <div className="container ms-5">
              <h3>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={titleHandler}
                />
              </h3>
              <hr />
              <div className="row">
                <div className="col-3">
                  <span>Логин</span>
                </div>
                <div className="col-9">
                  <span>{currenUser?.login}</span>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-3">
                  <span>Почта</span>
                </div>
                <div className="col-9">
                  <span>{currenUser?.email}</span>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-3">
                  <span>Адрес</span>
                </div>
                <div className="col-9">
                  {error ? (
                    <label style={{ color: "red" }} htmlFor="floatingInput">
                      Неверный формат адреса
                    </label>
                  ) : (
                    <></>
                  )}
                  <AddressSuggestions
                    token="1d3a047e1cd41a2ac73eeab24eb65590195a304f"
                    value={address}
                    onChange={setAddress}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <span>Телефон</span>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control"
                    value={telephone}
                    onChange={telephoneHandler}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <span>Telegram</span>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control"
                    value={telegram}
                    onChange={telegramHandler}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <span>Аватар</span>
                </div>
                <div class="custom-file col-9">
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile04"
                    onChange={avatarHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h3>Описание</h3>
          <hr />
          <textarea
            type="text"
            className="form-control"
            value={about}
            onChange={aboutHandler}
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-success my-4"
          onClick={() =>
            submitHandler(ID, avatar, {
              // imageUrl: `http://localhost:8080/images/avatars/${randomNum}.jpg`,
              imageUrl: checkAvatar(avatar, randomNum),
              title,
              about,
              location: {
                city: address.data.city,
                fullAddress: address.value,
                latitude: address.data.geo_lat,
                longitude: address.data.geo_lon,
              },
              contacts: { telephone, telegram },
            })
          }
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};


export default LKedit;
