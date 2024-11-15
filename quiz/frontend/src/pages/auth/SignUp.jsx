import React from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PATH } from "../../util";
import Card from "../../components/Card";
import { SignUpSchema } from "../../constant/Schema/SignUpSchema";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/DropDown";
import { useUserSignMutation } from "../../service/LoginService";
import { toast, ToastContainer } from "react-toastify";

const state = ["name", "email", "password", "rePassword", "age", "designition"];
const designationOptions = ["software", "tester"];

const SignUp = ({ authority }) => {
  const [signup] = useUserSignMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const submit = async (data) => {
    try {
      data.authority = authority;
      const res = await signup(data).unwrap();
      if (res) {
        toast.success("Register Successful", {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const selectedDesignation = watch("designition");

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center position-relative">
      <ToastContainer />
      <div className="left-panel position-absolute top-0 start-0 w-100 h-100">
        <img
          src={PATH.IMAGE.LOGIN}
          className="img-fluid w-100 h-100 object-fit-cover opacity-70"
          alt="Background"
        />
      </div>

      <Card className="border-0 shadow-lg bg-white card mx-auto col-md-8 col-lg-4 col-xl-3 p-4 rounded-3 position-relative z-index-2">
        <div className="d-flex justify-content-center mb-4">
          <img
            src={PATH.IMAGE.LOGO}
            alt="Logo"
            className="rounded-circle"
            style={{ width: "80px", height: "80px" }}
          />
        </div>
        <h3 className="text-center text-primary mb-4">Sign Up</h3>

        <form onSubmit={handleSubmit(submit)}>
          {state.map((item, key) => (
            <div key={key}>
              {errors[item]?.message ? (
                <span className="text-danger  ms-2">
                  {errors[item]?.message}
                </span>
              ) : (
                <br />
              )}
              {item === "designition" ? (
                <Select
                  {...register("designition")}
                  options={designationOptions}
                  className="col-12 rounded-3 border p-2 mb-2"
                  placeholder="Choose Designation"
                  value={selectedDesignation || ""}
                />
              ) : (
                <Input
                  register={register(item)}
                  type={item === "age" ? "number" : item}
                  placeholder={item === 'rePassword' ? "Confirm Password" : item.charAt(0).toUpperCase() + item.slice(1)}
                  className="col-12 rounded-3 border p-2 mb-2"
                />
              )}


            </div>
          ))}

          <Button
            type="submit"
            className="btn bg-primary text-white fw-bold bg-opacity-90 col-12 mt-4 py-2 rounded-3"
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span>
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Login!
            </span>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
