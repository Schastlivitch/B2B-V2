import { useSelector } from "react-redux";
import PartnerModalB from "../PartnerModal/PartnerModalB";


const GetBeer = ({ beer }) => {

  const allBrewers = useSelector(state => state.brews)
  const currentUser = useSelector(state => state.user)
  const currentBrewer = allBrewers?.filter(brew => brew._id === beer.brewery)
  console.log('BLA', currentBrewer);

  return (
    <>
      <div className="modal fade" id={`getBeerModal${beer._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{beer.title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul className=" container list-unstyled mt-3 mb-4 row">
                <div className="col-4 d-flex align-items-center justify-content-center">
                  <img src={beer?.imageUrl} alt="" width='130px' height='auto' />

                </div>
                <div className="col-8">
                  <li className="border-bottom">
                    <div className="row pb-2">
                      <div className="col-6 d-flex align-items-center">
                        <span className="">Сорт </span>
                      </div>
                      <div className="col-6">
                        <span>{beer.sort} </span>
                      </div>
                    </div>
                  </li>
                  <li className="border-bottom">
                    <div className="row mt-3 pb-3">
                      <div className="col-6 d-flex align-items-center">
                        <span>Крепость</span>
                      </div>
                      <div className="col-6">
                        <span>{beer.abv} % </span>
                      </div>
                    </div>
                  </li>
                  <li className="border-bottom">
                    <div className="row mt-3 pb-3">
                      <div className="col-6 d-flex align-items-center">
                        <span>Горечь</span>
                      </div>
                      <div className="col-6">
                        <span>{beer.ibu} ibu </span>
                      </div>
                    </div>
                  </li>
                  <li className="border-bottom">
                    <div className="row mt-3 pb-3">
                      <div className="col-6 d-flex align-items-center">
                        <span>Насыщенность цвета </span>
                      </div>
                      <div className="col-6">
                        <span>{beer.ebc} ebc </span>
                      </div>
                    </div>
                  </li>
                  <li className="border-bottom">
                    <div className="row mt-3 pb-3">
                      <div className="col-6 d-flex align-items-center">
                        <span>Кислотность </span>
                      </div>
                      <div className="col-6">
                        <span>{beer.ph} ph </span>
                      </div>
                    </div>
                  </li>
                  <li className="border-bottom">
                    <div className="row mt-3 pb-3">
                      <div className="col-6 d-flex align-items-center">
                        <span>Объем тары </span>
                      </div>
                      <div className="col-6">
                        <span>{beer.tareVolume} л </span>
                      </div>
                    </div>
                  </li>

                </div>
                <li className="border-bottom">
                  <div className="row mt-3 pb-3">
                    <div className="col-8 d-flex align-items-center">
                      <span>Объем разовой поставки </span>
                    </div>
                    <div className="col-4">
                      <span>{beer.onceSupplyVolume} шт </span>
                    </div>
                  </div>
                </li>
                <li className="border-bottom">
                  <div className="row mt-3 pb-3">
                    <div className="col-8 d-flex align-items-center">
                      <span>Стоимость ед. при разовой поставке</span>
                    </div>
                    <div className="col-4">
                      <span>{beer.onceSupplyPrice} руб </span>
                    </div>
                  </div>
                </li>
                <li className="border-bottom">
                  <div className="row mt-3 pb-3">
                    <div className="col-8 d-flex align-items-center">
                      <span>Объем постоянной поставки</span>
                    </div>
                    <div className="col-4">
                      <span>{beer.permanentSupplyVolume} шт/мес</span>
                    </div>
                  </div>
                </li>
                <li className="border-bottom">
                  <div className="row mt-3 pb-3">
                    <div className="col-8 d-flex align-items-center">
                      <span>Стоимость ед. при постоянной поставке</span>
                    </div>
                    <div className="col-4">
                      <span>{beer.permanentSupplyPrice} руб</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row mt-4">
                    <span className="mb-3"><h5>Краткое описание</h5> </span>
                    <hr />
                    <div >
                      <span>{beer.about} </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center justify-content-center ">
              {
                currentUser?._id === currentBrewer[0]?._id ?
                  null :
                  <button type="button" className="btn btn-outline-success mb-4" data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target={`#showPartnerB${currentBrewer[0]?._id}`}>Перейти к пивоварне</button>

              }
            </div>
          </div>
        </div>
      </div>
      <PartnerModalB key={currentBrewer[0]?._id} partner={currentBrewer[0]} />
    </>
  )
}

export default GetBeer;
