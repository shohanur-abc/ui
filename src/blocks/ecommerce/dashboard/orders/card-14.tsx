import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Gift, Package, Tag, Percent, Copy, Sparkles } from 'lucide-react';

interface OrderDiscount {
	code: string;
	type: 'percentage' | 'fixed' | 'freeShipping' | 'bogo';
	value: string;
	savings: string;
	applied: boolean;
}

interface GiftOrderCardProps {
	order: {
		id: string;
		isGift: boolean;
		giftMessage?: string;
		giftRecipient?: string;
		discounts: OrderDiscount[];
		subtotal: string;
		totalSavings: string;
		finalTotal: string;
	};
	labels: {
		giftOrder: string;
		recipient: string;
		message: string;
		discounts: string;
		subtotal: string;
		savings: string;
		total: string;
		copyCode: string;
	};
}

interface DiscountRowProps {
	discount: OrderDiscount;
	copyLabel: string;
}

const DiscountTypeIcon = ({ type }: { type: OrderDiscount['type'] }) => {
	const icons: Record<OrderDiscount['type'], typeof Percent> = {
		percentage: Percent,
		fixed: Tag,
		freeShipping: Package,
		bogo: Gift,
	};
	const Icon = icons[type];
	return <Icon className="size-4" />;
};

const DiscountRow = ({ discount, copyLabel }: DiscountRowProps) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
		<div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
			<DiscountTypeIcon type={discount.type} />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<code className="text-sm font-mono font-semibold">{discount.code}</code>
				<Button variant="ghost" size="icon-sm" className="size-6 hover:bg-accent/10">
					<Copy className="size-3" />
				</Button>
			</div>
			<p className="text-xs text-muted-foreground">{discount.value}</p>
		</div>
		<Badge variant="outline" className="text-accent border-accent/30 bg-accent/10">
			-{discount.savings}
		</Badge>
	</div>
);

const GiftSection = ({ recipient, message, labels }: { recipient?: string; message?: string; labels: GiftOrderCardProps['labels'] }) => (
	<div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
		<div className="flex items-center gap-2 text-primary mb-3">
			<Gift className="size-5" />
			<span className="font-semibold">{labels.giftOrder}</span>
			<Sparkles className="size-4" />
		</div>
		{recipient && (
			<div className="mb-2">
				<p className="text-xs text-muted-foreground">{labels.recipient}</p>
				<p className="font-medium">{recipient}</p>
			</div>
		)}
		{message && (
			<div className="p-3 rounded-lg bg-background/50 border border-border/50">
				<p className="text-xs text-muted-foreground mb-1">{labels.message}</p>
				<p className="text-sm italic">&ldquo;{message}&rdquo;</p>
			</div>
		)}
	</div>
);

const GiftOrderCard = ({ order, labels }: GiftOrderCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
		{order.isGift && (
			<div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
		)}
		<CardHeader className="pb-4">
			<CardTitle className="text-base font-mono">{order.id}</CardTitle>
			<CardDescription>Special order with discounts applied</CardDescription>
		</CardHeader>
		<CardContent className="space-y-4">
			{order.isGift && (
				<GiftSection
					recipient={order.giftRecipient}
					message={order.giftMessage}
					labels={labels}
				/>
			)}

			{order.discounts.length > 0 && (
				<div>
					<p className="text-sm font-medium mb-3">{labels.discounts}</p>
					<div className="space-y-2">
						{order.discounts.map((discount, i) => (
							<DiscountRow key={i} discount={discount} copyLabel={labels.copyCode} />
						))}
					</div>
				</div>
			)}

			<Separator />

			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">{labels.subtotal}</span>
					<span>{order.subtotal}</span>
				</div>
				<div className="flex justify-between text-sm text-accent">
					<span>{labels.savings}</span>
					<span className="font-medium">-{order.totalSavings}</span>
				</div>
				<Separator />
				<div className="flex justify-between text-lg font-bold">
					<span>{labels.total}</span>
					<span>{order.finalTotal}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = {
		giftOrder: 'Gift Order',
		recipient: 'To',
		message: 'Gift Message',
		discounts: 'Applied Discounts',
		subtotal: 'Subtotal',
		savings: 'Total Savings',
		total: 'Final Total',
		copyCode: 'Copy',
	};

	const order = {
		id: 'ORD-2024-001',
		isGift: true,
		giftRecipient: 'Emily Johnson',
		giftMessage: 'Happy Birthday! Hope you enjoy these headphones. Wishing you all the best! - John',
		discounts: [
			{ code: 'BIRTHDAY20', type: 'percentage' as const, value: '20% off entire order', savings: '$59.80', applied: true },
			{ code: 'FREESHIP', type: 'freeShipping' as const, value: 'Free standard shipping', savings: '$9.99', applied: true },
		],
		subtotal: '$299.00',
		totalSavings: '$69.79',
		finalTotal: '$229.21',
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<GiftOrderCard order={order} labels={labels} />
			</div>
		</section>
	);
}
