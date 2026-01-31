'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
	Home,
	Building2,
	MapPin,
	Phone,
	User,
	Globe,
	Copy,
} from 'lucide-react';

interface AddressDetailProps {
	icon: React.ElementType;
	label: string;
	value: string;
}

interface AddressCardProps {
	type: 'home' | 'office';
	typeLabel: string;
	selected: boolean;
	name: string;
	address: string;
	phone: string;
	email: string;
	country: string;
}

const PageTitle = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<div className="mb-8">
		<div className="flex items-center gap-3 mb-2">
			<div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
				<MapPin className="size-5 text-primary" />
			</div>
			<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		</div>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

const AddressDetail = ({ icon: Icon, label, value }: AddressDetailProps) => (
	<div className="flex items-start gap-3">
		<div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-4 text-muted-foreground" />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-sm font-medium">{value}</p>
		</div>
	</div>
);

const AddressCard = ({
	type,
	typeLabel,
	selected,
	name,
	address,
	phone,
	email,
	country,
}: AddressCardProps) => {
	const TypeIcon = type === 'home' ? Home : Building2;
	const iconColor =
		type === 'home'
			? 'bg-blue-500/10 text-blue-500'
			: 'bg-purple-500/10 text-purple-500';

	return (
		<Card
			className={`transition-all ${
				selected
					? 'ring-2 ring-primary shadow-lg'
					: 'hover:shadow-md cursor-pointer'
			}`}
		>
			<CardContent className="pt-6">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-3">
						<div
							className={`size-10 rounded-xl flex items-center justify-center ${iconColor}`}
						>
							<TypeIcon className="size-5" />
						</div>
						<div>
							<span className="font-semibold">{typeLabel}</span>
							{selected && (
								<Badge className="ml-2 text-xs">Selected</Badge>
							)}
						</div>
					</div>
					<Button variant="ghost" size="icon-sm">
						<Copy className="size-4" />
					</Button>
				</div>

				<div className="grid gap-3">
					<AddressDetail icon={User} label="Recipient" value={name} />
					<AddressDetail icon={MapPin} label="Address" value={address} />
					<div className="grid grid-cols-2 gap-3">
						<AddressDetail icon={Phone} label="Phone" value={phone} />
						<AddressDetail icon={Globe} label="Country" value={country} />
					</div>
				</div>

				{selected && (
					<div className="mt-4 pt-4 border-t border-border flex gap-2">
						<Button variant="outline" size="sm" className="flex-1">
							Edit
						</Button>
						<Button variant="outline" size="sm" className="flex-1">
							Remove
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

const BillingOption = () => (
	<div className="flex items-start gap-3 p-4 rounded-xl border border-border">
		<Checkbox id="same-billing" defaultChecked />
		<div>
			<Label htmlFor="same-billing" className="font-medium cursor-pointer">
				Use same address for billing
			</Label>
			<p className="text-sm text-muted-foreground mt-0.5">
				Your shipping address will be used for payment and invoicing
			</p>
		</div>
	</div>
);

export default function Main() {
	const addresses = [
		{
			type: 'home' as const,
			typeLabel: 'Home',
			selected: true,
			name: 'John Doe',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			phone: '+1 (555) 123-4567',
			email: 'john@example.com',
			country: 'United States',
		},
		{
			type: 'office' as const,
			typeLabel: 'Office',
			selected: false,
			name: 'John Doe',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
			phone: '+1 (555) 987-6543',
			email: 'john@work.com',
			country: 'United States',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageTitle
					title="Delivery Details"
					description="Confirm your shipping information"
				/>

				<div className="grid @md:grid-cols-2 gap-4 mb-6">
					{addresses.map((addr, i) => (
						<AddressCard key={i} {...addr} />
					))}
				</div>

				<Button variant="outline" className="w-full mb-6">
					+ Add New Address
				</Button>

				<BillingOption />

				<Separator className="my-8" />

				<div className="flex flex-col @sm:flex-row gap-3">
					<Button variant="outline" size="lg" className="flex-1">
						Back
					</Button>
					<Button size="lg" className="flex-1">
						Continue to Payment
					</Button>
				</div>
			</div>
		</section>
	);
}
