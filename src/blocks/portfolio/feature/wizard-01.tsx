import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Circle, Loader2 } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Onboarding" />
					<Title text="Getting Started" />
					<Description text="A simple, transparent process to kick off our collaboration." />
				</div>

				<WizardSteps
					steps={[
						{
							number: 1,
							status: 'completed',
							title: 'Initial Consultation',
							description:
								'Free 30-minute call to discuss your project needs and goals.',
						},
						{
							number: 2,
							status: 'completed',
							title: 'Proposal & Quote',
							description:
								'Detailed proposal with scope, timeline, and pricing.',
						},
						{
							number: 3,
							status: 'current',
							title: 'Contract & Deposit',
							description: 'Sign the agreement and pay the initial deposit.',
						},
						{
							number: 4,
							status: 'upcoming',
							title: 'Kickoff',
							description: 'Project begins with a detailed kickoff meeting.',
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

type StepStatus = 'completed' | 'current' | 'upcoming';

interface StepItem {
	number: number;
	status: StepStatus;
	title: string;
	description: string;
}

const WizardSteps = ({ steps }: { steps: StepItem[] }) => (
	<div className="max-w-4xl mx-auto">
		<div className="relative">
			{/* Progress line */}
			<div className="absolute top-6 left-6 @md:left-1/2 @md:-translate-x-1/2 @md:top-6 h-[calc(100%-48px)] @md:h-px w-px @md:w-[calc(100%-200px)] bg-border" />

			<div className="grid @md:grid-cols-4 gap-6 @md:gap-4">
				{steps.map(({ number, status, title, description }, i) => (
					<div
						key={i}
						className="relative flex @md:flex-col items-start @md:items-center gap-4 @md:gap-0"
					>
						<div
							className={`relative z-10 size-12 rounded-full flex items-center justify-center shrink-0 @md:mb-4 ${
								status === 'completed'
									? 'bg-primary text-primary-foreground'
									: status === 'current'
										? 'bg-primary/20 text-primary border-2 border-primary'
										: 'bg-muted text-muted-foreground'
							}`}
						>
							{status === 'completed' ? (
								<Check className="size-5" />
							) : status === 'current' ? (
								<Loader2 className="size-5 animate-spin" />
							) : (
								<Circle className="size-5" />
							)}
						</div>

						<div className="@md:text-center">
							<div
								className={`text-xs font-medium uppercase tracking-wider mb-1 ${
									status === 'upcoming'
										? 'text-muted-foreground/50'
										: 'text-primary'
								}`}
							>
								Step {number}
							</div>
							<h3
								className={`font-semibold mb-1 ${
									status === 'upcoming' ? 'text-muted-foreground' : ''
								}`}
							>
								{title}
							</h3>
							<p
								className={`text-sm ${
									status === 'upcoming'
										? 'text-muted-foreground/70'
										: 'text-muted-foreground'
								}`}
							>
								{description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
);
