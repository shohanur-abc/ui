import {
	Truck,
	Plane,
	Ship,
	Clock,
	DollarSign,
	Shield,
	Leaf,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const FeatureTag = ({
	icon: Icon,
	text,
	variant = 'default',
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
	variant?: 'default' | 'success' | 'warning';
}) => {
	const colors = {
		default: 'bg-muted text-muted-foreground',
		success: 'bg-green-500/10 text-green-600 dark:text-green-400',
		warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
	};

	return (
		<span
			className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${colors[variant]}`}
		>
			<Icon className="size-3" />
			{text}
		</span>
	);
};

const DeliveryCard = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	features,
	recommended,
	ecoFriendly,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	features: {
		icon: React.ComponentType<{ className?: string }>;
		text: string;
		variant?: 'default' | 'success' | 'warning';
	}[];
	recommended?: boolean;
	ecoFriendly?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:shadow-lg
				${recommended ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}
				has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary/20
			`}
		>
			{recommended && (
				<Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
					Recommended
				</Badge>
			)}
			{ecoFriendly && (
				<Badge
					variant="secondary"
					className="absolute -top-3 right-4 bg-green-500/10 text-green-600 border-green-500/20"
				>
					<Leaf className="size-3 mr-1" />
					Eco
				</Badge>
			)}
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
						<Icon className="size-7" />
					</div>
					<div className="flex-1">
						<div className="flex items-start justify-between mb-3">
							<div>
								<h3 className="font-semibold text-lg">{name}</h3>
								<div className="flex items-center gap-1 text-sm text-muted-foreground">
									<Clock className="size-3.5" />
									<span>{time}</span>
								</div>
							</div>
							<div className="text-right">
								<p className="text-2xl font-bold text-primary">{price}</p>
							</div>
						</div>
						<div className="flex flex-wrap gap-2">
							{features.map((feature, i) => (
								<FeatureTag key={i} {...feature} />
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

export default function Main() {
	const deliveryOptions = [
		{
			value: 'ground',
			icon: Truck,
			name: 'Ground Shipping',
			time: '5-7 business days',
			price: '$8.99',
			ecoFriendly: true,
			features: [
				{ icon: DollarSign, text: 'Best value' },
				{ icon: Shield, text: 'Insured' },
				{ icon: Leaf, text: 'Low carbon', variant: 'success' as const },
			],
		},
		{
			value: 'air',
			icon: Plane,
			name: 'Air Express',
			time: '2-3 business days',
			price: '$19.99',
			recommended: true,
			features: [
				{ icon: Clock, text: 'Fast delivery', variant: 'success' as const },
				{ icon: Shield, text: 'Full insurance' },
			],
		},
		{
			value: 'overnight',
			icon: Plane,
			name: 'Next Day Air',
			time: 'Next business day',
			price: '$34.99',
			features: [
				{ icon: Clock, text: 'Fastest option', variant: 'warning' as const },
				{ icon: Shield, text: 'Premium protection' },
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Select Delivery Speed
					</h1>
					<p className="text-muted-foreground">
						Choose the shipping option that works best for you
					</p>
				</div>

				<RadioGroup defaultValue="air" className="space-y-4">
					{deliveryOptions.map((option) => (
						<DeliveryCard key={option.value} {...option} />
					))}
				</RadioGroup>

				<Separator className="my-8" />

				<div className="flex flex-col @sm:flex-row gap-3">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
