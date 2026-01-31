import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, TrendingUp, Users, Zap } from 'lucide-react';

interface LiveStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	subtext: string;
	live?: boolean;
}

const LiveStat = ({ icon: Icon, label, value, subtext, live }: LiveStatProps) => (
	<Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-md">
		{live && (
			<div className="absolute right-4 top-4">
				<span className="relative flex size-2">
					<span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
					<span className="relative inline-flex size-2 rounded-full bg-accent" />
				</span>
			</div>
		)}
		<div className="flex items-start gap-4">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="space-y-1">
				<p className="text-sm text-muted-foreground">{label}</p>
				<p className="text-2xl font-bold tracking-tight">{value}</p>
				<p className="text-xs text-muted-foreground">{subtext}</p>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const stats: LiveStatProps[] = [
		{ icon: Users, label: 'Active Visitors', value: '2,847', subtext: 'On site right now', live: true },
		{ icon: Activity, label: 'Orders/Hour', value: '142', subtext: 'Last 60 minutes', live: true },
		{ icon: Zap, label: 'Conversion Rate', value: '4.2%', subtext: 'Today\'s rate', live: true },
		{ icon: Clock, label: 'Avg. Session', value: '8m 42s', subtext: 'Time on site' },
		{ icon: TrendingUp, label: 'Today\'s Revenue', value: '$48,294', subtext: '+24% vs yesterday' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="mb-8 flex items-center gap-2">
					<Badge variant="secondary" className="gap-1.5">
						<span className="relative flex size-2">
							<span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
							<span className="relative inline-flex size-2 rounded-full bg-accent" />
						</span>
						Live Dashboard
					</Badge>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @xl:grid-cols-3 @3xl:grid-cols-5">
					{stats.map((stat, i) => (
						<LiveStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
