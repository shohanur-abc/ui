import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Flame, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

interface TopProductProps {
	rank: number;
	name: string;
	image: string;
	sales: string;
	revenue: string;
}

interface QuickStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
}

const TopProductCard = ({ products }: { products: TopProductProps[] }) => (
	<Card className="relative overflow-hidden p-6 @md:col-span-2 @xl:row-span-2">
		<div className="mb-6 flex items-center gap-2">
			<Crown className="size-5 text-primary" />
			<h3 className="font-semibold">Top Selling Products</h3>
		</div>
		<div className="space-y-4">
			{products.map((product) => (
				<div
					key={product.rank}
					className="group flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-secondary/50"
				>
					<span className="w-6 text-center text-sm font-bold text-muted-foreground">
						#{product.rank}
					</span>
					<Avatar className="size-10 rounded-lg">
						<AvatarImage src={product.image} alt={product.name} />
						<AvatarFallback className="rounded-lg">
							{product.name[0]}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<p className="text-sm font-medium">{product.name}</p>
						<p className="text-xs text-muted-foreground">
							{product.sales} sold
						</p>
					</div>
					<p className="text-sm font-semibold">{product.revenue}</p>
				</div>
			))}
		</div>
	</Card>
);

const QuickStatCard = ({
	icon: Icon,
	label,
	value,
	change,
}: QuickStatProps) => (
	<Card className="group relative overflow-hidden p-5 transition-all duration-300 hover:border-primary/30">
		<div className="flex items-start justify-between">
			<div className="space-y-3">
				<div className="rounded-lg bg-primary/10 p-2 w-fit">
					<Icon className="size-4 text-primary" />
				</div>
				<div>
					<p className="text-2xl font-bold">{value}</p>
					<p className="text-xs text-muted-foreground">{label}</p>
				</div>
			</div>
			<Badge variant="outline" className="gap-1 text-[10px]">
				<ArrowUpRight className="size-3" />
				{change}
			</Badge>
		</div>
	</Card>
);

export default function Main() {
	const topProducts: TopProductProps[] = [
		{
			rank: 1,
			name: 'Wireless Earbuds Pro',
			image: '/placeholder.svg',
			sales: '2,847',
			revenue: '$142,350',
		},
		{
			rank: 2,
			name: 'Smart Watch Elite',
			image: '/placeholder.svg',
			sales: '1,923',
			revenue: '$96,150',
		},
		{
			rank: 3,
			name: 'Portable Charger XL',
			image: '/placeholder.svg',
			sales: '1,584',
			revenue: '$47,520',
		},
		{
			rank: 4,
			name: 'Bluetooth Speaker',
			image: '/placeholder.svg',
			sales: '1,247',
			revenue: '$43,645',
		},
	];

	const quickStats: QuickStatProps[] = [
		{ icon: Flame, label: 'Hot Products', value: '24', change: '+6' },
		{ icon: TrendingUp, label: 'Trending', value: '18', change: '+12' },
		{ icon: Users, label: 'Active Shoppers', value: '4.2K', change: '+847' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @lg:gap-6 @xl:grid-cols-3">
					<TopProductCard products={topProducts} />
					{quickStats.map((stat, i) => (
						<QuickStatCard key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
