import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [icon, setIcon] = useState(false);
  const message = document.getElementById("errorMessage");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("وارد کردن نام کاربری الزامی است!"),
      password: Yup.string().required("وارد کردن کلمه عبور الزامی است!"),
    }),
    onSubmit: (values) => {
      dispatch(setUser(values));
      axios
        .get("http://localhost:3002/whoami")
        .then((res) => setUser(res.data));
      axios
        .post("http://localhost:3002/auth/login", formik.values)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            navigate("..//dashboard/manage-page");
          }
        }).catch(()=>{
          message.innerHTML = 'نام کاربری یا کلمه عبور اشتباه است!'
        }
          
        )
    },
  });

  return (
    <div className="loginBody">
      <div className="loginForm">
        <form onSubmit={formik.handleSubmit}>
          <div id='errorMessage' className="error1"></div>
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <input
            id="password"
            name="password"
            type={icon ? "text" : "password"}
            placeholder="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className="iconHolder">
            {icon ? (
              <VisibilityOffIcon
                className="icons"
                onClick={() => setIcon(false)}
              />
            ) : (
              <VisibilityIcon className="icons" onClick={() => setIcon(true)} />
            )}
          </div>
          <button type="submit">ورود</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
