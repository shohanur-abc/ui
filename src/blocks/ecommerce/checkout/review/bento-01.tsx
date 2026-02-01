import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CheckCircle,
	Clock,
	CreditCard,
	Edit2,
	Gift,
	MapPin,
	Package,
	Percent,
	Shield,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Item {
	id: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	image: string;
}

const BentoCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={`group relative rounded-2xl border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${className}`}
	>
		{children}
	</div>
);

const SectionTitle = ({
	icon: Icon,
	title,
	onEdit,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	onEdit?: () => void;
}) => (
	<div className="mb-4 flex items-center justify-between">
		<div className="flex items-center gap-2">
			<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
				<Icon className="size-4 text-primary" />
			</div>
			<h3 className="font-semibold">{title}</h3>
		</div>
		{onEdit && (
			<Button
				variant="ghost"
				size="sm"
				className="opacity-0 transition-opacity group-hover:opacity-100"
				onClick={onEdit}
			>
				<Edit2 className="size-3.5" />
			</Button>
		)}
	</div>
);

const ItemRow = ({ item }: { item: Item }) => (
	<div className="flex gap-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex flex-1 flex-col justify-between min-w-0">
			<div>
				<p className="truncate text-sm font-medium">{item.name}</p>
				<p className="text-xs text-muted-foreground">{item.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-xs text-muted-foreground">×{item.quantity}</span>
				<span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const StatusBadge = ({ status }: { status: 'verified' | 'pending' }) => (
	<Badge
		variant={status === 'verified' ? 'default' : 'secondary'}
		className="absolute right-3 top-3 gap-1"
	>
		{status === 'verified' ? (
			<>
				<CheckCircle className="size-3" />
				Verified
			</>
		) : (
			<>
				<Clock className="size-3" />
				Pending
			</>
		)}
	</Badge>
);

const AddressBlock = ({
	name,
	address,
	city,
}: {
	name: string;
	address: string;
	city: string;
}) => (
	<div>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
		<p className="text-sm text-muted-foreground">{city}</p>
	</div>
);

const DeliveryEstimate = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
		<div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
			<Truck className="size-6 text-primary" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">Arrives {date}</p>
		</div>
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentDisplay = ({
	type,
	last4,
	expiry,
}: {
	type: string;
	last4: string;
	expiry: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-900">
			<CreditCard className="size-7 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{type} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {expiry}</p>
		</div>
	</div>
);

const DiscountRow = ({
	code,
	discount,
}: {
	code: string;
	discount: string;
}) => (
	<div className="flex items-center justify-between rounded-lg bg-green-500/10 px-3 py-2">
		<div className="flex items-center gap-2">
			<Percent className="size-4 text-green-600 dark:text-green-400" />
			<span className="font-mono text-sm">{code}</span>
		</div>
		<span className="font-medium text-green-600 dark:text-green-400">
			{discount}
		</span>
	</div>
);

const SummaryLine = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span>{value}</span>
	</div>
);

export default function Main() {
	const items: Item[] = [
		{
			id: '1',
			name: 'Portable Bluetooth Speaker',
			variant: 'Ocean Blue',
			price: 89.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Wireless Charging Pad',
			variant: '15W Fast Charge',
			price: 34.99,
			quantity: 2,
			image:
				'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10 text-center">
					<Badge
						variant="outline"
						className="mb-4 gap-1.5 border-primary/30 text-primary"
					>
						<Shield className="size-3.5" />
						Secure Checkout
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Review Your Order
					</h1>
					<p className="mt-2 text-muted-foreground">
						Everything looks good? Complete your purchase below
					</p>
				</div>

				<div className="grid gap-4 @md:grid-cols-2 @xl:grid-cols-3">
					<BentoCard className="@xl:col-span-2">
						<StatusBadge status="verified" />
						<SectionTitle
							icon={Package}
							title="Order Items"
							onEdit={() => {}}
						/>
						<div className="grid gap-4 @md:grid-cols-2">
							{items.map((item) => (
								<ItemRow key={item.id} item={item} />
							))}
						</div>
					</BentoCard>

					<BentoCard>
						<StatusBadge status="verified" />
						<SectionTitle icon={MapPin} title="Shipping" onEdit={() => {}} />
						<AddressBlock
							name="Jessica Martinez"
							address="1234 Sunset Boulevard"
							city="Miami, FL 33101"
						/>
					</BentoCard>

					<BentoCard className="@md:col-span-2">
						<StatusBadge status="verified" />
						<SectionTitle icon={Truck} title="Delivery" onEdit={() => {}} />
						<DeliveryEstimate
							method="Standard Shipping"
							date="Dec 26-28, 2025"
							price="Free"
						/>
					</BentoCard>

					<BentoCard>
						<StatusBadge status="verified" />
						<SectionTitle icon={CreditCard} title="Payment" onEdit={() => {}} />
						<PaymentDisplay type="Mastercard" last4="7890" expiry="09/26" />
					</BentoCard>

					<BentoCard className="@xl:col-span-2">
						<SectionTitle icon={Gift} title="Discounts Applied" />
						<div className="grid gap-2 @md:grid-cols-2">
							<DiscountRow code="WELCOME15" discount="-$23.99" />
							<DiscountRow code="FREESHIP" discount="-$9.99" />
						</div>
					</BentoCard>

					<Card className="@md:col-span-2 @xl:col-span-1 @xl:row-span-2">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal" value="$159.97" />
							<SummaryLine label="Shipping" value="$0.00" />
							<SummaryLine label="Tax" value="$13.60" />
							<div className="flex justify-between text-sm text-green-600 dark:text-green-400">
								<span>Discounts</span>
								<span>-$33.98</span>
							</div>
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$139.59" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
								Complete Order
								<ArrowRight className="size-4" />
							</Button>
							<p className="text-center text-xs text-muted-foreground">
								30-day money-back guarantee
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
