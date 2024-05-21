import { Button, Checkbox, Form, Input } from "antd";

import { HiOutlineMailOpen } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import baseURL from "../../config";
import Swal from "sweetalert2";
import { IconLock } from "@tabler/icons-react";

const Login = () => {
    const navigate = useNavigate();
    const onFinish = async ({ email, password }) => {
        // console.log(values);
        // try {
        //   const response = await baseURL.post(
        //     `/user/sign-in`,
        //     { email, password, loginType:3 },
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         authentication: `Bearer ${localStorage.getItem("token")}`,
        //       },
        //     }
        //   );
        //   console.log(response);
        //   if (response?.data?.statusCode == 200) {
        //     localStorage.setItem("token", response?.data?.data?.token);
        //     localStorage.setItem(
        //       "user-update",
        //       JSON.stringify(response?.data?.data?.attributes)
        //     );
        //   }
        //   Swal.fire({
        //     position: "top-center",
        //     icon: "success",
        //     title: response?.data?.message,
        //     showConfirmButton: false,
        //     timer: 1500,
        //   });
        //   navigate("/");
        // } catch (error) {
        //   console.log(error);
        //   Swal.fire({
        //     icon: "error",
        //     title: "Try Again...",
        //     text: error?.response?.data?.message,
        //     footer: '<a href="#">Why do I have this issue?</a>',
        //   });
        // }
        navigate("/");
      };
    return (
        <div className=" bg-primary px-[100px] py-[40px] rounded-xl border-2">
        
        <div className="">
          <div className="w-[500px]">
            <img className="" src={logo} alt="" />
            <h1 className="text-[24px] text-center font-medium mt-[24px] mb-[32px]">
              Sign In
            </h1>
            <Form
              name="normal_login"
              // className="login-form"
              labelCol={{ span: 22 }}
              wrapperCol={{ span: 40 }}
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              className="space-y-1"
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
                    border: "2px solid #0A8100",
                    height: "62px",
                    background: "#E7F2E6",
                    outline: "none",
                    marginBottom: "20px",
                  }}
                  required
                  bordered={false}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <span className="text-secondary text-[16px] font-medium">
                    Password
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
                  placeholder="Enter Your Password"
                  name="current_password"
                  prefix={
                    <IconLock
                    className="mr-2 bg-secondary rounded-full p-[6px]"
                    size={28}
                    color="white"
                    />
                  }
                  style={{
                    border: "2px solid #0A8100",
                    height: "62px",
                    background: "#E7F2E6",
                    outline: "none",
                    marginBottom: "20px",
                  }}
                  bordered={false}
                />
              </Form.Item>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* <Form.Item name="remember" valuePropName="checked" >
                  <Checkbox >
                    <span className="text-[white] hover:text-red-500 font-medium">
                      {" "}
                      Remember Me
                    </span>
                  </Checkbox>
                </Form.Item> */}
                </div>
                <div>
                  <Link
                    to="/auth/forgot-password"
                    className="text-secondary font-medium hover:text-secondary"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div></div>

              <Form.Item>
                <Button
                  // type="primary"
                  style={{
                
                    backgroundColor: "#0A8100",
                    color: "#fff",
                    size: "18px",
                    height: "56px",
                  }}
                  htmlType="submit"
                  className="block w-[500px] hover:bg-secondary h-[56px] px-2 py-4 mt-2 text-white bg-secondary rounded-lg"
                >
                  Log in
                </Button>
                {/* <Link to="/dashboard"
              // type="primary"
              // htmlType="submit"
              className="block text-center w-[350px] h-[56px] px-2 py-4 mt-2 hover:text-white text-white bg-[#3BA6F6] rounded-lg"
            >
              Log In
            </Link> */}
              </Form.Item>
            </Form>
          </div>
        </div>
      
    </div>
    );
}

export default Login;