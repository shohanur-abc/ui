import { Truck, Clock, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const ShippingRadio = ({
	value,
	name,
	time,
	price,
	description,
	recommended,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	description: string;
	recommended?: boolean;
}) => (
	<div className="relative">
		<Label
			htmlFor={value}
			className={`
				flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
				hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${recommended ? 'ring-2 ring-primary/20' : ''}
			`}
		>
			<RadioGroupItem value={value} id={value} />
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<span className="font-semibold">{name}</span>
					{recommended && <Badge>Recommended</Badge>}
				</div>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			<div className="text-right">
				<span className="text-lg font-bold text-primary">{price}</span>
				<div className="flex items-center gap-1 text-sm text-muted-foreground">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
			</div>
		</Label>
	</div>
);

export default function Main() {
	const options = [
		{
			value: 'economy',
			name: 'Economy',
			time: '7-10 days',
			price: '$4.99',
			description: 'Basic tracking and standard packaging',
		},
		{
			value: 'standard',
			name: 'Standard',
			time: '5-7 days',
			price: '$7.99',
			description: 'Full tracking with email notifications',
		},
		{
			value: 'express',
			name: 'Express',
			time: '2-3 days',
			price: '$14.99',
			description: 'Priority handling with real-time tracking',
			recommended: true,
		},
		{
			value: 'overnight',
			name: 'Overnight',
			time: '1 day',
			price: '$29.99',
			description: 'Guaranteed next-day delivery',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Select Shipping Method
					</h1>
					<p className="text-muted-foreground">
						Choose how fast you want your order
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Truck className="size-5 text-primary" />
							Shipping Options
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="express" className="space-y-3">
							{options.map((option) => (
								<ShippingRadio key={option.value} {...option} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

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
