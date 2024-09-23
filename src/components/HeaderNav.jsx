import { Typography } from "@material-tailwind/react";
import { FaArrowLeft, FaChevronLeft, FaRecycle, FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { UserStore } from "../state/store";
import React from "react";
import { DrawerPlacement } from "./Drawer";


// eslint-disable-next-line react/prop-types
function MobileHeader({page,logoutHandler}) {

  const navigate = useNavigate()
  const [openRight, setOpenRight] = React.useState(false);

 
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const handleGoBack = () => {
    // Use the navigate function to go back to the previous page
    navigate(-1);
  };



  const userInfo = UserStore.useState(state => state.user?.token)
  
  return (
    <div className={`md:hidden bg-white fixed top-0 left-0 right-0 z-10  text-black p-4 mb-2 shadow ${userInfo ? 'block' : 'hidden'}`}>
      <div className="flex justify-between  items-center">
        <div>
          <button onClick={handleGoBack} className="cursor-pointer  shadow-none">
              <FaChevronLeft className="text-black" />

          </button>
         
        </div>
        <div className="text-base font-semibold">
            <Typography variant="h6">{page}</Typography>
        </div>

        <div>
                 
        <button onClick={openDrawerRight} className='block'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
</svg>
</button>
        <div className={openRight ? '' : 'hidden'}>
    <DrawerPlacement openDrawerRight={openDrawerRight} openRight={openRight} closeDrawerRight={closeDrawerRight}/>
</div>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
