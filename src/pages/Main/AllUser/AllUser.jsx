import { useEffect, useState } from "react";
import { Button, ConfigProvider, DatePicker, Input, Modal, Space, Table, Form, Image } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useGetUsersQuery } from "../../../redux/features/users/usersApi";
import moment from "moment";
import { CiSearch } from "react-icons/ci";

const { Item } = Form;

const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState([]);
  const [date, setDate] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [user, setUser] = useState(null);
  const { data, isFetching, isError, error } = useGetUsersQuery(params);

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };

  const dataSource = allUser?.map((user, index) => ({
    key: user._id,
    si: index + 1,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    createdAt: user?.createdAt,
    driverLicenceFront: user?.driverLicenceFront,
    driverLicenceback: user?.driverLicenceback
  }))
  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "index",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => text ? moment(text).format('DD MMM YYYY') : "N/A",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsInfoCircle onClick={() => handleView(record)} size={18} className="text-red-600 cursor-pointer" />
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {
    let queryParams = [];
    const { username } = values;
    if (date) {
      queryParams.push({ name: 'date', value: date });
    }
    if (username) {
      queryParams.push({ name: 'userName', value: username });
    }
    setParams(queryParams);
  };

  const handleDate = (date, dateString) => {
    setDate(dateString)
  }
  useEffect(() => {
    if (isError && error) {
      setAllUser([])
    } else if (data) {
      setAllUser(data?.data?.attributes)
    }
  }, [data, isError, error])
  return (
    <div>
      <div className="bg-primary border-2 rounded-t-lg mt-6">
        <div className="w-full flex py-6 px-5 justify-between items-center">
          <p className="text-2xl font-bold">User List</p>
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
              onChange: setCurrentPage,
            }}
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
          />
        </ConfigProvider>
      </div>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="text-black bg-primary">
          <div className="flex justify-center items-center gap-2 flex-col border-b border-gray-300">
            <p className="text-2xl font-bold mb-4 my-10">User Details</p>
          </div>
          <div className="p-5">
            <div className="flex justify-between border-b py-4">
              <p>User Name: </p>
              <p>{user?.name || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-4">
              <p>Email:</p>
              <p>{user?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-4">
              <p>Phone Number:</p>
              <p>{user?.phone || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-4">
              <p>Address:</p>
              <p>{user?.address || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-4">
              <p>Joining Date :</p>
              <p>{user?.createdAt ? moment(user.createdAt).format('DD MMM YYYY') : "N/A"}</p>
            </div>
            <div>
              <p>Driving license</p>
              <div className="flex gap-5 mt-5">
                <Image
                  width={60}
                  src={`${import.meta.env.VITE_BASE_URL}/${user?.driverLicenceFront[0]?.publicFileUrl}`}
                />
                <Image
                  width={60}
                  src={`${import.meta.env.VITE_BASE_URL}/${user?.driverLicenceback[0]?.publicFileUrl}`}
                />

              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AllUser;
