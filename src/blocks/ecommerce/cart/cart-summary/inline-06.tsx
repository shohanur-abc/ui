import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type CartIndicatorProps = {
	icon: LucideIcon;
	count: number;
};

const CartIndicator = ({ icon: Icon, count }: CartIndicatorProps) => (
	<div className="flex items-center gap-2">
		<div className="relative">
			<Icon className="size-5" />
			<span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
				{count}
			</span>
		</div>
		<span className="text-sm">{count} items</span>
	</div>
);

type InlinePriceProps = {
	label: string;
	value: string;
};

const InlinePrice = ({ label, value }: InlinePriceProps) => (
	<span className="text-sm">
		{label}: <span className="font-medium">{value}</span>
	</span>
);

const TotalPrice = ({ value }: { value: string }) => (
	<span className="text-lg font-bold">{value}</span>
);

export default function Main() {
	const prices: InlinePriceProps[] = [
		{ label: 'Subtotal', value: '$289.00' },
		{ label: 'Shipping', value: 'Free' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center gap-4 rounded-xl bg-muted/50 px-4 py-3">
					<CartIndicator icon={ShoppingBag} count={3} />
					<Separator orientation="vertical" className="h-5" />
					{prices.map((price, i) => (
						<InlinePrice key={i} {...price} />
					))}
					<Separator orientation="vertical" className="h-5" />
					<TotalPrice value="$312.12" />
					<div className="ml-auto">
						<Button asChild>
							<Link href="/checkout">Checkout</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
