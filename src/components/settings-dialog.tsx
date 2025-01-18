"use client"

import * as React from "react"
import { Plus, Store, History, Settings, ShoppingBag, X } from 'lucide-react'

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
import { ScrollArea } from "@/components/ui/scroll-area"

import { shopData } from "../lib/dummyData"

const sidebarItems = [
  { name: "Create Shop", icon: Plus },
  { name: "Your Shops", icon: Store },
  { name: "Shop History", icon: History },
  { name: "Manage Shop", icon: Settings },
]

export function ShopManagementDialog() {
  const [shops, setShops] = React.useState(shopData)
  const [selectedShop, setSelectedShop] = React.useState<any>(null)
  const [activeSection, setActiveSection] = React.useState("Your Shops")
  const [isOpen, setIsOpen] = React.useState(false)

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

  const handleEdit = (shop:any) => {
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
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" name="contact" required />
            </div>
            <Button type="submit" className="w-full">Create Shop</Button>
          </form>
        )
      case "Your Shops":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Address</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell>{shop.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{shop.address}</TableCell>
                  <TableCell className="hidden md:table-cell">{shop.contact}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(shop)}>
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(shop.id)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case "Shop History":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop History</h3>
            <p className="text-muted-foreground">This feature is not yet implemented. It would show the history of changes for each shop.</p>
          </div>
        )
      case "Manage Shop":
        return selectedShop ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={selectedShop.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={selectedShop.description} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" defaultValue={selectedShop.address} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" name="contact" defaultValue={selectedShop.contact} required />
            </div>
            <Button type="submit" className="w-full">Update Shop</Button>
          </form>
        ) : (
          <p className="text-muted-foreground">Please select a shop to manage.</p>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Manage Shops</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] h-[90vh] p-0">
        <SidebarProvider>
          <div className="flex h-[90%]">
            <Sidebar collapsible="none" className="w-[200px] border-r hidden md:block">
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
            <div className="flex-1 overflow-hidden flex flex-col">
              <DialogHeader className="p-6">
                <div className="flex items-center justify-between">
                  <DialogTitle>{activeSection}</DialogTitle>
                  <div className="md:hidden">
                    <select
                      value={activeSection}
                      onChange={(e) => setActiveSection(e.target.value)}
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      {sidebarItems.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <DialogDescription>
                  Manage your shops efficiently
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="flex-1 p-6 pt-0">
                {renderContent()}
              </ScrollArea>
            </div>
          </div>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

