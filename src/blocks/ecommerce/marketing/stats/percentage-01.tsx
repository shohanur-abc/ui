import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PercentageStatProps {
	label: string;
	value: number;
	description: string;
	color: 'primary' | 'accent' | 'chart-3' | 'chart-4';
}

const CircularProgress = ({
	value,
	color,
}: {
	value: number;
	color: string;
}) => {
	const circumference = 2 * Math.PI * 40;
	const offset = circumference - (value / 100) * circumference;

	return (
		<div className="relative size-28">
			<svg className="size-full -rotate-90">
				<circle
					cx="56"
					cy="56"
					r="40"
					fill="none"
					stroke="currentColor"
					strokeWidth="8"
					className="text-secondary"
				/>
				<circle
					cx="56"
					cy="56"
					r="40"
					fill="none"
					stroke={`var(--${color})`}
					strokeWidth="8"
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					className="transition-all duration-500"
				/>
			</svg>
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="text-xl font-bold">{value}%</span>
			</div>
		</div>
	);
};

const PercentageStat = ({
	label,
	value,
	description,
	color,
}: PercentageStatProps) => (
	<Card className="group flex flex-col items-center p-6 text-center transition-all duration-300 hover:shadow-md">
		<CircularProgress value={value} color={color} />
		<p className="mt-4 font-semibold">{label}</p>
		<p className="mt-1 text-sm text-muted-foreground">{description}</p>
	</Card>
);

export default function Main() {
	const stats: PercentageStatProps[] = [
		{
			label: 'Conversion Rate',
			value: 78,
			description: 'Above industry avg',
			color: 'primary',
		},
		{
			label: 'Customer Retention',
			value: 92,
			description: 'Year over year',
			color: 'accent',
		},
		{
			label: 'Order Accuracy',
			value: 99,
			description: 'Last quarter',
			color: 'chart-3',
		},
		{
			label: 'On-time Delivery',
			value: 96,
			description: 'Shipping performance',
			color: 'chart-4',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<PercentageStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
