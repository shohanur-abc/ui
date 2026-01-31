import {
	Check,
	Copy,
	Gift,
	Link,
	Mail,
	MoreHorizontal,
	Share2,
	Trophy,
	UserPlus,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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
	tier: 'bronze' | 'silver' | 'gold' | 'platinum';
	totalReferrals: number;
	successfulReferrals: number;
	pendingReferrals: number;
	totalEarnings: string;
	pendingEarnings: string;
	conversionRate: number;
	referralLink: string;
	topReferredProducts: string[];
}

const TierConfig = {
	bronze: { label: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-700/10', minRefs: 0 },
	silver: { label: 'Silver', color: 'text-slate-400', bg: 'bg-slate-400/10', minRefs: 5 },
	gold: { label: 'Gold', color: 'text-amber-500', bg: 'bg-amber-500/10', minRefs: 15 },
	platinum: { label: 'Platinum', color: 'text-violet-500', bg: 'bg-violet-500/10', minRefs: 30 },
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

const TierBadge = ({ tier }: { tier: ReferralCustomer['tier'] }) => {
	const config = TierConfig[tier];
	return (
		<Badge variant="outline" className={`${config.color} border-current/20 gap-1`}>
			<Trophy className="size-3" />
			{config.label}
		</Badge>
	);
};

const ReferralStats = ({
	successful,
	pending,
	total,
}: {
	successful: number;
	pending: number;
	total: number;
}) => (
	<div className="flex items-center gap-4 text-sm">
		<div className="text-center">
			<p className="text-lg font-bold text-emerald-500">{successful}</p>
			<p className="text-muted-foreground text-xs">Successful</p>
		</div>
		<div className="h-8 w-px bg-border" />
		<div className="text-center">
			<p className="text-lg font-bold text-amber-500">{pending}</p>
			<p className="text-muted-foreground text-xs">Pending</p>
		</div>
		<div className="h-8 w-px bg-border" />
		<div className="text-center">
			<p className="text-lg font-bold">{total}</p>
			<p className="text-muted-foreground text-xs">Total</p>
		</div>
	</div>
);

const ConversionRateBar = ({ rate }: { rate: number }) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between text-xs">
			<span className="text-muted-foreground">Conversion Rate</span>
			<span className="font-semibold">{rate}%</span>
		</div>
		<Progress value={rate} className="h-1.5" />
	</div>
);

const ReferralCodeDisplay = ({ code }: { code: string }) => (
	<div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2">
		<code className="flex-1 font-mono text-sm font-medium">{code}</code>
		<Button variant="ghost" size="icon-sm">
			<Copy className="size-3.5" />
		</Button>
	</div>
);

const EarningsDisplay = ({
	total,
	pending,
}: {
	total: string;
	pending: string;
}) => (
	<div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/30 p-3">
		<div>
			<p className="text-muted-foreground text-xs">Total Earned</p>
			<p className="text-lg font-bold text-emerald-500">{total}</p>
		</div>
		<div>
			<p className="text-muted-foreground text-xs">Pending</p>
			<p className="text-lg font-bold text-amber-500">{pending}</p>
		</div>
	</div>
);

const ReferralCard = ({ customer }: { customer: ReferralCustomer }) => (
	<Card className="group transition-shadow hover:shadow-lg">
		<CardHeader className="pb-3">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-12">
						<AvatarImage src={customer.avatar} alt={customer.name} />
						<AvatarFallback className="bg-primary/10 text-primary">
							{customer.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold">{customer.name}</p>
						<p className="text-muted-foreground text-xs">{customer.email}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>View profile</DropdownMenuItem>
						<DropdownMenuItem>View referral history</DropdownMenuItem>
						<DropdownMenuItem>Upgrade tier</DropdownMenuItem>
						<DropdownMenuItem>Award bonus</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<TierBadge tier={customer.tier} />
				<ReferralStats
					successful={customer.successfulReferrals}
					pending={customer.pendingReferrals}
					total={customer.totalReferrals}
				/>
			</div>
			<ReferralCodeDisplay code={customer.referralCode} />
			<ConversionRateBar rate={customer.conversionRate} />
			<EarningsDisplay total={customer.totalEarnings} pending={customer.pendingEarnings} />
			<div className="flex flex-wrap gap-1">
				<p className="text-muted-foreground mr-1 text-xs">Top products:</p>
				{customer.topReferredProducts.map((product) => (
					<Badge key={product} variant="secondary" className="text-xs">
						{product}
					</Badge>
				))}
			</div>
		</CardContent>
		<CardFooter className="grid grid-cols-2 gap-2 border-t bg-muted/20 px-4 py-3">
			<Button variant="outline" size="sm" className="gap-1.5">
				<Link className="size-3.5" />
				Copy Link
			</Button>
			<Button size="sm" className="gap-1.5">
				<Mail className="size-3.5" />
				Send Invite
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const customers: ReferralCustomer[] = [
		{
			id: '1',
			name: 'Jessica Taylor',
			email: 'jessica.t@email.com',
			initials: 'JT',
			referralCode: 'JESSICA50',
			tier: 'platinum',
			totalReferrals: 48,
			successfulReferrals: 42,
			pendingReferrals: 6,
			totalEarnings: '$2,100',
			pendingEarnings: '$300',
			conversionRate: 87,
			referralLink: 'shop.com/ref/jessica50',
			topReferredProducts: ['Electronics', 'Fashion'],
		},
		{
			id: '2',
			name: 'Andrew Miller',
			email: 'andrew.m@email.com',
			initials: 'AM',
			referralCode: 'ANDREW25',
			tier: 'gold',
			totalReferrals: 28,
			successfulReferrals: 22,
			pendingReferrals: 6,
			totalEarnings: '$1,100',
			pendingEarnings: '$300',
			conversionRate: 78,
			referralLink: 'shop.com/ref/andrew25',
			topReferredProducts: ['Tech', 'Gaming'],
		},
		{
			id: '3',
			name: 'Samantha Lee',
			email: 'samantha.l@email.com',
			initials: 'SL',
			referralCode: 'SAMLEE',
			tier: 'gold',
			totalReferrals: 19,
			successfulReferrals: 15,
			pendingReferrals: 4,
			totalEarnings: '$750',
			pendingEarnings: '$200',
			conversionRate: 79,
			referralLink: 'shop.com/ref/samlee',
			topReferredProducts: ['Beauty', 'Wellness'],
		},
		{
			id: '4',
			name: 'Brandon Scott',
			email: 'brandon.s@email.com',
			initials: 'BS',
			referralCode: 'BSCOTT',
			tier: 'silver',
			totalReferrals: 12,
			successfulReferrals: 8,
			pendingReferrals: 4,
			totalEarnings: '$400',
			pendingEarnings: '$200',
			conversionRate: 66,
			referralLink: 'shop.com/ref/bscott',
			topReferredProducts: ['Sports'],
		},
		{
			id: '5',
			name: 'Rachel Adams',
			email: 'rachel.a@email.com',
			initials: 'RA',
			referralCode: 'RACHEL10',
			tier: 'silver',
			totalReferrals: 8,
			successfulReferrals: 6,
			pendingReferrals: 2,
			totalEarnings: '$300',
			pendingEarnings: '$100',
			conversionRate: 75,
			referralLink: 'shop.com/ref/rachel10',
			topReferredProducts: ['Home', 'Kitchen'],
		},
		{
			id: '6',
			name: 'Derek Chen',
			email: 'derek.c@email.com',
			initials: 'DC',
			referralCode: 'DEREK5',
			tier: 'bronze',
			totalReferrals: 4,
			successfulReferrals: 3,
			pendingReferrals: 1,
			totalEarnings: '$150',
			pendingEarnings: '$50',
			conversionRate: 75,
			referralLink: 'shop.com/ref/derek5',
			topReferredProducts: ['Books'],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Top Referrers"
					subtitle="Customers with the most successful referrals"
				/>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<ReferralCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
