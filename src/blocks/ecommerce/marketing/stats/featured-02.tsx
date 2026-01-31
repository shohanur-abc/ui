import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, TrendingUp, type LucideIcon } from 'lucide-react';

interface MainStatProps {
	icon: LucideIcon;
	badge: string;
	value: string;
	label: string;
	progress: number;
	target: string;
}

interface SupportStatProps {
	value: string;
	label: string;
	change: string;
}

const MainStat = ({ icon: Icon, badge, value, label, progress, target }: MainStatProps) => (
	<Card className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground @md:col-span-2 @md:p-10">
		<div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-3xl" />
		<div className="relative space-y-6">
			<div className="flex items-center justify-between">
				<Badge className="bg-white/20 text-white hover:bg-white/30">{badge}</Badge>
				<Icon className="size-8 opacity-50" />
			</div>
			<div>
				<p className="text-5xl font-bold tracking-tighter @sm:text-6xl">{value}</p>
				<p className="mt-2 text-lg opacity-80">{label}</p>
			</div>
			<div className="space-y-2">
				<Progress value={progress} className="h-2 bg-white/20" />
				<p className="text-sm opacity-70">{target}</p>
			</div>
		</div>
	</Card>
);

const SupportStat = ({ value, label, change }: SupportStatProps) => (
	<Card className="group p-6 transition-all duration-300 hover:shadow-md">
		<div className="space-y-3">
			<div className="flex items-center gap-1">
				<TrendingUp className="size-4 text-accent" />
				<span className="text-sm font-medium text-accent">{change}</span>
			</div>
			<p className="text-3xl font-bold tracking-tight">{value}</p>
			<p className="text-sm text-muted-foreground">{label}</p>
		</div>
	</Card>
);

export default function Main() {
	const mainStat: MainStatProps = {
		icon: Crown,
		badge: 'Record Breaking',
		value: '$4.2M',
		label: 'This Month\'s Revenue',
		progress: 87,
		target: '87% of monthly target reached',
	};

	const supportStats: SupportStatProps[] = [
		{ value: '12,847', label: 'Total Orders', change: '+24%' },
		{ value: '4,284', label: 'New Customers', change: '+18%' },
		{ value: '$328', label: 'Avg. Order Value', change: '+12%' },
		{ value: '98.4%', label: 'Satisfaction Rate', change: '+2%' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @lg:gap-6 @xl:grid-cols-3">
					<MainStat {...mainStat} />
					{supportStats.map((stat, i) => (
						<SupportStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
