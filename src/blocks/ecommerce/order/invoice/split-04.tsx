import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Building2,
	DollarSign,
	FileText,
	PieChart,
	TrendingUp,
} from 'lucide-react';

interface InvestmentItem {
	name: string;
	type: string;
	shares: number;
	pricePerShare: number;
}

interface PortfolioSummaryProps {
	totalValue: number;
	totalGain: number;
	gainPercentage: number;
	currency: string;
}

interface AccountInfoProps {
	accountNumber: string;
	accountType: string;
	custodian: string;
	openedDate: string;
}

interface InvestmentRowProps {
	item: InvestmentItem;
	currency: string;
}

interface TransactionDetailsProps {
	transactionId: string;
	date: string;
	type: string;
	status: string;
}

interface FeeSummaryProps {
	items: { label: string; value: number }[];
	total: number;
	currency: string;
}

const PortfolioSummary = ({
	totalValue,
	totalGain,
	gainPercentage,
	currency,
}: PortfolioSummaryProps) => (
	<div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 space-y-4">
		<div className="flex items-center gap-2">
			<PieChart className="size-5 text-green-600" />
			<p className="font-semibold">Portfolio Value</p>
		</div>
		<div>
			<p className="text-3xl font-bold">
				{currency}
				{totalValue.toLocaleString()}
			</p>
			<div className="flex items-center gap-2 mt-1 text-sm text-green-600">
				<TrendingUp className="size-4" />
				<span>
					+{currency}
					{totalGain.toLocaleString()} ({gainPercentage}%)
				</span>
			</div>
		</div>
	</div>
);

const AccountInfo = ({
	accountNumber,
	accountType,
	custodian,
	openedDate,
}: AccountInfoProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<div className="flex items-center gap-2">
			<Building2 className="size-4 text-muted-foreground" />
			<p className="font-semibold">Account Information</p>
		</div>
		<div className="grid grid-cols-2 gap-3 text-sm">
			<div>
				<p className="text-muted-foreground">Account #</p>
				<p className="font-mono font-medium">{accountNumber}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Type</p>
				<p className="font-medium">{accountType}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Custodian</p>
				<p className="font-medium">{custodian}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Opened</p>
				<p className="font-medium">{openedDate}</p>
			</div>
		</div>
	</div>
);

const InvestmentRow = ({ item, currency }: InvestmentRowProps) => (
	<div className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
		<div className="flex items-start justify-between gap-4">
			<div>
				<p className="font-semibold">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.type}</p>
			</div>
			<div className="text-right">
				<p className="font-bold">
					{currency}
					{(item.shares * item.pricePerShare).toLocaleString()}
				</p>
				<p className="text-sm text-muted-foreground">
					{item.shares} shares @ {currency}
					{item.pricePerShare}
				</p>
			</div>
		</div>
	</div>
);

const TransactionDetails = ({
	transactionId,
	date,
	type,
	status,
}: TransactionDetailsProps) => (
	<div className="p-4 rounded-lg bg-muted/40 space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<FileText className="size-4 text-muted-foreground" />
				<p className="font-semibold">Transaction Details</p>
			</div>
			<Badge variant="default">{status}</Badge>
		</div>
		<div className="grid grid-cols-3 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground">Transaction ID</p>
				<p className="font-mono">{transactionId}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Date</p>
				<p className="font-medium">{date}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Type</p>
				<p className="font-medium">{type}</p>
			</div>
		</div>
	</div>
);

const FeeSummary = ({ items, total, currency }: FeeSummaryProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<div className="flex items-center gap-2">
			<DollarSign className="size-4 text-muted-foreground" />
			<p className="font-semibold">Fee Summary</p>
		</div>
		<div className="space-y-2 text-sm">
			{items.map((item, index) => (
				<div key={index} className="flex justify-between">
					<span className="text-muted-foreground">{item.label}</span>
					<span>
						{currency}
						{item.value.toFixed(2)}
					</span>
				</div>
			))}
		</div>
		<Separator />
		<div className="flex justify-between font-bold">
			<span>Total Fees</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const portfolio: PortfolioSummaryProps = {
		totalValue: 125750.0,
		totalGain: 8250.0,
		gainPercentage: 7.02,
		currency: '$',
	};

	const account: AccountInfoProps = {
		accountNumber: '****7891',
		accountType: 'Individual Brokerage',
		custodian: 'Apex Clearing',
		openedDate: 'Jan 2023',
	};

	const transaction: TransactionDetailsProps = {
		transactionId: 'TXN-2024-0456',
		date: 'February 12, 2024',
		type: 'Buy Order',
		status: 'Executed',
	};

	const investments: InvestmentItem[] = [
		{
			name: 'S&P 500 Index Fund',
			type: 'ETF',
			shares: 50,
			pricePerShare: 485.0,
		},
		{
			name: 'Total Bond Market',
			type: 'Mutual Fund',
			shares: 200,
			pricePerShare: 102.5,
		},
		{
			name: 'International Equity',
			type: 'ETF',
			shares: 75,
			pricePerShare: 68.0,
		},
		{
			name: 'Real Estate Investment',
			type: 'REIT',
			shares: 100,
			pricePerShare: 45.25,
		},
	];

	const fees = [
		{ label: 'Trading Commission', value: 0.0 },
		{ label: 'Management Fee (0.03%)', value: 37.73 },
		{ label: 'SEC Fee', value: 0.26 },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="pt-6">
						<div className="grid @lg:grid-cols-5 gap-6">
							<div className="@lg:col-span-2 space-y-4">
								<PortfolioSummary {...portfolio} />
								<AccountInfo {...account} />
								<FeeSummary items={fees} total={37.99} currency="$" />
							</div>
							<div className="@lg:col-span-3 space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-bold">Investment Statement</h2>
									<Button variant="outline" size="sm" className="gap-2">
										View All
										<ArrowRight className="size-4" />
									</Button>
								</div>
								<TransactionDetails {...transaction} />
								<div className="space-y-3">
									<p className="font-semibold">Holdings</p>
									{investments.map((investment, index) => (
										<InvestmentRow key={index} item={investment} currency="$" />
									))}
								</div>
								<div className="flex gap-3">
									<Button>Download Statement</Button>
									<Button variant="outline">Tax Documents</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
