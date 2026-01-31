import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Layers3, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Layers3} text="Depth" />
					<Title text="Layered Showcase" />
					<Description text="Projects displayed with depth and dimensional effects." />
				</div>

				<LayeredGrid
					items={[
						{
							images: [
								'https://picsum.photos/seed/layer1a/600/400',
								'https://picsum.photos/seed/layer1b/600/400',
								'https://picsum.photos/seed/layer1c/600/400',
							],
							title: 'Dashboard Suite',
							description:
								'Multi-view analytics platform with customizable layouts.',
							tags: ['React', 'D3.js'],
							href: '#',
						},
						{
							images: [
								'https://picsum.photos/seed/layer2a/600/400',
								'https://picsum.photos/seed/layer2b/600/400',
								'https://picsum.photos/seed/layer2c/600/400',
							],
							title: 'Mobile App Collection',
							description: 'Suite of connected mobile applications.',
							tags: ['React Native', 'Expo'],
							href: '#',
						},
						{
							images: [
								'https://picsum.photos/seed/layer3a/600/400',
								'https://picsum.photos/seed/layer3b/600/400',
								'https://picsum.photos/seed/layer3c/600/400',
							],
							title: 'E-Commerce Platform',
							description: 'Complete shopping experience with admin tools.',
							tags: ['Next.js', 'Stripe'],
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

interface LayeredItem {
	images: string[];
	title: string;
	description: string;
	tags: string[];
	href: string;
}

const LayeredGrid = ({ items }: { items: LayeredItem[] }) => (
	<div className="grid @lg:grid-cols-3 gap-8">
		{items.map(({ images, title, description, tags, href }, i) => (
			<Link key={i} href={href} className="group block">
				{/* Stacked images */}
				<div className="relative h-64 @md:h-72 mb-6 perspective-1000">
					{images
						.slice(0, 3)
						.reverse()
						.map((image, j) => {
							const reverseIndex = images.length - 1 - j;
							return (
								<div
									key={j}
									className="absolute inset-x-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ease-out border bg-card"
									style={{
										bottom: `${reverseIndex * 16}px`,
										left: `${reverseIndex * 8}px`,
										right: `${reverseIndex * 8}px`,
										zIndex: j,
										transform: `
                                        rotateX(${reverseIndex * 5}deg) 
                                        translateY(${reverseIndex * -10}px)
                                    `,
										transformStyle: 'preserve-3d',
									}}
								>
									<div className="relative aspect-video">
										<Image
											src={image}
											alt={`${title} Layer ${j + 1}`}
											fill
											className="object-cover"
										/>
									</div>
								</div>
							);
						})}

					{/* Hover expand indicator */}
					<div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all">
						<div className="bg-primary rounded-full p-2 shadow-lg">
							<ChevronUp className="size-4 text-primary-foreground" />
						</div>
					</div>
				</div>

				{/* Info */}
				<Card className="border-0 bg-transparent shadow-none">
					<CardContent className="p-0 text-center">
						<h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
							{title}
						</h3>
						<p className="text-sm text-muted-foreground mb-4">{description}</p>

						<div className="flex items-center justify-center gap-2">
							{tags.map((tag, j) => (
								<Badge key={j} variant="secondary">
									{tag}
								</Badge>
							))}
							<ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
						</div>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);
