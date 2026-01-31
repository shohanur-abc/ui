import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, ShoppingBag, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const InfluencerCard = ({
	image,
	name,
	handle,
	avatar,
	followers,
	products,
}: {
	image: { src: string; alt: string };
	name: string;
	handle: string;
	avatar: string;
	followers: string;
	products: { image: string; price: string }[];
}) => (
	<div className="rounded-2xl border bg-card overflow-hidden">
		<div className="relative aspect-[4/5]">
			<Image src={image.src} alt={image.alt} fill className="object-cover" />
			<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
			<div className="absolute bottom-0 inset-x-0 p-4">
				<div className="flex items-center gap-3 mb-3">
					<Avatar className="size-10 border-2 border-background">
						<AvatarImage src={avatar} />
						<AvatarFallback>{name[0]}</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold text-white">{name}</p>
						<p className="text-xs text-white/70">
							{handle} • {followers}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div className="p-4">
			<p className="text-sm text-muted-foreground mb-3">Shop {name}'s picks:</p>
			<div className="flex gap-2">
				{products.map((product, i) => (
					<div
						key={i}
						className="relative size-16 rounded-lg overflow-hidden group cursor-pointer"
					>
						<Image
							src={product.image}
							alt="Product"
							fill
							className="object-cover group-hover:scale-110 transition-transform"
						/>
						<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
							<span className="text-xs text-white font-medium">
								{product.price}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
);

const SectionHeader = ({
	eyebrow,
	title,
	description,
}: {
	eyebrow: string;
	title: string;
	description: string;
}) => (
	<div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
		<Badge variant="secondary" className="gap-2">
			<Sparkles className="size-4" />
			{eyebrow}
		</Badge>
		<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
			{title}
		</h1>
		<p className="text-lg text-muted-foreground">{description}</p>
	</div>
);

const CTA = ({ label, href }: { label: string; href: string }) => (
	<div className="text-center mt-8">
		<Button size="lg" variant="outline" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<SectionHeader
					eyebrow="Influencer Picks"
					title="Shop Their Style"
					description="Get inspired by our favorite creators. Shop curated collections from top fashion influencers."
				/>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
					<InfluencerCard
						image={{
							src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop',
							alt: 'Influencer 1',
						}}
						name="Sarah Johnson"
						handle="@sarahstyle"
						avatar="https://i.pravatar.cc/150?img=1"
						followers="1.2M followers"
						products={[
							{
								image:
									'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
								price: '$129',
							},
							{
								image:
									'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop',
								price: '$189',
							},
							{
								image:
									'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
								price: '$249',
							},
						]}
					/>
					<InfluencerCard
						image={{
							src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=750&fit=crop',
							alt: 'Influencer 2',
						}}
						name="Emma Davis"
						handle="@emmad"
						avatar="https://i.pravatar.cc/150?img=2"
						followers="890K followers"
						products={[
							{
								image:
									'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&h=100&fit=crop',
								price: '$79',
							},
							{
								image:
									'https://images.unsplash.com/photo-1541643600914-78b084683601?w=100&h=100&fit=crop',
								price: '$99',
							},
							{
								image:
									'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop',
								price: '$159',
							},
						]}
					/>
					<InfluencerCard
						image={{
							src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=750&fit=crop',
							alt: 'Influencer 3',
						}}
						name="Mia Chen"
						handle="@miafashion"
						avatar="https://i.pravatar.cc/150?img=3"
						followers="2.1M followers"
						products={[
							{
								image:
									'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop',
								price: '$299',
							},
							{
								image:
									'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
								price: '$149',
							},
							{
								image:
									'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop',
								price: '$89',
							},
						]}
					/>
				</div>
				<CTA label="View All Influencers" href="/influencers" />
			</div>
		</section>
	);
}
