import { Package, Leaf, Sparkles, Shield, Clock, Check, Truck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ShippingCard = ({
	value,
	name,
	time,
	price,
	features,
	badge,
	badgeVariant,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	features: string[];
	badge?: string;
	badgeVariant?: 'default' | 'secondary' | 'outline';
}) => (
	<Label htmlFor={value} className="cursor-pointer block h-full">
		<Card
			className="h-full transition-all hover:shadow-md hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
		>
			{badge && (
				<Badge variant={badgeVariant} className="absolute -top-2.5 right-4">
					{badge}
				</Badge>
			)}
			<CardContent className="p-5 h-full flex flex-col">
				<div className="flex items-start gap-3 mb-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex-1">
						<h3 className="font-semibold text-lg">{name}</h3>
						<div className="flex items-center gap-1 text-sm text-muted-foreground">
							<Clock className="size-3.5" />
							<span>{time}</span>
						</div>
					</div>
					<span className="text-xl font-bold text-primary">{price}</span>
				</div>

				<ul className="space-y-2 flex-1">
					{features.map((feature, i) => (
						<li key={i} className="flex items-center gap-2 text-sm">
							<Check className="size-4 text-primary shrink-0" />
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	</Label>
);

const FeatureHighlight = ({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}) => (
	<div className="flex items-start gap-3">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
			<Icon className="size-5" />
		</div>
		<div>
			<p className="font-medium">{title}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

export default function Main() {
	const standardOptions = [
		{
			value: 'economy',
			name: 'Economy',
			time: '7-10 days',
			price: '$4.99',
			features: ['Basic tracking', 'Standard packaging'],
		},
		{
			value: 'standard',
			name: 'Standard',
			time: '5-7 days',
			price: '$7.99',
			features: ['Full tracking', 'Secure packaging', 'Email notifications'],
			badge: 'Best Value',
		},
	];

	const ecoOptions = [
		{
			value: 'eco-standard',
			name: 'Eco Standard',
			time: '6-8 days',
			price: '$6.99',
			features: ['100% recyclable packaging', 'Carbon-neutral delivery', 'Consolidated shipping'],
		},
		{
			value: 'eco-express',
			name: 'Eco Express',
			time: '3-4 days',
			price: '$11.99',
			features: ['Sustainable packaging', 'Lower emissions', 'Tree planting contribution'],
			badge: 'Green Choice',
			badgeVariant: 'secondary' as const,
		},
	];

	const premiumOptions = [
		{
			value: 'premium',
			name: 'Premium',
			time: '2-3 days',
			price: '$19.99',
			features: ['Priority handling', 'Gift packaging', 'White glove delivery', 'Photo confirmation'],
		},
		{
			value: 'vip',
			name: 'VIP Service',
			time: 'Next day',
			price: '$34.99',
			features: ['Same-day dispatch', 'Concierge service', 'Time-specific delivery', 'Full insurance'],
			badge: 'Premium',
		},
	];

	const ecoFeatures = [
		{ icon: Leaf, title: 'Carbon Neutral', description: 'We offset all shipping emissions' },
		{ icon: Package, title: 'Sustainable Packaging', description: '100% recyclable materials' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Shipping Options</h1>
					<p className="text-muted-foreground">Choose the perfect shipping experience for your needs</p>
				</div>

				<Tabs defaultValue="standard" className="w-full">
					<TabsList className="grid w-full grid-cols-3 mb-8">
						<TabsTrigger value="standard" className="gap-2">
							<Package className="size-4" />
							Standard
						</TabsTrigger>
						<TabsTrigger value="eco" className="gap-2">
							<Leaf className="size-4" />
							Eco-Friendly
						</TabsTrigger>
						<TabsTrigger value="premium" className="gap-2">
							<Sparkles className="size-4" />
							Premium
						</TabsTrigger>
					</TabsList>

					<TabsContent value="standard">
						<RadioGroup defaultValue="standard" className="grid @md:grid-cols-2 gap-4">
							{standardOptions.map((option) => (
								<ShippingCard key={option.value} {...option} />
							))}
						</RadioGroup>
					</TabsContent>

					<TabsContent value="eco">
						<Card className="mb-6 bg-green-500/5 border-green-500/20">
							<CardContent className="p-5">
								<div className="grid @sm:grid-cols-2 gap-4">
									{ecoFeatures.map((feature) => (
										<FeatureHighlight key={feature.title} {...feature} />
									))}
								</div>
							</CardContent>
						</Card>
						<RadioGroup defaultValue="eco-standard" className="grid @md:grid-cols-2 gap-4">
							{ecoOptions.map((option) => (
								<ShippingCard key={option.value} {...option} />
							))}
						</RadioGroup>
					</TabsContent>

					<TabsContent value="premium">
						<RadioGroup defaultValue="premium" className="grid @md:grid-cols-2 gap-4">
							{premiumOptions.map((option) => (
								<ShippingCard key={option.value} {...option} />
							))}
						</RadioGroup>
					</TabsContent>
				</Tabs>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
