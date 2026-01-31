'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, Download, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
					<div className="max-w-xl">
						<Eyebrow icon={FileText} text="Resume" />
						<Title text="Professional Summary" />
						<Description text="Comprehensive overview of my qualifications and experience." />
					</div>
					<CTA
						items={[
							{
								label: 'Download Resume',
								href: '/resume.pdf',
								icon: Download,
								variant: 'default',
							},
							{
								label: 'LinkedIn',
								href: 'https://linkedin.com',
								icon: ExternalLink,
								variant: 'outline',
							},
						]}
					/>
				</div>

				<ResumeAccordion
					items={[
						{
							id: 'summary',
							title: 'Professional Summary',
							content:
								'Experienced software engineer with 8+ years building scalable web applications. Proven track record of leading teams, shipping products, and driving technical excellence. Passionate about developer experience and creating impactful products.',
						},
						{
							id: 'experience',
							title: 'Work Experience',
							content:
								'• Principal Engineer at TechCorp (2022-Present)\n• Staff Engineer at StartupX (2020-2022)\n• Senior Engineer at DataFlow (2018-2020)\n• Software Engineer at CodeLab (2016-2018)',
						},
						{
							id: 'education',
							title: 'Education',
							content:
								'• M.S. Computer Science, Stanford University (2018)\n• B.S. Computer Science, UC Berkeley (2016)\n• Various certifications in AWS, GCP, and Kubernetes',
						},
						{
							id: 'skills',
							title: 'Technical Skills',
							content:
								'Languages: TypeScript, JavaScript, Python, Go\nFrontend: React, Next.js, Vue.js, Tailwind CSS\nBackend: Node.js, Django, PostgreSQL, Redis\nDevOps: AWS, Docker, Kubernetes, Terraform',
						},
						{
							id: 'achievements',
							title: 'Achievements',
							content:
								'• Led design system used by 500+ engineers\n• Reduced build times by 60% organization-wide\n• Mentored 20+ junior developers\n• Speaker at 5 international conferences',
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
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface CTAItem {
	label: string;
	href: string;
	icon?: ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap gap-3">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} variant={variant} asChild>
				<Link href={href}>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

interface ResumeItem {
	id: string;
	title: string;
	content: string;
}

const ResumeAccordion = ({ items }: { items: ResumeItem[] }) => (
	<Accordion type="multiple" defaultValue={['summary']} className="max-w-3xl">
		{items.map(({ id, title, content }) => (
			<AccordionItem key={id} value={id} className="border-b">
				<AccordionTrigger className="hover:no-underline py-5">
					<div className="flex items-center gap-3">
						<ArrowRight className="size-4 text-primary" />
						<span className="text-lg font-semibold">{title}</span>
					</div>
				</AccordionTrigger>
				<AccordionContent className="pb-6 pl-7">
					<p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
						{content}
					</p>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
