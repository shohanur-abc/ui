import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header
					eyebrow="FAQ"
					title="Frequently Asked Questions"
					description="Common questions about working with me."
				/>
				<div className="grid @lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
					<ProfileCard
						src="https://picsum.photos/seed/acc3/400/400"
						fallback="MK"
						name="Mike Kim"
						role="Freelance Developer"
						status="Available for projects"
						cta={{ label: 'Contact Me', href: '/contact', icon: ArrowRight }}
					/>
					<div className="@lg:col-span-2">
						<FAQAccordion
							items={[
								{
									id: 'availability',
									question: 'What is your availability?',
									answer:
										'I typically take on 2-3 projects at a time. My current availability starts in 2 weeks. For urgent projects, I can sometimes accommodate with rush pricing.',
								},
								{
									id: 'pricing',
									question: 'How do you price projects?',
									answer:
										"I offer both hourly ($150/hr) and project-based pricing. For most projects, I prefer fixed pricing based on scope. I'll provide a detailed quote after our initial consultation.",
								},
								{
									id: 'process',
									question: 'What is your development process?',
									answer:
										"I follow an agile approach with weekly check-ins. You'll have full visibility through project management tools. I deliver in iterations so you can see progress and provide feedback.",
								},
								{
									id: 'technologies',
									question: 'What technologies do you work with?',
									answer:
										"I specialize in React, Next.js, TypeScript, and Node.js. For databases, I work with PostgreSQL and MongoDB. I'm also experienced with AWS, Vercel, and modern DevOps practices.",
								},
								{
									id: 'timeline',
									question: 'How long does a typical project take?',
									answer:
										"Timeline depends on scope. A landing page takes 1-2 weeks, a web app 4-8 weeks, and complex platforms 3-6 months. I'll provide accurate estimates after understanding your requirements.",
								},
								{
									id: 'support',
									question: 'Do you offer ongoing support?',
									answer:
										'Yes! I offer maintenance packages starting at $500/month. This includes bug fixes, minor updates, and priority support. For larger needs, we can discuss retainer arrangements.',
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

interface HeaderProps {
	eyebrow: string;
	title: string;
	description: string;
}

const Header = ({ eyebrow, title, description }: HeaderProps) => (
	<div className="text-center mb-12">
		<Badge variant="secondary" className="mb-4">
			{eyebrow}
		</Badge>
		<h1 className="text-3xl @lg:text-4xl font-bold mb-4">{title}</h1>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ProfileCardProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	status: string;
	cta: CTAData;
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
	status,
	cta,
}: ProfileCardProps) => (
	<Card className="h-fit sticky top-8">
		<CardContent className="p-6 text-center">
			<Avatar className="size-20 mx-auto mb-4 ring-2 ring-border">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-2xl bg-primary text-primary-foreground">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<h2 className="text-xl font-bold mb-1">{name}</h2>
			<p className="text-primary text-sm mb-3">{role}</p>
			<Badge className="bg-green-500/10 text-green-600 border-green-500/20 mb-6">
				<span className="size-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
				{status}
			</Badge>
			<Button className="gap-2 w-full" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

interface FAQItem {
	id: string;
	question: string;
	answer: string;
}

interface FAQAccordionProps {
	items: FAQItem[];
}

const FAQAccordion = ({ items }: FAQAccordionProps) => (
	<Accordion type="single" collapsible defaultValue="availability">
		{items.map((item) => (
			<AccordionItem key={item.id} value={item.id}>
				<AccordionTrigger className="text-left hover:no-underline">
					<div className="flex items-center gap-3">
						<HelpCircle className="size-5 text-primary shrink-0" />
						<span>{item.question}</span>
					</div>
				</AccordionTrigger>
				<AccordionContent className="pl-8">
					<p className="text-muted-foreground">{item.answer}</p>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
