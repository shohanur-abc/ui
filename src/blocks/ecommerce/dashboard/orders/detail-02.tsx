import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	User,
	Mail,
	Phone,
	MapPin,
	Calendar,
	ShoppingBag,
	DollarSign,
	Star,
	Clock,
	Edit,
	MessageSquare,
} from 'lucide-react';

interface CustomerDetailProps {
	customer: {
		id: string;
		name: string;
		email: string;
		phone: string;
		avatar: string;
		initials: string;
		since: string;
		addresses: { label: string; address: string; isDefault: boolean }[];
		stats: {
			orders: number;
			spent: string;
			avgOrder: string;
			lastOrder: string;
		};
		tier: 'bronze' | 'silver' | 'gold' | 'platinum';
	};
	labels: {
		memberSince: string;
		addresses: string;
		stats: string;
		orders: string;
		spent: string;
		avgOrder: string;
		lastOrder: string;
		edit: string;
		message: string;
	};
}

const TierBadge = ({
	tier,
}: {
	tier: CustomerDetailProps['customer']['tier'];
}) => {
	const config = {
		bronze: {
			className: 'bg-orange-100 text-orange-700 border-orange-300',
			label: '🥉 Bronze',
		},
		silver: {
			className: 'bg-gray-100 text-gray-700 border-gray-300',
			label: '🥈 Silver',
		},
		gold: {
			className: 'bg-yellow-100 text-yellow-700 border-yellow-300',
			label: '🥇 Gold',
		},
		platinum: {
			className: 'bg-purple-100 text-purple-700 border-purple-300',
			label: '💎 Platinum',
		},
	};
	const { className, label } = config[tier];
	return (
		<Badge variant="outline" className={className}>
			{label}
		</Badge>
	);
};

const StatCard = ({
	icon: Icon,
	label,
	value,
	color,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	color: string;
}) => (
	<div className="p-3 rounded-lg bg-muted/30 border border-border/50">
		<div className="flex items-center gap-1.5 text-muted-foreground mb-1">
			<Icon className={`size-4 ${color}`} />
			<span className="text-xs">{label}</span>
		</div>
		<p className="text-xl font-bold">{value}</p>
	</div>
);

const CustomerDetail = ({ customer, labels }: CustomerDetailProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<div className="flex items-start gap-4">
				<Avatar className="size-16 ring-2 ring-background shadow-lg">
					<AvatarImage src={customer.avatar} alt={customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
						{customer.initials}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-1">
						<CardTitle className="text-xl">{customer.name}</CardTitle>
						<TierBadge tier={customer.tier} />
					</div>
					<p className="text-sm text-muted-foreground font-mono">
						{customer.id}
					</p>
					<p className="text-sm text-muted-foreground mt-1">
						<Calendar className="size-3 inline mr-1" />
						{labels.memberSince} {customer.since}
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" className="gap-1.5">
						<MessageSquare className="size-4" />
						{labels.message}
					</Button>
					<Button size="sm" className="gap-1.5">
						<Edit className="size-4" />
						{labels.edit}
					</Button>
				</div>
			</div>
		</CardHeader>
		<CardContent className="space-y-6">
			<div className="grid grid-cols-2 gap-4">
				<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
					<Mail className="size-5 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">Email</p>
						<p className="font-medium">{customer.email}</p>
					</div>
				</div>
				<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
					<Phone className="size-5 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">Phone</p>
						<p className="font-medium">{customer.phone}</p>
					</div>
				</div>
			</div>

			<Separator />

			<div>
				<h3 className="text-sm font-semibold text-muted-foreground mb-3">
					{labels.stats}
				</h3>
				<div className="grid grid-cols-4 gap-3">
					<StatCard
						icon={ShoppingBag}
						label={labels.orders}
						value={customer.stats.orders.toString()}
						color="text-primary"
					/>
					<StatCard
						icon={DollarSign}
						label={labels.spent}
						value={customer.stats.spent}
						color="text-accent"
					/>
					<StatCard
						icon={Star}
						label={labels.avgOrder}
						value={customer.stats.avgOrder}
						color="text-yellow-500"
					/>
					<StatCard
						icon={Clock}
						label={labels.lastOrder}
						value={customer.stats.lastOrder}
						color="text-blue-500"
					/>
				</div>
			</div>

			<Separator />

			<div>
				<h3 className="text-sm font-semibold text-muted-foreground mb-3">
					{labels.addresses}
				</h3>
				<div className="space-y-3">
					{customer.addresses.map((addr, i) => (
						<div
							key={i}
							className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/50"
						>
							<MapPin className="size-5 text-muted-foreground mt-0.5" />
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<p className="font-medium">{addr.label}</p>
									{addr.isDefault && (
										<Badge variant="secondary" className="text-xs">
											Default
										</Badge>
									)}
								</div>
								<p className="text-sm text-muted-foreground">{addr.address}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = {
		memberSince: 'Member since',
		addresses: 'Addresses',
		stats: 'Order Statistics',
		orders: 'Orders',
		spent: 'Total Spent',
		avgOrder: 'Avg Order',
		lastOrder: 'Last Order',
		edit: 'Edit',
		message: 'Message',
	};

	const customer = {
		id: 'CUS-2024-001',
		name: 'Sarah Johnson',
		email: 'sarah.johnson@email.com',
		phone: '+1 (555) 987-6543',
		avatar: '',
		initials: 'SJ',
		since: 'January 2022',
		tier: 'gold' as const,
		addresses: [
			{
				label: 'Home',
				address: '123 Main Street, Apt 4B, New York, NY 10001',
				isDefault: true,
			},
			{
				label: 'Work',
				address: '456 Business Ave, Floor 12, New York, NY 10002',
				isDefault: false,
			},
		],
		stats: {
			orders: 47,
			spent: '$4,892',
			avgOrder: '$104',
			lastOrder: 'Today',
		},
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<CustomerDetail customer={customer} labels={labels} />
			</div>
		</section>
	);
}
