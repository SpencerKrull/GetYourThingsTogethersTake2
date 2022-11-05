import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUsername, SET_LOGIN } from "../../redux/features/auth/auth_slice";
import { logoutUser } from "../../services/authServices";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUsername);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{username}</span>
        </h3>
        <button onClick={logout} className="--btn --btn-danger">
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;