import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Leaf,
	TreePine,
	Wind,
	Droplets,
	ArrowRight,
	Recycle,
	CheckCircle,
	Heart,
} from 'lucide-react';
import Link from 'next/link';

interface ImpactMetricProps {
	icon: React.ElementType;
	value: string;
	unit: string;
	label: string;
	color: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const EcoHeader = ({ orderNumber }: { orderNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
			<Leaf className="size-10 text-emerald-500" />
		</div>
		<div>
			<Badge className="bg-emerald-500 mb-3">Eco-Friendly Order</Badge>
			<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold">
				Thank You for Going Green!
			</h1>
			<p className="text-muted-foreground mt-2">
				Order #{orderNumber} is confirmed and sustainable
			</p>
		</div>
	</div>
);

const ImpactMetric = ({
	icon: Icon,
	value,
	unit,
	label,
	color,
}: ImpactMetricProps) => (
	<div className="text-center p-4 rounded-xl bg-muted/30">
		<div className={`size-12 rounded-full mx-auto mb-3 flex items-center justify-center ${color}`}>
			<Icon className="size-6" />
		</div>
		<p className="text-2xl font-bold">{value}</p>
		<p className="text-sm text-muted-foreground">{unit}</p>
		<p className="text-xs font-medium mt-1">{label}</p>
	</div>
);

const ImpactSection = ({ metrics }: { metrics: ImpactMetricProps[] }) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg text-center">Your Impact Today</h2>
		<div className="grid grid-cols-3 gap-4">
			{metrics.map((metric, i) => (
				<ImpactMetric key={i} {...metric} />
			))}
		</div>
	</div>
);

const CumulativeImpact = ({
	treesPlanted,
	carbonSaved,
	plasticAvoided,
}: {
	treesPlanted: number;
	carbonSaved: number;
	plasticAvoided: number;
}) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg flex items-center gap-2">
			<TreePine className="size-5 text-emerald-500" />
			Your Cumulative Impact
		</h2>
		<div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-200 dark:border-emerald-800/30 space-y-4">
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>Trees Planted</span>
					<span className="font-semibold">{treesPlanted}</span>
				</div>
				<div className="h-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden">
					<div
						className="h-full bg-emerald-500 rounded-full"
						style={{ width: `${Math.min(treesPlanted * 10, 100)}%` }}
					/>
				</div>
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>Carbon Offset</span>
					<span className="font-semibold">{carbonSaved} kg</span>
				</div>
				<div className="h-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden">
					<div
						className="h-full bg-emerald-500 rounded-full"
						style={{ width: `${Math.min(carbonSaved, 100)}%` }}
					/>
				</div>
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>Plastic Avoided</span>
					<span className="font-semibold">{plasticAvoided} kg</span>
				</div>
				<div className="h-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 overflow-hidden">
					<div
						className="h-full bg-emerald-500 rounded-full"
						style={{ width: `${Math.min(plasticAvoided * 20, 100)}%` }}
					/>
				</div>
			</div>
		</div>
	</div>
);

const CertificationBadge = ({
	name,
	description,
}: {
	name: string;
	description: string;
}) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
		<div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
			<Recycle className="size-5 text-emerald-500" />
		</div>
		<div className="flex-1">
			<p className="font-medium text-sm">{name}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		<Badge variant="outline" className="text-emerald-600 border-emerald-200">
			Certified
		</Badge>
	</div>
);

const CertificationsSection = () => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg">Sustainability Certifications</h2>
		<div className="space-y-2">
			<CertificationBadge
				name="Carbon Neutral Shipping"
				description="100% offset delivery"
			/>
			<CertificationBadge
				name="Recycled Packaging"
				description="Made from post-consumer materials"
			/>
			<CertificationBadge
				name="Plastic-Free"
				description="No single-use plastics"
			/>
		</div>
	</div>
);

const ShareImpact = () => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
		<Heart className="size-8 text-primary mx-auto mb-2" />
		<h3 className="font-semibold mb-1">Share Your Impact</h3>
		<p className="text-sm text-muted-foreground mb-4">
			Inspire others to make sustainable choices
		</p>
		<Button variant="outline" size="sm" className="gap-2">
			Share Impact Report
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
	const impactMetrics: ImpactMetricProps[] = [
		{
			icon: TreePine,
			value: '1',
			unit: 'tree',
			label: 'Planted',
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			icon: Wind,
			value: '2.4',
			unit: 'kg CO₂',
			label: 'Saved',
			color: 'bg-sky-500/10 text-sky-500',
		},
		{
			icon: Droplets,
			value: '150',
			unit: 'liters',
			label: 'Water Saved',
			color: 'bg-blue-500/10 text-blue-500',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<EcoHeader orderNumber="ECO-2024-78432" />

				<ImpactSection metrics={impactMetrics} />

				<Separator />

				<CumulativeImpact
					treesPlanted={7}
					carbonSaved={45}
					plasticAvoided={3}
				/>

				<CertificationsSection />

				<ShareImpact />

				<CTA
					items={[
						{ label: 'View Full Impact', href: '/impact', icon: Leaf },
						{ label: 'Track Order', href: '/track', variant: 'outline', icon: ArrowRight },
					]}
				/>
			</div>
		</section>
	);
}
