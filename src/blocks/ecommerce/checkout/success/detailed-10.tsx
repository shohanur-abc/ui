import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Leaf,
	TreePine,
	Droplets,
	Recycle,
	PackageCheck,
	Truck,
	Award,
	ArrowRight,
	Share2,
	TreeDeciduous,
	Wind,
} from 'lucide-react';
import Link from 'next/link';

interface ImpactMetricProps {
	icon: React.ElementType;
	value: string;
	label: string;
	description: string;
}

interface CertificationProps {
	name: string;
	badge: string;
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

const PageHeader = ({
	orderNumber,
	purchaseDate,
}: {
	orderNumber: string;
	purchaseDate: string;
}) => (
	<div className="flex flex-col @lg:flex-row @lg:items-center justify-between gap-4">
		<div className="flex items-center gap-4">
			<div className="size-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
				<Leaf className="size-7 text-emerald-500" />
			</div>
			<div>
				<h1 className="text-2xl @lg:text-3xl font-bold">
					Eco-Friendly Order Complete
				</h1>
				<p className="text-muted-foreground">
					Order #{orderNumber} • {purchaseDate}
				</p>
			</div>
		</div>
		<Button variant="outline" className="gap-2">
			<Share2 className="size-4" />
			Share Impact
		</Button>
	</div>
);

const ImpactBannerCard = ({
	totalOffset,
	treesPlanted,
}: {
	totalOffset: string;
	treesPlanted: number;
}) => (
	<Card className="overflow-hidden bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 text-white">
		<CardContent className="pt-6">
			<div className="flex items-center gap-3 mb-6">
				<TreeDeciduous className="size-8" />
				<span className="text-lg font-semibold">Your Environmental Impact</span>
			</div>
			<div className="grid @sm:grid-cols-2 gap-6">
				<div className="p-6 rounded-2xl bg-white/10 text-center">
					<Wind className="size-10 mx-auto mb-3 opacity-80" />
					<p className="text-4xl font-bold">{totalOffset}</p>
					<p className="text-sm opacity-80">CO₂ Offset</p>
				</div>
				<div className="p-6 rounded-2xl bg-white/10 text-center">
					<TreePine className="size-10 mx-auto mb-3 opacity-80" />
					<p className="text-4xl font-bold">{treesPlanted}</p>
					<p className="text-sm opacity-80">Trees Planted</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ImpactMetricCard = ({
	icon: Icon,
	value,
	label,
	description,
}: ImpactMetricProps) => (
	<div className="p-4 rounded-xl border">
		<div className="flex items-start gap-3">
			<div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
				<Icon className="size-5 text-emerald-500" />
			</div>
			<div>
				<p className="text-xl font-bold">{value}</p>
				<p className="font-medium text-sm">{label}</p>
				<p className="text-xs text-muted-foreground mt-1">{description}</p>
			</div>
		</div>
	</div>
);

const ImpactMetricsSection = ({
	metrics,
}: {
	metrics: ImpactMetricProps[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<Leaf className="size-5" />
				Environmental Benefits
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid @sm:grid-cols-2 gap-4">
				{metrics.map((metric, i) => (
					<ImpactMetricCard key={i} {...metric} />
				))}
			</div>
		</CardContent>
	</Card>
);

const CertificationCard = ({
	name,
	badge,
	description,
}: CertificationProps) => (
	<div className="flex items-start gap-3 p-4 rounded-xl border">
		<div className="size-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 text-lg">
			{badge}
		</div>
		<div>
			<p className="font-semibold">{name}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const CertificationsSection = ({
	certifications,
}: {
	certifications: CertificationProps[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Award className="size-4" />
				Product Certifications
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{certifications.map((cert, i) => (
				<CertificationCard key={i} {...cert} />
			))}
		</CardContent>
	</Card>
);

const SustainablePackagingCard = () => (
	<Card className="bg-emerald-500/5 border-emerald-200 dark:border-emerald-800/30">
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
				<PackageCheck className="size-4" />
				Sustainable Packaging
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="flex items-center gap-3">
				<Recycle className="size-5 text-emerald-500" />
				<div>
					<p className="font-medium text-sm">100% Recycled Materials</p>
					<p className="text-xs text-muted-foreground">
						All packaging is made from post-consumer recycled materials
					</p>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<Leaf className="size-5 text-emerald-500" />
				<div>
					<p className="font-medium text-sm">Biodegradable</p>
					<p className="text-xs text-muted-foreground">
						Packaging will naturally decompose within 90 days
					</p>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<PackageCheck className="size-5 text-emerald-500" />
				<div>
					<p className="font-medium text-sm">Plastic-Free</p>
					<p className="text-xs text-muted-foreground">
						No single-use plastics in any of our packaging
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CarbonNeutralShippingCard = ({
	shippingMethod,
	offsetMethod,
}: {
	shippingMethod: string;
	offsetMethod: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Truck className="size-4" />
				Carbon-Neutral Shipping
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Shipping Method</span>
				<Badge variant="secondary">{shippingMethod}</Badge>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Carbon Offset</span>
				<Badge className="bg-emerald-500">100% Offset</Badge>
			</div>
			<Separator />
			<p className="text-sm text-muted-foreground">{offsetMethod}</p>
		</CardContent>
	</Card>
);

const LifetimeImpactCard = ({
	totalOrders,
	totalOffset,
	treesPlanted,
}: {
	totalOrders: number;
	totalOffset: string;
	treesPlanted: number;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<TreeDeciduous className="size-4" />
				Your Lifetime Impact
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="grid grid-cols-3 gap-4 text-center">
				<div>
					<p className="text-2xl font-bold">{totalOrders}</p>
					<p className="text-xs text-muted-foreground">Eco Orders</p>
				</div>
				<div>
					<p className="text-2xl font-bold">{totalOffset}</p>
					<p className="text-xs text-muted-foreground">CO₂ Offset</p>
				</div>
				<div>
					<p className="text-2xl font-bold">{treesPlanted}</p>
					<p className="text-xs text-muted-foreground">Trees</p>
				</div>
			</div>
			<Button variant="outline" className="w-full">
				View Full Impact Report
			</Button>
		</CardContent>
	</Card>
);

const OrderSummaryCard = ({
	items,
	total,
	donation,
	currency,
}: {
	items: { name: string; price: number }[];
	total: number;
	donation: number;
	currency: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Order Summary</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item, i) => (
				<div key={i} className="flex justify-between text-sm">
					<span className="text-muted-foreground">{item.name}</span>
					<span>
						{currency}
						{item.price.toFixed(2)}
					</span>
				</div>
			))}
			<div className="flex justify-between text-sm text-emerald-600">
				<span className="flex items-center gap-1">
					<Leaf className="size-3" />
					Environmental Donation
				</span>
				<span>
					{currency}
					{donation.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between font-semibold">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
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
	const impactMetrics: ImpactMetricProps[] = [
		{
			icon: Wind,
			value: '2.5 kg',
			label: 'CO₂ Saved',
			description: 'Compared to conventional products',
		},
		{
			icon: Droplets,
			value: '150 L',
			label: 'Water Saved',
			description: 'Through sustainable manufacturing',
		},
		{
			icon: Recycle,
			value: '500 g',
			label: 'Plastic Avoided',
			description: 'By using eco-friendly packaging',
		},
		{
			icon: TreePine,
			value: '1 tree',
			label: 'Tree Planted',
			description: 'Through our reforestation partner',
		},
	];

	const certifications: CertificationProps[] = [
		{
			name: 'B Corporation',
			badge: '🌍',
			description: 'Meets highest standards of social and environmental impact',
		},
		{
			name: 'Carbon Neutral',
			badge: '♻️',
			description: 'All emissions are offset through verified projects',
		},
		{
			name: '1% for the Planet',
			badge: '🌱',
			description: '1% of sales donated to environmental nonprofits',
		},
	];

	const orderItems = [
		{ name: 'Organic Cotton T-Shirt', price: 45.00 },
		{ name: 'Recycled Denim Jeans', price: 89.00 },
		{ name: 'Sustainable Sneakers', price: 120.00 },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader
					orderNumber="ECO-2024-78432"
					purchaseDate="January 15, 2024"
				/>

				<ImpactBannerCard totalOffset="2.5 kg" treesPlanted={1} />

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-6">
						<ImpactMetricsSection metrics={impactMetrics} />
						<SustainablePackagingCard />
					</div>
					<div className="space-y-6">
						<CertificationsSection certifications={certifications} />
						<CarbonNeutralShippingCard
							shippingMethod="Eco Express"
							offsetMethod="Carbon offset through investment in renewable energy and reforestation projects"
						/>
						<LifetimeImpactCard
							totalOrders={12}
							totalOffset="28 kg"
							treesPlanted={8}
						/>
						<OrderSummaryCard
							items={orderItems}
							total={256.00}
							donation={2.00}
							currency="$"
						/>
					</div>
				</div>

				<CTA
					items={[
						{ label: 'View Impact Dashboard', href: '/impact', icon: ArrowRight },
						{ label: 'Shop Eco Collection', href: '/eco', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
