import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CategoriesCart from "../../../Components/CategoriesCart";
import { useGetCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { useEffect } from "react";
import { Empty, Spin } from "antd";

const Categories = () => {
    const {
        data: categoriesData,
        isFetching,
        isError,
        error,
        refetch,
    } = useGetCategoriesQuery();
    const navigate = useNavigate();
    useEffect(() => {
        refetch();
    }, [refetch]);
    let content = null;
    if (isFetching) {
        content = (
            <div className="w-full h-screen flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    } else if (isError && error) {
        content = <Empty description="No Data Available" />;
    } else if (categoriesData?.data?.attributes) {
        content = (
            <div className="grid grid-cols-6 gap-4 my-4">
                {categoriesData?.data?.attributes?.map((category) => (
                    <CategoriesCart key={category?._id} category={category} />
                ))}
            </div>
        );
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-[24px] font-semibold">Events</p>
                <div
                    onClick={() => navigate("/categories/add-categories")}
                    className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-secondary
                  rounded-lg
                  text-white
                  cursor-pointer
                  mt-10
                  "
                >
                    <FaPlus size={17} />
                    <p>Add Categories</p>
                </div>
            </div>
            {content}
        </div>
    );
};

export default Categories;
