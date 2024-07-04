import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import "react-phone-number-input/style.css";
import useUser from "../../../hooks/useUser";
import { useUpdateProfileMutation } from "../../../redux/features/profile/profileApi";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { updateProfileInfo } from "../../../redux/features/auth/authSlice";

const EditProfileInformation = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber?.toString());
  const [fileList, setFileList] = useState();
  const [imageUrl, setImageUrl] = useState(`${baseUrl}/${user?.image[0]?.publicFileUrl}`);
  const dispatch = useDispatch();

  const [updateProfile, { data, isError, error }] = useUpdateProfileMutation()

  const props = {
    listType: "picture",
    showUploadList: false,
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.font = "33px Arial";
            ctx.fillText("", 20, 20);
            canvas.toBlob((result) => {
              resolve(result);
              setImageUrl(URL.createObjectURL(result));
            });
          };
        };
      });
    },
  };

  const handleUpdateProfile = async (values) => {
    const { name, email } = values;

    const formdata = new FormData();
    if (fileList) {
      formdata.append("profile", fileList);
      console.log(fileList)
    } if (name) {
      formdata.append("name", name);
      console.log(name)
    } if (email) {
      formdata.append("email", email);
      console.log(email)
    } if (phoneNumber) {
      formdata.append("phone", phoneNumber);
      console.log(phoneNumber)
    }

    updateProfile(formdata)
  };

  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (data?.statusCode === 200 && data?.data) {
      console.log(data)
      dispatch(updateProfileInfo({ user: data?.data?.attributes }))
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/profile-information");
    }

  }, [data, isError, error, dispatch, navigate])
  return (
    <div>
      <div
        onClick={() => navigate("/profile-information")}
        className="flex cursor-pointer  items-center mt-[40px] mb-[63px]"
      >
        <MdOutlineKeyboardArrowLeft size={30} />
        <h1 className="text-[20px] font-medium"> Edit Profile</h1>
      </div>
      <div className="ml-[24px] p-[36px] rounded-xl">
        <Form
          name="basic"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={handleUpdateProfile}
        >
          <div className="flex gap-5  rounded-xl">
            <div className="w-[33%] bg-primary  ml-[24px] flex flex-col justify-center items-center ">
              <div className="w-[242px] bg-primary h-[242px] relative rounded-full flex flex-col justify-center items-center">
                <Upload
                  {...props}
                  name="avatar"
                  listType="picture-circle"
                  showUploadList={false}
                  onChange={({ fileList: newFileList }) => {
                    setFileList(newFileList[0]?.originFileObj);
                  }}
                >
                  <img
                    className="w-[242px] h-[242px] rounded-full flex justify-center items-center backdrop-brightness-50"
                    src={imageUrl}
                    alt=""
                  />
                  <Button
                    className="border-none text-[16px]  bg-[white] absolute text-primary hover:text-primary"
                    icon={<LuImagePlus size={17} className="text-secondary" />}
                  >
                    Change Picture
                  </Button>
                </Upload>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-[20px] ">
                  {user?.role?.toUpperCase()}
                </p>
                <h1 className=" text-[30px] font-medium">
                  {user?.name?.toUpperCase()}
                </h1>
              </div>
            </div>
            <div className="flex-1 w-[66%]">
              <div className="flex flex-col gap-[24px]">
                <div className="flex gap-[25px]">
                  <div className="flex-1">
                    <Form.Item
                      label={<span className=" text-[18px] font-medium">Name</span>}
                      name="name"
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Name!",
                        },
                      ]}
                      initialValue={user?.name}
                    >
                      <Input
                        placeholder="Name"
                        className="p-4 bg-primary rounded w-full justify-start border-2 border-secondary mt-[12px] items-center gap-4 inline-flex hover:border-secondary focus:bg-primary hover:bg-primary"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex-1">
                  <Form.Item
                    label={<span className=" text-[18px] font-medium">Email</span>}
                    name="email"
                    className="flex-1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                    initialValue={user?.email}
                  >
                    <Input
                      placeholder="Email"
                      // readOnly
                      className="p-4 bg-primary rounded w-full justify-start border-2 border-secondary mt-[12px] items-center gap-4 inline-flex hover:border-secondary focus:bg-primary hover:bg-primary"
                    />
                  </Form.Item>
                </div>
                <div className="flex-1">
                  <Form.Item
                    label={<span className="text-[18px] font-medium">Phone Number</span>}
                    name="phoneNumber"
                    className="flex-1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Phone Number!",
                      },
                    ]}
                  >
                    <PhoneInput
                      placeholder="Enter phone number"
                      international
                      countryCallingCodeEditable={false}
                      style={{ marginTop: "12px" }}
                      defaultCountry="US"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <Button
            style={{
              marginTop: "30px",
              backgroundColor: "#95C343",
              color: "#fff",
              size: "18px",
              height: "56px",
            }}
            htmlType="submit"
            className="text-[18px] w-full mt-[50px] mb-[20px] cursor-pointer h-[60px] bg-secondary text-white"
          >
            Update profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileInformation;
