import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { categoryAdd, messageClear, get_category } from "@/store/Reducers/categoryReducer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CategoryForm({ onCancel }: { onCancel: () => void }) {
  const dispatch = useDispatch<any>();
  const { loader, successMessage, errorMessage, categorys } = useSelector((state: any) => state.category);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [parPage, setParPage] = useState<number>(5);
  const [imageShow, setImageShow] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<any>({
    name: "",
    image: "",
  });

  useEffect(() => {
    dispatch(get_category({ parPage, page: currentPage, searchValue }));
  }, [dispatch, searchValue, currentPage, parPage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({ name: "", image: "" });
      setImageShow("");
    }
  }, [successMessage, errorMessage, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const imageHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageShow(URL.createObjectURL(file));
      setState((prev: any) => ({ ...prev, image: file }));
    }
  };

  const add_category = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name || !state.image) {
      toast.error("Please provide both category name and image.");
      return;
    }
    dispatch(categoryAdd(state));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  const handleSelectCategory = (categoryName: string) => {
    setSearchValue(categoryName);
    setShowDropdown(false);
  };

  // Filter categories based on search input
  const searchResults = categorys?.filter((category: any) =>
    category.name.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      {/* Category Overview */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <form className="relative pt-4">
            <Input type="text" placeholder="Search category..." value={searchValue} onChange={handleSearchChange} />
            {showDropdown && (
              <div ref={dropdownRef} className="absolute top-full left-0 w-full rounded-md border bg-background shadow-lg z-50">
                {searchResults.length > 0 ? (
                  <ul className="max-h-64 overflow-auto p-2">
                    {searchResults.map((category: any) => (
                      <li key={category._id}>
                        <button
                          onClick={() => handleSelectCategory(category.name)}
                          className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-accent"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={category.image} alt={category.name} />
                              <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">{category.name}</div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-sm ">No categories found</div>
                )}
              </div>
            )}
          </form>
        </CardHeader>

        <CardContent>
          <div className="space-y-8">
            {categorys.map((category: any) => (
              <div key={category._id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={category.image} alt={category.name} />
                  <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{category.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(category.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Category */}
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
          <CardDescription>Create a new product category here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={add_category}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" type="text" name="name" placeholder="Category name" value={state.name} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="picture">Select Image</Label>
                <Input id="picture" type="file" accept="image/*" onChange={imageHandle} required />
                {imageShow && <img src={imageShow} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />}
              </div>

              <Button type="submit" className="w-full" disabled={loader}>
                {loader ? "Adding..." : "Add Category"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
