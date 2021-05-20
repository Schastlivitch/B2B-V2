import PartnerModal from "../../modals/PartnerModal/PartnerModal";

const PartnerCard = ({ partner }) => {
  return (
    <>
      <div className="col">
        <div className="card shadow-sm">
          <img src={partner?.imageUrl} alt="" height="200px" />
          <div className="card-body">
            <strong>{partner?.title}</strong>
            {/* <p className="card-text">Текст длинной в 93 символа будет помещаться в 2 строки и дальше будет обрезаться с добавление...</p> */}
            <p className="card-text mt-2 text-muted">{partner?.about.slice(0,125)}...</p>

            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target={`#showPartner${partner?._id}`}>Смотреть</button>
              </div>
              <small><code>{partner?.location.city}</code></small>
            </div>
          </div>
        </div>
      </div>
      <PartnerModal partner={partner} />
    </>
  );
}

export default PartnerCard;
