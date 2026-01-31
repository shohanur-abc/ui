import { Truck, Clock, Package, Shield, Gift, Check, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const TierCard = ({
	value,
	tier,
	tagline,
	price,
	time,
	features,
	popular,
	icon: Icon,
}: {
	value: string;
	tier: string;
	tagline: string;
	price: string;
	time: string;
	features: string[];
	popular?: boolean;
	icon: React.ComponentType<{ className?: string }>;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:shadow-lg hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-gradient-to-br has-[:checked]:from-primary/5 has-[:checked]:to-transparent
				${popular ? 'ring-2 ring-primary/30 shadow-lg' : ''}
			`}
		>
			{popular && (
				<Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
					<Star className="size-3" />
					Most Popular
				</Badge>
			)}
			<CardHeader className="text-center pb-2 pt-6">
				<div className="flex size-14 mx-auto mb-3 items-center justify-center rounded-2xl bg-primary/10 text-primary">
					<Icon className="size-7" />
				</div>
				<RadioGroupItem value={value} id={value} className="sr-only" />
				<CardTitle className="text-xl">{tier}</CardTitle>
				<CardDescription>{tagline}</CardDescription>
			</CardHeader>
			<CardContent className="text-center">
				<div className="mb-4">
					<span className="text-4xl font-bold text-primary">{price}</span>
				</div>
				<div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
					<Clock className="size-4" />
					<span>{time}</span>
				</div>
				<Separator className="my-4" />
				<ul className="space-y-2 text-left">
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

const AddonCheckbox = ({
	id,
	icon: Icon,
	label,
	price,
}: {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	price: string;
}) => (
	<Label
		htmlFor={id}
		className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<div className="flex items-center gap-3">
			<Checkbox id={id} />
			<div className="flex size-9 items-center justify-center rounded-lg bg-muted">
				<Icon className="size-5 text-muted-foreground" />
			</div>
			<span className="font-medium">{label}</span>
		</div>
		<span className="font-medium text-primary">{price}</span>
	</Label>
);

export default function Main() {
	const tiers = [
		{
			value: 'essential',
			tier: 'Essential',
			tagline: 'Basic shipping',
			price: '$5.99',
			time: '5-7 business days',
			icon: Package,
			features: ['Standard tracking', 'Email notifications', 'Secure packaging'],
		},
		{
			value: 'premium',
			tier: 'Premium',
			tagline: 'Fast & insured',
			price: '$14.99',
			time: '2-3 business days',
			icon: Truck,
			popular: true,
			features: ['Priority handling', 'Real-time tracking', '$100 insurance', 'SMS updates'],
		},
		{
			value: 'elite',
			tier: 'Elite',
			tagline: 'White glove service',
			price: '$29.99',
			time: 'Next day',
			icon: Star,
			features: ['Express priority', 'Full insurance', 'Signature delivery', 'Dedicated support'],
		},
	];

	const addons = [
		{ id: 'insurance', icon: Shield, label: 'Extended Insurance', price: '+$4.99' },
		{ id: 'gift', icon: Gift, label: 'Premium Gift Wrap', price: '+$6.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Choose Your Shipping Tier</h1>
					<p className="text-muted-foreground">Select the perfect delivery experience for your needs</p>
				</div>

				<RadioGroup defaultValue="premium" className="grid @md:grid-cols-3 gap-6 mb-8">
					{tiers.map((tier) => (
						<TierCard key={tier.value} {...tier} />
					))}
				</RadioGroup>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-lg">Add-ons</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{addons.map((addon) => (
							<AddonCheckbox key={addon.id} {...addon} />
						))}
					</CardContent>
				</Card>

				<Button className="w-full h-12 text-base">Continue to Payment</Button>
			</div>
		</section>
	);
}
