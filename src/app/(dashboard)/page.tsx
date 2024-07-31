import { File, ListFilter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const transactions = [
  {
    Description: "Lunch at Cafe",
    Category: "Food & Drink",
    Account: "Credit Card",
    Date: "2023-07-01",
    Amount: 15.99,
  },
  {
    Description: "Groceries",
    Category: "Food & Drink",
    Account: "Debit Card",
    Date: "2023-07-03",
    Amount: 54.25,
  },
  {
    Description: "Electricity Bill",
    Category: "Utilities",
    Account: "Bank Transfer",
    Date: "2023-07-05",
    Amount: 75.0,
  },
  {
    Description: "Gym Membership",
    Category: "Health & Fitness",
    Account: "Credit Card",
    Date: "2023-07-07",
    Amount: 45.0,
  },
  {
    Description: "Bus Ticket",
    Category: "Transport",
    Account: "Cash",
    Date: "2023-07-08",
    Amount: 2.5,
  },
  {
    Description: "Movie Night",
    Category: "Entertainment",
    Account: "Debit Card",
    Date: "2023-07-10",
    Amount: 12.0,
  },
  {
    Description: "Monthly Rent",
    Category: "Housing",
    Account: "Bank Transfer",
    Date: "2023-07-01",
    Amount: 1200.0,
  },
  {
    Description: "Internet Bill",
    Category: "Utilities",
    Account: "Credit Card",
    Date: "2023-07-12",
    Amount: 50.0,
  },
  {
    Description: "Dinner with Friends",
    Category: "Food & Drink",
    Account: "Cash",
    Date: "2023-07-15",
    Amount: 30.0,
  },
  {
    Description: "Concert Ticket",
    Category: "Entertainment",
    Account: "Debit Card",
    Date: "2023-07-18",
    Amount: 75.0,
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2 mt-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>My Expenses Tracker</CardTitle>
                <CardDescription className="text-balance max-w-lg leading-relaxed">
                  Track your expenses and income in one place.
                </CardDescription>
              </CardHeader>
              <CardFooter className="space-x-2">
                <Button>Add Expense</Button>
                <Button>Add Income</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">$1,329</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">$5,329</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={12} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="week">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      All Categories
                    </DropdownMenuCheckboxItem>
                    {transactions
                      .map((transaction) => transaction.Category)
                      .filter(
                        (value, index, self) => self.indexOf(value) === index
                      )
                      .map((category) => (
                        <DropdownMenuCheckboxItem key={category}>
                          {category}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>
            <TabsContent value="week">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Cashflow</CardTitle>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <CardDescription>This week's cashflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Category
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Account
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.Description}>
                          <TableCell>{transaction.Description}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              {transaction.Category}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {transaction.Account}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {transaction.Date}
                          </TableCell>
                          <TableCell className="text-right">
                            ${transaction.Amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
