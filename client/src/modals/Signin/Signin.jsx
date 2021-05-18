import { useState } from "react"
import { useDispatch } from "react-redux"
import { authCheckThunk } from "../../redux/thunks/userThunk"

const Signin = () => {

  const dispatch = useDispatch()

  const [emailInput, setEmailInput] = useState('')
  const [passInput, setPassInput] = useState('')

  const passInputHandler = (e) => {
    setPassInput(() => e.target.value)
  }

  const emailInputHandler = (e) => {
    setEmailInput(() => e.target.value)
  }

  const signinHandler = async (e) => {
    const response = await fetch('http://localhost:8080/user/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailInput,
        password: passInput,
      })
    })
    if (response.status === 200) {
      const currentBar = await response.json()
      localStorage.setItem('token', `${currentBar.accessToken}`)
      dispatch(authCheckThunk())
      setEmailInput('')
      setPassInput('')
    }
  }

  return (
    <>
      <div className="modal fade" id="signinModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-body">
              <main className="form-signin text-center">
                <div className="container">

                  <div className="text-center">
                    <h1 className=" fw-normal">Вход</h1>
                  </div>

                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="form-floating mt-2" style={{ width: '350px' }}>
                      <input type="email" className="form-control" id="floatingEmailSignin" placeholder="name@example.com" value={emailInput} onChange={emailInputHandler} />
                      <label htmlFor="floatingInput">Почта</label>
                    </div>

                    <div className="form-floating mt-2" style={{ width: '350px' }}>
                      <input type="password" className="form-control" id="floatingPasswordSignin" placeholder="Password" value={passInput} onChange={passInputHandler} />
                      <label htmlFor="floatingPassword">Пароль</label>
                    </div>
                  </div>


                  <button className=" btn btn-lg btn-outline-secondary mt-4 mb-2" type="submit" data-bs-dismiss="modal" onClick={signinHandler}>Войти</button>
                </div>
              </main>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Signin;
