"use client"

import type React from "react"

import { CheckInCircleIcon, EditIcon } from "@/icons"
import { useState, useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"
import {
  profile_image_upload,
  messageClear,
  profile_info_add,
 
} from "@/store/Reducers/authReducer"
import { SettingsDialog } from "@/components/settings-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export const profileWidth = "max-w-5xl  mx-auto px-4 sm:px-6 lg:px-8"


export default function Profile() {
  const [activeTab, setActiveTab] = useState("Shop Details")
  const [dynamicGradient, setDynamicGradient] = useState("linear-gradient(to right, #4ADE80, #3B82F6, #9333EA)")
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [state, setState] = useState<{
    division: string
    district: string
    shopName: string
    sub_district: string
  }>({
    division: "",
    district: "",
    shopName: "",
    sub_district: "",
  })

  const [passwordState, setPasswordState] = useState<{
    email: string
    old_password: string
    new_password: string
  }>({
    email: "",
    old_password: "",
    new_password: "",
  })

  const dispatch = useDispatch<any>()
  const { userInfo, loader, successMessage } = useSelector((state: any) => state.auth)

  const extractColors = (imageUrl: string) => {
    if (!imageUrl) return;
  
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
  
    img.onload = () => {
      if (!canvasRef.current) {
        canvasRef.current = document.createElement("canvas");
      }
  
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
  
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
  
      ctx.drawImage(img, 0, 0);
  
      const topLeft = ctx.getImageData(0, 0, 1, 1).data;
      const topRight = ctx.getImageData(img.width - 1, 0, 1, 1).data;
      const bottomLeft = ctx.getImageData(0, img.height - 1, 1, 1).data;
  
      const color1 = `rgb(${topLeft[0]}, ${topLeft[1]}, ${topLeft[2]})`;
      const color2 = `rgb(${topRight[0]}, ${topRight[1]}, ${topRight[2]})`;
      const color3 = `rgb(${bottomLeft[0]}, ${bottomLeft[1]}, ${bottomLeft[2]})`;
  
      // Store gradient as a string
      setDynamicGradient(`linear-gradient(to right, ${color1}, ${color2}, ${color3})`);
    };
  
    img.onerror = () => {
      setDynamicGradient("linear-gradient(to right, #4ADE80, #3B82F6, #9333EA)");
    };
  };
  
  

  useEffect(() => {
    if (userInfo?.image) {
      extractColors(userInfo.image)
    }
  }, [userInfo?.image])


  const add_image = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      dispatch(profile_image_upload(formData))
    }
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
    }
  }, [successMessage, dispatch])

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(profile_info_add(state))
  }

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const passwordInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState({
      ...passwordState,
      [e.target.name]: e.target.value,
    })
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Password change functionality will be implemented")
  }

  return (
    <div className="min-h-screen pb-20">
      <div>
      <div className="h-48 w-full lg:h-64 rounded-md" style={{ background: dynamicGradient }} />
        <div className={`${profileWidth} sm:-mt-16  sm:flex sm:items-end sm:space-x-5`}>
          <label htmlFor="img" className="cursor-pointer relative">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userInfo?.image} alt="Profile" />
              <AvatarFallback>{userInfo?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            {loader && (
              <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20 rounded-full">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              </div>
            )}
          </label>
          <input onChange={add_image} type="file" className="hidden" id="img" accept="image/*" />
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex min-w-0 flex-1 items-center space-x-2">
              <h1 className="text-2xl font-semibold text-white truncate">{userInfo?.name}</h1>
              <CheckInCircleIcon className="w-6 h-6 text-[#0070F3]" />
            </div>

          </div>
        </div>
        <div className="flex flex-col mt-1 sm:ml-[180px] ml-2">
          <h3 className="text-2sm font-semibold text-white truncate">{userInfo?.email}</h3>
        </div>
      </div>

      <div className="mt-6 ml-3 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:space-x-6 sm:pb-1 text-sm tracking-wider leading-6">
        <div className="flex items-center">
          <h4 className="mr-1 mb-0 font-semibold  text-2md">Role</h4>{" "}
          <p className="text-gray-400">{userInfo?.role}</p>
        </div>
        <div className="flex items-center">
          <h4 className="mr-1 mb-0 font-semibold  text-2md">Status</h4>{" "}
          <p className="text-gray-400">{userInfo?.status}</p>
        </div>
        <div className="flex items-center">
          <h4 className="mr-1 mb-0 font-semibold text-white text-2md">Payment Account</h4>
          {userInfo?.payment === "active" ? (
            <span className="bg-red-500 text-white text-xs font-normal px-2 py-0.5 rounded">{userInfo.payment}</span>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              
            >
              Click to activate
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={`${profileWidth} mt-10`}>
        <Tabs defaultValue="shop-details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="shop-details">Shop Details</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>

          <TabsContent value="shop-details" className="mt-6">
            {!userInfo?.shopInfo ? (
              <Card>
                <CardHeader>
                  <CardTitle>Shop Information</CardTitle>
                  <CardDescription>Add your shop details to complete your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={add} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="shopName">Shop Name</Label>
                      <Input id="shopName" value={state.shopName} onChange={inputHandle} name="shopName" required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="division">Division</Label>
                      <Input id="division" value={state.division} onChange={inputHandle} name="division" required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="district">District</Label>
                      <Input id="district" value={state.district} onChange={inputHandle} name="district" required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="sub_district">Sub District</Label>
                      <Input
                        id="sub_district"
                        value={state.sub_district}
                        onChange={inputHandle}
                        name="sub_district"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full mt-2" disabled={loader}>
                      {loader ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Info"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    Shop Information
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <EditIcon className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-medium">Shop Name</span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-medium">Division</span>
                    <span>{userInfo.shopInfo?.division}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="font-medium">District</span>
                    <span>{userInfo.shopInfo?.district}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Sub District</span>
                    <span>{userInfo.shopInfo?.sub_district}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="password" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={passwordState.email}
                      onChange={passwordInputHandle}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="old_password">Old Password</Label>
                    <Input
                      id="old_password"
                      type="password"
                      name="old_password"
                      value={passwordState.old_password}
                      onChange={passwordInputHandle}
                      placeholder="Your current password"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input
                      id="new_password"
                      type="password"
                      name="new_password"
                      value={passwordState.new_password}
                      onChange={passwordInputHandle}
                      placeholder="Your new password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full mt-2">
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

