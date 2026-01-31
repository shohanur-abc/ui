'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	ArrowLeft,
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

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const WizardProgress = ({ step, total }: { step: number; total: number }) => (
	<div className="space-y-2">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Step {step} of {total}</span>
			<span className="font-medium">{Math.round((step / total) * 100)}%</span>
		</div>
		<Progress value={(step / total) * 100} />
	</div>
);

const StepIndicator = ({
	steps,
	current,
}: {
	steps: { label: string; icon: React.ComponentType<{ className?: string }> }[];
	current: number;
}) => (
	<div className="flex justify-between">
		{steps.map((s, i) => {
			const Icon = s.icon;
			const completed = i < current;
			const active = i === current;
			return (
				<div key={s.label} className="flex flex-col items-center gap-1">
					<div
						className={`flex size-10 items-center justify-center rounded-full ${
							completed
								? 'bg-green-500 text-white'
								: active
									? 'bg-primary text-primary-foreground'
									: 'bg-muted text-muted-foreground'
						}`}
					>
						{completed ? <Check className="size-5" /> : <Icon className="size-5" />}
					</div>
					<span className={`text-xs ${active ? 'font-medium' : 'text-muted-foreground'}`}>
						{s.label}
					</span>
				</div>
			);
		})}
	</div>
);

const ItemRow = ({ item }: { item: OrderItem }) => (
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

const AddressCard = ({
	type,
	name,
	address,
}: {
	type: string;
	name: string;
	address: string;
}) => (
	<div className="rounded-xl border bg-card p-4">
		<p className="mb-1 text-xs font-medium uppercase text-primary">{type}</p>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
	</div>
);

const DeliveryCard = ({
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

const PaymentCard = ({
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

const SummaryLine = ({
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
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const [step, setStep] = useState(3);
	const totalSteps = 4;

	const steps = [
		{ label: 'Cart', icon: Package },
		{ label: 'Address', icon: MapPin },
		{ label: 'Payment', icon: CreditCard },
		{ label: 'Review', icon: Check },
	];

	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Smart Watch',
			variant: 'Series Pro / Titanium',
			price: 799.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Watch Bands',
			variant: 'Leather / 3-Pack',
			price: 99.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Checkout
					</h1>
					<p className="mt-1 text-muted-foreground">
						Complete your purchase
					</p>
				</div>

				<div className="mb-8 space-y-6">
					<WizardProgress step={step} total={totalSteps} />
					<StepIndicator steps={steps} current={step - 1} />
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-4">
						{items.map((item) => (
							<ItemRow key={item.id} item={item} />
						))}

						<div className="grid gap-4 @sm:grid-cols-2">
							<AddressCard type="Shipping" name="Alex M." address="123 Tech Drive, Cupertino, CA 95014" />
							<AddressCard type="Billing" name="Alex M." address="123 Tech Drive, Cupertino, CA 95014" />
						</div>

						<DeliveryCard method="Priority" date="Dec 17-18, 2025" price="$19.99" />
						<PaymentCard brand="Visa" last4="4242" exp="10/27" />

						<div className="flex justify-between pt-4">
							<Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))}>
								<ArrowLeft className="mr-2 size-4" />
								Back
							</Button>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (2 items)" value="$899.98" />
							<SummaryLine label="Shipping" value="$19.99" />
							<SummaryLine label="Tax" value="$76.50" />
							<SummaryLine label="Tech Discount" value="-$90.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$906.47" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
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
