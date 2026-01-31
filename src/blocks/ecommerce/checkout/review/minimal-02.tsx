import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

interface Product {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const MinimalItem = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-4">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
			<Image src={product.image} alt={product.name} fill className="object-cover" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
		</div>
		<span className="font-semibold">${(product.price * product.qty).toFixed(2)}</span>
	</div>
);

const DetailLine = ({
	icon: Icon,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="size-4 text-primary" />
		<span className="text-muted-foreground">{value}</span>
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

const VerifyBadge = ({ label }: { label: string }) => (
	<Badge variant="secondary" className="gap-1 text-green-600 dark:text-green-400">
		<Check className="size-3" />
		{label}
	</Badge>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Notebook',
			variant: 'Leather / A5',
			price: 29.99,
			qty: 2,
			image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Fountain Pen',
			variant: 'Black / Fine',
			price: 89.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Summary
					</h1>
				</div>

				<div className="space-y-6">
					<div className="space-y-4">
						{products.map((product) => (
							<MinimalItem key={product.id} product={product} />
						))}
					</div>

					<Separator />

					<div className="flex flex-wrap gap-2">
						<VerifyBadge label="Items" />
						<VerifyBadge label="Shipping" />
						<VerifyBadge label="Payment" />
					</div>

					<div className="space-y-2">
						<DetailLine icon={MapPin} value="Alex P., New York, NY 10001" />
						<DetailLine icon={Truck} value="Express · Dec 18-19, 2025" />
						<DetailLine icon={CreditCard} value="Mastercard •••• 5678" />
					</div>

					<Separator />

					<div className="space-y-3">
						<SummaryLine label="Subtotal (3 items)" value="$149.97" />
						<SummaryLine label="Shipping" value="$8.99" />
						<SummaryLine label="Tax" value="$12.75" />
						<SummaryLine label="Discount" value="-$15.00" green />
						<Separator className="my-4" />
						<SummaryLine label="Total" value="$156.71" bold />
					</div>

					<Button size="lg" className="w-full gap-2">
						<Lock className="size-4" />
						Pay $156.71
						<ArrowRight className="size-4" />
					</Button>

					<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
						<Shield className="size-3" />
						<span>Secure checkout</span>
					</div>
				</div>
			</div>
		</section>
	);
}
