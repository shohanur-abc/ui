import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Repeat,
	Calendar,
	CreditCard,
	Package,
	ArrowRight,
	CheckCircle,
	Settings,
	Bell,
} from 'lucide-react';
import Link from 'next/link';

interface SubscriptionDetailsProps {
	plan: string;
	price: number;
	currency: string;
	interval: string;
	features: string[];
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SubscriptionSuccessCard = ({ plan }: { plan: string }) => (
	<Card className="bg-gradient-to-r from-indigo-500/10 via-violet-500/5 to-purple-500/10 border-indigo-200 dark:border-indigo-800/30">
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-14 rounded-full bg-indigo-500/10 flex items-center justify-center">
					<CheckCircle className="size-7 text-indigo-500" />
				</div>
				<div className="flex-1">
					<h1 className="text-xl @lg:text-2xl font-bold">
						Subscription Active!
					</h1>
					<p className="text-muted-foreground">Welcome to {plan}</p>
				</div>
				<Badge className="bg-indigo-500">Active</Badge>
			</div>
		</CardContent>
	</Card>
);

const PlanDetailsCard = ({
	plan,
	price,
	currency,
	interval,
	features,
}: SubscriptionDetailsProps) => (
	<Card>
		<CardHeader>
			<div className="flex items-center justify-between">
				<CardTitle className="text-base">{plan}</CardTitle>
				<div className="text-right">
					<span className="text-2xl font-bold">
						{currency}
						{price}
					</span>
					<span className="text-muted-foreground">/{interval}</span>
				</div>
			</div>
		</CardHeader>
		<CardContent>
			<ul className="space-y-2">
				{features.map((feature, i) => (
					<li key={i} className="flex items-center gap-2 text-sm">
						<CheckCircle className="size-4 text-primary shrink-0" />
						{feature}
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);

const BillingCard = ({
	nextBilling,
	paymentMethod,
	last4,
}: {
	nextBilling: string;
	paymentMethod: string;
	last4: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<CreditCard className="size-4" />
				Billing Information
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-muted-foreground" />
					<span className="text-sm text-muted-foreground">Next Billing</span>
				</div>
				<span className="font-medium">{nextBilling}</span>
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<CreditCard className="size-4 text-muted-foreground" />
					<span className="text-sm text-muted-foreground">Payment Method</span>
				</div>
				<span className="font-medium">
					{paymentMethod} •••• {last4}
				</span>
			</div>
		</CardContent>
	</Card>
);

const WelcomeBonusCard = ({
	bonuses,
}: {
	bonuses: { title: string; description: string }[];
}) => (
	<Card className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-amber-200 dark:border-amber-800/30">
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Package className="size-4 text-amber-500" />
				Welcome Bonuses
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{bonuses.map((bonus, i) => (
				<div
					key={i}
					className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
				>
					<CheckCircle className="size-5 text-amber-500 shrink-0 mt-0.5" />
					<div>
						<p className="font-medium text-sm">{bonus.title}</p>
						<p className="text-xs text-muted-foreground">{bonus.description}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const QuickActionsCard = () => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Quick Actions</CardTitle>
		</CardHeader>
		<CardContent className="grid @sm:grid-cols-2 gap-3">
			<Button variant="outline" className="gap-2 justify-start">
				<Settings className="size-4" />
				Manage Subscription
			</Button>
			<Button variant="outline" className="gap-2 justify-start">
				<Bell className="size-4" />
				Notification Settings
			</Button>
			<Button variant="outline" className="gap-2 justify-start">
				<CreditCard className="size-4" />
				Update Payment
			</Button>
			<Button variant="outline" className="gap-2 justify-start">
				<Repeat className="size-4" />
				Change Plan
			</Button>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const planFeatures = [
		'Unlimited access to all features',
		'Priority customer support',
		'Advanced analytics dashboard',
		'Custom integrations',
		'Team collaboration tools',
	];

	const welcomeBonuses = [
		{
			title: 'Free Extended Trial',
			description: '30 extra days to explore premium features',
		},
		{
			title: '20% Off Add-ons',
			description: 'Discount on all premium add-ons for 3 months',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<SubscriptionSuccessCard plan="Pro Plan" />

				<div className="grid @md:grid-cols-2 gap-6">
					<PlanDetailsCard
						plan="Pro Plan"
						price={29}
						currency="$"
						interval="month"
						features={planFeatures}
					/>
					<div className="space-y-6">
						<BillingCard
							nextBilling="Feb 15, 2024"
							paymentMethod="Visa"
							last4="4242"
						/>
						<WelcomeBonusCard bonuses={welcomeBonuses} />
					</div>
				</div>

				<QuickActionsCard />

				<CTA
					items={[
						{ label: 'Get Started', href: '/dashboard', icon: ArrowRight },
						{ label: 'View Account', href: '/account', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
