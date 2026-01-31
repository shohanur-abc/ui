'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	MapPin,
	Check,
	Pencil,
	Plus,
	Truck,
	Calendar,
	ChevronRight,
} from 'lucide-react';

interface AddressProps {
	label: string;
	name: string;
	street: string;
	city: string;
	phone: string;
	isSelected?: boolean;
	isDefault?: boolean;
}

interface DeliveryInfoProps {
	icon: React.ElementType;
	label: string;
	value: string;
}

const PageTitle = () => (
	<div className="flex items-center justify-between mb-8">
		<div>
			<Badge variant="outline" className="mb-2">
				Step 1 of 3
			</Badge>
			<h1 className="text-2xl @md:text-3xl font-bold">
				Shipping Address
			</h1>
		</div>
		<Button variant="ghost" className="gap-2">
			<Plus className="size-4" />
			Add New
		</Button>
	</div>
);

const AddressCard = ({
	label,
	name,
	street,
	city,
	phone,
	isSelected,
	isDefault,
}: AddressProps) => (
	<Card
		className={`relative cursor-pointer transition-all ${
			isSelected
				? 'ring-2 ring-primary bg-primary/5'
				: 'hover:shadow-md hover:bg-muted/20'
		}`}
	>
		{isSelected && (
			<div className="absolute -top-2 -right-2 size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
				<Check className="size-4" />
			</div>
		)}
		<CardContent className="pt-6">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-2">
					<span className="font-semibold text-lg">{label}</span>
					{isDefault && (
						<Badge variant="secondary" className="text-xs">
							Default
						</Badge>
					)}
				</div>
				<Button variant="ghost" size="icon-sm">
					<Pencil className="size-4" />
				</Button>
			</div>

			<div className="space-y-2 text-sm">
				<p className="font-medium">{name}</p>
				<div className="flex items-start gap-2 text-muted-foreground">
					<MapPin className="size-3.5 shrink-0 mt-0.5" />
					<div>
						<p>{street}</p>
						<p>{city}</p>
					</div>
				</div>
				<p className="text-muted-foreground">{phone}</p>
			</div>
		</CardContent>
	</Card>
);

const DeliveryInfo = ({ icon: Icon, label, value }: DeliveryInfoProps) => (
	<div className="flex items-center gap-3">
		<div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-medium">{value}</p>
		</div>
	</div>
);

const DeliveryEstimate = () => (
	<Card className="bg-muted/30 mt-6">
		<CardContent className="py-6">
			<h3 className="font-semibold mb-4">Delivery Estimate</h3>
			<div className="flex flex-wrap gap-6">
				<DeliveryInfo
					icon={Truck}
					label="Shipping Method"
					value="Standard Free Shipping"
				/>
				<DeliveryInfo
					icon={Calendar}
					label="Estimated Arrival"
					value="Dec 15 - Dec 17"
				/>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			label: 'Home',
			name: 'John Doe',
			street: '123 Main Street, Apt 4B',
			city: 'San Francisco, CA 94102',
			phone: '+1 (555) 123-4567',
			isSelected: true,
			isDefault: true,
		},
		{
			label: 'Office',
			name: 'John Doe',
			street: '456 Market Street, Suite 100',
			city: 'San Francisco, CA 94103',
			phone: '+1 (555) 987-6543',
		},
		{
			label: 'Parents',
			name: 'Jane & Robert Doe',
			street: '789 Oak Avenue',
			city: 'Los Angeles, CA 90001',
			phone: '+1 (555) 456-7890',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageTitle />

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
					{addresses.map((addr, i) => (
						<AddressCard key={i} {...addr} />
					))}
				</div>

				<DeliveryEstimate />

				<Separator className="my-8" />

				<div className="flex flex-col @sm:flex-row gap-3">
					<Button variant="outline" size="lg" className="flex-1">
						Back to Cart
					</Button>
					<Button size="lg" className="flex-1 gap-2">
						Continue to Payment
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
