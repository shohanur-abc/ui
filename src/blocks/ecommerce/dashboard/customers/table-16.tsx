import {
	ArrowDown,
	ArrowUp,
	Check,
	ChevronDown,
	Copy,
	Download,
	ExternalLink,
	Gift,
	Link,
	Mail,
	MoreHorizontal,
	Search,
	Share2,
	Trophy,
	UserPlus,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';

interface CustomerReferral {
	id: string;
	referrer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	referralCode: string;
	totalReferrals: number;
	successfulReferrals: number;
	pendingReferrals: number;
	earnings: string;
	pendingEarnings: string;
	tier: 'bronze' | 'silver' | 'gold' | 'platinum';
	conversionRate: number;
	lastReferral: string;
}

const ReferralStats = ({
	stats,
}: {
	stats: {
		title: string;
		value: string;
		change: string;
		changeType: 'up' | 'down';
		icon: React.ElementType;
	}[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
		{stats.map((stat, i) => (
			<Card key={i} className="py-4">
				<CardContent className="px-4">
					<div className="flex items-center justify-between">
						<stat.icon className="text-muted-foreground size-5" />
						<div
							className={`flex items-center gap-1 text-xs ${
								stat.changeType === 'up' ? 'text-emerald-500' : 'text-red-500'
							}`}
						>
							{stat.changeType === 'up' ? (
								<ArrowUp className="size-3" />
							) : (
								<ArrowDown className="size-3" />
							)}
							{stat.change}
						</div>
					</div>
					<p className="mt-2 text-2xl font-bold">{stat.value}</p>
					<p className="text-muted-foreground text-sm">{stat.title}</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const FilterBar = ({ searchPlaceholder }: { searchPlaceholder: string }) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-72" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Tier
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Tiers</DropdownMenuItem>
					<DropdownMenuItem>Bronze</DropdownMenuItem>
					<DropdownMenuItem>Silver</DropdownMenuItem>
					<DropdownMenuItem>Gold</DropdownMenuItem>
					<DropdownMenuItem>Platinum</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
		</div>
	</div>
);

const TierBadge = ({ tier }: { tier: CustomerReferral['tier'] }) => {
	const config = {
		bronze: {
			label: 'Bronze',
			className: 'bg-amber-700/10 text-amber-700 border-amber-700/20',
		},
		silver: {
			label: 'Silver',
			className: 'bg-slate-400/10 text-slate-400 border-slate-400/20',
		},
		gold: {
			label: 'Gold',
			className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
		},
		platinum: {
			label: 'Platinum',
			className: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
		},
	};
	return (
		<Badge variant="outline" className={`${config[tier].className} gap-1`}>
			<Trophy className="size-3" />
			{config[tier].label}
		</Badge>
	);
};

const ReferralCode = ({ code }: { code: string }) => (
	<div className="flex items-center gap-2">
		<code className="bg-muted rounded px-2 py-1 text-xs font-medium">
			{code}
		</code>
		<Button variant="ghost" size="icon-sm">
			<Copy className="size-3.5" />
		</Button>
	</div>
);

const ReferralStats2 = ({
	successful,
	pending,
}: {
	successful: number;
	pending: number;
}) => (
	<div className="flex items-center gap-3 text-sm">
		<span className="text-emerald-500 flex items-center gap-1">
			<Check className="size-3.5" />
			{successful}
		</span>
		<span className="text-muted-foreground">{pending} pending</span>
	</div>
);

const ConversionBar = ({ rate }: { rate: number }) => (
	<div className="space-y-1 min-w-[80px]">
		<Progress value={rate} className="h-1.5" />
		<p className="text-muted-foreground text-xs">{rate}%</p>
	</div>
);

const ReferralRow = ({ referral }: { referral: CustomerReferral }) => (
	<TableRow className="group">
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage
						src={referral.referrer.avatar}
						alt={referral.referrer.name}
					/>
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{referral.referrer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{referral.referrer.name}</p>
					<p className="text-muted-foreground text-xs">
						{referral.referrer.email}
					</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<ReferralCode code={referral.referralCode} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<TierBadge tier={referral.tier} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<ReferralStats2
				successful={referral.successfulReferrals}
				pending={referral.pendingReferrals}
			/>
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<ConversionBar rate={referral.conversionRate} />
		</TableCell>
		<TableCell>
			<div>
				<p className="font-semibold text-emerald-500">{referral.earnings}</p>
				{referral.pendingEarnings !== '$0' && (
					<p className="text-muted-foreground text-xs">
						{referral.pendingEarnings} pending
					</p>
				)}
			</div>
		</TableCell>
		<TableCell className="hidden @2xl:table-cell text-muted-foreground text-sm">
			{referral.lastReferral}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<ExternalLink className="mr-2 size-4" />
						View referral history
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link className="mr-2 size-4" />
						Copy referral link
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Mail className="mr-2 size-4" />
						Send invite email
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Gift className="mr-2 size-4" />
						Award bonus
					</DropdownMenuItem>
					<DropdownMenuItem>Upgrade tier</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const stats = [
		{
			title: 'Total Referrers',
			value: '2,456',
			change: '+18%',
			changeType: 'up' as const,
			icon: Users,
		},
		{
			title: 'Successful Referrals',
			value: '8,234',
			change: '+24%',
			changeType: 'up' as const,
			icon: UserPlus,
		},
		{
			title: 'Total Payouts',
			value: '$45.2K',
			change: '+15%',
			changeType: 'up' as const,
			icon: Gift,
		},
		{
			title: 'Conversion Rate',
			value: '34%',
			change: '+5%',
			changeType: 'up' as const,
			icon: Share2,
		},
	];

	const referrals: CustomerReferral[] = [
		{
			id: '1',
			referrer: {
				name: 'Quinn Adams',
				email: 'quinn.a@email.com',
				initials: 'QA',
			},
			referralCode: 'QUINN2024',
			totalReferrals: 45,
			successfulReferrals: 38,
			pendingReferrals: 7,
			earnings: '$1,140',
			pendingEarnings: '$210',
			tier: 'platinum',
			conversionRate: 84,
			lastReferral: '2 hours ago',
		},
		{
			id: '2',
			referrer: {
				name: 'Rachel Brown',
				email: 'rachel.b@email.com',
				initials: 'RB',
			},
			referralCode: 'RACHEL100',
			totalReferrals: 28,
			successfulReferrals: 22,
			pendingReferrals: 6,
			earnings: '$660',
			pendingEarnings: '$180',
			tier: 'gold',
			conversionRate: 78,
			lastReferral: '1 day ago',
		},
		{
			id: '3',
			referrer: {
				name: 'Samuel Lee',
				email: 'samuel.l@email.com',
				initials: 'SL',
			},
			referralCode: 'SAMREF',
			totalReferrals: 15,
			successfulReferrals: 10,
			pendingReferrals: 5,
			earnings: '$300',
			pendingEarnings: '$150',
			tier: 'silver',
			conversionRate: 66,
			lastReferral: '3 days ago',
		},
		{
			id: '4',
			referrer: {
				name: 'Tina Wilson',
				email: 'tina.w@email.com',
				initials: 'TW',
			},
			referralCode: 'TINAW',
			totalReferrals: 8,
			successfulReferrals: 5,
			pendingReferrals: 3,
			earnings: '$150',
			pendingEarnings: '$90',
			tier: 'bronze',
			conversionRate: 62,
			lastReferral: '1 week ago',
		},
		{
			id: '5',
			referrer: { name: 'Uma Patel', email: 'uma.p@email.com', initials: 'UP' },
			referralCode: 'UMA2024',
			totalReferrals: 32,
			successfulReferrals: 28,
			pendingReferrals: 4,
			earnings: '$840',
			pendingEarnings: '$120',
			tier: 'gold',
			conversionRate: 87,
			lastReferral: '5 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">
						Referral Program
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage customer referrals and track affiliate performance
					</p>
				</div>

				<ReferralStats stats={stats} />

				<div className="overflow-hidden rounded-xl border bg-card">
					<FilterBar searchPlaceholder="Search referrers..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead>Referrer</TableHead>
								<TableHead className="hidden @md:table-cell">Code</TableHead>
								<TableHead className="hidden @lg:table-cell">Tier</TableHead>
								<TableHead className="hidden @lg:table-cell">
									Referrals
								</TableHead>
								<TableHead className="hidden @xl:table-cell">
									Conv. Rate
								</TableHead>
								<TableHead>Earnings</TableHead>
								<TableHead className="hidden @2xl:table-cell">
									Last Referral
								</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{referrals.map((referral) => (
								<ReferralRow key={referral.id} referral={referral} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
