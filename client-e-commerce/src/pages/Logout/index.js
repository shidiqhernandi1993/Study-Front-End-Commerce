import * as React from "react";
import { LayoutOne } from "upkit";
import BounceLoader from "react-spinners/BounceLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../app/api/auth";
import { userLogout } from "../../app/features/Auth/actions";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    logoutUser()
      .then(() => dispatch(userLogout()))
      .then(() => navigate("/"));
  }, [dispatch, navigate]);

  return (
    <LayoutOne size="small">
      <div className="text-center flex flex-col justify-center items-center">
        <BounceLoader color="blue" />
        <br />
        Logging out ...
      </div>
    </LayoutOne>
  );
}
