import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, PieChart, LineChart, Activity, type LucideIcon } from 'lucide-react';

interface StatItemProps {
	icon: LucideIcon;
	label: string;
	value: string;
	description: string;
	span?: 'default' | 'wide' | 'tall';
}

const StatCard = ({ icon: Icon, label, value, description, span = 'default' }: StatItemProps) => {
	const spanClasses = {
		default: '',
		wide: '@md:col-span-2',
		tall: '@md:row-span-2',
	};

	return (
		<Card className={`group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-lg ${spanClasses[span]}`}>
			<div className="absolute -right-4 -top-4 size-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl transition-all duration-500 group-hover:from-primary/20" />
			<div className="relative flex h-full flex-col justify-between gap-4">
				<div className="flex items-start justify-between">
					<Badge variant="outline" className="gap-1.5 font-medium">
						<Icon className="size-3.5" />
						{label}
					</Badge>
				</div>
				<div className="space-y-2">
					<p className="text-4xl font-bold tracking-tighter @md:text-5xl">{value}</p>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		</Card>
	);
};

export default function Main() {
	const stats: StatItemProps[] = [
		{ icon: BarChart3, label: 'Revenue', value: '$1.2M', description: 'Total yearly revenue across all channels', span: 'wide' },
		{ icon: PieChart, label: 'Market Share', value: '24.8%', description: 'Industry market share' },
		{ icon: LineChart, label: 'Growth', value: '+147%', description: 'Year over year growth' },
		{ icon: Activity, label: 'Active Users', value: '84.2K', description: 'Monthly active customers worldwide', span: 'wide' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @lg:gap-6 @xl:grid-cols-4">
					{stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
