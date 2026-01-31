import {
	AlertCircle,
	ArrowDown,
	ArrowUp,
	Building2,
	Calendar,
	Check,
	Clock,
	DollarSign,
	ExternalLink,
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

type PayoutAccount = {
	id: string;
	type: 'bank' | 'paypal' | 'wallet';
	name: string;
	details: string;
	isDefault: boolean;
	verified: boolean;
};

type PayoutHistory = {
	id: string;
	date: string;
	amount: string;
	status: 'completed' | 'pending' | 'processing';
	method: string;
};

const PayoutAccountCard = ({
	type,
	name,
	details,
	isDefault,
	verified,
}: PayoutAccount) => {
	const icons = {
		bank: Building2,
		paypal: Wallet,
		wallet: Wallet,
	};
	const Icon = icons[type];

	return (
		<div
			className={`rounded-lg border p-4 transition-all ${
				isDefault ? 'border-primary/30 bg-primary/5' : ''
			}`}
		>
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div
						className={`flex size-12 items-center justify-center rounded-lg ${
							isDefault
								? 'bg-primary/10 text-primary'
								: 'bg-muted text-muted-foreground'
						}`}
					>
						<Icon className="size-6" />
					</div>
					<div>
						<div className="flex items-center gap-2">
							<h4 className="font-medium">{name}</h4>
							{isDefault && (
								<Badge className="bg-primary/10 text-primary border-0 text-xs">
									Default
								</Badge>
							)}
							{verified && (
								<Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
									<Check className="mr-1 size-3" />
									Verified
								</Badge>
							)}
						</div>
						<p className="text-sm text-muted-foreground">{details}</p>
					</div>
				</div>
				<Button variant="ghost" size="icon-sm">
					<Settings2 className="size-4" />
				</Button>
			</div>
		</div>
	);
};

const PayoutHistoryRow = ({
	date,
	amount,
	status,
	method,
}: PayoutHistory) => {
	const statusStyles = {
		completed: 'bg-emerald-500/10 text-emerald-500',
		pending: 'bg-amber-500/10 text-amber-500',
		processing: 'bg-primary/10 text-primary',
	};

	return (
		<div className="flex items-center justify-between py-3">
			<div>
				<p className="font-medium">{amount}</p>
				<p className="text-xs text-muted-foreground">
					{method} • {date}
				</p>
			</div>
			<Badge className={`${statusStyles[status]} border-0`}>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
		</div>
	);
};

export default function Main() {
	const payoutAccounts: PayoutAccount[] = [
		{
			id: '1',
			type: 'bank',
			name: 'Chase Bank',
			details: '•••• •••• •••• 4567',
			isDefault: true,
			verified: true,
		},
		{
			id: '2',
			type: 'paypal',
			name: 'PayPal',
			details: 'john@example.com',
			isDefault: false,
			verified: true,
		},
	];

	const payoutHistory: PayoutHistory[] = [
		{ id: '1', date: 'Jan 20, 2026', amount: '$2,450.00', status: 'completed', method: 'Bank Transfer' },
		{ id: '2', date: 'Jan 18, 2026', amount: '$1,890.50', status: 'processing', method: 'Bank Transfer' },
		{ id: '3', date: 'Jan 15, 2026', amount: '$3,210.00', status: 'completed', method: 'PayPal' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<DollarSign className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Payout Settings</CardTitle>
											<CardDescription>
												Manage how you receive your earnings
											</CardDescription>
										</div>
									</div>
									<Button className="gap-2">
										<Plus className="size-4" />
										Add Account
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{payoutAccounts.map((account) => (
									<PayoutAccountCard key={account.id} {...account} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Payout Schedule</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="grid gap-4 @sm:grid-cols-2">
									<div className="space-y-2">
										<label className="text-sm font-medium">Frequency</label>
										<Select defaultValue="weekly">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="daily">Daily</SelectItem>
												<SelectItem value="weekly">Weekly</SelectItem>
												<SelectItem value="biweekly">Bi-weekly</SelectItem>
												<SelectItem value="monthly">Monthly</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Payout Day</label>
										<Select defaultValue="friday">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="monday">Monday</SelectItem>
												<SelectItem value="wednesday">Wednesday</SelectItem>
												<SelectItem value="friday">Friday</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">Minimum Payout</p>
										<p className="text-sm text-muted-foreground">
											Only process payouts above this amount
										</p>
									</div>
									<Select defaultValue="50">
										<SelectTrigger className="w-32">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="0">No minimum</SelectItem>
											<SelectItem value="50">$50</SelectItem>
											<SelectItem value="100">$100</SelectItem>
											<SelectItem value="500">$500</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">Auto-payout</p>
										<p className="text-sm text-muted-foreground">
											Automatically process on schedule
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6 text-center">
								<p className="text-sm text-muted-foreground">Available Balance</p>
								<p className="text-3xl font-bold text-primary mt-1">$4,892.50</p>
								<Button className="mt-4 w-full">Request Payout</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Recent Payouts</CardTitle>
									<Button variant="ghost" size="sm">
										View All
									</Button>
								</div>
							</CardHeader>
							<CardContent className="divide-y">
								{payoutHistory.map((payout) => (
									<PayoutHistoryRow key={payout.id} {...payout} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex items-center gap-4">
									<div className="flex-1">
										<p className="text-sm text-muted-foreground">This Month</p>
										<p className="text-xl font-bold">$7,550.50</p>
									</div>
									<div className="flex items-center gap-1 text-emerald-500 text-sm">
										<ArrowUp className="size-4" />
										+12%
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
