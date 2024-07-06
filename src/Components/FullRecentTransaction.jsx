import { useRef, useState, useEffect } from 'react';
import { Button, ConfigProvider, DatePicker, Form, Input, Modal, Space, Table } from "antd";
const { Item } = Form;
import { BsInfoCircle } from "react-icons/bs";
import { useReactToPrint } from 'react-to-print';
import { CiSearch } from 'react-icons/ci';
import { useGetRecentTransactionQuery } from '../redux/features/dashboard/dashboardApi';
import moment from 'moment';

const FullRecentTransaction = () => {
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState([]);
  const [date, setDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const [allRecentUserTrxData, setAllRecentUserTrxData] = useState([])

  const { data, isFetching, isError, error } = useGetRecentTransactionQuery(params);

  const dataSource = allRecentUserTrxData?.map(attribute => ({
    key: attribute?._id,
    transactionId: attribute?.transactionId,
    name: attribute?.user?.name,
    providerName: attribute?.provider?.name,
    amount: attribute?.price,
    date: attribute?.createdAt,
  }));

  const onFinish = (values) => {
    let queryParams = [];
    const { username, providername } = values;
    if (date) {
      queryParams.push({ name: 'date', value: date });
    }
    if (username) {
      queryParams.push({ name: 'userName', value: username });
    }
    if (providername) {
      queryParams.push({ name: 'providerName', value: providername });
    }
    setParams(queryParams);
  };

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };

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

  const handleDate = (date, dateString) => {
    setDate(dateString)
  }

  useEffect(() => {
    if (isError && error) {
      setAllRecentUserTrxData([])
    } else if (data) {
      setAllRecentUserTrxData(data?.data?.attributes)
    }
  }, [data, isError, error])

  return (
    <div>
      <div className="flex justify-between items-center"></div>
      <div className="bg-primary border-2 rounded-t-lg mt-[24px]">
        <div className="w-full flex py-6 px-5 justify-between items-center">
          <p className="text-2xl font-bold">Recent Transactions</p>
          <Form
            className="flex px-3 py-[22px] justify-between items-center"
            layout="inline"
            onFinish={onFinish}
          >
            <Item>
              <DatePicker onChange={handleDate} />
            </Item>
            <Item name="username">
              <Input placeholder="User name" />
            </Item>
            <Item name="providername">
              <Input placeholder="Provider name" />
            </Item>
            <Item>
              <Button type='primary' className='bg-[#95C343] rounded-full' htmlType="submit">
                <CiSearch className='size-5 text-white' />
              </Button>
            </Item>
          </Form>
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
            }}
            columns={columns}
            dataSource={dataSource}
          />
        </ConfigProvider>
      </div>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        closeIcon
      >
        <div className="text-black bg-primary" ref={componentRef}>
          <div className="flex justify-center items-center gap-2 flex-col border-b border-b-gray-300">
            <p className="text-[26px] font-bold mb-[16px] my-10">Transaction Details</p>
          </div>
          <div className="p-[20px] ">
            <div className="flex justify-between border-b py-[16px]">
              <p>Transaction ID: </p>
              <p>{user?.transactionId ? user?.transactionId : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Date:</p>
              <p>{user?.date ? moment(user?.date).format('DD MMM YYYY') : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px] ">
              <p>User Name:</p>
              <p>{user?.name ? user?.name : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Amount :</p>
              <p>{user?.amount ? user?.amount : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Provider Name:</p>
              <p>{user?.providerName ? user?.providerName : "N/A"}</p>
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
};

export default FullRecentTransaction;
