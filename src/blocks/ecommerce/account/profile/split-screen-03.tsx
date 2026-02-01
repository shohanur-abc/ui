import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Bell,
	CreditCard,
	Globe,
	Heart,
	HelpCircle,
	Key,
	LogOut,
	MapPin,
	Moon,
	Package,
	Settings,
	Shield,
	User,
} from 'lucide-react';
import Link from 'next/link';

const UserCard = ({
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
	<div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
		<Avatar className="size-14">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<h2 className="font-semibold truncate">{name}</h2>
				{verified && (
					<Shield className="size-4 text-blue-500 fill-blue-500/20 shrink-0" />
				)}
			</div>
			<p className="text-sm text-muted-foreground truncate">{email}</p>
		</div>
		<Button variant="outline" size="sm" asChild>
			<Link href="/profile/edit">Edit</Link>
		</Button>
	</div>
);

const MenuGroup = ({
	title,
	items,
}: {
	title: string;
	items: {
		icon: React.ElementType;
		label: string;
		href: string;
		badge?: string;
		external?: boolean;
	}[];
}) => (
	<div className="space-y-1">
		{title && (
			<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
				{title}
			</p>
		)}
		{items.map((item, i) => (
			<Link
				key={i}
				href={item.href}
				className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
			>
				<item.icon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
				<span className="flex-1 text-sm">{item.label}</span>
				{item.badge && (
					<Badge variant="secondary" className="text-xs">
						{item.badge}
					</Badge>
				)}
				<ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
			</Link>
		))}
	</div>
);

const AccountStats = ({
	items,
}: {
	items: { label: string; value: string }[];
}) => (
	<div className="grid grid-cols-2 gap-4">
		{items.map((stat, i) => (
			<div
				key={i}
				className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent"
			>
				<p className="text-2xl font-bold">{stat.value}</p>
				<p className="text-sm text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop&crop=face',
			fallback: 'RH',
			name: 'Ryan Harrison',
			email: 'ryan.h@example.com',
			verified: true,
		},
		menuGroups: [
			{
				title: 'Account',
				items: [
					{
						icon: User,
						label: 'Personal Information',
						href: '/account/personal',
					},
					{
						icon: MapPin,
						label: 'Addresses',
						href: '/account/addresses',
						badge: '3',
					},
					{
						icon: CreditCard,
						label: 'Payment Methods',
						href: '/account/payment',
					},
					{ icon: Key, label: 'Security', href: '/account/security' },
				],
			},
			{
				title: 'Preferences',
				items: [
					{
						icon: Bell,
						label: 'Notifications',
						href: '/preferences/notifications',
					},
					{
						icon: Globe,
						label: 'Language & Region',
						href: '/preferences/language',
					},
					{ icon: Moon, label: 'Appearance', href: '/preferences/appearance' },
				],
			},
			{
				title: 'Support',
				items: [
					{ icon: HelpCircle, label: 'Help Center', href: '/help' },
					{ icon: LogOut, label: 'Sign Out', href: '/logout' },
				],
			},
		],
		stats: [
			{ label: 'Total Orders', value: '127' },
			{ label: 'Wishlist Items', value: '24' },
			{ label: 'Active Returns', value: '2' },
			{ label: 'Store Credit', value: '$85' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid @lg:grid-cols-[1fr_300px] gap-6">
					<Card>
						<CardContent className="p-4 space-y-2">
							<UserCard {...profileData.user} />
							{profileData.menuGroups.map((group, i) => (
								<div key={i}>
									<MenuGroup {...group} />
									{i < profileData.menuGroups.length - 1 && (
										<Separator className="my-2" />
									)}
								</div>
							))}
						</CardContent>
					</Card>
					<div className="space-y-6">
						<Card>
							<CardHeader className="pb-2">
								<h3 className="font-medium">Account Overview</h3>
							</CardHeader>
							<CardContent>
								<AccountStats items={profileData.stats} />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
