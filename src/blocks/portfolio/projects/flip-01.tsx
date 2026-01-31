import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, FlipHorizontal2, FlipVertical2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={FlipHorizontal2} text="Flip" />
					<Title text="Flip Cards" />
					<Description text="Interactive flip cards revealing project details." />
				</div>

				<FlipGrid
					items={[
						{
							frontImage: 'https://picsum.photos/seed/flip1/600/400',
							title: 'Dashboard Analytics',
							category: 'SaaS',
							description:
								'Real-time business intelligence platform with advanced data visualization.',
							technologies: ['React', 'D3.js', 'Node.js'],
							year: '2025',
							href: '#',
						},
						{
							frontImage: 'https://picsum.photos/seed/flip2/600/400',
							title: 'Mobile Banking',
							category: 'Fintech',
							description:
								'Secure mobile banking app with biometric authentication.',
							technologies: ['React Native', 'Node.js', 'PostgreSQL'],
							year: '2024',
							href: '#',
						},
						{
							frontImage: 'https://picsum.photos/seed/flip3/600/400',
							title: 'E-Commerce',
							category: 'Retail',
							description:
								'Full-featured online store with inventory management.',
							technologies: ['Next.js', 'Stripe', 'Prisma'],
							year: '2024',
							href: '#',
						},
						{
							frontImage: 'https://picsum.photos/seed/flip4/600/400',
							title: 'Healthcare Portal',
							category: 'Health',
							description: 'Patient management and telehealth platform.',
							technologies: ['Vue.js', 'Python', 'AWS'],
							year: '2024',
							href: '#',
						},
						{
							frontImage: 'https://picsum.photos/seed/flip5/600/400',
							title: 'AI Content Tool',
							category: 'AI/ML',
							description: 'GPT-powered content generation and optimization.',
							technologies: ['Python', 'OpenAI', 'FastAPI'],
							year: '2025',
							href: '#',
						},
						{
							frontImage: 'https://picsum.photos/seed/flip6/600/400',
							title: 'Learning Platform',
							category: 'EdTech',
							description: 'Interactive courses with progress tracking.',
							technologies: ['Next.js', 'MongoDB', 'Socket.io'],
							year: '2024',
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

interface FlipItem {
	frontImage: string;
	title: string;
	category: string;
	description: string;
	technologies: string[];
	year: string;
	href: string;
}

const FlipGrid = ({ items }: { items: FlipItem[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
		{items.map(
			(
				{ frontImage, title, category, description, technologies, year, href },
				i,
			) => (
				<div key={i} className="group h-72 [perspective:1000px]">
					<div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
						{/* Front face */}
						<Card className="absolute inset-0 [backface-visibility:hidden] overflow-hidden border p-0">
							<div className="relative h-full overflow-hidden">
								<Image
									src={frontImage}
									alt={title}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

								<Badge className="absolute top-4 left-4">{category}</Badge>

								<div className="absolute inset-x-0 bottom-0 p-5">
									<h3 className="text-white font-bold text-xl mb-1">{title}</h3>
									<p className="text-white/70 text-sm">Hover to see details</p>
								</div>
							</div>
						</Card>

						{/* Back face */}
						<Card className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden border bg-card">
							<CardContent className="h-full flex flex-col justify-between p-5">
								<div>
									<div className="flex items-center justify-between mb-3">
										<Badge variant="secondary">{year}</Badge>
										<Badge>{category}</Badge>
									</div>

									<h3 className="font-bold text-xl mb-2">{title}</h3>
									<p className="text-sm text-muted-foreground">{description}</p>
								</div>

								<div>
									<div className="flex flex-wrap gap-1.5 mb-4">
										{technologies.map((tech, j) => (
											<Badge key={j} variant="outline" className="text-xs">
												{tech}
											</Badge>
										))}
									</div>

									<Button className="w-full gap-2" asChild>
										<Link href={href}>
											View Project <ArrowUpRight className="size-4" />
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			),
		)}
	</div>
);
