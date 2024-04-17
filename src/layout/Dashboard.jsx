import React from "react";
import HambergerMenu from "../components/HambergerMenu";

import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <HambergerMenu>
        <Outlet />
      </HambergerMenu>
    </div>
  );
}
