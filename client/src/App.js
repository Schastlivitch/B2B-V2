import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import NewBeer from "./modals/NewBeer/NewBeer";
import NewRequest from "./modals/NewRequest/NewRequest";
import Signin from "./modals/Signin/Signin";
import Signup from "./modals/Signup/Signup";
import About from "./pages/About/About";
import AllBeers from "./pages/AllBeers/AllBeers";
import AllRequests from "./pages/AllRequests/AllRequests";
import ChatsPage from "./pages/ChatsPage/ChatsPage";
import Home from "./pages/Home/Home";
import LKedit from "./pages/LKedit/LKedit";
import LKpage from "./pages/LKpage/LKPage";
import MyStaff from "./pages/MyStaff/MyStaff";
import Partners from "./pages/Partners/Partners";
import { getAllBeersThunk } from "./redux/thunks/beerThunk";
import { getAllBarsThunk, getAllBrewsThunk } from "./redux/thunks/partnerThunk";
import { getAllRequestsThunk } from "./redux/thunks/requestThunk";
import { authCheckThunk } from "./redux/thunks/userThunk";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authCheckThunk())
    dispatch(getAllBarsThunk())
    dispatch(getAllBrewsThunk())
    dispatch(getAllRequestsThunk())
    dispatch(getAllBeersThunk())
  }, [dispatch])

  const currentUser = useSelector(state => state.user)

  return (
    <>
      <Router>
        <Switch>

          <Route exact path="/">
            <Header />
            <Home />
          </Route>

          {
            currentUser?.role === 'bar' ?
              <Route exact path="/brewers">
                <Header />
                <Partners />
              </Route>
              :
              <Route exact path="/bars">
                <Header />
                <Partners />
              </Route>
          }

          {
            currentUser?.role === 'bar' ?
              <Route exact path="/allbeers">
                <Header />
                <AllBeers />
              </Route>
              :
              <Route exact path="/allrequests">
                <Header />
                <AllRequests />
              </Route>
          }

          <Route exact path="/lk">
            <Header />
            <LKpage />
          </Route>

          <Route exact path="/editprofile">
            <Header />
            <LKedit />
          </Route>

          <Route exact path="/mystaff">
            <Header />
            <MyStaff />
          </Route>

          <Route exact path="/chats">
            <Header />
            <ChatsPage />
          </Route>

          <Route exact path="/info">
            <Header />
            <About />
          </Route>

        </Switch>
        <Signup />
        <Signin />
        <NewRequest />
        <NewBeer />
      </Router>
    </>
  );
}

export default App;
