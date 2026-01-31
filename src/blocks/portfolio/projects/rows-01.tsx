import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Rows3, AlignJustify } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Rows3} text="Rows" />
					<Title text="Horizontal Rows" />
					<Description text="Clean horizontal layout with detailed project info." />
				</div>

				<RowList
					items={[
						{
							image: 'https://picsum.photos/seed/row1/400/400',
							title: 'Enterprise Analytics Dashboard',
							description:
								'Real-time business intelligence platform with advanced data visualization and predictive analytics.',
							category: 'SaaS',
							year: '2025',
							technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/row2/400/400',
							title: 'Mobile Banking Application',
							description:
								'Secure mobile banking solution with biometric authentication and instant transfers.',
							category: 'Fintech',
							year: '2024',
							technologies: ['React Native', 'Node.js', 'AWS'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/row3/400/400',
							title: 'Healthcare Management Portal',
							description:
								'Comprehensive patient management system with telehealth integration.',
							category: 'Health',
							year: '2024',
							technologies: ['Vue.js', 'Python', 'MongoDB'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/row4/400/400',
							title: 'AI Content Generation Platform',
							description:
								'GPT-powered content creation and optimization tool for marketing teams.',
							category: 'AI/ML',
							year: '2025',
							technologies: ['Python', 'OpenAI', 'FastAPI', 'Redis'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/row5/400/400',
							title: 'E-Commerce Platform Redesign',
							description:
								'Complete overhaul of online shopping experience with improved conversion.',
							category: 'Retail',
							year: '2024',
							technologies: ['Next.js', 'Stripe', 'Prisma'],
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

interface RowItem {
	image: string;
	title: string;
	description: string;
	category: string;
	year: string;
	technologies: string[];
	href: string;
}

const RowList = ({ items }: { items: RowItem[] }) => (
	<div className="space-y-4">
		{items.map(
			(
				{ image, title, description, category, year, technologies, href },
				i,
			) => (
				<Link key={i} href={href} className="group block">
					<Card className="overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
						<div className="flex flex-col @md:flex-row">
							{/* Image */}
							<div className="relative @md:w-48 @lg:w-56 aspect-video @md:aspect-square shrink-0 overflow-hidden bg-muted">
								<Image
									src={image}
									alt={title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>

							{/* Content */}
							<CardContent className="flex-1 p-4 @md:p-6 flex flex-col @lg:flex-row @lg:items-center gap-4">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-2">
										<Badge>{category}</Badge>
										<Badge variant="secondary">{year}</Badge>
									</div>

									<h3 className="font-bold text-lg @md:text-xl mb-2 group-hover:text-primary transition-colors">
										{title}
									</h3>
									<p className="text-sm text-muted-foreground line-clamp-2">
										{description}
									</p>
								</div>

								{/* Technologies */}
								<div className="@lg:w-48 shrink-0">
									<div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
										Tech Stack
									</div>
									<div className="flex flex-wrap gap-1">
										{technologies.slice(0, 4).map((tech, j) => (
											<Badge key={j} variant="outline" className="text-xs">
												{tech}
											</Badge>
										))}
										{technologies.length > 4 && (
											<Badge variant="outline" className="text-xs">
												+{technologies.length - 4}
											</Badge>
										)}
									</div>
								</div>

								{/* Arrow */}
								<div className="@lg:pl-4">
									<div className="size-10 rounded-full border flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary">
										<ArrowUpRight className="size-5 transition-colors group-hover:text-primary-foreground" />
									</div>
								</div>
							</CardContent>
						</div>
					</Card>
				</Link>
			),
		)}
	</div>
);
