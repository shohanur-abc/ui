import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface TrendStatProps {
	label: string;
	current: string;
	trend: number[];
	change: number;
}

const MiniChart = ({ data }: { data: number[] }) => {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;

	return (
		<div className="flex h-8 items-end gap-0.5">
			{data.map((value, i) => (
				<div
					key={i}
					className="w-2 rounded-t bg-primary/60 transition-all duration-300 hover:bg-primary"
					style={{
						height: `${((value - min) / range) * 100}%`,
						minHeight: '4px',
					}}
				/>
			))}
		</div>
	);
};

const TrendStat = ({ label, current, trend, change }: TrendStatProps) => {
	const isPositive = change > 0;
	const isNeutral = change === 0;
	const TrendIcon = isPositive ? ArrowUp : isNeutral ? Minus : ArrowDown;

	return (
		<Card className="group p-5 transition-all duration-300 hover:shadow-md">
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<p className="text-sm text-muted-foreground">{label}</p>
					<p className="text-2xl font-bold tracking-tight">{current}</p>
					<div
						className={`flex items-center gap-1 text-sm ${isPositive ? 'text-accent' : isNeutral ? 'text-muted-foreground' : 'text-destructive'}`}
					>
						<TrendIcon className="size-4" />
						<span>{Math.abs(change)}%</span>
					</div>
				</div>
				<MiniChart data={trend} />
			</div>
		</Card>
	);
};

export default function Main() {
	const stats: TrendStatProps[] = [
		{
			label: 'Daily Revenue',
			current: '$48,294',
			trend: [32, 45, 38, 52, 48, 62, 58],
			change: 12.4,
		},
		{
			label: 'Orders',
			current: '847',
			trend: [42, 38, 45, 52, 48, 55, 62],
			change: 8.2,
		},
		{
			label: 'Visitors',
			current: '12.4K',
			trend: [85, 78, 82, 75, 72, 68, 65],
			change: -4.2,
		},
		{
			label: 'Conversion',
			current: '3.8%',
			trend: [3.2, 3.4, 3.5, 3.6, 3.7, 3.8, 3.8],
			change: 0,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<TrendStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
