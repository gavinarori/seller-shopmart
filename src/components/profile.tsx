"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import {
  BadgeCheck,
  Building2,
  CreditCard,
  Edit,
  Globe,
  Loader2,
  Lock,
  MapPin,
  ShoppingBag,
  Star,
  Store,
  Truck,
  Upload,
  User,
} from "lucide-react"

import { profile_image_upload, messageClear, profile_info_add } from "@/store/Reducers/authReducer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export const profileWidth = "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"

export default function SellerProfile() {
  const [dynamicGradient, setDynamicGradient] = useState("linear-gradient(to right, #4F46E5, #7C3AED, #9333EA)")
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  // Mock data for store statistics
  const storeStats = {
    totalSales: 12547,
    totalOrders: 328,
    totalProducts: 64,
    rating: 4.8,
    completionRate: 92,
  }

  const extractColors = (imageUrl: string) => {
    if (!imageUrl) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      if (!canvasRef.current) {
        canvasRef.current = document.createElement("canvas")
      }

      const canvas = canvasRef.current
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.drawImage(img, 0, 0)

      const topLeft = ctx.getImageData(0, 0, 1, 1).data
      const topRight = ctx.getImageData(img.width - 1, 0, 1, 1).data
      const bottomLeft = ctx.getImageData(0, img.height - 1, 1, 1).data

      const color1 = `rgb(${topLeft[0]}, ${topLeft[1]}, ${topLeft[2]})`
      const color2 = `rgb(${topRight[0]}, ${topRight[1]}, ${topRight[2]})`
      const color3 = `rgb(${bottomLeft[0]}, ${bottomLeft[1]}, ${bottomLeft[2]})`

      setDynamicGradient(`linear-gradient(to right, ${color1}, ${color2}, ${color3})`)
    }

    img.onerror = () => {
      setDynamicGradient("linear-gradient(to right, #4F46E5, #7C3AED, #9333EA)")
    }
  }

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

  const triggerFileInput = () => {
    fileInputRef.current?.click()
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
      {/* Hero section with dynamic gradient */}
      <div className="relative">
        <div className="h-64 w-full rounded-b-xl bg-cover bg-center" style={{ background: dynamicGradient }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-b-xl" />
        </div>

        {/* Profile header */}
        <div className={`${profileWidth} relative z-10`}>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20">
            {/* Profile image */}
            <div className="relative group">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                  <AvatarImage src={userInfo?.image || "/placeholder.svg"} alt={userInfo?.name} />
                  <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                    {userInfo?.name?.charAt(0) || "S"}
                  </AvatarFallback>
                </Avatar>
                {loader && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                )}
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Upload className="h-4 w-4" />
                </button>
              </div>
              <input ref={fileInputRef} onChange={add_image} type="file" className="hidden" id="img" accept="image/*" />
            </div>

            {/* Profile info */}
            <div className="flex-1 pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-white">{userInfo?.name || "Store Owner"}</h1>
                <Badge className="bg-primary/20 text-primary border-primary hover:bg-primary/30">
                  <BadgeCheck className="h-4 w-4 mr-1" />
                  Verified Seller
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Store className="h-4 w-4" />
                  <span>{userInfo?.shopInfo?.shopName || "Your Store"}</span>
                </div>
                {userInfo?.shopInfo?.district && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {userInfo.shopInfo.district}, {userInfo.shopInfo.division}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{userInfo?.email}</span>
                </div>
              </div>
            </div>

            {/* Account status */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">Account Status:</span>
                <Badge
                  variant={userInfo?.status === "active" ? "default" : "outline"}
                  className={
                    userInfo?.status === "active"
                      ? "bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500"
                      : "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-amber-500"
                  }
                >
                  {userInfo?.status || "Pending"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">Payment Account:</span>
                {userInfo?.payment === "active" ? (
                  <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500">
                    Active
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                  >
                    <CreditCard className="h-4 w-4 mr-1" />
                    Activate Payment
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store statistics */}
      <div className={`${profileWidth} mt-8`}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-background border-indigo-100 dark:border-indigo-900/30">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
              <p className="text-2xl font-bold">${storeStats.totalSales.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Sales</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-background border-purple-100 dark:border-purple-900/30">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Truck className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-2xl font-bold">{storeStats.totalOrders}</p>
              <p className="text-xs text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/20 dark:to-background border-violet-100 dark:border-violet-900/30">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Building2 className="h-8 w-8 text-violet-600 dark:text-violet-400 mb-2" />
              <p className="text-2xl font-bold">{storeStats.totalProducts}</p>
              <p className="text-xs text-muted-foreground">Products</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-fuchsia-50 to-white dark:from-fuchsia-950/20 dark:to-background border-fuchsia-100 dark:border-fuchsia-900/30">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Star className="h-8 w-8 text-fuchsia-600 dark:text-fuchsia-400 mb-2" />
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold">{storeStats.rating}</p>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground">Store Rating</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-950/20 dark:to-background border-pink-100 dark:border-pink-900/30">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Globe className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-2" />
              <div className="w-full flex flex-col items-center">
                <div className="flex justify-between w-full text-sm">
                  <span className="font-medium">{storeStats.completionRate}%</span>
                  <span className="text-muted-foreground">Completion</span>
                </div>
                <Progress value={storeStats.completionRate} className="h-2 mt-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main content */}
      <div className={`${profileWidth} mt-8`}>
        <Tabs defaultValue="shop-details" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="shop-details" className="text-base py-3">
              <Store className="h-4 w-4 mr-2" />
              Shop Details
            </TabsTrigger>
            <TabsTrigger value="password" className="text-base py-3">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shop-details">
            {!userInfo?.shopInfo ? (
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Complete Your Store Profile
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Add your shop details to enhance your seller profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={add} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="shopName" className="text-base">
                          Store Name
                        </Label>
                        <Input
                          id="shopName"
                          value={state.shopName}
                          onChange={inputHandle}
                          name="shopName"
                          placeholder="Your store name"
                          className="h-11"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="division" className="text-base">
                          Division/State
                        </Label>
                        <Input
                          id="division"
                          value={state.division}
                          onChange={inputHandle}
                          name="division"
                          placeholder="Your division or state"
                          className="h-11"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district" className="text-base">
                          District/City
                        </Label>
                        <Input
                          id="district"
                          value={state.district}
                          onChange={inputHandle}
                          name="district"
                          placeholder="Your district or city"
                          className="h-11"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sub_district" className="text-base">
                          Sub District/Area
                        </Label>
                        <Input
                          id="sub_district"
                          value={state.sub_district}
                          onChange={inputHandle}
                          name="sub_district"
                          placeholder="Your sub district or area"
                          className="h-11"
                          required
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                        disabled={loader}
                      >
                        {loader ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Complete Store Profile"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Store className="h-5 w-5" />
                        Store Information
                      </CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-white/80">
                      Your store details and location information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Store Name</p>
                          <p className="text-lg font-medium">{userInfo.shopInfo?.shopName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Store Owner</p>
                          <p className="text-lg font-medium">{userInfo?.name}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Store Address</p>
                        <p className="text-base">
                          {userInfo.shopInfo?.sub_district}, {userInfo.shopInfo?.district},{" "}
                          {userInfo.shopInfo?.division}
                        </p>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Contact Email</p>
                          <p className="text-base">{userInfo?.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Account Type</p>
                          <Badge variant="outline" className="text-base font-normal h-auto py-1">
                            {userInfo?.role === "seller" ? "Seller Account" : userInfo?.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 flex justify-between">
                    <p className="text-sm text-muted-foreground">Store created on {new Date().toLocaleDateString()}</p>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    >
                      Active
                    </Badge>
                  </CardFooter>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Store Performance
                    </CardTitle>
                    <CardDescription className="text-white/80">Your store's performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Order Completion</p>
                          <p className="text-sm font-medium">{storeStats.completionRate}%</p>
                        </div>
                        <Progress value={storeStats.completionRate} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Customer Satisfaction</p>
                          <div className="flex items-center">
                            <p className="text-sm font-medium mr-1">{storeStats.rating}</p>
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <Progress value={storeStats.rating * 20} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Profile Completion</p>
                          <p className="text-sm font-medium">100%</p>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <Separator />
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          className="w-full border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20"
                        >
                          View Detailed Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="password">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-white/80">
                  Update your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={passwordState.email}
                        onChange={passwordInputHandle}
                        placeholder="Your email address"
                        className="h-11"
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="old_password" className="text-base">
                        Current Password
                      </Label>
                      <Input
                        id="old_password"
                        type="password"
                        name="old_password"
                        value={passwordState.old_password}
                        onChange={passwordInputHandle}
                        placeholder="Your current password"
                        className="h-11"
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="new_password" className="text-base">
                        New Password
                      </Label>
                      <Input
                        id="new_password"
                        type="password"
                        name="new_password"
                        value={passwordState.new_password}
                        onChange={passwordInputHandle}
                        placeholder="Your new password"
                        className="h-11"
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Password must be at least 8 characters and include a number and special character
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
