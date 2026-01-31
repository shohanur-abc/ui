import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const SearchBar = ({
	placeholder,
	suggestions,
}: {
	placeholder: string;
	suggestions: string[];
}) => (
	<div className="relative max-w-xl mx-auto">
		<div className="relative">
			<Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
			<Input
				type="search"
				placeholder={placeholder}
				className="pl-12 pr-4 h-14 text-lg rounded-full border-2"
			/>
			<Button
				className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
				size="lg"
			>
				Search
			</Button>
		</div>
		<div className="flex flex-wrap justify-center gap-2 mt-4">
			{suggestions.map((suggestion, i) => (
				<Badge
					key={i}
					variant="secondary"
					className="cursor-pointer hover:bg-secondary/80"
					asChild
				>
					<Link href={`/search?q=${suggestion}`}>{suggestion}</Link>
				</Badge>
			))}
		</div>
	</div>
);

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

const TrendingItems = ({
	items,
}: {
	items: { image: string; title: string; href: string }[];
}) => (
	<div className="mt-12">
		<div className="flex items-center justify-center gap-2 mb-6">
			<TrendingUp className="size-5 text-primary" />
			<span className="font-medium">Trending Searches</span>
		</div>
		<div className="flex justify-center gap-4 flex-wrap">
			{items.map(({ image, title, href }, i) => (
				<Link
					key={i}
					href={href}
					className="group flex items-center gap-3 rounded-full border bg-card px-2 py-2 pr-4 hover:border-primary/50 transition-colors"
				>
					<div className="relative size-10 rounded-full overflow-hidden">
						<Image src={image} alt={title} fill className="object-cover" />
					</div>
					<span className="text-sm font-medium group-hover:text-primary transition-colors">
						{title}
					</span>
				</Link>
			))}
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36">
				<div className="space-y-8">
					<Title text="Find Your" highlight="Perfect Style" />
					<Description text="Search from over 10,000 products across all categories. Your next favorite piece is just a search away." />
					<SearchBar
						placeholder="Search for products, brands, styles..."
						suggestions={[
							'Summer Dresses',
							'Sneakers',
							'Leather Bags',
							'Watches',
							'Sunglasses',
						]}
					/>
					<TrendingItems
						items={[
							{
								image:
									'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
								title: 'Running Shoes',
								href: '/search?q=running-shoes',
							},
							{
								image:
									'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
								title: 'Smart Watches',
								href: '/search?q=smart-watches',
							},
							{
								image:
									'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop',
								title: 'Leather Bags',
								href: '/search?q=leather-bags',
							},
							{
								image:
									'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&h=100&fit=crop',
								title: 'Accessories',
								href: '/search?q=accessories',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
