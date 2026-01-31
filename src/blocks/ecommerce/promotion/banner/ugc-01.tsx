import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	Camera,
	Hash,
	Heart,
	MessageCircle,
	Instagram,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const UGCCard = ({
	image,
	username,
	likes,
}: {
	image: string;
	username: string;
	likes: string;
}) => (
	<div className="group relative aspect-square rounded-xl overflow-hidden">
		<Image
			src={image}
			alt={`Photo by ${username}`}
			fill
			className="object-cover group-hover:scale-105 transition-transform duration-300"
		/>
		<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
			<div className="text-white text-center">
				<p className="font-semibold">@{username}</p>
				<div className="flex items-center justify-center gap-1 text-sm">
					<Heart className="size-4 fill-white" />
					<span>{likes}</span>
				</div>
			</div>
		</div>
	</div>
);

const SectionHeader = ({
	badge,
	headline,
	hashtag,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	hashtag: string;
	cta: { label: string; href: string };
}) => (
	<div className="flex flex-col @md:flex-row @md:items-end justify-between gap-4 mb-10">
		<div>
			<Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 gap-1.5 mb-4">
				<badge.icon className="size-3" />
				{badge.text}
			</Badge>
			<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-2">
				{headline.text}
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
					{' '}
					{headline.highlight}
				</span>
			</h2>
			<p className="text-muted-foreground flex items-center gap-1">
				<Hash className="size-4" />
				{hashtag}
			</p>
		</div>
		<Button variant="outline" className="gap-2 shrink-0" asChild>
			<Link href={cta.href}>
				<Instagram className="size-4" />
				{cta.label}
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-6xl mx-auto">
					<SectionHeader
						badge={{ icon: Camera, text: 'Community' }}
						headline={{ text: 'Share Your', highlight: 'Style' }}
						hashtag="ShopWithUs"
						cta={{ label: 'Follow Us', href: 'https://instagram.com' }}
					/>
					<div className="grid grid-cols-3 @md:grid-cols-6 gap-3">
						<UGCCard
							image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
							username="techie"
							likes="2.4K"
						/>
						<UGCCard
							image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300"
							username="audiophile"
							likes="1.8K"
						/>
						<UGCCard
							image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300"
							username="fitnessfan"
							likes="3.1K"
						/>
						<UGCCard
							image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300"
							username="traveler"
							likes="2.2K"
						/>
						<UGCCard
							image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
							username="musiclover"
							likes="1.5K"
						/>
						<UGCCard
							image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
							username="gadgetguru"
							likes="2.9K"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
