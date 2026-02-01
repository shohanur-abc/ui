'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, FileText, Lightbulb, Rocket, Settings, Users } from 'lucide-react';
import { ComponentType, useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Get Started" />
					<Title text="Your Journey Begins" />
					<Description text="Follow our simple process to start your project." />
				</div>

				<ServiceWizard
					steps={[
						{
							icon: Lightbulb,
							title: 'Tell Us Your Idea',
							description:
								'Share your vision, goals, and challenges. We want to understand what you\'re trying to achieve and how we can help.',
							fields: ['Project description', 'Business goals', 'Target audience', 'Timeline expectations'],
						},
						{
							icon: FileText,
							title: 'Review Proposal',
							description:
								'We\'ll create a detailed proposal outlining scope, timeline, and investment. Ask questions and provide feedback.',
							fields: ['Scope document', 'Project timeline', 'Cost estimate', 'Team composition'],
						},
						{
							icon: Users,
							title: 'Meet Your Team',
							description:
								'Get introduced to the dedicated team who will bring your project to life. Establish communication channels.',
							fields: ['Team introductions', 'Communication setup', 'Tool access', 'Kickoff meeting'],
						},
						{
							icon: Settings,
							title: 'Development Begins',
							description:
								'We start building with regular updates and demos. You\'ll have full visibility into progress at every step.',
							fields: ['Sprint planning', 'Regular demos', 'Progress reports', 'Feedback loops'],
						},
						{
							icon: Rocket,
							title: 'Launch & Beyond',
							description:
								'Your product goes live with ongoing support. We continue to optimize and add features as needed.',
							fields: ['Go-live support', 'Training sessions', 'Documentation', 'Ongoing maintenance'],
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

interface WizardStep {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	fields: string[];
}

const ServiceWizard = ({ steps }: { steps: WizardStep[] }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const current = steps[currentStep];
	const Icon = current.icon;

	return (
		<div className="max-w-3xl mx-auto">
			{/* Progress bar */}
			<div className="flex items-center mb-8">
				{steps.map((step, i) => {
					const StepIcon = step.icon;
					const isCompleted = i < currentStep;
					const isCurrent = i === currentStep;

					return (
						<div key={i} className="flex items-center flex-1 last:flex-none">
							<button
								onClick={() => setCurrentStep(i)}
								className={`size-10 @md:size-12 rounded-full flex items-center justify-center transition-colors ${
									isCompleted
										? 'bg-primary text-primary-foreground'
										: isCurrent
											? 'bg-primary text-primary-foreground'
											: 'bg-muted text-muted-foreground'
								}`}
							>
								{isCompleted ? (
									<Check className="size-5" />
								) : (
									<StepIcon className="size-5" />
								)}
							</button>
							{i < steps.length - 1 && (
								<div
									className={`h-0.5 flex-1 mx-2 transition-colors ${
										i < currentStep ? 'bg-primary' : 'bg-border'
									}`}
								/>
							)}
						</div>
					);
				})}
			</div>

			{/* Current step content */}
			<Card className="py-0">
				<CardContent className="p-6 @md:p-8">
					<div className="flex items-center gap-4 mb-6">
						<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
							<Icon className="size-6 text-primary" />
						</div>
						<div>
							<Badge variant="secondary" className="mb-1">
								Step {currentStep + 1} of {steps.length}
							</Badge>
							<h3 className="text-xl font-bold">{current.title}</h3>
						</div>
					</div>

					<p className="text-muted-foreground mb-6">{current.description}</p>

					<div className="grid @sm:grid-cols-2 gap-3 mb-8">
						{current.fields.map((field, i) => (
							<div
								key={i}
								className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
							>
								<Check className="size-4 text-primary shrink-0" />
								<span className="text-sm">{field}</span>
							</div>
						))}
					</div>

					<div className="flex items-center justify-between">
						<Button
							variant="outline"
							onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
							disabled={currentStep === 0}
						>
							<ArrowLeft className="size-4" />
							Previous
						</Button>

						{currentStep === steps.length - 1 ? (
							<Button asChild>
								<Link href="/contact">
									Get Started
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						) : (
							<Button
								onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
							>
								Next
								<ArrowRight className="size-4" />
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
