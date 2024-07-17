import { Empty, Spin } from "antd";
import { useGetEarningQuery } from "../redux/features/earning/earningApi";


const EarningStatus = () => {
    const { data, isFetching, isError, error } = useGetEarningQuery();
    if (isFetching) {
        return <div className="w-full h-screen flex justify-center items-center"><Spin size="large" /></div>
    } else if (isError && error) {
        return <Empty description='No Data Available' />
    }
    return (
        <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
            <div className="bg-primary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 ">
                <div className="">
                    <p className=" font-medium text-[20px] text-textColor">Total Earnings</p>
                    <h1 className="text-secondary text-[44px] ">$ {data?.data?.attributes?.totalEarned} K</h1>
                </div>
            </div>
            <div className="bg-primary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 ">
                <div className="">
                    <p className="text-textColor font-medium  text-[20px]">Total Transaction</p>
                    <h1 className="text-secondary text-[44px]">{data?.data?.attributes?.totalTransaction}</h1>
                </div>
            </div>
            <div className="bg-primary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2">
                <div className="">
                    <p className="text-textColor font-medium text-[20px]">Total Bookings</p>
                    <h1 className="text-secondary text-[44px]">{data?.data?.attributes?.totalBooking}</h1>
                </div>
            </div>

        </div>
    );
}

export default EarningStatus;
