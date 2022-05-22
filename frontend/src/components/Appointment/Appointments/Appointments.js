import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAppointments } from "../../../actions/appointment";
import Swal from "sweetalert2";
import Loading from "../../Design/Loading/Loading";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import { Box } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Appointments.css";
import MetaData from "../../../utils/MetaData";

const Appointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, appointments } = useSelector((state) => state.appointment);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user === null) {
      Swal.fire("Oops", "Are you Logged In? Please Log In:)", "question");
      navigate("/auth");
    }
    dispatch(fetchAppointments());
  }, [dispatch, user, navigate]);

  return (
    <>
      <MetaData title="All appointments" />
      {user && loading && <Loading />}
      <Box bg="#2196f3" w="100%" h="60px" color="#fff" className="textCent">
        <Link to="/">
          <FaArrowLeft className="appsIcon" />
        </Link>
        <p className="apps">All appointments</p>
      </Box>
      <div className="appsDiv">
        {appointments &&
          appointments.map((each, idx) => (
            <AppointmentCard data={each} key={idx} />
          ))}
      </div>
    </>
  );
};

export default Appointments;
