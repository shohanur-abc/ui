import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Bell,
	Calendar,
	Camera,
	CheckCircle2,
	ChevronRight,
	CreditCard,
	Gift,
	Heart,
	MapPin,
	Package,
	Settings,
	ShoppingBag,
	Star,
	Truck,
	Users,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';

const ProfileBanner = ({
	src,
	fallback,
	name,
	email,
	memberSince,
}: {
	src: string;
	fallback: string;
	name: string;
	email: string;
	memberSince: string;
}) => (
	<Card className="col-span-full">
		<CardContent className="p-6">
			<div className="flex items-center gap-4">
				<div className="relative">
					<Avatar className="size-16">
						<AvatarImage src={src} alt={name} />
						<AvatarFallback>{fallback}</AvatarFallback>
					</Avatar>
					<button className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-primary text-primary-foreground">
						<Camera className="size-3" />
					</button>
				</div>
				<div className="flex-1">
					<h1 className="text-xl font-bold">{name}</h1>
					<p className="text-sm text-muted-foreground">{email}</p>
					<p className="text-xs text-muted-foreground">
						Member since {memberSince}
					</p>
				</div>
				<Button variant="outline" asChild>
					<Link href="/settings">
						<Settings className="size-4 mr-2" />
						Edit Profile
					</Link>
				</Button>
			</div>
		</CardContent>
	</Card>
);

const StatCard = ({
	icon: Icon,
	label,
	value,
	color,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	color: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div className={`p-2 rounded-lg ${color}`}>
					<Icon className="size-5 text-white" />
				</div>
				<div>
					<p className="text-2xl font-bold">{value}</p>
					<p className="text-xs text-muted-foreground">{label}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const LoyaltyCard = ({
	points,
	tier,
	nextTier,
	progress,
}: {
	points: number;
	tier: string;
	nextTier: string;
	progress: number;
}) => (
	<Card className="col-span-full @lg:col-span-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<Star className="size-5 text-amber-500" />
					<span className="font-semibold">{tier} Member</span>
				</div>
				<Badge variant="outline">{points.toLocaleString()} pts</Badge>
			</div>
			<Progress value={progress} className="h-2 mb-2" />
			<p className="text-xs text-muted-foreground">
				{progress}% to {nextTier}
			</p>
		</CardContent>
	</Card>
);

const QuickActionCard = ({
	icon: Icon,
	label,
	description,
	href,
}: {
	icon: React.ElementType;
	label: string;
	description: string;
	href: string;
}) => (
	<Card className="hover:bg-muted/50 transition-colors cursor-pointer">
		<CardContent className="p-4">
			<Link href={href} className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Icon className="size-5 text-muted-foreground" />
					<div>
						<p className="font-medium text-sm">{label}</p>
						<p className="text-xs text-muted-foreground">{description}</p>
					</div>
				</div>
				<ChevronRight className="size-4 text-muted-foreground" />
			</Link>
		</CardContent>
	</Card>
);

const RecentOrderCard = ({
	orderId,
	date,
	status,
	items,
	total,
}: {
	orderId: string;
	date: string;
	status: string;
	items: number;
	total: string;
}) => (
	<Card className="col-span-full">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Recent Order</h3>
				<Button variant="ghost" size="sm">
					View All
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
				<div className="flex items-center gap-3">
					<Package className="size-10 text-muted-foreground" />
					<div>
						<p className="font-medium">Order #{orderId}</p>
						<p className="text-sm text-muted-foreground">
							{items} items • {date}
						</p>
					</div>
				</div>
				<div className="text-right">
					<Badge className="bg-blue-500/20 text-blue-600">{status}</Badge>
					<p className="text-sm font-medium mt-1">{total}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const AddressCard = ({
	label,
	address,
	isDefault,
}: {
	label: string;
	address: string;
	isDefault: boolean;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-start gap-3">
				<MapPin className="size-5 text-muted-foreground shrink-0" />
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2">
						<p className="font-medium text-sm">{label}</p>
						{isDefault && (
							<Badge variant="secondary" className="text-xs">
								Default
							</Badge>
						)}
					</div>
					<p className="text-xs text-muted-foreground truncate">{address}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const PaymentMethodCard = ({
	brand,
	last4,
	isDefault,
}: {
	brand: string;
	last4: string;
	isDefault: boolean;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<CreditCard className="size-5 text-muted-foreground" />
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<p className="font-medium text-sm">{brand}</p>
						{isDefault && (
							<Badge variant="secondary" className="text-xs">
								Default
							</Badge>
						)}
					</div>
					<p className="text-xs text-muted-foreground">•••• {last4}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
			fallback: 'SW',
			name: 'Sarah Williams',
			email: 'sarah.williams@example.com',
			memberSince: 'January 2022',
		},
		stats: [
			{ icon: ShoppingBag, label: 'Orders', value: '47', color: 'bg-blue-500' },
			{ icon: Heart, label: 'Wishlist', value: '12', color: 'bg-red-500' },
			{ icon: Gift, label: 'Rewards', value: '8', color: 'bg-purple-500' },
			{ icon: Users, label: 'Referrals', value: '5', color: 'bg-green-500' },
		],
		loyalty: { points: 2450, tier: 'Gold', nextTier: 'Platinum', progress: 65 },
		quickActions: [
			{
				icon: Truck,
				label: 'Track Orders',
				description: '2 in transit',
				href: '/orders',
			},
			{
				icon: Bell,
				label: 'Notifications',
				description: '5 unread',
				href: '/notifications',
			},
			{
				icon: Wallet,
				label: 'Wallet',
				description: '$125.00 balance',
				href: '/wallet',
			},
			{
				icon: Calendar,
				label: 'Subscriptions',
				description: '2 active',
				href: '/subscriptions',
			},
		],
		recentOrder: {
			orderId: '12847',
			date: 'Jan 28, 2024',
			status: 'In Transit',
			items: 3,
			total: '$156.00',
		},
		addresses: [
			{
				label: 'Home',
				address: '123 Main Street, Apt 4B, New York, NY 10001',
				isDefault: true,
			},
			{
				label: 'Office',
				address: '456 Business Ave, Floor 12, New York, NY 10002',
				isDefault: false,
			},
		],
		paymentMethods: [
			{ brand: 'Visa', last4: '4242', isDefault: true },
			{ brand: 'Mastercard', last4: '8888', isDefault: false },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<ProfileBanner {...profileData.user} />
					{profileData.stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
					<LoyaltyCard {...profileData.loyalty} />
					{profileData.quickActions.map((action, i) => (
						<QuickActionCard key={i} {...action} />
					))}
					<RecentOrderCard {...profileData.recentOrder} />
					{profileData.addresses.map((addr, i) => (
						<AddressCard key={i} {...addr} />
					))}
					{profileData.paymentMethods.map((method, i) => (
						<PaymentMethodCard key={i} {...method} />
					))}
				</div>
			</div>
		</section>
	);
}
