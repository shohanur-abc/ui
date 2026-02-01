'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Check, HelpCircle, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Compare" />
					<Title text="Find Your Perfect Plan" />
					<Description text="Answer a few questions to discover which service tier best fits your needs." />
				</div>

				<PlanSelector
					questions={[
						{
							question: 'What best describes your organization?',
							options: ['Startup / Small Business', 'Growing Company', 'Enterprise'],
							weight: { Starter: 0, Professional: 1, Enterprise: 2 },
						},
						{
							question: 'How many users will need access?',
							options: ['1-10 users', '11-50 users', '50+ users'],
							weight: { Starter: 0, Professional: 1, Enterprise: 2 },
						},
						{
							question: 'What level of customization do you need?',
							options: ['Standard features work', 'Some customization', 'Fully tailored solution'],
							weight: { Starter: 0, Professional: 1, Enterprise: 2 },
						},
						{
							question: 'What support level do you require?',
							options: ['Email support is fine', 'Priority support', '24/7 dedicated support'],
							weight: { Starter: 0, Professional: 1, Enterprise: 2 },
						},
					]}
					plans={[
						{
							name: 'Starter',
							price: '$499',
							period: '/month',
							description: 'Perfect for small teams getting started',
							features: ['Up to 5 users', 'Core features', 'Email support', 'Weekly reports'],
							cta: 'Start Free Trial',
							href: '/signup/starter',
						},
						{
							name: 'Professional',
							price: '$999',
							period: '/month',
							description: 'Ideal for growing businesses',
							features: ['Up to 25 users', 'Advanced features', 'Priority support', 'Custom integrations', 'Daily reports'],
							cta: 'Get Started',
							href: '/signup/professional',
							highlighted: true,
						},
						{
							name: 'Enterprise',
							price: 'Custom',
							period: '',
							description: 'For large organizations',
							features: ['Unlimited users', 'All features', '24/7 support', 'Dedicated manager', 'SLA guarantee', 'On-premise option'],
							cta: 'Contact Sales',
							href: '/contact',
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

interface Question {
	question: string;
	options: string[];
	weight: Record<string, number>;
}

interface Plan {
	name: string;
	price: string;
	period: string;
	description: string;
	features: string[];
	cta: string;
	href: string;
	highlighted?: boolean;
}

const PlanSelector = ({
	questions,
	plans,
}: {
	questions: Question[];
	plans: Plan[];
}) => {
	const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
	const [showRecommendation, setShowRecommendation] = useState(false);
	const [expandedQuestion, setExpandedQuestion] = useState(0);

	const calculateRecommendation = () => {
		const scores: Record<string, number> = { Starter: 0, Professional: 0, Enterprise: 0 };

		answers.forEach((answer, i) => {
			if (answer >= 0) {
				Object.entries(questions[i].weight).forEach(([plan, weight]) => {
					if (answer === weight) {
						scores[plan] += 1;
					}
				});
			}
		});

		// Find highest score
		let maxPlan = 'Professional';
		let maxScore = 0;
		Object.entries(scores).forEach(([plan, score]) => {
			if (score > maxScore) {
				maxScore = score;
				maxPlan = plan;
			}
		});

		return maxPlan;
	};

	const recommendation = calculateRecommendation();
	const allAnswered = answers.every((a) => a >= 0);

	return (
		<div className="space-y-8">
			{/* Questions */}
			<Card className="py-0">
				<CardContent className="p-0">
					{questions.map((q, qIndex) => (
						<div key={qIndex} className="border-b last:border-b-0">
							<button
								onClick={() => setExpandedQuestion(expandedQuestion === qIndex ? -1 : qIndex)}
								className="w-full flex items-center justify-between p-4 @md:p-5 text-left"
							>
								<div className="flex items-center gap-3">
									<div
										className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
											answers[qIndex] >= 0
												? 'bg-primary text-primary-foreground'
												: 'bg-muted text-muted-foreground'
										}`}
									>
										{answers[qIndex] >= 0 ? <Check className="size-3" /> : qIndex + 1}
									</div>
									<span className="font-medium">{q.question}</span>
								</div>
								<ChevronDown
									className={`size-5 text-muted-foreground transition-transform ${
										expandedQuestion === qIndex ? 'rotate-180' : ''
									}`}
								/>
							</button>

							{expandedQuestion === qIndex && (
								<div className="px-4 @md:px-5 pb-4 @md:pb-5">
									<div className="grid @sm:grid-cols-3 gap-3">
										{q.options.map((option, oIndex) => (
											<button
												key={oIndex}
												onClick={() => {
													const newAnswers = [...answers];
													newAnswers[qIndex] = oIndex;
													setAnswers(newAnswers);
													// Move to next question
													if (qIndex < questions.length - 1) {
														setExpandedQuestion(qIndex + 1);
													}
												}}
												className={`p-3 rounded-lg border text-center text-sm transition-colors ${
													answers[qIndex] === oIndex
														? 'border-primary bg-primary/5 font-medium'
														: 'border-border hover:border-primary/50'
												}`}
											>
												{option}
											</button>
										))}
									</div>
								</div>
							)}
						</div>
					))}
				</CardContent>
			</Card>

			{/* Plans */}
			<div className="grid @md:grid-cols-3 gap-6">
				{plans.map((plan) => {
					const isRecommended = showRecommendation && plan.name === recommendation;

					return (
						<Card
							key={plan.name}
							className={`py-0 relative ${
								isRecommended ? 'border-primary shadow-lg ring-2 ring-primary/20' : ''
							}`}
						>
							{isRecommended && (
								<div className="absolute -top-3 left-1/2 -translate-x-1/2">
									<Badge className="bg-primary">Recommended for You</Badge>
								</div>
							)}

							<CardContent className="p-5 @md:p-6">
								<h3 className="text-xl font-bold mb-1">{plan.name}</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{plan.description}
								</p>

								<div className="mb-4">
									<span className="text-3xl font-bold">{plan.price}</span>
									<span className="text-muted-foreground">{plan.period}</span>
								</div>

								<ul className="space-y-2 mb-6">
									{plan.features.map((feature, i) => (
										<li key={i} className="flex items-center gap-2 text-sm">
											<Check className="size-4 text-primary shrink-0" />
											{feature}
										</li>
									))}
								</ul>

								<Button
									className="w-full"
									variant={isRecommended ? 'default' : 'outline'}
									asChild
								>
									<Link href={plan.href}>
										{plan.cta}
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{allAnswered && !showRecommendation && (
				<div className="text-center">
					<Button size="lg" onClick={() => setShowRecommendation(true)}>
						<HelpCircle className="size-4" />
						Show My Recommendation
					</Button>
				</div>
			)}
		</div>
	);
};
