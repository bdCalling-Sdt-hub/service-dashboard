import { ConfigProvider, DatePicker, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";




const RecentTransaction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();

  const dataSource = [
    {
      key: '1',
      transactionId: '12345678',
      name: "Ahad",
      providerName: "Ahad Hossain",
      age: 32,
      amount: 3000,
      date: "2022-12-12",
    },
    {
      key: '2',
      transactionId: '12345678',
      name: "Ahad",
      providerName: "Ahad Hossain",
      age: 32,
      amount: 3000,
      date: "2022-12-12",
    },
    {
      key: '3',
      transactionId: '12345678',
      name: "Ahad",
      providerName: "Ahad Hossain",
      age: 32,
      amount: 3000,
      date: "2022-12-12",
    },
    {
      key: '4',
      transactionId: '12345678',
      name: "Ahad",
      providerName: "Ahad Hossain",
      age: 32,
      amount: 3000,
      date: "2022-12-12",
    },
    {
      key: '5',
      transactionId: '12345678',
      name: "Ahad",
      providerName: "Ahad Hossain",
      age: 32,
      amount: 3000,
      date: "2022-12-12",
    },
  ];

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  }

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "transactionId",
      key: "transactionId",
      // render: (text,_,index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      // render: (_, record) => (
      //   <div className="flex gap-2 items-center">
      //     <img
      //       className="w-[34px] h-[34px] rounded-full"
      //       src={`${import.meta.env.VITE_BASE_URL}${record?.image?.publicFileURL}`}
      //       alt=""
      //     />
      //     <p className="font-medium">{record.name}</p>
      //   </div>
      // ),
    },
    {
      title: 'Provider Name',
      dataIndex: 'providerName',
      key: 'providerName',
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      // render: (_, record) => (
      //   <p>{record?.club ? record?.club : "N/A"}</p>
      // )
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (_, record) => (
        <p>{record?.createdAt?.split("T")[0] ? record?.createdAt?.split("T")[0] : "N/A"}</p>
      )
    },
    // {
    //   title: 'Amount',
    //   key: 'amount',
    //   dataIndex: 'amount',

    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">

          <BsInfoCircle onClick={() => handleView(record)} size={18} className="text-[red] cursor-pointer" />

          {/* <a><RxCross2 size={18} className='text-[red]'/></a> */}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
      </div>
      <div className="bg-primary  border-2 rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] mx-[20px] justify-between items-center">
          <p className=" test-[24px] font-bold">Recent Transactions</p>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#95C343",
                headerColor: "white",
                headerBorderRadius: 2,
                colorBgContainer: "#F4F9EC",
              },
            },
          }}
        >


          <Table
            //   pagination={{
            //     position: ["bottomCenter"],
            //     current: currentPage,
            //       // pageSize:10,
            //       // total:usersAll?.pagination?.Users,
            //       // showSizeChanger: false,
            //     //   onChange: handleChangePage,
            //   }}
            pagination={false}
            columns={columns}
            // dataSource={usersAll?.data?.attributes}
            dataSource={dataSource}

          />
        </ConfigProvider>
      </div>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        closeIcon
      >
        <div className="text-black bg-primary">
          <div className="flex justify-center items-center gap-2 flex-col border-b border-b-gray-300">

            <p className=" text-[26px] font-medium text-textColor mb-[16px] my-10">Transaction Details</p>
          </div>
          <div className="p-[20px] ">
            <div className="flex justify-between border-b py-[16px]">
              <p>Transaction ID: </p>
              <p>
                {user?.transactionId ? user?.transactionId : "N/A"}
              </p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Date:</p>
              <p>
                {user?.date ? user?.date : "N/A"}
              </p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>User Name:</p>
              <p>
                {user?.name ? user?.name : "N/A"}
              </p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Amount :</p>
              <p>
                {user?.amount ? user?.amount : "N/A"}
              </p>
            </div>
            {/* <div className="flex justify-between border-b py-[16px]">
            <p>Score:</p>
            <p>
              {user?.score ? user?.score : "N/A"}
            </p>
          </div> */}
            <div className="flex justify-between border-b py-[16px]">
              <p>Provider Name:</p>
              <p>
                {user?.providerName ? user?.providerName : "N/A"}
              </p>
            </div>

            <div className="flex justify-center gap-4 items-center pt-[16px]">
              <p className="px-[35px] cursor-pointer py-[10px] bg-white border-2 border-secondary text-secondary rounded-lg">Download</p>
              <p className="px-[55px] cursor-pointer py-[10px] bg-secondary text-white rounded-lg">
                {/* Regular P550 */}
                Print
              </p>
            </div>

          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RecentTransaction;
