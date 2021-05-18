import { useSelector } from "react-redux";
import PartnerCard from "../../components/PartnerCard/PartnerCard";


const LKpage = () => {

  const currenUser = useSelector(state => state.user)

  return (
    <>
      <div className="container">
        <div className="row mb-5">
          <div className="col-3 d-flex justify-content-center align-items-center">
            <img src="https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png" alt="Аватар" width="300px" height="300px" />
          </div>
          <div className='col-9'>
            <div className="container ms-5">
              <h3>{currenUser?.title}</h3>
              <hr />
              <div className="row">
                <div className="col-3">
                  <span>Логин</span>
                </div>
                <div className="col-8">
                  <span>{currenUser?.login}</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <span>Почта</span>
                </div>
                <div className="col-8">
                  <span>{currenUser?.email}</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <span>Адрес</span>
                </div>
                <div className="col-8">
                  <span>{currenUser?.location?.fullAddress}</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <span>Телефон</span>
                </div>
                <div className="col-8">
                  <span>{currenUser?.contacts?.telephone}</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <span>Telegram</span>
                </div>
                <div className="col-8">
                  <span>{currenUser?.contacts?.telegram}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container ">
            <h3>Описание</h3>
            <hr />
            <p>{currenUser?.about}</p>

            <h3>Избранное</h3>
            <hr />
            <div className="album py-3">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {/* Тут начало одной карточки */}
                {
                  currenUser?.favourites.map(partner => {
                    return (
                      <PartnerCard key={partner._id} partner={partner} />
                    )
                  })
                }
                {/* Тут конец одной карточки */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LKpage;

