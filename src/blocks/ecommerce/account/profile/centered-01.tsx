import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Calendar,
	Edit2,
	Heart,
	Mail,
	MapPin,
	Package,
	Settings,
	Shield,
	Star,
} from 'lucide-react';
import Link from 'next/link';

const ProfileAvatar = ({
	src,
	fallback,
	verified,
}: {
	src: string;
	fallback: string;
	verified: boolean;
}) => (
	<div className="relative">
		<Avatar className="size-28 @sm:size-32 ring-4 ring-border shadow-xl">
			<AvatarImage src={src} alt="Profile" />
			<AvatarFallback className="bg-primary text-primary-foreground text-4xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		{verified && (
			<div className="absolute bottom-1 right-1 p-1.5 bg-blue-500 rounded-full ring-4 ring-background">
				<Shield className="size-4 text-white fill-white/20" />
			</div>
		)}
	</div>
);

const ProfileInfo = ({
	name,
	email,
	location,
	memberSince,
	tier,
	tierColor,
}: {
	name: string;
	email: string;
	location: string;
	memberSince: string;
	tier: string;
	tierColor: string;
}) => (
	<div className="text-center space-y-2">
		<h1 className="text-2xl @sm:text-3xl font-bold">{name}</h1>
		<div className="flex items-center justify-center gap-2 text-muted-foreground">
			<Mail className="size-4" />
			<span className="text-sm">{email}</span>
		</div>
		<div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
			<div className="flex items-center gap-1">
				<MapPin className="size-4" />
				<span>{location}</span>
			</div>
			<div className="flex items-center gap-1">
				<Calendar className="size-4" />
				<span>Since {memberSince}</span>
			</div>
		</div>
		<Badge className={`${tierColor} mt-2`}>{tier} Member</Badge>
	</div>
);

const ProfileStats = ({
	items,
}: {
	items: { icon: React.ElementType; value: string; label: string }[];
}) => (
	<div className="flex justify-center gap-6 @sm:gap-10">
		{items.map((stat, i) => (
			<div key={i} className="text-center">
				<div className="flex items-center justify-center gap-1 mb-1">
					<stat.icon className="size-5 text-muted-foreground" />
					<span className="text-2xl @sm:text-3xl font-bold">{stat.value}</span>
				</div>
				<p className="text-sm text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);

const ProfileActions = () => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		<Button className="gap-2" asChild>
			<Link href="/profile/edit">
				<Edit2 className="size-4" />
				Edit Profile
			</Link>
		</Button>
		<Button variant="outline" className="gap-2" asChild>
			<Link href="/settings">
				<Settings className="size-4" />
				Settings
			</Link>
		</Button>
	</div>
);

export default function Main() {
	const profileData = {
		avatar: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			fallback: 'JD',
			verified: true,
		},
		info: {
			name: 'James Davidson',
			email: 'james.d@example.com',
			location: 'San Francisco, CA',
			memberSince: 'Mar 2022',
			tier: 'Gold',
			tierColor: 'bg-amber-500/20 text-amber-600',
		},
		stats: [
			{ icon: Package, value: '128', label: 'Orders' },
			{ icon: Heart, value: '45', label: 'Wishlist' },
			{ icon: Star, value: '67', label: 'Reviews' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @lg:px-8 py-12 @md:py-16">
				<Card>
					<CardContent className="p-8 @sm:p-12 flex flex-col items-center gap-8">
						<ProfileAvatar {...profileData.avatar} />
						<ProfileInfo {...profileData.info} />
						<ProfileStats items={profileData.stats} />
						<ProfileActions />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
