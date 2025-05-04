"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  DollarSign,
  ShoppingCart,
  ImageIcon,
  X,
  ArrowRight,
  ArrowLeft,
  Upload,
  Check,
  Info,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { get_category } from "@/store/Reducers/categoryReducer"
import { add_product, messageClear } from "@/store/Reducers/productReducer"

interface ProductState {
  name: string
  description: string
  discount: string
  price: string
  brand: string
  stock: string
  city: string
  state: string
  country: string
}

export default function ProductForm({ onCancel }: { onCancel: () => void }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const dispatch = useDispatch<any>()
  const { categorys } = useSelector((state: any) => state.category)
  const { successMessage, errorMessage, loader } = useSelector((state: any) => state.product)
  const { userInfo } = useSelector((state: any) => state.auth)

  useEffect(() => {
    dispatch(get_category({ searchValue: "", parPage: "", page: "" } as any))
  }, [dispatch])

  const [state, setState] = useState<ProductState>({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
    city: "",
    state: "",
    country: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const [category, setCategory] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setImages([...images, ...filesArray])
      setImagePreviews([...imagePreviews, ...filesArray.map((file) => URL.createObjectURL(file))])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files)
      setImages([...images, ...filesArray])
      setImagePreviews([...imagePreviews, ...filesArray.map((file) => URL.createObjectURL(file))])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData: any = new FormData()
    Object.entries(state).forEach(([key, value]) => formData.append(key, value))
    formData.append("categoryId", category)
    formData.append("category", categoryName)
    formData.append("shopName", userInfo?.shopInfo?.shopName || "")
    images.forEach((image) => formData.append("images", image))
    dispatch(add_product(formData))
  }

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
        city: "",
        state: "",
        country: "",
      })
      setCategory("")
      setCategoryName("")
      setImages([])
      setImagePreviews([])
    }
  }, [successMessage, errorMessage, dispatch])

  const progress = (Object.values(state).filter(Boolean).length / Object.keys(state).length) * 100

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Package },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "inventory", label: "Inventory", icon: ShoppingCart },
    { id: "media", label: "Media", icon: ImageIcon },
  ]

  const goToNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id)
    } else {
      handleSubmit(new Event("submit") as any)
    }
  }

  const goToPreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id)
    } else {
      onCancel()
    }
  }

  return (
    <div className="h-full w-full overflow-auto pb-8">
      <form onSubmit={handleSubmit}>
        <Card className="border shadow-sm bg-background">
          <CardHeader className="bg-background border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold ">Add New Product</CardTitle>
                <CardDescription className=" mt-1">
                  Complete all fields to add a product to your store
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-background">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            <Progress value={progress} className="h-2 mt-4" />
          </CardHeader>

          <CardContent className="p-6 pt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-4 mb-8 bg-muted/30">
                {tabs.map((tab, index) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`flex items-center gap-2 py-3 data-[state=active]:bg-background last:data-[state=active]:shadow-sm ${
                      index < tabs.findIndex((t) => t.id === activeTab) ? "text-green-600" : ""
                    }`}
                  >
                    {index < tabs.findIndex((t) => t.id === activeTab) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <tab.icon className="w-4 h-4" />
                    )}
                    <span>{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="space-y-6 bg-background last:rounded-lg border p-8">
                <TabsContent value="basic" className="space-y-6 mt-0">
                  <div className="grid gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="name" className="text-base font-medium">
                          Product Name
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Enter a clear, descriptive name for your product</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="name"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        placeholder="e.g. Premium Wireless Headphones"
                        className="h-12"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="description" className="text-base font-medium">
                          Description
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Provide detailed information about your product</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Textarea
                        id="description"
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                        placeholder="Describe your product in detail..."
                        className="min-h-32 resize-y"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="brand" className="text-base font-medium">
                            Brand
                          </Label>
                        </div>
                        <Input
                          id="brand"
                          name="brand"
                          value={state.brand}
                          onChange={handleChange}
                          placeholder="e.g. Apple, Samsung, Nike"
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="category" className="text-base font-medium">
                            Category
                          </Label>
                        </div>
                        <Select
                          value={category}
                          onValueChange={(value) => {
                            setCategory(value)
                            const selectedCategory = categorys.find((cat: any) => cat._id === value)
                            setCategoryName(selectedCategory ? selectedCategory.name : "")
                          }}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categorys &&
                              categorys.map((cat: any) => (
                                <SelectItem key={cat._id} value={cat._id}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="price" className="text-base font-medium">
                          Price
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Set the regular price of your product</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={state.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          className="h-12 pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="discount" className="text-base font-medium">
                          Discount (%)
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Optional: Set a discount percentage</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="relative">
                        <Input
                          id="discount"
                          name="discount"
                          type="number"
                          value={state.discount}
                          onChange={handleChange}
                          placeholder="0"
                          className="h-12"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</div>
                      </div>
                    </div>
                  </div>

                  {state.price && state.discount ? (
                    <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <Check className="h-5 w-5" />
                        <span className="font-medium">Final price after discount:</span>
                        <span className="font-bold">
                          ${(Number(state.price) - (Number(state.price) * Number(state.discount)) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </TabsContent>

                <TabsContent value="inventory" className="mt-0">
                  <div className="grid gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="stock" className="text-base font-medium">
                          Stock Quantity
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Number of items available for sale</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        value={state.stock}
                        onChange={handleChange}
                        placeholder="0"
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-base font-medium mb-4">Shipping Location</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="city" className="mb-2 block">
                            City
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={state.city}
                            onChange={handleChange}
                            className="h-12"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state" className="mb-2 block">
                            State/Province
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            value={state.state}
                            onChange={handleChange}
                            className="h-12"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="country" className="mb-2 block">
                            Country
                          </Label>
                          <Input
                            id="country"
                            name="country"
                            value={state.country}
                            onChange={handleChange}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="media" className="mt-0">
                  <div className="grid gap-6">
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center ${
                        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Drag & drop product images</h3>
                        <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>
                        <Input
                          id="images"
                          name="images"
                          type="file"
                          multiple
                          onChange={handleImageChange}
                          className="hidden"
                          required={images.length === 0}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("images")?.click()}
                          className="mt-2"
                        >
                          Select Files
                        </Button>
                      </div>
                    </div>

                    {imagePreviews.length > 0 && (
                      <div>
                        <h3 className="text-base font-medium mb-4">Product Images ({imagePreviews.length})</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border">
                              <Image
                                src={preview || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => removeImage(index)}
                                  className="h-8 w-8"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <Badge className="absolute top-2 left-2 bg-black/60">
                                {index === 0 ? "Main" : `Image ${index + 1}`}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>

          <CardFooter className="px-6 py-4 bg-muted/20 border-t flex justify-between">
            <Button type="button" variant="outline" onClick={goToPreviousTab} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {activeTab === "basic" ? "Cancel" : "Previous"}
            </Button>

            <Button
              type="button"
              onClick={goToNextTab}
              className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {activeTab === "media" ? (
                <>
                  Submit
                  <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
