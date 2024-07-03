import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const CategoriesCart = ({ category }) => {
    const { _id, name, catagoryIcon } = category || {};
    return (
        <div className='bg-[#F4F9EC]  rounded-lg w-[200px] p-5'>
            <img className='w-[80px] mx-auto' src={`${import.meta.env.VITE_BASE_URL}/${catagoryIcon[0]?.publicFileUrl}`} alt="" />
            <p className='text-textColor text-[18px] text-center my-2 font-semibold'>{name}</p>
            <div className='flex gap-2 justify-center'>
                <p className='text-secondary cursor-pointer bg-white border-2 border-secondary py-2 px-5 rounded-lg text-[12px]'>Delete</p>
                <Link to={`/categories/edit-categories/${_id}`}>
                    <p className='text-white cursor-pointer bg-secondary py-2 px-7 rounded-lg text-[12px]'>Edit</p>
                </Link>

            </div>
        </div>
    );
}

export default CategoriesCart;
