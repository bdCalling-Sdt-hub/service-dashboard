import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import CategoriesCart from '../../../Components/CategoriesCart';
import { useGetCategoriesQuery } from '../../../redux/features/category/categoryApi';
import { useEffect } from 'react';

const Categories = () => {
    const { data: categoriesData, refetch } = useGetCategoriesQuery();
    const navigate = useNavigate();
    useEffect(() => {
        refetch()
    }, [refetch])
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
                  "
                >
                    <FaPlus size={17} />
                    <p>Add Categories</p>
                </div>
            </div>
            <div className='grid grid-cols-6 gap-4 my-4'>
                {
                    categoriesData?.data?.attributes?.map(category => <CategoriesCart key={category?._id} category={category} />)
                }
            </div>
        </div>
    );
}

export default Categories;
