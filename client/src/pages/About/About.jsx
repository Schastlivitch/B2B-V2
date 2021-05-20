
const About = () => {
  return (
    <div style={{ backgroundImage: 'url(images/background1.jpg)', height: '100vh' }} className="album pt-4">
      <div class="container">
        <div class="row">

          <div class="col-3">
            <div class="card shadow-lg">
              <img src="/images/amanat.jpeg" alt="" />
              <div class="card-body">
                <p class="card-text"><br />- Работа со сторонними API <br /><br /> - Управление проектом <br /><br /> - Backend</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">Молодой</small>
                </div>
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="card shadow-lg">
              <img src="/images/ivan.png" alt="" />
              <div class="card-body">
                <p class="card-text"><br />- Идея проекта <br /><br /> - Общая архитектура проекта <br /><br /> - Frontend </p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">Старше</small>
                </div>
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="card shadow-lg">
              <img src="/images/alexey.jpeg" alt="" />
              <div class="card-body">
                <p class="card-text"><br />- Стилизация проекта <br /><br /> - Интересные features проекта <br /><br /> - Frontend</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">Еще старше</small>
                </div>
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="card shadow-lg">
              <img src="/images/gosha.jpeg" alt="" />
              <div class="card-body">
                <p class="card-text"><br />- Работа со сторонними API <br /><br />  - Сотрудник месяца <br /><br /> - Backend</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">Вообще старый жесть</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About;
