import { Globe2, Truck, Plane, Ship, Clock, AlertCircle, Check, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const RegionBadge = ({
	region,
	selected,
}: {
	region: string;
	selected?: boolean;
}) => (
	<Badge variant={selected ? 'default' : 'outline'} className="cursor-pointer">
		{region}
	</Badge>
);

const ShippingMethod = ({
	value,
	icon: Icon,
	name,
	description,
	time,
	price,
	best,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	time: string;
	price: string;
	best?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${best ? 'ring-2 ring-primary/20' : ''}
			`}
		>
			{best && <Badge className="absolute -top-2.5 right-4">Best Value</Badge>}
			<CardContent className="p-5">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
						<Icon className="size-6 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between mb-1">
							<h3 className="font-semibold">{name}</h3>
							<span className="text-lg font-bold text-primary">{price}</span>
						</div>
						<p className="text-sm text-muted-foreground mb-2">{description}</p>
						<div className="flex items-center gap-1 text-sm text-muted-foreground">
							<Clock className="size-3.5" />
							<span>{time}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const CostBreakdown = ({
	items,
}: {
	items: { label: string; value: string; note?: string }[];
}) => (
	<Card className="bg-muted/30">
		<CardHeader className="pb-2">
			<CardTitle className="text-base">Shipping Cost Breakdown</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-2 text-sm">
				{items.map((item, i) => (
					<div key={i} className="flex justify-between">
						<span className="text-muted-foreground">{item.label}</span>
						<div className="text-right">
							<span>{item.value}</span>
							{item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const internationalMethods = [
		{
			value: 'economy-intl',
			icon: Ship,
			name: 'International Economy',
			description: 'Most affordable option for non-urgent deliveries',
			time: '14-21 business days',
			price: '$15.99',
		},
		{
			value: 'standard-intl',
			icon: Truck,
			name: 'International Standard',
			description: 'Balanced speed and cost with full tracking',
			time: '7-10 business days',
			price: '$24.99',
			best: true,
		},
		{
			value: 'express-intl',
			icon: Plane,
			name: 'International Express',
			description: 'Fast delivery with priority handling',
			time: '3-5 business days',
			price: '$49.99',
		},
	];

	const costBreakdown = [
		{ label: 'Shipping', value: '$24.99' },
		{ label: 'Duties & Taxes', value: '$12.50', note: 'Estimated' },
		{ label: 'Handling Fee', value: '$2.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-6">
					<div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
						<Globe2 className="size-6" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">International Shipping</h1>
						<p className="text-muted-foreground">Ship to over 200 countries</p>
					</div>
				</div>

				{/* Country Selection */}
				<Card className="mb-6">
					<CardHeader className="pb-2">
						<CardTitle className="text-base">Destination Country</CardTitle>
					</CardHeader>
					<CardContent>
						<Select defaultValue="uk">
							<SelectTrigger>
								<SelectValue placeholder="Select country" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="uk">United Kingdom</SelectItem>
								<SelectItem value="de">Germany</SelectItem>
								<SelectItem value="fr">France</SelectItem>
								<SelectItem value="ca">Canada</SelectItem>
								<SelectItem value="au">Australia</SelectItem>
								<SelectItem value="jp">Japan</SelectItem>
							</SelectContent>
						</Select>

						<div className="flex flex-wrap gap-2 mt-3">
							<RegionBadge region="Europe" selected />
							<RegionBadge region="Asia" />
							<RegionBadge region="Americas" />
							<RegionBadge region="Oceania" />
						</div>
					</CardContent>
				</Card>

				{/* Shipping Methods */}
				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4">Shipping Methods</h2>
					<RadioGroup defaultValue="standard-intl" className="space-y-4">
						{internationalMethods.map((method) => (
							<ShippingMethod key={method.value} {...method} />
						))}
					</RadioGroup>
				</div>

				{/* Cost Breakdown */}
				<CostBreakdown items={costBreakdown} />

				<Alert className="mt-6 mb-6">
					<AlertCircle className="size-4" />
					<AlertTitle>Import Information</AlertTitle>
					<AlertDescription>
						Customs duties and taxes are collected upon delivery. Final amounts may vary based on local regulations.
					</AlertDescription>
				</Alert>

				<Button className="w-full h-12 text-base">Continue to Payment</Button>
			</div>
		</section>
	);
}
