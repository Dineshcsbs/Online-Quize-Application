import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { LoginSchema } from "../../constant/Schema/LoginSchema";
import { PATH } from "../../util";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useLoginUserMutation } from "../../service/LoginService";

const login = [
  { name: "email", type: "email" },
  { name: "password", type: "password" },
];

const Login = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const [loginInfo] = useLoginUserMutation();

  const submit = async (data) => {
    try {
      const response = await loginInfo(data).unwrap();
      localStorage.setItem("Token", response?.data);
      toast.success("Login Successful", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error.status);
      toast.error("Username or Password is Invalid");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center position-relative">
      <div className="left-panel position-absolute top-0 start-0 w-100 h-100">
      <img
          src={PATH.IMAGE.LOGIN}
          className="img-fluid w-100 h-100 object-fit-cover opacity-70"
          alt="Background"
        />
      </div>

      <Card className="border-0 shadow-lg card mx-auto col-md-8 col-lg-4 col-xl-3 p-4 rounded-4 position-relative z-index-2">
        <ToastContainer />
        <div className="d-flex justify-content-center">
          <img
            src={PATH.IMAGE.LOGO}
            alt="Logo"
            className="rounded-circle"
            style={{ width: "80px", height: "80px" }}
          />
        </div>

        <h4 className="text-center mt-4 text-primary">Login</h4>
        <br />

        <form onSubmit={handleSubmit(submit)}>
          {login?.map((item, key) => (
            <div key={key}>
              <div>
              {errors[item.name] ? (
                  <span className="text-danger p-0 ms-2">
                    {errors[item.name]?.message}
                  </span>
                ) : (
                  <br/>
                )}
              </div>
              <Input
                register={register(item.name)}
                type={item.type}
                placeholder={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                className="col-12 rounded-3 border p-2 mx-auto mb-2"
              />
            </div>
          ))}
          <div className="mx-auto">
            <Button
              type="submit"
              className="btn bg-primary fw-bold text-white col-12 mt-4 py-2"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span>
            Don't have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/sign-up")}
            >
              Sign Up!
            </span>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
