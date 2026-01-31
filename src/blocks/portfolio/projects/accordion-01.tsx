'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowUpRight, FolderKanban } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={FolderKanban} text="Portfolio" />
					<Title text="Project Details" />
					<Description text="Expandable project cards with detailed information." />
				</div>

				<AccordionProjects
					items={[
						{
							id: 'proj-1',
							image: 'https://picsum.photos/seed/acc1a/800/500',
							title: 'Enterprise Resource Planning',
							summary: 'Complete ERP system for manufacturing companies.',
							description:
								'Built a comprehensive ERP solution handling inventory, production, HR, and finance modules with real-time reporting and multi-location support.',
							tags: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
							year: '2025',
							href: '#',
						},
						{
							id: 'proj-2',
							image: 'https://picsum.photos/seed/acc1b/800/500',
							title: 'Digital Learning Platform',
							summary: 'Interactive e-learning with video courses.',
							description:
								'Developed a full-featured LMS with live classes, quizzes, certificates, and progress tracking. Integrated payment processing and instructor dashboards.',
							tags: ['Next.js', 'Prisma', 'AWS', 'Stripe'],
							year: '2024',
							href: '#',
						},
						{
							id: 'proj-3',
							image: 'https://picsum.photos/seed/acc1c/800/500',
							title: 'Logistics Management',
							summary: 'Fleet tracking and route optimization.',
							description:
								'Real-time vehicle tracking system with route planning, driver management, fuel monitoring, and delivery confirmation. Mobile apps for drivers.',
							tags: ['React Native', 'Go', 'MongoDB', 'Maps API'],
							year: '2024',
							href: '#',
						},
						{
							id: 'proj-4',
							image: 'https://picsum.photos/seed/acc1d/800/500',
							title: 'Insurance Claims Portal',
							summary: 'Automated claims processing system.',
							description:
								'End-to-end claims management with document upload, AI-assisted damage assessment, automated workflows, and policyholder communication.',
							tags: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL'],
							year: '2023',
							href: '#',
						},
					]}
				/>
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
	<div className="flex justify-center mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface AccordionItem {
	id: string;
	image: string;
	title: string;
	summary: string;
	description: string;
	tags: string[];
	year: string;
	href: string;
}

const AccordionProjects = ({ items }: { items: AccordionItem[] }) => (
	<Accordion type="single" collapsible className="space-y-4">
		{items.map(
			({ id, image, title, summary, description, tags, year, href }) => (
				<AccordionItem
					key={id}
					value={id}
					className="border rounded-xl px-0 overflow-hidden bg-card"
				>
					<AccordionTrigger className="px-4 @md:px-6 py-4 hover:no-underline [&[data-state=open]]:border-b">
						<div className="flex items-center gap-4 text-left w-full pr-4">
							<div className="relative size-16 @md:size-20 rounded-lg overflow-hidden shrink-0 bg-muted">
								<Image src={image} alt={title} fill className="object-cover" />
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<Badge variant="secondary" className="text-xs">
										{year}
									</Badge>
								</div>
								<h3 className="font-semibold text-base @md:text-lg truncate">
									{title}
								</h3>
								<p className="text-sm text-muted-foreground truncate">
									{summary}
								</p>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4 @md:px-6 pb-6">
						<div className="grid @lg:grid-cols-[1fr_2fr] gap-6 pt-4">
							<div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
								<Image src={image} alt={title} fill className="object-cover" />
							</div>
							<div>
								<p className="text-muted-foreground mb-4">{description}</p>
								<div className="flex flex-wrap gap-2 mb-6">
									{tags.map((tag, i) => (
										<Badge key={i} variant="outline">
											{tag}
										</Badge>
									))}
								</div>
								<Button className="gap-2" asChild>
									<Link href={href}>
										View Project <ArrowUpRight className="size-4" />
									</Link>
								</Button>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			),
		)}
	</Accordion>
);
