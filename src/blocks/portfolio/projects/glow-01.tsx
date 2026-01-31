import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Sparkles, Wand2, MagicWand } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Wand2} text="Effects" />
					<Title text="Glow Cards" />
					<Description text="Projects with animated glow and gradient effects." />
				</div>

				<GlowGrid
					items={[
						{
							image: 'https://picsum.photos/seed/glow1/600/400',
							title: 'AI Platform',
							description: 'Next-gen artificial intelligence platform.',
							glowColor: 'from-cyan-500 to-blue-500',
							category: 'AI/ML',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/glow2/600/400',
							title: 'Crypto Dashboard',
							description: 'Real-time cryptocurrency tracking.',
							glowColor: 'from-purple-500 to-pink-500',
							category: 'Web3',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/glow3/600/400',
							title: 'Gaming Platform',
							description: 'Multiplayer gaming experience.',
							glowColor: 'from-green-500 to-emerald-500',
							category: 'Gaming',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/glow4/600/400',
							title: 'Music Studio',
							description: 'Digital audio workstation.',
							glowColor: 'from-orange-500 to-red-500',
							category: 'Audio',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/glow5/600/400',
							title: 'AR Experience',
							description: 'Augmented reality application.',
							glowColor: 'from-yellow-500 to-orange-500',
							category: 'AR/VR',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/glow6/600/400',
							title: 'Space Explorer',
							description: 'Interactive space visualization.',
							glowColor: 'from-indigo-500 to-purple-500',
							category: '3D',
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

interface GlowItem {
	image: string;
	title: string;
	description: string;
	glowColor: string;
	category: string;
	href: string;
}

const GlowGrid = ({ items }: { items: GlowItem[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6 @md:gap-8">
		{items.map(
			({ image, title, description, glowColor, category, href }, i) => (
				<Link key={i} href={href} className="group block">
					<div className="relative p-[2px] rounded-2xl overflow-hidden">
						{/* Animated glow border */}
						<div
							className={`absolute inset-0 bg-gradient-to-r ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
							style={{
								animation: 'spin 3s linear infinite',
							}}
						/>
						<div
							className={`absolute inset-0 bg-gradient-to-r ${glowColor} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
						/>

						<Card className="relative overflow-hidden border-0 bg-card transition-all p-0">
							{/* Glow background */}
							<div
								className={`absolute -inset-2 bg-gradient-to-r ${glowColor} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
							/>

							<div className="relative aspect-video overflow-hidden">
								<Image
									src={image}
									alt={title}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

								{/* Category with glow */}
								<Badge
									className={`absolute top-3 left-3 bg-gradient-to-r ${glowColor} shadow-lg`}
								>
									<Sparkles className="size-3 mr-1" />
									{category}
								</Badge>
							</div>

							<CardContent className="relative p-5">
								<h3 className="font-bold text-xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${glowColor} transition-all">
									{title}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{description}
								</p>

								<div className="flex items-center justify-between">
									<Button
										variant="outline"
										size="sm"
										className={`gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity border-0 bg-gradient-to-r ${glowColor} text-white`}
									>
										View Project <ArrowUpRight className="size-3.5" />
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</Link>
			),
		)}
	</div>
);
