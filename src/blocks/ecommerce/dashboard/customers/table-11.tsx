import {
	ArrowUpDown,
	ChevronLeft,
	ChevronRight,
	Download,
	Filter,
	Gift,
	Mail,
	MoreHorizontal,
	Plus,
	Search,
	Star,
	Trophy,
	Zap,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

interface CustomerRewards {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	points: number;
	pointsThisMonth: number;
	tier: 'starter' | 'silver' | 'gold' | 'platinum' | 'diamond';
	tierProgress: number;
	rewardsRedeemed: number;
	rewardsPending: number;
	referrals: number;
	lastActivity: string;
}

const TierConfig = {
	starter: { label: 'Starter', color: 'bg-slate-500', textColor: 'text-slate-500', icon: Star },
	silver: { label: 'Silver', color: 'bg-slate-400', textColor: 'text-slate-400', icon: Star },
	gold: { label: 'Gold', color: 'bg-amber-500', textColor: 'text-amber-500', icon: Trophy },
	platinum: { label: 'Platinum', color: 'bg-violet-500', textColor: 'text-violet-500', icon: Trophy },
	diamond: { label: 'Diamond', color: 'bg-cyan-400', textColor: 'text-cyan-400', icon: Zap },
};

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
		<div className="flex gap-2">
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
			<Button className="gap-2">
				<Plus className="size-4" />
				Add Points
			</Button>
		</div>
	</div>
);

const FilterAndSearch = ({
	searchPlaceholder,
}: {
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center">
		<div className="relative flex-1">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="max-w-sm pl-9" />
		</div>
		<div className="flex gap-2">
			<Button variant="outline" size="sm" className="gap-2">
				<Filter className="size-4" />
				Filter
			</Button>
			<Button variant="outline" size="sm" className="gap-2">
				<ArrowUpDown className="size-4" />
				Sort
			</Button>
		</div>
	</div>
);

const TierBadge = ({ tier }: { tier: CustomerRewards['tier'] }) => {
	const config = TierConfig[tier];
	const Icon = config.icon;
	return (
		<Badge variant="outline" className={`${config.textColor} border-current/20 gap-1`}>
			<Icon className="size-3" />
			{config.label}
		</Badge>
	);
};

const TierProgress = ({
	progress,
	tier,
}: {
	progress: number;
	tier: CustomerRewards['tier'];
}) => {
	const config = TierConfig[tier];
	return (
		<div className="space-y-1 min-w-[100px]">
			<Progress value={progress} className="h-1.5" />
			<p className="text-muted-foreground text-xs">{progress}% to next tier</p>
		</div>
	);
};

const PointsDisplay = ({
	points,
	change,
}: {
	points: number;
	change: number;
}) => (
	<div className="space-y-0.5">
		<p className="font-semibold">{points.toLocaleString()}</p>
		<p className="text-emerald-500 text-xs">+{change.toLocaleString()} this month</p>
	</div>
);

const CustomerRow = ({ customer }: { customer: CustomerRewards }) => (
	<TableRow className="group">
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative">
					<Avatar className="size-9">
						<AvatarImage src={customer.customer.avatar} alt={customer.customer.name} />
						<AvatarFallback className="bg-primary/10 text-primary text-xs">
							{customer.customer.initials}
						</AvatarFallback>
					</Avatar>
					<div
						className={`absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 border-background ${TierConfig[customer.tier].color}`}
					/>
				</div>
				<div>
					<p className="font-medium">{customer.customer.name}</p>
					<p className="text-muted-foreground text-xs">{customer.customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<PointsDisplay points={customer.points} change={customer.pointsThisMonth} />
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<TierBadge tier={customer.tier} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<TierProgress progress={customer.tierProgress} tier={customer.tier} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<div className="flex items-center gap-4 text-sm">
				<div className="flex items-center gap-1">
					<Gift className="text-muted-foreground size-3.5" />
					<span>{customer.rewardsRedeemed}</span>
				</div>
				{customer.rewardsPending > 0 && (
					<Badge variant="secondary" className="text-xs">
						{customer.rewardsPending} pending
					</Badge>
				)}
			</div>
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<div className="flex items-center gap-1 text-sm">
				<Mail className="text-muted-foreground size-3.5" />
				<span>{customer.referrals}</span>
			</div>
		</TableCell>
		<TableCell className="hidden @2xl:table-cell text-muted-foreground text-sm">
			{customer.lastActivity}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View rewards history</DropdownMenuItem>
					<DropdownMenuItem>Add bonus points</DropdownMenuItem>
					<DropdownMenuItem>Upgrade tier</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Send reward notification</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

const Pagination = () => (
	<div className="flex items-center justify-between border-t px-6 py-4">
		<p className="text-muted-foreground text-sm">Showing 1-10 of 156 customers</p>
		<div className="flex items-center gap-1">
			<Button variant="outline" size="icon-sm">
				<ChevronLeft className="size-4" />
			</Button>
			<Button variant="outline" size="sm" className="size-8">
				1
			</Button>
			<Button variant="ghost" size="sm" className="size-8">
				2
			</Button>
			<Button variant="ghost" size="sm" className="size-8">
				3
			</Button>
			<Button variant="outline" size="icon-sm">
				<ChevronRight className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const customers: CustomerRewards[] = [
		{
			id: '1',
			customer: { name: 'Alexandra Kim', email: 'alex.k@email.com', initials: 'AK' },
			points: 25400,
			pointsThisMonth: 1240,
			tier: 'diamond',
			tierProgress: 85,
			rewardsRedeemed: 12,
			rewardsPending: 2,
			referrals: 8,
			lastActivity: '2 hours ago',
		},
		{
			id: '2',
			customer: { name: 'Brandon Lee', email: 'brandon.l@email.com', initials: 'BL' },
			points: 18500,
			pointsThisMonth: 890,
			tier: 'platinum',
			tierProgress: 62,
			rewardsRedeemed: 8,
			rewardsPending: 1,
			referrals: 5,
			lastActivity: '1 day ago',
		},
		{
			id: '3',
			customer: { name: 'Christina Park', email: 'christina.p@email.com', initials: 'CP' },
			points: 9800,
			pointsThisMonth: 450,
			tier: 'gold',
			tierProgress: 45,
			rewardsRedeemed: 5,
			rewardsPending: 0,
			referrals: 3,
			lastActivity: '3 days ago',
		},
		{
			id: '4',
			customer: { name: 'Derek Wang', email: 'derek.w@email.com', initials: 'DW' },
			points: 4200,
			pointsThisMonth: 320,
			tier: 'silver',
			tierProgress: 78,
			rewardsRedeemed: 2,
			rewardsPending: 1,
			referrals: 1,
			lastActivity: '1 week ago',
		},
		{
			id: '5',
			customer: { name: 'Elena Martinez', email: 'elena.m@email.com', initials: 'EM' },
			points: 890,
			pointsThisMonth: 180,
			tier: 'starter',
			tierProgress: 35,
			rewardsRedeemed: 1,
			rewardsPending: 0,
			referrals: 0,
			lastActivity: '2 weeks ago',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Rewards Program"
					subtitle="Manage customer rewards, points, and tier progression"
				/>

				<div className="overflow-hidden rounded-xl border bg-card">
					<FilterAndSearch searchPlaceholder="Search customers..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Points</TableHead>
								<TableHead className="hidden @md:table-cell">Tier</TableHead>
								<TableHead className="hidden @lg:table-cell">Progress</TableHead>
								<TableHead className="hidden @xl:table-cell">Rewards</TableHead>
								<TableHead className="hidden @xl:table-cell">Referrals</TableHead>
								<TableHead className="hidden @2xl:table-cell">Last Activity</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{customers.map((customer) => (
								<CustomerRow key={customer.id} customer={customer} />
							))}
						</TableBody>
					</Table>
					<Pagination />
				</div>
			</div>
		</section>
	);
}
