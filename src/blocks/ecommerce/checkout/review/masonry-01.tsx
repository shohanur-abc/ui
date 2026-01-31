import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Edit2,
	Lock,
	MapPin,
	Package,
	Recycle,
	Shield,
	Sparkles,
	Truck,
	Zap,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	name: string;
	options: string;
	price: number;
	quantity: number;
	image: string;
	sustainable?: boolean;
}

const MasonryCard = ({
	title,
	icon: Icon,
	size,
	onEdit,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	size?: 'sm' | 'md' | 'lg';
	onEdit?: () => void;
	children: React.ReactNode;
}) => {
	const heights = {
		sm: 'min-h-[200px]',
		md: 'min-h-[280px]',
		lg: 'min-h-[360px]',
	};

	return (
		<div
			className={`group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:shadow-lg hover:shadow-primary/5 ${heights[size || 'md']}`}
		>
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Icon className="size-5 text-primary" />
					<h3 className="font-semibold">{title}</h3>
				</div>
				{onEdit && (
					<Button
						variant="ghost"
						size="icon"
						className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
						onClick={onEdit}
					>
						<Edit2 className="size-4" />
					</Button>
				)}
			</div>
			{children}
		</div>
	);
};

const ProductTile = ({ item }: { item: CartItem }) => (
	<div className="relative overflow-hidden rounded-xl bg-muted/50 p-3">
		<div className="flex gap-3">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
				{item.sustainable && (
					<div className="absolute bottom-0 right-0 rounded-tl-lg bg-green-500 p-1">
						<Recycle className="size-3 text-white" />
					</div>
				)}
			</div>
			<div className="flex flex-1 flex-col justify-between min-w-0">
				<div>
					<p className="truncate text-sm font-medium">{item.name}</p>
					<p className="text-xs text-muted-foreground">{item.options}</p>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-xs text-muted-foreground">×{item.quantity}</span>
					<span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
				</div>
			</div>
		</div>
	</div>
);

const AddressInfo = ({
	label,
	name,
	lines,
}: {
	label: string;
	name: string;
	lines: string[];
}) => (
	<div>
		<p className="mb-1 text-xs font-medium uppercase text-muted-foreground">{label}</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const DeliveryBadge = ({
	type,
	date,
	eco,
}: {
	type: string;
	date: string;
	eco?: boolean;
}) => (
	<div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">
		<div className={`flex size-10 items-center justify-center rounded-full ${eco ? 'bg-green-500/10' : 'bg-primary/10'}`}>
			{eco ? (
				<Recycle className="size-5 text-green-600 dark:text-green-400" />
			) : (
				<Zap className="size-5 text-primary" />
			)}
		</div>
		<div>
			<div className="flex items-center gap-2">
				<p className="font-medium">{type}</p>
				{eco && (
					<Badge variant="secondary" className="text-xs">
						Eco
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
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
	<div className="flex items-center gap-4">
		<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
			<CreditCard className="size-6 text-white" />
		</div>
		<div>
			<p className="font-medium">{brand} •••• {last4}</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const ChecklistItem = ({
	label,
	checked,
}: {
	label: string;
	checked?: boolean;
}) => (
	<div className="flex items-center gap-2">
		<div
			className={`flex size-5 items-center justify-center rounded-full ${
				checked ? 'bg-green-500' : 'bg-muted'
			}`}
		>
			{checked && <Check className="size-3 text-white" />}
		</div>
		<span className={`text-sm ${checked ? '' : 'text-muted-foreground'}`}>{label}</span>
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
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Reusable Water Bottle',
			options: 'Stainless Steel / 750ml',
			price: 34.99,
			quantity: 2,
			image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop',
			sustainable: true,
		},
		{
			id: '2',
			name: 'Bamboo Lunch Box',
			options: 'Large / Natural',
			price: 29.99,
			quantity: 1,
			image: 'https://images.unsplash.com/photo-1544181093-c91c3b22c3c7?w=200&h=200&fit=crop',
			sustainable: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Order Review
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Almost There!
					</h1>
					<p className="mt-2 text-muted-foreground">
						Review your order before completing
					</p>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
					<MasonryCard title="Items" icon={Package} size="lg" onEdit={() => {}}>
						<div className="space-y-3">
							{items.map((item) => (
								<ProductTile key={item.id} item={item} />
							))}
						</div>
					</MasonryCard>

					<MasonryCard title="Ship To" icon={MapPin} size="sm" onEdit={() => {}}>
						<AddressInfo
							label="Shipping"
							name="Ava Mitchell"
							lines={['456 Eco Street', 'Denver, CO 80202']}
						/>
					</MasonryCard>

					<MasonryCard title="Bill To" icon={MapPin} size="sm" onEdit={() => {}}>
						<AddressInfo
							label="Billing"
							name="Ava Mitchell"
							lines={['456 Eco Street', 'Denver, CO 80202']}
						/>
					</MasonryCard>

					<MasonryCard title="Delivery" icon={Truck} size="md" onEdit={() => {}}>
						<DeliveryBadge
							type="Carbon Neutral Shipping"
							date="Arrives Dec 23-26, 2025"
							eco
						/>
					</MasonryCard>

					<MasonryCard title="Payment" icon={CreditCard} size="md" onEdit={() => {}}>
						<PaymentInfo brand="Visa" last4="7777" exp="10/27" />
					</MasonryCard>

					<MasonryCard title="Checklist" icon={Check} size="md">
						<div className="space-y-3">
							<ChecklistItem label="Items verified" checked />
							<ChecklistItem label="Shipping confirmed" checked />
							<ChecklistItem label="Payment ready" checked />
							<ChecklistItem label="Eco packaging" checked />
						</div>
					</MasonryCard>

					<Card className="@sm:col-span-2 @lg:col-span-1 bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (3 items)" value="$99.97" />
							<SummaryLine label="Shipping" value="$4.99" />
							<SummaryLine label="Tax" value="$8.50" />
							<SummaryLine label="Eco Discount" value="-$5.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$108.46" bold />
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
