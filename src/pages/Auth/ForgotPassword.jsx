import { Button, Form, Input } from "antd";
import { HiOutlineMailOpen } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { GoArrowLeft } from "react-icons/go";
import Swal from "sweetalert2";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { ImSpinner6 } from "react-icons/im";

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [forgotPassword, { data, isLoading, isError, error }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setEmail(values?.email)
    forgotPassword(values)
  };
  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (data?.status === 'OK' && data?.statusCode === 200 && data?.data) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/auth/verify/${email}`);
    }
  }, [data, isError, error, navigate, email])
  return (
    <div className="mx-[310px]  bg-primary px-[115px] py-[40px] rounded-xl border-2 border-secondary">
      <div>
        <div className="w-[500px]">
          <img src={logo} className="mx-auto w-[50%]" alt="" />
          <div className="flex items-center justify-center gap-2">
            <Link to="/auth">
              <GoArrowLeft className="text-[32px]" />
            </Link>

            <h1 className="text-[24px] font-medium my-[24px]">
              Forgot password
            </h1>
          </div>
          <p className="text-center mx-auto w-[80%] font-medium mb-[24px] text-[#5C5C5C] text-[16px]">
            Please enter your email address to reset your password.
          </p>
          <Form
            name="normal_login"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            onFinish={onFinish}
            className=""
          >
            <Form.Item
              name="email"
              label={
                <span className="text-secondary text-[16px] font-medium">
                  Email
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please Input Your Email!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Your Email"
                name="email"
                prefix={
                  <HiOutlineMailOpen
                    className="mr-2 bg-secondary rounded-full p-[6px]"
                    size={28}
                    color="white"
                  />
                }
                style={{
                  border: "2px solid #95C343",
                  height: "62px",
                  background: "#E7F2E6",
                  outline: "none",
                  marginBottom: "20px",
                }}
                required
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
                className="block w-[500px] hover:bg-secondary h-[56px] px-2 py-4 mt-2 text-white bg-secondary rounded-lg"
              >
                {
                  isLoading ? <h1 className="flex justify-center items-center gap-1"><ImSpinner6 className="animate-spin size-5" /> <span>Send OTP</span></h1> : 'Send OTP'
                }
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
