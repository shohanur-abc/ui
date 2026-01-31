import {
	Clock,
	Link,
	Mail,
	MoreHorizontal,
	RefreshCw,
	Share2,
	ShoppingBag,
	Star,
	Trophy,
	UserPlus,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ReferralCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	referralCode: string;
	tier: 'starter' | 'advocate' | 'champion' | 'ambassador';
	referrals: {
		total: number;
		successful: number;
		pending: number;
		conversionRate: number;
	};
	earnings: {
		total: string;
		pending: string;
		lastPayout: string;
	};
	referredCustomers: Array<{
		name: string;
		initials: string;
	}>;
	joinedVia?: string;
}

const TierConfig = {
	starter: { label: 'Starter', color: 'text-slate-400', bg: 'bg-slate-400/10', minRefs: 0 },
	advocate: { label: 'Advocate', color: 'text-blue-500', bg: 'bg-blue-500/10', minRefs: 5 },
	champion: { label: 'Champion', color: 'text-amber-500', bg: 'bg-amber-500/10', minRefs: 15 },
	ambassador: { label: 'Ambassador', color: 'text-violet-500', bg: 'bg-violet-500/10', minRefs: 30 },
};

const TierBadge = ({ tier }: { tier: ReferralCustomer['tier'] }) => {
	const config = TierConfig[tier];
	return (
		<Badge variant="outline" className={`${config.color} border-current/30 gap-1`}>
			<Trophy className="size-3" />
			{config.label}
		</Badge>
	);
};

const ReferredAvatars = ({
	customers,
}: {
	customers: ReferralCustomer['referredCustomers'];
}) => {
	const maxDisplay = 3;
	const remaining = customers.length - maxDisplay;
	return (
		<div className="flex items-center">
			<div className="flex -space-x-2">
				{customers.slice(0, maxDisplay).map((customer, index) => (
					<Avatar key={index} className="size-7 border-2 border-background">
						<AvatarFallback className="bg-primary/10 text-primary text-xs">
							{customer.initials}
						</AvatarFallback>
					</Avatar>
				))}
			</div>
			{remaining > 0 && (
				<span className="text-muted-foreground text-xs ml-2">+{remaining} more</span>
			)}
		</div>
	);
};

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="bg-primary/10 text-primary rounded-lg p-2.5">
			<Share2 className="size-5" />
		</div>
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
	</div>
);

const ReferralListItem = ({ customer }: { customer: ReferralCustomer }) => (
	<div className="group flex flex-col @lg:flex-row @lg:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3 min-w-0">
			<Avatar className="size-11">
				<AvatarImage src={customer.avatar} alt={customer.name} />
				<AvatarFallback className="bg-primary/10 text-primary">
					{customer.initials}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<p className="font-semibold truncate">{customer.name}</p>
					<TierBadge tier={customer.tier} />
				</div>
				<p className="text-muted-foreground text-sm truncate">{customer.email}</p>
			</div>
		</div>
		<div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5">
			<code className="font-mono text-sm font-medium">{customer.referralCode}</code>
			<Button variant="ghost" size="icon-sm" className="size-6">
				<Link className="size-3" />
			</Button>
		</div>
		<div className="flex-1 grid grid-cols-2 @md:grid-cols-4 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground text-xs">Successful</p>
				<p className="font-semibold text-emerald-500">{customer.referrals.successful}</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs">Pending</p>
				<p className="font-semibold text-amber-500">{customer.referrals.pending}</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs">Conv. Rate</p>
				<p className="font-semibold">{customer.referrals.conversionRate}%</p>
			</div>
			<div>
				<p className="text-muted-foreground text-xs">Earned</p>
				<p className="font-semibold text-primary">{customer.earnings.total}</p>
			</div>
		</div>
		<div className="hidden @xl:block min-w-[150px]">
			<p className="text-muted-foreground text-xs mb-1">Referred Customers</p>
			<ReferredAvatars customers={customer.referredCustomers} />
		</div>
		<div className="flex items-center gap-2">
			<Button variant="outline" size="sm" className="hidden @md:flex gap-1.5">
				<Mail className="size-3.5" />
				Invite
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View referral history</DropdownMenuItem>
					<DropdownMenuItem>View earnings</DropdownMenuItem>
					<DropdownMenuItem>Copy referral link</DropdownMenuItem>
					<DropdownMenuItem>Upgrade tier</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

export default function Main() {
	const customers: ReferralCustomer[] = [
		{
			id: '1',
			name: 'Patricia Young',
			email: 'patricia.y@email.com',
			initials: 'PY',
			referralCode: 'PATRICIA50',
			tier: 'ambassador',
			referrals: { total: 52, successful: 48, pending: 4, conversionRate: 92 },
			earnings: { total: '$2,400', pending: '$200', lastPayout: '1 week ago' },
			referredCustomers: [
				{ name: 'John D.', initials: 'JD' },
				{ name: 'Lisa M.', initials: 'LM' },
				{ name: 'Tom K.', initials: 'TK' },
				{ name: 'Anna S.', initials: 'AS' },
				{ name: 'Mike R.', initials: 'MR' },
			],
		},
		{
			id: '2',
			name: 'Quinn Harper',
			email: 'quinn.h@email.com',
			initials: 'QH',
			referralCode: 'QUINN25',
			tier: 'champion',
			referrals: { total: 28, successful: 22, pending: 6, conversionRate: 78 },
			earnings: { total: '$1,100', pending: '$300', lastPayout: '2 weeks ago' },
			referredCustomers: [
				{ name: 'Eva L.', initials: 'EL' },
				{ name: 'Sam W.', initials: 'SW' },
				{ name: 'Kate B.', initials: 'KB' },
			],
		},
		{
			id: '3',
			name: 'Rebecca Stone',
			email: 'rebecca.s@email.com',
			initials: 'RS',
			referralCode: 'REBECCA15',
			tier: 'champion',
			referrals: { total: 20, successful: 16, pending: 4, conversionRate: 80 },
			earnings: { total: '$800', pending: '$200', lastPayout: '3 days ago' },
			referredCustomers: [
				{ name: 'Chris T.', initials: 'CT' },
				{ name: 'Dana P.', initials: 'DP' },
			],
		},
		{
			id: '4',
			name: 'Samuel Turner',
			email: 'samuel.t@email.com',
			initials: 'ST',
			referralCode: 'SAMUEL10',
			tier: 'advocate',
			referrals: { total: 12, successful: 8, pending: 4, conversionRate: 66 },
			earnings: { total: '$400', pending: '$200', lastPayout: '1 month ago' },
			referredCustomers: [
				{ name: 'Ryan H.', initials: 'RH' },
			],
		},
		{
			id: '5',
			name: 'Teresa Kim',
			email: 'teresa.k@email.com',
			initials: 'TK',
			referralCode: 'TERESA5',
			tier: 'advocate',
			referrals: { total: 8, successful: 6, pending: 2, conversionRate: 75 },
			earnings: { total: '$300', pending: '$100', lastPayout: '2 weeks ago' },
			referredCustomers: [
				{ name: 'Paul M.', initials: 'PM' },
				{ name: 'Nina L.', initials: 'NL' },
			],
		},
		{
			id: '6',
			name: 'Victor Chen',
			email: 'victor.c@email.com',
			initials: 'VC',
			referralCode: 'VICTOR',
			tier: 'starter',
			referrals: { total: 3, successful: 2, pending: 1, conversionRate: 66 },
			earnings: { total: '$100', pending: '$50', lastPayout: 'N/A' },
			referredCustomers: [
				{ name: 'Amy Z.', initials: 'AZ' },
			],
		},
		{
			id: '7',
			name: 'Wendy Liu',
			email: 'wendy.l@email.com',
			initials: 'WL',
			referralCode: 'WENDY',
			tier: 'starter',
			referrals: { total: 2, successful: 1, pending: 1, conversionRate: 50 },
			earnings: { total: '$50', pending: '$50', lastPayout: 'N/A' },
			referredCustomers: [
				{ name: 'Jack B.', initials: 'JB' },
			],
			joinedVia: 'PATRICIA50',
		},
		{
			id: '8',
			name: 'Xavier Ross',
			email: 'xavier.r@email.com',
			initials: 'XR',
			referralCode: 'XAVIER',
			tier: 'advocate',
			referrals: { total: 10, successful: 7, pending: 3, conversionRate: 70 },
			earnings: { total: '$350', pending: '$150', lastPayout: '1 week ago' },
			referredCustomers: [
				{ name: 'Bella F.', initials: 'BF' },
				{ name: 'Cody S.', initials: 'CS' },
			],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Referral Program"
					subtitle="Customer referrals and earnings"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<ReferralListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
