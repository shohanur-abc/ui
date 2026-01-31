import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowUpRight, GitBranch, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
					<div className="max-w-2xl">
						<Eyebrow icon={GitBranch} text="Development History" />
						<Title text="Project Evolution" />
						<Description text="Track the progression of work through phases and iterations." />
					</div>
				</div>

				<HorizontalTimeline
					items={[
						{
							date: 'Jan 2025',
							title: 'Design System v3',
							description: 'Complete redesign with new components.',
							image: 'https://picsum.photos/seed/htl1/400/300',
							status: 'completed',
							href: '#',
						},
						{
							date: 'Nov 2024',
							title: 'Mobile App Launch',
							description: 'iOS and Android release.',
							image: 'https://picsum.photos/seed/htl2/400/300',
							status: 'completed',
							href: '#',
						},
						{
							date: 'Aug 2024',
							title: 'API v2 Release',
							description: 'GraphQL migration complete.',
							image: 'https://picsum.photos/seed/htl3/400/300',
							status: 'completed',
							href: '#',
						},
						{
							date: 'May 2024',
							title: 'Dashboard MVP',
							description: 'Initial analytics release.',
							image: 'https://picsum.photos/seed/htl4/400/300',
							status: 'completed',
							href: '#',
						},
						{
							date: 'Feb 2024',
							title: 'Project Kickoff',
							description: 'Research and planning phase.',
							image: 'https://picsum.photos/seed/htl5/400/300',
							status: 'completed',
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

interface TimelineItem {
	date: string;
	title: string;
	description: string;
	image: string;
	status: 'completed' | 'in-progress' | 'upcoming';
	href: string;
}

const HorizontalTimeline = ({ items }: { items: TimelineItem[] }) => (
	<div className="relative">
		{/* Horizontal line */}
		<div className="hidden @lg:block absolute top-6 left-0 right-0 h-px bg-border" />

		<div className="grid @sm:grid-cols-2 @lg:grid-cols-5 gap-4 @lg:gap-6">
			{items.map(({ date, title, description, image, status, href }, i) => (
				<div key={i} className="relative">
					{/* Timeline dot */}
					<div className="hidden @lg:flex absolute -top-0 left-1/2 -translate-x-1/2 items-center justify-center">
						<div
							className={`w-3 h-3 rounded-full ring-4 ring-background ${status === 'completed' ? 'bg-primary' : status === 'in-progress' ? 'bg-accent' : 'bg-muted'}`}
						/>
					</div>

					<Card className="group mt-10 @lg:mt-12 h-full overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 p-0">
						<Link href={href} className="block h-full">
							<div className="relative aspect-video overflow-hidden">
								<Image
									src={image}
									alt={title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
							</div>
							<CardHeader className="pb-2">
								<div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
									<Calendar className="size-3" />
									{date}
								</div>
								<h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
									{title}
								</h3>
							</CardHeader>
							<CardContent className="pt-0">
								<p className="text-xs text-muted-foreground line-clamp-2">
									{description}
								</p>
							</CardContent>
						</Link>
					</Card>
				</div>
			))}
		</div>
	</div>
);
