import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { authCheckThunk } from '../../redux/thunks/userThunk';

const Signup = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [loginInput, setLoginInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [passInput, setPassInput] = useState('')
  const [roleInput, setRoleInput] = useState('')


  const loginInputHandler = (e) => {
    setLoginInput(() => e.target.value)
  }
  const passInputHandler = (e) => {
    setPassInput(() => e.target.value)
  }
  const emailInputHandler = (e) => {
    setEmailInput(() => e.target.value)
  }
  const roleInputHandler = (e) => {
    setRoleInput(() => e.target.value)
  }

  const signupHandler = async (e) => {
    console.log({ loginInput, emailInput, passInput, roleInput });
    const response = await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: loginInput,
        email: emailInput,
        password: passInput,
        role: roleInput
      })
    })
    if (response.status === 200) {
      setLoginInput('')
      setPassInput('')
      setEmailInput('')
    }
  }

  const [code, setCode] = useState("");
  const [wrongCode, setWrongCode] = useState(false)

  const codeInputHandler = (e) => {
    setCode(e.target.value);
  };

  const checkEmailFetch = async () => {
    const response = await fetch("http://localhost:8080/user/checkEmail", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: code })
    })
    if (response.status === 200) {
      const currentUser = await response.json()
      localStorage.setItem('token', `${currentUser.accessToken}`)
      dispatch(authCheckThunk())
      history.push('/editprofile')
    } else {
      setWrongCode(true)
      setCode('')

    }
  }

  return (
    <>
      <div class="modal fade" id="signupModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <form>
                <main className="form-signin text-center">
                  <div className="container">
                    <div className="text-center">
                      <h1 className=" fw-normal">Регистрация</h1>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <div className="form-floating mt-2" style={{ width: '350px' }}>
                        <input type="text" pattern="[0-9]*" className="form-control" id="floatingLogin" value={loginInput} onChange={loginInputHandler} placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Логин</label>
                      </div>
                      <div className="form-floating mt-2" style={{ width: '350px' }}>
                        <select class="form-select" value={roleInput} onChange={roleInputHandler}>
                          <option value="...">...</option>
                          <option value="bar">Бар</option>
                          <option value="brew">Пивовар</option>
                        </select>
                        <label htmlFor="floatingInput">Кто вы</label>
                      </div>
                      <div className="form-floating mt-2" style={{ width: '350px' }}>
                        <input type="email" className="form-control" id="floatingEmail" value={emailInput} onChange={emailInputHandler} placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Почта</label>
                      </div>
                      <div className="form-floating mt-2" style={{ width: '350px' }}>
                        <input type="password" className="form-control" id="floatingPassword" value={passInput} onChange={passInputHandler} placeholder="name@example.com" />
                        <label htmlFor="floatingPassword">Пароль</label>
                      </div>
                    </div>
                    <button className=" btn btn-lg btn-outline-secondary mt-4 mb-2" data-bs-target="#signupModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={signupHandler}>Зарегистрироваться</button>
                  </div>
                </main>
              </form>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="signupModalToggle2" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
                <main className="form-signin text-center">
                  <div className="container">
                    <div className="text-center">
                      <h1 className=" fw-normal mb-3">Подтверждение почты</h1>
                    </div>
                    <div className="text-center">
                      {
                        wrongCode ?
                          <p className="">Неверный код</p>
                          :
                          <p style={{ opacity: '0' }}>OK</p>
                      }
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <div className="form-floating mt-2" style={{ width: '350px' }}>
                        <input
                          type="text"
                          className="form-control"
                          id="floatingPassword"
                          value={code}
                          onChange={codeInputHandler}
                          placeholder="1234"
                        />
                        <label htmlFor="floatingPassword">Код подтверждения</label>
                      </div>
                    </div>
                    <button className=" btn btn-lg btn-outline-success mt-4 mb-2" data-bs-dismiss="modal" onClick={checkEmailFetch}>Подтвердить</button>
                  </div>
                </main>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Signup;
