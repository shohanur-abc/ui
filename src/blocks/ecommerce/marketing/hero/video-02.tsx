import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const VideoThumbnail = ({
	src,
	alt,
	duration,
}: {
	src: string;
	alt: string;
	duration: string;
}) => (
	<div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover group-hover:scale-105 transition-transform duration-500"
		/>
		<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
			<div className="size-16 @md:size-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
				<Play className="size-8 @md:size-10 text-white fill-white ml-1" />
			</div>
		</div>
		<Badge className="absolute bottom-4 right-4">{duration}</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground">{text}</p>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: React.ElementType;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap gap-3">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
					<VideoThumbnail
						src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=675&fit=crop"
						alt="Brand story video"
						duration="2:45"
					/>
					<div className="space-y-6">
						<Badge variant="outline">Our Story</Badge>
						<Title text="Crafted With" highlight="Passion" />
						<Description text="Watch how our artisans bring each piece to life. From raw materials to the finished product, every step is guided by a commitment to excellence and sustainability." />
						<CTA
							items={[
								{ label: 'Watch Full Story', href: '#video', icon: Play },
								{
									label: 'Shop Collection',
									href: '/collection',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
