import { Button, ConfigProvider, DatePicker, Form, Input, Modal, Space, Table } from "antd";
const { Item } = Form
import { BsInfoCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useGetWithdrawQuery } from "../../../redux/features/withdraw/withdrawApi";
import { CiSearch } from "react-icons/ci";
import moment from "moment";

const Withdraw = () => {
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState([]);
  const [date, setDate] = useState('');
  const [user, setUser] = useState();
  const [withdrawList, setWithdrawList] = useState([])
  const { data, isFetching, isError, error } = useGetWithdrawQuery(params)
  const dataSource = withdrawList?.map((withdraw, index) => ({
    key: withdraw?._id,
    si: index + 1,
    providerName: withdraw.provider?.name,
    bankName: withdraw.bankName,
    type: withdraw?.accountType,
    accountNumber: withdraw.accountNumber,
    amount: withdraw?.withdrowAmount,
    date:withdraw?.createdAt,
    status: withdraw.status,
  }))
  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  }
  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
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
      key: "a/cNumber",

    },
    {
      title: "Withdraw Amount",
      dataIndex: "amount",
      key: "amount",

    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => text ? moment(text).format('DD MMM YYYY') : "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

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

  const handleDate = (date, dateString) => {
    setDate(dateString)
  }
  useEffect(() => {
    if (isError && error) {
      setWithdrawList([])
    } else if (data) {
      setWithdrawList(data?.data?.attributes)
    }
  }, [data, isError, error])
  return (
    <div>
      <div className="flex justify-between items-center">
      </div>
      <div className="bg-primary  border-2 rounded-t-lg mt-[24px]">
        <div className="w-full flex py-6 px-5 justify-between items-center">
          <p className="text-2xl font-bold">Withdraw Request Details</p>
          <Form
            className="flex px-3 py-[22px] justify-between items-center"
            layout="inline"
            onFinish={onFinish}
          >
            <Item>
              <DatePicker onChange={handleDate} />
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
          <div className="w-full flex py-6 px-5 justify-between items-center">
            <p className="text-2xl font-bold">Withdraw Request Details</p>
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
