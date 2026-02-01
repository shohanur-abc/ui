'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Building2, Check, Plus, Edit } from 'lucide-react';

interface AddressCardProps {
	id: string;
	type: 'home' | 'work' | 'other';
	label: string;
	name: string;
	address: string;
	city: string;
	phone: string;
	isDefault?: boolean;
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="mb-8">
		<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-1">{subtitle}</p>
	</div>
);

const AddressCard = ({
	id,
	type,
	label,
	name,
	address,
	city,
	phone,
	isDefault,
}: AddressCardProps) => {
	const TypeIcon =
		type === 'home' ? Home : type === 'work' ? Building2 : MapPin;
	return (
		<label className="block cursor-pointer group">
			<Card className="relative overflow-hidden transition-all border-2 hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<CardContent className="pt-6">
					<div className="flex items-start gap-4">
						<RadioGroupItem value={id} className="mt-1" />
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-2">
								<div className="flex size-8 items-center justify-center rounded-lg bg-muted">
									<TypeIcon className="size-4 text-muted-foreground" />
								</div>
								<span className="font-semibold">{label}</span>
								{isDefault && (
									<Badge variant="secondary" className="text-xs">
										Default
									</Badge>
								)}
							</div>
							<p className="text-sm font-medium">{name}</p>
							<p className="text-sm text-muted-foreground">{address}</p>
							<p className="text-sm text-muted-foreground">{city}</p>
							<p className="text-sm text-muted-foreground mt-1">{phone}</p>
						</div>
						<Button
							variant="ghost"
							size="icon-sm"
							className="opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<Edit className="size-4" />
						</Button>
					</div>
				</CardContent>
				<div className="absolute top-3 right-3 hidden group-has-[:checked]:flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
					<Check className="size-3.5" />
				</div>
			</Card>
		</label>
	);
};

const AddNewCard = () => (
	<Card className="border-2 border-dashed border-border hover:border-primary/40 transition-colors cursor-pointer">
		<CardContent className="pt-6">
			<div className="flex flex-col items-center justify-center py-6 text-center">
				<div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
					<Plus className="size-5 text-muted-foreground" />
				</div>
				<p className="font-medium">Add New Address</p>
				<p className="text-sm text-muted-foreground">
					Save a new delivery location
				</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			id: 'home',
			type: 'home' as const,
			label: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apt 4B',
			city: 'San Francisco, CA 94102',
			phone: '+1 (555) 123-4567',
			isDefault: true,
		},
		{
			id: 'work',
			type: 'work' as const,
			label: 'Office',
			name: 'John Doe',
			address: '456 Market Street, Suite 100',
			city: 'San Francisco, CA 94103',
			phone: '+1 (555) 987-6543',
		},
		{
			id: 'parent',
			type: 'other' as const,
			label: "Parent's House",
			name: 'Jane Doe',
			address: '789 Oak Avenue',
			city: 'Los Angeles, CA 90001',
			phone: '+1 (555) 456-7890',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageHeader
					title="Select Delivery Address"
					subtitle="Choose where you want your order delivered"
				/>

				<RadioGroup defaultValue="home" className="grid gap-4">
					{addresses.map((addr) => (
						<AddressCard key={addr.id} {...addr} />
					))}
				</RadioGroup>

				<div className="mt-4">
					<AddNewCard />
				</div>

				<div className="flex flex-col @sm:flex-row gap-3 mt-8">
					<Button variant="outline" size="lg" className="@sm:order-1">
						Back to Cart
					</Button>
					<Button size="lg" className="flex-1 @sm:order-2">
						Deliver to This Address
					</Button>
				</div>
			</div>
		</section>
	);
}
