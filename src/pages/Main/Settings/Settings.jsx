import { Button, Form, Input, Modal, Switch } from "antd";
import logo from "../../../assets/logo.png";
import {
  IconLock,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { GoArrowLeft } from "react-icons/go";
import { HiOutlineMailOpen } from "react-icons/hi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useChangePasswordMutation, useChangePasswordUseingOldPasswordMutation, useForgotPasswordMutation, useVerifyOtpMutation } from "../../../redux/features/auth/authApi";
import { ImSpinner6 } from "react-icons/im";

const Settings = () => {
  const { user } = useSelector(state => state?.auth)
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();

  //change password useing old password rtk query api

  const [changePassWithOldPass, { data, isLoading, isError, error }] = useChangePasswordUseingOldPasswordMutation()

  //forgot password rtk query api
  const [forgotPassword, { data: forgotPasswordData, isLoading: forgotPasswordLoading, isError: forgotPasswordIsError, error: forgotPasswordError }] = useForgotPasswordMutation()
  //verify opt rtk query api
  const [verifyOtp, { data: verifyOtpData, isLoading: verifyOtpLoading, isError: verifyOtpIsError, error: verifyOtpError }] = useVerifyOtpMutation()
  //change password rtk query api
  const [changePassword, { data: changePassRes, isLoading: changePassLoading, isError: changePassIsError, error: changePassError }] = useChangePasswordMutation()
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const settingsItem = [

    {
      title: "Change password",
      path: "change-password",
    },

    {
      title: "Privacy Policy",
      path: "privacy-policy",
    },
    {
      title: "Terms & Conditions",
      path: "terms-conditions",
    },
    {
      title: "About us",
      path: "about-us",
    },
  ];

  const handleNavigate = (value) => {
    if (value === "notification") {
      return;
    }
    // else if (value === "hidden-fee") {
    //   return;
    // }
    // else if (value === "hidden-fee-percentage") {
    //   setModelTitle("Set hidden fee percentage");
    //   setIsModalOpen(true);
    // }
    else if (value === "change-password") {
      setModelTitle("Change password");
      setIsModalOpen(true);
    } else {
      navigate(`/settings/${value}`);
    }
  };

  const handleChangePassword = async (values) => {
    const { oldPassword, newPassword } = values
    changePassWithOldPass({ oldPassword, newPassword })
  }
  const handleForgetPassword = async (values) => {
    forgotPassword(values)
  }
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    verifyOtp({
      code: otp,
      email: user?.email,
    })

  }
  const handleResetPassword = async (values) => {
    changePassword({ email: user?.email, password: values?.password })
  }

  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (data?.statusCode === 200 && data?.data) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);

    }

  }, [data, isError, error])

  useEffect(() => {
    if (forgotPasswordIsError && forgotPasswordError) {
      Swal.fire({
        icon: "error",
        title: forgotPasswordError?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (forgotPasswordData?.status === 'OK' && forgotPasswordData?.statusCode === 200 && forgotPasswordData?.data) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: forgotPasswordData?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setModelTitle("Verify OTP")

    }

  }, [forgotPasswordData, forgotPasswordIsError, forgotPasswordError])
  useEffect(() => {
    if (verifyOtpIsError && verifyOtpError) {
      Swal.fire({
        icon: "error",
        title: verifyOtpError?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (verifyOtpData?.status === 'OK' && verifyOtpData?.statusCode === 200 && verifyOtpData?.data) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: verifyOtpData?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setModelTitle("Reset Password");

    }

  }, [verifyOtpData, verifyOtpIsError, verifyOtpError])
  useEffect(() => {
    if (changePassError && changePassIsError) {
      Swal.fire({
        icon: "error",
        title: changePassError?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (changePassRes?.status === 'OK' && changePassRes?.statusCode === 200 && changePassRes?.data) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: changePassRes?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);

    }

  }, [changePassRes, changePassIsError, changePassError, navigate])
  return (
    <div className="ml-[24px] mt-[60px]">
      {settingsItem.map((setting, index) => (
        <div
          key={index}
          className="border border-secondary py-4 mb-2 px-4 text-sm rounded-lg bg-primary flex items-center justify-between cursor-pointer "
          onClick={() => handleNavigate(setting.path)}
        >
          <h2>{setting.title}</h2>
          <h2>
            {setting.path === "notification" ? (
              <Switch
                defaultChecked
                onChange={onChange}
              />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </h2>
        </div>
      ))}
      <Modal
        title={
          <div
            onClick={() => setIsModalOpen(false)}

            className="flex bg-primary items-center cursor-pointer text-black px-[60px] pt-[60px]"
          >
            <div className="object-contain">
              <img className="flex justify-center items-center" src={logo} alt="" />
              <div className="flex items-center justify-start gap-2">
                <Link to="/settings">
                  <GoArrowLeft className="text-[24px]" />
                </Link>

                <h1 className="text-[24px]  font-medium my-[24px]">
                  {modelTitle}
                </h1>
              </div>
            </div>
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        {modelTitle === "Change password" && (
          <div className="px-[60px] pb-[60px] bg-primary">
            <p className="text-[14px] mb-[14px]">
              Your password must be 8-10 character long.{" "}
            </p>
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-4 fit-content object-contain"
              onFinish={handleChangePassword}
            >
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  // onChange={handleChange}
                  placeholder="Enter Your old Password"
                  name="oldPassword"
                  prefix={
                    <IconLock
                      className="mr-2 bg-white rounded-full p-[6px]"
                      size={28}
                      color="#0A8100"
                    />
                  }
                  className="p-4 bg-primary
                    rounded w-full 
                    border-2 border-secondary
                    justify-start 
                    mt-[12px]
                     outline-none focus:border-none "

                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  // onChange={handleChange}
                  placeholder="Set Your New Password"
                  name="newPassword"
                  prefix={
                    <IconLock
                      className="mr-2 bg-white rounded-full p-[6px]"
                      size={28}
                      color="#0A8100"
                    />
                  }
                  className="p-4 bg-primary
                    rounded w-full 
                    border-2 border-secondary
                    justify-start 
                    mt-[12px]
                     outline-none focus:border-none "

                />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="reenterPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter password"
                  name="re_enter_password"
                  prefix={
                    <IconLock
                      className="mr-2 bg-w bg-white rounded-full p-[6px]"
                      size={28}
                      color="#0A8100"
                    />
                  }
                  className="p-4 bg-primary
                    rounded w-full 
                    border-2 border-secondary
                    justify-start 
                    mt-[12px]
                     outline-none focus:border-none "

                />
              </Form.Item>
              <p className=" text-secondary font-medium">
                <button onClick={() => setModelTitle("Forget password")}>
                  Forget Password
                </button>
              </p>
              <Form.Item>
                <Button
                  style={{

                    backgroundColor: "#95C343",

                    color: "#fff",
                    size: "18px",
                    height: "56px",
                  }}
                  htmlType="submit"
                  className="block w-full h-[56px] px-2 py-4 mt-2 text-white bg-[#FA1131] rounded-lg"
                >
                  {
                    isLoading ? <h1 className="flex justify-center items-center gap-1"><ImSpinner6 className="animate-spin size-5" /> <span>Update password</span></h1> : 'Update password'
                  }

                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {modelTitle === "Forget password" && (
          <div className="px-[60px] pb-[60px] bg-primary">
            <Form
              initialValues={{
                remember: true,
              }}
              onFinish={handleForgetPassword}
              className="space-y-7 fit-content object-contain"
            >
              <div className="">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your email"
                    name="email"
                    prefix={
                      <HiOutlineMailOpen
                        className="mr-2 bg-white rounded-full p-[6px]"
                        size={28}
                        color="#0A8100"
                      />
                    }
                    className="p-4 bg-primary
                      rounded w-full 
                      border-2 border-secondary
                      justify-start 
                      mt-[12px]
                       outline-none focus:border-none "

                  />
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  style={{

                    backgroundColor: "#95C343",
                    color: "#fff",
                    size: "18px",
                    height: "56px",
                  }}
                  htmlType="submit"
                  className="block w-full h-[56px] px-2 py-4 mt-2 text-white bg-[#FA1131] rounded-lg"
                >
                  {
                    forgotPasswordLoading ? <h1 className="flex justify-center items-center gap-1"><ImSpinner6 className="animate-spin size-5" /> <span> Send OTP</span></h1> : 'Send OTP'
                  }

                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {modelTitle === "Verify OTP" && (
          <div className="px-[60px] pb-[60px] bg-primary">
            <form onSubmit={handleVerifyOtp}>
              <p className="text-[16px] mb-[14px]">
                Please enter your email address to recover your account.
              </p>
              <div className="">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputStyle={{
                    height: "50px",
                    background: "transparent",
                    width: "50px",
                    border: "1px solid #95C343",
                    marginRight: "20px",
                    outline: "none",
                  }}
                  renderInput={(props) => <input {...props} />}
                />
                <p className="flex items-center justify-between mt-2 mb-6">
                  Didn’t receive code?
                  <button className="font-medium text-">Resend</button>
                </p>
              </div>

              <button
                type="submit"
                style={{

                  backgroundColor: "#95C343",
                  color: "#fff",
                  size: "18px",
                  height: "56px",
                }}
                className="bg-secondary
              w-full
              text-white mt-5 py-3 rounded-lg duration-200"
              >
                {
                  verifyOtpLoading ? <h1 className="flex justify-center items-center gap-1"><ImSpinner6 className="animate-spin size-5" /> <span>Verify</span></h1> : 'Verify'
                }
              </button>
            </form>
          </div>
        )}
        {modelTitle === "Reset Password" && (
          <div className="px-[60px] pb-[60px] bg-primary">
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-4 fit-content object-contain"
              onFinish={handleResetPassword}
            >
              <Form.Item
                name="enter_password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  // onChange={handleChange}
                  placeholder="Set your password"
                  name="set_password"
                  prefix={
                    <IconLock
                      className="mr-2 bg-white rounded-full p-[6px]"
                      size={28}
                      color="#0A8100"
                    />
                  }
                  className="p-4 bg-primary
                      rounded w-full 
                      justify-start 
                      mt-[12px]
                       outline-none focus:border-none border-secondary"

                />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("enter_password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter password"
                  name="re_enter_password"
                  prefix={
                    <IconLock
                      className="mr-2 bg-white rounded-full p-[6px]"
                      size={28}
                      color="#0A8100"
                    />
                  }
                  className="p-4 bg-primary
                  rounded w-full 
                  justify-start 
                  mt-[12px]
                   outline-none focus:border-none border-secondary"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{

                    backgroundColor: "#95C343",
                    color: "#fff",
                    size: "18px",
                    height: "56px",
                  }}
                  htmlType="submit"
                  className="block w-full h-[56px] px-2 py-4 mt-2 text-white bg-secondary rounded-lg"
                >
                  {
                    changePassLoading ? <h1 className="flex justify-center items-center gap-1"><ImSpinner6 className="animate-spin size-5" /> <span> Update password</span></h1> : 'Update password'
                  }

                </Button>
              </Form.Item>
            </Form>
          </div>

        )}
      </Modal>
    </div>
  );
}

export default Settings;
