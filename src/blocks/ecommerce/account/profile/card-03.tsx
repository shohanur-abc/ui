import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ChevronRight,
	CreditCard,
	Heart,
	HelpCircle,
	LogOut,
	MapPin,
	Package,
	Settings,
	Shield,
	User,
} from 'lucide-react';
import Link from 'next/link';

const ProfileBanner = ({
	coverUrl,
	avatarSrc,
	avatarFallback,
	name,
	email,
	verified,
}: {
	coverUrl: string;
	avatarSrc: string;
	avatarFallback: string;
	name: string;
	email: string;
	verified: boolean;
}) => (
	<div className="relative">
		<div
			className="h-24 @md:h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 rounded-t-xl"
			style={{
				backgroundImage: coverUrl ? `url(${coverUrl})` : undefined,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		/>
		<div className="absolute -bottom-10 left-6">
			<Avatar className="size-20 ring-4 ring-background">
				<AvatarImage src={avatarSrc} alt={name} />
				<AvatarFallback className="bg-primary text-primary-foreground text-xl">
					{avatarFallback}
				</AvatarFallback>
			</Avatar>
		</div>
		<div className="pt-12 px-6 pb-4">
			<div className="flex items-center gap-2">
				<h2 className="text-lg font-semibold">{name}</h2>
				{verified && <Shield className="size-4 text-primary fill-primary/20" />}
			</div>
			<p className="text-sm text-muted-foreground">{email}</p>
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
		destructive?: boolean;
	}[];
}) => (
	<div className="space-y-1">
		<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
			{title}
		</p>
		{items.map((item, i) => (
			<Button
				key={i}
				variant="ghost"
				className={`w-full justify-between h-11 px-3 ${item.destructive ? 'text-destructive hover:text-destructive hover:bg-destructive/10' : ''}`}
				asChild
			>
				<Link href={item.href}>
					<span className="flex items-center gap-3">
						<item.icon className="size-4" />
						<span>{item.label}</span>
					</span>
					<span className="flex items-center gap-2">
						{item.badge && (
							<Badge variant="secondary" className="text-xs">
								{item.badge}
							</Badge>
						)}
						<ChevronRight className="size-4 text-muted-foreground" />
					</span>
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		banner: {
			coverUrl: '',
			avatarSrc:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			avatarFallback: 'MK',
			name: 'Michael Kim',
			email: 'm.kim@example.com',
			verified: true,
		},
		menuSections: [
			{
				title: 'Shopping',
				items: [
					{
						icon: Package,
						label: 'My Orders',
						href: '/orders',
						badge: '3 Active',
					},
					{ icon: Heart, label: 'Wishlist', href: '/wishlist', badge: '12' },
					{ icon: MapPin, label: 'Addresses', href: '/addresses' },
					{ icon: CreditCard, label: 'Payment Methods', href: '/payment' },
				],
			},
			{
				title: 'Account',
				items: [
					{ icon: User, label: 'Personal Info', href: '/profile/edit' },
					{ icon: Settings, label: 'Settings', href: '/settings' },
					{ icon: HelpCircle, label: 'Help Center', href: '/help' },
				],
			},
			{
				title: '',
				items: [
					{
						icon: LogOut,
						label: 'Log Out',
						href: '/logout',
						destructive: true,
					},
				],
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card className="overflow-hidden">
					<CardHeader className="p-0">
						<ProfileBanner {...profileData.banner} />
					</CardHeader>
					<Separator />
					<CardContent className="p-2 space-y-2">
						{profileData.menuSections.map((section, i) => (
							<MenuSection
								key={i}
								title={section.title}
								items={section.items}
							/>
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
