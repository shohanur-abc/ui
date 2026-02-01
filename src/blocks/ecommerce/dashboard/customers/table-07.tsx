import {
	ArrowDownUp,
	CalendarDays,
	CircleDollarSign,
	Clock,
	ExternalLink,
	Eye,
	FileText,
	Heart,
	MoreVertical,
	Package,
	Repeat,
	Search,
	Settings,
	ShoppingBag,
	Star,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface CustomerBehavior {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	lastVisit: string;
	pageViews: number;
	timeOnSite: string;
	cartAbandoned: number;
	wishlistItems: number;
	reviewsGiven: number;
	repeatPurchases: number;
	engagementScore: 'high' | 'medium' | 'low';
}

const PageHeader = ({
	title,
	actions,
}: {
	title: string;
	actions: {
		label: string;
		icon: React.ElementType;
		variant?: 'outline' | 'default';
	}[];
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
		<div className="flex items-center gap-2">
			{actions.map((action, i) => (
				<Button
					key={i}
					variant={action.variant || 'outline'}
					size="sm"
					className="gap-2"
				>
					<action.icon className="size-4" />
					{action.label}
				</Button>
			))}
		</div>
	</div>
);

const SearchBar = ({ placeholder }: { placeholder: string }) => (
	<div className="flex items-center gap-3 border-b px-6 py-4">
		<div className="relative flex-1">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={placeholder} className="pl-9" />
		</div>
		<Button variant="outline" size="sm" className="gap-2">
			<ArrowDownUp className="size-4" />
			Sort
		</Button>
	</div>
);

const EngagementBadge = ({
	score,
}: {
	score: CustomerBehavior['engagementScore'];
}) => {
	const config = {
		high: {
			label: 'High',
			className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
		},
		medium: {
			label: 'Medium',
			className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
		},
		low: {
			label: 'Low',
			className: 'bg-red-500/10 text-red-500 border-red-500/20',
		},
	};
	return (
		<Badge variant="outline" className={config[score].className}>
			{config[score].label}
		</Badge>
	);
};

const MetricCell = ({
	icon: Icon,
	value,
	tooltip,
}: {
	icon: React.ElementType;
	value: number | string;
	tooltip: string;
}) => (
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger asChild>
				<div className="flex items-center justify-center gap-1.5 text-sm">
					<Icon className="text-muted-foreground size-3.5" />
					<span>{value}</span>
				</div>
			</TooltipTrigger>
			<TooltipContent>
				<p>{tooltip}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);

const CustomerRow = ({ customer }: { customer: CustomerBehavior }) => (
	<TableRow className="group">
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage
						src={customer.customer.avatar}
						alt={customer.customer.name}
					/>
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{customer.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{customer.customer.name}</p>
					<p className="text-muted-foreground text-xs">
						{customer.customer.email}
					</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell text-muted-foreground text-sm">
			<div className="flex items-center gap-1.5">
				<CalendarDays className="size-3.5" />
				{customer.lastVisit}
			</div>
		</TableCell>
		<TableCell className="hidden @lg:table-cell text-center">
			<MetricCell icon={Eye} value={customer.pageViews} tooltip="Page views" />
		</TableCell>
		<TableCell className="hidden @lg:table-cell text-center">
			<MetricCell
				icon={Clock}
				value={customer.timeOnSite}
				tooltip="Time on site"
			/>
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-center">
			<MetricCell
				icon={ShoppingBag}
				value={customer.cartAbandoned}
				tooltip="Cart abandons"
			/>
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-center">
			<MetricCell
				icon={Heart}
				value={customer.wishlistItems}
				tooltip="Wishlist items"
			/>
		</TableCell>
		<TableCell className="hidden @2xl:table-cell text-center">
			<MetricCell
				icon={Star}
				value={customer.reviewsGiven}
				tooltip="Reviews given"
			/>
		</TableCell>
		<TableCell className="hidden @2xl:table-cell text-center">
			<MetricCell
				icon={Repeat}
				value={customer.repeatPurchases}
				tooltip="Repeat purchases"
			/>
		</TableCell>
		<TableCell>
			<EngagementBadge score={customer.engagementScore} />
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<ExternalLink className="mr-2 size-4" />
						View profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<FileText className="mr-2 size-4" />
						View activity log
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Send re-engagement email</DropdownMenuItem>
					<DropdownMenuItem>Create custom offer</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const customers: CustomerBehavior[] = [
		{
			id: '1',
			customer: {
				name: 'Jennifer Lopez',
				email: 'jennifer.l@email.com',
				initials: 'JL',
			},
			lastVisit: '2 hours ago',
			pageViews: 145,
			timeOnSite: '24m',
			cartAbandoned: 2,
			wishlistItems: 8,
			reviewsGiven: 5,
			repeatPurchases: 12,
			engagementScore: 'high',
		},
		{
			id: '2',
			customer: {
				name: 'Robert Smith',
				email: 'robert.s@email.com',
				initials: 'RS',
			},
			lastVisit: '1 day ago',
			pageViews: 67,
			timeOnSite: '12m',
			cartAbandoned: 4,
			wishlistItems: 3,
			reviewsGiven: 2,
			repeatPurchases: 5,
			engagementScore: 'medium',
		},
		{
			id: '3',
			customer: {
				name: 'Maria Garcia',
				email: 'maria.g@email.com',
				initials: 'MG',
			},
			lastVisit: '3 days ago',
			pageViews: 234,
			timeOnSite: '45m',
			cartAbandoned: 1,
			wishlistItems: 15,
			reviewsGiven: 8,
			repeatPurchases: 18,
			engagementScore: 'high',
		},
		{
			id: '4',
			customer: {
				name: 'David Brown',
				email: 'david.b@email.com',
				initials: 'DB',
			},
			lastVisit: '2 weeks ago',
			pageViews: 23,
			timeOnSite: '5m',
			cartAbandoned: 6,
			wishlistItems: 1,
			reviewsGiven: 0,
			repeatPurchases: 1,
			engagementScore: 'low',
		},
		{
			id: '5',
			customer: {
				name: 'Sarah Johnson',
				email: 'sarah.j@email.com',
				initials: 'SJ',
			},
			lastVisit: '5 hours ago',
			pageViews: 89,
			timeOnSite: '18m',
			cartAbandoned: 3,
			wishlistItems: 6,
			reviewsGiven: 4,
			repeatPurchases: 7,
			engagementScore: 'medium',
		},
	];

	const headerActions = [
		{ label: 'Settings', icon: Settings, variant: 'outline' as const },
		{ label: 'Export', icon: FileText, variant: 'outline' as const },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Customer Behavior Analytics"
					actions={headerActions}
				/>

				<div className="overflow-hidden rounded-xl border bg-card">
					<SearchBar placeholder="Search by name or email..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead>Customer</TableHead>
								<TableHead className="hidden @md:table-cell">
									Last Visit
								</TableHead>
								<TableHead className="hidden @lg:table-cell text-center">
									Views
								</TableHead>
								<TableHead className="hidden @lg:table-cell text-center">
									Time
								</TableHead>
								<TableHead className="hidden @xl:table-cell text-center">
									Abandoned
								</TableHead>
								<TableHead className="hidden @xl:table-cell text-center">
									Wishlist
								</TableHead>
								<TableHead className="hidden @2xl:table-cell text-center">
									Reviews
								</TableHead>
								<TableHead className="hidden @2xl:table-cell text-center">
									Repeat
								</TableHead>
								<TableHead>Engagement</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{customers.map((customer) => (
								<CustomerRow key={customer.id} customer={customer} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
