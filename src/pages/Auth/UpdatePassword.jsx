import { IconLock } from "@tabler/icons-react";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";

const UpdatePassword = () => {
  const [changePassword, { data, isError, error }] = useChangePasswordMutation()
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { email } = useParams();
  const onFinish = async (values) => {
    changePassword({
      email: email,
      password: values?.enter_password,
    })
  };
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
      navigate("/auth");
    }
  }, [data, isError, error, navigate])
  return (

    <div className="mx-[310px]  bg-primary border-2 border-secondary px-[100px] py-[40px] rounded-xl ">
      <div className="flex gap-[120px]">
        <div className="w-[500px]">
          <img src={logo} className="mx-auto w-[50%]" alt="" />
          <div className="flex justify-center items-center gap-1 my-[10px]">
            <Link to="/auth/forgot-password">
              <GoArrowLeft className="text-[24px]" />
            </Link>

            <h1 className="text-[24px] font-medium ">
              Reset Password
            </h1>
          </div>

          <p className="text-[#4E4E4E] text-[16px] mb-[10px]">Your password must be 8-10 character long.</p>

          <Form
            form={form}

            name="dependencies"
            autoComplete="off"
            style={{
              maxWidth: 600,
            }}
            layout="vertical"
            className="space-y-2 fit-content object-contain"
            onFinish={onFinish}
          >


            <Form.Item
              name="enter_password"
              label={
                <span className="text-secondary text-[16px] font-medium">
                  New Password
                </span>
              }
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
                placeholder="Set your password"
                name="set_password"
                prefix={
                  <IconLock
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
                  // marginBottom: "2px",
                }}
                bordered={false}
              />
            </Form.Item>

            {/* Field */}
            <Form.Item
              name="re_enter_password"
              label={
                <span className="text-secondary text-[16px] font-medium">
                  Confirm Password
                </span>
              }

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
                      new Error("The new password that you entered do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                // onChange={handleChange}
                placeholder="Enter Your Password"
                name="re_enter_password"
                prefix={
                  <IconLock
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
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>




      </div>

    </div>
  );
}

export default UpdatePassword;
