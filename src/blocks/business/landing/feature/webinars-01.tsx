import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowRight,
	Clock,
	Download,
	Play,
	Sparkles,
	Video,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface WebinarItem {
	title: string;
	description: string;
	duration: string;
	thumbnail: string;
	progress?: number;
	href: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Video} text="Webinars" />
					<Title text="Learn from the" highlight="Experts" />
					<Description text="Free webinars and tutorials to help you get the most out of our platform." />
				</div>

				<WebinarGrid
					items={[
						{
							title: 'Getting Started in 15 Minutes',
							description:
								'A quick walkthrough of the essential features to get you up and running.',
							duration: '15 min',
							thumbnail:
								'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80',
							progress: 65,
							href: '/webinars/getting-started',
						},
						{
							title: 'Advanced Automation Workflows',
							description:
								'Deep dive into creating complex automation rules and triggers.',
							duration: '45 min',
							thumbnail:
								'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
							href: '/webinars/automation',
						},
						{
							title: 'Analytics Masterclass',
							description:
								'Learn to build custom dashboards and extract actionable insights.',
							duration: '60 min',
							thumbnail:
								'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
							href: '/webinars/analytics',
						},
					]}
				/>

				<CTASection label="Browse All Webinars" href="/webinars" />
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
		<Badge variant="secondary" className="gap-2 px-3 py-1">
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

const WebinarGrid = ({ items }: { items: WebinarItem[] }) => (
	<div className="grid gap-6 @lg:grid-cols-3">
		{items.map((webinar) => (
			<Link key={webinar.title} href={webinar.href}>
				<Card className="group h-full border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg">
					<div className="relative aspect-video overflow-hidden">
						<img
							src={webinar.thumbnail}
							alt={webinar.title}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
							<div className="size-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
								<Play className="size-6 ml-1" />
							</div>
						</div>
						{webinar.progress && (
							<Progress
								value={webinar.progress}
								className="absolute bottom-0 left-0 right-0 h-1 rounded-none"
							/>
						)}
					</div>
					<CardContent className="p-5">
						<div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
							<Clock className="size-3" />
							{webinar.duration}
						</div>
						<h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
							{webinar.title}
						</h3>
						<p className="text-sm text-muted-foreground">
							{webinar.description}
						</p>
					</CardContent>
				</Card>
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
