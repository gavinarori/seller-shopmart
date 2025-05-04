"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  Package,
  ShoppingBag,
  ShoppingCart,
  Store,
  TrendingUp,
  MessageSquare,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { get_seller_dashboard_index_data } from "@/store/Reducers/dashboardIndexReducer"

// Sample data for different charts
const revenueData = [
  { name: "Jan", revenue: 10400 },
  { name: "Feb", revenue: 14405 },
  { name: "Mar", revenue: 9400 },
  { name: "Apr", revenue: 8200 },
  { name: "May", revenue: 7000 },
  { name: "Jun", revenue: 9600 },
  { name: "Jul", revenue: 11244 },
  { name: "Aug", revenue: 26475 },
]

const subscriptionData = [
  { name: "Jan", subscriptions: 240 },
  { name: "Feb", subscriptions: 300 },
  { name: "Mar", subscriptions: 200 },
  { name: "Apr", subscriptions: 278 },
  { name: "May", subscriptions: 189 },
  { name: "Jun", subscriptions: 239 },
  { name: "Jul", subscriptions: 278 },
  { name: "Aug", subscriptions: 349 },
]

const orderData = [
  { name: "Mon", orders: 12 },
  { name: "Tue", orders: 18 },
  { name: "Wed", orders: 15 },
  { name: "Thu", orders: 25 },
  { name: "Fri", orders: 32 },
  { name: "Sat", orders: 28 },
  { name: "Sun", orders: 20 },
]

const productData = [
  { name: "Q1", active: 45, inactive: 12 },
  { name: "Q2", active: 52, inactive: 8 },
  { name: "Q3", active: 61, inactive: 10 },
  { name: "Q4", active: 70, inactive: 5 },
]

const pendingOrdersData = [
  { name: "Week 1", pending: 8 },
  { name: "Week 2", pending: 12 },
  { name: "Week 3", pending: 5 },
  { name: "Week 4", pending: 9 },
]

const sellerData = [
  { name: "Jan", sellers: 12 },
  { name: "Feb", sellers: 15 },
  { name: "Mar", sellers: 18 },
  { name: "Apr", sellers: 22 },
  { name: "May", sellers: 25 },
  { name: "Jun", sellers: 30 },
]

const recentOrdersData = [
  { name: "Mon", orders: 5 },
  { name: "Tue", orders: 8 },
  { name: "Wed", orders: 3 },
  { name: "Thu", orders: 7 },
  { name: "Fri", orders: 10 },
  { name: "Sat", orders: 6 },
  { name: "Sun", orders: 4 },
]

const messageData = [
  { name: "Mon", messages: 8 },
  { name: "Tue", messages: 12 },
  { name: "Wed", messages: 7 },
  { name: "Thu", messages: 15 },
  { name: "Fri", messages: 10 },
  { name: "Sat", messages: 5 },
  { name: "Sun", messages: 3 },
]

const chartConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "hsl(var(--chart-2))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-3))",
  },
  active: {
    label: "Active Products",
    color: "hsl(var(--chart-4))",
  },
  inactive: {
    label: "Inactive Products",
    color: "hsl(var(--chart-5))",
  },
  pending: {
    label: "Pending Orders",
    color: "hsl(var(--chart-6))",
  },
  sellers: {
    label: "Sellers",
    color: "hsl(var(--chart-7))",
  },
  messages: {
    label: "Messages",
    color: "hsl(var(--chart-8))",
  },
}

export function CardsStats() {
  const dispatch = useDispatch<any>()

  const { totalSale, totalOrder, totalProduct, totalPendingOrder, totalSeller, recentOrders, recentMessage } =
    useSelector((state: any) => state.dashboardIndex || {})

  useEffect(() => {
    dispatch(get_seller_dashboard_index_data())
  }, [dispatch])

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
      {/* Total Revenue */}
      <Card className="overflow-hidden border-none bg-gradient-to-br from-purple-50 to-indigo-50 shadow-md dark:from-purple-950/20 dark:to-indigo-950/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CardDescription className="text-xs">Monthly sales overview</CardDescription>
          </div>
          <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
            <CircleDollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              ${totalSale?.toLocaleString() || "0"}
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              20.1%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">Compared to last month</p>
          <div className="mt-4 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRevenue)" />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded bg-purple-500" />
                              <span className="text-xs font-medium text-muted-foreground">Revenue</span>
                            </div>
                            <div className="text-right text-xs font-medium">${payload[0].value}</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Total Subscriptions */}
      <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md dark:from-blue-950/20 dark:to-cyan-950/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <CardDescription className="text-xs">Active subscription plans</CardDescription>
          </div>
          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              +{totalOrder?.toLocaleString() || "0"}
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              180.1%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">Compared to last month</p>
          <div className="mt-4 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={subscriptionData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Line
                  type="monotone"
                  dataKey="subscriptions"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded bg-blue-500" />
                              <span className="text-xs font-medium text-muted-foreground">Subscriptions</span>
                            </div>
                            <div className="text-right text-xs font-medium">{payload[0].value}</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Total Orders */}
      <Card className="overflow-hidden border-none bg-gradient-to-br from-green-50 to-emerald-50 shadow-md dark:from-green-950/20 dark:to-emerald-950/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CardDescription className="text-xs">Weekly order summary</CardDescription>
          </div>
          <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
            <ShoppingBag className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold text-green-700 dark:text-green-400">
            {totalOrder?.toLocaleString() || "0"}
          </div>
          <p className="text-xs text-muted-foreground">New orders this month</p>
          <div className="mt-4 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded bg-green-500" />
                              <span className="text-xs font-medium text-muted-foreground">Orders</span>
                            </div>
                            <div className="text-right text-xs font-medium">{payload[0].value}</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Total Products */}
      <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-50 to-yellow-50 shadow-md dark:from-amber-950/20 dark:to-yellow-950/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <CardDescription className="text-xs">Active vs. inactive products</CardDescription>
          </div>
          <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/30">
            <Package className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">
            {totalProduct?.toLocaleString() || "0"}
          </div>
          <p className="text-xs text-muted-foreground">Products listed in the store</p>
          <div className="mt-4 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                barGap={0}
                barCategoryGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} />
                <Bar dataKey="active" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inactive" fill="#fcd34d" radius={[4, 4, 0, 0]} />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded bg-amber-500" />
                              <span className="text-xs font-medium text-muted-foreground">Active</span>
                            </div>
                            <div className="text-right text-xs font-medium">{payload[0].value}</div>
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded bg-amber-300" />
                              <span className="text-xs font-medium text-muted-foreground">Inactive</span>
                            </div>
                            <div className="text-right text-xs font-medium">{payload[1].value}</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Total Pending Orders */}
      <Card className="overflow-hidden border-none bg-gradient-to-br from-red-50 to-rose-50 shadow-md dark:from-red-950/20 dark:to-rose-950/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <CardDescription className="text-xs">Orders awaiting processing</CardDescription>
          </div>
          <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/30">
            <ShoppingCart className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold text-red-700 dark:text-red-400">
            {totalPendingOrder?.toLocaleString() || "0"}
          </div>
          <p className="text-xs text-muted-foreground">Orders awaiting processing</p>
          <div className="mt-4 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pendingOrdersData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ stroke: "#ef4444", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded bg-red-500" />
                              <span className="text-xs font-medium text-muted-foreground">Pending</span>
                            </div>
                            <div className="text-right text-xs font-medium">{payload[0].value}</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Total Sellers */}
      <Card className="overflow-hidden border-none bg-gradient-to-br from-teal-50 to-cyan-50 shadow-md dark:from-teal-950/20 dark:to-cyan-950/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
            <CardDescription className="text-xs">Registered vendors on platform</CardDescription>
          </div>
          <div className="rounded-full bg-teal-100 p-2 dark:bg-teal-900/30">
            <Store className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold text-teal-700 dark:text-teal-400">
            {totalSeller?.toLocaleString() || "0"}
          </div>
          <p className="text-xs text-muted-foreground">Registered vendors</p>
          <div className="mt-4 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sellerData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorSellers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="sellers" stroke="#14b8a6" fillOpacity={1} fill="url(#colorSellers)" />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded bg-teal-500" />
                              <span className="text-xs font-medium text-muted-foreground">Sellers</span>
                            </div>
                            <div className="text-right text-xs font-medium">{payload[0].value}</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="overflow-hidden border-none bg-gradient-to-br from-orange-50 to-amber-50 shadow-md dark:from-orange-950/20 dark:to-amber-950/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            <CardDescription className="text-xs">Last 7 days order activity</CardDescription>
          </div>
          <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30">
            <BarChart3 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">{recentOrders?.length || "0"}</div>
          <p className="text-xs text-muted-foreground">Orders placed recently</p>
          <div className="mt-4 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentOrdersData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]} />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded bg-orange-500" />
                              <span className="text-xs font-medium text-muted-foreground">Orders</span>
                            </div>
                            <div className="text-right text-xs font-medium">{payload[0].value}</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card className="overflow-hidden border-none bg-gradient-to-br from-pink-50 to-rose-50 shadow-md dark:from-pink-950/20 dark:to-rose-950/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Recent Messages</CardTitle>
            <CardDescription className="text-xs">Customer inquiries</CardDescription>
          </div>
          <div className="rounded-full bg-pink-100 p-2 dark:bg-pink-900/30">
            <MessageSquare className="h-4 w-4 text-pink-600 dark:text-pink-400" />
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold text-pink-700 dark:text-pink-400">{recentMessage?.length || "0"}</div>
          <p className="text-xs text-muted-foreground">Customer inquiries received</p>
          <div className="mt-4 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={messageData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Line
                  type="monotone"
                  dataKey="messages"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded bg-pink-500" />
                              <span className="text-xs font-medium text-muted-foreground">Messages</span>
                            </div>
                            <div className="text-right text-xs font-medium">{payload[0].value}</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
