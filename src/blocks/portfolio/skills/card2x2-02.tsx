import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cloud, Code2, Database, Shield } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleBlock
					eyebrow="Expertise"
					title="Technical Domains"
					description="Specialized knowledge across key areas"
				/>

				<Grid2x2
					cards={[
						{
							icon: Code2,
							title: 'Web Development',
							metrics: [
								{ label: 'React/Next.js', value: 95 },
								{ label: 'TypeScript', value: 92 },
								{ label: 'Performance', value: 88 },
							],
						},
						{
							icon: Database,
							title: 'Data Engineering',
							metrics: [
								{ label: 'PostgreSQL', value: 88 },
								{ label: 'Data Modeling', value: 85 },
								{ label: 'Optimization', value: 82 },
							],
						},
						{
							icon: Cloud,
							title: 'Cloud Architecture',
							metrics: [
								{ label: 'AWS', value: 85 },
								{ label: 'Serverless', value: 82 },
								{ label: 'Infrastructure', value: 78 },
							],
						},
						{
							icon: Shield,
							title: 'Security',
							metrics: [
								{ label: 'Authentication', value: 88 },
								{ label: 'Encryption', value: 82 },
								{ label: 'Best Practices', value: 85 },
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface TitleBlockProps {
	eyebrow: string;
	title: string;
	description: string;
}

const TitleBlock = ({ eyebrow, title, description }: TitleBlockProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{description}
		</p>
	</div>
);

interface Metric {
	label: string;
	value: number;
}

interface GridCard {
	icon: ComponentType<{ className?: string }>;
	title: string;
	metrics: Metric[];
}

const Grid2x2 = ({ cards }: { cards: GridCard[] }) => (
	<div className="grid @md:grid-cols-2 gap-6 max-w-4xl mx-auto">
		{cards.map((card, i) => (
			<MetricsCard key={i} {...card} />
		))}
	</div>
);

const MetricsCard = ({ icon: Icon, title, metrics }: GridCard) => (
	<Card className="group hover:border-primary/50 transition-all duration-300">
		<CardContent className="p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
					<Icon className="size-5 text-primary" />
				</div>
				<h3 className="text-lg font-bold">{title}</h3>
			</div>
			<div className="space-y-4">
				{metrics.map(({ label, value }, i) => (
					<div key={i}>
						<div className="flex justify-between text-sm mb-1.5">
							<span className="font-medium">{label}</span>
							<span className="text-muted-foreground">{value}%</span>
						</div>
						<Progress value={value} className="h-2" />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);
