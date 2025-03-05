"use client"

import {
  CheckInCircleIcon,
  EditIcon,
  XIcon,

  UploadIcon
} from '@/icons';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { profile_image_upload, messageClear, profile_info_add } from '@/store/Reducers/authReducer'
import { SettingsDialog } from "@/components/settings-dialog"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"


export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';
export const gradients = 'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600';
  
  
export default function Profile() {

  const [activeTab, setActiveTab] = useState('Profile');
  const [state, setState] = useState<any>({
    division: '',
    district: '',
    shopName: '',
    sub_district: ''
})
const dispatch = useDispatch<any>()
const { userInfo, loader, successMessage } = useSelector((state:any) => state.auth)
const [image, setImage] = useState(userInfo?.image || "https://github.com/shadcn.png");

const add_image = (e:any) => {
    if (e.target.files.length > 0) {
        const formData:any = new FormData()
        formData.append('image', e.target.files[0])
        dispatch(profile_image_upload(formData))
    }
}



useEffect(() => {
    if (successMessage) {
        toast.success(successMessage)
        messageClear()
    }
}, [successMessage])


const add = (e:any) => {
    e.preventDefault()
    dispatch(profile_info_add(state))
}

const inputHandle = (e:any) => {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
}
  const handleTabClick = (tabName:any) => {
    setActiveTab(tabName);
  };

  return (
    <div className="min-h-screen pb-20">
      <div>
        <div
         className={`h-48 w-full lg:h-64 
         ${gradients}`}
        />
        <div
          className={`${profileWidth}  sm:-mt-16 sm:flex sm:items-end sm:space-x-5`}
        >
          <label htmlFor="img" className="cursor-pointer relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={image} alt="Profile" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {loader && (
                <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                  <UploadIcon/>
                </div>
              )}
            </label>
            <input
              onChange={add_image}
              type="file"
              className="hidden"
              id="img"
              accept="image/*"
            />
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex min-w-0 flex-1 items-center space-x-2">
              <h1 className="text-2xl font-semibold text-white truncate">
              {userInfo?.name}
              </h1>
              <CheckInCircleIcon className="w-6 h-6 text-[#0070F3]" />
              </div>
        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
        <SettingsDialog />
              </div>
          </div>
        </div>
        <div className='flex flex-col  mt-1 sm:ml-[180px] ml-2'>
                <h3 className='text-2sm font-semibold text-white truncate '>
                {userInfo?.email}
                  </h3>
       </div>
      </div>
    
  
    <div className='mt-6 ml-3 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:space-x-6 sm:pb-1 text-sm tracking-wider leading-6'>
      <div className="flex items-center "><h4 className='mr-1 mb-0 font-semibold text-white text-2md'>Role</h4 > <p className=' text-gray-400'>{userInfo?.role}</p></div>
      <div className="flex items-center "><h4 className='mr-1 mb-0 font-semibold text-white text-2md'>Status</h4 > <p className=' text-gray-400'>{userInfo?.status}</p></div>
    </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-800">
          <div className={`${profileWidth} mt-10`}>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab.name)}
                  className={`${
                    tab.name === activeTab
                      ? 'border-white text-white'
                      : 'border-transparent text-gray-400 cursor-pointer'
                  }
                    whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm font-mono`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className={`${profileWidth} mt-16`}>
        

          <article className="mt-3 max-w-2xl text-sm tracking-wider leading-6 text-white font-mono prose prose-headings:text-white prose-a:text-white">
             {/* Content based on activeTab */}
            <div>
             {
                !userInfo?.shopInfo ? (
                <form onSubmit={add} className="flex flex-col gap-4 bg-background p-6 rounded-md">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="shopName">Shop Name</Label>
                    <Input value={state.shopName} onChange={inputHandle} name="shopName" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="division">Division</Label>
                    <Input value={state.division} onChange={inputHandle} name="division" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="district">District</Label>
                    <Input value={state.district} onChange={inputHandle} name="district" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="sub_district">Sub District</Label>
                    <Input value={state.sub_district} onChange={inputHandle} name="sub_district" required />
                  </div>
                  <Button type="submit" className="w-full " disabled={loader ? true : false}>
                    {loader ? "Updating..." : "Update Info"}
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col gap-3 p-4 bg-gray-800 rounded-md relative">
                  <div className="flex justify-between text-sm">
                    <span>Shop Name:</span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Division:</span>
                    <span>{userInfo.shopInfo?.division}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>District:</span>
                    <span>{userInfo.shopInfo?.district}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sub District:</span>
                    <span>{userInfo.shopInfo?.sub_district}</span>
                  </div>
                </div>
              )}
            </div>

          </article>
       
      </div>

    </div>
  );
}
const tabs = [
  { name: 'Shop Details' },
];