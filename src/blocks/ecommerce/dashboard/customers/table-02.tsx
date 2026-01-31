import {
	ArrowUpDown,
	ChevronLeft,
	ChevronRight,
	MoreVertical,
	Plus,
	Star,
	TrendingUp,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

interface Customer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	tier: 'bronze' | 'silver' | 'gold' | 'platinum';
	lifetimeValue: string;
	loyaltyPoints: number;
	maxPoints: number;
	lastPurchase: string;
	avgOrderValue: string;
}

const PageHeader = ({
	title,
	subtitle,
	action,
}: {
	title: string;
	subtitle: string;
	action: { label: string; icon: React.ElementType };
}) => (
	<div className="flex flex-col gap-4 @md:flex-row @md:items-center @md:justify-between">
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
		<Button className="gap-2">
			<action.icon className="size-4" />
			{action.label}
		</Button>
	</div>
);

const TierBadge = ({ tier }: { tier: Customer['tier'] }) => {
	const config = {
		bronze: { className: 'bg-orange-500/10 text-orange-500 border-orange-500/20', icon: null },
		silver: { className: 'bg-slate-400/10 text-slate-400 border-slate-400/20', icon: null },
		gold: { className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: Star },
		platinum: { className: 'bg-violet-500/10 text-violet-500 border-violet-500/20', icon: Star },
	};
	const Icon = config[tier].icon;
	return (
		<Badge variant="outline" className={`${config[tier].className} gap-1`}>
			{Icon && <Icon className="size-3" />}
			{tier.charAt(0).toUpperCase() + tier.slice(1)}
		</Badge>
	);
};

const LoyaltyProgress = ({
	current,
	max,
}: {
	current: number;
	max: number;
}) => (
	<div className="space-y-1">
		<Progress value={(current / max) * 100} className="h-1.5" />
		<p className="text-muted-foreground text-xs">
			{current.toLocaleString()} / {max.toLocaleString()} pts
		</p>
	</div>
);

const SortableHeader = ({ label }: { label: string }) => (
	<Button variant="ghost" size="sm" className="-ml-3 h-8 gap-1 font-medium">
		{label}
		<ArrowUpDown className="size-3" />
	</Button>
);

const CustomerRow = ({ customer }: { customer: Customer }) => (
	<TableRow className="group">
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-10 ring-2 ring-primary/20">
					<AvatarImage src={customer.avatar} alt={customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
						{customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{customer.name}</p>
					<p className="text-muted-foreground text-sm">{customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<TierBadge tier={customer.tier} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<LoyaltyProgress current={customer.loyaltyPoints} max={customer.maxPoints} />
		</TableCell>
		<TableCell className="text-right font-semibold">{customer.lifetimeValue}</TableCell>
		<TableCell className="hidden @md:table-cell text-right">
			{customer.avgOrderValue}
		</TableCell>
		<TableCell className="hidden @lg:table-cell text-muted-foreground text-sm">
			{customer.lastPurchase}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View details</DropdownMenuItem>
					<DropdownMenuItem>Purchase history</DropdownMenuItem>
					<DropdownMenuItem>Upgrade tier</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Send reward</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

const Pagination = ({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
}: {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
}) => (
	<div className="flex flex-col gap-4 @md:flex-row @md:items-center @md:justify-between border-t px-4 py-4">
		<p className="text-muted-foreground text-sm">
			Showing {(currentPage - 1) * itemsPerPage + 1}-
			{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} customers
		</p>
		<div className="flex items-center gap-2">
			<Button variant="outline" size="sm" disabled={currentPage === 1}>
				<ChevronLeft className="size-4" />
			</Button>
			{Array.from({ length: totalPages }, (_, i) => (
				<Button
					key={i}
					variant={currentPage === i + 1 ? 'default' : 'outline'}
					size="sm"
					className="size-8 p-0"
				>
					{i + 1}
				</Button>
			))}
			<Button variant="outline" size="sm" disabled={currentPage === totalPages}>
				<ChevronRight className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const customers: Customer[] = [
		{
			id: '1',
			name: 'Alexandra Rivera',
			email: 'alex.rivera@email.com',
			initials: 'AR',
			tier: 'platinum',
			lifetimeValue: '$12,450',
			loyaltyPoints: 8500,
			maxPoints: 10000,
			lastPurchase: '2 days ago',
			avgOrderValue: '$245',
		},
		{
			id: '2',
			name: 'Benjamin Torres',
			email: 'ben.torres@email.com',
			initials: 'BT',
			tier: 'gold',
			lifetimeValue: '$8,920',
			loyaltyPoints: 5200,
			maxPoints: 7500,
			lastPurchase: '1 week ago',
			avgOrderValue: '$178',
		},
		{
			id: '3',
			name: 'Catherine Wu',
			email: 'cat.wu@email.com',
			initials: 'CW',
			tier: 'gold',
			lifetimeValue: '$6,780',
			loyaltyPoints: 4100,
			maxPoints: 7500,
			lastPurchase: '3 days ago',
			avgOrderValue: '$156',
		},
		{
			id: '4',
			name: 'Daniel Kim',
			email: 'daniel.k@email.com',
			initials: 'DK',
			tier: 'silver',
			lifetimeValue: '$3,450',
			loyaltyPoints: 2100,
			maxPoints: 5000,
			lastPurchase: '2 weeks ago',
			avgOrderValue: '$115',
		},
		{
			id: '5',
			name: 'Elena Popov',
			email: 'elena.p@email.com',
			initials: 'EP',
			tier: 'bronze',
			lifetimeValue: '$890',
			loyaltyPoints: 450,
			maxPoints: 2500,
			lastPurchase: '1 month ago',
			avgOrderValue: '$89',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Loyalty Program"
					subtitle="Manage customer tiers and loyalty rewards"
					action={{ label: 'Add Customer', icon: Plus }}
				/>
				<div className="overflow-hidden rounded-xl border bg-card">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead>
									<SortableHeader label="Customer" />
								</TableHead>
								<TableHead className="hidden @lg:table-cell">
									<SortableHeader label="Tier" />
								</TableHead>
								<TableHead className="hidden @xl:table-cell">Progress</TableHead>
								<TableHead className="text-right">
									<SortableHeader label="Lifetime Value" />
								</TableHead>
								<TableHead className="hidden @md:table-cell text-right">
									Avg. Order
								</TableHead>
								<TableHead className="hidden @lg:table-cell">Last Purchase</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{customers.map((customer) => (
								<CustomerRow key={customer.id} customer={customer} />
							))}
						</TableBody>
					</Table>
					<Pagination
						currentPage={1}
						totalPages={3}
						totalItems={15}
						itemsPerPage={5}
					/>
				</div>
			</div>
		</section>
	);
}
