import {
	Truck,
	Clock,
	MapPin,
	Package,
	Check,
	ArrowRight,
	Info,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const SplitShipmentRadio = ({
	value,
	title,
	description,
	deliveries,
	totalPrice,
	recommended,
}: {
	value: string;
	title: string;
	description: string;
	deliveries: { items: number; date: string }[];
	totalPrice: string;
	recommended?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${recommended ? 'ring-2 ring-primary/20' : ''}
			`}
		>
			{recommended && (
				<Badge className="absolute -top-2.5 left-4">Recommended</Badge>
			)}
			<CardContent className="p-5">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex-1">
						<div className="flex items-center justify-between mb-2">
							<h3 className="font-semibold text-lg">{title}</h3>
							<span className="text-lg font-bold text-primary">
								{totalPrice}
							</span>
						</div>
						<p className="text-sm text-muted-foreground mb-3">{description}</p>
						<div className="space-y-2">
							{deliveries.map((delivery, i) => (
								<div key={i} className="flex items-center gap-3 text-sm">
									<div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
										{i + 1}
									</div>
									<Package className="size-4 text-muted-foreground" />
									<span>{delivery.items} items</span>
									<span className="text-muted-foreground">·</span>
									<span className="text-muted-foreground">{delivery.date}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const SimpleRadio = ({
	value,
	name,
	time,
	price,
	best,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	best?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
			hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
			${best ? 'ring-2 ring-primary/20' : ''}
		`}
	>
		{best && <Badge className="absolute -top-2.5 right-4">Best Value</Badge>}
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<div>
				<span className="font-medium">{name}</span>
				<div className="flex items-center gap-1 text-sm text-muted-foreground">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
			</div>
		</div>
		<span className="text-lg font-bold text-primary">{price}</span>
	</Label>
);

export default function Main() {
	const shipmentOptions = [
		{
			value: 'single',
			title: 'Single Shipment',
			description: 'All items shipped together when everything is available',
			deliveries: [{ items: 5, date: 'Arrives Jan 20-22' }],
			totalPrice: '$7.99',
		},
		{
			value: 'split',
			title: 'Split Shipment',
			description: 'Get items as they become available',
			deliveries: [
				{ items: 3, date: 'Arrives Jan 16' },
				{ items: 2, date: 'Arrives Jan 20-22' },
			],
			totalPrice: '$12.99',
			recommended: true,
		},
	];

	const speedOptions = [
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
		{
			value: 'express',
			name: 'Express',
			time: '2-3 days',
			price: '$12.99',
			best: true,
		},
		{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$24.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-2">Shipping Options</h1>
				<p className="text-muted-foreground mb-8">Some items ship separately</p>

				<div className="mb-8">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Package className="size-5 text-primary" />
						Shipment Preference
					</h2>
					<RadioGroup defaultValue="split" className="space-y-4">
						{shipmentOptions.map((option) => (
							<SplitShipmentRadio key={option.value} {...option} />
						))}
					</RadioGroup>
				</div>

				<Separator className="my-6" />

				<div className="mb-8">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Truck className="size-5 text-primary" />
						Delivery Speed
					</h2>
					<RadioGroup defaultValue="express" className="space-y-3">
						{speedOptions.map((option) => (
							<SimpleRadio key={option.value} {...option} />
						))}
					</RadioGroup>
				</div>

				<Card className="bg-muted/30 mb-6">
					<CardContent className="p-4">
						<div className="flex items-start gap-3">
							<Info className="size-5 text-muted-foreground shrink-0 mt-0.5" />
							<p className="text-sm text-muted-foreground">
								Delivery speed applies to each shipment. You'll receive tracking
								for each package separately.
							</p>
						</div>
					</CardContent>
				</Card>

				<Button className="w-full h-12 text-base">
					Continue to Payment
					<ArrowRight className="size-5 ml-2" />
				</Button>
			</div>
		</section>
	);
}
