import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { ImSpinner6 } from 'react-icons/im';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useGetSingleCategoriesQuery, useUpdateCategoriesMutation } from '../../../redux/features/category/categoryApi';

const EditCategory = () => {
  const { id } = useParams();
  const { data: singleCategory, refetch } = useGetSingleCategoriesQuery(id);
  const [viewImage, setViewImage] = useState(null);
  const [updateCategory, { data, isLoading, isError, error }] = useUpdateCategoriesMutation();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();

  const handleUploadScore = async (values) => {
    const formdata = new FormData();
    if (values?.categoryName) {
      formdata.append("name", values?.categoryName);
    }
    if (selectedFile) {
      formdata.append("icone", selectedFile);
    }
    updateCategory({ formdata, id });
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setViewImage(URL.createObjectURL(event.target.files[0]));
  };
  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isError && error) {
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
      navigate(`/categories`);
    }
  }, [data, isError, error, navigate]);

  return (
    <div className="ml-[24px] overflow-auto">
      <div className="mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
        <MdOutlineKeyboardArrowLeft
          onClick={() => navigate(`/categories`)}
          size={34}
        />
        <h1 className="text-[24px] text-textColor font-semibold">
          Edit Category
        </h1>
      </div>
      <div>
        {
          singleCategory?.data?.attributes !== undefined && <Form
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
              >
                <Input
                  defaultValue={singleCategory?.data?.attributes?.name}
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
              >
                <div className='w-[100px] p-2 bg-gray-300 rounded'>
                  {
                    viewImage ? <img className='w-[80px] mx-auto' src={viewImage} alt="" /> :
                      <img className='w-[80px] mx-auto' src={`${import.meta.env.VITE_BASE_URL}/${singleCategory?.data?.attributes?.catagoryIcon[0]?.publicFileUrl}`} alt="" />
                  }
                </div>
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
                isLoading ? <h1 className="flex justify-center items-center gap-1"><ImSpinner6 className="animate-spin size-5" /> <span>Update Category</span></h1> : 'Update Category'
              }
            </Button>
          </Form>
        }

      </div >
    </div >
  );
}

export default EditCategory;
