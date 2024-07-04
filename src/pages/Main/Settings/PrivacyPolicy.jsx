import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPrivacyQuery } from '../../../redux/features/settings/settingsApi';
import { ImSpinner6 } from 'react-icons/im';
import { useEffect } from 'react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { data, isFetching, isError, error, refetch } = useGetPrivacyQuery();


  useEffect(() => {
    refetch();
  }, [refetch]);
  let content = null;
  if (isFetching && !isError) {
    content = <div className="flex justify-center items-center"><ImSpinner6 className="animate-spin text-primary" size={100} /></div>
  } else if (!isFetching && isError && error) {
    return <div className='w-full p-5 text-center text-xl text-rose-500'>Something went wrong</div>
  } else if (!isFetching && !isError && data?.data?.attributes) {
    content = data?.data?.attributes?.text;
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
          Privacy Policy
        </h1>
      </div>
      <div className=" text-justify bg-primary mt-[24px] h-[60vh] overflow-y-auto border-2 border-secondary rounded-md p-2 font-bold" dangerouslySetInnerHTML={{ __html: content }}>

      </div>
      <Link to={`/settings/edit-privacy-policy/${data?.data?.attributes?._id}`} className="absolute text-center bottom-[-60px] bg-secondary
        text-white mt-5 py-3 rounded-lg w-full text-[18px] font-medium  duration-200">Edit Privacy Policy</Link>
    </div>
  );
}

export default PrivacyPolicy;
