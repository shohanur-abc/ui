import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronRight } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Project Phases" />
					<Title text="Development Lifecycle" />
					<Description text="A structured approach ensuring quality at every stage." />
				</div>

				<PhaseWizard
					phases={[
						{
							phase: 'Discovery',
							tasks: [
								'Requirements gathering',
								'User research',
								'Technical analysis',
								'Project scoping',
							],
							status: 'completed',
						},
						{
							phase: 'Design',
							tasks: [
								'Wireframing',
								'UI design',
								'Prototype creation',
								'Design review',
							],
							status: 'completed',
						},
						{
							phase: 'Development',
							tasks: [
								'Frontend build',
								'Backend API',
								'Database setup',
								'Integration',
							],
							status: 'current',
						},
						{
							phase: 'Launch',
							tasks: [
								'Testing & QA',
								'Performance tuning',
								'Deployment',
								'Monitoring',
							],
							status: 'upcoming',
						},
					]}
				/>
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

type PhaseStatus = 'completed' | 'current' | 'upcoming';

interface PhaseItem {
	phase: string;
	tasks: string[];
	status: PhaseStatus;
}

const PhaseWizard = ({ phases }: { phases: PhaseItem[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-0">
		{phases.map(({ phase, tasks, status }, i) => (
			<div key={i} className="relative">
				{i < phases.length - 1 && (
					<ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 size-6 text-muted-foreground hidden @xl:block" />
				)}

				<Card
					className={`py-0 h-full ${
						status === 'current' ? 'border-primary shadow-md' : ''
					} ${status === 'upcoming' ? 'opacity-60' : ''}`}
				>
					<CardContent className="p-5 @md:p-6">
						<div className="flex items-center gap-3 mb-4">
							<div
								className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${
									status === 'completed'
										? 'bg-primary text-primary-foreground'
										: status === 'current'
											? 'bg-primary/20 text-primary border-2 border-primary'
											: 'bg-muted text-muted-foreground'
								}`}
							>
								{status === 'completed' ? <Check className="size-4" /> : i + 1}
							</div>
							<div>
								<h3 className="font-bold">{phase}</h3>
								<Badge
									variant={status === 'current' ? 'default' : 'outline'}
									className="text-xs mt-0.5"
								>
									{status === 'completed'
										? 'Complete'
										: status === 'current'
											? 'In Progress'
											: 'Upcoming'}
								</Badge>
							</div>
						</div>

						<ul className="space-y-2">
							{tasks.map((task, j) => (
								<li key={j} className="flex items-center gap-2 text-sm">
									<div
										className={`size-1.5 rounded-full ${
											status === 'completed'
												? 'bg-primary'
												: status === 'current'
													? 'bg-primary/50'
													: 'bg-muted-foreground/30'
										}`}
									/>
									<span
										className={
											status === 'upcoming' ? 'text-muted-foreground' : ''
										}
									>
										{task}
									</span>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</div>
		))}
	</div>
);
