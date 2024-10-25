import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateSchema } from "../../constant/Schema/UpdateSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import mineType from "../../../src/constant/mediaType/MimeType"
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/DropDown";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation, useUserDataQuery } from "../../service/LoginService";

const fieldData = ["name", "age", "designition", "phoneNumber", "gender"];
const designationOptions = ["software", "tester"];
const gender = ["Male", "Female"];
const Profile = () => {
  const navigate = useNavigate();
  const { data: userData } = useUserDataQuery();
  const [updateUserInfo]=useUpdateUserMutation();

  const [updateStatus, setUpdateStatus] = useState(false);
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (localStorage?.getItem("Token") === "") {
      navigate("/");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset, // Use reset to set default values
  } = useForm({
    resolver: yupResolver(UpdateSchema),
  });

  useEffect(() => {
    if (userData?.data) {
      reset({
        name: userData?.data?.userCredential?.name || "",
        age: userData?.data?.age || "",
        designition: userData?.data?.designition || "",
        phoneNumber: userData?.data?.phoneNumber || "",
        gender: userData?.data?.gender || "",
      });
    }
  }, [userData?.data, reset]);

  const submit = async (data) => {
    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("gender", data.gender);
        formData.append("phoneNumber", data.phoneNumber);
        if (image) {
            formData.append("image",image); 
        }     
        const res = await updateUserInfo(formData).unwrap();
        toast.success("Update Successfully");
        setUpdateStatus(false);
        setImage(null);
    } catch (error) {
        console.error(error.message);
    }
};

  

  const selectedDesignation = watch("designition", "gender");

  return (
    <div className="card mx-auto col-11 col-lg-6 mt-3 bg-secondary bg-opacity-10 border-0 rounded-3">
      <ToastContainer/>
      <h4 className="d-flex justify-content-center mt-4">
        {updateStatus ? "Edit Profile" : "Update Profile"}
      </h4>
      {!updateStatus && (
        <>
          <div className="ms-5">
            {userData?.data?.image?<img
                  src={`data:${mineType(userData?.data?.image.imageFormat)};base64,${userData?.data?.image}`}
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px", alignItems: "center" }}
                />:<Icon icon="ion:person-sharp" width="70" height="70"   />}

          </div>
          <p className="ms-5 ">{userData?.data?.userCredential?.email}</p>
        </>
      )}
      <form onSubmit={handleSubmit(submit)} className="mx-2 mx-md-5  ">
        {fieldData.map((item, key) => (
          <div key={key}>
            {item === "designition" || item === "gender" ? (
              <Select
                {...register(item)}
                options={item === "gender" ? gender : designationOptions}
                className="col-12 rounded-3 border p-2 mx-auto"
                placeholder={
                  item === "gender" ? "Select Gender" : "Choose Designation"
                }
                defaultValue={watch(item) || ""} 
                disabled={!updateStatus}
              />
            ) : (
              <Input
                register={register(item)}
                type={item === "age" ? "number" : item}
                placeholder={item}
                className="col-12 rounded-3 border p-2 mx-auto"
                disabled={!updateStatus}
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

        {updateStatus && (
          <>
            <Input
              type="file"
              placeholder="Upload profile image"
              className="col-12 rounded-3 border p-2 mx-auto"
              onChange={(event) => setImage(event.target.files[0])}
              // multiple
              // accept='image/*'
            />
            <div className="d-flex justify-content-around ">
              <Button
                type="submit"
                className={"btn bg-primary text-white fw-boald  my-3"}
                //onClick={()=>setUpdateStatus(false)}
              >
                Update
              </Button>
            </div>
          </>
        )}
      </form>
      {!updateStatus && (
        <div className="d-flex justify-content-around ">
          <Button
            type="submit"
            className={"btn bg-primary text-white fw-boald  my-3 "}
            onClick={() => setUpdateStatus(true)}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
