import { Button, Form, Input } from "antd";
import { GoArrowLeft } from "react-icons/go";
import { HiOutlineMailOpen } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png"
import { useState } from "react";
import OTPInput from "react-otp-input";
import baseURL from "../../config";
import Swal from "sweetalert2";

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const {email} = useParams();
    const navigate = useNavigate();
    console.log(email);
   
 
  const handleMatchOtp = async ()=>{
    console.log(otp);
    navigate(`/auth/update-password/${email}`);
    // try {
    //   const responser = await baseURL.post(
    //     `/user/verify-code`,{
    //       email : email,
    //       code : otp
    //     }
    //   )
    //   console.log(responser?.data);
    //   if(responser?.data?.statusCode == 200){
    //     Swal.fire({
    //       position: "top-center",
    //       icon: "success",
    //       title: responser?.data?.message,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     navigate(`/auth/update-password/${email}`);
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Try Again...",
    //     text: error?.response?.data?.message,
    //     footer: '<a href="#">Why do I have this issue?</a>',
    //   })
    // }
    
  }
    return (
        <div className="mx-[310px]  bg-primary border-2 border-secondary px-[100px] py-[40px] rounded-xl">
        
        <div>
        <div className="w-[500px]">
        <img src={logo} className="mx-auto w-[50%]" alt="" />
        <div className="flex justify-center
         items-center gap-2">
            <Link to="/auth/forgot-password">
              {" "}
              <GoArrowLeft className="text-[32px]" />
            </Link>

            <h1 className="text-[24px] font-medium my-[24px]">
              Verify OTP
            </h1>
          </div>
        <p className=" text-[20px] text-[#5C5C5C] mb-[32px]">Please enter the otp we have sent you in your email.</p>
        <div className="space-y-7 fit-content object-contain">
          <div className="flex items-center gap-2  outline-none focus:border-blue-400 object-contain w-[500px]">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                height: "60px",
                background: "#E7F2E6",
                width: "60px",
                border: "1px solid #95C343",
                marginRight: "28px",
                outline: "none",
                color: "black",
              }}
              renderSeparator={<span> </span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        

          <button  onClick={handleMatchOtp}   className="block w-[500px] hover:bg-secondary h-[56px] px-2 py-4 mt-2 text-white bg-secondary rounded-lg">
            Verify
          </button>
        </div>
       </div>
     


        </div>
     
      
        </div>
    );
}

export default VerifyOtp;
