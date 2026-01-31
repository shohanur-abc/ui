'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, ChevronDown, Layers3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType, useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
					<div className="max-w-2xl">
						<Eyebrow icon={Layers3} text="Case Studies" />
						<Title text="Collapsible Projects" />
						<Description text="Compact overview with expandable details for each project." />
					</div>
				</div>

				<CollapsibleProjects
					items={[
						{
							image: 'https://picsum.photos/seed/coll1/800/500',
							title: 'AI Customer Support',
							summary: 'Intelligent chatbot with natural language processing.',
							details: {
								challenge:
									'Reduce support ticket volume while maintaining customer satisfaction.',
								solution:
									'Built an AI-powered chatbot that handles 70% of common inquiries automatically.',
								outcome:
									'Reduced support costs by 45% and improved response time by 80%.',
							},
							tags: ['Python', 'OpenAI', 'React', 'Redis'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/coll2/800/500',
							title: 'Subscription Billing',
							summary: 'Flexible billing platform for SaaS products.',
							details: {
								challenge:
									'Handle complex pricing models and proration scenarios.',
								solution:
									'Developed a flexible billing engine with usage-based and tiered pricing.',
								outcome:
									'Processing $2M+ monthly recurring revenue with 99.99% accuracy.',
							},
							tags: ['Node.js', 'Stripe', 'PostgreSQL', 'React'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/coll3/800/500',
							title: 'Video Editing SaaS',
							summary: 'Browser-based video editing with cloud rendering.',
							details: {
								challenge:
									'Enable professional video editing without software installation.',
								solution:
									'Built a WebGL-based editor with cloud rendering pipeline.',
								outcome:
									'50K+ videos created monthly with average render time under 5 minutes.',
							},
							tags: ['React', 'FFmpeg', 'WebGL', 'AWS Lambda'],
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
	<div className="flex items-center gap-2 mb-3 text-primary">
		<Icon className="size-4" />
		<span className="text-sm font-medium uppercase tracking-wider">{text}</span>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface CollapsibleItem {
	image: string;
	title: string;
	summary: string;
	details: {
		challenge: string;
		solution: string;
		outcome: string;
	};
	tags: string[];
	href: string;
}

const CollapsibleProjects = ({ items }: { items: CollapsibleItem[] }) => (
	<div className="space-y-4">
		{items.map((item, i) => (
			<CollapsibleProjectCard key={i} {...item} />
		))}
	</div>
);

const CollapsibleProjectCard = ({
	image,
	title,
	summary,
	details,
	tags,
	href,
}: CollapsibleItem) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<Card className="overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 p-0">
				<CollapsibleTrigger className="w-full text-left">
					<div className="grid @lg:grid-cols-[200px_1fr_auto] gap-4 p-4 @md:p-6 items-center">
						<div className="relative aspect-video @lg:aspect-[4/3] rounded-lg overflow-hidden bg-muted">
							<Image src={image} alt={title} fill className="object-cover" />
						</div>
						<div>
							<h3 className="text-lg @md:text-xl font-bold mb-1">{title}</h3>
							<p className="text-muted-foreground text-sm mb-3">{summary}</p>
							<div className="flex flex-wrap gap-1.5">
								{tags.map((tag, i) => (
									<Badge key={i} variant="secondary" className="text-xs">
										{tag}
									</Badge>
								))}
							</div>
						</div>
						<ChevronDown
							className={`size-5 text-muted-foreground transition-transform hidden @lg:block ${isOpen ? 'rotate-180' : ''}`}
						/>
					</div>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="px-4 @md:px-6 pb-6 pt-2 border-t">
						<div className="grid @md:grid-cols-3 gap-6 mb-6">
							<div>
								<p className="text-sm font-medium text-primary mb-1">
									Challenge
								</p>
								<p className="text-sm text-muted-foreground">
									{details.challenge}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-primary mb-1">
									Solution
								</p>
								<p className="text-sm text-muted-foreground">
									{details.solution}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-primary mb-1">Outcome</p>
								<p className="text-sm text-muted-foreground">
									{details.outcome}
								</p>
							</div>
						</div>
						<Button className="gap-2" asChild>
							<Link href={href}>
								View Full Case Study <ArrowUpRight className="size-4" />
							</Link>
						</Button>
					</div>
				</CollapsibleContent>
			</Card>
		</Collapsible>
	);
};
