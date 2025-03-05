"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import { get_category } from "@/store/Reducers/categoryReducer"
import { update_product } from "@/store/Reducers/productReducer"
import Image from "next/image"
import { X } from "lucide-react"

export type Product = {
  _id: string
  name: string
  description: string
  category: string
  brand: string
  price: number
  discount: number
  stock: number
  images: string[]
  location?: {
    city: string
    state: string
    country: string
  }
}

interface ProductDialogProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
  title: string
}

export function ProductDialog({ product, isOpen, onClose, onSave, title }: any) {
  const dispatch = useDispatch<any>()
  const { categorys = [] } = useSelector((state:any) => state.category)

  const [formData, setFormData] = useState<Product>({
    ...product,
    location: product.location || { city: "", state: "", country: "" },
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imageShow, setImageShow] = useState<string[]>(product.images?.map((img:any) => img.url) || [])

  const [newImages, setNewImages] = useState<File[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [filteredCategories, setFilteredCategories] = useState(categorys)

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(get_category({ searchValue: "", parPage: "", page: "" } as any))
  }, [dispatch])

  // Update filtered categories when search value changes
  useEffect(() => {
    if (categorys.length > 0) {
      if (searchValue) {
        const filtered = categorys.filter((c:any) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
        setFilteredCategories(filtered)
      } else {
        setFilteredCategories(categorys)
      }
    }
  }, [searchValue, categorys])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "price" || name === "stock" || name === "discount") {
      setFormData({
        ...formData,
        [name]: Number.parseFloat(value) || 0,
      })
    } else if (name === "city" || name === "state" || name === "country") {
      setFormData({
        ...formData,
        location: {
          ...formData.location!,
          [name]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleCategorySelect = (category: string) => {
    setFormData({
      ...formData,
      category,
    })
    setShowCategoryDropdown(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // For preview
      const newImageUrls = Array.from(files).map((file) => URL.createObjectURL(file))
      setImageShow([...imageShow, ...newImageUrls])

      // Store files for upload
      setNewImages([...newImages, ...Array.from(files)])
    }
  }

  const removeImage = (index: number) => {
    const updatedImages = [...imageShow]
    updatedImages.splice(index, 1)
    setImageShow(updatedImages)

    // If it's a new image, also remove from newImages
    if (index >= product.images.length) {
      const newIndex = index - product.images.length
      const updatedNewImages = [...newImages]
      updatedNewImages.splice(newIndex, 1)
      setNewImages(updatedNewImages)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required"
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required"
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0"
    }

    if (formData.stock < 0) {
      newErrors.stock = "Stock cannot be negative"
    }

    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = "Discount must be between 0 and 100"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real implementation, you would handle image uploads here
      // and update the product with new image URLs

      // For existing product
      if (formData._id) {
        dispatch(
          update_product({
            ...formData,
            productId: formData._id,
          } as any),
        )
      }

      onSave(formData)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={errors.brand ? "border-destructive" : ""}
                />
                {errors.brand && <p className="text-sm text-destructive">{errors.brand}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className={errors.price ? "border-destructive" : ""}
                />
                {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount %</Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleChange}
                  className={errors.discount ? "border-destructive" : ""}
                />
                {errors.discount && <p className="text-sm text-destructive">{errors.discount}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  className={errors.stock ? "border-destructive" : ""}
                />
                {errors.stock && <p className="text-sm text-destructive">{errors.stock}</p>}
              </div>
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="category">Category</Label>
              <div className="relative">
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  readOnly
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className={`cursor-pointer ${errors.category ? "border-destructive" : ""}`}
                />
                {showCategoryDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                    <div className="p-2">
                      <Input
                        placeholder="Search categories..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </div>
                    <div className="max-h-[200px] overflow-y-auto">
                      {filteredCategories.map((category :any, index :any) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-muted cursor-pointer"
                          onClick={() => handleCategorySelect(category.name)}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.location?.city} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={formData.location?.state} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={formData.location?.country} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageShow.map((img, i) => (
                  <div key={i} className="relative h-[120px] border rounded-md overflow-hidden group">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Product image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <label className="border border-dashed rounded-md flex items-center justify-center h-[120px] cursor-pointer hover:bg-muted/50 transition-colors">
                  <span className="text-muted-foreground">+ Add Image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

