import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface RankStatProps {
	rank: number;
	label: string;
	value: string;
	change: number;
	previousRank: number;
}

const RankStat = ({
	rank,
	label,
	value,
	change,
	previousRank,
}: RankStatProps) => {
	const rankChange = previousRank - rank;
	const isPositive = change >= 0;

	return (
		<Card className="group flex items-center gap-4 p-4 transition-all duration-300 hover:shadow-md">
			<div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
				{rank}
			</div>
			<div className="flex-1">
				<p className="font-medium">{label}</p>
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">{value}</span>
					{rankChange !== 0 && (
						<span
							className={`text-xs ${rankChange > 0 ? 'text-accent' : 'text-destructive'}`}
						>
							{rankChange > 0 ? '↑' : '↓'} {Math.abs(rankChange)}
						</span>
					)}
				</div>
			</div>
			<Badge variant={isPositive ? 'default' : 'destructive'} className="gap-1">
				{isPositive ? (
					<TrendingUp className="size-3" />
				) : (
					<TrendingDown className="size-3" />
				)}
				{Math.abs(change)}%
			</Badge>
		</Card>
	);
};

export default function Main() {
	const stats: RankStatProps[] = [
		{
			rank: 1,
			label: 'Wireless Earbuds Pro',
			value: '$284,847 revenue',
			change: 42.5,
			previousRank: 2,
		},
		{
			rank: 2,
			label: 'Smart Watch Elite',
			value: '$198,294 revenue',
			change: 28.2,
			previousRank: 1,
		},
		{
			rank: 3,
			label: 'Laptop Stand Pro',
			value: '$142,847 revenue',
			change: 18.4,
			previousRank: 5,
		},
		{
			rank: 4,
			label: 'USB-C Hub',
			value: '$98,294 revenue',
			change: 12.8,
			previousRank: 4,
		},
		{
			rank: 5,
			label: 'Mechanical Keyboard',
			value: '$84,294 revenue',
			change: -4.2,
			previousRank: 3,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-3">
					{stats.map((stat, i) => (
						<RankStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
