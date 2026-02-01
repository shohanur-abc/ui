import { Truck, Store, Box, MapPin, Clock, Star, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const LocationCard = ({
	value,
	name,
	address,
	hours,
	distance,
	phone,
	rating,
	available,
}: {
	value: string;
	name: string;
	address: string;
	hours: string;
	distance: string;
	phone: string;
	rating: number;
	available: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`cursor-pointer ${!available ? 'opacity-60' : ''}`}
	>
		<Card
			className={`
				h-full transition-all hover:shadow-lg
				${available ? 'hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5' : 'cursor-not-allowed'}
			`}
		>
			<CardContent className="p-4">
				<div className="flex items-start gap-3 mb-3">
					<RadioGroupItem
						value={value}
						id={value}
						className="mt-1"
						disabled={!available}
					/>
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
						<Store className="size-5 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<span className="font-semibold truncate">{name}</span>
							{!available && (
								<Badge variant="secondary" className="text-xs">
									Unavailable
								</Badge>
							)}
						</div>
						<Badge variant="outline" className="text-xs">
							{distance}
						</Badge>
					</div>
				</div>
				<div className="space-y-1.5 text-sm text-muted-foreground pl-8">
					<div className="flex items-center gap-2">
						<MapPin className="size-3.5 shrink-0" />
						<span className="truncate">{address}</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="size-3.5 shrink-0" />
						<span>{hours}</span>
					</div>
					<div className="flex items-center gap-2">
						<Phone className="size-3.5 shrink-0" />
						<span>{phone}</span>
					</div>
					<div className="flex items-center gap-2">
						<Star className="size-3.5 shrink-0 text-amber-500" />
						<span>{rating} rating</span>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

export default function Main() {
	const locations = [
		{
			value: 'loc-1',
			name: 'Downtown Store',
			address: '123 Main Street, Suite 100',
			hours: 'Open until 9 PM',
			distance: '0.3 mi',
			phone: '(555) 123-4567',
			rating: 4.8,
			available: true,
		},
		{
			value: 'loc-2',
			name: 'City Center Mall',
			address: '456 Shopping Ave',
			hours: 'Open until 10 PM',
			distance: '0.8 mi',
			phone: '(555) 234-5678',
			rating: 4.6,
			available: true,
		},
		{
			value: 'loc-3',
			name: 'Eastside Plaza',
			address: '789 East Boulevard',
			hours: 'Open until 8 PM',
			distance: '1.2 mi',
			phone: '(555) 345-6789',
			rating: 4.5,
			available: true,
		},
		{
			value: 'loc-4',
			name: 'North Point',
			address: '321 North Ave',
			hours: 'Closed',
			distance: '1.5 mi',
			phone: '(555) 456-7890',
			rating: 4.4,
			available: false,
		},
		{
			value: 'loc-5',
			name: 'Westgate Center',
			address: '654 West Street',
			hours: 'Open until 9 PM',
			distance: '2.0 mi',
			phone: '(555) 567-8901',
			rating: 4.7,
			available: true,
		},
		{
			value: 'loc-6',
			name: 'South Bay Store',
			address: '987 South Road',
			hours: 'Open until 7 PM',
			distance: '2.5 mi',
			phone: '(555) 678-9012',
			rating: 4.3,
			available: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Store Pickup
					</h1>
					<p className="text-muted-foreground">Free pickup at any location</p>
				</div>

				<div className="max-w-md mx-auto mb-8">
					<div className="relative">
						<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
						<Input placeholder="Enter ZIP code or city" className="pl-10" />
					</div>
				</div>

				<RadioGroup
					defaultValue="loc-1"
					className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4"
				>
					{locations.map((loc) => (
						<LocationCard key={loc.value} {...loc} />
					))}
				</RadioGroup>

				<div className="flex gap-3 justify-center pt-10">
					<Button variant="outline">Back</Button>
					<Button>Select This Location</Button>
				</div>
			</div>
		</section>
	);
}
