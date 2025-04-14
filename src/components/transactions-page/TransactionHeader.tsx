import { Card, CardContent } from "@/src/components/ui/card";

export function TransactionHeader() {
  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm border-none shadow-md">
      <CardContent className="flex flex-col sm:flex-row justify-between items-center p-6">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-semibold tracking-tight">
            Transactions
          </h2>
          <p className="text-muted-foreground">
            View and manage all your transaction history
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Date Range</span>
            </Button>

            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>

            <Select defaultValue="all">
              <SelectTrigger className="w-[110px] h-9">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
}
