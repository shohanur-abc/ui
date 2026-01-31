import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface Resource {
	type: string;
	title: string;
	description: string;
	downloadCount: string;
	href: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={FileText} text="Resources" />
					<Title text="Free Guides &" highlight="Templates" />
					<Description text="Download free resources to accelerate your growth and learn best practices from industry experts." />
				</div>

				<ResourceList
					items={[
						{
							type: 'eBook',
							title: 'The Ultimate Productivity Guide',
							description:
								"50+ tips and strategies to maximize your team's output.",
							downloadCount: '12.5K downloads',
							href: '/resources/productivity-guide',
						},
						{
							type: 'Template',
							title: 'Project Management Template Pack',
							description:
								'Ready-to-use templates for sprints, roadmaps, and retrospectives.',
							downloadCount: '8.2K downloads',
							href: '/resources/pm-templates',
						},
						{
							type: 'Whitepaper',
							title: 'State of Remote Work 2026',
							description:
								'Comprehensive research on remote work trends and best practices.',
							downloadCount: '5.1K downloads',
							href: '/resources/remote-work-report',
						},
						{
							type: 'Checklist',
							title: 'Security Compliance Checklist',
							description:
								'Ensure your team meets all security and compliance requirements.',
							downloadCount: '3.8K downloads',
							href: '/resources/security-checklist',
						},
					]}
				/>

				<CTASection label="Browse All Resources" href="/resources" />
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
		<Badge variant="outline" className="gap-2">
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

const ResourceList = ({ items }: { items: Resource[] }) => (
	<div className="space-y-4 max-w-3xl mx-auto">
		{items.map((resource) => (
			<Link key={resource.title} href={resource.href}>
				<div className="group p-4 @md:p-5 rounded-xl border border-border/50 transition-all hover:border-primary/30 hover:bg-primary/5 flex flex-col @sm:flex-row @sm:items-center gap-4">
					<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15">
						<FileText className="size-6 text-primary" />
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							<Badge variant="secondary" className="text-xs">
								{resource.type}
							</Badge>
							<span className="text-xs text-muted-foreground">
								{resource.downloadCount}
							</span>
						</div>
						<h3 className="font-semibold group-hover:text-primary transition-colors">
							{resource.title}
						</h3>
						<p className="text-sm text-muted-foreground">
							{resource.description}
						</p>
					</div>
					<Button variant="ghost" size="icon" className="shrink-0">
						<Download className="size-5" />
					</Button>
				</div>
			</Link>
		))}
	</div>
);

const CTASection = ({ label, href }: { label: string; href: string }) => (
	<div className="mt-10 @md:mt-12 text-center">
		<Button size="lg" variant="outline" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
