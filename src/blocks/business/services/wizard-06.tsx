'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
	ArrowRight,
	ArrowLeft,
	Check,
	Clock,
	DollarSign,
	Palette,
	Rocket,
	Settings,
	Sparkles,
} from 'lucide-react';
import { ComponentType, useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<ProjectEstimator
					steps={[
						{
							title: 'Project Scope',
							icon: Palette,
							question: 'What type of project are you planning?',
							options: [
								{ label: 'Landing Page', value: 'landing', hours: 40, basePrice: 3000 },
								{ label: 'Marketing Website', value: 'marketing', hours: 80, basePrice: 6000 },
								{ label: 'Web Application', value: 'webapp', hours: 200, basePrice: 15000 },
								{ label: 'E-commerce Store', value: 'ecommerce', hours: 160, basePrice: 12000 },
								{ label: 'Mobile App', value: 'mobile', hours: 300, basePrice: 25000 },
							],
						},
						{
							title: 'Design Needs',
							icon: Sparkles,
							question: 'What level of design do you need?',
							options: [
								{ label: 'Use existing brand', value: 'existing', hours: 0, basePrice: 0 },
								{ label: 'Light refresh', value: 'refresh', hours: 20, basePrice: 2000 },
								{ label: 'New design system', value: 'new', hours: 60, basePrice: 5000 },
								{ label: 'Premium custom design', value: 'premium', hours: 100, basePrice: 10000 },
							],
						},
						{
							title: 'Features',
							icon: Settings,
							question: 'Select additional features needed',
							multiSelect: true,
							options: [
								{ label: 'User Authentication', value: 'auth', hours: 16, basePrice: 1500 },
								{ label: 'Payment Integration', value: 'payments', hours: 24, basePrice: 2500 },
								{ label: 'Admin Dashboard', value: 'admin', hours: 40, basePrice: 4000 },
								{ label: 'API Integration', value: 'api', hours: 20, basePrice: 2000 },
								{ label: 'Analytics & Reporting', value: 'analytics', hours: 24, basePrice: 2500 },
								{ label: 'Multi-language Support', value: 'i18n', hours: 16, basePrice: 1500 },
							],
						},
						{
							title: 'Timeline',
							icon: Clock,
							question: 'When do you need this completed?',
							options: [
								{ label: 'Flexible (3+ months)', value: 'flexible', multiplier: 1 },
								{ label: 'Standard (2-3 months)', value: 'standard', multiplier: 1.1 },
								{ label: 'Fast (1-2 months)', value: 'fast', multiplier: 1.25 },
								{ label: 'Rush (< 1 month)', value: 'rush', multiplier: 1.5 },
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface StepOption {
	label: string;
	value: string;
	hours?: number;
	basePrice?: number;
	multiplier?: number;
}

interface WizardStep {
	title: string;
	icon: ComponentType<{ className?: string }>;
	question: string;
	options: StepOption[];
	multiSelect?: boolean;
}

const ProjectEstimator = ({ steps }: { steps: WizardStep[] }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [selections, setSelections] = useState<Record<number, string | string[]>>({});

	const current = steps[currentStep];
	const Icon = current.icon;

	const handleSelect = (value: string) => {
		if (current.multiSelect) {
			const currentArr = (selections[currentStep] as string[]) || [];
			const isSelected = currentArr.includes(value);
			setSelections({
				...selections,
				[currentStep]: isSelected
					? currentArr.filter((v) => v !== value)
					: [...currentArr, value],
			});
		} else {
			setSelections({ ...selections, [currentStep]: value });
		}
	};

	const isSelected = (value: string) => {
		const sel = selections[currentStep];
		if (Array.isArray(sel)) return sel.includes(value);
		return sel === value;
	};

	const calculateEstimate = () => {
		let totalHours = 0;
		let totalPrice = 0;
		let multiplier = 1;

		steps.forEach((step, i) => {
			const sel = selections[i];
			if (!sel) return;

			const values = Array.isArray(sel) ? sel : [sel];
			values.forEach((v) => {
				const option = step.options.find((o) => o.value === v);
				if (option) {
					if (option.hours) totalHours += option.hours;
					if (option.basePrice) totalPrice += option.basePrice;
					if (option.multiplier) multiplier = option.multiplier;
				}
			});
		});

		return {
			hours: Math.ceil(totalHours * multiplier),
			price: Math.ceil(totalPrice * multiplier),
		};
	};

	const estimate = calculateEstimate();
	const isLastStep = currentStep === steps.length - 1;
	const canProceed = current.multiSelect
		? true // Multi-select can be empty
		: Boolean(selections[currentStep]);

	return (
		<div className="max-w-3xl mx-auto">
			{/* Progress */}
			<div className="flex items-center gap-2 mb-8">
				{steps.map((step, i) => {
					const StepIcon = step.icon;
					const isCompleted = i < currentStep || (i === currentStep && canProceed);
					const isCurrent = i === currentStep;

					return (
						<div key={i} className="flex items-center flex-1 last:flex-none">
							<button
								onClick={() => i <= currentStep && setCurrentStep(i)}
								disabled={i > currentStep}
								className={`size-10 rounded-full flex items-center justify-center transition-colors ${
									isCurrent
										? 'bg-primary text-primary-foreground'
										: isCompleted
											? 'bg-primary/20 text-primary'
											: 'bg-muted text-muted-foreground'
								}`}
							>
								<StepIcon className="size-5" />
							</button>
							{i < steps.length - 1 && (
								<div
									className={`h-0.5 flex-1 mx-2 ${
										i < currentStep ? 'bg-primary' : 'bg-border'
									}`}
								/>
							)}
						</div>
					);
				})}
			</div>

			<div className="grid @lg:grid-cols-5 gap-6">
				{/* Question */}
				<Card className="py-0 @lg:col-span-3">
					<CardContent className="p-6">
						<div className="flex items-center gap-3 mb-6">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
								<Icon className="size-5 text-primary" />
							</div>
							<div>
								<Badge variant="secondary">
									Step {currentStep + 1} of {steps.length}
								</Badge>
								<h3 className="font-bold">{current.title}</h3>
							</div>
						</div>

						<p className="text-lg mb-6">{current.question}</p>

						<div className="space-y-3 mb-6">
							{current.options.map((option) => (
								<button
									key={option.value}
									onClick={() => handleSelect(option.value)}
									className={`w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-colors ${
										isSelected(option.value)
											? 'border-primary bg-primary/5'
											: 'border-border hover:border-primary/50'
									}`}
								>
									<div
										className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
											isSelected(option.value)
												? 'border-primary bg-primary text-primary-foreground'
												: 'border-muted-foreground'
										}`}
									>
										{isSelected(option.value) && <Check className="size-3" />}
									</div>
									<span className="flex-1 font-medium">{option.label}</span>
									{option.basePrice && (
										<span className="text-sm text-muted-foreground">
											+${option.basePrice.toLocaleString()}
										</span>
									)}
								</button>
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
									<Link href="/contact">
										Get Full Quote
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							) : (
								<Button
									onClick={() => setCurrentStep(currentStep + 1)}
									disabled={!canProceed}
								>
									Continue
									<ArrowRight className="size-4" />
								</Button>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Estimate */}
				<div className="@lg:col-span-2">
					<Card className="py-0 border-primary sticky top-8">
						<CardContent className="p-5">
							<h4 className="font-bold mb-4 flex items-center gap-2">
								<DollarSign className="size-4 text-primary" />
								Live Estimate
							</h4>

							<div className="space-y-4 mb-6">
								<div className="p-4 bg-muted/50 rounded-lg">
									<div className="text-sm text-muted-foreground mb-1">
										Estimated Hours
									</div>
									<div className="text-2xl font-bold">{estimate.hours} hrs</div>
								</div>

								<div className="p-4 bg-primary/10 rounded-lg">
									<div className="text-sm text-muted-foreground mb-1">
										Estimated Investment
									</div>
									<div className="text-2xl font-bold text-primary">
										${estimate.price.toLocaleString()}
									</div>
								</div>
							</div>

							<p className="text-xs text-muted-foreground">
								* This is an estimate only. Final pricing will be determined
								after a detailed discovery call.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};
