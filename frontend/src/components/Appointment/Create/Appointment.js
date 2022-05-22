import {
  Box,
  FormControl,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Appointment.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Design/Loading/Loading";
import {
  createAppointment,
  clearErrors,
  clearMessages,
} from "../../../actions/appointment";
import MetaData from "../../../utils/MetaData";

const Appointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector((state) => state.appointment);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user === null) {
      Swal.fire("Oops", "Are you Logged In? Please Log In:)", "question");
      navigate("/auth");
    }
    if (message) {
      Swal.fire("Woho", message, "success");
      dispatch(clearMessages());
      navigate("/appointments");
    }
    if (error) {
      Swal.fire("Oops", error, "error");
      dispatch(clearErrors());
    }
  }, [dispatch, message, error, user, navigate]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    symptoms: [],
    datetime: "",
  });
  const { name, email, mobile, symptoms, datetime } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "symptom" && e.key === "Enter") {
      setValues({
        ...values,
        symptoms: [...symptoms, value],
      });
    } else setValues({ ...values, [name]: value });
  };
  const removeSymptom = (idx) => {
    setValues({
      ...values,
      symptoms: symptoms.filter((each, i) => i !== idx),
    });
  };
  const handleSubmit = () => {
    if (!name) return Swal.fire("Oops", "Name can't be empty", "warning");
    if (!email) return Swal.fire("Oops", "Email can't be empty", "warning");
    if (!mobile) return Swal.fire("Oops", "Mobile can't be empty", "warning");
    if (!datetime)
      return Swal.fire("Oops", "Date and Time was not selected", "warning");
    dispatch(createAppointment(values));
  };
  return (
    <>
      <MetaData title="Create appointments" />
      {loading && <Loading />}
      <Box>
        <Box bg="#2196f3" w="100%" h="60px" color="#fff" className="textCent">
          <Link to="/">
            <FaArrowLeft className="createAPIcon" />
          </Link>
          <p className="createAP">Create Appointments</p>
        </Box>
        <div className="dFlex justCent">
          <FormControl w="300px">
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Patient name"
              mt="20px"
            />
          </FormControl>
        </div>
        <div className="dFlex justCent">
          <FormControl w="300px">
            <Input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              mt="20px"
            />
          </FormControl>
        </div>
        <div className="dFlex justCent">
          <FormControl w="300px">
            <Input
              type="text"
              name="mobile"
              value={mobile}
              onChange={handleChange}
              placeholder="Mobile"
              mt="20px"
            />
          </FormControl>
        </div>
        <p className="darkgray textCent mt-1">Symptoms</p>
        <div className="dFlex justCent mt-1 mb-1">
          {symptoms.map((each, idx) => (
            <Tag
              key={idx}
              size="sm"
              variant="outline"
              m="5px 0 0 5px"
              sx={{ border: "1px solid #2196f3" }}
            >
              <TagLabel color="#2196f3">{each}</TagLabel>
              <TagCloseButton
                onClick={() => removeSymptom(idx)}
                color="#2196f3"
              />
            </Tag>
          ))}
        </div>
        <div className="dFlex justCent">
          <FormControl w="300px">
            <Input
              type="text"
              name="symptom"
              onKeyDown={handleChange}
              placeholder="Enter Symptom &amp; Hit Enter"
            />
          </FormControl>
        </div>

        <Box ml={[90, 240, 290, 420, 600]} mt="20px">
          <DatePicker
            selected={datetime}
            onChange={(date) => setValues({ ...values, datetime: date })}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy hh:mm aa"
            placeholderText="Choose Date and Time"
          />
        </Box>
        <div className="dFlex justCent">
          <Button
            w="300px"
            bg="#2196f3"
            color="#fff"
            mt="20px"
            sx={{
              _hover: {
                bg: "#fff",
                color: "#2196f3",
                border: "1px solid #2196f3",
              },
            }}
            onClick={handleSubmit}
          >
            CONTINUE
          </Button>
        </div>
      </Box>
    </>
  );
};

export default Appointment;
