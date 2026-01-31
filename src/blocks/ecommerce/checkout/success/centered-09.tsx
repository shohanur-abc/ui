import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Zap,
	Leaf,
	Award,
	ArrowRight,
	TrendingUp,
	Recycle,
	TreePine,
} from 'lucide-react';
import Link from 'next/link';

interface ImpactMetricProps {
	icon: React.ElementType;
	value: string;
	label: string;
	color: string;
}

interface MilestoneProps {
	current: number;
	target: number;
	label: string;
	reward: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const EcoSuccessIcon = () => (
	<div className="relative">
		<div className="size-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
			<Leaf className="size-10 text-white" />
		</div>
		<div className="absolute -top-1 -right-1 size-8 rounded-full bg-amber-400 flex items-center justify-center border-2 border-background">
			<Zap className="size-4 text-amber-900" />
		</div>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight text-center">
		{text}{' '}
		{highlight && <span className="text-emerald-500">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground text-center text-sm max-w-sm">
		{text}
	</p>
);

const OrderBadge = ({ orderNumber }: { orderNumber: string }) => (
	<Badge variant="outline" className="px-4 py-2 gap-2 text-sm">
		<span className="text-muted-foreground">Order</span>
		<span className="font-mono font-semibold">{orderNumber}</span>
	</Badge>
);

const ImpactMetric = ({
	icon: Icon,
	value,
	label,
	color,
}: ImpactMetricProps) => (
	<div className="flex flex-col items-center gap-2 p-4">
		<div
			className={`size-12 rounded-full flex items-center justify-center ${color}`}
		>
			<Icon className="size-6" />
		</div>
		<p className="text-xl font-bold">{value}</p>
		<p className="text-xs text-muted-foreground text-center">{label}</p>
	</div>
);

const ImpactCard = ({ metrics }: { metrics: ImpactMetricProps[] }) => (
	<Card className="w-full max-w-md border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
		<CardContent className="pt-6">
			<div className="flex items-center gap-2 mb-4 justify-center">
				<TreePine className="size-5 text-emerald-500" />
				<h3 className="font-semibold">Your Environmental Impact</h3>
			</div>
			<div className="grid grid-cols-3 divide-x">
				{metrics.map((metric, i) => (
					<ImpactMetric key={i} {...metric} />
				))}
			</div>
		</CardContent>
	</Card>
);

const MilestoneProgress = ({
	current,
	target,
	label,
	reward,
}: MilestoneProps) => (
	<Card className="w-full max-w-md">
		<CardContent className="pt-6 space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Award className="size-5 text-amber-500" />
					<h3 className="font-semibold">{label}</h3>
				</div>
				<Badge variant="secondary">{reward}</Badge>
			</div>
			<div className="space-y-2">
				<Progress value={(current / target) * 100} className="h-3" />
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">
						{current} / {target} orders
					</span>
					<span className="font-medium text-primary">
						{target - current} to go!
					</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const EcoTip = ({ tip }: { tip: string }) => (
	<div className="w-full max-w-md p-4 rounded-xl bg-muted/50 border">
		<div className="flex items-start gap-3">
			<Recycle className="size-5 text-emerald-500 shrink-0 mt-0.5" />
			<div>
				<p className="font-medium text-sm">Eco Tip</p>
				<p className="text-sm text-muted-foreground mt-1">{tip}</p>
			</div>
		</div>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 w-full max-w-md">
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
	const impactMetrics: ImpactMetricProps[] = [
		{
			icon: Leaf,
			value: '2.3kg',
			label: 'CO₂ Saved',
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			icon: Recycle,
			value: '100%',
			label: 'Recyclable Packaging',
			color: 'bg-blue-500/10 text-blue-500',
		},
		{
			icon: TreePine,
			value: '1',
			label: 'Tree Planted',
			color: 'bg-green-600/10 text-green-600',
		},
	];

	return (
		<section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 w-full">
				<div className="flex flex-col items-center gap-6">
					<EcoSuccessIcon />

					<div className="space-y-3">
						<Title text="Thank you for shopping" highlight="sustainably!" />
						<Description text="Your purchase helps us plant trees and reduce carbon emissions. Together, we're making a difference." />
					</div>

					<OrderBadge orderNumber="ECO-2024-78432" />

					<ImpactCard metrics={impactMetrics} />

					<MilestoneProgress
						current={7}
						target={10}
						label="Eco Warrior Status"
						reward="Free Shipping"
					/>

					<EcoTip tip="Your items are packaged in 100% recycled materials. Please recycle the packaging after unboxing!" />

					<CTA
						items={[
							{
								label: 'Track Order',
								href: '/track',
								icon: ArrowRight,
							},
							{
								label: 'View Impact',
								href: '/impact',
								variant: 'outline',
								icon: TrendingUp,
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
