import {
	ArrowDownRight,
	ArrowUpRight,
	Calendar,
	Filter,
	Globe,
	MapPin,
	MoreHorizontal,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface GeographicCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	location: {
		city: string;
		state: string;
		country: string;
		region: string;
		timezone: string;
	};
	metrics: {
		orders: number;
		totalSpent: string;
		avgOrderValue: string;
		growth: number;
	};
	preferredCurrency: string;
	language: string;
	lastActive: string;
}

const GrowthIndicator = ({ value }: { value: number }) => {
	const isPositive = value > 0;
	return (
		<span className={`flex items-center text-xs ${isPositive ? 'text-emerald-500' : value < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
			{isPositive ? <ArrowUpRight className="size-3" /> : value < 0 ? <ArrowDownRight className="size-3" /> : null}
			{value > 0 ? '+' : ''}{value}%
		</span>
	);
};

const RegionBadge = ({ region }: { region: string }) => {
	const colors: Record<string, string> = {
		'North America': 'bg-blue-500/10 text-blue-500',
		'Europe': 'bg-emerald-500/10 text-emerald-500',
		'Asia Pacific': 'bg-violet-500/10 text-violet-500',
		'Latin America': 'bg-amber-500/10 text-amber-500',
		'Middle East': 'bg-orange-500/10 text-orange-500',
	};
	return (
		<Badge variant="outline" className={colors[region] || 'bg-slate-500/10 text-slate-400'}>
			{region}
		</Badge>
	);
};

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="flex items-center gap-3">
			<div className="bg-primary/10 text-primary rounded-lg p-2.5">
				<Globe className="size-5" />
			</div>
			<div>
				<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
				<p className="text-muted-foreground text-sm">{subtitle}</p>
			</div>
		</div>
		<Button variant="outline" size="sm" className="gap-1.5 w-fit">
			<Filter className="size-4" />
			Filter by Region
		</Button>
	</div>
);

const GeographicListItem = ({ customer }: { customer: GeographicCustomer }) => (
	<div className="group flex flex-col @md:flex-row @md:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3 min-w-0">
			<Avatar className="size-11">
				<AvatarImage src={customer.avatar} alt={customer.name} />
				<AvatarFallback className="bg-primary/10 text-primary">
					{customer.initials}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0">
				<p className="font-semibold truncate">{customer.name}</p>
				<p className="text-muted-foreground text-sm truncate">{customer.email}</p>
			</div>
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<MapPin className="text-muted-foreground size-3.5 shrink-0" />
				<p className="text-sm font-medium truncate">
					{customer.location.city}, {customer.location.state}
				</p>
				<RegionBadge region={customer.location.region} />
			</div>
			<div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
				<span>{customer.location.country}</span>
				<span>•</span>
				<span>{customer.location.timezone}</span>
				<span>•</span>
				<span>{customer.language}</span>
			</div>
		</div>
		<div className="grid grid-cols-3 gap-4 @lg:gap-6 text-sm">
			<div className="text-center">
				<p className="font-semibold">{customer.metrics.orders}</p>
				<p className="text-muted-foreground text-xs">Orders</p>
			</div>
			<div className="text-center">
				<p className="font-semibold">{customer.metrics.totalSpent}</p>
				<p className="text-muted-foreground text-xs">Total</p>
			</div>
			<div className="text-center">
				<div className="flex items-center justify-center gap-1">
					<span className="font-semibold">{customer.metrics.avgOrderValue}</span>
					<GrowthIndicator value={customer.metrics.growth} />
				</div>
				<p className="text-muted-foreground text-xs">AOV</p>
			</div>
		</div>
		<div className="hidden @lg:block text-right min-w-[90px]">
			<p className="text-sm">{customer.lastActive}</p>
			<p className="text-muted-foreground text-xs">Last active</p>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm">
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>View profile</DropdownMenuItem>
				<DropdownMenuItem>View orders</DropdownMenuItem>
				<DropdownMenuItem>Send localized offer</DropdownMenuItem>
				<DropdownMenuItem>View regional insights</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

export default function Main() {
	const customers: GeographicCustomer[] = [
		{
			id: '1',
			name: 'Patrick Miller',
			email: 'patrick.m@email.com',
			initials: 'PM',
			location: { city: 'New York', state: 'NY', country: 'United States', region: 'North America', timezone: 'EST' },
			metrics: { orders: 28, totalSpent: '$4,560', avgOrderValue: '$163', growth: 12 },
			preferredCurrency: 'USD',
			language: 'English',
			lastActive: '2h ago',
		},
		{
			id: '2',
			name: 'Sophie Laurent',
			email: 'sophie.l@email.com',
			initials: 'SL',
			location: { city: 'Paris', state: 'Île-de-France', country: 'France', region: 'Europe', timezone: 'CET' },
			metrics: { orders: 15, totalSpent: '€2,340', avgOrderValue: '€156', growth: 8 },
			preferredCurrency: 'EUR',
			language: 'French',
			lastActive: '1d ago',
		},
		{
			id: '3',
			name: 'Takeshi Yamamoto',
			email: 'takeshi.y@email.com',
			initials: 'TY',
			location: { city: 'Tokyo', state: 'Tokyo', country: 'Japan', region: 'Asia Pacific', timezone: 'JST' },
			metrics: { orders: 42, totalSpent: '¥680,000', avgOrderValue: '¥16,190', growth: 22 },
			preferredCurrency: 'JPY',
			language: 'Japanese',
			lastActive: '4h ago',
		},
		{
			id: '4',
			name: 'Maria Santos',
			email: 'maria.s@email.com',
			initials: 'MS',
			location: { city: 'São Paulo', state: 'SP', country: 'Brazil', region: 'Latin America', timezone: 'BRT' },
			metrics: { orders: 19, totalSpent: 'R$8,900', avgOrderValue: 'R$468', growth: -5 },
			preferredCurrency: 'BRL',
			language: 'Portuguese',
			lastActive: '3d ago',
		},
		{
			id: '5',
			name: 'Ahmed Hassan',
			email: 'ahmed.h@email.com',
			initials: 'AH',
			location: { city: 'Dubai', state: 'Dubai', country: 'UAE', region: 'Middle East', timezone: 'GST' },
			metrics: { orders: 35, totalSpent: 'AED 28,500', avgOrderValue: 'AED 814', growth: 18 },
			preferredCurrency: 'AED',
			language: 'Arabic',
			lastActive: '12h ago',
		},
		{
			id: '6',
			name: 'Emma Williams',
			email: 'emma.w@email.com',
			initials: 'EW',
			location: { city: 'London', state: 'England', country: 'United Kingdom', region: 'Europe', timezone: 'GMT' },
			metrics: { orders: 24, totalSpent: '£3,200', avgOrderValue: '£133', growth: 15 },
			preferredCurrency: 'GBP',
			language: 'English',
			lastActive: '6h ago',
		},
		{
			id: '7',
			name: 'Chen Wei',
			email: 'chen.w@email.com',
			initials: 'CW',
			location: { city: 'Shanghai', state: 'Shanghai', country: 'China', region: 'Asia Pacific', timezone: 'CST' },
			metrics: { orders: 56, totalSpent: '¥45,600', avgOrderValue: '¥814', growth: 28 },
			preferredCurrency: 'CNY',
			language: 'Mandarin',
			lastActive: '1h ago',
		},
		{
			id: '8',
			name: 'Lucas Garcia',
			email: 'lucas.g@email.com',
			initials: 'LG',
			location: { city: 'Mexico City', state: 'CDMX', country: 'Mexico', region: 'Latin America', timezone: 'CST' },
			metrics: { orders: 12, totalSpent: 'MX$18,500', avgOrderValue: 'MX$1,542', growth: 0 },
			preferredCurrency: 'MXN',
			language: 'Spanish',
			lastActive: '2d ago',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Geographic Distribution"
					subtitle="Customers by location and region"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<GeographicListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
