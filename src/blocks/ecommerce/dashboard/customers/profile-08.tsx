import {
	Calendar,
	ChevronRight,
	Clock,
	CreditCard,
	DollarSign,
	Edit2,
	Gift,
	Mail,
	MoreHorizontal,
	Package,
	Pause,
	Phone,
	Play,
	RefreshCw,
	Settings,
	XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SubscriptionProfile {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	subscription: {
		plan: string;
		status: 'active' | 'paused' | 'cancelled' | 'past-due';
		price: string;
		billingCycle: 'monthly' | 'quarterly' | 'annually';
		startDate: string;
		nextBilling: string;
		renewalDate: string;
	};
	usage: {
		current: number;
		limit: number;
		type: string;
	};
	billing: {
		method: string;
		last4: string;
		totalPaid: string;
		invoices: number;
	};
	history: Array<{
		id: string;
		action: string;
		date: string;
		details?: string;
	}>;
	addons: Array<{
		id: string;
		name: string;
		price: string;
		active: boolean;
	}>;
	mrr: string;
	lifetime: string;
}

const StatusBadge = ({ status }: { status: SubscriptionProfile['subscription']['status'] }) => {
	const config: Record<string, { label: string; className: string; icon: React.ElementType }> = {
		active: { label: 'Active', className: 'bg-emerald-500/10 text-emerald-500', icon: Play },
		paused: { label: 'Paused', className: 'bg-amber-500/10 text-amber-500', icon: Pause },
		cancelled: { label: 'Cancelled', className: 'bg-red-500/10 text-red-500', icon: XCircle },
		'past-due': { label: 'Past Due', className: 'bg-orange-500/10 text-orange-500', icon: Clock },
	};
	const { label, className, icon: Icon } = config[status];
	return (
		<Badge variant="outline" className={`${className} gap-1`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const UsageBar = ({ current, limit, type }: { current: number; limit: number; type: string }) => {
	const percentage = Math.min((current / limit) * 100, 100);
	const getColor = (p: number) => {
		if (p >= 90) return '[&>div]:bg-red-500';
		if (p >= 75) return '[&>div]:bg-amber-500';
		return '';
	};
	return (
		<div>
			<div className="flex items-center justify-between mb-2 text-sm">
				<span className="text-muted-foreground">{type} Usage</span>
				<span className="font-medium">{current} / {limit}</span>
			</div>
			<Progress value={percentage} className={`h-2 ${getColor(percentage)}`} />
		</div>
	);
};

const StatCard = ({
	label,
	value,
	icon: Icon,
	subtext,
}: {
	label: string;
	value: string;
	icon: React.ElementType;
	subtext?: string;
}) => (
	<div className="rounded-lg border bg-muted/30 p-4">
		<div className="flex items-center justify-between mb-2">
			<span className="text-muted-foreground text-sm">{label}</span>
			<Icon className="size-4 text-muted-foreground" />
		</div>
		<p className="text-2xl font-bold">{value}</p>
		{subtext && <p className="text-muted-foreground text-xs mt-1">{subtext}</p>}
	</div>
);

const AddonItem = ({ addon }: { addon: SubscriptionProfile['addons'][0] }) => (
	<div className="flex items-center justify-between py-2">
		<div className="flex items-center gap-2">
			<span className={`size-2 rounded-full ${addon.active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
			<span className="text-sm">{addon.name}</span>
		</div>
		<span className="text-sm font-medium">{addon.price}</span>
	</div>
);

const ProfileHeader = ({ profile }: { profile: SubscriptionProfile }) => (
	<div className="flex flex-col @md:flex-row gap-6">
		<Avatar className="size-20">
			<AvatarImage src={profile.avatar} alt={profile.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-2xl">
				{profile.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex flex-col @md:flex-row @md:items-start @md:justify-between gap-4">
				<div>
					<div className="flex items-center gap-3 mb-2">
						<h1 className="text-2xl font-bold">{profile.name}</h1>
						<StatusBadge status={profile.subscription.status} />
					</div>
					<div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
						<span className="flex items-center gap-1.5">
							<Mail className="size-4" />
							{profile.email}
						</span>
						<span className="flex items-center gap-1.5">
							<Phone className="size-4" />
							{profile.phone}
						</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					{profile.subscription.status === 'active' && (
						<Button variant="outline" size="sm" className="gap-1.5">
							<Pause className="size-3.5" />
							Pause
						</Button>
					)}
					{profile.subscription.status === 'paused' && (
						<Button variant="default" size="sm" className="gap-1.5">
							<Play className="size-3.5" />
							Resume
						</Button>
					)}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon-sm">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>Change plan</DropdownMenuItem>
							<DropdownMenuItem>View invoices</DropdownMenuItem>
							<DropdownMenuItem>Update payment</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-red-500">Cancel subscription</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	</div>
);

const SubscriptionCard = ({ subscription }: { subscription: SubscriptionProfile['subscription'] }) => (
	<Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
		<CardContent className="p-6">
			<div className="flex items-start justify-between mb-4">
				<div>
					<p className="text-muted-foreground text-sm">Current Plan</p>
					<p className="text-2xl font-bold">{subscription.plan}</p>
				</div>
				<div className="text-right">
					<p className="text-3xl font-bold text-primary">{subscription.price}</p>
					<p className="text-sm text-muted-foreground capitalize">/{subscription.billingCycle}</p>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4 text-sm">
				<div>
					<p className="text-muted-foreground">Started</p>
					<p className="font-medium">{subscription.startDate}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Next billing</p>
					<p className="font-medium">{subscription.nextBilling}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Renewal</p>
					<p className="font-medium">{subscription.renewalDate}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profile: SubscriptionProfile = {
		id: '1',
		name: 'Michael Chen',
		email: 'michael.c@email.com',
		phone: '+1 555-0234',
		initials: 'MC',
		subscription: {
			plan: 'Professional',
			status: 'active',
			price: '$49',
			billingCycle: 'monthly',
			startDate: 'Jan 15, 2023',
			nextBilling: 'Feb 15, 2024',
			renewalDate: 'Jan 15, 2025',
		},
		usage: {
			current: 8500,
			limit: 10000,
			type: 'API Calls',
		},
		billing: {
			method: 'Visa',
			last4: '4242',
			totalPaid: '$588',
			invoices: 12,
		},
		history: [
			{ id: '1', action: 'Payment processed', date: 'Jan 15, 2024', details: '$49.00' },
			{ id: '2', action: 'Plan upgraded', date: 'Dec 10, 2023', details: 'Basic → Professional' },
			{ id: '3', action: 'Added addon', date: 'Nov 5, 2023', details: 'Priority Support' },
			{ id: '4', action: 'Subscription started', date: 'Jan 15, 2023' },
		],
		addons: [
			{ id: '1', name: 'Priority Support', price: '+$19/mo', active: true },
			{ id: '2', name: 'Extended Storage', price: '+$9/mo', active: true },
			{ id: '3', name: 'White Label', price: '+$29/mo', active: false },
		],
		mrr: '$77',
		lifetime: '$588',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<ProfileHeader profile={profile} />

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2">
						<SubscriptionCard subscription={profile.subscription} />
					</div>
					<Card>
						<CardContent className="p-6">
							<UsageBar
								current={profile.usage.current}
								limit={profile.usage.limit}
								type={profile.usage.type}
							/>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<StatCard label="MRR" value={profile.mrr} icon={DollarSign} subtext="Monthly recurring" />
					<StatCard label="Lifetime Value" value={profile.lifetime} icon={CreditCard} subtext={`${profile.billing.invoices} invoices`} />
					<StatCard label="Payment Method" value={`•••• ${profile.billing.last4}`} icon={CreditCard} subtext={profile.billing.method} />
					<StatCard label="Next Invoice" value={profile.subscription.price} icon={Calendar} subtext={profile.subscription.nextBilling} />
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<Gift className="size-4" />
								Add-ons
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="divide-y">
								{profile.addons.map((addon) => (
									<AddonItem key={addon.id} addon={addon} />
								))}
							</div>
							<Button variant="outline" size="sm" className="w-full mt-4 gap-1.5">
								<Settings className="size-3.5" />
								Manage Add-ons
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<Clock className="size-4" />
								History
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{profile.history.map((event) => (
								<div key={event.id} className="flex items-start justify-between text-sm">
									<div>
										<p className="font-medium">{event.action}</p>
										{event.details && <p className="text-muted-foreground text-xs">{event.details}</p>}
									</div>
									<span className="text-muted-foreground text-xs whitespace-nowrap">{event.date}</span>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
