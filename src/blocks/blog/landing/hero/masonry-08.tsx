import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileText, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="emerald"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Header
					title="Free Resources"
					description="Download cheat sheets, templates, and guides"
				/>
				<MasonryGrid
					resources={[
						{
							title: 'React Cheat Sheet',
							type: 'PDF',
							downloads: '12.5K',
							rating: 4.9,
							image:
								'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
							height: 'h-64',
						},
						{
							title: 'TypeScript Guide',
							type: 'PDF',
							downloads: '8.2K',
							rating: 4.8,
							image:
								'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600',
							height: 'h-48',
						},
						{
							title: 'CSS Grid Reference',
							type: 'PDF',
							downloads: '6.7K',
							rating: 4.9,
							image:
								'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600',
							height: 'h-56',
						},
						{
							title: 'Next.js Starter Kit',
							type: 'ZIP',
							downloads: '5.4K',
							rating: 4.7,
							image:
								'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
							height: 'h-72',
						},
						{
							title: 'API Design Guide',
							type: 'PDF',
							downloads: '4.1K',
							rating: 4.6,
							image:
								'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
							height: 'h-52',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface HeaderProps {
	title: string;
	description: string;
}

const Header = ({ title, description }: HeaderProps) => (
	<div className="mb-10">
		<Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
			<FileText className="size-3.5 mr-1.5" />
			Downloads
		</Badge>
		<h1 className="text-3xl @md:text-4xl font-bold mb-3">{title}</h1>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

interface Resource {
	title: string;
	type: string;
	downloads: string;
	rating: number;
	image: string;
	height: string;
}

interface MasonryGridProps {
	resources: Resource[];
}

const MasonryGrid = ({ resources }: MasonryGridProps) => (
	<div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 space-y-4">
		{resources.map((resource) => (
			<Link key={resource.title} href="#" className="block break-inside-avoid">
				<Card className="group overflow-hidden py-0">
					<div className={`relative ${resource.height}`}>
						<Image
							src={resource.image}
							alt={resource.title}
							fill
							className="object-cover transition-transform group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
						<Badge className="absolute top-3 left-3 bg-white/90 text-foreground border-0 text-xs">
							<FileText className="size-3 mr-1" />
							{resource.type}
						</Badge>
						<CardContent className="absolute bottom-0 left-0 right-0 p-4">
							<h3 className="font-semibold text-white mb-2">
								{resource.title}
							</h3>
							<div className="flex items-center justify-between text-sm text-white/70">
								<span className="flex items-center gap-1">
									<Star className="size-3 fill-amber-500 text-amber-500" />
									{resource.rating}
								</span>
								<span className="flex items-center gap-1">
									<Download className="size-3" />
									{resource.downloads}
								</span>
							</div>
						</CardContent>
					</div>
				</Card>
			</Link>
		))}
	</div>
);
