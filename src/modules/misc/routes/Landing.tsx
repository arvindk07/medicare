import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-6 p-6">
      <div
        className="bg-slate-200 px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-purple-300"
        onClick={() => navigate("/auth/login")}
      >
        Login
      </div>
      <div
        className="bg-slate-200 px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-purple-300"
        onClick={() => navigate("/auth/master-login")}
      >
        master
      </div>
    </div>
  );
};
