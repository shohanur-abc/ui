import { Globe2, MapPin, Truck, Plane, Ship, Clock, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ShippingMethod = ({
	value,
	icon: Icon,
	name,
	time,
	price,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
			<Icon className="size-5 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<span className="font-medium">{name}</span>
			<div className="flex items-center gap-1 text-sm text-muted-foreground">
				<Clock className="size-3.5" />
				<span>{time}</span>
			</div>
		</div>
		<span className="font-bold text-primary">{price}</span>
	</Label>
);

const RegionInfo = ({
	countries,
	restrictions,
}: {
	countries: string[];
	restrictions?: string;
}) => (
	<Card className="bg-muted/30 mb-4">
		<CardContent className="p-4">
			<div className="flex items-start gap-3">
				<MapPin className="size-5 text-muted-foreground shrink-0 mt-0.5" />
				<div>
					<p className="font-medium mb-1">Available Countries</p>
					<p className="text-sm text-muted-foreground">{countries.join(', ')}</p>
					{restrictions && (
						<p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
							⚠️ {restrictions}
						</p>
					)}
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const domesticMethods = [
		{ value: 'ground', icon: Truck, name: 'Ground Shipping', time: '5-7 days', price: '$7.99' },
		{ value: 'express', icon: Truck, name: 'Express', time: '2-3 days', price: '$14.99' },
		{ value: 'overnight', icon: Plane, name: 'Overnight Air', time: '1 day', price: '$29.99' },
	];

	const internationalMethods = [
		{ value: 'intl-standard', icon: Ship, name: 'International Standard', time: '14-21 days', price: '$19.99' },
		{ value: 'intl-express', icon: Plane, name: 'International Express', time: '5-7 days', price: '$39.99' },
		{ value: 'intl-priority', icon: Plane, name: 'Priority International', time: '3-5 days', price: '$59.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<Globe2 className="size-8 text-primary" />
					<div>
						<h1 className="text-2xl font-bold">Shipping Options</h1>
						<p className="text-muted-foreground">Choose domestic or international delivery</p>
					</div>
				</div>

				<Tabs defaultValue="domestic" className="w-full">
					<TabsList className="grid w-full grid-cols-2 mb-6">
						<TabsTrigger value="domestic" className="gap-2">
							<MapPin className="size-4" />
							Domestic
						</TabsTrigger>
						<TabsTrigger value="international" className="gap-2">
							<Globe2 className="size-4" />
							International
						</TabsTrigger>
					</TabsList>

					<TabsContent value="domestic">
						<Card className="mb-4">
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Shipping to United States</CardTitle>
							</CardHeader>
							<CardContent>
								<RadioGroup defaultValue="express" className="space-y-3">
									{domesticMethods.map((method) => (
										<ShippingMethod key={method.value} {...method} />
									))}
								</RadioGroup>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="international">
						<RegionInfo
							countries={['Canada', 'UK', 'Germany', 'France', 'Australia', 'Japan', '+40 more']}
							restrictions="Some items may be restricted for international shipping"
						/>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">International Shipping Methods</CardTitle>
							</CardHeader>
							<CardContent>
								<RadioGroup defaultValue="intl-express" className="space-y-3">
									{internationalMethods.map((method) => (
										<ShippingMethod key={method.value} {...method} />
									))}
								</RadioGroup>
							</CardContent>
						</Card>

						<Alert className="mt-4">
							<AlertCircle className="size-4" />
							<AlertDescription>
								Import duties and taxes may apply upon delivery and are the customer's responsibility.
							</AlertDescription>
						</Alert>
					</TabsContent>
				</Tabs>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
