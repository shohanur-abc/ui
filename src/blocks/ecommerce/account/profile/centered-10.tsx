import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	AlertTriangle,
	Calendar,
	Check,
	ChevronRight,
	Clock,
	CreditCard,
	Crown,
	Gift,
	Pause,
	Play,
	RefreshCw,
	Settings,
	Sparkles,
	Star,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const SubscriptionHeader = ({
	src,
	fallback,
	name,
	plan,
	planIcon: PlanIcon,
	status,
	renewalDate,
}: {
	src: string;
	fallback: string;
	name: string;
	plan: string;
	planIcon: React.ElementType;
	status: 'active' | 'paused' | 'expiring';
	renewalDate: string;
}) => (
	<div className="text-center space-y-4">
		<div className="relative inline-block">
			<Avatar className="size-20 ring-4 ring-primary/20">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="bg-primary text-primary-foreground text-xl">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<div className="absolute -bottom-2 -right-2 p-1.5 bg-primary rounded-full">
				<PlanIcon className="size-4 text-primary-foreground" />
			</div>
		</div>
		<div>
			<h1 className="text-xl font-bold">{name}</h1>
			<Badge
				className={`mt-2 ${
					status === 'active'
						? 'bg-green-500/20 text-green-600'
						: status === 'paused'
							? 'bg-amber-500/20 text-amber-600'
							: 'bg-red-500/20 text-red-600'
				}`}
			>
				{status === 'active' && <Check className="size-3 mr-1" />}
				{status === 'paused' && <Pause className="size-3 mr-1" />}
				{status === 'expiring' && <AlertTriangle className="size-3 mr-1" />}
				{plan} • {status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
		</div>
		<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
			<Calendar className="size-4" />
			<span>Renews {renewalDate}</span>
		</div>
	</div>
);

const PlanDetails = ({
	price,
	billing,
	nextCharge,
	savedAmount,
}: {
	price: string;
	billing: string;
	nextCharge: string;
	savedAmount: string;
}) => (
	<div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 space-y-3">
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">Current Plan</span>
			<div className="text-right">
				<span className="text-2xl font-bold">{price}</span>
				<span className="text-sm text-muted-foreground">/{billing}</span>
			</div>
		</div>
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Next charge</span>
			<span className="font-medium">{nextCharge}</span>
		</div>
		<Badge className="bg-green-500/20 text-green-600 w-full justify-center py-1">
			<Sparkles className="size-3 mr-1" />
			You&apos;ve saved {savedAmount} this year!
		</Badge>
	</div>
);

const BenefitsUsage = ({
	benefits,
}: {
	benefits: {
		icon: React.ElementType;
		label: string;
		used: number;
		limit: number;
		unit: string;
	}[];
}) => (
	<div className="space-y-4">
		<h3 className="text-sm font-semibold text-center">
			Benefits Usage This Month
		</h3>
		<div className="space-y-3">
			{benefits.map((benefit, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<benefit.icon className="size-4 text-muted-foreground" />
							<span>{benefit.label}</span>
						</div>
						<span className="text-muted-foreground">
							{benefit.used}/{benefit.limit} {benefit.unit}
						</span>
					</div>
					<Progress
						value={(benefit.used / benefit.limit) * 100}
						className="h-2"
					/>
				</div>
			))}
		</div>
	</div>
);

const QuickActions = ({
	actions,
}: {
	actions: { icon: React.ElementType; label: string; href: string }[];
}) => (
	<div className="grid grid-cols-2 gap-3">
		{actions.map((action, i) => (
			<Link
				key={i}
				href={action.href}
				className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
			>
				<action.icon className="size-4 text-muted-foreground" />
				<span className="text-sm font-medium">{action.label}</span>
			</Link>
		))}
	</div>
);

const UpgradeBanner = ({
	plan,
	discount,
}: {
	plan: string;
	discount: string;
}) => (
	<div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-500/30 text-center space-y-3">
		<div className="flex items-center justify-center gap-2">
			<Crown className="size-5 text-amber-500" />
			<span className="font-semibold">Upgrade to {plan}</span>
		</div>
		<p className="text-sm text-muted-foreground">
			Get more benefits and exclusive perks
		</p>
		<Badge className="bg-amber-500/20 text-amber-600">{discount}</Badge>
		<Button className="w-full mt-2" asChild>
			<Link href="/subscription/upgrade">
				View Plans <ChevronRight className="size-4 ml-1" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
			fallback: 'KP',
			name: 'Kelly Peterson',
			plan: 'Premium',
			planIcon: Star,
			status: 'active' as const,
			renewalDate: 'Feb 15, 2024',
		},
		planDetails: {
			price: '$14.99',
			billing: 'month',
			nextCharge: 'Feb 15, 2024',
			savedAmount: '$89.94',
		},
		benefits: [
			{
				icon: Gift,
				label: 'Free Shipping',
				used: 8,
				limit: 10,
				unit: 'orders',
			},
			{ icon: Zap, label: 'Express Delivery', used: 3, limit: 5, unit: 'uses' },
			{
				icon: Star,
				label: 'Exclusive Access',
				used: 2,
				limit: 3,
				unit: 'events',
			},
		],
		quickActions: [
			{ icon: CreditCard, label: 'Payment', href: '/subscription/payment' },
			{ icon: RefreshCw, label: 'Change Plan', href: '/subscription/plans' },
			{ icon: Pause, label: 'Pause', href: '/subscription/pause' },
			{ icon: Settings, label: 'Settings', href: '/subscription/settings' },
		],
		upgrade: {
			plan: 'Premium Plus',
			discount: 'Save 20% annually',
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<Card>
					<CardContent className="p-6 space-y-6">
						<SubscriptionHeader {...profileData.header} />
						<PlanDetails {...profileData.planDetails} />
						<Separator />
						<BenefitsUsage benefits={profileData.benefits} />
						<Separator />
						<QuickActions actions={profileData.quickActions} />
						<UpgradeBanner {...profileData.upgrade} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
