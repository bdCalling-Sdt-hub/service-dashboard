import { Form, Input, Button } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
// import { useGetAboutUsQuery } from "../../../redux/Features/getAboutUsApi";
// import baseURL from "../../../config";
import Swal from "sweetalert2";

const EditAboutUs = () => {
    const navigate = useNavigate();
    const editor = useRef(null);
    // const {data,isSuccess,isLoading} = useGetAboutUsQuery();
    // const [content, setContent] = useState(data?.data?.attributes?.content);
    const [content, setContent] = useState("");
    // useEffect(()=>{
    // setContent(data?.data?.attributes?.content);  
    // },[data])
    // console.log("data",data);
  console.log(content);
  
    const handleUpdate = async ()=>{
      console.log(content);
    //   try {
    //     const response = await baseURL.put(`/setting/about-us`, {
    //       content: content
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         authentication: `Bearer ${localStorage.getItem("token")}`,
    //       }
    //     }
    //     )
    //     if(response?.data?.statusCode === 201){
    //       Swal.fire({
    //         position: "top-center",
    //         icon: "success",
    //         title: response?.data?.message,
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       setInterval(()=>window.location.reload(),1600)
    //       navigate("/settings/about-us")
    //     }
       
       
    //     console.log(response);
    //   }catch(error){
    //     console.log(error);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Try Again...",
    //       text: error?.response?.data?.message,
    //       footer: '<a href="#">Why do I have this issue?</a>',
    //     })
    //   }
    } 
    return (
        <div className="relative ml-[24px]">
        <div className=" mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
          <MdOutlineKeyboardArrowLeft
            className=""
            onClick={() => navigate("/settings/about-us")}
            size={34}
          />
          <h1 className="text-[24px] font-semibold">
            Edit About Us
          </h1>
        </div>
        <div className="text-justify  mt-[24px] relative ">
          <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => {
          setContent(newContent);
        }}
        className="text-wrap"
        style={{ width: '100%' }} 
      />
      <Button
        onClick={handleUpdate}
        style={{
                
          backgroundColor: "#95C343",
          color: "#fff",
          size: "18px",
          height: "56px",
        }}
        block
        className="mt-[30px] h-[60px] hover:text-white bg-secondary hover:bg-gradient-to-r from-red-500 via-red-600 to-red-800
        text-white py-3 rounded-lg w-full text-[18px] font-medium  duration-200"
      >
        Update
        </Button>
        </div>
      </div>
    );
}

export default EditAboutUs;

