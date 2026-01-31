import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto space-y-16">
					<HeroSection
						src="https://picsum.photos/seed/stack6/400/400"
						name="Rachel Kim"
						role="Product Designer & Developer"
						tagline="Bridging the gap between design and code"
						bio="I design and build digital products that people love. With expertise in both UX design and frontend development, I create seamless experiences from concept to code."
					/>
					<Separator />
					<FeaturedWorkSection
						title="Featured Work"
						projects={[
							{
								title: 'Fintech Dashboard',
								category: 'Product Design',
								image: 'https://picsum.photos/seed/fw1/600/400',
								description:
									'Complete redesign of a financial analytics platform.',
								link: 'https://example.com',
							},
							{
								title: 'E-Commerce App',
								category: 'Mobile Design',
								image: 'https://picsum.photos/seed/fw2/600/400',
								description: 'End-to-end design for a fashion e-commerce app.',
								link: 'https://example.com',
							},
							{
								title: 'Design System',
								category: 'Systems',
								image: 'https://picsum.photos/seed/fw3/600/400',
								description:
									'Comprehensive design system with 200+ components.',
								link: 'https://example.com',
							},
						]}
					/>
					<Separator />
					<TestimonialSection
						quote="Rachel is a rare talent who can both design beautiful interfaces and bring them to life with clean code. Her work on our product exceeded all expectations."
						author="John Smith"
						role="CEO, TechStartup"
						avatar="https://picsum.photos/seed/av1/100/100"
						rating={5}
					/>
					<Separator />
					<ClientsSection
						title="Trusted By"
						clients={[
							'Google',
							'Apple',
							'Stripe',
							'Airbnb',
							'Spotify',
							'Netflix',
						]}
					/>
					<CTASection
						title="Have a Project in Mind?"
						description="I'm currently available for freelance work and consulting."
						cta={{
							label: 'Start a Project',
							href: '/contact',
							icon: ArrowRight,
						}}
					/>
				</div>
			</div>
		</section>
	);
}

interface HeroSectionProps {
	src: string;
	name: string;
	role: string;
	tagline: string;
	bio: string;
}

const HeroSection = ({ src, name, role, tagline, bio }: HeroSectionProps) => (
	<div className="flex flex-col @lg:flex-row gap-8 items-center">
		<div className="relative size-40 @lg:size-48 rounded-full overflow-hidden ring-4 ring-border shrink-0">
			<Image src={src} alt={name} fill className="object-cover" />
		</div>
		<div className="text-center @lg:text-left">
			<Badge variant="secondary" className="mb-3">
				{role}
			</Badge>
			<h1 className="text-3xl @lg:text-4xl font-bold mb-3">{name}</h1>
			<p className="text-xl text-primary mb-4">{tagline}</p>
			<p className="text-muted-foreground">{bio}</p>
		</div>
	</div>
);

interface ProjectItem {
	title: string;
	category: string;
	image: string;
	description: string;
	link: string;
}

interface FeaturedWorkSectionProps {
	title: string;
	projects: ProjectItem[];
}

const FeaturedWorkSection = ({ title, projects }: FeaturedWorkSectionProps) => (
	<div>
		<h2 className="text-2xl font-bold mb-8">{title}</h2>
		<div className="space-y-6">
			{projects.map((project) => (
				<Card key={project.title} className="overflow-hidden py-0">
					<div className="flex flex-col @md:flex-row">
						<div className="relative @md:w-48 aspect-video @md:aspect-auto">
							<Image
								src={project.image}
								alt={project.title}
								fill
								className="object-cover"
							/>
						</div>
						<CardContent className="flex-1 p-6 flex flex-col justify-center">
							<Badge variant="outline" className="w-fit mb-2">
								{project.category}
							</Badge>
							<h3 className="text-lg font-semibold mb-2">{project.title}</h3>
							<p className="text-sm text-muted-foreground mb-4">
								{project.description}
							</p>
							<Button
								variant="ghost"
								size="sm"
								className="w-fit gap-1 p-0"
								asChild
							>
								<Link href={project.link}>
									View Project
									<ExternalLink className="size-3" />
								</Link>
							</Button>
						</CardContent>
					</div>
				</Card>
			))}
		</div>
	</div>
);

interface TestimonialSectionProps {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	rating: number;
}

const TestimonialSection = ({
	quote,
	author,
	role,
	avatar,
	rating,
}: TestimonialSectionProps) => (
	<Card>
		<CardContent className="p-8 text-center">
			<div className="flex justify-center gap-1 mb-4">
				{Array.from({ length: rating }).map((_, i) => (
					<Star key={i} className="size-5 fill-yellow-500 text-yellow-500" />
				))}
			</div>
			<blockquote className="text-lg italic mb-6">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<div className="flex items-center justify-center gap-3">
				<div className="relative size-12 rounded-full overflow-hidden">
					<Image src={avatar} alt={author} fill className="object-cover" />
				</div>
				<div className="text-left">
					<p className="font-medium">{author}</p>
					<p className="text-sm text-muted-foreground">{role}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

interface ClientsSectionProps {
	title: string;
	clients: string[];
}

const ClientsSection = ({ title, clients }: ClientsSectionProps) => (
	<div className="text-center">
		<p className="text-sm text-muted-foreground mb-4">{title}</p>
		<div className="flex flex-wrap justify-center gap-4">
			{clients.map((client) => (
				<Badge key={client} variant="outline" className="text-sm py-2 px-4">
					{client}
				</Badge>
			))}
		</div>
	</div>
);

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface CTASectionProps {
	title: string;
	description: string;
	cta: CTAData;
}

const CTASection = ({ title, description, cta }: CTASectionProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="text-center">
			<h2 className="text-2xl font-bold">{title}</h2>
			<p className="opacity-90">{description}</p>
		</CardHeader>
		<CardContent className="flex justify-center">
			<Button variant="secondary" className="gap-2" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);
