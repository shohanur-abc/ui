import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Presentation, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Presentation} text="Case Studies" />
					<Title text="Deep Dives" />
					<Description text="Comprehensive case studies with process documentation." />
				</div>

				<CaseStudyList
					items={[
						{
							cover: 'https://picsum.photos/seed/case1/1200/600',
							title: 'Redesigning Healthcare UX',
							excerpt:
								'How we improved patient outcomes through better digital experiences.',
							readTime: '12 min',
							sections: ['Research', 'Design', 'Development', 'Results'],
							date: 'Jan 2025',
							href: '#',
						},
						{
							cover: 'https://picsum.photos/seed/case2/1200/600',
							title: 'Scaling a Fintech Startup',
							excerpt:
								'From MVP to 100K users: technical decisions and trade-offs.',
							readTime: '15 min',
							sections: [
								'Challenge',
								'Architecture',
								'Implementation',
								'Metrics',
							],
							date: 'Dec 2024',
							href: '#',
						},
						{
							cover: 'https://picsum.photos/seed/case3/1200/600',
							title: 'Building a Design System',
							excerpt: 'Creating consistency across 5 products and 20 teams.',
							readTime: '18 min',
							sections: ['Audit', 'Tokens', 'Components', 'Adoption'],
							date: 'Nov 2024',
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

interface CaseStudyItem {
	cover: string;
	title: string;
	excerpt: string;
	readTime: string;
	sections: string[];
	date: string;
	href: string;
}

const CaseStudyList = ({ items }: { items: CaseStudyItem[] }) => (
	<div className="space-y-8">
		{items.map(
			({ cover, title, excerpt, readTime, sections, date, href }, i) => (
				<Link
					key={i}
					href={href}
					className="group block rounded-2xl overflow-hidden bg-card border transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20"
				>
					<div className="grid @lg:grid-cols-[1.5fr_1fr]">
						<div className="relative aspect-video @lg:aspect-auto @lg:min-h-[300px] overflow-hidden">
							<Image
								src={cover}
								alt={title}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 hidden @lg:block" />
						</div>

						<div className="p-6 @md:p-8 flex flex-col justify-center">
							<div className="flex items-center gap-3 mb-4">
								<Badge variant="secondary">{date}</Badge>
								<span className="text-sm text-muted-foreground flex items-center gap-1">
									<FileText className="size-3.5" />
									{readTime} read
								</span>
							</div>

							<h3 className="text-xl @md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
								{title}
							</h3>
							<p className="text-muted-foreground mb-6">{excerpt}</p>

							{/* Sections */}
							<div className="flex flex-wrap gap-2 mb-6">
								{sections.map((section, j) => (
									<Badge key={j} variant="outline">
										{section}
									</Badge>
								))}
							</div>

							<Button className="w-fit gap-2">
								Read Case Study <ArrowUpRight className="size-4" />
							</Button>
						</div>
					</div>
				</Link>
			),
		)}
	</div>
);
