import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LoginPage.css";
import Logo from "../../assets/Logo/Logo.png";
import SelectField from "../../components/Select2";

function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");


  const users = [
    {
      role: "admin",
      email: "admin@gmail.com",
      password: "admin123",
      dashboard: "/admin-dashboard",
    },
    {
      role: "manager",
      email: "manager@gmail.com",
      password: "manager123",
      dashboard: "/manager-dashboard",
    },
    {
      role: "user",
      email: "user@gmail.com",
      password: "user123",
      dashboard: "/user-dashboard",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }

    const matchedUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password &&
        user.role === role
    );

    if (matchedUser) {
      localStorage.setItem("token", "login_success");
      localStorage.setItem("role", matchedUser.role);
      localStorage.setItem("email", matchedUser.email);
      navigate(matchedUser.dashboard);
    } else {
      toast.error("Invalid email, password, or role");
    }
  };

  return (
    <div className="login-page">
      <div className="background-lines">
        <div className="line horizontal"></div>
        <div className="line vertical-left"></div>
        <div className="line vertical-right"></div>
      </div>

      <div className="login-card">
        <div className="logo-wrap">
          <img src={Logo} alt="Company Logo" className="logo" />
        </div>

        <h1 className="title">Welcome back</h1>
        <p className="subtitle">Login to manage your leads</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <div className="form-group">

            <SelectField
              label="ROLE"
              options={[
                { value: "admin", label: "Admin" },
                { value: "manager", label: "Manager" },
                { value: "user", label: "User" },
              ]}
              value={role}
              onChange={setRole}
            />
          </div>

          <div className="options-row">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <a href="/" onClick={(e) => e.preventDefault()} className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <p className="bottom-text">
          Don&apos;t have an account?{" "}
          <a href="/" onClick={(e) => e.preventDefault()}>
            Request Access
          </a>
        </p>
      </div>

      <div className="footer">
        <span>© 2024 DIGI TREND. ALL RIGHTS RESERVED.</span>
        <div className="footer-links">
          <a href="/" onClick={(e) => e.preventDefault()}>
            PRIVACY POLICY
          </a>
          <a href="/" onClick={(e) => e.preventDefault()}>
            CONTACT SUPPORT
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;