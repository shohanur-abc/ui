import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	BarChart2,
	CircleDollarSign,
	Sparkles,
	Target,
	TrendingUp,
	Users,
} from 'lucide-react';
import { ComponentType } from 'react';

interface StatItem {
	icon: ComponentType<{ className?: string }>;
	value: string;
	label: string;
	trend?: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={TrendingUp} text="Impact Metrics" />
					<Title
						text="Measurable Results That"
						highlight="Speak for Themselves"
					/>
					<Description text="Our platform delivers real, quantifiable improvements for businesses of all sizes." />
				</div>

				<StatsCardGrid
					items={[
						{
							icon: Users,
							value: '2.5M+',
							label: 'Active Users',
							trend: '+28% MoM',
						},
						{
							icon: CircleDollarSign,
							value: '$4.2B',
							label: 'Transactions Processed',
							trend: '+42% YoY',
						},
						{ icon: Target, value: '99.99%', label: 'Uptime SLA' },
						{
							icon: BarChart2,
							value: '73%',
							label: 'Efficiency Improvement',
							trend: 'Average',
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
		<Badge variant="secondary" className="gap-2 px-3 py-1">
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

const StatsCardGrid = ({ items }: { items: StatItem[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-4">
		{items.map((item) => (
			<Card
				key={item.label}
				className="border-border/50 bg-card/50 backdrop-blur-sm text-center overflow-hidden"
			>
				<CardContent className="p-6 @md:p-8 relative">
					<div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
					<div className="mb-4 mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
						<item.icon className="size-7 text-primary" />
					</div>
					<p className="text-3xl @md:text-4xl font-bold text-primary mb-1">
						{item.value}
					</p>
					<p className="text-sm text-muted-foreground mb-2">{item.label}</p>
					{item.trend && (
						<Badge
							variant="outline"
							className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
						>
							{item.trend}
						</Badge>
					)}
				</CardContent>
			</Card>
		))}
	</div>
);
