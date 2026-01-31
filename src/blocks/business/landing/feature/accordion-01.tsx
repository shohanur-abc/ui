'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { ComponentType } from 'react';

interface AccordionItemData {
	question: string;
	answer: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-start">
					<div className="@xl:sticky @xl:top-24">
						<Eyebrow icon={HelpCircle} text="FAQ" />
						<Title text="Frequently Asked" highlight="Questions" />
						<Description text="Get answers to the most common questions about our platform, pricing, and support." />
					</div>

					<FAQAccordion
						items={[
							{
								question:
									'What makes your platform different from competitors?',
								answer:
									'We offer a unique combination of ease-of-use and powerful features. Our platform is designed to be intuitive enough for beginners while providing the depth that power users need. Plus, our AI-powered automation sets us apart in the market.',
							},
							{
								question: 'How long does it take to get started?',
								answer:
									'Most users are up and running within 15 minutes. Our guided onboarding walks you through the essentials, and you can start seeing value from day one. For enterprise deployments, we offer dedicated implementation support.',
							},
							{
								question: 'Do you offer a free trial?',
								answer:
									'Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. You can also request a personalized demo to see how the platform works for your specific use case.',
							},
							{
								question: 'What kind of support do you provide?',
								answer:
									'All plans include email support with 24-hour response time. Pro plans get priority support with 4-hour response. Enterprise customers receive dedicated account management and 24/7 phone support.',
							},
							{
								question: 'Can I integrate with my existing tools?',
								answer:
									"Absolutely. We offer 500+ native integrations including Salesforce, HubSpot, Slack, and more. Our API and webhooks allow custom integrations, and we're also compatible with Zapier for additional flexibility.",
							},
							{
								question: 'Is my data secure with your platform?',
								answer:
									"Security is our top priority. We're SOC 2 Type II certified, GDPR compliant, and use AES-256 encryption. Your data is stored in secure data centers with 24/7 monitoring and regular security audits.",
							},
						]}
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
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const FAQAccordion = ({ items }: { items: AccordionItemData[] }) => (
	<Accordion
		type="single"
		collapsible
		defaultValue="item-0"
		className="space-y-3"
	>
		{items.map((item, index) => (
			<AccordionItem
				key={index}
				value={`item-${index}`}
				className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm px-4 @md:px-5 transition-all data-[state=open]:border-primary/30"
			>
				<AccordionTrigger className="text-left hover:no-underline py-4 @md:py-5">
					<span className="font-medium pr-4">{item.question}</span>
				</AccordionTrigger>
				<AccordionContent className="pb-4 @md:pb-5">
					<p className="text-sm @md:text-base text-muted-foreground leading-relaxed">
						{item.answer}
					</p>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
