'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	MapPin,
	Phone,
	Mail,
	Edit2,
	Trash2,
	Plus,
	Check,
	Star,
} from 'lucide-react';

interface AddressCardProps {
	id: string;
	label: string;
	name: string;
	address: string;
	phone: string;
	email: string;
	isDefault?: boolean;
	isSelected?: boolean;
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between mb-6">
		<div>
			<h1 className="text-2xl font-bold">{title}</h1>
			<p className="text-sm text-muted-foreground">{count} saved addresses</p>
		</div>
		<Button className="gap-2">
			<Plus className="size-4" />
			Add Address
		</Button>
	</div>
);

const AddressCard = ({
	label,
	name,
	address,
	phone,
	email,
	isDefault,
	isSelected,
}: AddressCardProps) => (
	<Card
		className={`relative transition-all cursor-pointer hover:shadow-md ${
			isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
		}`}
	>
		<CardContent className="pt-6">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-2">
					<span className="font-semibold text-lg">{label}</span>
					{isDefault && (
						<Badge variant="secondary" className="gap-1">
							<Star className="size-3 fill-current" />
							Default
						</Badge>
					)}
				</div>
				{isSelected && (
					<div className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<Check className="size-4" />
					</div>
				)}
			</div>

			<div className="space-y-3">
				<div className="flex items-start gap-3">
					<MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
					<div>
						<p className="font-medium">{name}</p>
						<p className="text-sm text-muted-foreground">{address}</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<Phone className="size-4 text-muted-foreground" />
					<span className="text-sm text-muted-foreground">{phone}</span>
				</div>
				<div className="flex items-center gap-3">
					<Mail className="size-4 text-muted-foreground" />
					<span className="text-sm text-muted-foreground">{email}</span>
				</div>
			</div>

			<Separator className="my-4" />

			<div className="flex items-center justify-between">
				<Button
					variant="ghost"
					size="sm"
					className="gap-1.5 text-muted-foreground"
				>
					<Edit2 className="size-3.5" />
					Edit
				</Button>
				<Button
					variant="ghost"
					size="sm"
					className="gap-1.5 text-muted-foreground hover:text-destructive"
				>
					<Trash2 className="size-3.5" />
					Delete
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			label: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			phone: '+1 (555) 123-4567',
			email: 'john@example.com',
			isDefault: true,
			isSelected: true,
		},
		{
			id: '2',
			label: 'Office',
			name: 'John Doe',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
			phone: '+1 (555) 987-6543',
			email: 'john.doe@company.com',
		},
		{
			id: '3',
			label: "Parent's House",
			name: 'Jane Doe',
			address: '789 Oak Avenue, Los Angeles, CA 90001',
			phone: '+1 (555) 456-7890',
			email: 'jane@example.com',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageHeader title="My Addresses" count={addresses.length} />

				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4">
					{addresses.map((addr) => (
						<AddressCard key={addr.id} {...addr} />
					))}
				</div>

				<div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
					<Button variant="outline" size="lg">
						Cancel
					</Button>
					<Button size="lg">Use Selected Address</Button>
				</div>
			</div>
		</section>
	);
}
