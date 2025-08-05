import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        if (data.role === "admin") {
  window.location.href = "/admin";
        } else {
          navigate("/");
        }
        messageApi.success("Giriş başarılı!").then(() => {
          navigate("/");
        });
      } else {
        messageApi.error("Giriş başarısız!");
      }
    } catch (error) {
      console.log(error);
      messageApi.error("Sunucu hatası oluştu!");
    }
  };

  return (
    <div className="account-column">
      {contextHolder}

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            <span>
              Username or email address <span className="required">*</span>
            </span>
            <input type="text" name="email" onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <p className="remember">
          <label>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <button className="btn btn-sm">Login</button>
        </p>
        <a href="#" className="form-link">
          Lost your password?
        </a>
      </form>
    </div>
  );
};

export default Login;
