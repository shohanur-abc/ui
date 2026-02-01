'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Filter, Grid3X3, List, Check } from 'lucide-react';

interface AddressGridItemProps {
	id: string;
	label: string;
	name: string;
	street: string;
	city: string;
	isDefault?: boolean;
}

const SearchBar = ({ placeholder }: { placeholder: string }) => (
	<div className="relative flex-1">
		<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
		<Input placeholder={placeholder} className="pl-10" />
	</div>
);

const ViewToggle = () => (
	<div className="flex border border-border rounded-lg overflow-hidden">
		<button type="button" className="p-2 bg-primary/10 text-primary">
			<Grid3X3 className="size-4" />
		</button>
		<button type="button" className="p-2 hover:bg-muted/50">
			<List className="size-4" />
		</button>
	</div>
);

const AddressGridItem = ({
	id,
	label,
	name,
	street,
	city,
	isDefault,
}: AddressGridItemProps) => (
	<label className="block cursor-pointer group">
		<Card className="h-full transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
			<CardHeader className="pb-2">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-2">
						<RadioGroupItem value={id} />
						<CardTitle className="text-base">{label}</CardTitle>
					</div>
					{isDefault && (
						<Badge variant="secondary" className="text-xs">
							Default
						</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex items-start gap-2">
					<MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
					<div className="text-sm text-muted-foreground">
						<p className="font-medium text-foreground">{name}</p>
						<p>{street}</p>
						<p>{city}</p>
					</div>
				</div>
			</CardContent>
			<div className="absolute bottom-3 right-3 hidden group-has-[:checked]:flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
				<Check className="size-3.5" />
			</div>
		</Card>
	</label>
);

const EmptyState = () => (
	<Card className="border-2 border-dashed">
		<CardContent className="py-12 text-center">
			<MapPin className="size-12 text-muted-foreground mx-auto mb-4" />
			<h3 className="font-semibold mb-1">No addresses found</h3>
			<p className="text-sm text-muted-foreground mb-4">
				Add your first delivery address
			</p>
			<Button>Add Address</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			label: 'Home',
			name: 'John Doe',
			street: '123 Main Street, Apt 4B',
			city: 'San Francisco, CA 94102',
			isDefault: true,
		},
		{
			id: '2',
			label: 'Office',
			name: 'John Doe',
			street: '456 Market Street, Suite 100',
			city: 'San Francisco, CA 94103',
		},
		{
			id: '3',
			label: "Parent's",
			name: 'Jane Doe',
			street: '789 Oak Avenue',
			city: 'Los Angeles, CA 90001',
		},
		{
			id: '4',
			label: 'Vacation',
			name: 'John Doe',
			street: '321 Beach Road',
			city: 'Miami, FL 33101',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold mb-1">
						Select Address
					</h1>
					<p className="text-muted-foreground">
						Choose from your saved addresses
					</p>
				</div>

				<div className="flex items-center gap-3 mb-6">
					<SearchBar placeholder="Search addresses..." />
					<Button variant="outline" size="icon">
						<Filter className="size-4" />
					</Button>
					<ViewToggle />
				</div>

				<RadioGroup defaultValue="1" className="grid @sm:grid-cols-2 gap-4">
					{addresses.map((addr) => (
						<AddressGridItem key={addr.id} {...addr} />
					))}
				</RadioGroup>

				<Button variant="outline" className="w-full mt-4">
					+ Add New Address
				</Button>

				<div className="flex gap-3 mt-8 pt-6 border-t border-border">
					<Button variant="outline" size="lg" className="flex-1">
						Cancel
					</Button>
					<Button size="lg" className="flex-1">
						Use Selected Address
					</Button>
				</div>
			</div>
		</section>
	);
}
