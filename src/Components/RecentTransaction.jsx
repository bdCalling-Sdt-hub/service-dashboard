import { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useReactToPrint } from 'react-to-print';
import { useGetRecentTransactionQuery } from '../redux/features/dashboard/dashboardApi';
import moment from 'moment';

const RecentTransaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const [allRecentUserTrxData, setAllRecentUserTrxData] = useState([])
  const { data, isFetching, isError, error
  } = useGetRecentTransactionQuery()

  const dataSource = allRecentUserTrxData?.slice(0, 10)?.map(attribute => ({
    key: attribute?._id,
    transactionId: attribute?.transactionId,
    name: attribute?.user?.name,
    providerName: attribute?.provider?.name,
    amount: attribute?.price,
    date: attribute?.createdAt,
  }))

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  }

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
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
      key: "date",
      dataIndex: "date",
      render: (text) => text ? moment(text).format('DD MMM YYYY') : "N/A",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsInfoCircle onClick={() => handleView(record)} size={18} className="text-[red] cursor-pointer" />
        </Space>
      ),
    },
  ];

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Transaction Details',
    onAfterPrint: () => setIsModalOpen(false),
  });

  useEffect(() => {
    if (isError && error) {
      setAllRecentUserTrxData([])
    } else if (data) {
      setAllRecentUserTrxData(data?.data?.attributes)
    }
  }, [data, isError, error])
  return (
    <div>
      <div className="flex justify-between items-center">
      </div>
      <div className="bg-primary border-2 rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] mx-[20px] justify-between items-center">
          <p className="text-[24px] font-bold">Recent Transactions</p>
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
            pagination={false}
            loading={isFetching}
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
        <div className="text-black bg-primary" ref={componentRef}>
          <div className="flex justify-center items-center gap-2 flex-col border-b border-b-gray-300">
            <p className="text-[26px] font-bold mb-[16px] my-10">Transaction Details</p>
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
              <p>{user?.date ? moment(user?.date).format('DD MMM YYYY') : "N/A"}</p>
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
            <div className="flex justify-between border-b py-[16px]">
              <p>Provider Name:</p>
              <p>
                {user?.providerName ? user?.providerName : "N/A"}
              </p>
            </div>
            <div className="flex justify-center gap-4 items-center pt-[16px] print:hidden">
              <p
                className="px-[55px] cursor-pointer py-[10px] bg-[green] text-white rounded-lg"
                onClick={handlePrint}
              >
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
