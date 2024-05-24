

const EarningStatus = () => {
    return (
        <div className="grid grid-cols-3 gap-[24px] mt-[24px]">
            <div className="bg-primary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 ">
                {/* <LuBadgeDollarSign size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
                <div className="">
                    <p className=" font-medium text-[20px] text-textColor">Total Earnings</p>
                    <h1 className="text-secondary text-[44px] ">$ 24.88 K</h1>
                </div>
            </div>
            <div className="bg-primary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 ">
                {/* <MdEmojiEvents size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
                <div className="">
                    <p className="text-textColor font-medium  text-[20px]">Total Transaction</p>
                    <h1 className="text-secondary text-[44px]">6500</h1>
                </div>
            </div>
            <div className="bg-primary px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2">
                {/* <FaUsers size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/> */}
                <div className="">
                    <p className="text-textColor font-medium text-[20px]">Total Bookings</p>
                    <h1 className="text-secondary text-[44px]">740</h1>
                </div>
            </div>
           
        </div>
    );
}

export default EarningStatus;
