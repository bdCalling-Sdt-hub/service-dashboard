import { Empty, Pagination, Spin } from "antd";
// import { useState } from "react";
import NotificationCart from "../../../Components/NotificationCart";
import { useGetNotificationsQuery } from "../../../redux/features/notification/notificationApi";
const Notification = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetNotificationsQuery();
  if (isLoading) {
    return <div className="w-full h-screen flex justify-center items-center"><Spin size="large" /></div>
  } else if (error) {
    return <div className=" mt-10"><Empty /></div>
  } else if (data) {
    console.log(data)
  }

  const onChange = (values) => {
    console.log(values);
    // setCurrentPage(values);
  };
  console.log(data)
  return (
    <div>
      <div className="pl-[24px] ">
        <div className="rounded-xl overflow-hidden">
          <div className="">
            <h1 className="text-[24px] text-black  font-semibold pb-3">
              Notification
            </h1>
          </div>
          <div className="flex flex-col">
            {/* {
                data?.data?.attributes?.map((item,index)=>(
                  <NotificationCart key={item?._id} item={item}/>
                ))
              } */}
            <NotificationCart />
            <NotificationCart />
            <NotificationCart />
            <NotificationCart />

          </div>
          <div className="flex justify-center my-10">
            <Pagination
              onChange={onChange}
              defaultCurrent={1}
              // total={data?.pagination?.totalNotification}
              total={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
