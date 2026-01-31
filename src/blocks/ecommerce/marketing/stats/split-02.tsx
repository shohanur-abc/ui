import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Rocket, Shield, Zap, type LucideIcon } from 'lucide-react';

interface StatItemProps {
	icon: LucideIcon;
	label: string;
	value: string;
	progress: number;
	target: string;
}

interface HeaderProps {
	title: string;
	subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => (
	<div className="space-y-4">
		<h2 className="text-3xl font-bold tracking-tight @sm:text-4xl @xl:text-5xl">{title}</h2>
		<p className="text-lg text-muted-foreground">{subtitle}</p>
	</div>
);

const StatItem = ({ icon: Icon, label, value, progress, target }: StatItemProps) => (
	<div className="group space-y-3">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-primary/10 p-2 transition-colors duration-300 group-hover:bg-primary/15">
				<Icon className="size-4 text-primary" />
			</div>
			<span className="text-sm font-medium">{label}</span>
		</div>
		<div className="flex items-baseline gap-2">
			<span className="text-3xl font-bold tracking-tight">{value}</span>
			<span className="text-sm text-muted-foreground">/ {target}</span>
		</div>
		<Progress value={progress} className="h-2" />
	</div>
);

export default function Main() {
	const header: HeaderProps = {
		title: 'Q4 Performance',
		subtitle: 'Track our progress towards quarterly goals across key metrics.',
	};

	const stats: StatItemProps[] = [
		{ icon: Target, label: 'Revenue Target', value: '$8.4M', progress: 84, target: '$10M' },
		{ icon: Rocket, label: 'New Customers', value: '42K', progress: 70, target: '60K' },
		{ icon: Shield, label: 'Order Success', value: '98.2%', progress: 98, target: '99%' },
		{ icon: Zap, label: 'Platform Speed', value: '1.2s', progress: 92, target: '1.0s' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-12 @lg:grid-cols-2 @lg:gap-16 @xl:gap-24">
					<Header {...header} />
					<Card className="p-6 @md:p-8">
						<div className="space-y-8">
							{stats.map((stat, i) => (
								<StatItem key={i} {...stat} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
