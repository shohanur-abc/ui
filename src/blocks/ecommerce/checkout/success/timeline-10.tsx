import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	CheckCircle,
	Leaf,
	TreePine,
	Package,
	Truck,
	Home,
	Wind,
	Recycle,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	icon: React.ElementType;
	title: string;
	description: string;
	time: string;
	status: 'completed' | 'current' | 'upcoming';
	ecoImpact?: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({ orderNumber }: { orderNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
			<Leaf className="size-10 text-emerald-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Eco Order Confirmed!</h1>
			<p className="text-muted-foreground">Order #{orderNumber}</p>
		</div>
		<Badge className="bg-emerald-500 gap-1">
			<Leaf className="size-3" />
			Carbon Neutral Delivery
		</Badge>
	</div>
);

const ImpactCard = ({
	carbonSaved,
	treesPlanted,
}: {
	carbonSaved: string;
	treesPlanted: number;
}) => (
	<Card className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="grid @sm:grid-cols-2 gap-6 text-center">
				<div className="p-4 rounded-xl bg-white/10">
					<Wind className="size-8 mx-auto mb-2 opacity-80" />
					<p className="text-3xl font-bold">{carbonSaved}</p>
					<p className="text-sm opacity-80">CO₂ Offset</p>
				</div>
				<div className="p-4 rounded-xl bg-white/10">
					<TreePine className="size-8 mx-auto mb-2 opacity-80" />
					<p className="text-3xl font-bold">{treesPlanted}</p>
					<p className="text-sm opacity-80">Trees Planted</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const TimelineStep = ({
	icon: Icon,
	title,
	description,
	time,
	status,
	ecoImpact,
}: TimelineStepProps) => (
	<div className="relative flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`size-10 rounded-full flex items-center justify-center ${
					status === 'completed'
						? 'bg-emerald-500 text-white'
						: status === 'current'
							? 'bg-green-500 text-white ring-4 ring-green-500/20'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 w-0.5 bg-border mt-2" />
		</div>
		<div className="pb-6 flex-1">
			<div className="flex items-start justify-between flex-wrap gap-2">
				<div>
					<h3
						className={`font-semibold ${
							status === 'upcoming' ? 'text-muted-foreground' : ''
						}`}
					>
						{title}
					</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
				<div className="text-right">
					<span className="text-sm text-muted-foreground">{time}</span>
					{ecoImpact && (
						<Badge variant="outline" className="ml-2 text-emerald-600 border-emerald-200">
							<Leaf className="size-3 mr-1" />
							{ecoImpact}
						</Badge>
					)}
				</div>
			</div>
		</div>
	</div>
);

const LifetimeImpactCard = ({
	orders,
	carbon,
	trees,
	progress,
	nextMilestone,
}: {
	orders: number;
	carbon: string;
	trees: number;
	progress: number;
	nextMilestone: string;
}) => (
	<Card className="bg-emerald-500/5 border-emerald-200 dark:border-emerald-800/30">
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4 text-emerald-700 dark:text-emerald-400">
				Your Eco Journey
			</h3>
			<div className="grid grid-cols-3 gap-4 text-center mb-4">
				<div>
					<p className="text-2xl font-bold">{orders}</p>
					<p className="text-xs text-muted-foreground">Eco Orders</p>
				</div>
				<div>
					<p className="text-2xl font-bold">{carbon}</p>
					<p className="text-xs text-muted-foreground">CO₂ Saved</p>
				</div>
				<div>
					<p className="text-2xl font-bold">{trees}</p>
					<p className="text-xs text-muted-foreground">Trees</p>
				</div>
			</div>
			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Next milestone</span>
					<span className="font-medium text-emerald-600">{nextMilestone}</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const timelineSteps: TimelineStepProps[] = [
		{
			icon: CheckCircle,
			title: 'Order Confirmed',
			description: 'Eco-friendly packaging selected',
			time: 'Jan 15',
			status: 'completed',
			ecoImpact: '-0.5 kg CO₂',
		},
		{
			icon: Package,
			title: 'Sustainable Packing',
			description: 'Items packed in recycled materials',
			time: 'Jan 15',
			status: 'completed',
			ecoImpact: 'Plastic-free',
		},
		{
			icon: Truck,
			title: 'Green Shipping',
			description: 'Electric vehicle delivery',
			time: 'Jan 16',
			status: 'current',
			ecoImpact: '-2.0 kg CO₂',
		},
		{
			icon: Home,
			title: 'Carbon Neutral Delivery',
			description: 'Offset credits applied',
			time: 'Jan 18',
			status: 'upcoming',
		},
		{
			icon: Recycle,
			title: 'Recycle Packaging',
			description: 'Return packaging for reuse',
			time: 'After delivery',
			status: 'upcoming',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="ECO-78432" />

				<ImpactCard carbonSaved="2.5 kg" treesPlanted={1} />

				<Card>
					<CardContent className="pt-6">
						<h2 className="font-semibold mb-6">Eco Shipping Progress</h2>
						<div>
							{timelineSteps.map((step, i) => (
								<TimelineStep key={i} {...step} />
							))}
						</div>
					</CardContent>
				</Card>

				<LifetimeImpactCard
					orders={12}
					carbon="28 kg"
					trees={8}
					progress={70}
					nextMilestone="Plant 10 trees"
				/>

				<CTA
					items={[
						{ label: 'View Impact Report', href: '/impact', icon: ArrowRight },
						{ label: 'Shop Eco Products', href: '/eco', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
