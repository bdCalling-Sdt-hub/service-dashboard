import { Button } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useGetPrivacyQuery, useUpdatePrivacyMutation } from "../../../redux/features/settings/settingsApi";

const EditPrivacyPolicy = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const editor = useRef(null);
  const { data } = useGetPrivacyQuery();
  const [updatePrivacy, { data: updatePrivacyData, isError, error }] = useUpdatePrivacyMutation()
  const [content, setContent] = useState("");


  const handleUpdate = async () => {
    updatePrivacy({ data: { text: content }, id })
  }

  useEffect(() => {
    setContent(data?.data?.attributes?.text);
  }, [data])

  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (updatePrivacyData?.statusCode === 200 && updatePrivacyData?.data) {
      console.log(updatePrivacyData)
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: updatePrivacyData?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/settings/privacy-policy");
    }

  }, [updatePrivacyData, isError, error, navigate])
  return (
    <div className="relative ml-[24px]">
      <div className=" mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
        <MdOutlineKeyboardArrowLeft
          className=""
          onClick={() => navigate("/settings/privacy-policy")}
          size={34}
        />
        <h1 className="text-[24px] font-semibold">
          Edit Privacy Policy
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

export default EditPrivacyPolicy;
