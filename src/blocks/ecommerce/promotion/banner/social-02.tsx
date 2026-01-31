import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Instagram, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InstagramPost = ({
	src,
	alt,
	likes,
	comments,
	href,
}: {
	src: string;
	alt: string;
	likes: string;
	comments: string;
	href: string;
}) => (
	<Link
		href={href}
		className="group relative aspect-square rounded-xl overflow-hidden bg-card"
	>
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
			<div className="flex items-center gap-1 text-sm font-medium">
				<Heart className="size-4 fill-current" />
				{likes}
			</div>
			<div className="flex items-center gap-1 text-sm font-medium">
				<MessageCircle className="size-4" />
				{comments}
			</div>
		</div>
	</Link>
);

const SectionHeader = ({
	icon: Icon,
	headline,
	handle,
	cta,
}: {
	icon: React.ElementType;
	headline: string;
	handle: string;
	cta: { label: string; href: string };
}) => (
	<div className="flex flex-wrap items-center justify-between gap-4 mb-6 @md:mb-8">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
				<Icon className="size-5 text-white" />
			</div>
			<div>
				<h2 className="text-xl @sm:text-2xl font-bold">{headline}</h2>
				<p className="text-sm text-muted-foreground">{handle}</p>
			</div>
		</div>
		<Button variant="outline" className="gap-2" asChild>
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
			<div className="bg-card py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-6xl mx-auto">
					<SectionHeader
						icon={Instagram}
						headline="Shop Our Feed"
						handle="@brandname"
						cta={{ label: 'Follow Us', href: 'https://instagram.com' }}
					/>
					<div className="grid grid-cols-2 @md:grid-cols-4 @lg:grid-cols-6 gap-3 @md:gap-4">
						<InstagramPost
							src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
							alt="Watch"
							likes="2.4K"
							comments="156"
							href="/product/1"
						/>
						<InstagramPost
							src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
							alt="Shoes"
							likes="1.8K"
							comments="89"
							href="/product/2"
						/>
						<InstagramPost
							src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400"
							alt="Sunglasses"
							likes="3.2K"
							comments="234"
							href="/product/3"
						/>
						<InstagramPost
							src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"
							alt="Bag"
							likes="2.1K"
							comments="178"
							href="/product/4"
						/>
						<InstagramPost
							src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
							alt="Headphones"
							likes="4.5K"
							comments="312"
							href="/product/5"
						/>
						<InstagramPost
							src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400"
							alt="Camera"
							likes="1.9K"
							comments="145"
							href="/product/6"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
