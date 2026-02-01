import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface StatItemProps {
	value: string;
	label: string;
	sublabel: string;
}

const StatItem = ({ value, label, sublabel }: StatItemProps) => (
	<div className="group flex-1 p-6 text-center transition-colors hover:bg-secondary/30 @md:p-8">
		<p className="text-4xl font-bold tracking-tighter @sm:text-5xl">{value}</p>
		<p className="mt-2 font-medium">{label}</p>
		<p className="mt-1 text-xs text-muted-foreground">{sublabel}</p>
	</div>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{ value: '2.4M', label: 'Active Users', sublabel: '+124K this month' },
		{ value: '$84M', label: 'GMV', sublabel: 'Gross merchandise value' },
		{ value: '99.9%', label: 'Uptime', sublabel: 'Last 365 days' },
		{ value: '150+', label: 'Countries', sublabel: 'Global coverage' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="flex flex-col overflow-hidden @lg:flex-row">
					{stats.map((stat, i) => (
						<div key={i} className="flex flex-1 flex-col @lg:flex-row">
							<StatItem {...stat} />
							{i < stats.length - 1 && (
								<>
									<Separator className="@lg:hidden" />
									<Separator
										orientation="vertical"
										className="hidden self-center h-16 @lg:block"
									/>
								</>
							)}
						</div>
					))}
				</Card>
			</div>
		</section>
	);
}
