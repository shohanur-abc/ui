import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	BarChart3,
	LineChart,
	PieChart,
	TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface MetricItem {
	icon: ComponentType<{ className?: string }>;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
					<MetricsDisplay
						items={[
							{
								icon: TrendingUp,
								label: 'Revenue Growth',
								value: '$2.4M',
								change: '+24%',
								positive: true,
							},
							{
								icon: BarChart3,
								label: 'Active Users',
								value: '48.2K',
								change: '+18%',
								positive: true,
							},
							{
								icon: LineChart,
								label: 'Conversion Rate',
								value: '3.8%',
								change: '+0.6%',
								positive: true,
							},
							{
								icon: PieChart,
								label: 'Market Share',
								value: '12.4%',
								change: '+2.1%',
								positive: true,
							},
						]}
					/>
					<div>
						<Eyebrow icon={BarChart3} text="Advanced Analytics" />
						<Title
							text="Data-Driven Insights for"
							highlight="Smarter Decisions"
						/>
						<Description text="Transform raw data into actionable intelligence with our AI-powered analytics platform. Visualize trends, predict outcomes, and optimize performance in real-time." />
						<CTAButtons
							primaryLabel="Explore Analytics"
							primaryHref="/analytics"
							secondaryLabel="View Demo"
							secondaryHref="/demo"
						/>
					</div>
				</div>
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
	<h2 className="mb-4 @md:mb-5 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight leading-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="mb-6 @md:mb-8 text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const CTAButtons = ({
	primaryLabel,
	primaryHref,
	secondaryLabel,
	secondaryHref,
}: {
	primaryLabel: string;
	primaryHref: string;
	secondaryLabel: string;
	secondaryHref: string;
}) => (
	<div className="flex flex-wrap gap-3">
		<Button size="lg" className="gap-2" asChild>
			<Link href={primaryHref}>
				{primaryLabel}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
		<Button size="lg" variant="outline" asChild>
			<Link href={secondaryHref}>{secondaryLabel}</Link>
		</Button>
	</div>
);

const MetricsDisplay = ({ items }: { items: MetricItem[] }) => (
	<div className="grid gap-4 @sm:grid-cols-2">
		{items.map((item) => (
			<Card
				key={item.label}
				className="border-border/50 transition-all hover:border-primary/30 hover:shadow-md"
			>
				<CardContent className="p-5 @md:p-6">
					<div className="mb-3 flex items-center justify-between">
						<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
							<item.icon className="size-5 text-primary" />
						</div>
						<span
							className={`text-sm font-medium ${item.positive ? 'text-emerald-500' : 'text-red-500'}`}
						>
							{item.change}
						</span>
					</div>
					<p className="text-2xl @md:text-3xl font-bold mb-1">{item.value}</p>
					<p className="text-sm text-muted-foreground">{item.label}</p>
				</CardContent>
			</Card>
		))}
	</div>
);
