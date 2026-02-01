import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowRight,
	Award,
	Calendar,
	CreditCard,
	Gift,
	Heart,
	MapPin,
	Package,
	Settings,
	Star,
	TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

const ProfileCell = ({
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
	<Card className="col-span-2 row-span-2">
		<CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
			<Avatar className="size-20 @md:size-24 mb-4 ring-4 ring-primary/20">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<h2 className="text-xl font-bold">{name}</h2>
			<p className="text-sm text-muted-foreground mb-2">{email}</p>
			<div className="flex items-center gap-1 text-xs text-muted-foreground">
				<Calendar className="size-3" />
				<span>Member since {memberSince}</span>
			</div>
			<Button className="mt-4 gap-2" size="sm" asChild>
				<Link href="/profile/edit">
					<Settings className="size-4" />
					Edit Profile
				</Link>
			</Button>
		</CardContent>
	</Card>
);

const StatCell = ({
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
			<CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
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

const LoyaltyCell = ({
	points,
	maxPoints,
	tier,
}: {
	points: number;
	maxPoints: number;
	tier: string;
}) => (
	<Card className="col-span-2">
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Award className="size-5 text-amber-500" />
					<span className="font-medium">Loyalty</span>
				</div>
				<Badge className="bg-amber-500/20 text-amber-600">{tier}</Badge>
			</div>
			<div className="space-y-1">
				<div className="flex justify-between text-sm">
					<span>{points.toLocaleString()} pts</span>
					<span className="text-muted-foreground">
						{maxPoints.toLocaleString()}
					</span>
				</div>
				<Progress value={(points / maxPoints) * 100} className="h-2" />
			</div>
		</CardContent>
	</Card>
);

const QuickActionCell = ({
	icon: Icon,
	label,
	href,
	color,
}: {
	icon: React.ElementType;
	label: string;
	href: string;
	color: string;
}) => (
	<Link href={href}>
		<Card className="h-full hover:bg-muted/50 transition-colors">
			<CardContent className="p-4 flex items-center gap-3">
				<div className={`p-2 rounded-lg ${color}`}>
					<Icon className="size-4" />
				</div>
				<span className="text-sm font-medium">{label}</span>
				<ArrowRight className="size-4 text-muted-foreground ml-auto" />
			</CardContent>
		</Card>
	</Link>
);

export default function Main() {
	const profileData = {
		profile: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			fallback: 'AK',
			name: 'Alex Kim',
			email: 'alex.kim@example.com',
			memberSince: 'Jan 2023',
		},
		stats: [
			{
				icon: Package,
				label: 'Orders',
				value: '47',
				color: 'bg-blue-500/20 text-blue-500',
				href: '/orders',
			},
			{
				icon: Heart,
				label: 'Wishlist',
				value: '12',
				color: 'bg-pink-500/20 text-pink-500',
				href: '/wishlist',
			},
			{
				icon: Star,
				label: 'Reviews',
				value: '28',
				color: 'bg-amber-500/20 text-amber-500',
				href: '/reviews',
			},
			{
				icon: TrendingUp,
				label: 'Savings',
				value: '$340',
				color: 'bg-green-500/20 text-green-500',
				href: '/savings',
			},
		],
		loyalty: {
			points: 7500,
			maxPoints: 10000,
			tier: 'Gold',
		},
		quickActions: [
			{
				icon: MapPin,
				label: 'Addresses',
				href: '/addresses',
				color: 'bg-purple-500/20 text-purple-500',
			},
			{
				icon: CreditCard,
				label: 'Payment',
				href: '/payment',
				color: 'bg-cyan-500/20 text-cyan-500',
			},
			{
				icon: Gift,
				label: 'Rewards',
				href: '/rewards',
				color: 'bg-orange-500/20 text-orange-500',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
					<ProfileCell {...profileData.profile} />
					{profileData.stats.map((stat, i) => (
						<StatCell key={i} {...stat} />
					))}
					<LoyaltyCell {...profileData.loyalty} />
					{profileData.quickActions.map((action, i) => (
						<QuickActionCell key={i} {...action} />
					))}
				</div>
			</div>
		</section>
	);
}
