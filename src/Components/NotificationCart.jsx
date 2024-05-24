import { IoIosNotificationsOutline } from "react-icons/io";


function calculateTimeDifference(dateString) {
    const now = new Date();
    const date = new Date(dateString);

    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (yearsAgo > 0) {
      return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
    } else if (daysAgo > 0) {
      return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else if (hoursAgo > 0) {
      return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
    } else if (minutesAgo > 0) {
      return minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago`;
    } else {
      return "just now";
    }
}

const NotificationCart = ({item}) => {
    const createdAt = "2022-01-01T00:00:00.000Z";
    const message = "You have received $500 from John Doe";
//   const {message,createdAt} = item;
    return (
        <div  className={`flex rounded-lg my-[16px]  ${
            "true" ? "bg-primary" : "bg-[#e8e6fca8]"
        } p-[16px] gap-[16px] justify-between items-center`}>
             <div className={`flex gap-[16px] items-center p-[16px] `}>
              {/* <div className="w-10 h-10 flex p-[7px] rounded bg-[#EEF6EA] "> */}
              <IoIosNotificationsOutline
                style={{ cursor: "pointer" }}
                className={` bg-primary w-[52px] h-[52px] text-secondary border-2 border-secondary rounded-full p-2 `}
              />
              {/* </div> */}
              
                <h1 className="text-[16px]  font-normal">
                    
                    {message}.
                </h1>
                {/* <p className="text-[14px] text-[#979797]">{formatDate(createdAt)}</p> */}
            
            </div>
            <div>
                <small className="">{calculateTimeDifference(createdAt)}</small>
            </div>
        </div>
    );
}

export default NotificationCart;

