import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import useUser from "../../hooks/useUser";

const Header = () => {
  const { user } = useUser()
  const navigate = useNavigate();
  console.log(user)
  return (
    <div className="flex justify-between items-center rounded-md mb-[24px] p-[16px] bg-primary">
      <div className="flex items-center gap-5">
        <MdMenu className="h-[42px] w-[42px] text-secondary" />
        {location.pathname == "/dashboard/users" ||
          location.pathname == "/dashboard/appointments" ||
          location.pathname == "/dashboard/earnings" ? (
          <div className="">{/* <SearchBox /> */}</div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex gap-5">
        {/* <Dropdown overlay={menu} placement="bottomRight" arrow> */}
        <div
          onClick={() => navigate("notification")}
          className="relative flex items-center "
        >
          <Badge style={{ backgroundColor: "red" }} count={1}>
            <IoIosNotificationsOutline
              style={{ cursor: "pointer" }}
              className={` bg-primary w-[52px] h-[52px] text-secondary border-2 border-secondary rounded-full p-2 `}
            />
          </Badge>
        </div>
        {/* </Dropdown> */}
        <div
          onClick={() => navigate("profile-information")}
          className="flex items-center cursor-pointer mr-[30px] bg-primary rounded-full p-1"
        >
          {
            user ? <div className="flex items-center gap-2">
              <img src={`${import.meta.env.VITE_BASE_URL}/${user?.image[0]?.publicFileUrl}`} alt="" className="size-16 rounded-full" />
              <div >
                <h1 className="font-semibold">{user?.name}</h1>
                <h1>{user?.role}</h1>
              </div>
            </div> : <FaRegUser className="text-secondary border-2 border-secondary rounded-full p-2 w-[52px] h-[52px]" />
          }

        </div>
      </div>
    </div>
  );
};

export default Header;