import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	Clock,
	Code,
	Database,
	Globe,
	Server,
	Zap,
} from 'lucide-react';

interface AccountProps {
	name: string;
	accountId: string;
	plan: string;
	billingPeriod: string;
}

interface UsageItemProps {
	icon: React.ReactNode;
	service: string;
	metric: string;
	used: number;
	included: number;
	unit: string;
	overageRate: number;
	overageCost: number;
}

interface ChargeProps {
	description: string;
	amount: number;
}

interface TotalsProps {
	plan: number;
	usage: number;
	credits: number;
	total: number;
	currency: string;
}

const AccountHeader = ({ account }: { account: AccountProps }) => (
	<div className="py-6">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<Code className="size-8 text-primary" />
				<div>
					<h1 className="text-2xl font-bold">Developer Platform</h1>
					<p className="text-sm text-muted-foreground">Usage Invoice</p>
				</div>
			</div>
			<div className="text-right">
				<Badge variant="default">{account.plan}</Badge>
				<p className="font-mono text-sm font-bold mt-1">{account.accountId}</p>
			</div>
		</div>
	</div>
);

const BillingPeriod = ({ period }: { period: string }) => (
	<div className="py-4 flex items-center gap-8">
		<div className="flex items-center gap-2">
			<Calendar className="size-4 text-primary" />
			<span className="text-sm">
				<span className="text-muted-foreground">Billing Period: </span>
				<span className="font-medium">{period}</span>
			</span>
		</div>
		<div className="flex items-center gap-2">
			<Clock className="size-4 text-muted-foreground" />
			<span className="text-sm text-muted-foreground">
				Generated: {new Date().toLocaleDateString()}
			</span>
		</div>
	</div>
);

const UsageRow = ({
	item,
	currency,
}: {
	item: UsageItemProps;
	currency: string;
}) => (
	<>
		<div className="py-4">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-3">
					<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
						{item.icon}
					</div>
					<div>
						<p className="font-medium">{item.service}</p>
						<p className="text-xs text-muted-foreground">{item.metric}</p>
					</div>
				</div>
				<div className="text-right">
					{item.overageCost > 0 ? (
						<span className="font-bold">
							{currency}
							{item.overageCost.toFixed(2)}
						</span>
					) : (
						<Badge variant="outline" className="text-green-600">
							Included
						</Badge>
					)}
				</div>
			</div>
			<div className="flex items-center gap-8 text-sm">
				<div>
					<span className="text-muted-foreground">Used: </span>
					<span className="font-mono">
						{item.used.toLocaleString()} {item.unit}
					</span>
				</div>
				<div>
					<span className="text-muted-foreground">Included: </span>
					<span className="font-mono">
						{item.included.toLocaleString()} {item.unit}
					</span>
				</div>
				{item.used > item.included && (
					<div>
						<span className="text-muted-foreground">Overage: </span>
						<span className="font-mono text-amber-600">
							{(item.used - item.included).toLocaleString()} {item.unit}
						</span>
						<span className="text-muted-foreground">
							{' '}
							@ {currency}
							{item.overageRate}/{item.unit}
						</span>
					</div>
				)}
			</div>
		</div>
		<Separator />
	</>
);

const ChargeRow = ({
	charge,
	currency,
}: {
	charge: ChargeProps;
	currency: string;
}) => (
	<>
		<div className="flex justify-between py-3 text-sm">
			<span>{charge.description}</span>
			<span className="font-medium">
				{currency}
				{charge.amount.toFixed(2)}
			</span>
		</div>
		<Separator />
	</>
);

const TotalsSection = ({
	plan,
	usage,
	credits,
	total,
	currency,
}: TotalsProps) => (
	<div className="py-4 space-y-3">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Plan Subscription</span>
			<span>
				{currency}
				{plan.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Usage Charges</span>
			<span>
				{currency}
				{usage.toFixed(2)}
			</span>
		</div>
		{credits > 0 && (
			<>
				<Separator />
				<div className="flex justify-between text-sm text-green-600">
					<span>Credits Applied</span>
					<span>
						-{currency}
						{credits.toFixed(2)}
					</span>
				</div>
			</>
		)}
		<Separator />
		<div className="flex justify-between text-xl font-bold pt-2">
			<span>Total</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const account: AccountProps = {
		name: 'Acme Corp',
		accountId: 'acct_2024_xyz789',
		plan: 'Pro Plan',
		billingPeriod: 'February 1 - 29, 2024',
	};

	const usageItems: UsageItemProps[] = [
		{
			icon: <Zap className="size-5 text-amber-500" />,
			service: 'API Requests',
			metric: 'REST & GraphQL calls',
			used: 2500000,
			included: 1000000,
			unit: 'requests',
			overageRate: 0.0001,
			overageCost: 150.0,
		},
		{
			icon: <Database className="size-5 text-blue-500" />,
			service: 'Database Storage',
			metric: 'PostgreSQL storage',
			used: 45,
			included: 50,
			unit: 'GB',
			overageRate: 0.25,
			overageCost: 0,
		},
		{
			icon: <Globe className="size-5 text-green-500" />,
			service: 'Bandwidth',
			metric: 'Data transfer out',
			used: 180,
			included: 100,
			unit: 'GB',
			overageRate: 0.12,
			overageCost: 9.6,
		},
		{
			icon: <Server className="size-5 text-purple-500" />,
			service: 'Compute Hours',
			metric: 'Serverless execution',
			used: 850,
			included: 500,
			unit: 'hours',
			overageRate: 0.05,
			overageCost: 17.5,
		},
	];

	const charges: ChargeProps[] = [
		{ description: 'Pro Plan - Monthly', amount: 99.0 },
		{ description: 'Team Seats (5 additional)', amount: 50.0 },
		{ description: 'Priority Support Add-on', amount: 49.0 },
	];

	const totals: TotalsProps = {
		plan: 198.0,
		usage: 177.1,
		credits: 25.0,
		total: 350.1,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<AccountHeader account={account} />
				<Separator />
				<BillingPeriod period={account.billingPeriod} />
				<Separator />
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Usage Breakdown
					</p>
				</div>
				{usageItems.map((item, index) => (
					<UsageRow key={index} item={item} currency="$" />
				))}
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Subscription & Add-ons
					</p>
				</div>
				{charges.map((charge, index) => (
					<ChargeRow key={index} charge={charge} currency="$" />
				))}
				<TotalsSection {...totals} />
				<Separator className="my-4" />
				<p className="text-sm text-muted-foreground text-center">
					Payment will be charged to Visa ending in 4242 on March 1, 2024
				</p>
			</div>
		</section>
	);
}
