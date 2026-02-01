import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Bell,
	Calendar,
	Camera,
	CreditCard,
	Heart,
	HelpCircle,
	Key,
	LogOut,
	Mail,
	MapPin,
	Package,
	Phone,
	Settings,
	Shield,
	User,
} from 'lucide-react';
import Link from 'next/link';

const ProfileAvatar = ({
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
	<div className="text-center space-y-4">
		<div className="relative inline-block">
			<Avatar className="size-24 ring-4 ring-border shadow-lg">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<Button
				size="icon"
				variant="secondary"
				className="absolute bottom-0 right-0 size-8 rounded-full shadow-md"
			>
				<Camera className="size-4" />
			</Button>
		</div>
		<div>
			<h1 className="text-xl font-bold">{name}</h1>
			<p className="text-sm text-muted-foreground">{email}</p>
			<p className="text-xs text-muted-foreground mt-1">
				Member since {memberSince}
			</p>
		</div>
	</div>
);

const MenuSection = ({
	title,
	items,
}: {
	title: string;
	items: {
		icon: React.ElementType;
		label: string;
		href: string;
		badge?: string;
		color?: string;
	}[];
}) => (
	<div className="space-y-2">
		<h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
			{title}
		</h3>
		<div className="space-y-1">
			{items.map((item, i) => (
				<Link
					key={i}
					href={item.href}
					className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
				>
					<item.icon
						className={`size-5 ${item.color || 'text-muted-foreground'} group-hover:text-foreground transition-colors`}
					/>
					<span className="flex-1 text-sm font-medium">{item.label}</span>
					{item.badge && (
						<Badge variant="secondary" className="text-xs">
							{item.badge}
						</Badge>
					)}
					<ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
				</Link>
			))}
		</div>
	</div>
);

const LogoutButton = () => (
	<Button
		variant="ghost"
		className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
	>
		<LogOut className="size-5" />
		Sign Out
	</Button>
);

export default function Main() {
	const profileData = {
		avatar: {
			src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
			fallback: 'MR',
			name: 'Michael Rodriguez',
			email: 'michael.r@example.com',
			memberSince: 'Jan 2023',
		},
		sections: [
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
						badge: '2',
					},
				],
			},
			{
				title: 'Activity',
				items: [
					{ icon: Package, label: 'Orders', href: '/orders', badge: '12' },
					{ icon: Heart, label: 'Wishlist', href: '/wishlist', badge: '8' },
					{
						icon: Bell,
						label: 'Notifications',
						href: '/notifications',
						badge: '3',
						color: 'text-blue-500',
					},
				],
			},
			{
				title: 'Security',
				items: [
					{ icon: Key, label: 'Password', href: '/account/password' },
					{ icon: Shield, label: 'Two-Factor Auth', href: '/account/2fa' },
				],
			},
			{
				title: 'Support',
				items: [
					{ icon: HelpCircle, label: 'Help Center', href: '/help' },
					{ icon: Mail, label: 'Contact Us', href: '/contact' },
				],
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<Card className="overflow-hidden">
					<CardContent className="p-6 space-y-6">
						<ProfileAvatar {...profileData.avatar} />
						<Separator />
						{profileData.sections.map((section, i) => (
							<MenuSection key={i} {...section} />
						))}
						<Separator />
						<LogoutButton />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
