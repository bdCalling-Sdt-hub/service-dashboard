import { ConfigProvider, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { useGetWithdrawQuery } from "../../../redux/features/withdraw/withdrawApi";

const Withdraw = () => {
  // eslint-disable-next-line no-unused-vars
  const [currentPage,setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const { data: withdrawList, isFetching } = useGetWithdrawQuery()
  const dataSource = withdrawList?.data?.attributes?.map(attribute => ({
    key: attribute?._id,
    providerName: attribute.provider?.name,
    bankName: attribute.bankName,
    type: attribute?.accountType,
    accountNumber: attribute.accountNumber,
    amount: attribute?.withdrowAmount,
    status: attribute.status,
    date: attribute.date,
  }))

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  }

  const columns = [
    {
      title: "#SI",
      dataIndex: "",
      key: "",
      render: (text, _, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "Provider Name",
      dataIndex: "providerName",
      key: "name",
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: "A/C Type",
      dataIndex: "type",
      key: "phoneNumber",
    },
    {
      title: "A/C Number",
      dataIndex: "accountNumber",
      key: "date",

    },
    {
      title: "Withdraw Amount",
      dataIndex: "amount",
      key: "date",

    },
    {
      title: "Status",
      dataIndex: "status",
      key: "date",

    },
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
          <p className=" test-[24px] font-bold">Withdraw Request List</p>
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
            loading={isFetching}
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              // pageSize:10,
              // total:usersAll?.pagination?.Users,
              // showSizeChanger: false,
              //   onChange: handleChangePage,
            }}
            // pagination={false}
            columns={columns}
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
            <p className=" text-[26px] font-bold mb-[16px] my-10">Withdraw Request Details</p>
          </div>
          <div className="p-[20px] ">
            <div className="flex justify-between border-b py-[16px]">
              <p>Provider Name: </p>
              <p>
                {user?.providerName ? user?.providerName : "N/A"}
              </p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Bank Name:</p>
              <p>
                {user?.bankName ? user?.bankName : "N/A"}
              </p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>A/C type:</p>
              <p>
                {user?.type ? user?.type : "N/A"}
              </p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>A/C Number:</p>
              <p>
                {user?.accountNumber ? user?.accountNumber : "N/A"}
              </p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Withdraw Amount :</p>
              <p>
                {user?.amount ? user?.amount : "N/A"}
              </p>
            </div>
            <div className="flex justify-center gap-4 items-center pt-[16px]">
              <p className="px-[35px] cursor-pointer py-[10px] bg-white border-2 border-secondary text-secondary rounded-lg">Cancel</p>
              <p className="px-[55px] cursor-pointer py-[10px] bg-secondary text-white rounded-lg">
                {/* Regular P550 */}
                Approve
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Withdraw;
