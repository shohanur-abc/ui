import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CreditCard, DollarSign } from 'lucide-react';

interface BalanceStatementProps {
	accountNumber: string;
	statementDate: string;
	dueDate: string;
}

interface AccountSummaryProps {
	previousBalance: number;
	payments: number;
	newCharges: number;
	currentBalance: number;
	minimumPayment: number;
	currency: string;
}

interface TransactionProps {
	date: string;
	description: string;
	amount: number;
	currency: string;
}

const BalanceStatement = ({
	accountNumber,
	statementDate,
	dueDate,
}: BalanceStatementProps) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<CreditCard className="size-5 text-primary" />
			<p className="font-bold">Statement Summary</p>
		</div>
		<div className="grid grid-cols-3 gap-4 text-sm">
			<div>
				<p className="text-xs text-muted-foreground">Account</p>
				<p className="font-mono">{accountNumber}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Statement Date</p>
				<p>{statementDate}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Due Date</p>
				<p className="font-medium text-destructive">{dueDate}</p>
			</div>
		</div>
	</div>
);

const AccountSummary = ({
	previousBalance,
	payments,
	newCharges,
	currentBalance,
	minimumPayment,
	currency,
}: AccountSummaryProps) => (
	<div className="p-4 rounded-lg bg-muted/50 space-y-3">
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Previous Balance</span>
				<span>
					{currency}
					{previousBalance.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-green-600">
				<span>Payments & Credits</span>
				<span>
					-{currency}
					{payments.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">New Charges</span>
				<span>
					{currency}
					{newCharges.toFixed(2)}
				</span>
			</div>
		</div>
		<Separator />
		<div className="flex justify-between font-bold text-lg">
			<span>Current Balance</span>
			<span className="text-primary">
				{currency}
				{currentBalance.toFixed(2)}
			</span>
		</div>
		<div className="flex items-center gap-2 text-sm text-destructive">
			<AlertCircle className="size-4" />
			<span>
				Minimum Payment: {currency}
				{minimumPayment.toFixed(2)}
			</span>
		</div>
	</div>
);

const Transaction = ({
	date,
	description,
	amount,
	currency,
}: TransactionProps) => (
	<div className="flex justify-between py-2 text-sm">
		<div className="flex gap-4">
			<span className="text-muted-foreground w-16">{date}</span>
			<span>{description}</span>
		</div>
		<span className={amount < 0 ? 'text-green-600' : ''}>
			{amount < 0 ? '-' : ''}
			{currency}
			{Math.abs(amount).toFixed(2)}
		</span>
	</div>
);

export default function Main() {
	const statement: BalanceStatementProps = {
		accountNumber: '****-****-****-4521',
		statementDate: 'Feb 20, 2024',
		dueDate: 'Mar 15, 2024',
	};

	const summary: AccountSummaryProps = {
		previousBalance: 1245.67,
		payments: 500.0,
		newCharges: 823.45,
		currentBalance: 1569.12,
		minimumPayment: 35.0,
		currency: '$',
	};

	const transactions: TransactionProps[] = [
		{
			date: 'Feb 2',
			description: 'Payment - Thank You',
			amount: -500.0,
			currency: '$',
		},
		{ date: 'Feb 5', description: 'Amazon.com', amount: 156.78, currency: '$' },
		{
			date: 'Feb 8',
			description: 'Whole Foods Market',
			amount: 89.45,
			currency: '$',
		},
		{
			date: 'Feb 12',
			description: 'Netflix Subscription',
			amount: 15.99,
			currency: '$',
		},
		{
			date: 'Feb 15',
			description: 'Gas Station',
			amount: 52.34,
			currency: '$',
		},
		{ date: 'Feb 18', description: 'Restaurant', amount: 78.9, currency: '$' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<div className="bg-card border rounded-lg p-6 space-y-6">
					<BalanceStatement {...statement} />
					<AccountSummary {...summary} />
					<div>
						<p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
							Recent Activity
						</p>
						<Separator />
						{transactions.map((transaction, index) => (
							<Transaction key={index} {...transaction} />
						))}
					</div>
					<div className="flex gap-3">
						<Button variant="outline" className="flex-1" size="sm">
							View All
						</Button>
						<Button className="flex-1 gap-2" size="sm">
							<DollarSign className="size-4" />
							Pay Now
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
