import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
					<Eyebrow text="FAQ" />
					<Title text="Common Questions" />
					<Description text="Quick answers to questions I get asked frequently." />
				</div>

				<FAQGrid
					categories={[
						{
							title: 'Project & Process',
							items: [
								{
									q: 'How long does a typical project take?',
									a: 'Timeline depends on scope. Simple sites: 2-4 weeks. Complex apps: 2-4 months.',
								},
								{
									q: "What's your development process?",
									a: 'Discovery → Design → Development → Testing → Launch → Support',
								},
								{
									q: 'Do you work on weekends?',
									a: 'I maintain work-life balance but can accommodate urgent needs.',
								},
							],
						},
						{
							title: 'Technical',
							items: [
								{
									q: 'What tech stack do you use?',
									a: 'Primarily React, Next.js, TypeScript, Node.js, and PostgreSQL.',
								},
								{
									q: 'Can you work with my existing code?',
									a: "Yes! I'm experienced in refactoring and extending existing projects.",
								},
								{
									q: 'Do you do mobile apps?',
									a: 'Yes, using React Native for cross-platform development.',
								},
							],
						},
						{
							title: 'Business',
							items: [
								{
									q: 'What are your rates?',
									a: 'Project-based pricing from $5k. Hourly consulting at $200/hr.',
								},
								{
									q: 'Do you require a contract?',
									a: 'Yes, clear contracts protect both parties and set expectations.',
								},
								{
									q: 'What payment methods do you accept?',
									a: 'Bank transfer, credit card, and PayPal for international clients.',
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

interface FAQCategory {
	title: string;
	items: { q: string; a: string }[];
}

const FAQGrid = ({ categories }: { categories: FAQCategory[] }) => (
	<div className="grid @md:grid-cols-3 gap-6 @md:gap-8">
		{categories.map(({ title, items }, i) => (
			<div key={i}>
				<h3 className="font-bold text-lg mb-4 text-primary">{title}</h3>
				<Accordion type="single" collapsible className="w-full">
					{items.map(({ q, a }, j) => (
						<AccordionItem key={j} value={`item-${i}-${j}`}>
							<AccordionTrigger className="text-left text-sm font-medium">
								{q}
							</AccordionTrigger>
							<AccordionContent className="text-sm text-muted-foreground">
								{a}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		))}
	</div>
);
