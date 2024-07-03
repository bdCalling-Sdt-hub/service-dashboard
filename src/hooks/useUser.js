import { useSelector } from "react-redux"

const useUser = ()=>{
   const {token,user} = useSelector(state=>state?.auth);
   return {token,user}
}
export default useUser