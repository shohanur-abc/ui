import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PercentageStatProps {
	label: string;
	value: number;
	change: string;
	positive: boolean;
}

const SemiCircleProgress = ({ value }: { value: number }) => {
	const angle = (value / 100) * 180;

	return (
		<div className="relative h-16 w-32 overflow-hidden">
			<div className="absolute inset-0 rounded-t-full border-8 border-secondary" />
			<div
				className="absolute inset-0 origin-bottom rounded-t-full border-8 border-primary transition-transform duration-700"
				style={{
					transform: `rotate(${angle - 180}deg)`,
					clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
				}}
			/>
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-lg font-bold">
				{value}%
			</div>
		</div>
	);
};

const PercentageStat = ({
	label,
	value,
	change,
	positive,
}: PercentageStatProps) => (
	<Card className="group flex flex-col items-center p-6 text-center transition-all duration-300 hover:shadow-md">
		<SemiCircleProgress value={value} />
		<p className="mt-4 font-medium">{label}</p>
		<Badge
			variant={positive ? 'default' : 'destructive'}
			className="mt-2 text-[10px]"
		>
			{change}
		</Badge>
	</Card>
);

export default function Main() {
	const stats: PercentageStatProps[] = [
		{ label: 'Cart Completion', value: 68, change: '+4.2%', positive: true },
		{ label: 'Email Open Rate', value: 42, change: '+8.7%', positive: true },
		{ label: 'Return Rate', value: 8, change: '-2.1%', positive: true },
		{ label: 'Bounce Rate', value: 32, change: '+1.4%', positive: false },
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
