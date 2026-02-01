'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Check, MapPin, Clock, Truck, Zap } from 'lucide-react';

interface AddressOptionProps {
	id: string;
	type: string;
	name: string;
	address: string;
	deliveryTime: string;
	deliveryIcon: React.ElementType;
	isRecommended?: boolean;
}

const StepIndicator = ({
	current,
	total,
}: {
	current: number;
	total: number;
}) => (
	<div className="flex items-center justify-center gap-2 mb-8">
		{Array.from({ length: total }).map((_, i) => (
			<div
				key={i}
				className={`h-1.5 rounded-full transition-all ${
					i < current
						? 'w-8 bg-primary'
						: i === current
							? 'w-8 bg-primary/50'
							: 'w-4 bg-muted'
				}`}
			/>
		))}
	</div>
);

const AddressOption = ({
	id,
	type,
	name,
	address,
	deliveryTime,
	deliveryIcon: DeliveryIcon,
	isRecommended,
}: AddressOptionProps) => (
	<label className="block cursor-pointer">
		<Card className="relative overflow-hidden transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
			{isRecommended && (
				<div className="absolute top-0 right-0">
					<Badge className="rounded-none rounded-bl-lg">
						<Zap className="size-3 mr-1" />
						Fastest
					</Badge>
				</div>
			)}
			<CardHeader className="pb-3">
				<div className="flex items-start gap-3">
					<RadioGroupItem value={id} className="mt-0.5" />
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-semibold">{type}</span>
						</div>
						<p className="text-sm text-muted-foreground">{name}</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="flex items-start gap-3 ml-7">
					<MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
					<p className="text-sm text-muted-foreground">{address}</p>
				</div>
			</CardContent>
			<CardFooter className="bg-muted/30 py-3">
				<div className="flex items-center gap-2 ml-7 text-sm">
					<DeliveryIcon className="size-4 text-primary" />
					<span>{deliveryTime}</span>
				</div>
			</CardFooter>
			<div className="absolute bottom-3 right-3 hidden group-has-[:checked]:flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
				<Check className="size-4" />
			</div>
		</Card>
	</label>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			type: 'Home',
			name: 'John Doe',
			address:
				'123 Main Street, Apt 4B, San Francisco, CA 94102, United States',
			deliveryTime: 'Get it by Tomorrow, 9 AM - 12 PM',
			deliveryIcon: Zap,
			isRecommended: true,
		},
		{
			id: '2',
			type: 'Office',
			name: 'John Doe - TechCorp Inc.',
			address:
				'456 Market Street, Suite 100, San Francisco, CA 94103, United States',
			deliveryTime: 'Get it in 2-3 Business Days',
			deliveryIcon: Truck,
		},
		{
			id: '3',
			type: 'Other',
			name: 'Jane Doe',
			address: '789 Oak Avenue, Los Angeles, CA 90001, United States',
			deliveryTime: 'Get it in 3-5 Business Days',
			deliveryIcon: Clock,
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<StepIndicator current={1} total={4} />

				<div className="text-center mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">
						Choose Delivery Address
					</h1>
					<p className="text-muted-foreground mt-1">
						Select where to deliver your package
					</p>
				</div>

				<RadioGroup defaultValue="1" className="space-y-4">
					{addresses.map((addr) => (
						<AddressOption key={addr.id} {...addr} />
					))}
				</RadioGroup>

				<Button variant="outline" className="w-full mt-4">
					Add New Address
				</Button>

				<div className="flex gap-3 mt-8">
					<Button variant="ghost" size="lg" className="flex-1">
						Back
					</Button>
					<Button size="lg" className="flex-1">
						Continue
					</Button>
				</div>
			</div>
		</section>
	);
}
