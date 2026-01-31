import {
	AlertCircle,
	Banknote,
	Check,
	CreditCard,
	DollarSign,
	Gift,
	History,
	Minus,
	Plus,
	RefreshCw,
	Settings2,
	Wallet,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type WalletTransaction = {
	id: string;
	type: 'credit' | 'debit' | 'bonus';
	amount: string;
	description: string;
	date: string;
};

type StoreCreditSource = {
	name: string;
	amount: string;
	expiry?: string;
};

const TransactionRow = ({
	type,
	amount,
	description,
	date,
}: WalletTransaction) => {
	const typeStyles = {
		credit: 'text-emerald-500',
		debit: 'text-destructive',
		bonus: 'text-primary',
	};

	const typeIcons = {
		credit: Plus,
		debit: Minus,
		bonus: Gift,
	};

	const Icon = typeIcons[type];

	return (
		<div className="flex items-center justify-between py-3">
			<div className="flex items-center gap-3">
				<div
					className={`flex size-8 items-center justify-center rounded-full ${
						type === 'credit'
							? 'bg-emerald-500/10'
							: type === 'debit'
								? 'bg-destructive/10'
								: 'bg-primary/10'
					}`}
				>
					<Icon className={`size-4 ${typeStyles[type]}`} />
				</div>
				<div>
					<p className="font-medium">{description}</p>
					<p className="text-xs text-muted-foreground">{date}</p>
				</div>
			</div>
			<span className={`font-semibold ${typeStyles[type]}`}>
				{type === 'debit' ? '-' : '+'}
				{amount}
			</span>
		</div>
	);
};

const CreditSourceCard = ({
	name,
	amount,
	expiry,
}: StoreCreditSource) => (
	<div className="flex items-center justify-between rounded-lg border p-3">
		<div>
			<p className="font-medium">{name}</p>
			{expiry && (
				<p className="text-xs text-muted-foreground">Expires: {expiry}</p>
			)}
		</div>
		<span className="font-semibold text-primary">{amount}</span>
	</div>
);

export default function Main() {
	const transactions: WalletTransaction[] = [
		{ id: '1', type: 'bonus', amount: '$25.00', description: 'Welcome bonus', date: 'Jan 20, 2026' },
		{ id: '2', type: 'debit', amount: '$15.00', description: 'Order #12345', date: 'Jan 18, 2026' },
		{ id: '3', type: 'credit', amount: '$50.00', description: 'Refund - Order #12340', date: 'Jan 15, 2026' },
		{ id: '4', type: 'credit', amount: '$10.00', description: 'Referral reward', date: 'Jan 12, 2026' },
		{ id: '5', type: 'debit', amount: '$30.00', description: 'Order #12338', date: 'Jan 10, 2026' },
	];

	const creditSources: StoreCreditSource[] = [
		{ name: 'Product Returns', amount: '$50.00', expiry: 'Dec 31, 2026' },
		{ name: 'Promotional Credit', amount: '$25.00', expiry: 'Mar 31, 2026' },
		{ name: 'Referral Rewards', amount: '$35.00' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Wallet className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Wallet & Store Credit</CardTitle>
										<CardDescription>
											Manage your wallet balance and store credits
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="pt-6">
								<div className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
									<p className="text-sm text-muted-foreground">Available Balance</p>
									<p className="text-4xl font-bold text-primary mt-1">$110.00</p>
									<div className="mt-4 flex gap-2">
										<Button className="gap-2">
											<Plus className="size-4" />
											Add Funds
										</Button>
										<Button variant="outline" className="gap-2">
											<History className="size-4" />
											History
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Recent Transactions</CardTitle>
									<Button variant="ghost" size="sm">
										View All
									</Button>
								</div>
							</CardHeader>
							<CardContent className="divide-y pt-2">
								{transactions.map((txn) => (
									<TransactionRow key={txn.id} {...txn} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Credit Sources</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{creditSources.map((source) => (
									<CreditSourceCard key={source.name} {...source} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Wallet Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<Label>Auto-apply at Checkout</Label>
										<p className="text-xs text-muted-foreground">
											Use wallet balance automatically
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Low Balance Alerts</Label>
										<p className="text-xs text-muted-foreground">
											Get notified when balance is low
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="space-y-2">
									<Label>Alert Threshold</Label>
									<Select defaultValue="10">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="5">$5</SelectItem>
											<SelectItem value="10">$10</SelectItem>
											<SelectItem value="25">$25</SelectItem>
											<SelectItem value="50">$50</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<Gift className="size-5 text-primary shrink-0" />
									<div>
										<h4 className="font-semibold">Earn More Credits</h4>
										<p className="mt-1 text-sm text-muted-foreground">
											Refer friends and earn $10 for each successful referral.
										</p>
										<Button variant="link" size="sm" className="mt-2 h-auto p-0">
											Invite Friends
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
