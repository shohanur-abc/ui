import {
	Truck,
	Globe2,
	Plane,
	Ship,
	Clock,
	AlertCircle,
	Check,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const CarrierRadio = ({
	value,
	carrier,
	icon: Icon,
	method,
	time,
	price,
	rating,
	reviews,
}: {
	value: string;
	carrier: string;
	icon: React.ComponentType<{ className?: string }>;
	method: string;
	time: string;
	price: string;
	rating: number;
	reviews: number;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} />
		<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
			<Icon className="size-6 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2 mb-1">
				<span className="font-semibold">{carrier}</span>
				<span className="text-muted-foreground">·</span>
				<span className="text-sm text-muted-foreground">{method}</span>
			</div>
			<div className="flex items-center gap-3 text-sm">
				<div className="flex items-center gap-1 text-muted-foreground">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
				<div className="flex items-center gap-1">
					<span className="text-amber-500">★</span>
					<span>{rating}</span>
					<span className="text-muted-foreground">({reviews})</span>
				</div>
			</div>
		</div>
		<span className="text-lg font-bold text-primary">{price}</span>
	</Label>
);

const InternationalRadio = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	includes,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	includes: string[];
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center justify-between mb-1">
				<span className="font-semibold">{name}</span>
				<span className="text-lg font-bold text-primary">{price}</span>
			</div>
			<div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
				<Clock className="size-3.5" />
				<span>{time}</span>
			</div>
			<div className="flex flex-wrap gap-1">
				{includes.map((item, i) => (
					<Badge key={i} variant="secondary" className="text-xs font-normal">
						{item}
					</Badge>
				))}
			</div>
		</div>
	</Label>
);

export default function Main() {
	const domesticCarriers = [
		{
			value: 'usps',
			carrier: 'USPS',
			icon: Truck,
			method: 'Priority Mail',
			time: '2-3 days',
			price: '$8.99',
			rating: 4.5,
			reviews: 1234,
		},
		{
			value: 'ups',
			carrier: 'UPS',
			icon: Truck,
			method: 'Ground',
			time: '3-5 days',
			price: '$10.99',
			rating: 4.7,
			reviews: 2156,
		},
		{
			value: 'fedex',
			carrier: 'FedEx',
			icon: Truck,
			method: 'Home Delivery',
			time: '2-5 days',
			price: '$12.99',
			rating: 4.6,
			reviews: 1879,
		},
	];

	const internationalOptions = [
		{
			value: 'intl-economy',
			icon: Ship,
			name: 'Economy International',
			time: '14-21 days',
			price: '$19.99',
			includes: ['Tracking', 'Basic insurance'],
		},
		{
			value: 'intl-express',
			icon: Plane,
			name: 'Express International',
			time: '5-7 days',
			price: '$49.99',
			includes: ['Priority handling', 'Full tracking', 'Insurance up to $200'],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<Globe2 className="size-8 text-primary" />
					<div>
						<h1 className="text-2xl font-bold">Choose Carrier</h1>
						<p className="text-muted-foreground">Shipping to: United Kingdom</p>
					</div>
				</div>

				<div className="mb-8">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Truck className="size-5 text-primary" />
						Domestic Carriers
					</h2>
					<RadioGroup defaultValue="ups" className="space-y-3">
						{domesticCarriers.map((carrier) => (
							<CarrierRadio key={carrier.value} {...carrier} />
						))}
					</RadioGroup>
				</div>

				<Separator className="my-6" />

				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Globe2 className="size-5 text-primary" />
						International Options
					</h2>
					<RadioGroup className="space-y-3">
						{internationalOptions.map((option) => (
							<InternationalRadio key={option.value} {...option} />
						))}
					</RadioGroup>
				</div>

				<Alert>
					<AlertCircle className="size-4" />
					<AlertDescription>
						International shipments may be subject to customs duties and taxes.
					</AlertDescription>
				</Alert>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1">Continue</Button>
				</div>
			</div>
		</section>
	);
}
