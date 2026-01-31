'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Process" />
					<Title text="How We Work Together" />
					<Description text="A transparent, collaborative approach to bringing your project to life." />
				</div>

				<TwoColumnAccordion
					columns={[
						{
							title: 'Getting Started',
							items: [
								{
									question: 'How do I initiate a project?',
									answer:
										"Simply reach out through the contact form or email. We'll schedule an initial call to discuss your needs and goals.",
								},
								{
									question: 'What information do you need from me?',
									answer:
										'A clear description of your project goals, target audience, timeline expectations, and any reference materials you may have.',
								},
								{
									question: 'Do you require a deposit?',
									answer:
										'Yes, I typically require a 30-50% deposit before starting work, depending on project size.',
								},
							],
						},
						{
							title: 'During the Project',
							items: [
								{
									question: 'How often will we communicate?',
									answer:
										'I provide weekly progress updates and am available for questions throughout. Major projects include milestone reviews.',
								},
								{
									question: 'Can I request changes during development?',
									answer:
										'Absolutely! I follow an iterative process with regular checkpoints for feedback and adjustments.',
								},
								{
									question: 'What happens if deadlines shift?',
									answer:
										"I maintain transparent communication. If scope changes affect timelines, we'll discuss options together.",
								},
							],
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

interface FAQItem {
	question: string;
	answer: string;
}

interface ColumnData {
	title: string;
	items: FAQItem[];
}

const TwoColumnAccordion = ({ columns }: { columns: ColumnData[] }) => (
	<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12 max-w-5xl mx-auto">
		{columns.map(({ title, items }, colIndex) => (
			<div key={colIndex}>
				<h3 className="text-lg @md:text-xl font-semibold mb-4 @md:mb-5">
					{title}
				</h3>
				<Accordion type="single" collapsible>
					{items.map(({ question, answer }, i) => (
						<AccordionItem key={i} value={`col-${colIndex}-item-${i}`}>
							<AccordionTrigger className="text-left text-sm @md:text-base font-medium hover:no-underline">
								{question}
							</AccordionTrigger>
							<AccordionContent className="text-sm text-muted-foreground">
								{answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		))}
	</div>
);
