'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Package, CreditCard, CheckCircle, Truck } from 'lucide-react';

interface StepProps {
	step: number;
	label: string;
	icon: React.ElementType;
	active: boolean;
	completed: boolean;
}

interface AddressProps {
	id: string;
	label: string;
	address: string;
	city: string;
	estimatedDelivery: string;
	shippingCost: string;
}

const Step = ({ step, label, icon: Icon, active, completed }: StepProps) => (
	<div className="flex items-center gap-3">
		<div
			className={`size-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
				completed
					? 'bg-green-500 text-white'
					: active
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{completed ? (
				<CheckCircle className="size-5" />
			) : (
				<Icon className="size-5" />
			)}
		</div>
		<span
			className={`text-sm font-medium ${
				active ? 'text-foreground' : 'text-muted-foreground'
			}`}
		>
			{label}
		</span>
	</div>
);

const ProgressBar = () => (
	<Card className="mb-8">
		<CardContent className="py-6">
			<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
				<Step
					step={1}
					label="Address"
					icon={MapPin}
					active={true}
					completed={false}
				/>
				<Step
					step={2}
					label="Shipping"
					icon={Truck}
					active={false}
					completed={false}
				/>
				<Step
					step={3}
					label="Payment"
					icon={CreditCard}
					active={false}
					completed={false}
				/>
				<Step
					step={4}
					label="Review"
					icon={Package}
					active={false}
					completed={false}
				/>
			</div>
			<Progress value={25} className="h-2" />
		</CardContent>
	</Card>
);

const AddressOption = ({
	id,
	label,
	address,
	city,
	estimatedDelivery,
	shippingCost,
}: AddressProps) => (
	<label className="block cursor-pointer">
		<Card className="transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary">
			<CardContent className="pt-6">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={id} className="mt-0.5" />
					<div className="flex-1">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<span className="font-semibold">{label}</span>
								{id === '1' && <Badge>Default</Badge>}
							</div>
							<span className="text-sm font-medium text-primary">
								{shippingCost}
							</span>
						</div>
						<div className="flex items-start gap-2 text-sm text-muted-foreground">
							<MapPin className="size-3.5 shrink-0 mt-0.5" />
							<div>
								<p>{address}</p>
								<p>{city}</p>
							</div>
						</div>
						<div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
							<Truck className="size-3.5" />
							<span>Est. delivery: {estimatedDelivery}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</label>
);

const OrderSummary = () => (
	<Card className="bg-muted/30">
		<CardHeader className="pb-2">
			<CardTitle className="text-base">Order Summary</CardTitle>
		</CardHeader>
		<CardContent className="text-sm space-y-2">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>$149.00</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Shipping</span>
				<span>Calculated next</span>
			</div>
			<div className="flex justify-between pt-2 border-t border-border font-medium">
				<span>Total</span>
				<span>$149.00+</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			label: 'Home',
			address: '123 Main Street, Apt 4B',
			city: 'San Francisco, CA 94102',
			estimatedDelivery: 'Dec 15-17',
			shippingCost: 'FREE',
		},
		{
			id: '2',
			label: 'Office',
			address: '456 Market Street, Suite 100',
			city: 'San Francisco, CA 94103',
			estimatedDelivery: 'Dec 14-16',
			shippingCost: '$5.99',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<ProgressBar />

				<div className="grid @lg:grid-cols-3 gap-8">
					<div className="@lg:col-span-2">
						<h1 className="text-2xl font-bold mb-6">Shipping Address</h1>

						<RadioGroup defaultValue="1" className="space-y-4">
							{addresses.map((addr) => (
								<AddressOption key={addr.id} {...addr} />
							))}
						</RadioGroup>

						<Button variant="outline" className="w-full mt-4">
							+ Add New Address
						</Button>

						<div className="flex gap-3 mt-8">
							<Button variant="outline" size="lg" className="flex-1">
								Back
							</Button>
							<Button size="lg" className="flex-1">
								Continue to Shipping
							</Button>
						</div>
					</div>

					<div>
						<OrderSummary />
					</div>
				</div>
			</div>
		</section>
	);
}
