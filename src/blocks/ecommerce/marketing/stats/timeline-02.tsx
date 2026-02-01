import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TimelineStatProps {
	year: string;
	label: string;
	value: string;
	description: string;
	highlight?: boolean;
}

const TimelineStat = ({
	year,
	label,
	value,
	description,
	highlight,
}: TimelineStatProps) => (
	<div className="group relative">
		<div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border group-first:top-1/2 group-last:h-1/2" />
		<div className="relative flex justify-center">
			<Badge
				variant={highlight ? 'default' : 'outline'}
				className="relative z-10 bg-background"
			>
				{year}
			</Badge>
		</div>
		<Card
			className={`mt-4 p-6 transition-all duration-300 hover:shadow-md ${highlight ? 'border-primary/30 bg-primary/5' : ''}`}
		>
			<div className="text-center">
				<p className="text-3xl font-bold tracking-tight @sm:text-4xl">
					{value}
				</p>
				<p className="mt-1 font-medium">{label}</p>
				<p className="mt-2 text-sm text-muted-foreground">{description}</p>
			</div>
		</Card>
	</div>
);

export default function Main() {
	const stats: TimelineStatProps[] = [
		{
			year: '2021',
			label: 'Revenue',
			value: '$1.2M',
			description: 'Our first full year',
		},
		{
			year: '2022',
			label: 'Revenue',
			value: '$4.8M',
			description: '300% YoY growth',
		},
		{
			year: '2023',
			label: 'Revenue',
			value: '$12.4M',
			description: '158% YoY growth',
		},
		{
			year: '2024',
			label: 'Revenue',
			value: '$28.7M',
			description: '131% YoY growth',
			highlight: true,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-8 @sm:grid-cols-2 @xl:grid-cols-4">
					{stats.map((stat, i) => (
						<TimelineStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
