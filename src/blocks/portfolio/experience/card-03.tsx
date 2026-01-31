import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Briefcase} text="Projects" />
					<Title text="Key Projects" />
					<Description text="Major projects I've led or contributed significantly to." />
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					<ProjectCard
						company="Google"
						project="Design System Platform"
						role="Tech Lead"
						impact="500+ engineers"
						description="Built and launched the company-wide design system used across all product teams."
						achievements={[
							'Component library',
							'Documentation site',
							'Migration tooling',
						]}
						link="https://example.com"
					/>
					<ProjectCard
						company="Meta"
						project="Stories Performance"
						role="Lead Engineer"
						impact="40% faster"
						description="Optimized Stories rendering pipeline for billions of daily users."
						achievements={[
							'Lazy loading',
							'Image optimization',
							'Caching strategy',
						]}
						link="https://example.com"
					/>
					<ProjectCard
						company="Stripe"
						project="Checkout Redesign"
						role="Frontend Lead"
						impact="23% conversion"
						description="Redesigned the checkout flow to improve conversion rates."
						achievements={['A/B testing', 'Mobile UX', 'Error handling']}
						link="https://example.com"
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
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface ProjectCardProps {
	company: string;
	project: string;
	role: string;
	impact: string;
	description: string;
	achievements: string[];
	link: string;
}

const ProjectCard = ({
	company,
	project,
	role,
	impact,
	description,
	achievements,
	link,
}: ProjectCardProps) => (
	<Card className="flex flex-col hover:shadow-lg transition-shadow">
		<CardContent className="flex-1 p-6">
			<div className="flex items-center justify-between mb-4">
				<Badge variant="secondary">{company}</Badge>
				<Badge variant="outline">{impact}</Badge>
			</div>
			<h3 className="text-lg font-bold mb-1">{project}</h3>
			<p className="text-sm text-primary mb-3">{role}</p>
			<p className="text-sm text-muted-foreground mb-4">{description}</p>
			<ul className="space-y-2">
				{achievements.map((achievement, i) => (
					<li
						key={i}
						className="flex items-center gap-2 text-sm text-muted-foreground"
					>
						<CheckCircle className="size-4 text-primary shrink-0" />
						{achievement}
					</li>
				))}
			</ul>
		</CardContent>
		<CardFooter className="p-6 pt-0">
			<Button variant="outline" size="sm" className="w-full" asChild>
				<Link href={link}>
					View Project
					<ExternalLink className="size-3" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);
