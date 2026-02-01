import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Repeat,
	CheckCircle,
	Calendar,
	CreditCard,
	ArrowRight,
	Package,
	Settings,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

interface SubscriptionProps {
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

const SubscriptionHeader = ({ plan }: { plan: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto">
			<Repeat className="size-10 text-indigo-500" />
		</div>
		<div>
			<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold">
				Welcome to {plan}!
			</h1>
			<p className="text-muted-foreground mt-2">
				Your subscription is now active
			</p>
		</div>
		<Badge className="bg-indigo-500">Active Subscription</Badge>
	</div>
);

const PlanCard = ({
	plan,
	price,
	currency,
	interval,
}: Omit<SubscriptionProps, 'features'>) => (
	<div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 text-white">
		<div className="flex items-center justify-between">
			<div>
				<p className="text-sm opacity-80">Your Plan</p>
				<p className="text-xl font-bold">{plan}</p>
			</div>
			<div className="text-right">
				<p className="text-3xl font-bold">
					{currency}
					{price}
				</p>
				<p className="text-sm opacity-80">per {interval}</p>
			</div>
		</div>
	</div>
);

const FeaturesList = ({ features }: { features: string[] }) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg">What's Included</h2>
		<div className="space-y-3">
			{features.map((feature, i) => (
				<div key={i} className="flex items-center gap-3">
					<div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
						<CheckCircle className="size-4 text-primary" />
					</div>
					<span className="text-sm">{feature}</span>
				</div>
			))}
		</div>
	</div>
);

const BillingInfo = ({
	nextBilling,
	paymentMethod,
	last4,
}: {
	nextBilling: string;
	paymentMethod: string;
	last4: string;
}) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg">Billing Information</h2>
		<div className="p-4 rounded-xl bg-muted/30 space-y-3">
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
		</div>
	</div>
);

const WelcomeBonus = ({
	bonuses,
}: {
	bonuses: { title: string; description: string }[];
}) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg flex items-center gap-2">
			<Zap className="size-5 text-amber-500" />
			Welcome Bonuses
		</h2>
		<div className="space-y-3">
			{bonuses.map((bonus, i) => (
				<div
					key={i}
					className="p-4 rounded-xl bg-amber-500/10 border border-amber-200 dark:border-amber-800/30"
				>
					<div className="flex items-start gap-3">
						<Package className="size-5 text-amber-500 mt-0.5" />
						<div>
							<p className="font-medium">{bonus.title}</p>
							<p className="text-sm text-muted-foreground">
								{bonus.description}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

const QuickLinks = () => (
	<div className="grid @sm:grid-cols-3 gap-3">
		<Button variant="outline" className="gap-2 justify-start" asChild>
			<Link href="/settings">
				<Settings className="size-4" />
				Settings
			</Link>
		</Button>
		<Button variant="outline" className="gap-2 justify-start" asChild>
			<Link href="/billing">
				<CreditCard className="size-4" />
				Billing
			</Link>
		</Button>
		<Button variant="outline" className="gap-2 justify-start" asChild>
			<Link href="/help">
				<Zap className="size-4" />
				Get Help
			</Link>
		</Button>
	</div>
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
	const features = [
		'Unlimited access to all premium features',
		'Priority customer support 24/7',
		'Advanced analytics and reporting',
		'Custom integrations and API access',
		'Team collaboration tools',
		'Early access to new features',
	];

	const bonuses = [
		{
			title: 'Extended Trial Period',
			description: 'Enjoy 30 extra days to explore all premium features',
		},
		{
			title: '20% Off Add-ons',
			description: 'Exclusive discount on premium add-ons for 3 months',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<SubscriptionHeader plan="Pro Plan" />

				<PlanCard plan="Pro Plan" price={29} currency="$" interval="month" />

				<Separator />

				<FeaturesList features={features} />

				<Separator />

				<BillingInfo
					nextBilling="February 15, 2024"
					paymentMethod="Visa"
					last4="4242"
				/>

				<WelcomeBonus bonuses={bonuses} />

				<QuickLinks />

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
