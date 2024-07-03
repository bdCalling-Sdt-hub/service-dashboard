import { useGetAllStatusQuery } from "../redux/features/status/statusApi";


const Status = () => {
    const { data: statusData, isLoading } = useGetAllStatusQuery();
    if (isLoading) {
        return <h1>Loading....</h1>
    }
    return (
        <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
            <div className="bg-primary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 ">
                <div className="">
                    <p className=" font-medium text-[20px] text-textColor">Total Earnings</p>
                    <h1 className="text-secondary text-[44px] ">$ {statusData?.data?.attributes?.totalearned} K</h1>
                </div>
            </div>
            <div className="bg-primary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 ">
                {/* <MdEmojiEvents size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
                <div className="">
                    <p className="text-textColor font-medium  text-[20px]">Total Users</p>
                    <h1 className="text-secondary text-[44px]">{statusData?.data?.attributes?.totalUser}</h1>
                </div>
            </div>
            <div className="bg-primary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2">
                {/* <FaUsers size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
                <div className="">
                    <p className="text-textColor font-medium text-[20px]">Total Providers</p>
                    <h1 className="text-secondary text-[44px]">{statusData?.data?.attributes?.totalProvider}</h1>
                </div>
            </div>

        </div>
    );
}

export default Status;
