import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Tag, Percent, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AbandonedCartItem = ({
	image,
	title,
	price,
	quantity,
}: {
	image: string;
	title: string;
	price: string;
	quantity: number;
}) => (
	<div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
		<div className="size-16 rounded-lg overflow-hidden relative shrink-0">
			<Image src={image} alt={title} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<h3 className="font-semibold line-clamp-1">{title}</h3>
			<p className="text-sm text-muted-foreground">Qty: {quantity}</p>
		</div>
		<span className="font-bold shrink-0">{price}</span>
	</div>
);

const AbandonedCartContent = ({
	badge,
	headline,
	discount,
	items,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	discount: { value: string; code: string };
	items: { image: string; title: string; price: string; quantity: number }[];
	cta: { label: string; href: string };
}) => (
	<div className="max-w-lg mx-auto">
		<div className="text-center mb-8">
			<Badge className="bg-orange-500/10 text-orange-500 border-orange-500/30 gap-1.5 mb-4">
				<badge.icon className="size-3" />
				{badge.text}
			</Badge>
			<h2 className="text-2xl @sm:text-3xl font-bold mb-3">
				{headline.text}
				<span className="text-orange-500"> {headline.highlight}</span>
			</h2>
			<div className="bg-orange-500/10 rounded-xl p-4 inline-block">
				<span className="text-2xl font-black text-orange-500">
					{discount.value}
				</span>
				<p className="text-sm text-muted-foreground">
					Use code:{' '}
					<span className="font-mono font-bold text-foreground">
						{discount.code}
					</span>
				</p>
			</div>
		</div>
		<div className="space-y-3 mb-6">
			{items.map((item, i) => (
				<AbandonedCartItem key={i} {...item} />
			))}
		</div>
		<Button
			size="lg"
			className="w-full gap-2 bg-orange-500 hover:bg-orange-600"
			asChild
		>
			<Link href={cta.href}>
				<ShoppingBag className="size-4" />
				{cta.label}
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<AbandonedCartContent
					badge={{ icon: ShoppingBag, text: 'Still Thinking?' }}
					headline={{ text: 'Complete Your', highlight: 'Purchase' }}
					discount={{ value: '10% OFF', code: 'COMEBACK10' }}
					items={[
						{
							image:
								'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
							title: 'Smart Watch Pro',
							price: '$299',
							quantity: 1,
						},
						{
							image:
								'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200',
							title: 'Wireless Earbuds',
							price: '$149',
							quantity: 2,
						},
					]}
					cta={{ label: 'Complete Purchase', href: '/cart' }}
				/>
			</div>
		</section>
	);
}
