"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon } from "lucide-react"

interface SearchProps {
  setParPage: (value: number) => void
  setSearchValue: (value: string) => void
  searchValue: string
}

export function Search({ setParPage, setSearchValue, searchValue }: SearchProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-5">
      <div className="flex-1 relative">
        <Input
          placeholder="Search by product name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <div className="w-full md:w-[180px]">
        <Select onValueChange={(value) => setParPage(Number(value))} defaultValue="5">
          <SelectTrigger>
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="15">15 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

