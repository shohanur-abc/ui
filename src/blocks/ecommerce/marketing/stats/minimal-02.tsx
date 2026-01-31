interface StatItemProps {
	value: string;
	label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
	<div className="group text-center">
		<p className="text-5xl font-bold tracking-tighter transition-transform duration-300 group-hover:scale-105 @sm:text-6xl @lg:text-7xl">
			{value}
		</p>
		<p className="mt-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
			{label}
		</p>
	</div>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{ value: '50M+', label: 'Downloads' },
		{ value: '4.9★', label: 'App Rating' },
		{ value: '180+', label: 'Countries' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-20 @sm:px-6 @md:py-28 @xl:py-32 @2xl:px-8">
				<div className="grid gap-12 @sm:grid-cols-3 @lg:gap-16">
					{stats.map((stat, i) => (
						<StatItem key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
