import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const ProductGrid = ({
	items,
}: {
	items: {
		src: string;
		alt: string;
		title: string;
		price: string;
		badge?: string;
		href: string;
	}[];
}) => (
	<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
		{items.map((item, i) => (
			<Link
				key={i}
				href={item.href}
				className="group relative rounded-xl overflow-hidden bg-card"
			>
				<div className="aspect-square">
					<Image
						src={item.src}
						alt={item.alt}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
				{item.badge && (
					<Badge className="absolute top-2 left-2 text-xs">{item.badge}</Badge>
				)}
				<div className="p-3">
					<p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
						{item.title}
					</p>
					<p className="text-primary font-bold text-sm">{item.price}</p>
				</div>
			</Link>
		))}
	</div>
);

const SectionHeader = ({
	headline,
	cta,
}: {
	headline: string;
	cta: { label: string; href: string };
}) => (
	<div className="flex items-center justify-between mb-6">
		<h2 className="text-2xl @sm:text-3xl font-bold">{headline}</h2>
		<Button variant="ghost" className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-7xl mx-auto">
					<Tabs defaultValue="new" className="space-y-6">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<h2 className="text-2xl @sm:text-3xl font-bold">
								Shop by Collection
							</h2>
							<TabsList>
								<TabsTrigger value="new">New Arrivals</TabsTrigger>
								<TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
								<TabsTrigger value="sale">On Sale</TabsTrigger>
							</TabsList>
						</div>
						<TabsContent value="new" className="mt-6">
							<ProductGrid
								items={[
									{
										src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
										alt: 'Watch',
										title: 'Smart Watch Pro',
										price: '$299',
										badge: 'NEW',
										href: '/product/1',
									},
									{
										src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
										alt: 'Shoe',
										title: 'Runner Elite',
										price: '$179',
										badge: 'NEW',
										href: '/product/2',
									},
									{
										src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400',
										alt: 'Glasses',
										title: 'Aviator Classic',
										price: '$129',
										href: '/product/3',
									},
									{
										src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
										alt: 'Bag',
										title: 'Leather Satchel',
										price: '$249',
										href: '/product/4',
									},
								]}
							/>
						</TabsContent>
						<TabsContent value="bestsellers" className="mt-6">
							<ProductGrid
								items={[
									{
										src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
										alt: 'Headphones',
										title: 'Studio Headphones',
										price: '$199',
										badge: 'TOP',
										href: '/product/5',
									},
									{
										src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
										alt: 'Camera',
										title: 'Instant Camera',
										price: '$89',
										href: '/product/6',
									},
									{
										src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400',
										alt: 'Perfume',
										title: 'Signature Scent',
										price: '$75',
										href: '/product/7',
									},
									{
										src: 'https://images.unsplash.com/photo-1491553895911-0055uj8482a?w=400',
										alt: 'Plant',
										title: 'Indoor Plant',
										price: '$35',
										href: '/product/8',
									},
								]}
							/>
						</TabsContent>
						<TabsContent value="sale" className="mt-6">
							<ProductGrid
								items={[
									{
										src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
										alt: 'Sunglasses',
										title: 'Summer Shades',
										price: '$59',
										badge: '-40%',
										href: '/product/9',
									},
									{
										src: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
										alt: 'Backpack',
										title: 'Travel Backpack',
										price: '$79',
										badge: '-30%',
										href: '/product/10',
									},
									{
										src: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
										alt: 'Wallet',
										title: 'Card Holder',
										price: '$29',
										badge: '-50%',
										href: '/product/11',
									},
									{
										src: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
										alt: 'Keyboard',
										title: 'Wireless Keyboard',
										price: '$69',
										badge: '-25%',
										href: '/product/12',
									},
								]}
							/>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</section>
	);
}
