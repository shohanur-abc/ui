import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Award, Layers } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @xl:grid-cols-2 gap-12 @xl:gap-16 items-center">
					<Card className="overflow-hidden">
						<CardContent className="p-0">
							<div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
								<h3 className="text-2xl font-bold mb-6">2024 Goals Progress</h3>
								<div className="space-y-6">
									<GoalProgress
										goal="Ship Design System v4"
										progress={85}
										status="On Track"
									/>
									<GoalProgress
										goal="Mentor 5 Engineers"
										progress={100}
										status="Completed"
									/>
									<GoalProgress
										goal="Reduce Build Time by 50%"
										progress={60}
										status="In Progress"
									/>
									<GoalProgress
										goal="Present at 3 Conferences"
										progress={66}
										status="On Track"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<div>
						<Eyebrow icon={Target} text="Goals" />
						<Title text="What I'm Working On" />
						<Description text="Current focus areas and objectives I'm actively pursuing this year." />

						<div className="grid grid-cols-2 gap-4 mt-8">
							<MetricCard
								icon={TrendingUp}
								value="85%"
								label="Goals on Track"
							/>
							<MetricCard icon={Award} value="3/5" label="Completed" />
							<MetricCard icon={Layers} value="2" label="In Progress" />
							<MetricCard icon={Target} value="Q4" label="Target Completion" />
						</div>
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
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface GoalProgressProps {
	goal: string;
	progress: number;
	status: string;
}

const GoalProgress = ({ goal, progress, status }: GoalProgressProps) => (
	<div>
		<div className="flex items-center justify-between mb-2">
			<span className="text-sm font-medium">{goal}</span>
			<Badge
				variant={progress === 100 ? 'default' : 'secondary'}
				className="text-xs"
			>
				{status}
			</Badge>
		</div>
		<Progress value={progress} className="h-2" />
		<p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
	</div>
);

interface MetricCardProps {
	icon: ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

const MetricCard = ({ icon: Icon, value, label }: MetricCardProps) => (
	<div className="p-4 bg-muted/50 rounded-lg border">
		<Icon className="size-5 text-primary mb-2" />
		<p className="text-2xl font-bold">{value}</p>
		<p className="text-xs text-muted-foreground">{label}</p>
	</div>
);
