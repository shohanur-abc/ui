import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @xl:grid-cols-[1fr_2fr] gap-12 @xl:gap-16">
					<div className="@xl:sticky @xl:top-8 self-start">
						<Eyebrow icon={Award} text="Milestones" />
						<Title text="Career Highlights" />
						<Description text="Key achievements and milestones throughout my professional journey." />
						<CTA
							items={[
								{
									label: 'Download Resume',
									href: '/resume.pdf',
									icon: ExternalLink,
								},
							]}
						/>
					</div>

					<MilestoneList
						items={[
							{
								year: '2024',
								title: 'Promoted to Principal Engineer',
								description:
									'Leading architecture decisions across 3 product teams.',
								metric: '50+ engineers mentored',
							},
							{
								year: '2023',
								title: 'Launched Design System',
								description:
									'Built and shipped company-wide component library.',
								metric: '200+ components',
							},
							{
								year: '2022',
								title: 'Performance Optimization',
								description:
									'Reduced page load times across the entire platform.',
								metric: '40% faster',
							},
							{
								year: '2021',
								title: 'Team Leadership',
								description: 'Started leading the frontend platform team.',
								metric: '8 direct reports',
							},
							{
								year: '2020',
								title: 'First Major Feature',
								description:
									'Shipped real-time collaboration feature to production.',
								metric: '1M+ users',
							},
							{
								year: '2019',
								title: 'Joined the Company',
								description:
									'Started as a software engineer on the growth team.',
								metric: 'Day 1',
							},
						]}
					/>
				</div>
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
	<p className="text-base @md:text-lg text-muted-foreground mb-6">{text}</p>
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
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

interface MilestoneItem {
	year: string;
	title: string;
	description: string;
	metric: string;
}

const MilestoneList = ({ items }: { items: MilestoneItem[] }) => (
	<div className="space-y-0 border-l-2 border-border">
		{items.map(({ year, title, description, metric }, i) => (
			<div key={i} className="relative pl-8 pb-10 last:pb-0 group">
				<div className="absolute left-0 top-0 -translate-x-1/2 size-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors" />
				<div className="flex flex-wrap items-center gap-3 mb-2">
					<span className="text-sm font-mono text-muted-foreground">
						{year}
					</span>
					<Badge variant="secondary" className="text-xs">
						{metric}
					</Badge>
				</div>
				<h3 className="text-lg @md:text-xl font-semibold mb-1">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		))}
	</div>
);
