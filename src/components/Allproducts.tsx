"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash2, Plus, Flag } from "lucide-react"
import { ProductDialog } from "@/components/product-dialog"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Search } from "@/lib/Search"
import { Pagination } from "@/lib/pagination"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { get_products, delete_product } from "@/store/Reducers/productReducer"

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

  useEffect(() => {
    const obj = {
      parPage: Number.parseInt(parPage.toString()),
      page: Number.parseInt(currentPage.toString()),
      searchValue,
    }
    dispatch(get_products(obj))
  }, [searchValue, currentPage, parPage, dispatch])

  console.log(get_products)
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
    // For now, we'll just close the dialog
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center h-24 text-muted-foreground">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              products.map((product: any, i: any) => (
                <TableRow key={product._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    {product.images && product.images.length > 0 ? (
                      <div className="w-[45px] h-[45px] relative">
                        <Image
                          src={product.images.length > 0 ? product.images[0].url : "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="w-[45px] h-[45px] bg-muted rounded-md flex items-center justify-center">
                        No img
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.name.length > 16 ? `${product.name.slice(0, 16)}...` : product.name}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.discount === 0 ? (
                      <span className="text-muted-foreground">no discount</span>
                    ) : (
                      <span>${product.discount}%</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Flag className="h-4 w-4" />
                        <span className="sr-only">Banner</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(product)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalProduct > parPage && (
        <div className="w-full flex justify-end mt-4">
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
