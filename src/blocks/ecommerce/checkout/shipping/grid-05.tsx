import { Globe2, Clock, Check, Plane, Ship, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CountryCard = ({
	value,
	flag,
	country,
	region,
	fromPrice,
	fromTime,
}: {
	value: string;
	flag: string;
	country: string;
	region: string;
	fromPrice: string;
	fromTime: string;
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className="
				h-full transition-all hover:shadow-md hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
			"
		>
			<CardContent className="p-4 text-center">
				<RadioGroupItem value={value} id={value} className="sr-only" />
				<span className="text-4xl mb-2 block">{flag}</span>
				<h3 className="font-semibold">{country}</h3>
				<p className="text-sm text-muted-foreground mb-2">{region}</p>
				<Badge variant="secondary">From {fromPrice}</Badge>
				<p className="text-xs text-muted-foreground mt-2">{fromTime}</p>
			</CardContent>
		</Card>
	</Label>
);

const ShippingMethodCard = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	features,
	fastest,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	features: string[];
	fastest?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className={`
				h-full transition-all hover:shadow-md hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${fastest ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{fastest && (
				<Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
					Fastest
				</Badge>
			)}
			<CardContent className="p-4 relative">
				<div className="flex items-start gap-3">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Icon className="size-5" />
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between mb-1">
							<span className="font-semibold">{name}</span>
							<span className="font-bold text-primary">{price}</span>
						</div>
						<div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
							<Clock className="size-3.5" />
							<span>{time}</span>
						</div>
						<div className="flex flex-wrap gap-1">
							{features.map((f, i) => (
								<Badge
									key={i}
									variant="secondary"
									className="text-xs font-normal"
								>
									{f}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

export default function Main() {
	const countries = [
		{
			value: 'uk',
			flag: '🇬🇧',
			country: 'United Kingdom',
			region: 'Europe',
			fromPrice: '$12.99',
			fromTime: '5-7 days',
		},
		{
			value: 'de',
			flag: '🇩🇪',
			country: 'Germany',
			region: 'Europe',
			fromPrice: '$14.99',
			fromTime: '5-7 days',
		},
		{
			value: 'jp',
			flag: '🇯🇵',
			country: 'Japan',
			region: 'Asia',
			fromPrice: '$19.99',
			fromTime: '7-10 days',
		},
		{
			value: 'au',
			flag: '🇦🇺',
			country: 'Australia',
			region: 'Oceania',
			fromPrice: '$24.99',
			fromTime: '10-14 days',
		},
		{
			value: 'ca',
			flag: '🇨🇦',
			country: 'Canada',
			region: 'North America',
			fromPrice: '$9.99',
			fromTime: '3-5 days',
		},
		{
			value: 'other',
			flag: '🌍',
			country: 'Other',
			region: 'Worldwide',
			fromPrice: '$29.99',
			fromTime: '14-21 days',
		},
	];

	const methods = [
		{
			value: 'economy',
			icon: Ship,
			name: 'Economy',
			time: '14-21 days',
			price: '$19.99',
			features: ['Basic tracking', 'No customs fee'],
		},
		{
			value: 'standard',
			icon: Globe2,
			name: 'Standard',
			time: '7-10 days',
			price: '$34.99',
			features: ['Full tracking', 'Insurance included'],
		},
		{
			value: 'express',
			icon: Plane,
			name: 'Express',
			time: '3-5 days',
			price: '$49.99',
			features: ['Priority handling', 'Full insurance', 'Customs cleared'],
			fastest: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						International Shipping
					</h1>
					<p className="text-muted-foreground">
						We ship to over 100 countries worldwide
					</p>
				</div>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Select Destination</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup
							defaultValue="uk"
							className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-6 gap-3"
						>
							{countries.map((country) => (
								<CountryCard key={country.value} {...country} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Shipping Method</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup
							defaultValue="standard"
							className="grid @md:grid-cols-3 gap-4"
						>
							{methods.map((method) => (
								<ShippingMethodCard key={method.value} {...method} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Alert>
					<AlertCircle className="size-4" />
					<AlertDescription>
						Import duties and taxes may apply and are the responsibility of the
						recipient.
					</AlertDescription>
				</Alert>

				<div className="flex gap-3 justify-center pt-8">
					<Button variant="outline">Back</Button>
					<Button>Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
