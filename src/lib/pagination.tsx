"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  pageNumber: number
  setPageNumber: (page: number) => void
  totalItem: number
  parPage: number
  showItem: number
}

export function Pagination({ pageNumber, setPageNumber, totalItem, parPage, showItem }: PaginationProps) {
  const totalPage = Math.ceil(totalItem / parPage)

  let startLoop = pageNumber
  let endLoop = startLoop + showItem - 1

  if (endLoop > totalPage) {
    endLoop = totalPage
    startLoop = endLoop - showItem + 1
  }

  if (startLoop < 1) {
    startLoop = 1
  }

  const allPages = []
  for (let i = startLoop; i <= endLoop; i++) {
    allPages.push(i)
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="icon" onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {allPages.map((page) => (
        <Button
          key={page}
          variant={pageNumber === page ? "default" : "outline"}
          size="icon"
          onClick={() => setPageNumber(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber === totalPage}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}

