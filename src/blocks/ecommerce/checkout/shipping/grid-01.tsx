import { Truck, Package, Zap, Plane, Clock, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const ShippingCard = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	features,
	popular,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	features: string[];
	popular?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className={`
				relative h-full transition-all hover:shadow-lg hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:shadow-lg
				${popular ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{popular && (
				<Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
					Popular
				</Badge>
			)}
			<CardContent className="p-5 text-center flex flex-col h-full">
				<RadioGroupItem value={value} id={value} className="sr-only" />
				<div className="flex size-14 mx-auto mb-3 items-center justify-center rounded-2xl bg-primary/10 text-primary">
					<Icon className="size-7" />
				</div>
				<h3 className="font-bold text-lg mb-1">{name}</h3>
				<div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
				<span className="text-2xl font-bold text-primary mb-4">{price}</span>
				<ul className="mt-auto space-y-2 text-left">
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

export default function Main() {
	const options = [
		{
			value: 'standard',
			icon: Package,
			name: 'Standard',
			time: '5-7 days',
			price: '$4.99',
			features: ['Basic tracking', 'Email updates'],
		},
		{
			value: 'express',
			icon: Truck,
			name: 'Express',
			time: '2-3 days',
			price: '$9.99',
			popular: true,
			features: ['Real-time tracking', 'Priority handling', 'Insurance'],
		},
		{
			value: 'overnight',
			icon: Zap,
			name: 'Overnight',
			time: 'Next day',
			price: '$19.99',
			features: ['Guaranteed delivery', 'Full insurance', 'Signature'],
		},
		{
			value: 'international',
			icon: Plane,
			name: 'International',
			time: '7-14 days',
			price: '$24.99',
			features: ['Global delivery', 'Customs handling', 'Tracking'],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Choose Shipping
					</h1>
					<p className="text-muted-foreground">
						Select the best option for your needs
					</p>
				</div>

				<RadioGroup
					defaultValue="express"
					className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4"
				>
					{options.map((option) => (
						<ShippingCard key={option.value} {...option} />
					))}
				</RadioGroup>

				<div className="flex justify-center pt-10">
					<Button size="lg" className="min-w-[200px]">
						Continue to Payment
					</Button>
				</div>
			</div>
		</section>
	);
}
