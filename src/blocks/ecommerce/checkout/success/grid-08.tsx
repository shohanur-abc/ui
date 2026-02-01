import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	CreditCard,
	Calendar,
	Package,
	Repeat,
	Zap,
	Settings,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface FeatureProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({ confirmationNumber }: { confirmationNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-violet-500/10 flex items-center justify-center">
			<CheckCircle className="size-10 text-violet-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Subscription Active!</h1>
			<p className="text-muted-foreground">#{confirmationNumber}</p>
		</div>
	</div>
);

const PlanCard = ({
	planName,
	planType,
	price,
	currency,
	interval,
}: {
	planName: string;
	planType: string;
	price: number;
	currency: string;
	interval: string;
}) => (
	<Card className="bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="text-center space-y-3">
				<Badge className="bg-white/20 text-white">{planType}</Badge>
				<h2 className="text-2xl font-bold">{planName}</h2>
				<div>
					<span className="text-4xl font-bold">
						{currency}
						{price}
					</span>
					<span className="opacity-80">/{interval}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const FeatureCard = ({ icon: Icon, title, description }: FeatureProps) => (
	<Card className="hover:shadow-md transition-shadow">
		<CardContent className="pt-6">
			<div className="text-center space-y-3">
				<div className="size-12 mx-auto rounded-xl bg-violet-500/10 flex items-center justify-center">
					<Icon className="size-6 text-violet-500" />
				</div>
				<div>
					<p className="font-semibold">{title}</p>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const BillingInfoCard = ({
	method,
	last4,
	nextDate,
	amount,
	currency,
}: {
	method: string;
	last4: string;
	nextDate: string;
	amount: number;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4 flex items-center gap-2">
				<CreditCard className="size-4" />
				Billing Info
			</h3>
			<div className="space-y-3">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Payment Method</span>
					<span className="font-medium">
						{method} •••• {last4}
					</span>
				</div>
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Next Billing</span>
					<span className="font-medium">{nextDate}</span>
				</div>
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Amount</span>
					<span className="font-medium">
						{currency}
						{amount.toFixed(2)}
					</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const DeliveryScheduleCard = ({
	deliveries,
}: {
	deliveries: { date: string; status: string }[];
}) => (
	<Card>
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4 flex items-center gap-2">
				<Calendar className="size-4" />
				Upcoming Deliveries
			</h3>
			<div className="space-y-2">
				{deliveries.map((delivery, i) => (
					<div
						key={i}
						className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
					>
						<span className="text-sm">{delivery.date}</span>
						<Badge variant="outline" className="text-xs">
							{delivery.status}
						</Badge>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const QuickActionsCard = () => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4">Quick Actions</h3>
			<div className="grid grid-cols-2 gap-2">
				<Button variant="outline" size="sm" className="gap-2">
					<Repeat className="size-4" />
					Frequency
				</Button>
				<Button variant="outline" size="sm" className="gap-2">
					<Package className="size-4" />
					Products
				</Button>
				<Button variant="outline" size="sm" className="gap-2">
					<CreditCard className="size-4" />
					Payment
				</Button>
				<Button variant="outline" size="sm" className="gap-2">
					<Settings className="size-4" />
					Settings
				</Button>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="gap-2"
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
	const features: FeatureProps[] = [
		{
			icon: Package,
			title: 'Monthly Box',
			description: 'Curated products delivered monthly',
		},
		{
			icon: Zap,
			title: '15% Discount',
			description: 'Save on all subscription orders',
		},
		{
			icon: Repeat,
			title: 'Flexible',
			description: 'Skip or pause anytime',
		},
		{
			icon: CreditCard,
			title: 'Free Shipping',
			description: 'On all subscription orders',
		},
	];

	const deliveries = [
		{ date: 'Feb 15, 2024', status: 'Scheduled' },
		{ date: 'Mar 15, 2024', status: 'Upcoming' },
		{ date: 'Apr 15, 2024', status: 'Upcoming' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader confirmationNumber="SUB-78432" />

				<PlanCard
					planName="Premium Coffee Club"
					planType="Monthly"
					price={49.99}
					currency="$"
					interval="month"
				/>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{features.map((feature, i) => (
						<FeatureCard key={i} {...feature} />
					))}
				</div>

				<div className="grid @lg:grid-cols-3 gap-6">
					<BillingInfoCard
						method="Visa"
						last4="4242"
						nextDate="Feb 15, 2024"
						amount={49.99}
						currency="$"
					/>
					<DeliveryScheduleCard deliveries={deliveries} />
					<QuickActionsCard />
				</div>

				<CTA
					items={[
						{
							label: 'Manage Subscription',
							href: '/subscription',
							icon: ArrowRight,
						},
						{ label: 'Shop Add-ons', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
