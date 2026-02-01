import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Check, Circle, CircleDot } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-5 gap-8 @xl:gap-12">
					<div className="@xl:col-span-2">
						<Eyebrow text="Progress" />
						<Title text="Project Status" />
						<Description text="Track the progress of your project with our transparent milestone-based approach." />

						<div className="mt-6 p-4 bg-muted/50 rounded-xl">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium">Overall Progress</span>
								<span className="text-sm font-bold text-primary">65%</span>
							</div>
							<div className="h-2 bg-muted rounded-full overflow-hidden">
								<div
									className="h-full bg-primary rounded-full transition-all"
									style={{ width: '65%' }}
								/>
							</div>
						</div>

						<Button className="mt-6" asChild>
							<Link href="/dashboard">
								View Dashboard
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>

					<div className="@xl:col-span-3">
						<MilestoneTimeline
							items={[
								{
									title: 'Project Kickoff',
									date: 'Jan 15, 2024',
									status: 'completed',
									tasks: ['Contract signed', 'Team assigned', 'Kickoff meeting'],
								},
								{
									title: 'Discovery & Research',
									date: 'Jan 29, 2024',
									status: 'completed',
									tasks: ['User interviews', 'Market research', 'Requirements doc'],
								},
								{
									title: 'Design Phase',
									date: 'Feb 12, 2024',
									status: 'completed',
									tasks: ['Wireframes', 'UI designs', 'Prototype'],
								},
								{
									title: 'Development Sprint 1',
									date: 'Feb 26, 2024',
									status: 'current',
									tasks: ['Core features', 'API integration', 'Testing'],
								},
								{
									title: 'Development Sprint 2',
									date: 'Mar 11, 2024',
									status: 'upcoming',
									tasks: ['Advanced features', 'Performance optimization'],
								},
								{
									title: 'Launch',
									date: 'Mar 25, 2024',
									status: 'upcoming',
									tasks: ['Final QA', 'Deployment', 'Training'],
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface MilestoneItem {
	title: string;
	date: string;
	status: 'completed' | 'current' | 'upcoming';
	tasks: string[];
}

const MilestoneTimeline = ({ items }: { items: MilestoneItem[] }) => (
	<div className="relative">
		{/* Vertical line */}
		<div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />

		<div className="space-y-6">
			{items.map(({ title, date, status, tasks }, i) => (
				<div key={i} className="relative pl-10">
					{/* Status indicator */}
					<div className="absolute left-0 top-0">
						{status === 'completed' ? (
							<div className="size-6 rounded-full bg-primary flex items-center justify-center">
								<Check className="size-3 text-primary-foreground" />
							</div>
						) : status === 'current' ? (
							<div className="size-6 rounded-full bg-primary flex items-center justify-center animate-pulse">
								<CircleDot className="size-4 text-primary-foreground" />
							</div>
						) : (
							<div className="size-6 rounded-full bg-muted border flex items-center justify-center">
								<Circle className="size-3 text-muted-foreground" />
							</div>
						)}
					</div>

					<div
						className={`bg-card border rounded-xl p-4 ${
							status === 'current' ? 'border-primary shadow-md' : ''
						}`}
					>
						<div className="flex items-start justify-between gap-4 mb-2">
							<h3 className="font-semibold">{title}</h3>
							<Badge
								variant={
									status === 'completed'
										? 'default'
										: status === 'current'
											? 'secondary'
											: 'outline'
								}
								className="shrink-0"
							>
								{status === 'current' ? 'In Progress' : date}
							</Badge>
						</div>
						<div className="flex flex-wrap gap-2">
							{tasks.map((task, j) => (
								<span
									key={j}
									className={`text-xs px-2 py-1 rounded-full ${
										status === 'completed'
											? 'bg-primary/10 text-primary'
											: 'bg-muted text-muted-foreground'
									}`}
								>
									{task}
								</span>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);
