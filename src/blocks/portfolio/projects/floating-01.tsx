import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ImageDown, ImageUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={ImageUp} text="Float" />
					<Title text="Floating Cards" />
					<Description text="Elevated cards with shadow depth effect." />
				</div>

				<FloatingGrid
					items={[
						{
							image: 'https://picsum.photos/seed/float1/600/400',
							title: 'AI-Powered Analytics',
							description:
								'Machine learning dashboard with predictive insights.',
							category: 'AI/ML',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/float2/600/400',
							title: 'Fintech Platform',
							description: 'Modern banking experience for digital natives.',
							category: 'Fintech',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/float3/600/400',
							title: 'Healthcare System',
							description: 'Patient management with telehealth integration.',
							category: 'Health',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/float4/600/400',
							title: 'E-Commerce Suite',
							description: 'Complete shopping platform with inventory.',
							category: 'Retail',
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

interface FloatingItem {
	image: string;
	title: string;
	description: string;
	category: string;
	href: string;
}

const FloatingGrid = ({ items }: { items: FloatingItem[] }) => (
	<div className="grid @sm:grid-cols-2 gap-8 @lg:gap-10">
		{items.map(({ image, title, description, category, href }, i) => (
			<Link key={i} href={href} className="group block">
				<div className="relative">
					{/* Shadow element */}
					<div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl transform translate-y-4 transition-all duration-500 group-hover:translate-y-6 group-hover:blur-2xl group-hover:bg-primary/30" />

					{/* Card */}
					<Card className="relative overflow-hidden border shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl p-0">
						<div className="relative aspect-video overflow-hidden">
							<Image
								src={image}
								alt={title}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
							<Badge className="absolute top-4 left-4">{category}</Badge>
						</div>

						<CardContent className="p-5 @md:p-6">
							<div className="flex items-start justify-between gap-4">
								<div>
									<h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
										{title}
									</h3>
									<p className="text-sm text-muted-foreground">{description}</p>
								</div>
								<div className="size-10 rounded-full border flex items-center justify-center shrink-0 transition-all group-hover:bg-primary group-hover:border-primary">
									<ArrowUpRight className="size-5 transition-colors group-hover:text-primary-foreground" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</Link>
		))}
	</div>
);
