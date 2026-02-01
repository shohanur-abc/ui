'use client';

import {
	ArrowUpRight,
	DollarSign,
	type LucideIcon,
	ShoppingBag,
	Star,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

type IconStatProps = {
	icon: LucideIcon;
	value: string;
	label: string;
};

const IconStat = ({ icon: Icon, value, label }: IconStatProps) => (
	<div className="flex items-center gap-2">
		<div className="rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/20">
			<Icon className="size-3 text-primary" />
		</div>
		<div>
			<p className="text-sm font-semibold">{value}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
		</div>
	</div>
);

type ProfileCardProps = {
	avatar: string;
	initials: string;
	name: string;
	role: string;
	stats: { icon: LucideIcon; value: string; label: string }[];
};

const ProfileCard = ({
	avatar,
	initials,
	name,
	role,
	stats,
}: ProfileCardProps) => (
	<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<CardContent className="p-4 @sm:p-5 @lg:p-6">
			<div className="flex items-start gap-4">
				<Avatar className="size-12 @sm:size-14 ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
					<AvatarImage src={avatar} />
					<AvatarFallback className="bg-primary/10 text-primary">
						{initials}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between gap-2 mb-1">
						<h3 className="font-semibold truncate">{name}</h3>
						<ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-primary" />
					</div>
					<p className="text-sm text-muted-foreground mb-3">{role}</p>
					<div className="grid grid-cols-3 gap-3">
						{stats.map((stat, i) => (
							<IconStat key={i} {...stat} />
						))}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const profiles: ProfileCardProps[] = [
	{
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
		initials: 'JD',
		name: 'John Doe',
		role: 'Top Seller',
		stats: [
			{ icon: DollarSign, value: '$45K', label: 'Sales' },
			{ icon: ShoppingBag, value: '234', label: 'Orders' },
			{ icon: Star, value: '4.9', label: 'Rating' },
		],
	},
	{
		avatar:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
		initials: 'SM',
		name: 'Sarah Miller',
		role: 'Account Manager',
		stats: [
			{ icon: Users, value: '156', label: 'Clients' },
			{ icon: DollarSign, value: '$38K', label: 'Revenue' },
			{ icon: Star, value: '4.8', label: 'Rating' },
		],
	},
	{
		avatar:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
		initials: 'MW',
		name: 'Mike Wilson',
		role: 'Sales Lead',
		stats: [
			{ icon: ShoppingBag, value: '189', label: 'Deals' },
			{ icon: DollarSign, value: '$52K', label: 'Closed' },
			{ icon: Star, value: '4.7', label: 'Rating' },
		],
	},
	{
		avatar:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
		initials: 'EJ',
		name: 'Emily Johnson',
		role: 'Support Lead',
		stats: [
			{ icon: Users, value: '892', label: 'Tickets' },
			{ icon: Star, value: '4.9', label: 'CSAT' },
			{ icon: DollarSign, value: '$28K', label: 'Saved' },
		],
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-4 @lg:gap-6">
					{profiles.map((profile, i) => (
						<ProfileCard key={i} {...profile} />
					))}
				</div>
			</div>
		</section>
	);
}
