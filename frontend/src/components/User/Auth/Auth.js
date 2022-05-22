import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Image,
  FormControl,
  Input,
  Button,
  Avatar,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import "./Auth.css";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  login,
  clearErrors,
  clearMessages,
  signup,
} from "../../../actions/user";
import MetaData from "../../../utils/MetaData";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, message, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      Swal.fire("Oops", error, "error");
      dispatch(clearErrors());
    }
    if (user) {
      if (message) {
        Swal.fire("Woho", message, "success");
        dispatch(clearMessages());
      }
      navigate("/");
    }
  }, [dispatch, user, message, error, navigate]);

  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [signupValues, setSignupValues] = useState({
    fullName: "",
    email: "",
    password: "",
    profile_pic: "",
    preview_pic: "",
    skills: [],
  });
  const [type, setType] = useState("Login"); //tab type
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (type === "Login") setLoginValues({ ...loginValues, [name]: value });
    else {
      if (name === "skill" && e.key === "Enter") {
        setSignupValues({
          ...signupValues,
          skills: [...signupValues.skills, value],
        });
      } else if (name === "profile_pic" && e.target.files.length) {
        setSignupValues({
          ...signupValues,
          profile_pic: e.target.files[0],
          preview_pic: URL.createObjectURL(e.target.files[0]),
        });
      } else setSignupValues({ ...signupValues, [name]: value });
    }
  };
  const removeSkill = (idx) => {
    setSignupValues({
      ...signupValues,
      skills: signupValues.skills.filter((each, i) => i !== idx),
    });
  };
  const handleSubmit = () => {
    if (type === "Login") {
      if (!loginValues.email)
        return Swal.fire("Oops", "Email can't be empty", "warning");
      if (!loginValues.password)
        return Swal.fire("Oops", "Password can't be empty", "warning");
      dispatch(login(loginValues));
    } else {
      if (!signupValues.fullName)
        return Swal.fire("Oops", "Name can't be empty", "warning");
      if (!signupValues.email)
        return Swal.fire("Oops", "Email can't be empty", "warning");
      if (!signupValues.password)
        return Swal.fire("Oops", "Password can't be empty", "warning");
      if (!signupValues.profile_pic)
        return Swal.fire("Oops", "Profile Picture was not chosen", "warning");
      const form = new FormData();
      form.append("fullName", signupValues.fullName);
      form.append("email", signupValues.email);
      form.append("password", signupValues.password);
      form.append("profile_pic", signupValues.profile_pic);
      signupValues.skills.forEach((Key) => form.append("skills", Key));
      dispatch(signup(form));
    }
  };
  const switchTab = (id) => {
    setType(id);
  };
  return (
    <>
      <MetaData title={`${type} Page`} />
      <Box>
        <Image
          src="https://securecdn.pymnts.com/wp-content/uploads/2016/08/digital-identity-authentication-socure.jpg"
          alt="..."
          w={[300, 300, 500, 500, 500]}
          ml={["8%", "26%", "17%", "25%", "30%"]}
          mt={[5, 5, 10, 10, 10]}
          sx={{ borderRadius: "100px" }}
        />
      </Box>
      <Box
        w={[300, 300, 300, 300, 300]}
        ml={[7, "26%", "33%", "36%", "39%"]}
        mt={[7, 5, 5, 5, 5]}
        className="authBox"
      >
        <Tabs>
          <TabList>
            <Tab ml="40px" onClick={() => switchTab("Login")}>
              LOGIN
            </Tab>
            <Tab ml="40px" onClick={() => switchTab("Signup")}>
              SIGNUP
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <FormControl>
                <Input
                  type="email"
                  name="email"
                  value={loginValues.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </FormControl>
              <FormControl mt="30px">
                <Input
                  type="password"
                  name="password"
                  value={loginValues.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </FormControl>
              <Button
                w="100%"
                mt="15px"
                bg="#2196f3"
                color="#fff"
                onClick={handleSubmit}
              >
                SIGNUP
              </Button>
              <p className="mt-1 textCent darkgray">Forgot Password?</p>
              <Button
                className="signinWithGBtn"
                w="100%"
                mt="15px"
                variant="outline"
                leftIcon={<FaGoogle />}
              >
                Signin with Google
              </Button>
            </TabPanel>
            <TabPanel>
              <WrapItem>
                <Avatar
                  ml="80px"
                  size="xl"
                  name="Photo"
                  src={signupValues.preview_pic}
                />
              </WrapItem>
              <Input
                mt="20px"
                type="file"
                name="profile_pic"
                accept="image/*"
                onChange={handleChange}
              />
              <FormControl mt="20px">
                <Input
                  type="text"
                  name="fullName"
                  value={signupValues.fullName}
                  onChange={handleChange}
                  placeholder="Fullname"
                />
              </FormControl>
              <FormControl mt="20px">
                <Input
                  type="email"
                  name="email"
                  value={signupValues.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </FormControl>
              <FormControl mt="20px">
                <Input
                  type="password"
                  name="password"
                  value={signupValues.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </FormControl>
              <FormControl mt="20px">
                <Input
                  type="text"
                  name="skill"
                  placeholder="Type Skill &amp; Hit Enter"
                  onKeyDown={handleChange}
                />
              </FormControl>
              {signupValues.skills.map((each, idx) => (
                <Tag
                  key={idx}
                  size="sm"
                  variant="solid"
                  bg="#2196f3"
                  m="5px 0 0 5px"
                >
                  <TagLabel>{each}</TagLabel>
                  <TagCloseButton onClick={() => removeSkill(idx)} />
                </Tag>
              ))}
              <Button
                w="100%"
                mt="20px"
                bg="#2196f3"
                color="#fff"
                onClick={handleSubmit}
              >
                CONTINUE
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default Auth;
