interface CounterStatProps {
	value: string;
	label: string;
	description: string;
}

const CounterStat = ({ value, label, description }: CounterStatProps) => (
	<div className="group relative border-l border-border pl-6 first:border-l-0 first:pl-0">
		<div className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 first:hidden" />
		<p className="text-4xl font-bold tracking-tighter @sm:text-5xl @lg:text-6xl">
			{value}
		</p>
		<p className="mt-2 text-sm font-semibold uppercase tracking-wider text-primary">
			{label}
		</p>
		<p className="mt-1 text-sm text-muted-foreground">{description}</p>
	</div>
);

export default function Main() {
	const stats: CounterStatProps[] = [
		{
			value: '$847M',
			label: 'GMV Processed',
			description: 'Gross merchandise value this year',
		},
		{
			value: '12M+',
			label: 'Orders Fulfilled',
			description: 'Successfully delivered worldwide',
		},
		{
			value: '4.9/5',
			label: 'Customer Rating',
			description: 'Based on 500K+ reviews',
		},
		{
			value: '24/7',
			label: 'Support',
			description: 'Available around the clock',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-8 @sm:grid-cols-2 @lg:gap-12 @xl:grid-cols-4">
					{stats.map((stat, i) => (
						<CounterStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
