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
      <nav className="py-2 " style={{ backgroundColor: '#343A40' }}>
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
      <header className="py-3" style={{ backgroundColor: '#343A40' }}>
        <div className="container d-flex flex-wrap justify-content-center">
          <div className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
            <span className="fs-4 text-white">Beer2Bar</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-hand-thumbs-up mx-2" viewBox="0 0 16 16">
              <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
            </svg>
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
