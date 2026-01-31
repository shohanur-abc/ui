import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Gift, Heart, Package, ShoppingBag, Tag } from 'lucide-react';
import Image from 'next/image';

interface BundleProps {
	items: { image: string; name: string; price: number }[];
	bundlePrice: number;
	savings: number;
	bundleName: string;
}

const BundleItems = ({
	items,
}: {
	items: { image: string; name: string; price: number }[];
}) => (
	<div className="relative flex justify-center -space-x-8">
		{items.map((item, i) => (
			<div
				key={i}
				className="relative size-24 overflow-hidden rounded-xl border-4 border-background bg-muted shadow-lg transition-transform hover:z-10 hover:scale-110 @sm:size-28"
				style={{ zIndex: items.length - i }}
			>
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
		))}
	</div>
);

const BundleName = ({ text }: { text: string }) => (
	<h3 className="text-center text-lg font-bold text-foreground">{text}</h3>
);

const ItemsList = ({ items }: { items: { name: string; price: number }[] }) => (
	<ul className="space-y-2">
		{items.map((item, i) => (
			<li key={i} className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">{item.name}</span>
				<span className="text-foreground">${item.price.toFixed(2)}</span>
			</li>
		))}
	</ul>
);

const PriceSummary = ({
	bundlePrice,
	originalPrice,
	savings,
}: {
	bundlePrice: number;
	originalPrice: number;
	savings: number;
}) => (
	<div className="space-y-1 text-center">
		<div className="flex items-center justify-center gap-2">
			<span className="text-2xl font-bold text-primary">
				${bundlePrice.toFixed(2)}
			</span>
			<span className="text-lg text-muted-foreground line-through">
				${originalPrice.toFixed(2)}
			</span>
		</div>
		<Badge variant="secondary" className="gap-1">
			<Tag className="size-3" />
			Save ${savings.toFixed(2)}
		</Badge>
	</div>
);

const BundleActions = ({
	addLabel,
	giftLabel,
}: {
	addLabel: string;
	giftLabel: string;
}) => (
	<div className="flex gap-2">
		<Button variant="outline" size="icon">
			<Heart className="size-4" />
		</Button>
		<Button variant="outline" className="flex-1 gap-2">
			<Gift className="size-4" />
			{giftLabel}
		</Button>
		<Button className="flex-1 gap-2">
			<ShoppingBag className="size-4" />
			{addLabel}
		</Button>
	</div>
);

export default function Main() {
	const bundle: BundleProps = {
		bundleName: 'Complete Skincare Kit',
		items: [
			{
				image:
					'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
				name: 'Cleanser',
				price: 29.99,
			},
			{
				image:
					'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=200&h=200&fit=crop',
				name: 'Serum',
				price: 59.99,
			},
			{
				image:
					'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=200&h=200&fit=crop',
				name: 'Moisturizer',
				price: 39.99,
			},
		],
		bundlePrice: 99.99,
		savings: 29.98,
	};

	const originalPrice = bundle.items.reduce((sum, item) => sum + item.price, 0);

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="space-y-5 p-5">
					<Badge className="mx-auto flex w-fit gap-1.5">
						<Package className="size-3" />
						Bundle Deal
					</Badge>
					<BundleItems items={bundle.items} />
					<BundleName text={bundle.bundleName} />
					<Separator />
					<ItemsList items={bundle.items} />
					<Separator />
					<PriceSummary
						bundlePrice={bundle.bundlePrice}
						originalPrice={originalPrice}
						savings={bundle.savings}
					/>
					<BundleActions addLabel="Add" giftLabel="Gift" />
				</Card>
			</div>
		</section>
	);
}
