import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Leaf,
	TreePine,
	Droplets,
	Recycle,
	Wind,
	PackageCheck,
	Award,
	Share2,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface ImpactMetricProps {
	icon: React.ElementType;
	value: string;
	label: string;
	color: string;
}

interface CertificationProps {
	badge: string;
	name: string;
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
			<h1 className="text-2xl @lg:text-4xl font-bold">Eco Order Complete!</h1>
			<p className="text-muted-foreground">Order #{orderNumber}</p>
		</div>
		<Button variant="outline" size="sm" className="gap-2">
			<Share2 className="size-4" />
			Share Your Impact
		</Button>
	</div>
);

const ImpactBanner = ({
	carbonOffset,
	treesPlanted,
}: {
	carbonOffset: string;
	treesPlanted: number;
}) => (
	<Card className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="grid @sm:grid-cols-2 gap-6 text-center">
				<div className="p-4 rounded-xl bg-white/10">
					<Wind className="size-8 mx-auto mb-2 opacity-80" />
					<p className="text-3xl font-bold">{carbonOffset}</p>
					<p className="text-sm opacity-80">Carbon Offset</p>
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

const MetricCard = ({ icon: Icon, value, label, color }: ImpactMetricProps) => (
	<Card className="hover:shadow-md transition-shadow">
		<CardContent className="pt-6">
			<div className="text-center space-y-3">
				<div
					className={`size-12 mx-auto rounded-xl flex items-center justify-center ${color}`}
				>
					<Icon className="size-6 text-white" />
				</div>
				<div>
					<p className="text-xl font-bold">{value}</p>
					<p className="text-sm text-muted-foreground">{label}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const PackagingCard = ({
	features,
}: {
	features: { icon: React.ElementType; label: string }[];
}) => (
	<Card className="bg-emerald-500/5 border-emerald-200 dark:border-emerald-800/30">
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
				<PackageCheck className="size-4" />
				Sustainable Packaging
			</h3>
			<div className="grid @sm:grid-cols-3 gap-4">
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

const CertificationCard = ({ badge, name }: CertificationProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="text-center space-y-2">
				<div className="text-3xl">{badge}</div>
				<p className="font-medium text-sm">{name}</p>
			</div>
		</CardContent>
	</Card>
);

const LifetimeImpactCard = ({
	orders,
	offset,
	trees,
}: {
	orders: number;
	offset: string;
	trees: number;
}) => (
	<Card>
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4 flex items-center gap-2">
				<Award className="size-4" />
				Your Lifetime Impact
			</h3>
			<div className="grid grid-cols-3 gap-4 text-center">
				<div>
					<p className="text-2xl font-bold">{orders}</p>
					<p className="text-xs text-muted-foreground">Eco Orders</p>
				</div>
				<div>
					<p className="text-2xl font-bold">{offset}</p>
					<p className="text-xs text-muted-foreground">CO₂ Offset</p>
				</div>
				<div>
					<p className="text-2xl font-bold">{trees}</p>
					<p className="text-xs text-muted-foreground">Trees</p>
				</div>
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
	const impactMetrics: ImpactMetricProps[] = [
		{ icon: Wind, value: '2.5 kg', label: 'CO₂ Saved', color: 'bg-sky-500' },
		{
			icon: Droplets,
			value: '150 L',
			label: 'Water Saved',
			color: 'bg-blue-500',
		},
		{
			icon: Recycle,
			value: '500 g',
			label: 'Plastic Avoided',
			color: 'bg-emerald-500',
		},
		{
			icon: TreePine,
			value: '1',
			label: 'Tree Planted',
			color: 'bg-green-600',
		},
	];

	const packagingFeatures = [
		{ icon: Recycle, label: '100% Recycled' },
		{ icon: Leaf, label: 'Biodegradable' },
		{ icon: PackageCheck, label: 'Plastic-Free' },
	];

	const certifications: CertificationProps[] = [
		{ badge: '🌍', name: 'B Corp' },
		{ badge: '♻️', name: 'Carbon Neutral' },
		{ badge: '🌱', name: '1% for Planet' },
		{ badge: '🌿', name: 'Organic' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="ECO-78432" />

				<ImpactBanner carbonOffset="2.5 kg" treesPlanted={1} />

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{impactMetrics.map((metric, i) => (
						<MetricCard key={i} {...metric} />
					))}
				</div>

				<PackagingCard features={packagingFeatures} />

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{certifications.map((cert, i) => (
						<CertificationCard key={i} {...cert} />
					))}
				</div>

				<LifetimeImpactCard orders={12} offset="28 kg" trees={8} />

				<CTA
					items={[
						{
							label: 'View Impact Dashboard',
							href: '/impact',
							icon: ArrowRight,
						},
						{ label: 'Shop Eco Collection', href: '/eco', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
