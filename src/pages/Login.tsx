import { useState } from "react";
import { useNavigate } from "react-router";
// import { useAuth } from '../contexts/AuthContext';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  // const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {
      email: "",
      password: "",
    };

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
    }

    // Set errors
    setErrors(newErrors);

    // If there are any errors, don't submit
    if (newErrors.email || newErrors.password) {
      return;
    }

    navigate("/");
    // const success = login(email, password);
    // if (success) {
    //   navigate('/');
    // } else {
    //   setErrors({ ...newErrors, password: 'Invalid credentials' });
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md flex flex-col gap-6 px-2">
        <CardHeader>
          <CardTitle className="text-lg">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                className={
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                className={
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full cursor-pointer mt-3">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
