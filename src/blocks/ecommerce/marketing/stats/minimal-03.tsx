import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface StatItemProps {
	value: string;
	label: string;
	prefix?: string;
}

const StatItem = ({ value, label, prefix }: StatItemProps) => (
	<div className="space-y-2">
		<div className="flex items-baseline gap-1">
			{prefix && <span className="text-xl font-semibold text-primary">{prefix}</span>}
			<span className="text-4xl font-bold tracking-tight @sm:text-5xl">{value}</span>
		</div>
		<Separator className="w-12" />
		<p className="text-sm text-muted-foreground">{label}</p>
	</div>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{ prefix: '$', value: '284M', label: 'Annual revenue' },
		{ value: '12M', label: 'Orders shipped' },
		{ value: '98.4%', label: 'Customer satisfaction' },
		{ value: '24/7', label: 'Support available' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="p-8 @md:p-12">
					<div className="grid gap-10 @sm:grid-cols-2 @xl:grid-cols-4">
						{stats.map((stat, i) => (
							<StatItem key={i} {...stat} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
