'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, DollarSign, ShoppingCart, ImageIcon, X } from 'lucide-react'

export default function ProductForm({ onCancel }: { onCancel: () => void }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    discount: '',
    brand: '',
    city: '',
    state: '',
    country: '',
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [shopName, setShopName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages(fileArray)
      
      const previewArray = fileArray.map(file => URL.createObjectURL(file))
      setImagePreviews(previewArray)
    }
  }, [])

  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    Object.entries(state).forEach(([key, value]) => {
      formData.append(key, value)
    })

    formData.append('shopName', shopName)

    images.forEach((image) => {
      formData.append('images', image)
    })

  }

  const progress = (Object.values(state).filter(Boolean).length / Object.keys(state).length) * 100

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <Progress value={progress} className="w-full mt-2" />
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic"><Package className="w-4 h-4 mr-2" />Basic</TabsTrigger>
              <TabsTrigger value="pricing"><DollarSign className="w-4 h-4 mr-2" />Pricing</TabsTrigger>
              <TabsTrigger value="inventory"><ShoppingCart className="w-4 h-4 mr-2" />Inventory</TabsTrigger>
              <TabsTrigger value="media"><ImageIcon className="w-4 h-4 mr-2" />Media</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={state.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={state.description} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" name="brand" value={state.brand} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={state.category} onChange={handleChange} required />
              </div>
            </TabsContent>
            <TabsContent value="pricing" className="space-y-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" value={state.price} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="discount">Discount</Label>
                <Input id="discount" name="discount" type="number" value={state.discount} onChange={handleChange} />
              </div>
            </TabsContent>
            <TabsContent value="inventory" className="space-y-4">
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" name="stock" type="number" value={state.stock} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="shopName">Shop Name</Label>
                <Input id="shopName" name="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={state.city} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={state.state} onChange={handleChange} required />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={state.country} onChange={handleChange} required />
              </div>
            </TabsContent>
            <TabsContent value="media" className="space-y-4">
              <div>
                <Label htmlFor="images">Product Images</Label>
                <Input id="images" name="images" type="file" multiple onChange={handleImageChange} required />
              </div>
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <Image 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        width={200} 
                        height={200} 
                        className="rounded-lg object-cover w-full h-40"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              const tabs = ["basic", "pricing", "inventory", "media"]
              const currentIndex = tabs.indexOf(activeTab)
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1])
              }
            }}
          >
            Previous
          </Button>
          <Button 
            type="button"
            onClick={() => {
              const tabs = ["basic", "pricing", "inventory", "media"]
              const currentIndex = tabs.indexOf(activeTab)
              if (currentIndex < tabs.length - 1) {
                setActiveTab(tabs[currentIndex + 1])
              } else {
                handleSubmit(new Event('submit') as any)
              }
            }}
          >
            {activeTab === "media" ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

