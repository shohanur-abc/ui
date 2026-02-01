import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Bell,
	Calendar,
	CreditCard,
	Gift,
	HelpCircle,
	Key,
	LogOut,
	Mail,
	MapPin,
	Moon,
	Package,
	Settings,
	Shield,
	User,
} from 'lucide-react';
import Link from 'next/link';

const UserProfileCard = ({
	src,
	fallback,
	name,
	email,
	verified,
}: {
	src: string;
	fallback: string;
	name: string;
	email: string;
	verified: boolean;
}) => (
	<Card className="col-span-full @lg:col-span-2 row-span-2">
		<CardContent className="p-6 h-full flex flex-col">
			<div className="flex items-start gap-4 mb-6">
				<Avatar className="size-16 ring-2 ring-border">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="bg-primary text-primary-foreground text-xl">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<h2 className="text-lg font-semibold">{name}</h2>
						{verified && (
							<Shield className="size-4 text-blue-500 fill-blue-500/20" />
						)}
					</div>
					<p className="text-sm text-muted-foreground">{email}</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-3 flex-1">
				<MenuLink icon={User} label="Personal Info" href="/account/personal" />
				<MenuLink
					icon={MapPin}
					label="Addresses"
					href="/account/addresses"
					badge="3"
				/>
				<MenuLink icon={CreditCard} label="Payment" href="/account/payment" />
				<MenuLink icon={Key} label="Security" href="/account/security" />
				<MenuLink
					icon={Bell}
					label="Notifications"
					href="/account/notifications"
				/>
				<MenuLink icon={Moon} label="Preferences" href="/account/preferences" />
			</div>
		</CardContent>
	</Card>
);

const MenuLink = ({
	icon: Icon,
	label,
	href,
	badge,
}: {
	icon: React.ElementType;
	label: string;
	href: string;
	badge?: string;
}) => (
	<Link
		href={href}
		className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
	>
		<Icon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
		<span className="flex-1 text-sm font-medium">{label}</span>
		{badge && (
			<Badge variant="secondary" className="text-xs">
				{badge}
			</Badge>
		)}
	</Link>
);

const QuickStatCard = ({
	icon: Icon,
	label,
	value,
	color,
	href,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	color: string;
	href: string;
}) => (
	<Link href={href}>
		<Card className="h-full hover:bg-muted/50 transition-colors group">
			<CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
				<div
					className={`p-3 rounded-xl ${color} mb-2 group-hover:scale-110 transition-transform`}
				>
					<Icon className="size-5" />
				</div>
				<p className="text-2xl font-bold">{value}</p>
				<p className="text-xs text-muted-foreground">{label}</p>
			</CardContent>
		</Card>
	</Link>
);

const ActivityCard = ({
	items,
}: {
	items: { icon: React.ElementType; title: string; time: string }[];
}) => (
	<Card className="col-span-full @lg:col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-4">
				<h3 className="font-medium">Recent Activity</h3>
				<Button variant="ghost" size="sm" className="text-xs" asChild>
					<Link href="/activity">View All</Link>
				</Button>
			</div>
			<div className="space-y-3">
				{items.map((activity, i) => (
					<div key={i} className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-muted">
							<activity.icon className="size-4 text-muted-foreground" />
						</div>
						<span className="flex-1 text-sm">{activity.title}</span>
						<span className="text-xs text-muted-foreground">
							{activity.time}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const SupportCard = () => (
	<Card>
		<CardContent className="p-4 flex flex-col items-center text-center">
			<HelpCircle className="size-8 text-muted-foreground mb-2" />
			<h3 className="font-medium mb-1">Need Help?</h3>
			<p className="text-xs text-muted-foreground mb-3">We&apos;re here 24/7</p>
			<Button variant="outline" size="sm" className="w-full" asChild>
				<Link href="/support">Contact Support</Link>
			</Button>
		</CardContent>
	</Card>
);

const LogoutCard = () => (
	<Card className="hover:bg-destructive/5 transition-colors group cursor-pointer">
		<CardContent className="p-4 flex flex-col items-center text-center">
			<LogOut className="size-8 text-muted-foreground group-hover:text-destructive mb-2 transition-colors" />
			<h3 className="font-medium group-hover:text-destructive transition-colors">
				Sign Out
			</h3>
			<p className="text-xs text-muted-foreground">Log out of your account</p>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
			fallback: 'RM',
			name: 'Rachel Morgan',
			email: 'rachel.m@example.com',
			verified: true,
		},
		stats: [
			{
				icon: Package,
				label: 'Orders',
				value: '67',
				color: 'bg-blue-500/20 text-blue-500',
				href: '/orders',
			},
			{
				icon: Gift,
				label: 'Rewards',
				value: '5',
				color: 'bg-purple-500/20 text-purple-500',
				href: '/rewards',
			},
		],
		activity: [
			{ icon: Package, title: 'Order #48291 delivered', time: '2h ago' },
			{ icon: Mail, title: 'Email preferences updated', time: '1d ago' },
			{ icon: CreditCard, title: 'New card added', time: '3d ago' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<UserProfileCard {...profileData.user} />
					{profileData.stats.map((stat, i) => (
						<QuickStatCard key={i} {...stat} />
					))}
					<ActivityCard items={profileData.activity} />
					<SupportCard />
					<LogoutCard />
				</div>
			</div>
		</section>
	);
}
