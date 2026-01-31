import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Grid, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeaturedCategory = ({
	image,
	title,
	description,
	href,
}: {
	image: string;
	title: string;
	description: string;
	href: string;
}) => (
	<Link
		href={href}
		className="group relative overflow-hidden rounded-3xl col-span-2 row-span-2"
	>
		<div className="aspect-square @md:aspect-[16/9] relative">
			<Image
				src={image}
				alt={title}
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-500"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
		</div>
		<div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
			<Badge className="bg-white/10 backdrop-blur-sm text-white border-0 mb-3">
				Featured
			</Badge>
			<h3 className="font-bold text-white text-2xl @md:text-3xl mb-2">
				{title}
			</h3>
			<p className="text-white/70 mb-4 max-w-md">{description}</p>
			<Button className="gap-2 bg-white text-black hover:bg-white/90">
				Shop Now
				<ArrowRight className="size-4" />
			</Button>
		</div>
	</Link>
);

const SmallCategory = ({
	image,
	title,
	href,
}: {
	image: string;
	title: string;
	href: string;
}) => (
	<Link href={href} className="group relative overflow-hidden rounded-2xl">
		<div className="aspect-square relative">
			<Image
				src={image}
				alt={title}
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-300"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
		</div>
		<div className="absolute bottom-0 left-0 right-0 p-4">
			<h3 className="font-bold text-white">{title}</h3>
		</div>
	</Link>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="flex items-center justify-between mb-10">
						<div>
							<Badge
								variant="outline"
								className="border-primary/50 text-primary gap-1.5 mb-4"
							>
								<Grid className="size-3" />
								Categories
							</Badge>
							<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
								Shop by Category
							</h2>
						</div>
					</div>
					<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
						<FeaturedCategory
							image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
							title="Premium Tech"
							description="Discover our curated collection of cutting-edge technology and gadgets"
							href="/category/tech"
						/>
						<SmallCategory
							image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
							title="Audio"
							href="/category/audio"
						/>
						<SmallCategory
							image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
							title="Wearables"
							href="/category/wearables"
						/>
						<SmallCategory
							image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
							title="Power"
							href="/category/power"
						/>
						<SmallCategory
							image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
							title="Studio"
							href="/category/studio"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
