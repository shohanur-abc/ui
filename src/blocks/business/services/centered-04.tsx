'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<CenteredFAQ
					eyebrow="FAQ"
					title="Frequently Asked Questions"
					description="Everything you need to know about working with us."
					categories={[
						{
							name: 'Process',
							faqs: [
								{
									question: 'How do you start a new project?',
									answer:
										'We begin with a discovery phase to understand your goals, users, and requirements. This typically includes stakeholder interviews, market research, and technical assessment. From there, we create a detailed proposal with timeline and investment.',
								},
								{
									question: 'What is your development methodology?',
									answer:
										'We use Agile methodology with 2-week sprints. This allows for regular demos, feedback incorporation, and flexibility to adjust priorities as the project evolves. You\'ll have full visibility through our project management tools.',
								},
								{
									question: 'How long does a typical project take?',
									answer:
										'It depends on scope and complexity. A marketing website might take 4-6 weeks, while a full web application could be 3-6 months. We provide detailed timelines during the proposal phase.',
								},
							],
						},
						{
							name: 'Investment',
							faqs: [
								{
									question: 'How do you handle pricing?',
									answer:
										'We offer both fixed-price and time-and-materials engagements. For well-defined projects, fixed-price works best. For ongoing work or projects with evolving requirements, we recommend our dedicated team model.',
								},
								{
									question: 'What payment terms do you offer?',
									answer:
										'For project-based work, we typically require 30% upfront, 40% at midpoint, and 30% on delivery. For monthly retainers, we invoice at the beginning of each month. We accept bank transfer, credit card, and cryptocurrency.',
								},
							],
						},
						{
							name: 'Support',
							faqs: [
								{
									question: 'Do you provide ongoing support after launch?',
									answer:
										'Yes! Every project includes a 30-day warranty period for bug fixes. Beyond that, we offer flexible maintenance and support packages ranging from basic monitoring to 24/7 dedicated support.',
								},
								{
									question: 'What if something breaks in production?',
									answer:
										'All our support plans include incident response SLAs. For critical issues, we guarantee response within 1-4 hours depending on your plan. We also implement monitoring and alerting to catch issues proactively.',
								},
							],
						},
					]}
					cta={{
						title: "Still have questions?",
						description: "We're here to help. Schedule a call with our team.",
						button: { label: 'Contact Us', href: '/contact' },
					}}
				/>
			</div>
		</section>
	);
}

interface FAQ {
	question: string;
	answer: string;
}

interface FAQCategory {
	name: string;
	faqs: FAQ[];
}

interface CTA {
	title: string;
	description: string;
	button: { label: string; href: string };
}

const CenteredFAQ = ({
	eyebrow,
	title,
	description,
	categories,
	cta,
}: {
	eyebrow: string;
	title: string;
	description: string;
	categories: FAQCategory[];
	cta: CTA;
}) => (
	<div className="max-w-3xl mx-auto">
		<div className="text-center mb-10 @md:mb-14">
			<Badge variant="outline" className="mb-4">
				{eyebrow}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
				{title}
			</h2>
			<p className="text-lg text-muted-foreground">
				{description}
			</p>
		</div>

		{/* FAQ Categories */}
		<div className="space-y-8 @md:space-y-10">
			{categories.map((category, i) => (
				<div key={i}>
					<h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
						{category.name}
					</h3>
					<Accordion type="single" collapsible className="space-y-3">
						{category.faqs.map((faq, j) => (
							<AccordionItem
								key={j}
								value={`${i}-${j}`}
								className="border rounded-lg px-4 data-[state=open]:bg-muted/50"
							>
								<AccordionTrigger className="text-left py-4 hover:no-underline">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="pb-4 text-muted-foreground">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			))}
		</div>

		{/* CTA */}
		<div className="mt-10 @md:mt-14 p-6 @md:p-8 bg-muted/50 rounded-2xl text-center">
			<MessageCircle className="size-10 text-primary mx-auto mb-4" />
			<h3 className="text-xl font-bold mb-2">{cta.title}</h3>
			<p className="text-muted-foreground mb-6">{cta.description}</p>
			<Button asChild>
				<Link href={cta.button.href}>
					{cta.button.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);
