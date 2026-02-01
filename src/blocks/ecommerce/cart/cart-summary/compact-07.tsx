import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type CartPreviewProps = {
	items: { image: string; name: string }[];
	extraCount: number;
};

const CartPreview = ({ items, extraCount }: CartPreviewProps) => (
	<div className="flex items-center gap-2">
		<div className="flex -space-x-2">
			{items.slice(0, 3).map((item, i) => (
				<Avatar key={i} className="size-10 border-2 border-background">
					<AvatarImage
						src={item.image}
						alt={item.name}
						className="object-cover"
					/>
					<AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
				</Avatar>
			))}
		</div>
		{extraCount > 0 && (
			<span className="text-sm text-muted-foreground">+{extraCount} more</span>
		)}
	</div>
);

const PriceInfo = ({
	total,
	itemCount,
}: {
	total: string;
	itemCount: number;
}) => (
	<div className="text-right">
		<p className="text-xs text-muted-foreground">{itemCount} items</p>
		<span className="text-lg font-bold">{total}</span>
	</div>
);

export default function Main() {
	const cartItems = [
		{
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
			name: 'Watch',
		},
		{
			image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100',
			name: 'Smart',
		},
		{
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100',
			name: 'Bag',
		},
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-lg px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-3 shadow-sm">
					<CartPreview items={cartItems} extraCount={2} />
					<div className="flex items-center gap-4">
						<PriceInfo total="$549.00" itemCount={5} />
						<Button asChild>
							<Link href="/checkout">Checkout</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
