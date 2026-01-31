import { Package, MapPin, Truck, Check, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const CarrierCard = ({
	name,
	logo,
	rating,
	reviews,
	price,
	time,
	features,
	selected,
	onSelect,
}: {
	name: string;
	logo: string;
	rating: number;
	reviews: string;
	price: string;
	time: string;
	features: string[];
	selected?: boolean;
	onSelect?: () => void;
}) => (
	<Card
		className={`
			relative cursor-pointer transition-all hover:shadow-lg
			${selected ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}
		`}
		onClick={onSelect}
	>
		{selected && (
			<div className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
				<Check className="size-4" />
			</div>
		)}
		<CardContent className="p-6">
			<div className="flex items-center gap-4 mb-4">
				<div className="size-14 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
					<img src={logo} alt={name} className="size-10 object-contain" />
				</div>
				<div>
					<h3 className="font-semibold text-lg">{name}</h3>
					<div className="flex items-center gap-2 text-sm">
						<div className="flex items-center gap-1">
							<Star className="size-4 fill-amber-400 text-amber-400" />
							<span className="font-medium">{rating}</span>
						</div>
						<span className="text-muted-foreground">({reviews})</span>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between py-4 border-y">
				<div>
					<p className="text-sm text-muted-foreground">Delivery Time</p>
					<p className="font-medium">{time}</p>
				</div>
				<div className="text-right">
					<p className="text-sm text-muted-foreground">Price</p>
					<p className="text-xl font-bold text-primary">{price}</p>
				</div>
			</div>

			<div className="mt-4 space-y-2">
				{features.map((feature, i) => (
					<div key={i} className="flex items-center gap-2 text-sm">
						<Check className="size-4 text-primary" />
						<span>{feature}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const SummaryItem = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
		<Icon className="size-5 text-muted-foreground" />
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-medium text-sm">{value}</p>
		</div>
	</div>
);

export default function Main() {
	const carriers = [
		{
			name: 'FedEx Express',
			logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/FedEx_logo_%282000%29.svg/200px-FedEx_logo_%282000%29.svg.png',
			rating: 4.8,
			reviews: '12.5k',
			price: '$15.99',
			time: '2-3 days',
			features: ['Real-time tracking', 'Insurance included', 'Signature required'],
			selected: true,
		},
		{
			name: 'UPS Ground',
			logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_Logo_Shield_2017.svg/200px-UPS_Logo_Shield_2017.svg.png',
			rating: 4.7,
			reviews: '9.8k',
			price: '$12.99',
			time: '3-5 days',
			features: ['Package tracking', 'Delivery guarantee', 'Weekend delivery'],
		},
		{
			name: 'USPS Priority',
			logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/USPS_Eagle_Symbol.svg/200px-USPS_Eagle_Symbol.svg.png',
			rating: 4.5,
			reviews: '8.2k',
			price: '$8.99',
			time: '4-6 days',
			features: ['Affordable rates', 'PO Box delivery', 'Flat rate options'],
		},
	];

	const summaryItems = [
		{ icon: MapPin, label: 'Shipping To', value: '123 Main St, New York, NY 10001' },
		{ icon: Package, label: 'Package Weight', value: '2.5 lbs (3 items)' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<Truck className="size-6" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">Choose Carrier</h1>
						<p className="text-muted-foreground">Compare shipping options from top carriers</p>
					</div>
				</div>

				<div className="grid @sm:grid-cols-2 gap-4 mb-8">
					{summaryItems.map((item, i) => (
						<SummaryItem key={i} {...item} />
					))}
				</div>

				<div className="grid @md:grid-cols-3 gap-6 mb-8">
					{carriers.map((carrier) => (
						<CarrierCard key={carrier.name} {...carrier} />
					))}
				</div>

				<Separator className="my-8" />

				<div className="flex flex-col @sm:flex-row gap-3">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue with FedEx Express</Button>
				</div>
			</div>
		</section>
	);
}
