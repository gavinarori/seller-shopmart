'use client'

import { useState, useEffect, } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, DollarSign, ShoppingCart, ImageIcon, X } from 'lucide-react'
import { get_category } from '@/store/Reducers/categoryReducer'
import { add_product, messageClear } from '@/store/Reducers/productReducer'



interface ProductState {
  name: string;
  description: string;
  discount: string;
  price: string;
  brand: string;
  stock: string;
  city: string;
  state: string;
  country: string;
}

export default function ProductForm({ onCancel }: { onCancel: () => void }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const dispatch = useDispatch<any>();
  const { categorys } = useSelector((state: any) => state.category);
  const { successMessage, errorMessage, loader } = useSelector((state: any) => state.product);
  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(get_category({ searchValue: '', parPage: '', page: '' } as any));
  }, [dispatch]);

  const [state, setState] = useState<ProductState>({
    name: '',
    description: '',
    discount: '',
    price: '',
    brand: '',
    stock: '',
    city: '',
    state: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [category, setCategory] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages([...images, ...filesArray]);
      setImagePreviews([...imagePreviews, ...filesArray.map(file => URL.createObjectURL(file))]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData:any = new FormData();
    Object.entries(state).forEach(([key, value]) => formData.append(key, value));
    formData.append('category', category);
    formData.append('shopName', userInfo?.shopInfo?.shopName || '');
    images.forEach(image => formData.append('images', image));
    dispatch(add_product(formData));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({ name: '', description: '', discount: '', price: '', brand: '', stock: '', city: '', state: '', country: '' });
      setCategory('');
      setImages([]);
      setImagePreviews([]);
    }
  }, [successMessage, errorMessage, dispatch]);

  const progress = (Object.values(state).filter(Boolean).length / Object.keys(state).length) * 100

  return (
    <div className="h-full w-full overflow-auto pb-8">
    <form onSubmit={handleSubmit}>
      <Card className="border-none bg-background shadow-none">
        <CardHeader className="px-0">
          <CardTitle>Add New Product</CardTitle>
          <Progress value={progress} className="w-full mt-2" />
        </CardHeader>
        <CardContent className="px-0 pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-6">
              <TabsTrigger value="basic"><Package className="w-4 h-4 mr-2" />Basic</TabsTrigger>
              <TabsTrigger value="pricing"><DollarSign className="w-4 h-4 mr-2" />Pricing</TabsTrigger>
              <TabsTrigger value="inventory"><ShoppingCart className="w-4 h-4 mr-2" />Inventory</TabsTrigger>
              <TabsTrigger value="media"><ImageIcon className="w-4 h-4 mr-2" />Media</TabsTrigger>
            </TabsList>
            <div className="space-y-6 bg-card rounded-lg border p-6">
              <TabsContent value="basic" className="space-y-4 mt-0">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={state.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={state.description} onChange={handleChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brand">Brand</Label>
                      <Input id="brand" name="brand" value={state.brand} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select 
  id="category" 
  name="category" 
  value={category} 
  onChange={(e) => setCategory(e.target.value)} 
  required
  className="w-full p-2 border rounded-md"
>
  <option value="">Select a category</option>
  {categorys && categorys.map((cat: any) => (
    <option key={cat._id} value={cat._id}>{cat.name}</option>
  ))}
</select>

                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pricing" className="space-y-4 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" value={state.price} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="discount">Discount</Label>
                    <Input id="discount" name="discount" type="number" value={state.discount} onChange={handleChange} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="inventory" className="mt-0">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stock">Stock</Label>
                      <Input id="stock" name="stock" type="number" value={state.stock} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="shopName">Shop Name</Label>
                      <Input id="shopName" name="shopName" value={userInfo?.shopInfo?.shopName || ''} disabled />

                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" value={state.city} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" value={state.state} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" name="country" value={state.country} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="media" className="mt-0">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="images">Product Images</Label>
                    <Input id="images" name="images" type="file" multiple onChange={handleImageChange} required />
                  </div>
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-square">
                          <Image 
                            src={preview} 
                            alt={`Preview ${index + 1}`} 
                            fill
                            className="rounded-lg object-cover"
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
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="px-0 flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              const tabs = ["basic", "pricing", "inventory", "media"]
              const currentIndex = tabs.indexOf(activeTab)
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1])
              } else {
                onCancel()
              }
            }}
          >
            {activeTab === "basic" ? "Cancel" : "Previous"}
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
    </div>
     
  )
}

