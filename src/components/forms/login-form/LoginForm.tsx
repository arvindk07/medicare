import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = ({
  role,
  icon: Icon,
  title,
  data,
  setData,
  onLogin,
}: {
  role: string;
  icon: any;
  title: string;
  data: { email: string; password: string };
  setData: (data: { email: string; password: string }) => void;
  onLogin: () => void;
}) => {
  const neurowel_logo = "/images/icons/neurowel.png";

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="flex justify-center mt-6 ">
          <img src={neurowel_logo} alt="" width={200} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input
          id={`${role}-email`}
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={data.email || ""}
          onChange={(e) => setData({ ...data, email: e.target.value })}

          // onChange={(e) => {
          //   const email = e.target.value.trimStart(); // optional: remove accidental leading spaces
          //   setData({ ...data, email });
          // }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <Input
          id={`${role}-password`}
          type="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <Button
        className="w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600"
        onClick={onLogin}
      >
        Sign In
      </Button>

      <div className="text-center">
        <Button variant="link" className="text-sm">
          Forgot password?
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
