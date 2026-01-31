import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Code, Palette, Server } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<ZigzagCards
					items={[
						{
							image: 'https://picsum.photos/seed/card1/700/500',
							icon: Code,
							title: 'Frontend Excellence',
							description:
								'Creating pixel-perfect interfaces with React, Next.js, and modern CSS frameworks.',
							stats: { value: '50+', label: 'Web Apps Built' },
							cta: { label: 'View Frontend Work', href: '#frontend' },
							reverse: false,
						},
						{
							image: 'https://picsum.photos/seed/card2/700/500',
							icon: Server,
							title: 'Backend Mastery',
							description:
								'Building robust APIs and services with Node.js, Python, and cloud technologies.',
							stats: { value: '100+', label: 'APIs Deployed' },
							cta: { label: 'Explore Backend', href: '#backend' },
							reverse: true,
						},
						{
							image: 'https://picsum.photos/seed/card3/700/500',
							icon: Palette,
							title: 'Design Systems',
							description:
								'Crafting cohesive component libraries and design tokens for scalable products.',
							stats: { value: '15+', label: 'Design Systems' },
							cta: { label: 'See Design Work', href: '#design' },
							reverse: false,
						},
					]}
				/>
			</div>
		</section>
	);
}

interface ZigzagCardItem {
	image: string;
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	stats: { value: string; label: string };
	cta: { label: string; href: string };
	reverse: boolean;
}

const ZigzagCards = ({ items }: { items: ZigzagCardItem[] }) => (
	<div className="space-y-12 @md:space-y-16">
		{items.map(
			({ image, icon: Icon, title, description, stats, cta, reverse }, i) => (
				<Card key={i} className="py-0 overflow-hidden">
					<div className={`grid @xl:grid-cols-2 ${reverse ? '' : ''}`}>
						<div
							className={`relative aspect-video @xl:aspect-auto min-h-[250px] ${reverse ? '@xl:order-2' : ''}`}
						>
							<Image src={image} alt={title} fill className="object-cover" />
						</div>

						<CardContent
							className={`p-6 @md:p-8 @xl:p-10 flex flex-col justify-center ${reverse ? '@xl:order-1' : ''}`}
						>
							<div className="flex items-start gap-4 mb-4 @md:mb-6">
								<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
									<Icon className="size-6 @md:size-7 text-primary" />
								</div>
								<div>
									<Badge variant="secondary" className="mb-2">
										Featured
									</Badge>
									<h2 className="text-xl @md:text-2xl @xl:text-3xl font-bold">
										{title}
									</h2>
								</div>
							</div>

							<p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-6">
								{description}
							</p>

							<div className="flex items-center justify-between">
								<div>
									<div className="text-2xl @md:text-3xl font-bold text-primary">
										{stats.value}
									</div>
									<div className="text-sm text-muted-foreground">
										{stats.label}
									</div>
								</div>

								<Button variant="outline" asChild>
									<Link href={cta.href}>
										{cta.label}
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</div>
						</CardContent>
					</div>
				</Card>
			),
		)}
	</div>
);
