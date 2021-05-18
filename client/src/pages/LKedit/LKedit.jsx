import { AddressSuggestions } from 'react-dadata'; // Для автозаполнения адреса
import 'react-dadata/dist/react-dadata.css';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { editProfileThunk } from '../../redux/thunks/userThunk';

const LKedit = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currenUser = useSelector(state => state.user)
  const ID = currenUser?._id

  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')
  const [telephone, setTelephone] = useState('')
  const [telegram, setTelegram] = useState('')
  const [about, setAbout] = useState('')
  const [address, setAddress] = useState('')

  const [error, setError] = useState(false) // для обработки ошибки, если неверно ввели формат адреса

  useEffect(() => {
    setTitle(currenUser.title)
    setCity(currenUser.location?.city)
    setTelephone(currenUser.contacts?.telephone)
    setTelegram(currenUser.contacts?.telegram)
    setAbout(currenUser.about)
  }, [])

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }
  const cityHandler = (e) => {
    setCity(e.target.value)
  }
  const telephoneHandler = (e) => {
    setTelephone(e.target.value)
  }
  const telegramHandler = (e) => {
    setTelegram(e.target.value)
  }
  const aboutHandler = (e) => {
    setAbout(e.target.value)
  }


  const submitHandler = (id, changes) => {
    dispatch(editProfileThunk(id, changes))
    history.push('/lk')
  }


  return (
    <>
      <div className="container">
        <div className="row mb-5">
          <div className="col-3 d-flex justify-content-center align-items-center">
            <img src="https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png" alt="Аватар" width="300px" height="300px" />
          </div>
          <div className='col-9'>
            <div className="container ms-5">
              <h3>
                <input type="text" className="form-control" value={title} onChange={titleHandler} />
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
              <div className="row mt-3">
                <div className="col-3">
                  <span>Почта</span>
                </div>
                <div className="col-9">
                  <span>{currenUser?.email}</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <span>Адрес</span>
                </div>
                <div className="col-9">

                  {error ? <label style={{ color: 'red' }} htmlFor="floatingInput">Неверный формат адреса</label> : <></>}
                  <AddressSuggestions token="1d3a047e1cd41a2ac73eeab24eb65590195a304f" value={address} onChange={setAddress} />

                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <span>Телефон</span>
                </div>
                <div className="col-9">
                  <input type="text" className="form-control" value={telephone} onChange={telephoneHandler} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <span>Telegram</span>
                </div>
                <div className="col-9">
                  <input type="text" className="form-control" value={telegram} onChange={telegramHandler} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h3>Описание</h3>
          <hr />
          <textarea type="text" className="form-control" value={about} onChange={aboutHandler} />
        </div>
        <button type="button" className="btn btn-outline-success my-4" onClick={() => submitHandler(ID, { title, about, location: { city: address.data.city, fullAddress: address.value, latitude: address.data.geo_lat, longitude: address.data.geo_lon }, contacts: { telephone, telegram }, })}>Сохранить изменения</button>
      </div>
    </>
  )
}

export default LKedit;

