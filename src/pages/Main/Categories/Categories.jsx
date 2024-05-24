import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import CategoriesCart from '../../../Components/CategoriesCart';

const Categories = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between items-center">
        <p className="text-white text-[24px]">Events</p>
        <div
          onClick={(e) => navigate("/categories/add-categories")}
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
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
                <CategoriesCart/>
            </div>
        </div>
    );
}

export default Categories;
