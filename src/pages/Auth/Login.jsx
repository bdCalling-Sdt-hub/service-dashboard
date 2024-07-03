import { Button, Form, Input } from "antd";

import { HiOutlineMailOpen } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";
import { IconLock } from "@tabler/icons-react";
import { useSignInMutation } from "../../redux/features/auth/authApi";
import { useEffect } from "react";
import { ImSpinner6 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { loggedUser } from "../../redux/features/auth/authSlice";

const Login = () => {
  const auth = useSelector(state => state.auth);
  console.log(auth)
  const [login, { data, isLoading, isError, error }] = useSignInMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const onFinish = async ({ email, password }) => {
    login({ email, password })
  };
  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (data?.status === 'OK' && data?.statusCode === 200 && data?.data) {
      dispatch(loggedUser({
        token: data?.data?.token,
        user: data?.data?.attributes,
        role: data?.data?.attributes?.role
      }))
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }
  }, [data, isError, error, dispatch, navigate])
  return (
    <div className=" bg-primary px-[100px] py-[40px] rounded-xl border-2 border-secondary">

      <div className="">
        <div className="w-[500px]">
          <img className="mx-auto w-[50%]" src={logo} alt="" />
          <h1 className="text-[24px] text-center font-medium mt-[24px] mb-[24px]">
            Sign In
          </h1>
          <Form
            name="normal_login"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
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
                  border: "2px solid #95C343",
                  height: "62px",
                  background: "#E7F2E6",
                  outline: "none",
                  marginBottom: "20px",
                }}
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
                  isLoading ? <h1 className="flex justify-center items-center gap-1"><ImSpinner6 className="animate-spin size-5" /> <span>Login</span></h1> : 'Login'
                }
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

    </div>
  );
}

export default Login;