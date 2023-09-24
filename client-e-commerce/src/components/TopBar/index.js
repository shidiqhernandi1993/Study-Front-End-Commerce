import React from "react";
import { Link } from "react-router-dom";
import { ButtonCircle, Responsive } from "upkit/dist";
import StoreLogo from "../StoreLogo";
import { FaUser } from "@meronex/icons/fa";
import { useSelector } from "react-redux";

export default function TopBar() {
  const auth = useSelector((state) => state.auth);
  return (
    <Responsive desktop={3} justify="bottom" items="center">
      <div>
        <StoreLogo />
      </div>
      <div className="mr-900 text-right">
        <Link to={auth.token ? "/account" : "/login"}>
          <div className="mr-1 inline-block text-blue-900 font-bold">
            {auth?.user?.full_name}
          </div>
          <ButtonCircle icon={<FaUser />} />
        </Link>
      </div>
    </Responsive>
  );
}
