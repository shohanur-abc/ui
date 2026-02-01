import { Gift, Package, Shield, Sparkles, Check, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const AddonCard = ({
	id,
	icon: Icon,
	name,
	description,
	price,
	popular,
	included,
}: {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	price: string;
	popular?: boolean;
	included?: boolean;
}) => (
	<Label htmlFor={id} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:shadow-md hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
			`}
		>
			{popular && (
				<Badge className="absolute -top-2.5 right-4 text-xs">Popular</Badge>
			)}
			<CardContent className="p-5">
				<div className="flex items-start gap-4">
					<Checkbox id={id} className="mt-1" defaultChecked={included} />
					<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
						<Icon className="size-6" />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-2">
							<div>
								<h3 className="font-semibold">{name}</h3>
								<p className="text-sm text-muted-foreground">{description}</p>
							</div>
							<span className="font-bold text-primary shrink-0">{price}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const IncludedFeature = ({ text }: { text: string }) => (
	<div className="flex items-center gap-2 text-sm">
		<Check className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

const PriceSummary = ({
	items,
	total,
}: {
	items: { label: string; value: string }[];
	total: { label: string; value: string };
}) => (
	<Card className="bg-muted/30">
		<CardContent className="p-5">
			<h3 className="font-semibold mb-4">Shipping Summary</h3>
			<div className="space-y-3">
				{items.map((item, i) => (
					<div key={i} className="flex justify-between text-sm">
						<span className="text-muted-foreground">{item.label}</span>
						<span>{item.value}</span>
					</div>
				))}
			</div>
			<Separator className="my-4" />
			<div className="flex justify-between font-semibold text-lg">
				<span>{total.label}</span>
				<span className="text-primary">{total.value}</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const addons = [
		{
			id: 'gift-wrap',
			icon: Gift,
			name: 'Premium Gift Wrapping',
			description: 'Elegant wrapping with ribbon and personalized message card',
			price: '+$5.99',
			popular: true,
		},
		{
			id: 'insurance',
			icon: Shield,
			name: 'Shipping Insurance',
			description: 'Full coverage protection against loss or damage',
			price: '+$3.99',
			included: true,
		},
		{
			id: 'priority',
			icon: Sparkles,
			name: 'Priority Handling',
			description: 'First in line for processing and dispatch',
			price: '+$2.99',
		},
	];

	const includedFeatures = [
		'Free standard packaging',
		'Real-time tracking',
		'Email notifications',
		'Delivery confirmation',
	];

	const priceSummary = {
		items: [
			{ label: 'Express Shipping (2-3 days)', value: '$12.99' },
			{ label: 'Shipping Insurance', value: '$3.99' },
		],
		total: { label: 'Shipping Total', value: '$16.98' },
	};

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
						<Plus className="size-4" />
						Shipping Add-ons
					</div>
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Enhance Your Delivery
					</h1>
					<p className="text-muted-foreground">
						Add optional services to your shipment
					</p>
				</div>

				<div className="space-y-4 mb-8">
					{addons.map((addon) => (
						<AddonCard key={addon.id} {...addon} />
					))}
				</div>

				<Card className="mb-8">
					<CardContent className="p-5">
						<div className="flex items-center gap-3 mb-4">
							<Package className="size-5 text-primary" />
							<h3 className="font-semibold">Included with Every Order</h3>
						</div>
						<div className="grid @sm:grid-cols-2 gap-3">
							{includedFeatures.map((feature, i) => (
								<IncludedFeature key={i} text={feature} />
							))}
						</div>
					</CardContent>
				</Card>

				<PriceSummary items={priceSummary.items} total={priceSummary.total} />

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
