import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Eye, Share2, ArrowRight } from 'lucide-react';

interface WishlistStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	subtext: string;
}

const WishlistStat = ({
	icon: Icon,
	label,
	value,
	subtext,
}: WishlistStatProps) => (
	<Card className="group flex items-center gap-4 p-5 transition-all duration-300 hover:shadow-md">
		<div className="rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-3">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-xl font-bold">{value}</p>
		</div>
		<p className="text-xs text-muted-foreground">{subtext}</p>
	</Card>
);

export default function Main() {
	const stats: WishlistStatProps[] = [
		{
			icon: Heart,
			label: 'Wishlisted Items',
			value: '48,294',
			subtext: '+12% vs last month',
		},
		{
			icon: Eye,
			label: 'Wishlist Views',
			value: '124,847',
			subtext: 'Avg. 2.6 per user',
		},
		{
			icon: ShoppingCart,
			label: 'Converted to Cart',
			value: '8,294',
			subtext: '17% conversion',
		},
		{
			icon: Share2,
			label: 'Shared Lists',
			value: '2,847',
			subtext: '+28% growth',
		},
		{
			icon: ArrowRight,
			label: 'Purchased from List',
			value: '4,128',
			subtext: '8.5% conversion',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @lg:gap-6 @xl:grid-cols-3 @3xl:grid-cols-5">
					{stats.map((stat, i) => (
						<WishlistStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
