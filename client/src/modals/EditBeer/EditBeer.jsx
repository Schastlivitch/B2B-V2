import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editBeerThunk } from "../../redux/thunks/beerThunk";


const EditBeer = ({ beer }) => {
  console.log(beer, 'beer======================>')
  const dispatch = useDispatch()
  const beerID = beer._id

  const [title, setTitle] = useState('');
  const [sort, setSort] = useState('');
  const [img, setImg] = useState('');
  const [abv, setAbv] = useState('');
  const [ibu, setIbu] = useState('');
  const [ebc, setEbc] = useState('');
  const [ph, setPh] = useState('');
  const [about, setAbout] = useState('');
  const [onceSupplyVolume, setOnceSupplyVolume] = useState('');
  const [permanentSupplyVolume, setPermanentSupplyVolume] = useState('');
  const [tareVolume, setTareVolume] = useState('');
  const [onceSupplyPrice, setOnceSupplyPrice] = useState('');
  const [permanentSupplyPrice, setPermanentSupplyPrice] = useState('');

  useEffect(() => {
    setTitle(beer.title)
    setSort(beer.sort)
    // setImg(beer.imageUrl)
    setAbv(beer.abv)
    setIbu(beer.ibu)
    setEbc(beer.ebc)
    setPh(beer.ph)
    setAbout(beer.about)
    setOnceSupplyVolume(beer.onceSupplyVolume)
    setPermanentSupplyVolume(beer.permanentSupplyVolume)
    setTareVolume(beer.tareVolume)
    setOnceSupplyPrice(beer.onceSupplyPrice)
    setPermanentSupplyPrice(beer.permanentSupplyPrice)
  }, [])

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const sortHandler = (e) => {
    setSort(e.target.value);
  };
  const imgHandler = (e) => {
    setImg(e.target.files[0]);
  };
  const abvHandler = (e) => {
    setAbv(e.target.value);
  };
  const ibuHandler = (e) => {
    setIbu(e.target.value);
  };
  const ebcHandler = (e) => {
    setEbc(e.target.value);
  };
  const phHandler = (e) => {
    setPh(e.target.value);
  };
  const aboutHandler = (e) => {
    setAbout(e.target.value);
  };
  const onceSupplyVolumeHandler = (e) => {
    setOnceSupplyVolume(e.target.value);
  };
  const permanentSupplyVolumeHandler = (e) => {
    setPermanentSupplyVolume(e.target.value);
  };
  const tareVolumeHandler = (e) => {
    setTareVolume(e.target.value);
  };
  const onceSupplyPriceHandler = (e) => {
    setOnceSupplyPrice(e.target.value);
  };
  const permanentSupplyPriceHandler = (e) => {
    setPermanentSupplyPrice(e.target.value);
  };

  const randomNum = Math.floor(Math.random() * 1000)

  function checkBeerImage (img, random) {
    if (img) {
      return `http://localhost:8080/images/beers/${random}.jpg`
    } else {
      return beer?.imageUrl
    }
  }

  const editBeerHandler = async () => {
    dispatch(editBeerThunk(img, randomNum,  { ...beer,
      title,
      // imageUrl: `/images/beers/${randomNum}.jpg`,
      imageUrl: checkBeerImage(img, randomNum),
      sort,
      abv: Number(abv),
      ibu: Number(ibu),
      ebc,
      ph,
      about,
      onceSupplyVolume,
      permanentSupplyVolume,
      tareVolume,
      onceSupplyPrice,
      permanentSupplyPrice, 
    }))
    setImg('')
  }

  return (
    <>
      <div className="modal fade" id={`editBeerModal${beer._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Редактирование</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul className="list-unstyled mt-3 mb-4">
              <li>
                  <div className="row ">
                    <div className="col-6 d-flex align-items-center">
                      <span>Название </span>
                    </div>
                    <div className="col-6">
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
                  <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Сорт </span>
                    </div>
                    <div className="col-6">
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
                  <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Крепость</span>
                    </div>
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={abv}
                        onChange={abvHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Горечь</span>
                    </div>
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={ibu}
                        onChange={ibuHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Насыщенность цвета </span>
                    </div>
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={ebc}
                        onChange={ebcHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Кислотность </span>
                    </div>
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={ph}
                        onChange={phHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Объем тары </span>
                    </div>
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={tareVolume}
                        onChange={tareVolumeHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Объем разовой поставки </span>
                    </div>
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={onceSupplyVolume}
                        onChange={onceSupplyVolumeHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Стоимость ед. при разовой поставке</span>
                    </div>
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={onceSupplyPrice}
                        onChange={onceSupplyPriceHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Объем постоянной поставки</span>
                    </div>
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={permanentSupplyVolume}
                        onChange={permanentSupplyVolumeHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Стоимость ед. при постоянной поставке</span>
                    </div>
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={permanentSupplyPrice}
                        onChange={permanentSupplyPriceHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                <div className="row mt-4">
                    <div className="col-6 d-flex align-items-center">
                      <span>Изображение </span>
                    </div>
                    <div class="custom-file col-6">
                      <input
                        type="file"
                        class="form-control"
                        id="inputGroupFile04"
                        onChange={imgHandler}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-5">
                    <span className="mb-3"><h5>Краткое описание</h5> </span>
                    <hr />
                    <div >
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
              </ul>
              <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={editBeerHandler} >Изменить</button>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default EditBeer;
