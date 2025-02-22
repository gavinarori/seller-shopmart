"use client"

import { Bar, BarChart, Line, LineChart } from "recharts"
import { useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { useSelector, useDispatch } from 'react-redux'
import { get_seller_dashboard_index_data } from '@/store/Reducers/dashboardIndexReducer'

const data = [
  { revenue: 10400, subscription: 240 },
  { revenue: 14405, subscription: 300 },
  { revenue: 9400, subscription: 200 },
  { revenue: 8200, subscription: 278 },
  { revenue: 7000, subscription: 189 },
  { revenue: 9600, subscription: 239 },
  { revenue: 11244, subscription: 278 },
  { revenue: 26475, subscription: 189 },
]

const chartConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  subscription: {
    label: "Subscriptions",
    color: "hsl(var(--primary))",
  },
}

export function CardsStats() {
  const dispatch = useDispatch<any>()

  const { 
    totalSale,
    totalOrder,
    totalProduct,
    totalPendingOrder,
    totalSeller,
    recentOrders,
    recentMessage 
  } = useSelector((state: any) => state.dashboardIndex)

  useEffect(() => {
    dispatch(get_seller_dashboard_index_data())
  }, [dispatch])

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-4">
      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-normal">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold">${totalSale?.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          <ChartContainer config={chartConfig} className="h-[80px] w-full">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <Line type="monotone" strokeWidth={2} dataKey="revenue" stroke="var(--color-revenue)" activeDot={{ r: 6 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Total Subscriptions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-normal">Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{totalOrder?.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          <ChartContainer config={chartConfig} className="mt-2 h-[80px] w-full">
            <BarChart data={data}>
              <Bar dataKey="subscription" fill="var(--color-subscription)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Total Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-normal">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrder?.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">New orders this month</p>
        </CardContent>
      </Card>

      {/* Total Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-normal">Total Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProduct?.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Products listed in the store</p>
        </CardContent>
      </Card>

      {/* Total Pending Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-normal">Pending Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPendingOrder?.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Orders awaiting processing</p>
        </CardContent>
      </Card>

      {/* Total Sellers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-normal">Total Sellers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSeller?.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Registered vendors</p>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-normal">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recentOrders?.length ?? 0}</div>
          <p className="text-xs text-muted-foreground">Orders placed recently</p>
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-normal">Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recentMessage?.length ?? 0}</div>
          <p className="text-xs text-muted-foreground">Customer inquiries received</p>
        </CardContent>
      </Card>
    </div>
  )
}
