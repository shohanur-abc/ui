import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendStatProps {
	label: string;
	value: string;
	data: number[];
	change: number;
}

const AreaChart = ({ data, isPositive }: { data: number[]; isPositive: boolean }) => {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;
	const height = 48;
	const width = 120;

	const points = data.map((value, i) => ({
		x: (i / (data.length - 1)) * width,
		y: height - ((value - min) / range) * height,
	}));

	const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
	const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

	return (
		<svg width={width} height={height} className="overflow-visible">
			<defs>
				<linearGradient id={`gradient-${isPositive}`} x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor={isPositive ? 'var(--accent)' : 'var(--destructive)'} stopOpacity="0.3" />
					<stop offset="100%" stopColor={isPositive ? 'var(--accent)' : 'var(--destructive)'} stopOpacity="0" />
				</linearGradient>
			</defs>
			<path d={areaPath} fill={`url(#gradient-${isPositive})`} />
			<path
				d={linePath}
				fill="none"
				stroke={isPositive ? 'var(--accent)' : 'var(--destructive)'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const TrendStat = ({ label, value, data, change }: TrendStatProps) => {
	const isPositive = change >= 0;

	return (
		<Card className="group p-5 transition-all duration-300 hover:shadow-md">
			<div className="flex items-start justify-between gap-4">
				<div className="space-y-2">
					<p className="text-sm text-muted-foreground">{label}</p>
					<p className="text-2xl font-bold tracking-tight">{value}</p>
					<Badge variant={isPositive ? 'default' : 'destructive'} className="gap-1">
						{isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
						{Math.abs(change)}%
					</Badge>
				</div>
				<AreaChart data={data} isPositive={isPositive} />
			</div>
		</Card>
	);
};

export default function Main() {
	const stats: TrendStatProps[] = [
		{ label: 'Revenue', value: '$284K', data: [42, 48, 52, 58, 62, 68, 72], change: 18.4 },
		{ label: 'Orders', value: '8,492', data: [32, 38, 42, 48, 52, 58, 62], change: 24.2 },
		{ label: 'Customers', value: '4,284', data: [48, 52, 55, 52, 48, 45, 42], change: -8.4 },
		{ label: 'AOV', value: '$142', data: [128, 132, 138, 142, 145, 142, 142], change: 4.2 },
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
