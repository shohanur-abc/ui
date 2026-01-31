import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowRight,
	Bell,
	CreditCard,
	Gift,
	Globe,
	Heart,
	Key,
	LogOut,
	Mail,
	MapPin,
	Moon,
	Package,
	Shield,
	Smartphone,
	Star,
	User,
} from 'lucide-react';
import Link from 'next/link';

const CompactHeader = ({
	src,
	fallback,
	name,
	email,
	plan,
}: {
	src: string;
	fallback: string;
	name: string;
	email: string;
	plan: string;
}) => (
	<Card>
		<CardContent className="p-6">
			<div className="flex items-center gap-4">
				<Avatar className="size-16">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<h1 className="text-xl font-bold">{name}</h1>
						<Badge variant="secondary">{plan}</Badge>
					</div>
					<p className="text-muted-foreground">{email}</p>
				</div>
				<Button>Edit Profile</Button>
			</div>
		</CardContent>
	</Card>
);

const NotificationBanner = ({
	message,
	action,
}: {
	message: string;
	action: string;
}) => (
	<Card className="border-amber-500/30 bg-amber-500/5">
		<CardContent className="p-4">
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<Bell className="size-5 text-amber-500" />
					<p className="text-sm">{message}</p>
				</div>
				<Button variant="outline" size="sm">{action}</Button>
			</div>
		</CardContent>
	</Card>
);

const AccountSection = ({
	title,
	items,
}: {
	title: string;
	items: { icon: React.ElementType; label: string; description?: string; href: string; badge?: string; status?: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold">{title}</h2>
		</CardHeader>
		<CardContent className="p-0">
			{items.map((item, i) => (
				<Link
					key={i}
					href={item.href}
					className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-t first:border-t-0"
				>
					<div className="flex items-center gap-3">
						<item.icon className="size-5 text-muted-foreground" />
						<div>
							<p className="font-medium">{item.label}</p>
							{item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
						</div>
					</div>
					<div className="flex items-center gap-2">
						{item.badge && <Badge>{item.badge}</Badge>}
						{item.status && <span className="text-sm text-muted-foreground">{item.status}</span>}
						<ArrowRight className="size-4 text-muted-foreground" />
					</div>
				</Link>
			))}
		</CardContent>
	</Card>
);

const RewardsCard = ({
	points,
	tier,
	nextReward,
	progress,
}: {
	points: string;
	tier: string;
	nextReward: string;
	progress: number;
}) => (
	<Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10">
		<CardContent className="p-6">
			<div className="flex items-center justify-between mb-4">
				<div>
					<Badge className="bg-purple-500/20 text-purple-600">{tier}</Badge>
					<p className="text-3xl font-bold mt-2">{points}</p>
					<p className="text-sm text-muted-foreground">Available Points</p>
				</div>
				<div className="p-4 rounded-full bg-purple-500/20">
					<Gift className="size-8 text-purple-500" />
				</div>
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>Next reward</span>
					<span className="font-medium">{nextReward}</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>
		</CardContent>
	</Card>
);

const OrdersPreview = ({
	orders,
}: {
	orders: { id: string; items: number; total: string; status: string; statusColor: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Recent Orders</h2>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/orders">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{orders.map((order, i) => (
				<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
					<div>
						<p className="font-medium">Order #{order.id}</p>
						<p className="text-sm text-muted-foreground">{order.items} items • {order.total}</p>
					</div>
					<Badge className={order.statusColor}>{order.status}</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const SecurityCard = ({
	lastLogin,
	twoFactor,
	passwordAge,
}: {
	lastLogin: string;
	twoFactor: boolean;
	passwordAge: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<Shield className="size-5 text-green-500" />
				<h2 className="font-semibold">Security</h2>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
				<div className="flex items-center gap-3">
					<Key className="size-4 text-muted-foreground" />
					<span className="text-sm">Password</span>
				</div>
				<span className="text-sm text-muted-foreground">Changed {passwordAge}</span>
			</div>
			<div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
				<div className="flex items-center gap-3">
					<Smartphone className="size-4 text-muted-foreground" />
					<span className="text-sm">Two-Factor Auth</span>
				</div>
				<Badge variant={twoFactor ? 'default' : 'secondary'}>{twoFactor ? 'Enabled' : 'Disabled'}</Badge>
			</div>
			<div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
				<div className="flex items-center gap-3">
					<Globe className="size-4 text-muted-foreground" />
					<span className="text-sm">Last Login</span>
				</div>
				<span className="text-sm text-muted-foreground">{lastLogin}</span>
			</div>
		</CardContent>
	</Card>
);

const LogoutButton = () => (
	<Card className="border-red-500/20">
		<CardContent className="p-4">
			<Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-2">
				<LogOut className="size-4" />
				Sign Out
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			fallback: 'JD',
			name: 'James Davidson',
			email: 'james.d@example.com',
			plan: 'Pro Member',
		},
		notification: {
			message: 'Complete your profile to earn 500 bonus points!',
			action: 'Complete Now',
		},
		accountItems: [
			{ icon: User, label: 'Personal Information', description: 'Name, email, phone number', href: '/profile/personal' },
			{ icon: MapPin, label: 'Addresses', description: 'Manage delivery addresses', href: '/profile/addresses', badge: '3' },
			{ icon: CreditCard, label: 'Payment Methods', description: 'Cards and billing info', href: '/profile/payment', status: '2 cards' },
			{ icon: Bell, label: 'Notifications', description: 'Email and push preferences', href: '/profile/notifications' },
		],
		preferencesItems: [
			{ icon: Globe, label: 'Language & Region', href: '/settings/region', status: 'English (US)' },
			{ icon: Moon, label: 'Appearance', href: '/settings/appearance', status: 'System' },
			{ icon: Mail, label: 'Email Preferences', href: '/settings/email' },
		],
		rewards: {
			points: '4,250',
			tier: 'Gold Member',
			nextReward: '750 points to Platinum',
			progress: 85,
		},
		orders: [
			{ id: '78542', items: 3, total: '$189.00', status: 'Shipped', statusColor: 'bg-blue-500/20 text-blue-600' },
			{ id: '78539', items: 1, total: '$49.99', status: 'Delivered', statusColor: 'bg-green-500/20 text-green-600' },
		],
		security: {
			lastLogin: 'Today, 2:45 PM',
			twoFactor: true,
			passwordAge: '2 months ago',
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12 space-y-4">
				<CompactHeader {...profileData.header} />
				<NotificationBanner {...profileData.notification} />
				<RewardsCard {...profileData.rewards} />
				<OrdersPreview orders={profileData.orders} />
				<AccountSection title="Account Settings" items={profileData.accountItems} />
				<AccountSection title="Preferences" items={profileData.preferencesItems} />
				<SecurityCard {...profileData.security} />
				<LogoutButton />
			</div>
		</section>
	);
}
