import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Download, FileText, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="emerald"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @xl:grid-cols-12 gap-6 @xl:gap-10 items-center">
					<ContentBlock
						title="Free Developer Resources"
						description="Download cheat sheets, templates, and guides to accelerate your learning."
						cta={{ label: 'Browse All', href: '/resources' }}
						className="@xl:col-span-5"
					/>
					<ResourcesGrid
						resources={[
							{
								title: 'React Cheat Sheet',
								type: 'PDF',
								downloads: '12.5K',
								image:
									'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
							},
							{
								title: 'TypeScript Guide',
								type: 'PDF',
								downloads: '8.2K',
								image:
									'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
							},
							{
								title: 'Next.js Starter Kit',
								type: 'ZIP',
								downloads: '5.6K',
								image:
									'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
							},
							{
								title: 'CSS Grid Reference',
								type: 'PDF',
								downloads: '4.1K',
								image:
									'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400',
							},
						]}
						className="@xl:col-span-7"
					/>
				</div>
			</div>
		</section>
	);
}

interface ContentBlockProps {
	title: string;
	description: string;
	cta: { label: string; href: string };
	className?: string;
}

const ContentBlock = ({
	title,
	description,
	cta,
	className,
}: ContentBlockProps) => (
	<div className={`flex flex-col justify-center ${className}`}>
		<Badge className="w-fit mb-4 bg-primary/10 text-primary border-primary/20">
			<Sparkles className="size-3.5 mr-1.5" />
			Free Downloads
		</Badge>
		<h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h1>
		<p className="text-lg text-muted-foreground mb-6">{description}</p>
		<div className="flex items-center gap-4 mb-6">
			<div className="flex -space-x-1">
				{[1, 2, 3, 4, 5].map((i) => (
					<Star key={i} className="size-5 fill-amber-500 text-amber-500" />
				))}
			</div>
			<span className="text-sm text-muted-foreground">
				Rated 4.9 by developers
			</span>
		</div>
		<Button size="lg" asChild className="gap-2 w-fit">
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

interface Resource {
	title: string;
	type: string;
	downloads: string;
	image: string;
}

interface ResourcesGridProps {
	resources: Resource[];
	className?: string;
}

const ResourcesGrid = ({ resources, className }: ResourcesGridProps) => (
	<div className={`grid grid-cols-2 gap-4 ${className}`}>
		{resources.map((resource, i) => (
			<Card
				key={resource.title}
				className={`group overflow-hidden cursor-pointer py-0 ${i === 0 ? 'row-span-2' : ''}`}
			>
				<div
					className={`relative ${i === 0 ? 'aspect-[3/4]' : 'aspect-video'}`}
				>
					<Image
						src={resource.image}
						alt={resource.title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
					<CardContent className="absolute bottom-0 left-0 right-0 p-4">
						<div className="flex items-center gap-2 mb-2">
							<Badge className="bg-white/20 text-white backdrop-blur-sm border-0 text-xs">
								<FileText className="size-3 mr-1" />
								{resource.type}
							</Badge>
						</div>
						<h3 className="font-semibold text-white mb-2">{resource.title}</h3>
						<div className="flex items-center justify-between">
							<span className="text-xs text-white/70 flex items-center gap-1">
								<Download className="size-3" />
								{resource.downloads} downloads
							</span>
							<Button size="sm" variant="secondary" className="h-7 text-xs">
								Download
							</Button>
						</div>
					</CardContent>
				</div>
			</Card>
		))}
	</div>
);
