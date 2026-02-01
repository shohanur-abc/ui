import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	Edit,
	Mail,
	MapPin,
	Phone,
	Settings,
	ShoppingBag,
	User,
} from 'lucide-react';
import Link from 'next/link';

const ProfileAvatar = ({
	src,
	fallback,
	status,
}: {
	src: string;
	fallback: string;
	status: string;
}) => (
	<div className="relative">
		<Avatar className="size-20 @md:size-24 @lg:size-28 ring-4 ring-primary/10">
			<AvatarImage src={src} alt="Profile" />
			<AvatarFallback className="text-xl @md:text-2xl bg-primary text-primary-foreground">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<Badge
			variant="secondary"
			className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs"
		>
			{status}
		</Badge>
	</div>
);

const ProfileName = ({ name, email }: { name: string; email: string }) => (
	<div className="text-center @md:text-left">
		<h2 className="text-lg @md:text-xl font-semibold tracking-tight">{name}</h2>
		<p className="text-sm text-muted-foreground">{email}</p>
	</div>
);

const ProfileStats = ({
	items,
}: {
	items: { label: string; value: string }[];
}) => (
	<div className="grid grid-cols-3 gap-4 text-center">
		{items.map((stat, i) => (
			<div key={i} className="space-y-1">
				<p className="text-lg @md:text-xl font-bold text-primary">
					{stat.value}
				</p>
				<p className="text-xs text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);

const ProfileInfo = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; value: string }[];
}) => (
	<div className="space-y-3">
		{items.map((item, i) => (
			<div key={i} className="flex items-center gap-3 text-sm">
				<item.icon className="size-4 text-muted-foreground shrink-0" />
				<span className="text-muted-foreground">{item.label}:</span>
				<span className="font-medium">{item.value}</span>
			</div>
		))}
	</div>
);

const ProfileActions = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon: React.ElementType;
		variant?: 'default' | 'outline' | 'secondary' | 'ghost';
	}[];
}) => (
	<div className="flex flex-wrap gap-2">
		{items.map((action, i) => (
			<Button
				key={i}
				variant={action.variant || 'default'}
				size="sm"
				className="gap-2"
				asChild
			>
				<Link href={action.href}>
					<action.icon className="size-4" />
					{action.label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		avatar: {
			src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
			fallback: 'JD',
			status: 'Premium',
		},
		name: 'John Doe',
		email: 'john.doe@example.com',
		stats: [
			{ label: 'Orders', value: '48' },
			{ label: 'Wishlist', value: '12' },
			{ label: 'Reviews', value: '24' },
		],
		info: [
			{ icon: Phone, label: 'Phone', value: '+1 234 567 890' },
			{ icon: MapPin, label: 'Location', value: 'New York, USA' },
			{ icon: Calendar, label: 'Member Since', value: 'Jan 2024' },
		],
		actions: [
			{
				label: 'Edit Profile',
				href: '/account/edit',
				icon: Edit,
				variant: 'default' as const,
			},
			{
				label: 'Settings',
				href: '/account/settings',
				icon: Settings,
				variant: 'outline' as const,
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card className="overflow-hidden">
					<CardHeader className="flex flex-col @md:flex-row items-center gap-4 pb-4">
						<ProfileAvatar {...profileData.avatar} />
						<ProfileName name={profileData.name} email={profileData.email} />
					</CardHeader>
					<Separator />
					<CardContent className="pt-6 space-y-6">
						<ProfileStats items={profileData.stats} />
						<Separator />
						<ProfileInfo items={profileData.info} />
					</CardContent>
					<CardFooter className="pt-2">
						<ProfileActions items={profileData.actions} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
