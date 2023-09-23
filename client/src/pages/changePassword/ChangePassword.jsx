import React, { useState } from "react";
import "./ChangePassword.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const email = currentUser.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/change-password", { email, oldPassword, newPassword });
      // localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Change Password</h1>
        <label htmlFor="">Old Password</label>
        <input
          name="oldPassword"
          type="password"
          required
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <label htmlFor="">New Password</label>
        <input
          name="newPassword"
          type="password"
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Confirm</button>
        {error && error}
      </form>
    </div>
  );
}

export default ChangePassword;
