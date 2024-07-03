import { ConfigProvider, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { useGetUsersQuery } from "../../../redux/features/users/usersApi";
import moment from "moment";

const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isFetching } = useGetUsersQuery();
  const [user, setUser] = useState(null);
  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  }

  const columns = [
    {
      title: "#SI",
      dataIndex: "",
      key: "index",
      render: (text, _, index) => (currentPage - 1) * 10 + index + 1,
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

  const dataSource = data?.data?.attributes || [];

  return (
    <div>
      <div className="bg-primary border-2 rounded-t-lg mt-6">
        <div className="flex py-6 px-5 justify-between items-center">
          <p className="text-2xl font-bold">User List</p>
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
            <div className="flex justify-between border-b py-4">
              <p>Driving license:</p>
              <p className="text-secondary font-bold cursor-pointer">Click Here</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AllUser;

