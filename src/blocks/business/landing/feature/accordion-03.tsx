'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { ComponentType } from 'react';

interface FAQItem {
	question: string;
	answer: string;
	category: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={HelpCircle} text="FAQ" />
					<Title text="Got Questions?" highlight="We Have Answers" />
					<Description text="Browse our frequently asked questions or reach out to our support team." />
				</div>

				<div className="max-w-3xl mx-auto">
					<CategorizedFAQ
						items={[
							{
								category: 'Getting Started',
								question: 'How do I create an account?',
								answer:
									'Simply click the "Sign Up" button and follow the guided process. You can sign up with email or use SSO with Google or GitHub. The entire process takes less than 2 minutes.',
							},
							{
								category: 'Getting Started',
								question: 'Is there a free trial available?',
								answer:
									'Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. You can upgrade to a paid plan at any time during or after your trial.',
							},
							{
								category: 'Pricing',
								question: 'Can I change plans later?',
								answer:
									"Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the credit will be applied to future invoices.",
							},
							{
								category: 'Pricing',
								question: 'Do you offer refunds?',
								answer:
									"We offer a 30-day money-back guarantee for annual subscriptions. Monthly subscriptions can be cancelled at any time, and you won't be charged for the next period.",
							},
							{
								category: 'Features',
								question: 'What integrations do you support?',
								answer:
									'We support 500+ integrations including Salesforce, HubSpot, Slack, Jira, and many more. We also provide a robust API and webhooks for custom integrations.',
							},
							{
								category: 'Features',
								question: 'Is there a mobile app?',
								answer:
									'Yes, we have native iOS and Android apps available. They support all core features including real-time notifications, task management, and team collaboration.',
							},
						]}
					/>
				</div>

				<SupportCard />
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
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const CategorizedFAQ = ({ items }: { items: FAQItem[] }) => {
	const categories = [...new Set(items.map((item) => item.category))];

	return (
		<div className="space-y-8">
			{categories.map((category) => (
				<div key={category}>
					<h3 className="text-sm font-semibold text-primary mb-4">
						{category}
					</h3>
					<Accordion type="single" collapsible className="space-y-2">
						{items
							.filter((item) => item.category === category)
							.map((item, index) => (
								<AccordionItem
									key={index}
									value={`${category}-${index}`}
									className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm px-4 transition-all data-[state=open]:border-primary/30"
								>
									<AccordionTrigger className="text-left hover:no-underline py-4">
										<span className="font-medium pr-4">{item.question}</span>
									</AccordionTrigger>
									<AccordionContent className="pb-4">
										<p className="text-sm text-muted-foreground">
											{item.answer}
										</p>
									</AccordionContent>
								</AccordionItem>
							))}
					</Accordion>
				</div>
			))}
		</div>
	);
};

const SupportCard = () => (
	<Card className="mt-10 @md:mt-12 max-w-3xl mx-auto border-border/50 bg-card/50 backdrop-blur-sm">
		<CardContent className="p-6 flex flex-col @sm:flex-row items-center gap-4 text-center @sm:text-left">
			<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
				<MessageCircle className="size-6 text-primary" />
			</div>
			<div className="flex-1">
				<h3 className="font-semibold mb-1">Still have questions?</h3>
				<p className="text-sm text-muted-foreground">
					Our support team is here to help. Reach out anytime.
				</p>
			</div>
			<a
				href="/support"
				className="text-sm font-medium text-primary hover:underline"
			>
				Contact Support →
			</a>
		</CardContent>
	</Card>
);
