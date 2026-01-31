import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-start">
					<div className="@xl:sticky @xl:top-24">
						<Eyebrow text="Support" />
						<Title text="Frequently Asked Questions" />
						<Description text="Find answers to common questions about my services, process, and working style." />
						<ContactNote
							icon={HelpCircle}
							text="Can't find what you're looking for?"
							link={{ label: 'Contact me directly', href: '#contact' }}
						/>
					</div>

					<FAQList
						items={[
							{
								question: 'What is your typical project timeline?',
								answer:
									'Project timelines vary based on scope and complexity. A simple landing page might take 1-2 weeks, while a full-stack application could take 2-3 months. I provide detailed timelines during the discovery phase.',
							},
							{
								question: 'How do you handle communication during projects?',
								answer:
									"I believe in transparent, proactive communication. You'll receive weekly progress updates, access to a project management board, and can reach me via email or Slack during business hours.",
							},
							{
								question: 'What technologies do you specialize in?',
								answer:
									"My core stack includes React, Next.js, TypeScript, Node.js, and PostgreSQL. I'm also experienced with Python, GraphQL, AWS, and various other technologies depending on project needs.",
							},
							{
								question: 'Do you offer ongoing maintenance?',
								answer:
									'Yes! I offer maintenance packages that include regular updates, security patches, performance monitoring, and feature enhancements. This ensures your application stays current and secure.',
							},
							{
								question: 'What is your payment structure?',
								answer:
									'I typically work with a 50% upfront deposit and 50% upon completion for smaller projects. Larger projects are billed monthly based on milestones. All terms are clearly outlined in our contract.',
							},
							{
								question: 'Can you work with an existing codebase?',
								answer:
									"Absolutely. I can join existing projects, refactor legacy code, or add new features to your current application. I'll start with a code review to understand the architecture and identify improvements.",
							},
						]}
					/>
				</div>
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
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6">
		{text}
	</p>
);

interface ContactNoteProps {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
	link: { label: string; href: string };
}

const ContactNote = ({ icon: Icon, text, link }: ContactNoteProps) => (
	<div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
		<Icon className="size-5 text-primary shrink-0" />
		<p className="text-sm">
			{text}{' '}
			<a href={link.href} className="text-primary font-medium hover:underline">
				{link.label}
			</a>
		</p>
	</div>
);

interface FAQItem {
	question: string;
	answer: string;
}

const FAQList = ({ items }: { items: FAQItem[] }) => (
	<Accordion type="single" collapsible className="w-full">
		{items.map(({ question, answer }, i) => (
			<AccordionItem key={i} value={`item-${i}`}>
				<AccordionTrigger className="text-left text-sm @md:text-base font-semibold">
					{question}
				</AccordionTrigger>
				<AccordionContent className="text-sm @md:text-base text-muted-foreground leading-relaxed">
					{answer}
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
