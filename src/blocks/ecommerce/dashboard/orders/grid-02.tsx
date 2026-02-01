import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
	Package,
	Calendar,
	DollarSign,
	TrendingUp,
	ArrowRight,
	Users,
} from 'lucide-react';

interface TopCustomerCard {
	rank: number;
	customer: { name: string; avatar: string; initials: string; email: string };
	totalOrders: number;
	totalSpent: string;
	lastOrder: string;
	orderProgress: number;
	trend: 'up' | 'down' | 'stable';
}

interface CustomerCardProps {
	customer: TopCustomerCard;
	labels: {
		orders: string;
		spent: string;
		lastOrder: string;
		viewProfile: string;
	};
}

const RankBadge = ({ rank }: { rank: number }) => {
	const colors: Record<number, string> = {
		1: 'bg-yellow-500 text-yellow-950',
		2: 'bg-gray-300 text-gray-800',
		3: 'bg-amber-600 text-amber-50',
	};
	return (
		<div
			className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${colors[rank] || 'bg-muted text-muted-foreground'}`}
		>
			{rank}
		</div>
	);
};

const CustomerCard = ({ customer, labels }: CustomerCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all group overflow-hidden">
		<div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
		<CardContent className="p-4">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-3">
					<Avatar className="size-12 ring-2 ring-background shadow-lg">
						<AvatarImage
							src={customer.customer.avatar}
							alt={customer.customer.name}
						/>
						<AvatarFallback className="bg-primary/10 text-primary font-semibold">
							{customer.customer.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold">{customer.customer.name}</p>
						<p className="text-xs text-muted-foreground">
							{customer.customer.email}
						</p>
					</div>
				</div>
				<RankBadge rank={customer.rank} />
			</div>

			<div className="grid grid-cols-2 gap-3 mb-4">
				<div className="p-3 rounded-lg bg-muted/30 border border-border/50">
					<div className="flex items-center gap-1.5 text-muted-foreground mb-1">
						<Package className="size-4" />
						<span className="text-xs">{labels.orders}</span>
					</div>
					<p className="text-xl font-bold">{customer.totalOrders}</p>
				</div>
				<div className="p-3 rounded-lg bg-muted/30 border border-border/50">
					<div className="flex items-center gap-1.5 text-muted-foreground mb-1">
						<DollarSign className="size-4" />
						<span className="text-xs">{labels.spent}</span>
					</div>
					<p className="text-xl font-bold text-accent">{customer.totalSpent}</p>
				</div>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Loyalty Progress</span>
					<span className="font-medium">{customer.orderProgress}%</span>
				</div>
				<Progress value={customer.orderProgress} className="h-2" />
			</div>

			<div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
				<Calendar className="size-4" />
				<span>
					{labels.lastOrder}: {customer.lastOrder}
				</span>
			</div>
		</CardContent>
		<CardFooter className="p-4 pt-0">
			<Button
				variant="outline"
				size="sm"
				className="w-full gap-1.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
			>
				{labels.viewProfile}
				<ArrowRight className="size-4" />
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const labels = {
		orders: 'Orders',
		spent: 'Spent',
		lastOrder: 'Last order',
		viewProfile: 'View Profile',
	};

	const customers: TopCustomerCard[] = [
		{
			rank: 1,
			customer: {
				name: 'Sarah Johnson',
				avatar: '',
				initials: 'SJ',
				email: 'sarah@example.com',
			},
			totalOrders: 156,
			totalSpent: '$12,450',
			lastOrder: 'Today',
			orderProgress: 92,
			trend: 'up',
		},
		{
			rank: 2,
			customer: {
				name: 'Mike Chen',
				avatar: '',
				initials: 'MC',
				email: 'mike@example.com',
			},
			totalOrders: 134,
			totalSpent: '$10,820',
			lastOrder: 'Yesterday',
			orderProgress: 85,
			trend: 'up',
		},
		{
			rank: 3,
			customer: {
				name: 'Emily Davis',
				avatar: '',
				initials: 'ED',
				email: 'emily@example.com',
			},
			totalOrders: 98,
			totalSpent: '$8,350',
			lastOrder: '3 days ago',
			orderProgress: 72,
			trend: 'stable',
		},
		{
			rank: 4,
			customer: {
				name: 'Alex Brown',
				avatar: '',
				initials: 'AB',
				email: 'alex@example.com',
			},
			totalOrders: 87,
			totalSpent: '$7,230',
			lastOrder: 'Last week',
			orderProgress: 65,
			trend: 'down',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
					{customers.map((customer) => (
						<CustomerCard
							key={customer.rank}
							customer={customer}
							labels={labels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
