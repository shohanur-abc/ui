import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowDown, ArrowUp, Briefcase, Calendar, DollarSign, FileText, PieChart, TrendingUp, Wallet } from "lucide-react"

interface AccountSummaryProps {
  accountNumber: string
  accountType: string
  statementPeriod: string
  accountHolder: string
  advisorName: string
  advisorPhone: string
}

interface PortfolioValueProps {
  beginningValue: number
  endingValue: number
  netChange: number
  percentChange: number
  contributions: number
  withdrawals: number
  dividends: number
  interest: number
  currency: string
}

interface AssetAllocationProps {
  category: string
  allocation: number
  value: number
  change: number
}

interface HoldingProps {
  symbol: string
  name: string
  shares: number
  costBasis: number
  marketValue: number
  unrealizedGain: number
  percentGain: number
}

interface TransactionProps {
  date: string
  type: string
  description: string
  symbol: string
  shares: number
  price: number
  amount: number
}

interface FeeSummaryProps {
  managementFee: number
  advisoryFee: number
  tradingFees: number
  otherFees: number
  totalFees: number
  currency: string
}

const AccountSummary = ({ accountNumber, accountType, statementPeriod, accountHolder, advisorName, advisorPhone }: AccountSummaryProps) => (
  <Card className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border-emerald-500/20">
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Briefcase className="size-8 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Investment Statement</h1>
            <p className="text-muted-foreground">{statementPeriod}</p>
          </div>
        </div>
        <Badge variant="secondary">{accountType}</Badge>
      </div>
      <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mt-6 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Account Number</p>
          <p className="font-mono font-semibold">{accountNumber}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Account Holder</p>
          <p className="font-medium">{accountHolder}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Financial Advisor</p>
          <p className="font-medium">{advisorName}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Advisor Phone</p>
          <p>{advisorPhone}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const PortfolioValue = ({ beginningValue, endingValue, netChange, percentChange, contributions, withdrawals, dividends, interest, currency }: PortfolioValueProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Wallet className="size-4" />
        Portfolio Value
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">Beginning Value</p>
          <p className="text-xl font-bold">{currency}{beginningValue.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/10">
          <p className="text-xs text-muted-foreground">Ending Value</p>
          <p className="text-2xl font-bold text-primary">{currency}{endingValue.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
        <TrendingUp className="size-6 text-green-500" />
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Net Change</p>
          <p className="text-lg font-bold text-green-600">+{currency}{netChange.toLocaleString()}</p>
        </div>
        <Badge variant="default" className="bg-green-500 text-lg">+{percentChange.toFixed(2)}%</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Contributions</span>
          <span className="text-green-600">+{currency}{contributions.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Withdrawals</span>
          <span className="text-red-500">-{currency}{withdrawals.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Dividends</span>
          <span>+{currency}{dividends.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Interest</span>
          <span>+{currency}{interest.toLocaleString()}</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

const AssetAllocation = ({ allocations }: { allocations: AssetAllocationProps[] }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <PieChart className="size-4" />
        Asset Allocation
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {allocations.map((asset, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{asset.category}</span>
            <div className="flex items-center gap-3">
              <span>{asset.allocation}%</span>
              <span className={asset.change >= 0 ? "text-green-600" : "text-red-500"}>
                {asset.change >= 0 ? "+" : ""}{asset.change.toFixed(1)}%
              </span>
            </div>
          </div>
          <Progress value={asset.allocation} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">${asset.value.toLocaleString()}</p>
        </div>
      ))}
    </CardContent>
  </Card>
)

const HoldingsTable = ({ holdings, currency }: { holdings: HoldingProps[]; currency: string }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <FileText className="size-4" />
        Holdings Detail
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Shares</TableHead>
            <TableHead className="text-right">Cost Basis</TableHead>
            <TableHead className="text-right">Market Value</TableHead>
            <TableHead className="text-right">Unrealized Gain/Loss</TableHead>
            <TableHead className="text-right">% Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdings.map((holding, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono font-bold">{holding.symbol}</TableCell>
              <TableCell>{holding.name}</TableCell>
              <TableCell className="text-right">{holding.shares.toLocaleString()}</TableCell>
              <TableCell className="text-right">{currency}{holding.costBasis.toLocaleString()}</TableCell>
              <TableCell className="text-right font-medium">{currency}{holding.marketValue.toLocaleString()}</TableCell>
              <TableCell className={`text-right font-medium ${holding.unrealizedGain >= 0 ? "text-green-600" : "text-red-500"}`}>
                {holding.unrealizedGain >= 0 ? "+" : ""}{currency}{holding.unrealizedGain.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant={holding.percentGain >= 0 ? "default" : "destructive"} className="gap-1">
                  {holding.percentGain >= 0 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                  {holding.percentGain >= 0 ? "+" : ""}{holding.percentGain.toFixed(1)}%
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const TransactionsTable = ({ transactions, currency }: { transactions: TransactionProps[]; currency: string }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Calendar className="size-4" />
        Transaction History
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead className="text-right">Shares</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={index}>
              <TableCell>{tx.date}</TableCell>
              <TableCell><Badge variant="outline">{tx.type}</Badge></TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell className="font-mono">{tx.symbol || "-"}</TableCell>
              <TableCell className="text-right">{tx.shares || "-"}</TableCell>
              <TableCell className="text-right">{tx.price ? `${currency}${tx.price.toFixed(2)}` : "-"}</TableCell>
              <TableCell className={`text-right font-medium ${tx.amount >= 0 ? "" : "text-red-500"}`}>
                {tx.amount >= 0 ? "" : "-"}{currency}{Math.abs(tx.amount).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const FeeSummary = ({ managementFee, advisoryFee, tradingFees, otherFees, totalFees, currency }: FeeSummaryProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <DollarSign className="size-4" />
        Fee Summary
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Management Fee (0.35%)</span>
          <span>{currency}{managementFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Advisory Fee (0.50%)</span>
          <span>{currency}{advisoryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Trading Commissions</span>
          <span>{currency}{tradingFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Other Fees</span>
          <span>{currency}{otherFees.toFixed(2)}</span>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between font-medium">
        <span>Total Fees (YTD)</span>
        <span>{currency}{totalFees.toFixed(2)}</span>
      </div>
    </CardContent>
  </Card>
)

export default function Main() {
  const account: AccountSummaryProps = {
    accountNumber: "IRA-78901234",
    accountType: "Traditional IRA",
    statementPeriod: "January 1 - January 31, 2024",
    accountHolder: "Robert & Linda Johnson",
    advisorName: "Jennifer Williams, CFP",
    advisorPhone: "(800) 555-0150",
  }

  const portfolio: PortfolioValueProps = {
    beginningValue: 485750,
    endingValue: 512340,
    netChange: 26590,
    percentChange: 5.47,
    contributions: 6500,
    withdrawals: 0,
    dividends: 1850,
    interest: 245,
    currency: "$",
  }

  const allocations: AssetAllocationProps[] = [
    { category: "US Stocks", allocation: 45, value: 230553, change: 6.2 },
    { category: "International Stocks", allocation: 20, value: 102468, change: 4.8 },
    { category: "Bonds", allocation: 25, value: 128085, change: 1.2 },
    { category: "Real Estate", allocation: 7, value: 35864, change: 3.5 },
    { category: "Cash & Equivalents", allocation: 3, value: 15370, change: 0.4 },
  ]

  const holdings: HoldingProps[] = [
    { symbol: "VTI", name: "Vanguard Total Stock Market ETF", shares: 450, costBasis: 85000, marketValue: 102150, unrealizedGain: 17150, percentGain: 20.2 },
    { symbol: "VXUS", name: "Vanguard Total International Stock ETF", shares: 800, costBasis: 42000, marketValue: 46400, unrealizedGain: 4400, percentGain: 10.5 },
    { symbol: "BND", name: "Vanguard Total Bond Market ETF", shares: 600, costBasis: 45000, marketValue: 44100, unrealizedGain: -900, percentGain: -2.0 },
    { symbol: "AAPL", name: "Apple Inc.", shares: 200, costBasis: 28000, marketValue: 38400, unrealizedGain: 10400, percentGain: 37.1 },
    { symbol: "VNQ", name: "Vanguard Real Estate ETF", shares: 150, costBasis: 12500, marketValue: 13275, unrealizedGain: 775, percentGain: 6.2 },
  ]

  const transactions: TransactionProps[] = [
    { date: "Jan 3", type: "Contribution", description: "IRA Contribution 2024", symbol: "", shares: 0, price: 0, amount: 6500 },
    { date: "Jan 5", type: "Buy", description: "Purchase", symbol: "VTI", shares: 25, price: 227.00, amount: -5675 },
    { date: "Jan 15", type: "Dividend", description: "Dividend Reinvestment", symbol: "AAPL", shares: 2.5, price: 192.00, amount: 480 },
    { date: "Jan 20", type: "Dividend", description: "Quarterly Distribution", symbol: "BND", shares: 0, price: 0, amount: 285 },
    { date: "Jan 28", type: "Buy", description: "Auto-Invest", symbol: "VXUS", shares: 15, price: 58.00, amount: -870 },
  ]

  const fees: FeeSummaryProps = {
    managementFee: 149.35,
    advisoryFee: 213.35,
    tradingFees: 14.95,
    otherFees: 5.00,
    totalFees: 382.65,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <div className="space-y-6">
          <AccountSummary {...account} />
          <div className="grid @md:grid-cols-2 gap-4">
            <PortfolioValue {...portfolio} />
            <AssetAllocation allocations={allocations} />
          </div>
          <HoldingsTable holdings={holdings} currency="$" />
          <TransactionsTable transactions={transactions} currency="$" />
          <div className="grid @md:grid-cols-3 gap-4">
            <div className="@md:col-span-2 p-4 rounded-lg border bg-muted/30 text-sm">
              <p className="font-medium mb-2">Important Disclosures:</p>
              <p className="text-muted-foreground text-xs">Past performance is not indicative of future results. Investment values fluctuate so that when redeemed, they may be worth more or less than their original cost. This statement is provided for informational purposes only and should not be considered tax or legal advice. Please consult your tax advisor regarding your specific situation. All fees are charged in accordance with the advisory agreement.</p>
            </div>
            <FeeSummary {...fees} />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline">Download PDF</Button>
            <Button>Schedule Consultation</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
