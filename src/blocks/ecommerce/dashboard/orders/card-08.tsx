import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	Users,
	Package,
	DollarSign,
	TrendingUp,
	Star,
	Award,
} from 'lucide-react';

interface TopCustomer {
	rank: number;
	customer: { name: string; avatar: string; initials: string; email: string };
	totalOrders: number;
	totalSpent: string;
	lastOrder: string;
	tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

interface TopCustomerCardProps {
	customer: TopCustomer;
}

interface LeaderboardHeaderProps {
	title: string;
	subtitle: string;
	viewAllLabel: string;
}

const TierBadge = ({ tier }: { tier: TopCustomer['tier'] }) => {
	const config: Record<
		TopCustomer['tier'],
		{ icon: typeof Star; className: string; label: string }
	> = {
		bronze: {
			icon: Award,
			className: 'bg-amber-700/20 text-amber-700 border-amber-700/30',
			label: 'Bronze',
		},
		silver: {
			icon: Award,
			className: 'bg-gray-400/20 text-gray-500 border-gray-400/30',
			label: 'Silver',
		},
		gold: {
			icon: Award,
			className: 'bg-yellow-400/20 text-yellow-600 border-yellow-400/30',
			label: 'Gold',
		},
		platinum: {
			icon: Award,
			className: 'bg-cyan-400/20 text-cyan-600 border-cyan-400/30',
			label: 'Platinum',
		},
	};
	const { icon: Icon, className, label } = config[tier];
	return (
		<Badge variant="outline" className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const RankBadge = ({ rank }: { rank: number }) => {
	const colors = [
		'bg-yellow-400 text-yellow-900',
		'bg-gray-300 text-gray-700',
		'bg-amber-600 text-amber-100',
	];
	return (
		<div
			className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${colors[rank - 1] || 'bg-muted text-muted-foreground'}`}
		>
			{rank}
		</div>
	);
};

const TopCustomerCard = ({ customer }: TopCustomerCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-all">
		<CardContent className="p-4">
			<div className="flex items-center gap-4">
				<RankBadge rank={customer.rank} />
				<Avatar className="size-12">
					<AvatarImage
						src={customer.customer.avatar}
						alt={customer.customer.name}
					/>
					<AvatarFallback className="bg-primary/10 text-primary">
						{customer.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2">
						<p className="font-semibold truncate">{customer.customer.name}</p>
						<TierBadge tier={customer.tier} />
					</div>
					<p className="text-sm text-muted-foreground truncate">
						{customer.customer.email}
					</p>
				</div>
				<div className="text-right">
					<p className="text-lg font-bold">{customer.totalSpent}</p>
					<p className="text-xs text-muted-foreground">
						{customer.totalOrders} orders
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const LeaderboardHeader = ({
	title,
	subtitle,
	viewAllLabel,
}: LeaderboardHeaderProps) => (
	<div className="flex items-center justify-between mb-6">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
				<Users className="size-5 text-primary" />
			</div>
			<div>
				<h2 className="text-xl font-semibold">{title}</h2>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
		</div>
		<Button variant="outline" size="sm">
			{viewAllLabel}
		</Button>
	</div>
);

export default function Main() {
	const topCustomers: TopCustomer[] = [
		{
			rank: 1,
			customer: {
				name: 'Enterprise Corp',
				avatar: '',
				initials: 'EC',
				email: 'orders@enterprise.com',
			},
			totalOrders: 156,
			totalSpent: '$48,560',
			lastOrder: 'Jan 28',
			tier: 'platinum',
		},
		{
			rank: 2,
			customer: {
				name: 'TechStart Inc',
				avatar: '',
				initials: 'TI',
				email: 'purchasing@techstart.io',
			},
			totalOrders: 89,
			totalSpent: '$32,100',
			lastOrder: 'Jan 27',
			tier: 'gold',
		},
		{
			rank: 3,
			customer: {
				name: 'Global Retail',
				avatar: '',
				initials: 'GR',
				email: 'supply@global.com',
			},
			totalOrders: 67,
			totalSpent: '$24,780',
			lastOrder: 'Jan 26',
			tier: 'gold',
		},
		{
			rank: 4,
			customer: {
				name: 'Sarah Johnson',
				avatar: '',
				initials: 'SJ',
				email: 'sarah.j@email.com',
			},
			totalOrders: 45,
			totalSpent: '$12,340',
			lastOrder: 'Jan 28',
			tier: 'silver',
		},
		{
			rank: 5,
			customer: {
				name: 'Digital Agency',
				avatar: '',
				initials: 'DA',
				email: 'office@digital.co',
			},
			totalOrders: 34,
			totalSpent: '$8,920',
			lastOrder: 'Jan 25',
			tier: 'bronze',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<LeaderboardHeader
					title="Top Customers"
					subtitle="By total order value"
					viewAllLabel="View All"
				/>
				<div className="space-y-3">
					{topCustomers.map((customer) => (
						<TopCustomerCard key={customer.rank} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
