'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
	MapPin,
	Navigation,
	Locate,
} from 'lucide-react';

interface AddressProps {
	id: string;
	label: string;
	address: string;
	distance?: string;
}

const PageTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="mb-8">
		<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-1">{subtitle}</p>
	</div>
);

const LocationSearchBox = () => (
	<Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10">
		<CardContent className="pt-6">
			<div className="flex flex-col @sm:flex-row gap-3">
				<div className="relative flex-1">
					<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input
						placeholder="Enter address, ZIP code, or city"
						className="pl-10"
					/>
				</div>
				<Button variant="outline" className="gap-2 shrink-0">
					<Locate className="size-4" />
					Use My Location
				</Button>
			</div>
		</CardContent>
	</Card>
);

const AddressOption = ({ id, label, address, distance }: AddressProps) => (
	<label className="block cursor-pointer">
		<Card className="transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
			<CardContent className="py-4">
				<div className="flex items-center gap-4">
					<RadioGroupItem value={id} />
					<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
						<Navigation className="size-5 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2">
							<span className="font-semibold">{label}</span>
							{id === '1' && (
								<Badge variant="secondary" className="text-xs">
									Saved
								</Badge>
							)}
						</div>
						<p className="text-sm text-muted-foreground truncate">
							{address}
						</p>
					</div>
					{distance && (
						<span className="text-sm text-muted-foreground shrink-0">
							{distance}
						</span>
					)}
				</div>
			</CardContent>
		</Card>
	</label>
);

const MapPlaceholder = () => (
	<Card className="aspect-[4/3] @lg:aspect-auto @lg:h-full bg-muted/30 overflow-hidden">
		<CardContent className="h-full flex items-center justify-center p-0">
			<div className="text-center p-6">
				<div className="size-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
					<MapPin className="size-8 text-muted-foreground" />
				</div>
				<p className="font-medium">Map View</p>
				<p className="text-sm text-muted-foreground">
					Interactive map would display here
				</p>
			</div>
		</CardContent>
	</Card>
);

const RecentSearches = () => (
	<Card className="mt-6">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm text-muted-foreground font-medium">
				Recent Searches
			</CardTitle>
		</CardHeader>
		<CardContent className="flex flex-wrap gap-2">
			{['San Francisco, CA', '94102', 'Market Street'].map((term) => (
				<Badge
					key={term}
					variant="outline"
					className="cursor-pointer hover:bg-muted"
				>
					{term}
				</Badge>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			label: 'Home',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			distance: '0.5 mi',
		},
		{
			id: '2',
			label: 'Office',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
			distance: '1.2 mi',
		},
		{
			id: '3',
			label: 'Suggested',
			address: '789 Mission Street, San Francisco, CA 94103',
			distance: '0.8 mi',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageTitle
					title="Delivery Location"
					subtitle="Search or select a delivery address"
				/>

				<LocationSearchBox />

				<div className="grid @lg:grid-cols-2 gap-6">
					<div>
						<Label className="text-sm font-medium mb-3 block">
							Select Address
						</Label>
						<RadioGroup defaultValue="1" className="space-y-3">
							{addresses.map((addr) => (
								<AddressOption key={addr.id} {...addr} />
							))}
						</RadioGroup>

						<Button variant="outline" className="w-full mt-4">
							+ Add New Address
						</Button>

						<RecentSearches />
					</div>

					<MapPlaceholder />
				</div>

				<div className="flex gap-3 mt-8 pt-6 border-t border-border">
					<Button variant="outline" size="lg" className="flex-1">
						Back
					</Button>
					<Button size="lg" className="flex-1">
						Confirm Location
					</Button>
				</div>
			</div>
		</section>
	);
}
