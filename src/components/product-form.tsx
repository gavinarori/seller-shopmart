'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    brand: '',
    price: '',
    stock: '',
    lowStockThreshold: '10',
    discount: '0',
    description: '',
    shopName: '',
    city: '',
    state: '',
    country: '',
    status: 'active',
  })

  const [suppliers, setSuppliers] = useState([{ name: '', contact: '', address: '' }])
  const [specifications, setSpecifications] = useState([{ key: '', value: '' }])
  const [images, setImages] = useState([{ url: '', alt: '' }])
  const [tags, setTags] = useState([''])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSupplierChange = (index: number, field: string, value: string) => {
    const newSuppliers:any = [...suppliers]
    newSuppliers[index][field] = value
    setSuppliers(newSuppliers)
  }

  const handleSpecificationChange = (index: number, field: string, value: string) => {
    const newSpecifications:any = [...specifications]
    newSpecifications[index][field] = value
    setSpecifications(newSpecifications)
  }

  const handleImageChange = (index: number, field: string, value: string) => {
    const newImages:any = [...images]
    newImages[index][field] = value
    setImages(newImages)
  }

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  const addField = (field: 'supplier' | 'specification' | 'image' | 'tag') => {
    switch (field) {
      case 'supplier':
        setSuppliers([...suppliers, { name: '', contact: '', address: '' }])
        break
      case 'specification':
        setSpecifications([...specifications, { key: '', value: '' }])
        break
      case 'image':
        setImages([...images, { url: '', alt: '' }])
        break
      case 'tag':
        setTags([...tags, ''])
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    const productData = {
      ...formData,
      suppliers,
      specifications: Object.fromEntries(specifications.map(spec => [spec.key, spec.value])),
      images,
      tags: tags.filter(tag => tag !== ''),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      lowStockThreshold: parseInt(formData.lowStockThreshold),
      discount: parseFloat(formData.discount),
    }
    console.log('Submitting product data:', productData)
    // Add your API call here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input id="brand" name="brand" value={formData.brand} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" value={formData.category} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="subCategory">Sub-Category</Label>
            <Input id="subCategory" name="subCategory" value={formData.subCategory} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Pricing and Stock</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
            <Input id="lowStockThreshold" name="lowStockThreshold" type="number" value={formData.lowStockThreshold} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="discount">Discount (%)</Label>
            <Input id="discount" name="discount" type="number" value={formData.discount} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Description</h2>
        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Specifications</h2>
        {specifications.map((spec, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <Input 
              placeholder="Key" 
              value={spec.key} 
              onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)} 
            />
            <Input 
              placeholder="Value" 
              value={spec.value} 
              onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)} 
            />
          </div>
        ))}
        <Button type="button" onClick={() => addField('specification')}>Add Specification</Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Suppliers</h2>
        {suppliers.map((supplier, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <Input 
              placeholder="Name" 
              value={supplier.name} 
              onChange={(e) => handleSupplierChange(index, 'name', e.target.value)} 
            />
            <Input 
              placeholder="Contact" 
              value={supplier.contact} 
              onChange={(e) => handleSupplierChange(index, 'contact', e.target.value)} 
            />
            <Input 
              placeholder="Address" 
              value={supplier.address} 
              onChange={(e) => handleSupplierChange(index, 'address', e.target.value)} 
            />
          </div>
        ))}
        <Button type="button" onClick={() => addField('supplier')}>Add Supplier</Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Images</h2>
        {images.map((image, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <Input 
              placeholder="URL" 
              value={image.url} 
              onChange={(e) => handleImageChange(index, 'url', e.target.value)} 
            />
            <Input 
              placeholder="Alt Text" 
              value={image.alt} 
              onChange={(e) => handleImageChange(index, 'alt', e.target.value)} 
            />
          </div>
        ))}
        <Button type="button" onClick={() => addField('image')}>Add Image</Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Shop Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shopName">Shop Name</Label>
            <Input id="shopName" name="shopName" value={formData.shopName} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Tags</h2>
        {tags.map((tag, index) => (
          <Input 
            key={index}
            placeholder="Tag" 
            value={tag} 
            onChange={(e) => handleTagChange(index, e.target.value)} 
          />
        ))}
        <Button type="button" onClick={() => addField('tag')}>Add Tag</Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Status</h2>
        <Select name="status" onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">Create Product</Button>
    </form>
  )
}

