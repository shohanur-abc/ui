import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Building,
	Calendar,
	FileText,
	Home,
	Percent,
	Receipt,
	Wallet,
} from 'lucide-react';

interface PropertyCardProps {
	address: string;
	unit: string;
	type: string;
	sqft: number;
}

interface TenantCardProps {
	name: string;
	leaseStart: string;
	leaseEnd: string;
	tenantId: string;
}

interface RentBreakdownCardProps {
	items: { label: string; amount: number }[];
	currency: string;
}

interface PaymentStatusCardProps {
	statementPeriod: string;
	dueDate: string;
	status: string;
	lateFee: number;
	currency: string;
}

interface BalanceCardProps {
	previousBalance: number;
	payments: number;
	currentCharges: number;
	totalDue: number;
	currency: string;
}

const PropertyCard = ({ address, unit, type, sqft }: PropertyCardProps) => (
	<Card className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20">
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Building className="size-4" />
				Property Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div>
				<p className="font-semibold">{address}</p>
				<p className="text-sm text-muted-foreground">Unit {unit}</p>
			</div>
			<div className="flex gap-4 text-sm">
				<Badge variant="secondary">{type}</Badge>
				<span className="text-muted-foreground">
					{sqft.toLocaleString()} sq ft
				</span>
			</div>
		</CardContent>
	</Card>
);

const TenantCard = ({
	name,
	leaseStart,
	leaseEnd,
	tenantId,
}: TenantCardProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Home className="size-4" />
				Tenant Information
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div>
				<p className="font-semibold">{name}</p>
				<p className="text-sm text-muted-foreground font-mono">{tenantId}</p>
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Calendar className="size-3" />
				<span>
					Lease: {leaseStart} - {leaseEnd}
				</span>
			</div>
		</CardContent>
	</Card>
);

const RentBreakdownCard = ({ items, currency }: RentBreakdownCardProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Receipt className="size-4" />
				Monthly Charges
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item, index) => (
				<div key={index} className="flex justify-between text-sm">
					<span className="text-muted-foreground">{item.label}</span>
					<span className="font-medium">
						{currency}
						{item.amount.toFixed(2)}
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const PaymentStatusCard = ({
	statementPeriod,
	dueDate,
	status,
	lateFee,
	currency,
}: PaymentStatusCardProps) => (
	<Card className={status === 'Past Due' ? 'border-destructive' : ''}>
		<CardContent className="pt-6 space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">Statement Period</p>
					<p className="font-medium">{statementPeriod}</p>
				</div>
				<Badge variant={status === 'Past Due' ? 'destructive' : 'default'}>
					{status}
				</Badge>
			</div>
			<div>
				<p className="text-sm text-muted-foreground">Payment Due Date</p>
				<p className="font-semibold">{dueDate}</p>
			</div>
			{status === 'Past Due' && lateFee > 0 && (
				<div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
					Late fee of {currency}
					{lateFee.toFixed(2)} has been applied
				</div>
			)}
		</CardContent>
	</Card>
);

const BalanceCard = ({
	previousBalance,
	payments,
	currentCharges,
	totalDue,
	currency,
}: BalanceCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Wallet className="size-4" />
				Account Balance
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="opacity-80">Previous Balance</span>
					<span>
						{currency}
						{previousBalance.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Payments Received</span>
					<span>
						-{currency}
						{payments.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Current Charges</span>
					<span>
						{currency}
						{currentCharges.toFixed(2)}
					</span>
				</div>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-xl">
				<span>Total Due</span>
				<span>
					{currency}
					{totalDue.toFixed(2)}
				</span>
			</div>
			<Button variant="secondary" className="w-full">
				Pay Rent Online
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const property: PropertyCardProps = {
		address: '1250 Ocean View Drive',
		unit: '4B',
		type: '2BR / 2BA',
		sqft: 1150,
	};

	const tenant: TenantCardProps = {
		name: 'Michael Chen',
		leaseStart: 'Jan 1, 2024',
		leaseEnd: 'Dec 31, 2024',
		tenantId: 'TNT-2024-0456',
	};

	const rentItems = [
		{ label: 'Base Rent', amount: 2450.0 },
		{ label: 'Parking (1 Space)', amount: 150.0 },
		{ label: 'Pet Fee', amount: 50.0 },
		{ label: 'Water/Sewer', amount: 45.0 },
		{ label: 'Trash', amount: 25.0 },
	];

	const paymentStatus: PaymentStatusCardProps = {
		statementPeriod: 'March 2024',
		dueDate: 'March 1, 2024',
		status: 'Due Soon',
		lateFee: 0,
		currency: '$',
	};

	const balance: BalanceCardProps = {
		previousBalance: 0,
		payments: 0,
		currentCharges: 2720.0,
		totalDue: 2720.0,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-4">
					<div className="flex items-center gap-2 mb-2">
						<FileText className="size-5 text-primary" />
						<h1 className="text-xl font-bold">Rent Statement</h1>
					</div>
					<div className="grid @md:grid-cols-2 gap-4">
						<PropertyCard {...property} />
						<TenantCard {...tenant} />
					</div>
					<div className="grid @md:grid-cols-2 gap-4">
						<RentBreakdownCard items={rentItems} currency="$" />
						<PaymentStatusCard {...paymentStatus} />
					</div>
					<BalanceCard {...balance} />
				</div>
			</div>
		</section>
	);
}
