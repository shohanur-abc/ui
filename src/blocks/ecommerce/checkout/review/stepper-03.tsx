'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const StepperIndicator = ({
	steps,
	current,
}: {
	steps: { label: string; icon: React.ComponentType<{ className?: string }> }[];
	current: number;
}) => (
	<div className="relative">
		<div className="absolute left-0 right-0 top-5 h-1 bg-muted">
			<div
				className="h-full bg-primary transition-all duration-300"
				style={{ width: `${(current / (steps.length - 1)) * 100}%` }}
			/>
		</div>
		<div className="relative flex justify-between">
			{steps.map((step, i) => {
				const Icon = step.icon;
				const completed = i < current;
				const active = i === current;
				return (
					<div key={step.label} className="flex flex-col items-center">
						<div
							className={`flex size-10 items-center justify-center rounded-full border-2 bg-background transition-all ${
								completed
									? 'border-primary bg-primary text-primary-foreground'
									: active
										? 'border-primary text-primary'
										: 'border-muted text-muted-foreground'
							}`}
						>
							{completed ? <Check className="size-5" /> : <Icon className="size-5" />}
						</div>
						<span className={`mt-2 text-xs ${active ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
							{step.label}
						</span>
					</div>
				);
			})}
		</div>
	</div>
);

const ItemCard = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
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

const InfoBlock = ({
	icon: Icon,
	title,
	value,
	subValue,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	subValue?: string;
}) => (
	<div className="flex items-start gap-3 rounded-lg border bg-card p-3">
		<Icon className="size-4 text-primary" />
		<div>
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="text-sm font-medium">{value}</p>
			{subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
		</div>
		<Check className="ml-auto size-4 text-green-500" />
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
	const steps = [
		{ label: 'Cart', icon: Package },
		{ label: 'Address', icon: MapPin },
		{ label: 'Payment', icon: CreditCard },
		{ label: 'Review', icon: Check },
	];
	const currentStep = 3;

	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Running Shoes',
			variant: 'Ultraboost / Size 10',
			price: 189.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Sports Watch',
			variant: 'GPS / Black',
			price: 299.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10">
					<Progress value={100} className="mb-8" />
					<StepperIndicator steps={steps} current={currentStep} />
				</div>

				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Final step - confirm your purchase
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-4">
						{items.map((item) => (
							<ItemCard key={item.id} item={item} />
						))}

						<div className="grid gap-3 @sm:grid-cols-2">
							<InfoBlock
								icon={MapPin}
								title="Shipping"
								value="Chris P., Denver, CO"
							/>
							<InfoBlock
								icon={MapPin}
								title="Billing"
								value="Same as shipping"
							/>
							<InfoBlock
								icon={Truck}
								title="Delivery"
								value="Express"
								subValue="Dec 18-19, 2025"
							/>
							<InfoBlock
								icon={CreditCard}
								title="Payment"
								value="Visa •••• 8888"
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (2 items)" value="$489.98" />
							<SummaryLine label="Shipping" value="$14.99" />
							<SummaryLine label="Tax" value="$41.65" />
							<SummaryLine label="Sports Bundle" value="-$49.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$497.62" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Complete Order
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
