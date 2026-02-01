import {
	Truck,
	Package,
	Clock,
	Check,
	Zap,
	Shield,
	Leaf,
	Gift,
	Star,
	ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const SpeedCard = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	color,
	popular,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	color: string;
	popular?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className={`
				relative h-full transition-all hover:shadow-lg hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${popular ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{popular && (
				<Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
					Most Popular
				</Badge>
			)}
			<CardContent className="p-4 text-center">
				<RadioGroupItem value={value} id={value} className="sr-only" />
				<div
					className={`flex size-12 mx-auto mb-3 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white`}
				>
					<Icon className="size-6" />
				</div>
				<h3 className="font-bold">{name}</h3>
				<div className="flex items-center justify-center gap-1 text-sm text-muted-foreground my-1">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
				<span className="text-xl font-bold text-primary">{price}</span>
			</CardContent>
		</Card>
	</Label>
);

const FeatureCard = ({
	id,
	icon: Icon,
	name,
	price,
	included,
}: {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	price: string;
	included?: boolean;
}) => (
	<Label htmlFor={id} className="cursor-pointer">
		<Card
			className={`
				h-full transition-all hover:border-primary/50
				${included ? 'bg-primary/5 border-primary' : 'has-[:checked]:border-primary has-[:checked]:bg-primary/5'}
			`}
		>
			<CardContent className="p-3 flex items-center gap-3">
				{included ? (
					<div className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<Check className="size-3" />
					</div>
				) : (
					<input
						type="checkbox"
						id={id}
						className="size-5 rounded border-input"
					/>
				)}
				<Icon className="size-4 text-muted-foreground" />
				<span className="flex-1 text-sm font-medium">{name}</span>
				<span
					className={`text-sm font-medium ${included ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}
				>
					{price}
				</span>
			</CardContent>
		</Card>
	</Label>
);

export default function Main() {
	const speeds = [
		{
			value: 'standard',
			icon: Package,
			name: 'Standard',
			time: '5-7 days',
			price: '$4.99',
			color: 'from-slate-500 to-slate-600',
		},
		{
			value: 'express',
			icon: Truck,
			name: 'Express',
			time: '2-3 days',
			price: '$9.99',
			color: 'from-blue-500 to-blue-600',
			popular: true,
		},
		{
			value: 'overnight',
			icon: Zap,
			name: 'Overnight',
			time: '1 day',
			price: '$19.99',
			color: 'from-amber-500 to-amber-600',
		},
	];

	const features = [
		{
			id: 'tracking',
			icon: Package,
			name: 'Real-time Tracking',
			price: 'Included',
			included: true,
		},
		{
			id: 'insurance',
			icon: Shield,
			name: 'Shipping Insurance',
			price: '+$2.99',
		},
		{ id: 'carbon', icon: Leaf, name: 'Carbon Neutral', price: '+$0.99' },
		{ id: 'gift', icon: Gift, name: 'Gift Wrapping', price: '+$4.99' },
		{ id: 'priority', icon: Star, name: 'Priority Handling', price: '+$1.99' },
		{
			id: 'signature',
			icon: Check,
			name: 'Signature Required',
			price: '+$1.49',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Customize Shipping
					</h1>
					<p className="text-muted-foreground">Choose speed and add extras</p>
				</div>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Delivery Speed</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup
							defaultValue="express"
							className="grid grid-cols-3 gap-4"
						>
							{speeds.map((speed) => (
								<SpeedCard key={speed.value} {...speed} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Features & Add-ons</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-3">
							{features.map((feature) => (
								<FeatureCard key={feature.id} {...feature} />
							))}
						</div>
					</CardContent>
				</Card>

				<div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
					<div>
						<p className="text-sm text-muted-foreground">Shipping Total</p>
						<p className="text-2xl font-bold">$14.97</p>
					</div>
					<Button size="lg">
						Continue
						<ArrowRight className="size-5 ml-2" />
					</Button>
				</div>
			</div>
		</section>
	);
}
