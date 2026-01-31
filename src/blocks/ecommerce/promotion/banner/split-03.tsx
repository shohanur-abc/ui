import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VideoThumbnail = ({
	src,
	alt,
	playLabel,
}: {
	src: string;
	alt: string;
	playLabel: string;
}) => (
	<div className="relative aspect-video @lg:aspect-[4/3] rounded-2xl overflow-hidden bg-card group cursor-pointer">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<div className="absolute inset-0 bg-background/40 flex items-center justify-center">
			<div className="flex flex-col items-center gap-3">
				<div className="size-16 @md:size-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
					<Play className="size-7 @md:size-8 text-primary-foreground ml-1" />
				</div>
				<span className="text-sm font-medium text-foreground">{playLabel}</span>
			</div>
		</div>
	</div>
);

const StoryContent = ({
	eyebrow,
	headline,
	description,
	cta,
}: {
	eyebrow: string;
	headline: string;
	description: string;
	cta: { label: string; href: string };
}) => (
	<div className="space-y-4 @md:space-y-6">
		<p className="text-primary font-medium text-sm uppercase tracking-wider">
			{eyebrow}
		</p>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl font-bold tracking-tight leading-tight">
			{headline}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg">{description}</p>
		<Button variant="outline" size="lg" className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
						<div className="order-2 @lg:order-1">
							<StoryContent
								eyebrow="Our Story"
								headline="Crafting Excellence Since 2010"
								description="Every product tells a story of dedication, innovation, and uncompromising quality. Watch our journey from a small workshop to a global brand loved by millions."
								cta={{ label: 'Discover Our Story', href: '/about' }}
							/>
						</div>
						<div className="order-1 @lg:order-2">
							<VideoThumbnail
								src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
								alt="Brand Story Video"
								playLabel="Watch Video (2:30)"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
