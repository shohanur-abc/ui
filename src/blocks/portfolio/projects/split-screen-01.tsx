import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Palette } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<ProjectShowcase
					items={[
						{
							image: 'https://picsum.photos/seed/split1a/1000/800',
							eyebrow: { icon: Palette, text: 'Featured Project' },
							title: 'Fintech Dashboard',
							description:
								'A comprehensive financial management platform featuring real-time analytics, portfolio tracking, and AI-powered insights for informed investment decisions.',
							tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
							stats: [
								{ value: '$2M+', label: 'Tracked Assets' },
								{ value: '10K+', label: 'Active Users' },
							],
							primaryCta: { label: 'View Live', href: '#' },
							secondaryCta: { label: 'Case Study', href: '#' },
							layout: 'left',
						},
						{
							image: 'https://picsum.photos/seed/split1b/1000/800',
							eyebrow: { icon: Palette, text: 'Recent Work' },
							title: 'E-Learning Platform',
							description:
								'Interactive learning management system with video courses, progress tracking, quizzes, and certification programs for professional development.',
							tags: ['Next.js', 'Prisma', 'AWS', 'Stripe'],
							stats: [
								{ value: '500+', label: 'Courses' },
								{ value: '50K+', label: 'Students' },
							],
							primaryCta: { label: 'Explore', href: '#' },
							secondaryCta: { label: 'Read More', href: '#' },
							layout: 'right',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface ProjectItem {
	image: string;
	eyebrow: { icon: ComponentType<{ className?: string }>; text: string };
	title: string;
	description: string;
	tags: string[];
	stats: { value: string; label: string }[];
	primaryCta: { label: string; href: string };
	secondaryCta: { label: string; href: string };
	layout: 'left' | 'right';
}

const ProjectShowcase = ({ items }: { items: ProjectItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map((item, i) => (
			<ProjectRow key={i} {...item} />
		))}
	</div>
);

const ProjectRow = ({
	image,
	eyebrow,
	title,
	description,
	tags,
	stats,
	primaryCta,
	secondaryCta,
	layout,
}: ProjectItem) => {
	const Icon = eyebrow.icon;

	return (
		<div
			className={`grid @lg:grid-cols-2 gap-8 @xl:gap-12 items-center ${layout === 'right' ? '@lg:flex-row-reverse' : ''}`}
		>
			{/* Image */}
			<div className={`${layout === 'right' ? '@lg:order-2' : ''}`}>
				<div className="group relative rounded-2xl overflow-hidden bg-card border transition-all hover:shadow-2xl hover:shadow-primary/10">
					<div className="relative aspect-[4/3]">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
					</div>
					<Button
						variant="secondary"
						size="icon"
						className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
						asChild
					>
						<Link href={primaryCta.href}>
							<ArrowUpRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>

			{/* Content */}
			<div className={`${layout === 'right' ? '@lg:order-1' : ''}`}>
				<div className="flex items-center gap-2 mb-4 text-primary">
					<Icon className="size-4" />
					<span className="text-sm font-medium uppercase tracking-wider">
						{eyebrow.text}
					</span>
				</div>

				<h3 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4">
					{title}
				</h3>

				<p className="text-muted-foreground mb-6 leading-relaxed">
					{description}
				</p>

				<div className="flex flex-wrap gap-2 mb-6">
					{tags.map((tag, j) => (
						<Badge key={j} variant="secondary">
							{tag}
						</Badge>
					))}
				</div>

				<div className="flex gap-8 mb-8 pb-8 border-b border-border">
					{stats.map(({ value, label }, j) => (
						<div key={j}>
							<div className="text-2xl @md:text-3xl font-bold text-primary">
								{value}
							</div>
							<div className="text-sm text-muted-foreground">{label}</div>
						</div>
					))}
				</div>

				<div className="flex flex-wrap gap-3">
					<Button className="gap-2" asChild>
						<Link href={primaryCta.href}>
							{primaryCta.label} <ArrowUpRight className="size-4" />
						</Link>
					</Button>
					<Button variant="outline" className="gap-2" asChild>
						<Link href={secondaryCta.href}>
							{secondaryCta.label} <ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
