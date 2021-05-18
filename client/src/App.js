import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import NewRequest from "./modals/NewRequest/NewRequest";
import Signin from "./modals/Signin/Signin";
import Signup from "./modals/Signup/Signup";
import LKedit from "./pages/LKedit/LKedit";
import LKpage from "./pages/LKpage/LKPage";
import MyStaff from "./pages/MyStaff/MyStaff";
import Partners from "./pages/Partners/Partners";
import { getAllBarsThunk, getAllBrewsThunk } from "./redux/thunks/partnerThunk";
import { authCheckThunk } from "./redux/thunks/userThunk";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authCheckThunk())
    dispatch(getAllBarsThunk())
    dispatch(getAllBrewsThunk())
  }, [dispatch])



  return (
    <>
      <Router>
        <Switch>

          <Route exact path="/">
            <Header />
          </Route>

          <Route exact path="/brewers">
            <Header />
            <Partners />
          </Route>

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

        </Switch>
        <Signup />
        <Signin />
        <NewRequest />
      </Router>
    </>
  );
}

export default App;
