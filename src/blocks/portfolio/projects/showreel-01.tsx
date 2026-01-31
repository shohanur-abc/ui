import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Play, PlayCircle, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Video} text="Showreel" />
					<Title text="Video Previews" />
					<Description text="Projects with video previews and walkthroughs." />
				</div>

				<VideoGrid
					items={[
						{
							thumbnail: 'https://picsum.photos/seed/vid1/800/450',
							title: 'Banking App Walkthrough',
							description: 'Complete UX flow demonstration.',
							duration: '3:45',
							category: 'Fintech',
							views: 12500,
							href: '#',
						},
						{
							thumbnail: 'https://picsum.photos/seed/vid2/800/450',
							title: 'E-Commerce Demo',
							description: 'Shopping experience preview.',
							duration: '5:20',
							category: 'Retail',
							views: 8900,
							href: '#',
						},
						{
							thumbnail: 'https://picsum.photos/seed/vid3/800/450',
							title: 'Dashboard Overview',
							description: 'Analytics features showcase.',
							duration: '4:15',
							category: 'SaaS',
							views: 6700,
							href: '#',
						},
						{
							thumbnail: 'https://picsum.photos/seed/vid4/800/450',
							title: 'Mobile App Tour',
							description: 'iOS app complete walkthrough.',
							duration: '6:30',
							category: 'Mobile',
							views: 4500,
							href: '#',
						},
						{
							thumbnail: 'https://picsum.photos/seed/vid5/800/450',
							title: 'AI Platform Demo',
							description: 'Machine learning in action.',
							duration: '8:00',
							category: 'AI/ML',
							views: 15600,
							href: '#',
						},
						{
							thumbnail: 'https://picsum.photos/seed/vid6/800/450',
							title: 'Design System',
							description: 'Component library showcase.',
							duration: '2:45',
							category: 'UI/UX',
							views: 3200,
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

interface VideoItem {
	thumbnail: string;
	title: string;
	description: string;
	duration: string;
	category: string;
	views: number;
	href: string;
}

const VideoGrid = ({ items }: { items: VideoItem[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
		{items.map(
			(
				{ thumbnail, title, description, duration, category, views, href },
				i,
			) => (
				<Link key={i} href={href} className="group block">
					<Card className="overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
						<div className="relative aspect-video overflow-hidden">
							<Image
								src={thumbnail}
								alt={title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>

							{/* Overlay */}
							<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

							{/* Play button */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="size-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
									<Play className="size-7 text-primary-foreground fill-primary-foreground ml-1" />
								</div>
							</div>

							{/* Duration */}
							<div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-white text-xs font-medium">
								{duration}
							</div>

							{/* Category */}
							<Badge className="absolute top-3 left-3">{category}</Badge>
						</div>

						<CardContent className="p-4">
							<h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
								{title}
							</h3>
							<p className="text-sm text-muted-foreground mb-3 line-clamp-1">
								{description}
							</p>

							<div className="flex items-center justify-between text-sm text-muted-foreground">
								<div className="flex items-center gap-1">
									<PlayCircle className="size-4" />
									{views.toLocaleString()} views
								</div>
								<ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</CardContent>
					</Card>
				</Link>
			),
		)}
	</div>
);
