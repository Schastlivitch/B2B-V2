
const PartnerCard = ({ partner }) => {
  return (
    <>
      <div className="col">
        <div className="card shadow-sm">
          <img src="https://static.tildacdn.com/tild6235-3533-4138-b363-666630346432/bage.jpg" alt="" />
          <div className="card-body">
            <strong>{partner.role}</strong>
            <p className="card-text">Текст длинной в 93 символа будет помещаться в 2 строки и дальше будет обрезаться с добавление...</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target={`#b`}>Смотреть</button>
              </div>
              <small><code>Город</code></small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PartnerCard;
