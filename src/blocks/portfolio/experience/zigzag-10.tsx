import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Target, TrendingUp, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Target} text="Goals" />
					<Title text="2024 Objectives" />
					<Description text="What I'm working towards this year." />
				</div>

				<div className="max-w-5xl mx-auto space-y-12">
					<GoalZigzag
						goal="Ship Design System v4"
						description="Complete overhaul with new theming engine, improved accessibility, and 50 new components."
						progress={85}
						status="On Track"
						milestones={[
							'Architecture complete',
							'Core components done',
							'Testing in progress',
						]}
						align="left"
					/>
					<GoalZigzag
						goal="Mentor 5 Engineers"
						description="Help junior and mid-level engineers grow through structured mentorship."
						progress={100}
						status="Completed"
						milestones={[
							'Alex promoted to Senior',
							'Sarah to Staff',
							'Michael to Senior',
						]}
						align="right"
					/>
					<GoalZigzag
						goal="Reduce Build Time by 50%"
						description="Optimize CI/CD pipeline and build infrastructure for faster iteration."
						progress={60}
						status="In Progress"
						milestones={['Cache optimization done', 'Parallel builds enabled']}
						align="left"
					/>
					<GoalZigzag
						goal="Present at 3 Conferences"
						description="Share knowledge and represent the company at major tech conferences."
						progress={66}
						status="On Track"
						milestones={['React Summit keynote', 'Next.js Conf talk']}
						align="right"
					/>
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

interface GoalZigzagProps {
	goal: string;
	description: string;
	progress: number;
	status: string;
	milestones: string[];
	align: 'left' | 'right';
}

const GoalZigzag = ({
	goal,
	description,
	progress,
	status,
	milestones,
	align,
}: GoalZigzagProps) => (
	<div className={`grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center`}>
		<div className={`${align === 'right' ? '@lg:order-2' : ''}`}>
			<Badge
				variant={progress === 100 ? 'default' : 'secondary'}
				className="mb-4"
			>
				{status}
			</Badge>
			<h3 className="text-xl @md:text-2xl font-bold mb-2">{goal}</h3>
			<p className="text-muted-foreground mb-4">{description}</p>
			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span>Progress</span>
					<span className="font-medium">{progress}%</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>
		</div>
		<Card className={`${align === 'right' ? '@lg:order-1' : ''}`}>
			<CardContent className="p-6">
				<h4 className="text-sm font-medium mb-4">Milestones</h4>
				<ul className="space-y-3">
					{milestones.map((milestone, i) => (
						<li key={i} className="flex items-start gap-2 text-sm">
							<CheckCircle className="size-4 text-primary mt-0.5 shrink-0" />
							{milestone}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	</div>
);
