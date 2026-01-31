import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Receipt } from 'lucide-react';

interface ReceiptHeaderProps {
	storeName: string;
	storeAddress: string;
	receiptNumber: string;
	date: string;
	time: string;
	cashier: string;
}

interface ReceiptItemProps {
	name: string;
	quantity: number;
	price: number;
}

interface ReceiptTotalsProps {
	subtotal: number;
	tax: number;
	total: number;
	paymentMethod: string;
	amountTendered: number;
	change: number;
	currency: string;
}

const ReceiptHeader = ({
	storeName,
	storeAddress,
	receiptNumber,
	date,
	time,
	cashier,
}: ReceiptHeaderProps) => (
	<div className="text-center space-y-1">
		<div className="flex items-center justify-center gap-2">
			<Receipt className="size-4" />
			<h2 className="font-bold text-sm">{storeName}</h2>
		</div>
		<p className="text-[10px] text-muted-foreground">{storeAddress}</p>
		<div className="flex justify-center gap-4 text-[10px] text-muted-foreground pt-1">
			<span>#{receiptNumber}</span>
			<span>{date}</span>
			<span>{time}</span>
		</div>
		<p className="text-[10px] text-muted-foreground">Cashier: {cashier}</p>
	</div>
);

const ReceiptItems = ({
	items,
	currency,
}: {
	items: ReceiptItemProps[];
	currency: string;
}) => (
	<div className="space-y-0.5 font-mono text-xs">
		{items.map((item, index) => (
			<div key={index} className="flex justify-between">
				<span>
					{item.quantity}x {item.name}
				</span>
				<span>
					{currency}
					{(item.quantity * item.price).toFixed(2)}
				</span>
			</div>
		))}
	</div>
);

const ReceiptTotals = ({
	subtotal,
	tax,
	total,
	paymentMethod,
	amountTendered,
	change,
	currency,
}: ReceiptTotalsProps) => (
	<div className="font-mono text-xs space-y-0.5">
		<div className="flex justify-between">
			<span>Subtotal</span>
			<span>
				{currency}
				{subtotal.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between">
			<span>Tax</span>
			<span>
				{currency}
				{tax.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between font-bold text-sm pt-1">
			<span>TOTAL</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
		<Separator className="my-2" />
		<div className="flex justify-between">
			<span>{paymentMethod}</span>
			<span>
				{currency}
				{amountTendered.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between">
			<span>Change</span>
			<span>
				{currency}
				{change.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const header: ReceiptHeaderProps = {
		storeName: 'Quick Mart',
		storeAddress: '123 Main St, Anytown USA',
		receiptNumber: '78456',
		date: '02/15/24',
		time: '2:34 PM',
		cashier: 'Jane D.',
	};

	const items: ReceiptItemProps[] = [
		{ name: 'Milk 2%', quantity: 1, price: 4.99 },
		{ name: 'Bread Whole Wheat', quantity: 1, price: 3.49 },
		{ name: 'Eggs Large (12)', quantity: 1, price: 5.99 },
		{ name: 'Bananas', quantity: 2, price: 0.69 },
		{ name: 'Coffee Ground', quantity: 1, price: 12.99 },
	];

	const totals: ReceiptTotalsProps = {
		subtotal: 28.84,
		tax: 2.02,
		total: 30.86,
		paymentMethod: 'CASH',
		amountTendered: 35.0,
		change: 4.14,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-6">
				<div className="rounded border p-3 bg-muted/20 space-y-3">
					<ReceiptHeader {...header} />
					<div className="border-t border-b border-dashed py-2">
						<ReceiptItems items={items} currency="$" />
					</div>
					<ReceiptTotals {...totals} />
					<div className="text-center text-[10px] text-muted-foreground pt-2 border-t border-dashed">
						<p>Thank you for shopping!</p>
						<p>Returns within 30 days with receipt</p>
						<Badge variant="outline" className="mt-2 text-[10px]">
							Points Earned: 31
						</Badge>
					</div>
				</div>
			</div>
		</section>
	);
}
