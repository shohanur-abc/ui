import { Globe2, Truck, Plane, Ship, Clock, DollarSign, AlertCircle, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

const ShippingZoneCard = ({
	value,
	zone,
	countries,
	minDays,
	maxDays,
	startingPrice,
	selected,
}: {
	value: string;
	zone: string;
	countries: string[];
	minDays: number;
	maxDays: number;
	startingPrice: string;
	selected?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				transition-all hover:shadow-md hover:border-primary/50
				${selected ? 'border-primary ring-2 ring-primary/20' : ''}
			`}
		>
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex-1">
						<div className="flex items-center justify-between mb-2">
							<span className="font-semibold">{zone}</span>
							<Badge variant="outline">{minDays}-{maxDays} days</Badge>
						</div>
						<p className="text-sm text-muted-foreground mb-2">
							{countries.join(', ')}
						</p>
						<div className="flex items-center gap-1 text-sm">
							<DollarSign className="size-3.5" />
							<span>From <span className="font-semibold text-primary">{startingPrice}</span></span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const MethodOption = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	description,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	description: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-4 p-4 rounded-xl border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
			<Icon className="size-5 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<div className="flex items-center justify-between">
				<span className="font-medium">{name}</span>
				<span className="font-bold text-primary">{price}</span>
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Clock className="size-3.5" />
				<span>{time}</span>
				<span>•</span>
				<span>{description}</span>
			</div>
		</div>
	</Label>
);

const ExpandableSection = ({
	title,
	defaultOpen,
	children,
}: {
	title: string;
	defaultOpen?: boolean;
	children: React.ReactNode;
}) => (
	<Collapsible defaultOpen={defaultOpen}>
		<CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left group">
			<span className="font-semibold">{title}</span>
			<ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
		</CollapsibleTrigger>
		<CollapsibleContent>
			{children}
		</CollapsibleContent>
	</Collapsible>
);

export default function Main() {
	const zones = [
		{
			value: 'europe',
			zone: 'Europe',
			countries: ['UK', 'Germany', 'France', 'Italy', '+20 more'],
			minDays: 5,
			maxDays: 10,
			startingPrice: '$15.99',
			selected: true,
		},
		{
			value: 'asia',
			zone: 'Asia Pacific',
			countries: ['Japan', 'Australia', 'Singapore', 'Korea', '+15 more'],
			minDays: 7,
			maxDays: 14,
			startingPrice: '$24.99',
		},
		{
			value: 'americas',
			zone: 'Americas',
			countries: ['Canada', 'Mexico', 'Brazil', 'Argentina', '+10 more'],
			minDays: 4,
			maxDays: 8,
			startingPrice: '$12.99',
		},
	];

	const methods = [
		{ value: 'air-express', icon: Plane, name: 'Air Express', time: '5-7 days', price: '$34.99', description: 'Fastest international' },
		{ value: 'air-standard', icon: Plane, name: 'Air Standard', time: '10-14 days', price: '$19.99', description: 'Reliable air freight' },
		{ value: 'sea-freight', icon: Ship, name: 'Sea Freight', time: '25-35 days', price: '$9.99', description: 'Economy option' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<Globe2 className="size-8 text-primary" />
					<div>
						<h1 className="text-2xl font-bold">International Shipping</h1>
						<p className="text-muted-foreground">Select your destination zone and shipping method</p>
					</div>
				</div>

				<Card className="mb-6">
					<CardContent className="p-6">
						<ExpandableSection title="Select Destination Zone" defaultOpen>
							<RadioGroup defaultValue="europe" className="space-y-3 pt-2">
								{zones.map((zone) => (
									<ShippingZoneCard key={zone.value} {...zone} />
								))}
							</RadioGroup>
						</ExpandableSection>
					</CardContent>
				</Card>

				<Card className="mb-6">
					<CardContent className="p-6">
						<ExpandableSection title="Choose Shipping Method" defaultOpen>
							<RadioGroup defaultValue="air-standard" className="space-y-3 pt-2">
								{methods.map((method) => (
									<MethodOption key={method.value} {...method} />
								))}
							</RadioGroup>
						</ExpandableSection>
					</CardContent>
				</Card>

				<Alert className="mb-8">
					<AlertCircle className="size-4" />
					<AlertDescription>
						International orders may be subject to import duties and taxes. These fees are collected upon delivery and are the buyer's responsibility.
					</AlertDescription>
				</Alert>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
