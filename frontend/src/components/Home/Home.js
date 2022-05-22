import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import { Box, Avatar, WrapItem, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/user";
import { useEffect } from "react";
import { fetchAppointments } from "../../actions/appointment";
import Loading from "../Design/Loading/Loading";
import moment from "moment";
import MetaData from "../../utils/MetaData";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, appointments } = useSelector((state) => state.appointment);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch, user]);

  return (
    <>
      <MetaData title="Profile Page" />
      {user && loading && <Loading />}

      <Box bg="#2196f3" color="#fff">
        <Box w={[150, 150, 150, 150, 150]} m="0 auto 0 auto" pt="20px">
          <WrapItem>
            <Avatar
              size="2xl"
              name="Photo"
              src={user ? user.profile_pic : ""}
            />
          </WrapItem>
        </Box>
        <p className="homeMyProfile">My Profile</p>
        <hr className="home-hr-1" />
        <p className="homeUName">{user && user.fullName}</p>
        <p className="homeEmail">{user && user.email}</p>
        <div className="homeAppsDiv">
          <p>TOTAL APPOINTMENTS</p>
          <p className="homeNumber">{appointments ? appointments.length : 0}</p>
        </div>
        <div className="homeStreaksDiv">
          <p>STREAK</p>
          <p className="homeNumber">
            {appointments && appointments.length
              ? moment().diff(moment(appointments.at(-1).datetime), "days")
              : 0}
            <span> Days</span>
          </p>
        </div>
      </Box>

      <div className="dFlex justCent">
        <Link to="/create-appoinment">
          <Button
            className="homeBtns"
            bg="#2196f3"
            sx={{
              _hover: {
                bg: "#fff",
                color: "#2196f3",
                border: "1px solid #2196f3",
              },
            }}
          >
            Create new appointment
          </Button>
        </Link>
      </div>
      <div className="dFlex justCent">
        <Link to="/appointments">
          <Button
            className="homeBtns"
            bg="#2196f3"
            sx={{
              _hover: {
                bg: "#fff",
                color: "#2196f3",
                border: "1px solid #2196f3",
              },
            }}
          >
            View all appointments
          </Button>
        </Link>
      </div>
      <div className="dFlex justCent">
        {user ? (
          <Button
            className="homeBtns"
            bg="#2196f3"
            sx={{
              _hover: {
                bg: "#fff",
                color: "#2196f3",
                border: "1px solid #2196f3",
              },
            }}
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        ) : (
          <Link to="/auth">
            <Button bg="#2196f3" color="#fff" mt="20px" w="300px">
              LOGIN
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Home;
