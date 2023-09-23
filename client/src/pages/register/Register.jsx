import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from '@mui/material';

import { createTheme, ThemeProvider  } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#ffffff',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isTeacher: false,
    desc: "",
  });
  const [spinner, setSpinner] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isTeacher: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true)
    try {
      const url = await upload(file);
      const newUser = await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      console.log(newUser.data)
      setSpinner(false)
      navigate("/")
    } catch (err) {
      console.log(err);
    }

  };


  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            required
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            required
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" required type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" accept='.png, .jpg, .jpeg' onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            required
            onChange={handleChange}
          />
          <button type="submit">{spinner
                    ?
                    <ThemeProvider  theme={theme}>
                        <CircularProgress/>
                    </ThemeProvider>   
                    : "Register"}</button>
        </div>
        <div className="right">
          <h1>I want to become a Teacher</h1>
          <div className="toggle">
            <label htmlFor="">Activate Teacher account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            required
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
