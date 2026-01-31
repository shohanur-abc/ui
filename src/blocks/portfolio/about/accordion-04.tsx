import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Building,
	Calendar,
	ChevronRight,
	MapPin,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<Header
					eyebrow="Career Journey"
					title="Professional Experience"
					description="A detailed look at my work history and accomplishments."
				/>
				<ExperienceAccordion
					items={[
						{
							id: 'google',
							company: 'Google',
							logo: 'https://picsum.photos/seed/ggl/100/100',
							role: 'Senior Software Engineer',
							period: '2021 - Present',
							location: 'Mountain View, CA',
							description:
								'Leading frontend architecture for Google Cloud Console.',
							achievements: [
								'Led redesign of Cloud Console dashboard, improving user engagement by 40%',
								'Built component library used by 50+ teams across Google Cloud',
								'Mentored 5 junior engineers, helping them grow to senior level',
								'Reduced bundle size by 60% through code splitting and optimization',
							],
							technologies: ['React', 'TypeScript', 'Lit', 'Web Components'],
						},
						{
							id: 'meta',
							company: 'Meta',
							logo: 'https://picsum.photos/seed/mta/100/100',
							role: 'Software Engineer',
							period: '2018 - 2021',
							location: 'Menlo Park, CA',
							description:
								'Core contributor to React framework and internal tools.',
							achievements: [
								'Contributed to React 18 concurrent features',
								'Built internal testing framework used company-wide',
								'Improved CI/CD pipeline, reducing deploy times by 50%',
							],
							technologies: ['React', 'JavaScript', 'PHP', 'GraphQL'],
						},
						{
							id: 'stripe',
							company: 'Stripe',
							logo: 'https://picsum.photos/seed/strp/100/100',
							role: 'Frontend Engineer',
							period: '2016 - 2018',
							location: 'San Francisco, CA',
							description: 'Built payment UIs used by millions of businesses.',
							achievements: [
								'Developed Stripe Elements, embedded payment components',
								'Implemented accessibility features meeting WCAG 2.1',
								'Created documentation and developer tutorials',
							],
							technologies: ['React', 'JavaScript', 'Ruby', 'CSS'],
						},
					]}
				/>
				<CTA label="Download Resume" href="/resume.pdf" icon={ArrowRight} />
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
		<p className="text-muted-foreground max-w-xl mx-auto">{description}</p>
	</div>
);

interface ExperienceItem {
	id: string;
	company: string;
	logo: string;
	role: string;
	period: string;
	location: string;
	description: string;
	achievements: string[];
	technologies: string[];
}

interface ExperienceAccordionProps {
	items: ExperienceItem[];
}

const ExperienceAccordion = ({ items }: ExperienceAccordionProps) => (
	<Accordion
		type="single"
		collapsible
		defaultValue={items[0].id}
		className="max-w-3xl mx-auto mb-12"
	>
		{items.map((item) => (
			<AccordionItem
				key={item.id}
				value={item.id}
				className="border rounded-lg mb-4 px-4 last:mb-0"
			>
				<AccordionTrigger className="hover:no-underline py-4">
					<div className="flex items-center gap-4">
						<div className="relative size-12 rounded-lg overflow-hidden bg-muted">
							<Image
								src={item.logo}
								alt={item.company}
								fill
								className="object-cover"
							/>
						</div>
						<div className="text-left">
							<h3 className="font-semibold">{item.role}</h3>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Building className="size-3" />
								<span>{item.company}</span>
								<span>•</span>
								<span>{item.period}</span>
							</div>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent className="pb-4">
					<div className="pl-16">
						<div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
							<div className="flex items-center gap-1">
								<MapPin className="size-4" />
								<span>{item.location}</span>
							</div>
							<div className="flex items-center gap-1">
								<Calendar className="size-4" />
								<span>{item.period}</span>
							</div>
						</div>
						<p className="text-muted-foreground mb-4">{item.description}</p>
						<div className="space-y-2 mb-4">
							{item.achievements.map((achievement, i) => (
								<div key={i} className="flex items-start gap-2 text-sm">
									<ChevronRight className="size-4 text-primary mt-0.5 shrink-0" />
									<span>{achievement}</span>
								</div>
							))}
						</div>
						<Separator className="my-4" />
						<div className="flex flex-wrap gap-2">
							{item.technologies.map((tech) => (
								<Badge key={tech} variant="outline">
									{tech}
								</Badge>
							))}
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);

interface CTAProps {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
	<div className="text-center">
		<Button className="gap-2" asChild>
			<Link href={href}>
				{label}
				<Icon className="size-4" />
			</Link>
		</Button>
	</div>
);
