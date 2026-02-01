import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Package,
	CreditCard,
	MapPin,
	Phone,
	Mail,
	Copy,
	ExternalLink,
} from 'lucide-react';

interface OrderLineItem {
	id: string;
	name: string;
	sku: string;
	variant: string;
	quantity: number;
	unitPrice: string;
	totalPrice: string;
	image?: string;
}

interface OrderItemsListProps {
	items: OrderLineItem[];
	summary: {
		subtotal: string;
		shipping: string;
		tax: string;
		discount?: string;
		total: string;
	};
	labels: {
		subtotal: string;
		shipping: string;
		tax: string;
		discount: string;
		total: string;
		copysku: string;
	};
}

interface LineItemRowProps {
	item: OrderLineItem;
	copyLabel: string;
}

const LineItemRow = ({ item, copyLabel }: LineItemRowProps) => (
	<div className="flex items-center gap-4 py-4">
		<div className="size-16 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden">
			{item.image ? (
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
			) : (
				<Package className="size-8 text-muted-foreground" />
			)}
		</div>

		<div className="flex-1 min-w-0">
			<p className="font-semibold mb-0.5">{item.name}</p>
			<p className="text-sm text-muted-foreground mb-1">{item.variant}</p>
			<div className="flex items-center gap-2">
				<code className="text-xs font-mono text-muted-foreground">
					{item.sku}
				</code>
				<Button
					variant="ghost"
					size="icon-sm"
					className="size-5 hover:bg-muted"
				>
					<Copy className="size-3" />
				</Button>
			</div>
		</div>

		<div className="text-center">
			<p className="text-sm text-muted-foreground">Qty</p>
			<p className="font-semibold">{item.quantity}</p>
		</div>

		<div className="text-center min-w-[80px]">
			<p className="text-sm text-muted-foreground">Unit</p>
			<p className="font-medium">{item.unitPrice}</p>
		</div>

		<div className="text-right min-w-[80px]">
			<p className="text-sm text-muted-foreground">Total</p>
			<p className="font-semibold">{item.totalPrice}</p>
		</div>
	</div>
);

const SummaryRow = ({
	label,
	value,
	isTotal = false,
	isDiscount = false,
}: {
	label: string;
	value: string;
	isTotal?: boolean;
	isDiscount?: boolean;
}) => (
	<div
		className={`flex items-center justify-between ${isTotal ? 'text-lg font-bold' : 'text-sm'} ${isDiscount ? 'text-accent' : ''}`}
	>
		<span className={isTotal ? '' : 'text-muted-foreground'}>{label}</span>
		<span>{isDiscount ? `-${value}` : value}</span>
	</div>
);

export default function Main() {
	const labels = {
		subtotal: 'Subtotal',
		shipping: 'Shipping',
		tax: 'Tax',
		discount: 'Discount',
		total: 'Total',
		copysku: 'Copy SKU',
	};

	const items: OrderLineItem[] = [
		{
			id: '1',
			name: 'Wireless Bluetooth Headphones Pro',
			sku: 'SKU-WBH-PRO-001',
			variant: 'Midnight Black / Over-ear',
			quantity: 1,
			unitPrice: '$199.00',
			totalPrice: '$199.00',
		},
		{
			id: '2',
			name: 'USB-C Fast Charging Cable',
			sku: 'SKU-UCC-3PK-002',
			variant: '3-Pack / 6ft / Braided',
			quantity: 2,
			unitPrice: '$19.99',
			totalPrice: '$39.98',
		},
		{
			id: '3',
			name: 'Ergonomic Laptop Stand',
			sku: 'SKU-ELS-ALU-007',
			variant: 'Space Gray / Aluminum',
			quantity: 1,
			unitPrice: '$89.00',
			totalPrice: '$89.00',
		},
		{
			id: '4',
			name: 'Wireless Charging Pad',
			sku: 'SKU-WCP-15W-004',
			variant: 'White / 15W Fast Charge',
			quantity: 1,
			unitPrice: '$45.00',
			totalPrice: '$45.00',
		},
	];

	const summary = {
		subtotal: '$372.98',
		shipping: '$9.99',
		tax: '$31.45',
		discount: '$37.30',
		total: '$377.12',
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
					<div className="divide-y divide-border/50 px-4">
						{items.map((item) => (
							<LineItemRow
								key={item.id}
								item={item}
								copyLabel={labels.copysku}
							/>
						))}
					</div>

					<div className="p-4 bg-muted/20 border-t border-border/50 space-y-2">
						<SummaryRow label={labels.subtotal} value={summary.subtotal} />
						<SummaryRow label={labels.shipping} value={summary.shipping} />
						<SummaryRow label={labels.tax} value={summary.tax} />
						{summary.discount && (
							<SummaryRow
								label={labels.discount}
								value={summary.discount}
								isDiscount
							/>
						)}
						<Separator className="my-2" />
						<SummaryRow label={labels.total} value={summary.total} isTotal />
					</div>
				</div>
			</div>
		</section>
	);
}
