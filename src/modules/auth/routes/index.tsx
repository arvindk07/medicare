import { Route, Routes } from "react-router-dom";

import { NotFound } from "../../misc";
import Login from "../pages/Login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/master-login" element={<Login />} />
      <Route path="/therapist-login" element={<Login />} />
      <Route path="/patient-login" element={<Login />} />
      <Route path="/organization-login" element={<Login />} />
      <Route path="/tenant-login" element={<Login />} />
      {/* <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
