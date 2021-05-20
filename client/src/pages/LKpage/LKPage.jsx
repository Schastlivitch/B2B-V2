import { useSelector } from "react-redux";
import PartnerCard from "../../components/PartnerCard/PartnerCard";

const LKpage = () => {
  const currenUser = useSelector((state) => state.user);
  const allBars = useSelector((state) => state.bars);
  const allBrewers = useSelector((state) => state.brews);

  const allFavBars = allBars.map((bar) => {
    if (currenUser?.favourites?.includes(bar._id)) {
      console.log(bar);
      return bar;
    }
  });
  console.log(allBrewers);
  let allFavBrewers = [];
  // const allFavBrewers = allBrewers?.map(brew => {
  //   if (currenUser?.favourites?.includes(brew._id)) {
  //     console.log(brew);
  //     return brew
  //   }
  allBrewers?.forEach((el) => {
    if (currenUser?.favourites?.includes(el._id)) {
      allFavBrewers.push(el);
    }
  });

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
                {currenUser?.favourites?.length && currenUser?.role === "brew"
                  ? allFavBars?.map((partner) => {
                      return (
                        <PartnerCard key={partner?._id} partner={partner} />
                      );
                    })
                  : currenUser?.favourites?.length && currenUser?.role === "bar"
                  ? allFavBrewers?.map((partner) => {
                      return (
                        <PartnerCard key={partner?._id} partner={partner} />
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LKpage;
