import { Card } from '@/components/ui/card';

interface CounterStatProps {
	value: string;
	label: string;
	suffix?: string;
}

const CounterStat = ({ value, label, suffix }: CounterStatProps) => (
	<div className="group text-center">
		<div className="relative inline-block">
			<span className="text-5xl font-bold tracking-tighter transition-transform duration-300 group-hover:scale-105 @sm:text-6xl @lg:text-7xl">
				{value}
			</span>
			{suffix && (
				<span className="ml-1 text-2xl font-semibold text-primary @sm:text-3xl @lg:text-4xl">
					{suffix}
				</span>
			)}
		</div>
		<p className="mt-2 text-sm font-medium text-muted-foreground @sm:text-base">
			{label}
		</p>
	</div>
);

export default function Main() {
	const stats: CounterStatProps[] = [
		{ value: '50', suffix: 'M+', label: 'Products Sold' },
		{ value: '2.5', suffix: 'M', label: 'Happy Customers' },
		{ value: '180', suffix: '+', label: 'Countries Served' },
		{ value: '99.9', suffix: '%', label: 'Uptime' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="p-8 @md:p-12 @xl:p-16">
					<div className="grid gap-8 @sm:grid-cols-2 @lg:gap-12 @xl:grid-cols-4">
						{stats.map((stat, i) => (
							<CounterStat key={i} {...stat} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
