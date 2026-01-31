import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<HorizontalStats
					eyebrow="Impact"
					title="By the Numbers"
					items={[
						{ value: '150+', label: 'Projects Completed' },
						{ value: '50+', label: 'Happy Clients' },
						{ value: '8+', label: 'Years Experience' },
						{ value: '1M+', label: 'Users Served' },
					]}
				/>
			</div>
		</section>
	);
}

interface StatItem {
	value: string;
	label: string;
}

interface HorizontalStatsProps {
	eyebrow: string;
	title: string;
	items: StatItem[];
}

const HorizontalStats = ({ eyebrow, title, items }: HorizontalStatsProps) => (
	<div className="text-center">
		<Badge variant="outline" className="mb-3 @md:mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-10 @md:mb-14">
			{title}
		</h2>

		<div className="flex flex-wrap items-center justify-center gap-6 @md:gap-0">
			{items.map(({ value, label }, i) => (
				<div key={i} className="flex items-center">
					<div className="px-6 @md:px-10 @xl:px-14">
						<div className="text-4xl @sm:text-5xl @md:text-6xl font-bold text-primary mb-2">
							{value}
						</div>
						<div className="text-sm @md:text-base text-muted-foreground">
							{label}
						</div>
					</div>
					{i < items.length - 1 && (
						<Separator
							orientation="vertical"
							className="h-16 @md:h-20 hidden @md:block"
						/>
					)}
				</div>
			))}
		</div>
	</div>
);
