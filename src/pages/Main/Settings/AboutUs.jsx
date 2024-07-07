import { useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useGetAboutUsQuery } from "../../../redux/features/settings/settingsApi";
import { Empty, Spin } from "antd";
const AboutUs = () => {
  const navigate = useNavigate();
  const { data, isFetching, isError, error, refetch } = useGetAboutUsQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (isFetching && !isError) {
    return <div className="w-full h-screen flex justify-center items-center ">
      <Spin size="large" />
    </div>
  } else if (!isFetching && isError && error) {
    return <Empty description='No Data Available' />
  }
  return (
    <div className="relative ml-[24px] ">
      <div className=" mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
        <MdOutlineKeyboardArrowLeft
          className=""
          onClick={() => navigate("/settings")}
          size={34}
        />
        <h1 className="text-[24px] font-semibold ">
          About Us
        </h1>
      </div>
      <div className=" text-justify bg-primary mt-[24px] h-[60vh] overflow-y-auto border-2 border-secondary rounded-md p-2 font-bold" dangerouslySetInnerHTML={{ __html: data?.data?.attributes?.text }}>

      </div>
      <Link to={`/settings/edit-about-us/${data?.data?.attributes?._id}`} className="absolute text-center bottom-[-60px] bg-secondary
        text-white mt-5 py-3 rounded-lg w-full text-[18px] font-medium  duration-200">Edit About Us</Link>
    </div>
  );
}

export default AboutUs;
