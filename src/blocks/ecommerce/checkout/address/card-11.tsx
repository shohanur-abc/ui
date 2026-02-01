'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	MapPin,
	Clock,
	Truck,
	Package,
	CheckCircle2,
	AlertCircle,
} from 'lucide-react';

interface AddressProps {
	id: string;
	label: string;
	address: string;
	deliveryInfo: {
		type: string;
		date: string;
		price: string;
	};
	available: boolean;
}

interface StatusIndicatorProps {
	available: boolean;
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

const StatusIndicator = ({ available }: StatusIndicatorProps) => (
	<div
		className={`flex items-center gap-1.5 text-xs ${
			available ? 'text-green-500' : 'text-amber-500'
		}`}
	>
		{available ? (
			<>
				<CheckCircle2 className="size-3.5" />
				<span>Available for delivery</span>
			</>
		) : (
			<>
				<AlertCircle className="size-3.5" />
				<span>Limited delivery options</span>
			</>
		)}
	</div>
);

const AddressOption = ({
	id,
	label,
	address,
	deliveryInfo,
	available,
}: AddressProps) => (
	<label className="block cursor-pointer">
		<Card className="transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
			<CardContent className="pt-6">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={id} className="mt-1" />
					<div className="flex-1 space-y-4">
						<div className="flex items-start justify-between gap-4">
							<div>
								<div className="flex items-center gap-2 mb-1">
									<span className="font-semibold">{label}</span>
									{id === '1' && (
										<Badge variant="outline" className="text-xs">
											Primary
										</Badge>
									)}
								</div>
								<div className="flex items-start gap-2 text-sm text-muted-foreground">
									<MapPin className="size-3.5 shrink-0 mt-0.5" />
									<span>{address}</span>
								</div>
							</div>
							<StatusIndicator available={available} />
						</div>

						<Separator />

						<div className="flex items-center gap-6 text-sm">
							<div className="flex items-center gap-2">
								<Truck className="size-4 text-muted-foreground" />
								<span>{deliveryInfo.type}</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="size-4 text-muted-foreground" />
								<span>{deliveryInfo.date}</span>
							</div>
							<div className="flex items-center gap-2">
								<Package className="size-4 text-muted-foreground" />
								<span className="font-medium text-primary">
									{deliveryInfo.price}
								</span>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</label>
);

const DeliverySummary = () => (
	<Card className="bg-muted/30">
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium">Estimated Delivery</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Standard Shipping</span>
				<span>3-5 business days</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Express Shipping</span>
				<span>1-2 business days</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Same Day</span>
				<span>Today by 8PM</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			label: 'Home Address',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			deliveryInfo: {
				type: 'Standard',
				date: 'Dec 15-17',
				price: 'FREE',
			},
			available: true,
		},
		{
			id: '2',
			label: 'Work Address',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
			deliveryInfo: {
				type: 'Express',
				date: 'Dec 14',
				price: '$9.99',
			},
			available: true,
		},
		{
			id: '3',
			label: 'Beach House',
			address: '789 Ocean Drive, Malibu, CA 90265',
			deliveryInfo: {
				type: 'Standard Only',
				date: 'Dec 18-20',
				price: '$4.99',
			},
			available: false,
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageHeader
					title="Shipping Address"
					subtitle="Select your delivery location"
				/>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-4">
						<RadioGroup defaultValue="1" className="space-y-4">
							{addresses.map((addr) => (
								<AddressOption key={addr.id} {...addr} />
							))}
						</RadioGroup>

						<Button variant="outline" className="w-full">
							+ Add New Address
						</Button>
					</div>

					<div>
						<DeliverySummary />
					</div>
				</div>

				<div className="flex gap-3 mt-8 pt-6 border-t border-border">
					<Button variant="outline" size="lg" className="flex-1">
						Back to Cart
					</Button>
					<Button size="lg" className="flex-1">
						Continue
					</Button>
				</div>
			</div>
		</section>
	);
}
