import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Banknote, CheckCircle2, Landmark, Wallet } from 'lucide-react';

interface PurchaseItem {
	name: string;
	category: string;
	price: number;
}

interface QuickReceiptHeaderProps {
	storeName: string;
	storeLocation: string;
	receiptNumber: string;
	date: string;
	time: string;
}

interface PurchaseItemRowProps {
	item: PurchaseItem;
	currency: string;
}

interface PaymentBreakdownProps {
	subtotal: number;
	tax: number;
	taxRate: number;
	total: number;
	amountPaid: number;
	change: number;
	currency: string;
	paymentMethod: string;
}

interface LoyaltyInfoProps {
	pointsEarned: number;
	totalPoints: number;
	memberName: string;
	memberId: string;
}

const QuickReceiptHeader = ({
	storeName,
	storeLocation,
	receiptNumber,
	date,
	time,
}: QuickReceiptHeaderProps) => (
	<div className="text-center space-y-2">
		<h1 className="text-xl font-bold">{storeName}</h1>
		<p className="text-sm text-muted-foreground">{storeLocation}</p>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">{receiptNumber}</span>
			<span className="text-muted-foreground">
				{date} {time}
			</span>
		</div>
	</div>
);

const PurchaseItemRow = ({ item, currency }: PurchaseItemRowProps) => (
	<div className="flex items-center justify-between py-2">
		<div>
			<p className="font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">{item.category}</p>
		</div>
		<p className="font-medium">
			{currency}
			{item.price.toFixed(2)}
		</p>
	</div>
);

const PaymentBreakdown = ({
	subtotal,
	tax,
	taxRate,
	total,
	amountPaid,
	change,
	currency,
	paymentMethod,
}: PaymentBreakdownProps) => (
	<div className="space-y-3">
		<div className="space-y-1 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Tax ({taxRate}%)</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
		</div>
		<Separator />
		<div className="flex justify-between text-lg font-bold">
			<span>Total</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
		<div className="p-3 rounded-lg bg-muted/40 space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="flex items-center gap-2">
					{paymentMethod === 'Cash' ? (
						<Banknote className="size-4" />
					) : (
						<Wallet className="size-4" />
					)}
					{paymentMethod}
				</span>
				<span>
					{currency}
					{amountPaid.toFixed(2)}
				</span>
			</div>
			{change > 0 && (
				<div className="flex justify-between font-medium">
					<span>Change</span>
					<span>
						{currency}
						{change.toFixed(2)}
					</span>
				</div>
			)}
		</div>
	</div>
);

const LoyaltyInfo = ({
	pointsEarned,
	totalPoints,
	memberName,
	memberId,
}: LoyaltyInfoProps) => (
	<div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
		<div className="flex items-center justify-between">
			<span className="text-sm font-medium">{memberName}</span>
			<Badge variant="secondary">{memberId}</Badge>
		</div>
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Points Earned</span>
			<span className="font-semibold text-primary">+{pointsEarned}</span>
		</div>
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Total Points</span>
			<span className="font-semibold">{totalPoints.toLocaleString()}</span>
		</div>
	</div>
);

export default function Main() {
	const header: QuickReceiptHeaderProps = {
		storeName: 'Urban Market',
		storeLocation: '456 Shopping Ave, Store #123',
		receiptNumber: 'RCP-789012',
		date: '02/03/2024',
		time: '2:34 PM',
	};

	const items: PurchaseItem[] = [
		{ name: 'Organic Coffee Beans', category: 'Groceries', price: 14.99 },
		{ name: 'Artisan Bread', category: 'Bakery', price: 6.49 },
		{ name: 'Fresh Salad Mix', category: 'Produce', price: 5.99 },
		{ name: 'Sparkling Water 6-Pack', category: 'Beverages', price: 7.99 },
	];

	const payment: PaymentBreakdownProps = {
		subtotal: 35.46,
		tax: 2.84,
		taxRate: 8,
		total: 38.3,
		amountPaid: 50.0,
		change: 11.7,
		currency: '$',
		paymentMethod: 'Cash',
	};

	const loyalty: LoyaltyInfoProps = {
		pointsEarned: 38,
		totalPoints: 2847,
		memberName: 'Sarah Johnson',
		memberId: 'GOLD',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 py-8 @md:py-12">
				<Card>
					<CardHeader>
						<QuickReceiptHeader {...header} />
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="divide-y">
							{items.map((item, index) => (
								<PurchaseItemRow key={index} item={item} currency="$" />
							))}
						</div>
						<PaymentBreakdown {...payment} />
						<LoyaltyInfo {...loyalty} />
					</CardContent>
					<CardFooter className="flex-col gap-3 border-t pt-6">
						<div className="flex items-center gap-2 text-green-600">
							<CheckCircle2 className="size-5" />
							<span className="font-medium">Payment Complete</span>
						</div>
						<p className="text-xs text-center text-muted-foreground">
							Thank you for shopping with us!
						</p>
						<Button variant="outline" size="sm" className="w-full">
							Email Receipt
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
