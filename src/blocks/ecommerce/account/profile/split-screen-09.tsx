import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	ArrowUpRight,
	BarChart3,
	CreditCard,
	DollarSign,
	Gift,
	Heart,
	Package,
	Percent,
	Sparkles,
	Star,
	Tag,
	Ticket,
	TrendingUp,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';

const MembershipCard = ({
	src,
	fallback,
	name,
	tier,
	tierColor,
	tierBg,
	points,
	pointsValue,
}: {
	src: string;
	fallback: string;
	name: string;
	tier: string;
	tierColor: string;
	tierBg: string;
	points: number;
	pointsValue: string;
}) => (
	<div className={`relative overflow-hidden rounded-2xl ${tierBg} p-6`}>
		<div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
		<div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
		<div className="relative space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-12 ring-2 ring-white/20">
						<AvatarImage src={src} alt={name} />
						<AvatarFallback className="bg-white/20">{fallback}</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium text-white">{name}</p>
						<Badge className={`${tierColor} border-0`}>
							<Sparkles className="size-3 mr-1" />
							{tier}
						</Badge>
					</div>
				</div>
			</div>
			<div className="pt-4">
				<p className="text-sm text-white/70">Available Points</p>
				<div className="flex items-baseline gap-2">
					<span className="text-3xl font-bold text-white">
						{points.toLocaleString()}
					</span>
					<span className="text-sm text-white/70">≈ {pointsValue}</span>
				</div>
			</div>
		</div>
	</div>
);

const BenefitsList = ({
	items,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		value: string;
		active: boolean;
	}[];
}) => (
	<div className="space-y-2">
		{items.map((benefit, i) => (
			<div
				key={i}
				className={`flex items-center justify-between p-3 rounded-lg ${benefit.active ? 'bg-primary/10' : 'bg-muted/30'}`}
			>
				<div className="flex items-center gap-3">
					<benefit.icon
						className={`size-4 ${benefit.active ? 'text-primary' : 'text-muted-foreground'}`}
					/>
					<span className="text-sm">{benefit.label}</span>
				</div>
				<span
					className={`text-sm font-medium ${benefit.active ? 'text-primary' : 'text-muted-foreground'}`}
				>
					{benefit.value}
				</span>
			</div>
		))}
	</div>
);

const TierProgress = ({
	currentTier,
	nextTier,
	currentSpend,
	requiredSpend,
}: {
	currentTier: string;
	nextTier: string;
	currentSpend: number;
	requiredSpend: number;
}) => {
	const progress = (currentSpend / requiredSpend) * 100;
	return (
		<div className="p-4 rounded-xl bg-muted/30 space-y-3">
			<div className="flex justify-between text-sm">
				<span className="font-medium">{currentTier}</span>
				<span className="text-muted-foreground">{nextTier}</span>
			</div>
			<Progress value={progress} className="h-2" />
			<p className="text-xs text-muted-foreground text-center">
				Spend ${(requiredSpend - currentSpend).toLocaleString()} more to reach{' '}
				{nextTier}
			</p>
		</div>
	);
};

const EarningOpportunities = ({
	items,
}: {
	items: {
		icon: React.ElementType;
		title: string;
		reward: string;
		action: string;
		href: string;
	}[];
}) => (
	<div className="space-y-3">
		<h3 className="font-medium">Earn More Points</h3>
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors"
			>
				<div className="p-2 rounded-lg bg-primary/10">
					<item.icon className="size-4 text-primary" />
				</div>
				<div className="flex-1">
					<p className="text-sm font-medium">{item.title}</p>
					<p className="text-xs text-muted-foreground">{item.reward}</p>
				</div>
				<Button variant="ghost" size="sm" className="gap-1 text-xs" asChild>
					<Link href={item.href}>
						{item.action}
						<ArrowUpRight className="size-3" />
					</Link>
				</Button>
			</div>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		membership: {
			src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
			fallback: 'KW',
			name: 'Kevin Williams',
			tier: 'Gold Member',
			tierColor: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
			tierBg: 'bg-gradient-to-br from-amber-600 via-amber-500 to-orange-500',
			points: 12450,
			pointsValue: '$124.50',
		},
		benefits: [
			{
				icon: Percent,
				label: 'Member Discount',
				value: '10% off',
				active: true,
			},
			{
				icon: Truck,
				label: 'Free Shipping',
				value: 'Orders $50+',
				active: true,
			},
			{ icon: Gift, label: 'Birthday Bonus', value: '2x Points', active: true },
			{
				icon: Tag,
				label: 'Early Access',
				value: 'Sales & Drops',
				active: true,
			},
			{
				icon: CreditCard,
				label: 'Exclusive Offers',
				value: 'Monthly',
				active: false,
			},
		],
		tierProgress: {
			currentTier: 'Gold',
			nextTier: 'Platinum',
			currentSpend: 3500,
			requiredSpend: 5000,
		},
		opportunities: [
			{
				icon: Star,
				title: 'Write a Review',
				reward: '+50 points per review',
				action: 'Review',
				href: '/reviews',
			},
			{
				icon: Heart,
				title: 'Refer a Friend',
				reward: '+500 points each',
				action: 'Invite',
				href: '/referral',
			},
			{
				icon: BarChart3,
				title: 'Complete Profile',
				reward: '+100 points',
				action: 'Update',
				href: '/profile/edit',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="p-6">
						<div className="grid @lg:grid-cols-[1fr_300px] gap-6">
							<div className="space-y-6">
								<MembershipCard {...profileData.membership} />
								<TierProgress {...profileData.tierProgress} />
								<EarningOpportunities items={profileData.opportunities} />
							</div>
							<div className="space-y-4">
								<h3 className="font-medium">Your Benefits</h3>
								<BenefitsList items={profileData.benefits} />
								<Button className="w-full gap-2">
									<Wallet className="size-4" />
									Redeem Points
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

const Truck = ({ className }: { className?: string }) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
		<path d="M15 18H9" />
		<path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
		<circle cx="17" cy="18" r="2" />
		<circle cx="7" cy="18" r="2" />
	</svg>
);
