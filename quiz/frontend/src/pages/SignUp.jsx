import React from "react";
import Card from "../components/Card";
import { SignUpSchema } from "../constant/Schema/SignUpSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/DropDown";
import { useNavigate } from "react-router-dom";
import { useUserSignMutation } from "../service/LoginService";

const state = ["name", "email", "password", "age", "designition"];
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
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const selectedDesignation = watch("designition");

  return (
    <div>
      <Card className="border-0 shadow-lg bg-light card mx-auto mt-5 col-md-8 col-lg-4 col-xl-3 p-4">
        <h3 className="text-center">SignUp</h3>
        <form onSubmit={handleSubmit(submit)}>
          {state.map((item, key) => (
            <div key={key}>
              {item === "designition" ? (
                <Select
                  {...register("designition")}
                  options={designationOptions}
                  className="col-12 rounded-3 border p-2 mx-auto"
                  placeholder="Choose Designation"
                  value={selectedDesignation || ""}
                />
              ) : (
                <Input
                  register={register(item)}
                  type={item === "age" ? "number" : item}
                  placeholder={item}
                  className="col-12 rounded-3 border p-2 mx-auto"
                />
              )}

              <div>
                {errors[item] ? (
                  <p className="text-danger p-0">
                    &#9888;{errors[item]?.message}
                  </p>
                ) : (
                  <br />
                )}
              </div>
            </div>
          ))}
          <Button
            type="submit"
            className={
              "btn bg-secondary text-white fw-boald bg-opacity-75 col-12"
            }
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center">
          <spam>
            Have an account?{" "}
            <spam
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Login!
            </spam>
          </spam>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
