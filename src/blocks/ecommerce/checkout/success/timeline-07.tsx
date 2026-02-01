import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	CreditCard,
	Package,
	Repeat,
	Calendar,
	Bell,
	Settings,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	icon: React.ElementType;
	title: string;
	description: string;
	date: string;
	status: 'completed' | 'current' | 'upcoming';
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({ subscriptionId }: { subscriptionId: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
			<Repeat className="size-10 text-emerald-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Subscription Active!</h1>
			<p className="text-muted-foreground">#{subscriptionId}</p>
		</div>
	</div>
);

const PlanCard = ({
	planName,
	price,
	interval,
	nextBilling,
}: {
	planName: string;
	price: string;
	interval: string;
	nextBilling: string;
}) => (
	<Card className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div>
					<Badge className="bg-white/20 text-white mb-2">{interval}</Badge>
					<h2 className="text-xl font-bold">{planName}</h2>
					<p className="text-3xl font-bold mt-2">{price}</p>
				</div>
				<div className="text-right">
					<p className="text-sm opacity-80">Next billing</p>
					<p className="font-semibold">{nextBilling}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const TimelineStep = ({
	icon: Icon,
	title,
	description,
	date,
	status,
}: TimelineStepProps) => (
	<div className="relative flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`size-10 rounded-full flex items-center justify-center ${
					status === 'completed'
						? 'bg-emerald-500 text-white'
						: status === 'current'
							? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 w-0.5 bg-border mt-2" />
		</div>
		<div className="pb-6 flex-1">
			<div className="flex items-center justify-between">
				<h3
					className={`font-semibold ${
						status === 'upcoming' ? 'text-muted-foreground' : ''
					}`}
				>
					{title}
				</h3>
				<span className="text-sm text-muted-foreground">{date}</span>
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const FeatureCard = ({
	features,
}: {
	features: { icon: React.ElementType; label: string }[];
}) => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4">Plan Benefits</h3>
			<div className="grid @sm:grid-cols-2 gap-3">
				{features.map((feature, i) => (
					<div key={i} className="flex items-center gap-2">
						<feature.icon className="size-4 text-emerald-500" />
						<span className="text-sm">{feature.label}</span>
					</div>
				))}
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
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const timelineSteps: TimelineStepProps[] = [
		{
			icon: CheckCircle,
			title: 'Subscription Started',
			description: 'Your premium plan is now active',
			date: 'Today',
			status: 'completed',
		},
		{
			icon: CreditCard,
			title: 'Payment Method Saved',
			description: 'Visa ending in 4242',
			date: 'Today',
			status: 'completed',
		},
		{
			icon: Package,
			title: 'First Delivery',
			description: 'Your first box ships next week',
			date: 'Jan 22',
			status: 'current',
		},
		{
			icon: Calendar,
			title: 'Monthly Renewal',
			description: 'Automatic billing',
			date: 'Feb 15',
			status: 'upcoming',
		},
		{
			icon: Package,
			title: 'Second Delivery',
			description: 'Monthly box arrives',
			date: 'Feb 22',
			status: 'upcoming',
		},
	];

	const features = [
		{ icon: CheckCircle, label: 'Free shipping' },
		{ icon: CheckCircle, label: '15% discount' },
		{ icon: CheckCircle, label: 'Early access' },
		{ icon: CheckCircle, label: 'Cancel anytime' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader subscriptionId="SUB-78432" />

				<PlanCard
					planName="Premium Coffee Club"
					price="$49.99/mo"
					interval="Monthly"
					nextBilling="Feb 15, 2024"
				/>

				<Card>
					<CardContent className="pt-6">
						<h2 className="font-semibold mb-6">Subscription Timeline</h2>
						<div>
							{timelineSteps.map((step, i) => (
								<TimelineStep key={i} {...step} />
							))}
						</div>
					</CardContent>
				</Card>

				<FeatureCard features={features} />

				<CTA
					items={[
						{
							label: 'Manage Subscription',
							href: '/subscription',
							icon: Settings,
						},
						{ label: 'Shop Add-ons', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
