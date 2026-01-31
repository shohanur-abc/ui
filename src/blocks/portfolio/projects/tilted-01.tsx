import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, RotateCw, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={RotateCw} text="Rotate" />
					<Title text="Tilted Cards" />
					<Description text="Dynamically tilted cards with hover straightening." />
				</div>

				<TiltedGrid
					items={[
						{
							image: 'https://picsum.photos/seed/tilt1/600/400',
							title: 'Enterprise Dashboard',
							description: 'Analytics platform for large organizations.',
							category: 'SaaS',
							rotation: -3,
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/tilt2/600/400',
							title: 'Mobile Banking',
							description: 'Secure financial app with biometric login.',
							category: 'Fintech',
							rotation: 2,
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/tilt3/600/400',
							title: 'E-Commerce Store',
							description: 'Full-featured online shopping platform.',
							category: 'Retail',
							rotation: -2,
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/tilt4/600/400',
							title: 'Healthcare Portal',
							description: 'Patient management and telehealth.',
							category: 'Health',
							rotation: 4,
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/tilt5/600/400',
							title: 'AI Content Tool',
							description: 'GPT-powered content generation.',
							category: 'AI/ML',
							rotation: -4,
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/tilt6/600/400',
							title: 'Learning Platform',
							description: 'Interactive online courses.',
							category: 'EdTech',
							rotation: 3,
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

interface TiltedItem {
	image: string;
	title: string;
	description: string;
	category: string;
	rotation: number;
	href: string;
}

const TiltedGrid = ({ items }: { items: TiltedItem[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-8 @md:gap-10 py-4">
		{items.map(({ image, title, description, category, rotation, href }, i) => (
			<Link key={i} href={href} className="group block">
				<Card
					className="overflow-hidden border shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 p-0"
					style={{
						transform: `rotate(${rotation}deg)`,
						transformOrigin: 'center center',
					}}
				>
					<div
						className="transition-transform duration-500 group-hover:scale-[1.02]"
						style={{ transform: `rotate(${-rotation}deg) scale(1.1)` }}
					>
						<div className="relative aspect-[4/3] overflow-hidden">
							<Image
								src={image}
								alt={title}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
							<Badge className="absolute top-4 left-4">{category}</Badge>
						</div>

						<CardContent className="p-5">
							<div className="flex items-start justify-between gap-3">
								<div>
									<h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
										{title}
									</h3>
									<p className="text-sm text-muted-foreground">{description}</p>
								</div>
								<ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
							</div>
						</CardContent>
					</div>
				</Card>
			</Link>
		))}
	</div>
);
