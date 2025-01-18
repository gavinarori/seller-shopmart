"use client"

import * as React from "react"
import { Plus, Store, History, Settings, ShoppingBag } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { shopData } from "@/lib/dummyData"
import { useState } from "react"

const sidebarItems = [
  { name: "Create Shop", icon: Plus },
  { name: "Your Shops", icon: Store },
  { name: "Shop History", icon: History },
  { name: "Manage Shop", icon: Settings },
]

export function ShopManagementDialog() {
  const [shops, setShops] = React.useState(shopData)
  const [selectedShop, setSelectedShop] = useState<any>(null)
  const [activeSection, setActiveSection] = useState("Your Shops")

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newShop = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      address: formData.get('address') as string,
      contact: formData.get('contact') as string,
      logo: '/placeholder.svg?height=100&width=100',
      rating: 0,
    }
    setShops([...shops, newShop])
    setSelectedShop(null)
    setActiveSection("Your Shops")
  }

  const handleEdit = (shop: React.SetStateAction<null>) => {
    setSelectedShop(shop)
    setActiveSection("Manage Shop")
  }

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const updatedShop = {
      ...selectedShop,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      address: formData.get('address') as string,
      contact: formData.get('contact') as string,
    }
    setShops(shops.map(shop => shop.id === updatedShop.id ? updatedShop : shop))
    setSelectedShop(null)
    setActiveSection("Your Shops")
  }

  const handleDelete = (id: string) => {
    setShops(shops.filter(shop => shop.id !== id))
  }

  const renderContent = () => {
    switch (activeSection) {
      case "Create Shop":
        return (
          <form onSubmit={handleCreate}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Create Shop</Button>
            </div>
          </form>
        )
      case "Your Shops":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shops.map((shop:any) => (
                <TableRow key={shop.id}>
                  <TableCell>{shop.name}</TableCell>
                  <TableCell>{shop.address}</TableCell>
                  <TableCell>{shop.contact}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(shop)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(shop.id)}>
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case "Shop History":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop History</h3>
            <p>This feature is not yet implemented. It would show the history of changes for each shop.</p>
          </div>
        )
      case "Manage Shop":
        return selectedShop ? (
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedShop.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={selectedShop.description}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={selectedShop.address}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  defaultValue={selectedShop.contact}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Update Shop</Button>
            </div>
          </form>
        ) : (
          <p>Please select a shop to manage.</p>
        )
      default:
        return null
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Manage Shops</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0">
        <SidebarProvider>
          <div className="flex h-auto">
            <Sidebar collapsible="none" className="w-[200px] border-r">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {sidebarItems.map((item) => (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            onClick={() => setActiveSection(item.name)}
                            isActive={activeSection === item.name}
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.name}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <div className="flex-1 overflow-auto">
              <DialogHeader className="p-6">
                <DialogTitle>Shop Management</DialogTitle>
                <DialogDescription>
                  Create, edit, delete shops and view their history.
                </DialogDescription>
              </DialogHeader>
              <div className="p-6 pt-0">
                {renderContent()}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

