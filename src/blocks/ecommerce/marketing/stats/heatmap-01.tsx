import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HeatmapStatProps {
	day: string;
	hours: { hour: string; value: number }[];
}

const getIntensityClass = (value: number) => {
	if (value >= 80) return 'bg-primary';
	if (value >= 60) return 'bg-primary/80';
	if (value >= 40) return 'bg-primary/60';
	if (value >= 20) return 'bg-primary/40';
	return 'bg-primary/20';
};

const HeatmapRow = ({ day, hours }: HeatmapStatProps) => (
	<div className="flex items-center gap-2">
		<span className="w-8 text-xs text-muted-foreground">{day}</span>
		<div className="flex flex-1 gap-1">
			{hours.map((h, i) => (
				<div
					key={i}
					className={`group relative h-6 flex-1 rounded transition-transform hover:scale-110 ${getIntensityClass(h.value)}`}
				>
					<div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-popover px-2 py-1 text-xs shadow-lg group-hover:block">
						{h.hour}: {h.value}%
					</div>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const generateHours = () =>
		['6am', '9am', '12pm', '3pm', '6pm', '9pm'].map((hour) => ({
			hour,
			value: Math.floor(Math.random() * 80) + 20,
		}));

	const stats: HeatmapStatProps[] = [
		{ day: 'Mon', hours: generateHours() },
		{ day: 'Tue', hours: generateHours() },
		{ day: 'Wed', hours: generateHours() },
		{ day: 'Thu', hours: generateHours() },
		{ day: 'Fri', hours: generateHours() },
		{ day: 'Sat', hours: generateHours() },
		{ day: 'Sun', hours: generateHours() },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="p-6 @md:p-8">
					<div className="mb-6 flex items-center justify-between">
						<h3 className="font-semibold">Traffic Heatmap</h3>
						<Badge variant="outline">Orders by Time</Badge>
					</div>
					<div className="space-y-2">
						<div className="mb-4 flex items-center gap-2">
							<span className="w-8" />
							<div className="flex flex-1 gap-1">
								{['6am', '9am', '12pm', '3pm', '6pm', '9pm'].map((h) => (
									<span
										key={h}
										className="flex-1 text-center text-xs text-muted-foreground"
									>
										{h}
									</span>
								))}
							</div>
						</div>
						{stats.map((stat, i) => (
							<HeatmapRow key={i} {...stat} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
