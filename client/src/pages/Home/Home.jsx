const Home = () => {

  return (
    // <div style={{backgroundImage:'url(images/background1.jpg)', height:'100vh'}}>
    // <div class="d-flex h-100 text-center text-white bg-dark">
    // <div style={{backgroundClip:'rgba(199 224 229)', height:'100vh'}}>
    //   <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    //     <main class="px-3">
    //       <h1>Cover your page.</h1>
    //       <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
    //       <p class="lead">
    //         <a href="#" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
    //       </p>
    //     </main>
    //   </div>
    // </div>
    // </div>
    <div class="container my-5">
    <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 class="display-4 fw-bold lh-1 pb-5">Beer2Bar & Bar2Beer?</h1>
        <p class="lead pb-3">Вы начинающий пивовар? </p>
        <p class="lead pb-3 mb-5">Наш сервис позволит вам найти достойный бар для вашего пива!</p>
        <p class="lead pb-3">Вы начинающий бар? </p>
        <p class="lead pb-3">Наш сервис поможет вам найти хорошего пивовара!</p>
        {/* <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <button type="button" class="btn btn-outline-secondary btn-lg px-4 me-md-2 fw-bold">Зарегистрироваться</button>
          <button type="button" class="btn btn-outline-info btn-lg px-4">Войти</button>
        </div> */}
      </div>
      <div class="col-lg-3 offset-lg-1 p-3 overflow-hidden">
          <img class="rounded-lg-3" src="/images/Jaws-Lager.png" alt="" width="360"/>
      </div>
    </div>
  </div>
    
  );
}
 
export default Home;
