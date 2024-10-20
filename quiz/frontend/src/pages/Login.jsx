import React, { useEffect } from "react";
import { LoginSchema } from "../constant/Schema/LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLoginUserMutation } from "../service/LoginService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = [
  { name: "email", type: "email" },
  { name: "password", type: "password" }
];

const Login = () => {
  useEffect(()=>{localStorage.setItem("Token","");},[])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const navigate=useNavigate();
  const [loginInfo] = useLoginUserMutation();

  const submit = async (data) => {
    try {
      const response = await loginInfo(data).unwrap();
      localStorage.setItem("Token",response?.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.status);
      toast.error("UserName or Password is Invalid")
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-light card mx-auto mt-5 col-md-8 col-lg-4 col-xl-3 p-4">
       <ToastContainer/> 
       
      <h3 className="text-center">Login</h3>
      <br />
      <form onSubmit={handleSubmit(submit)}>
        {login?.map((item, key) => (
          <div key={key}>
            <Input
              register={register(item.name)}
              type={item.type}
              placeholder={item.name}
              className="col-12 rounded-3 border p-2 mx-auto"
            />
            <div>
              {errors[item.name] ? (
                <p className="text-danger p-0">
                  &#9888;{errors[item.name]?.message}
                </p>
              ) : (
                <br />
              )}
            </div>
          </div>
        ))}
        <div className="mx-auto ">
          <Button type="submit" className="btn bg-secondary bg-opacity-75 fw-boald text-white col-12">
            Submit
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center">
          <spam>
            Dono't have an account?{" "}
            <spam
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/sign-up")}
            >
              Sign Up!
            </spam>
          </spam>
        </div>
    </Card>
  );
};

export default Login;
