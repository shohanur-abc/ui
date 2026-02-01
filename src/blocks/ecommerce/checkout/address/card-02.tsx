'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, Trash2, ArrowRight } from 'lucide-react';

interface AddressItemProps {
	id: string;
	name: string;
	street: string;
	city: string;
	country: string;
	phone: string;
	isPrimary?: boolean;
}

const Header = ({
	title,
	action,
}: {
	title: string;
	action: { label: string; onClick?: () => void };
}) => (
	<div className="flex items-center justify-between mb-6">
		<h2 className="text-xl font-semibold">{title}</h2>
		<Button variant="outline" size="sm">
			{action.label}
		</Button>
	</div>
);

const AddressItem = ({
	id,
	name,
	street,
	city,
	country,
	phone,
	isPrimary,
}: AddressItemProps) => (
	<label className="flex items-start gap-4 p-4 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors has-[:checked]:bg-primary/5">
		<RadioGroupItem value={id} className="mt-1" />
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-1">
				<span className="font-medium">{name}</span>
				{isPrimary && (
					<Badge variant="secondary" className="gap-1 text-xs">
						<Star className="size-3 fill-current" />
						Primary
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{street}</p>
			<p className="text-sm text-muted-foreground">
				{city}, {country}
			</p>
			<p className="text-sm text-muted-foreground mt-1">{phone}</p>
		</div>
		<Button
			variant="ghost"
			size="icon-sm"
			className="text-muted-foreground hover:text-destructive"
		>
			<Trash2 className="size-4" />
		</Button>
	</label>
);

const OrderSummaryCard = ({
	items,
	total,
}: {
	items: { label: string; value: string }[];
	total: { label: string; value: string };
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Order Summary</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item, i) => (
				<div key={i} className="flex justify-between text-sm">
					<span className="text-muted-foreground">{item.label}</span>
					<span>{item.value}</span>
				</div>
			))}
			<Separator />
			<div className="flex justify-between font-semibold">
				<span>{total.label}</span>
				<span>{total.value}</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			name: 'John Doe',
			street: '123 Main Street, Apt 4B',
			city: 'San Francisco, CA 94102',
			country: 'United States',
			phone: '+1 (555) 123-4567',
			isPrimary: true,
		},
		{
			id: '2',
			name: 'John Doe',
			street: '456 Market Street, Suite 100',
			city: 'San Francisco, CA 94103',
			country: 'United States',
			phone: '+1 (555) 987-6543',
		},
	];

	const summaryItems = [
		{ label: 'Subtotal (2 items)', value: '$299.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$23.92' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-3 gap-8">
					<div className="@lg:col-span-2">
						<Header title="Shipping Address" action={{ label: 'Add New' }} />
						<Card>
							<CardContent className="pt-6">
								<RadioGroup defaultValue="1" className="divide-y divide-border">
									{addresses.map((addr) => (
										<AddressItem key={addr.id} {...addr} />
									))}
								</RadioGroup>
							</CardContent>
						</Card>

						<div className="flex items-center gap-3 mt-6 p-4 rounded-xl bg-muted/50 border border-border">
							<MapPin className="size-5 text-primary shrink-0" />
							<p className="text-sm text-muted-foreground">
								Delivery times may vary based on your location. Express shipping
								available at checkout.
							</p>
						</div>
					</div>

					<div className="@lg:col-span-1">
						<OrderSummaryCard
							items={summaryItems}
							total={{ label: 'Total', value: '$322.92' }}
						/>
						<Button className="w-full mt-4 gap-2" size="lg">
							Continue
							<ArrowRight className="size-4" />
						</Button>
						<Button variant="ghost" className="w-full mt-2">
							Back to Cart
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
