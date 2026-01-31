'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
	Truck,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const StepButton = ({
	step,
	label,
	current,
	completed,
	onClick,
}: {
	step: number;
	label: string;
	current: boolean;
	completed: boolean;
	onClick: () => void;
}) => (
	<button
		type="button"
		onClick={onClick}
		className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
			current
				? 'bg-primary text-primary-foreground'
				: completed
					? 'bg-primary/10 text-primary'
					: 'bg-muted text-muted-foreground'
		}`}
	>
		{completed ? (
			<Check className="size-4" />
		) : (
			<span className="flex size-5 items-center justify-center rounded-full bg-current/20 text-xs">
				{step}
			</span>
		)}
		{label}
	</button>
);

const ItemCard = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="font-bold">${item.price.toFixed(2)}</p>
			<Badge variant="secondary">×{item.qty}</Badge>
		</div>
	</div>
);

const AddressInfo = ({
	type,
	name,
	address,
}: {
	type: string;
	name: string;
	address: string;
}) => (
	<div className="rounded-xl border bg-card p-4">
		<p className="mb-1 text-xs font-medium uppercase text-muted-foreground">{type}</p>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
	</div>
);

const DeliveryInfo = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<Truck className="size-6 text-primary" />
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentInfo = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<CreditCard className="size-6 text-primary" />
		<div>
			<p className="font-medium">{brand} •••• {last4}</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const SummaryRow = ({
	label,
	value,
	bold,
	green,
}: {
	label: string;
	value: string;
	bold?: boolean;
	green?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{ label: 'Items', icon: Package },
		{ label: 'Shipping', icon: MapPin },
		{ label: 'Payment', icon: CreditCard },
		{ label: 'Confirm', icon: Check },
	];

	const items: CartItem[] = [
		{
			id: '1',
			name: 'Yoga Mat',
			variant: 'Purple / 6mm',
			price: 49.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Yoga Block',
			variant: 'Cork / Set of 2',
			price: 24.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Complete Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Review each section before confirming
					</p>
				</div>

				<div className="mb-8 flex flex-wrap justify-center gap-2">
					{steps.map((step, i) => (
						<StepButton
							key={step.label}
							step={i + 1}
							label={step.label}
							current={currentStep === i}
							completed={currentStep > i}
							onClick={() => setCurrentStep(i)}
						/>
					))}
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-4">
						{currentStep === 0 && (
							<>
								{items.map((item) => (
									<ItemCard key={item.id} item={item} />
								))}
							</>
						)}

						{currentStep === 1 && (
							<div className="space-y-4">
								<AddressInfo
									type="Shipping"
									name="Amanda T."
									address="123 Wellness Way, Austin, TX 78701"
								/>
								<AddressInfo
									type="Billing"
									name="Amanda T."
									address="123 Wellness Way, Austin, TX 78701"
								/>
								<DeliveryInfo
									method="Standard Shipping"
									date="Dec 24-26, 2025"
									price="Free"
								/>
							</div>
						)}

						{currentStep === 2 && (
							<PaymentInfo brand="Visa" last4="4567" exp="11/27" />
						)}

						{currentStep === 3 && (
							<Card className="bg-green-500/10 border-green-500/30">
								<CardContent className="flex items-center gap-4 py-6">
									<div className="flex size-12 items-center justify-center rounded-full bg-green-500">
										<Check className="size-6 text-white" />
									</div>
									<div>
										<p className="font-semibold text-green-600 dark:text-green-400">
											Ready to confirm!
										</p>
										<p className="text-sm text-muted-foreground">
											All details have been reviewed
										</p>
									</div>
								</CardContent>
							</Card>
						)}

						<div className="flex justify-between pt-4">
							<Button
								variant="outline"
								disabled={currentStep === 0}
								onClick={() => setCurrentStep((s) => s - 1)}
							>
								Previous
							</Button>
							{currentStep < steps.length - 1 ? (
								<Button onClick={() => setCurrentStep((s) => s + 1)}>
									Next
									<ArrowRight className="ml-2 size-4" />
								</Button>
							) : null}
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryRow label="Subtotal (2 items)" value="$74.98" />
							<SummaryRow label="Shipping" value="$0.00" />
							<SummaryRow label="Tax" value="$6.37" />
							<SummaryRow label="Discount" value="-$7.50" green />
							<Separator className="my-4" />
							<SummaryRow label="Total" value="$73.85" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button
								size="lg"
								className="w-full gap-2"
								disabled={currentStep !== steps.length - 1}
							>
								<Lock className="size-4" />
								Place Order
								<ArrowRight className="size-4" />
							</Button>
							<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
								<Shield className="size-3" />
								<span>Secure checkout</span>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
