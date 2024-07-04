import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { ImSpinner6 } from 'react-icons/im';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAddCategoriesMutation } from '../../../redux/features/category/categoryApi';
const AddCategory = () => {
  const [addCategory, { data, isLoading, isError, error }] = useAddCategoriesMutation()
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const handleUploadScore = async (values) => {
    const formdata = new FormData();
    formdata.append("name", values?.categoryName);
    formdata.append("icone", selectedFile);
    addCategory(formdata);

  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  useEffect(() => {
    if (isError && error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (data?.statusCode === 200 && data?.data) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/categories`)
    }
  }, [data, isError, error, navigate])
  return (
    <div className="ml-[24px] overflow-auto">
      <div className="mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
        <MdOutlineKeyboardArrowLeft
          onClick={() => navigate(`/categories`)}
          size={34}
        />
        <h1 className="text-[24px] text-textColor font-semibold">
          Add New Category
        </h1>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          onFinish={handleUploadScore}
          autoComplete="off"
        >
          <div className="flex gap-5">
            <Form.Item
              name="categoryName"
              label={
                <span className="text-textColor text-[18px] ">Category Name</span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your Match Name!",
                },
              ]}
            >
              <Input
                placeholder="category name"
                className="p-4 bg-primary
              rounded w-full 
              justify-start 
              border-2
              border-secondary
              mt-[12px]
              items-center 
              gap-4 inline-flex focus:bg-primary hover:bg-primary focus:border-secondary hover:border-secondary"
              />
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item
              name="imagePath"
              label={
                <span className="text-textColor text-[18px] ">Upload category Icon</span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your Match Name!",
                },
              ]}
            >
              <input
                className="p-4 bg-primary
            rounded w-full 
            justify-start 
            border-2 
            border-secondary
            mt-[12px]
            
            items-center 
            gap-4 inline-flex"
                type="file"
                onChange={handleFileChange}
                // accept=".csv"
                required
              />

            </Form.Item>
          </div>

          <Button
            htmlType="submit"
            block
            className="block w-[500px] h-[56px] mt-[30px] px-2 py-4  text-white bg-gradient-to-r from-red-500 to-red-800 rounded-lg hover:bg-red-600"
            style={{
              marginTop: "30px",
              backgroundColor: "#95C343",
              color: "#fff",
              size: "18px",
              height: "56px",
            }}
          >
            {
              isLoading ? <h1 className="flex justify-center items-center gap-1"><ImSpinner6 className="animate-spin size-5" /> <span>Add Category</span></h1> : 'Add Category'
            }

          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddCategory;
