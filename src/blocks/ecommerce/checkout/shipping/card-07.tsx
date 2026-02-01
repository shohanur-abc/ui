import {
	Store,
	MapPin,
	Clock,
	Phone,
	Navigation,
	ChevronRight,
} from 'lucide-react';

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
	distance,
	hours,
	phone,
	available,
	isOpen,
}: {
	value: string;
	name: string;
	address: string;
	distance: string;
	hours: string;
	phone: string;
	available: boolean;
	isOpen?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:shadow-md
				${available ? 'hover:border-primary/50' : 'opacity-60'}
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
			`}
		>
			<CardContent className="p-5">
				<div className="flex items-start gap-4">
					<RadioGroupItem
						value={value}
						id={value}
						className="mt-1"
						disabled={!available}
					/>
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-2 mb-3">
							<div>
								<div className="flex items-center gap-2">
									<h3 className="font-semibold">{name}</h3>
									{isOpen && (
										<Badge
											variant="secondary"
											className="text-xs bg-green-500/10 text-green-600"
										>
											Open Now
										</Badge>
									)}
								</div>
								<p className="text-sm text-muted-foreground mt-1">{address}</p>
							</div>
							<Badge variant="outline" className="shrink-0">
								{distance}
							</Badge>
						</div>

						<div className="grid @sm:grid-cols-2 gap-2 text-sm">
							<div className="flex items-center gap-2 text-muted-foreground">
								<Clock className="size-4" />
								<span>{hours}</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<Phone className="size-4" />
								<span>{phone}</span>
							</div>
						</div>

						{!available && (
							<p className="text-sm text-destructive mt-2">
								Not available for pickup today
							</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const SearchBar = ({ placeholder }: { placeholder: string }) => (
	<div className="relative">
		<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
		<Input placeholder={placeholder} className="pl-10 h-12" />
		<Button
			size="sm"
			className="absolute right-2 top-1/2 -translate-y-1/2 gap-1"
		>
			<Navigation className="size-4" />
			Find
		</Button>
	</div>
);

const MapPlaceholder = () => (
	<div className="relative h-48 rounded-xl bg-muted overflow-hidden">
		<div className="absolute inset-0 flex items-center justify-center">
			<div className="text-center">
				<MapPin className="size-8 text-muted-foreground mx-auto mb-2" />
				<p className="text-sm text-muted-foreground">Map view</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const locations = [
		{
			value: 'downtown',
			name: 'Downtown Flagship Store',
			address: '123 Main Street, New York, NY 10001',
			distance: '0.5 mi',
			hours: '9 AM - 9 PM',
			phone: '(555) 123-4567',
			available: true,
			isOpen: true,
		},
		{
			value: 'midtown',
			name: 'Midtown Shopping Center',
			address: '456 5th Avenue, New York, NY 10018',
			distance: '1.2 mi',
			hours: '10 AM - 8 PM',
			phone: '(555) 234-5678',
			available: true,
			isOpen: true,
		},
		{
			value: 'brooklyn',
			name: 'Brooklyn Heights',
			address: '789 Atlantic Ave, Brooklyn, NY 11201',
			distance: '3.4 mi',
			hours: '10 AM - 7 PM',
			phone: '(555) 345-6789',
			available: false,
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<Store className="size-6" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">Store Pickup</h1>
						<p className="text-muted-foreground">
							Select a store to pick up your order
						</p>
					</div>
				</div>

				<div className="mb-6">
					<SearchBar placeholder="Enter ZIP code or city" />
				</div>

				<MapPlaceholder />

				<div className="mt-8">
					<h3 className="font-semibold mb-4">
						Nearby Stores ({locations.length})
					</h3>
					<RadioGroup defaultValue="downtown" className="space-y-4">
						{locations.map((location) => (
							<LocationCard key={location.value} {...location} />
						))}
					</RadioGroup>
				</div>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1 gap-2">
						Select Store
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
