import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<VideoZigzag
					items={[
						{
							thumbnail: 'https://picsum.photos/seed/vid1/800/600',
							eyebrow: 'Case Study',
							title: 'How We Helped TechCorp Scale to 1M Users',
							description:
								'Learn how our engineering team built a scalable infrastructure that handled exponential growth without downtime.',
							duration: '5:30',
							ctaHref: '/case-studies/techcorp',
						},
						{
							thumbnail: 'https://picsum.photos/seed/vid2/800/600',
							eyebrow: 'Tutorial',
							title: 'Modern Web Architecture Explained',
							description:
								'Our CTO breaks down the architecture patterns we use to build performant, maintainable applications.',
							duration: '12:45',
							ctaHref: '/resources/architecture',
						},
						{
							thumbnail: 'https://picsum.photos/seed/vid3/800/600',
							eyebrow: 'Webinar',
							title: 'Cloud Migration Best Practices',
							description:
								'Join our cloud experts as they share lessons learned from migrating 100+ enterprise workloads.',
							duration: '45:00',
							ctaHref: '/resources/cloud-migration',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface VideoItem {
	thumbnail: string;
	eyebrow: string;
	title: string;
	description: string;
	duration: string;
	ctaHref: string;
}

const VideoZigzag = ({ items }: { items: VideoItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(
			({ thumbnail, eyebrow, title, description, duration, ctaHref }, i) => (
				<div
					key={i}
					className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center"
				>
					<div className={i % 2 === 1 ? '@xl:order-2' : ''}>
						<Badge variant="outline" className="mb-3">
							{eyebrow}
						</Badge>
						<h3 className="text-xl @sm:text-2xl @md:text-3xl font-bold tracking-tight mb-4">
							{title}
						</h3>
						<p className="text-base text-muted-foreground leading-relaxed mb-6">
							{description}
						</p>

						<div className="flex items-center gap-4">
							<Button asChild>
								<Link href={ctaHref}>
									<Play className="size-4" />
									Watch Now
								</Link>
							</Button>
							<span className="text-sm text-muted-foreground">{duration}</span>
						</div>
					</div>
					<div
						className={`relative aspect-video rounded-2xl overflow-hidden group cursor-pointer ${
							i % 2 === 1 ? '@xl:order-1' : ''
						}`}
					>
						<Image
							src={thumbnail}
							alt={title}
							fill
							className="object-cover transition-transform group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="size-16 @md:size-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
								<Play className="size-6 @md:size-8 text-primary-foreground fill-current ml-1" />
							</div>
						</div>
						<div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
							{duration}
						</div>
					</div>
				</div>
			),
		)}
	</div>
);
