import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	ShoppingCart,
	Package,
	Truck,
	CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const CartPreview = ({
	items,
	total,
}: {
	items: { image: string; name: string; price: string; qty: number }[];
	total: string;
}) => (
	<div className="max-w-md mx-auto rounded-2xl border bg-card overflow-hidden">
		<div className="p-4 border-b">
			<div className="flex items-center gap-2">
				<ShoppingCart className="size-5 text-primary" />
				<span className="font-semibold">
					Your Cart ({items.reduce((acc, i) => acc + i.qty, 0)} items)
				</span>
			</div>
		</div>
		<div className="divide-y">
			{items.map((item, i) => (
				<div key={i} className="flex items-center gap-4 p-4">
					<div className="relative size-16 rounded-lg overflow-hidden shrink-0">
						<Image
							src={item.image}
							alt={item.name}
							fill
							className="object-cover"
						/>
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium truncate">{item.name}</p>
						<p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
					</div>
					<p className="font-bold">{item.price}</p>
				</div>
			))}
		</div>
		<div className="p-4 border-t bg-muted/50">
			<div className="flex items-center justify-between mb-4">
				<span className="font-semibold">Total</span>
				<span className="text-2xl font-bold text-primary">{total}</span>
			</div>
			<Button className="w-full gap-2" size="lg">
				Proceed to Checkout
				<ArrowRight className="size-4" />
			</Button>
		</div>
	</div>
);

const Features = ({
	items,
}: {
	items: { icon: React.ElementType; text: string }[];
}) => (
	<div className="flex flex-wrap justify-center gap-6">
		{items.map(({ icon: Icon, text }, i) => (
			<div key={i} className="flex items-center gap-2 text-sm">
				<Icon className="size-4 text-primary" />
				<span>{text}</span>
			</div>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
				<div className="text-center space-y-6">
					<Badge variant="secondary" className="gap-2">
						<ShoppingCart className="size-4" />
						Your Cart
					</Badge>
					<Title text="Ready to" highlight="Checkout?" />
					<Description text="You're just a few steps away from completing your order. Review your items and proceed when ready." />
				</div>
				<CartPreview
					items={[
						{
							image:
								'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
							name: 'Urban Runner Pro',
							price: '$149',
							qty: 1,
						},
						{
							image:
								'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&h=100&fit=crop',
							name: 'Summer Dress',
							price: '$89',
							qty: 2,
						},
					]}
					total="$327"
				/>
				<Features
					items={[
						{ icon: Package, text: 'Secure packaging' },
						{ icon: Truck, text: 'Fast shipping' },
						{ icon: CheckCircle2, text: 'Satisfaction guaranteed' },
					]}
				/>
			</div>
		</section>
	);
}
