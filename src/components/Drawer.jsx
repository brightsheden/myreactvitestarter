import React, { useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  ButtonGroup,
} from "@material-tailwind/react";
import { FaHome, FaList, FaMoneyBill, FaNewspaper, FaSignOutAlt, FaSuitcase, FaUser, FaUsers, FaVideo, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserStore } from "../state/store";


 
export function DrawerPlacement({openRight, closeDrawerRight}) {

  const userInfo = UserStore.useState(state => state?.user?.token)


  const logoutHandler = () => {
    UserStore.update(s => {
      s.user = null,
      s.isLoggedIn=false
    })
    localStorage.removeItem('userInfo');
   
  };
const navaigate = useNavigate()
  useEffect(()=>{
    if(!userInfo){
      navaigate('/login')

    }

  },[userInfo])

  



 
  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
       
      </div>
    
      <Drawer
        placement="left"
        open={openRight}
        onClose={closeDrawerRight}
        className="text-white bg-white"
      >
        <div className="flex flex-col px-2 py-6 h-screen bg-[rgba(0,0,0,0.7)] backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-12">
          <Typography variant="h5" color="white">
           AirSpaceRecord
          </Typography>
          <IconButton
            variant="text"
            color="white"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>

        </div>
          <div className="">
          <ul className="">
            <Link to={'/'}>
            <li className="nav-link">
              <span><FaHome/></span>

              <span> Home</span>
              
             </li>

            </Link>

  
        
            <div>
            {userInfo?(
              <div className="space-y-4">


              <div className="flex items-center gap-2 nav-link">
                <FaList/>
                <Link to={'/adminrecords'}>
                  Manage Records
                </Link>
              </div>


              <button className="flex items-center gap-2 nav-link" onClick={logoutHandler}>
                <FaSignOutAlt/>
              
                  Logout
           
              </button>
              </div>
             
             
            ): (

              <div className="flex my-5 flex-col w-full justify-between gap-4"
              >
                 <Link to={'/login'}>
              <Button className='bg-black p-2  btn-primary rounded-full w-40 text-white shadow-sm'>
                
               
                Login
                </Button>
                </Link>
                <Link to={'/register'}>
              <Button className=' bg-primary w-40 rounded-full text-white hover:bg-black'>
                
             
              Register
               </Button>
               </Link>
                </div>

            )}
            
           
            
            </div>
           
          </ul>
         
        </div>
        </div>

       
      </Drawer>
      
    </React.Fragment>
  );
}