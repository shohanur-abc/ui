import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const VideoBackground = ({ src, alt }: { src: string; alt: string }) => (
	<div className="absolute inset-0">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
	</div>
);

const PlayButton = ({ label }: { label: string }) => (
	<button className="group/play flex items-center gap-3">
		<div className="size-14 @md:size-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover/play:scale-110 transition-transform">
			<Play className="size-6 @md:size-7 text-primary-foreground ml-0.5" />
		</div>
		<span className="text-sm font-medium text-muted-foreground">{label}</span>
	</button>
);

const Testimonial = ({
	quote,
	author,
}: {
	quote: string;
	author: { name: string; title: string; avatar: string; initials: string };
}) => (
	<div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
		<p className="text-sm @md:text-base italic mb-4">"{quote}"</p>
		<div className="flex items-center gap-3">
			<Avatar className="size-10">
				<AvatarImage src={author.avatar} />
				<AvatarFallback>{author.initials}</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-medium text-sm">{author.name}</p>
				<p className="text-xs text-muted-foreground">{author.title}</p>
			</div>
		</div>
	</div>
);

const HeroContent = ({
	badge,
	headline,
	description,
	cta,
}: {
	badge: string;
	headline: { text: string; highlight: string };
	description: string;
	cta: { label: string; href: string };
}) => (
	<div className="space-y-6">
		<Badge variant="outline" className="border-primary/50 text-primary">
			{badge}
		</Badge>
		<h1 className="text-3xl @sm:text-4xl @md:text-5xl @lg:text-6xl font-bold tracking-tight leading-tight">
			{headline.text}
			<span className="text-primary block">{headline.highlight}</span>
		</h1>
		<p className="text-muted-foreground text-base @md:text-lg max-w-md">
			{description}
		</p>
		<Button size="lg" className="gap-2" asChild>
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
			<div className="relative min-h-[600px] @lg:min-h-[700px] py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<VideoBackground
					src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600"
					alt="Premium Products"
				/>
				<div className="relative max-w-7xl mx-auto h-full">
					<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center h-full">
						<HeroContent
							badge="New Launch"
							headline={{ text: 'Experience', highlight: 'Premium Quality' }}
							description="Discover our handcrafted collection of premium products designed for the discerning customer."
							cta={{ label: 'Explore Collection', href: '/collection' }}
						/>
						<div className="hidden @lg:flex flex-col items-end gap-8">
							<PlayButton label="Watch Brand Story" />
							<Testimonial
								quote="The quality exceeded my expectations. Best purchase I've made this year!"
								author={{
									name: 'Emily Chen',
									title: 'Verified Buyer',
									avatar: 'https://i.pravatar.cc/100?img=1',
									initials: 'EC',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
