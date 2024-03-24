import { Navigate, Route, Routes } from "react-router-dom";

import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useGetSurveyorQuery } from "../../api/apiSlice";
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from "../../features/login/loginSlice";
import { ProtectedInactive } from "../../routing/ProtectedInactive";
import InactiveSurveyor from "./Components/InactiveSurveyor";
import Account from "./account/Account";
import EditAccount from "./account/edit/EditAccount";
import Dashboard from "./dashboard/Dashboard";
import HouseProfile from "./houseProfile/HouseProfile";
import Nav from "./nav/Nav";

const SurveyorContainer = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const { data: surveyorData } = useGetSurveyorQuery(currentUser.id);

  return (
    <Box>
      {isLoggedIn ? <Nav /> : ""}
      <Box sx={{ maxWidth: "800px" }} m="auto">
        <Routes>
          <Route
            element={<ProtectedInactive userStatus={surveyorData?.status} />}
          >
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="account" element={<Account />}></Route>
            <Route path="account/edit" element={<EditAccount />}></Route>
            <Route path="house/:id" element={<HouseProfile />}></Route>
            <Route path="/*" element={<Navigate to="/surveyor/dashboard" />} />
          </Route>
          <Route path="inactive" element={<InactiveSurveyor />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default SurveyorContainer;
