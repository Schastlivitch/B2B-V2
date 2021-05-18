import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logoutUser } from '../../redux/AC/userAC'

const Header = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const currenUser = useSelector(state => state.user)

  const signoutUser = () => {
    dispatch(logoutUser())
    localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <>
      <nav className="py-2 bg-light border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            {
              currenUser?.role === 'bar' ?
                <>
                  <li className="nav-item"><Link to="/" className="nav-link link-dark px-2">Главная</Link></li>
                  <li className="nav-item"><Link to="/brewers" className="nav-link link-dark px-2">Пивоварни</Link></li>
                  <li className="nav-item"><Link to="/beers" className="nav-link link-dark px-2">Все пиво</Link></li>
                  <li className="nav-item"><Link to="/info" className="nav-link link-dark px-2">О нас</Link></li>
                </>
                :
                <>
                  <li className="nav-item"><Link to="/" className="nav-link link-dark px-2">Главная</Link></li>
                  <li className="nav-item"><Link to="/bars" className="nav-link link-dark px-2">Бары</Link></li>
                  <li className="nav-item"><Link to="/requests" className="nav-link link-dark px-2">Все запросы</Link></li>
                  <li className="nav-item"><Link to="/info" className="nav-link link-dark px-2">О нас</Link></li>
                </>
            }
          </ul>
          <ul className="nav">
            {
              currenUser?._id ?
                <>
                  <div className="dropdown">
                    <button className="btn btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton2"
                      data-bs-toggle="dropdown" aria-expanded="false">{currenUser.login}</button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                      <li><Link to="/editprofile" className="dropdown-item">Изменить профиль</Link></li>
                      <li><Link to="/lk" className="dropdown-item">Личный кабинет</Link></li>
                      {
                        currenUser?.role === 'bar' ?
                          <li><Link to="/mystaff" className="dropdown-item">Мои запросы</Link></li>
                          :
                          <li><Link to="/mystaff" className="dropdown-item">Мое пиво</Link></li>
                      }
                      <li><hr className="dropdown-divider" /></li>
                      <li><span className="dropdown-item" onClick={signoutUser}>Выйти</span></li>
                    </ul>
                  </div>
                </>
                :
                <>
                  <button type="button" className="btn btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#signinModal">Войти</button>
                  <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#signupModalToggle">Регистрация</button>
                </>
            }
          </ul>
        </div>
      </nav>
      <header className="py-3 mb-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-center">
          <div className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
            <span className="fs-4">Beer2Bar</span>
            {
              history.location.pathname === '/mystaff' && currenUser?.role === 'bar' ?
                <button type="button" className="btn btn-outline-success mx-3" data-bs-toggle="modal" data-bs-target="#newRequestModal">Добавить</button>
                :
                null
            }
            {
              history.location.pathname === '/mystaff' && currenUser?.role === 'brew' ?
                <button type="button" className="btn btn-outline-success mx-3" data-bs-toggle="modal" data-bs-target="#newBeerModal">Добавить</button>
                :
                null
            }
          </div>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0">
            <input type="search" className="form-control" placeholder="Поиск..." aria-label="Search" />
          </form>
        </div>
      </header>
    </>
  )
}

export default Header;
