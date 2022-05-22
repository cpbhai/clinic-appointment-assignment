import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import { loadUser } from "./actions/user";
import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import Auth from "./components/User/Auth/Auth";
import CreateAppointment from "./components/Appointment/Create/Appointment";
import Appointments from "./components/Appointment/Appointments/Appointments";
import Loading from "./components/Design/Loading/Loading";
import { useEffect } from "react";

function App() {
  //
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      {/* <Header /> */}
      {loading && <Loading />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route
          exact
          path="/create-appoinment"
          element={<CreateAppointment />}
        />
        <Route exact path="/appointments" element={<Appointments />} />
      </Routes>
    </Router>
  );
}

export default App;
