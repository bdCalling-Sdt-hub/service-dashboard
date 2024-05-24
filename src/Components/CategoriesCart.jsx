import React from 'react';
import cartImg from '../assets/cart.png';
import { useNavigate } from 'react-router-dom';

const CategoriesCart = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-[#F4F9EC]  rounded-lg w-[200px] p-5'>
            <img className='w-[84px] mx-auto' src={cartImg} alt="" />
            <p className='text-textColor text-[18px] text-center my-2 font-semibold'>Technology</p>
            <div className='flex gap-2 justify-center'>
                <p className='text-secondary cursor-pointer bg-white border-2 border-secondary py-2 px-5 rounded-lg text-[12px]'>Delete</p>
                <p onClick={() => navigate("/categories/edit-categories/:id")} className='text-white cursor-pointer bg-secondary py-2 px-7 rounded-lg text-[12px]'>Edit</p>
            </div>
        </div>
    );
}

export default CategoriesCart;
