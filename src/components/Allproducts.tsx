"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import {
  Check,
  ChevronDown,
  Edit,
  Eye,
  Grid3X3,
  LayoutGrid,
  LayoutList,
  Plus,
  SearchIcon,
  SlidersHorizontal,
  Trash2,
} from "lucide-react"
import { get_products, delete_product } from "@/store/Reducers/productReducer"
import { ProductDialog } from "@/components/product-dialog"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Pagination } from "@/lib/pagination"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define the product type to match your data structure
export type Product = {
  _id: string
  name: string
  category: string
  brand: string
  price: number
  discount: number
  stock: number
  images: string[]
  createdAt: Date
}

export function ProductList() {
  const dispatch = useDispatch<any>()
  const { products, totalProduct } = useSelector((state: any) => state.product)

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const [parPage, setParPage] = useState(5)
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [sortBy, setSortBy] = useState<string>("newest")

  useEffect(() => {
    const obj = {
      parPage: Number.parseInt(parPage.toString()),
      page: Number.parseInt(currentPage.toString()),
      searchValue,
    }
    dispatch(get_products(obj))
  }, [searchValue, currentPage, parPage, dispatch])

  // Handle editing a product
  const handleEdit = (product: Product) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }

  // Handle deleting a product
  const handleDelete = (product: Product) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  // Handle adding a new product
  const handleAdd = () => {
    setCurrentProduct(null)
    setIsAddDialogOpen(true)
  }

  // Save edited product
  const saveProduct = (updatedProduct: Product) => {
    // This would typically dispatch an update action to Redux
    setIsEditDialogOpen(false)
    setIsAddDialogOpen(false)
  }

  // Confirm delete product
  const confirmDelete = () => {
    if (currentProduct) {
      dispatch(delete_product(currentProduct._id))
      setIsDeleteDialogOpen(false)
    }
  }

  // Get stock status badge
  const getStockBadge = (stock: number) => {
    if (stock <= 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock < 10) {
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          Low Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
          In Stock
        </Badge>
      )
    }
  }

  // Calculate final price after discount
  const getFinalPrice = (price: number, discount: number) => {
    if (discount === 0) return price
    return price - price * (discount / 100)
  }

  return (
    <div className="space-y-6">
      {/* Header with title and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory and listings</p>
        </div>
        <Button
          onClick={handleAdd}
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>
                <Check className="mr-2 h-4 w-4" />
                <span>All Products</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="ml-6">In Stock</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="ml-6">Low Stock</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="ml-6">Out of Stock</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="ml-6">With Discount</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-r-none ${viewMode === "list" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-l-none ${viewMode === "grid" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products display */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="rounded-full bg-muted p-3">
            <Grid3X3 className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No products found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button onClick={handleAdd} variant="outline" className="mt-6">
            <Plus className="mr-2 h-4 w-4" />
            Add your first product
          </Button>
        </div>
      ) : viewMode === "list" ? (
        <div className="rounded-md border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product) => (
                <TableRow key={product._id} className="group">
                  <TableCell>
                    <div className="relative w-[60px] h-[60px] overflow-hidden rounded-md border bg-muted">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-all group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-xs text-muted-foreground">ID: {product._id.substring(0, 8)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      {product.discount > 0 ? (
                        <>
                          <span className="font-medium">
                            ${getFinalPrice(product.price, product.discount).toFixed(2)}
                          </span>
                          <span className="text-xs line-through text-muted-foreground">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStockBadge(product.stock)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(product)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product: Product) => (
            <Card key={product._id} className="group overflow-hidden">
              <div className="relative aspect-square overflow-hidden bg-muted">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-all group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
                )}
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  </div>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    {product.discount > 0 ? (
                      <>
                        <span className="font-bold text-lg">
                          ${getFinalPrice(product.price, product.discount).toFixed(2)}
                        </span>
                        <span className="text-xs line-through text-muted-foreground">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  {getStockBadge(product.stock)}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(product)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-none" onClick={() => handleDelete(product)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalProduct > parPage && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{(currentPage - 1) * parPage + 1}</span> to{" "}
            <span className="font-medium">{Math.min(currentPage * parPage, totalProduct)}</span> of{" "}
            <span className="font-medium">{totalProduct}</span> products
          </div>
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalProduct}
            parPage={parPage}
            showItem={4}
          />
        </div>
      )}

      {/* Edit Product Dialog */}
      {isEditDialogOpen && currentProduct && (
        <ProductDialog
          product={currentProduct}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={saveProduct}
          title="Edit Product"
        />
      )}

      {/* Add Product Dialog */}
      {isAddDialogOpen && (
        <ProductDialog
          product={{
            _id: "",
            name: "",
            category: "",
            brand: "",
            price: 0,
            discount: 0,
            stock: 0,
            images: [],
            createdAt: new Date(),
          }}
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSave={saveProduct}
          title="Add Product"
        />
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && currentProduct && (
        <DeleteConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          productName={currentProduct.name}
        />
      )}
    </div>
  )
}
