import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import GetBeer from '../../modals/GetBeer/GetBeer'
import { logoutUser } from '../../redux/AC/userAC'

const Header = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const currenUser = useSelector(state => state.user)
  const allBeers = useSelector(state => state.beers)

  const signoutUser = () => {
    dispatch(logoutUser())
    localStorage.removeItem('token')
    history.push('/')
  }

  const [search, setSearch] = useState('')

  return (
    <>
      <nav className="py-2 " style={{backgroundColor:'#343A40'}}>
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            {
              !currenUser?._id ?
              <li className="nav-item"><Link to="/" className="nav-link link-light px-2">Главная</Link></li>
              :
              currenUser?.role === 'bar' ?
                <>
                  <li className="nav-item"><Link to="/allbeers" className="nav-link link-light px-2">Все пиво</Link></li>
                  <li className="nav-item"><Link to="/brewers" className="nav-link link-light px-2">Пивоварни</Link></li>
                  {/* <li className="nav-item"><Link to="/chats" className="nav-link link-light px-2">Чаты</Link></li> */}
                  <li className="nav-item"><Link to="/info" className="nav-link link-light px-2">О нас</Link></li>
                </>
                :
                <>
                  <li className="nav-item"><Link to="/allrequests" className="nav-link link-light px-2">Все запросы</Link></li>
                  <li className="nav-item"><Link to="/bars" className="nav-link link-light px-2">Бары</Link></li>
                  {/* <li className="nav-item"><Link to="/chats" className="nav-link link-light px-2">Чаты</Link></li> */}
                  <li className="nav-item"><Link to="/info" className="nav-link link-light px-2">О нас</Link></li>
                </>
            
          }
          </ul>
          <ul className="nav">
            {
              currenUser?._id ?
                <>
                  <div className="dropdown">
                    <button className="btn btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton2"
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
                      <li><Link className="dropdown-item" onClick={signoutUser}>Выйти</Link></li>
                    </ul>
                  </div>
                </>
                :
                <>
                  <button type="button" className="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#signinModal">Войти</button>
                  <button type="button" className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#signupModalToggle">Регистрация</button>
                </>
            }
          </ul>
        </div>
      </nav>
      <header className="py-3" style={{backgroundColor:'#343a403a'}}>
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
          {
            currenUser?._id && currenUser?.role === 'bar' ?

          <form className="col-12 col-lg-auto mb-3 mb-lg-0">
            <input type="search" className="form-control" placeholder="Поиск..." aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} data-bs-toggle="dropdown" />
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: "274px" }}>
              {
                search.length ? allBeers.filter(value => {
                  if (search === '') {
                    return value.title
                  }
                  else if (value.title.toLowerCase().includes(search.toLowerCase())) {
                    return value.title
                  }
                }).map(el => {
                  return (
                    <>
                    <li className='dropdown-item' onClick={() => setSearch('')}>
                      <button className="btn" data-bs-toggle="modal" data-bs-target={`#getBeerModal${el._id}`}>{el.title}</button>
                    </li>
                    <GetBeer beer={el} />
                    </>
                  )
                })
                  :
                  <li><span class="dropdown-item" >Введите название пива</span></li>
              }
            </ul>
          </form>
          :
          null
          }

        </div>
      </header>
    </>
  )
}

export default Header;
