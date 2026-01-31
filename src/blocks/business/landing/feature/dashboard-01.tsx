import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Activity,
	ArrowUp,
	BarChart3,
	DollarSign,
	ShoppingCart,
	Users,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

interface DashboardStat {
	icon: ComponentType<{ className?: string }>;
	label: string;
	value: string;
	change: string;
	changeType: 'positive' | 'negative' | 'neutral';
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={BarChart3} text="Analytics Dashboard" />
					<Title text="Real-Time Insights" highlight="At a Glance" />
					<Description text="Track key metrics and make data-driven decisions with our powerful analytics dashboard." />
				</div>

				<DashboardPreview
					stats={[
						{
							icon: DollarSign,
							label: 'Revenue',
							value: '$124.5K',
							change: '+12.5%',
							changeType: 'positive',
						},
						{
							icon: Users,
							label: 'Active Users',
							value: '8,429',
							change: '+8.2%',
							changeType: 'positive',
						},
						{
							icon: ShoppingCart,
							label: 'Orders',
							value: '1,847',
							change: '+23.1%',
							changeType: 'positive',
						},
						{
							icon: Activity,
							label: 'Conversion',
							value: '3.24%',
							change: '-0.4%',
							changeType: 'negative',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const DashboardPreview = ({ stats }: { stats: DashboardStat[] }) => {
	const changeColors = {
		positive: 'text-emerald-500 bg-emerald-500/10',
		negative: 'text-red-500 bg-red-500/10',
		neutral: 'text-muted-foreground bg-muted',
	};

	return (
		<Card className="border-border/50 shadow-xl overflow-hidden">
			<CardContent className="p-0">
				{/* Dashboard header */}
				<div className="p-4 @md:p-6 border-b border-border/50 bg-muted/30">
					<div className="flex items-center justify-between">
						<h3 className="font-semibold">Overview Dashboard</h3>
						<Badge variant="secondary">Last 30 days</Badge>
					</div>
				</div>

				{/* Stats grid */}
				<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 divide-y @sm:divide-y-0 @sm:divide-x divide-border/50">
					{stats.map((stat) => (
						<div key={stat.label} className="p-4 @md:p-6">
							<div className="flex items-center gap-3 mb-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<stat.icon className="size-5 text-primary" />
								</div>
								<span className="text-sm text-muted-foreground">
									{stat.label}
								</span>
							</div>
							<p className="text-2xl @md:text-3xl font-bold mb-1">
								{stat.value}
							</p>
							<div
								className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${changeColors[stat.changeType]}`}
							>
								<ArrowUp
									className={`size-3 ${stat.changeType === 'negative' ? 'rotate-180' : ''}`}
								/>
								{stat.change}
							</div>
						</div>
					))}
				</div>

				{/* Chart placeholder */}
				<div className="p-4 @md:p-6 bg-muted/20">
					<div className="flex items-end gap-2 h-32">
						{[40, 65, 45, 80, 55, 70, 60, 85, 75, 90, 65, 95].map(
							(height, i) => (
								<div
									key={i}
									className="flex-1 rounded-t bg-primary/30 transition-all hover:bg-primary/50"
									style={{ height: `${height}%` }}
								/>
							),
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
