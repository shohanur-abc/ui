import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Leaf,
	Recycle,
	TreePine,
	ArrowRight,
	Wind,
	Droplets,
	Heart,
} from 'lucide-react';
import Link from 'next/link';

interface ImpactMetricProps {
	icon: React.ElementType;
	label: string;
	value: string;
	unit: string;
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

const EcoSuccessCard = ({
	orderNumber,
}: {
	orderNumber: string;
}) => (
	<Card className="border-emerald-200 dark:border-emerald-800/30 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/20 overflow-hidden">
		<div className="absolute top-0 right-0 size-48 bg-emerald-200/30 dark:bg-emerald-800/10 rounded-full -translate-y-1/2 translate-x-1/2" />
		<CardContent className="pt-8 pb-6 text-center relative">
			<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
				<Leaf className="size-4" />
				<span className="font-medium text-sm">Sustainable Purchase</span>
			</div>
			<h1 className="text-2xl @lg:text-3xl font-bold mb-2">
				Thank You for Going Green!
			</h1>
			<p className="text-muted-foreground">
				Order {orderNumber} is confirmed and eco-friendly
			</p>
		</CardContent>
	</Card>
);

const ImpactMetricCard = ({
	icon: Icon,
	label,
	value,
	unit,
	color,
}: ImpactMetricProps) => (
	<Card>
		<CardContent className="pt-6 text-center">
			<div className={`size-12 rounded-full mx-auto mb-3 flex items-center justify-center ${color}`}>
				<Icon className="size-6" />
			</div>
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-sm text-muted-foreground">{unit}</p>
			<p className="text-xs font-medium mt-2">{label}</p>
		</CardContent>
	</Card>
);

const TotalImpactCard = ({
	treesPlanted,
	carbonSaved,
	plasticAvoided,
}: {
	treesPlanted: number;
	carbonSaved: number;
	plasticAvoided: number;
}) => (
	<Card className="bg-emerald-500/5">
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<TreePine className="size-5 text-emerald-500" />
				Your Cumulative Impact
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>Trees Planted</span>
					<span className="font-semibold">{treesPlanted}</span>
				</div>
				<Progress value={treesPlanted * 10} className="h-2 bg-emerald-100 dark:bg-emerald-900/30" />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>Carbon Offset</span>
					<span className="font-semibold">{carbonSaved} kg</span>
				</div>
				<Progress value={carbonSaved} className="h-2 bg-emerald-100 dark:bg-emerald-900/30" />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>Plastic Avoided</span>
					<span className="font-semibold">{plasticAvoided} kg</span>
				</div>
				<Progress value={plasticAvoided * 10} className="h-2 bg-emerald-100 dark:bg-emerald-900/30" />
			</div>
		</CardContent>
	</Card>
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

const CertificationsCard = () => (
	<Card>
		<CardHeader className="pb-2">
			<CardTitle className="text-base">Sustainability Certifications</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			<CertificationBadge
				name="Carbon Neutral Shipping"
				description="100% offset delivery"
			/>
			<CertificationBadge
				name="Recycled Packaging"
				description="Made from post-consumer materials"
			/>
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
			icon: TreePine,
			label: 'Trees Planted',
			value: '1',
			unit: 'tree',
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			icon: Wind,
			label: 'Carbon Saved',
			value: '2.4',
			unit: 'kg CO₂',
			color: 'bg-sky-500/10 text-sky-500',
		},
		{
			icon: Droplets,
			label: 'Water Saved',
			value: '150',
			unit: 'liters',
			color: 'bg-blue-500/10 text-blue-500',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<EcoSuccessCard orderNumber="ECO-2024-78432" />

				<div className="grid grid-cols-3 gap-4">
					{impactMetrics.map((metric, i) => (
						<ImpactMetricCard key={i} {...metric} />
					))}
				</div>

				<TotalImpactCard
					treesPlanted={7}
					carbonSaved={45}
					plasticAvoided={3}
				/>

				<CertificationsCard />

				<CTA
					items={[
						{ label: 'View Impact', href: '/impact', icon: Heart },
						{ label: 'Track Order', href: '/track', variant: 'outline', icon: ArrowRight },
					]}
				/>
			</div>
		</section>
	);
}
