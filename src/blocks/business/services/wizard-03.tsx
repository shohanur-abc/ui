'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building2, Briefcase, Code2, Users, Calendar, Send } from 'lucide-react';
import { ComponentType, useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<OnboardingWizard
					steps={[
						{
							icon: Building2,
							title: 'About Your Company',
							subtitle: 'Tell us about your organization',
							questions: [
								{ label: 'Company Name', placeholder: 'Enter company name' },
								{ label: 'Industry', placeholder: 'Select your industry' },
								{ label: 'Company Size', placeholder: 'Number of employees' },
							],
						},
						{
							icon: Briefcase,
							title: 'Project Details',
							subtitle: 'What are you looking to build?',
							questions: [
								{ label: 'Project Type', placeholder: 'Select project type' },
								{ label: 'Brief Description', placeholder: 'Describe your project' },
								{ label: 'Target Users', placeholder: 'Who will use this?' },
							],
						},
						{
							icon: Code2,
							title: 'Technical Requirements',
							subtitle: 'Any specific tech preferences?',
							questions: [
								{ label: 'Preferred Stack', placeholder: 'Select or specify' },
								{ label: 'Integrations', placeholder: 'Required integrations' },
								{ label: 'Hosting Preference', placeholder: 'Cloud provider' },
							],
						},
						{
							icon: Users,
							title: 'Team & Resources',
							subtitle: 'How would you like to work with us?',
							questions: [
								{ label: 'Engagement Model', placeholder: 'Project-based or team' },
								{ label: 'Your Team Involvement', placeholder: 'Full collaboration or handoff' },
								{ label: 'Decision Makers', placeholder: 'Key stakeholders' },
							],
						},
						{
							icon: Calendar,
							title: 'Timeline & Budget',
							subtitle: 'When do you need it?',
							questions: [
								{ label: 'Start Date', placeholder: 'When to begin' },
								{ label: 'Deadline', placeholder: 'Target completion' },
								{ label: 'Budget Range', placeholder: 'Select range' },
							],
						},
						{
							icon: Send,
							title: 'Contact Information',
							subtitle: 'How can we reach you?',
							questions: [
								{ label: 'Your Name', placeholder: 'Full name' },
								{ label: 'Email', placeholder: 'Work email' },
								{ label: 'Phone', placeholder: 'Optional' },
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface WizardQuestion {
	label: string;
	placeholder: string;
}

interface WizardStep {
	icon: ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
	questions: WizardQuestion[];
}

const OnboardingWizard = ({ steps }: { steps: WizardStep[] }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const current = steps[currentStep];
	const Icon = current.icon;

	const isLastStep = currentStep === steps.length - 1;

	return (
		<div className="max-w-2xl mx-auto">
			{/* Step indicators */}
			<div className="flex items-center justify-center gap-2 mb-8">
				{steps.map((step, i) => {
					const StepIcon = step.icon;
					const isCompleted = i < currentStep;
					const isCurrent = i === currentStep;

					return (
						<button
							key={i}
							onClick={() => setCurrentStep(i)}
							className={`size-10 rounded-full flex items-center justify-center transition-all ${
								isCompleted || isCurrent
									? 'bg-primary text-primary-foreground'
									: 'bg-muted text-muted-foreground hover:bg-muted/80'
							} ${isCurrent ? 'scale-110 ring-2 ring-primary ring-offset-2' : ''}`}
						>
							<StepIcon className="size-5" />
						</button>
					);
				})}
			</div>

			{/* Current step */}
			<Card className="py-0">
				<CardContent className="p-6 @md:p-8">
					<div className="text-center mb-8">
						<Badge variant="secondary" className="mb-3">
							Step {currentStep + 1} of {steps.length}
						</Badge>
						<div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
							<Icon className="size-8 text-primary" />
						</div>
						<h2 className="text-2xl font-bold mb-2">{current.title}</h2>
						<p className="text-muted-foreground">{current.subtitle}</p>
					</div>

					<div className="space-y-4 mb-8">
						{current.questions.map((question, i) => (
							<div key={i}>
								<label className="block text-sm font-medium mb-2">
									{question.label}
								</label>
								<input
									type="text"
									placeholder={question.placeholder}
									className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
								/>
							</div>
						))}
					</div>

					<div className="flex items-center justify-between">
						<Button
							variant="ghost"
							onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
							disabled={currentStep === 0}
						>
							<ArrowLeft className="size-4" />
							Back
						</Button>

						{isLastStep ? (
							<Button asChild>
								<Link href="/thank-you">
									Submit
									<Send className="size-4" />
								</Link>
							</Button>
						) : (
							<Button onClick={() => setCurrentStep(currentStep + 1)}>
								Continue
								<ArrowRight className="size-4" />
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
