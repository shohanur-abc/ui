import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, Aperture, Focus, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 mb-10 @md:mb-14">
					<div className="text-center max-w-3xl mx-auto">
						<Eyebrow icon={Aperture} text="Spotlight" />
						<Title text="Project Focus" />
						<Description text="Deep focus on individual project with full details." />
					</div>
				</div>

				<ProjectSpotlight
					project={{
						heroImage: 'https://picsum.photos/seed/spot1/1920/1080',
						logo: 'https://logo.clearbit.com/stripe.com',
						title: 'Banking Revolution Platform',
						client: 'Major Financial Institution',
						year: '2025',
						description:
							'A complete digital transformation of traditional banking services into a modern, user-centric platform. This project redefined how millions of users interact with their finances.',
						highlights: [
							'2M+ active users',
							'99.9% uptime',
							'45% faster transactions',
							'Award-winning UX',
						],
						technologies: [
							'React',
							'Node.js',
							'PostgreSQL',
							'AWS',
							'Redis',
							'GraphQL',
						],
						gallery: [
							'https://picsum.photos/seed/spot2/800/600',
							'https://picsum.photos/seed/spot3/800/600',
							'https://picsum.photos/seed/spot4/800/600',
						],
						caseStudyUrl: '#case-study',
						liveUrl: '#live',
					}}
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

interface SpotlightProject {
	heroImage: string;
	logo: string;
	title: string;
	client: string;
	year: string;
	description: string;
	highlights: string[];
	technologies: string[];
	gallery: string[];
	caseStudyUrl: string;
	liveUrl: string;
}

const ProjectSpotlight = ({ project }: { project: SpotlightProject }) => {
	const {
		heroImage,
		logo,
		title,
		client,
		year,
		description,
		highlights,
		technologies,
		gallery,
		caseStudyUrl,
		liveUrl,
	} = project;

	return (
		<div className="space-y-8">
			{/* Hero image */}
			<div className="relative aspect-[21/9] overflow-hidden">
				<Image src={heroImage} alt={title} fill className="object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

				{/* Content overlay */}
				<div className="absolute inset-0 flex items-end">
					<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 w-full pb-8 @md:pb-12">
						<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6">
							<div className="flex items-center gap-4">
								<div className="size-16 @md:size-20 rounded-2xl bg-white p-2 shadow-2xl flex items-center justify-center">
									<Image
										src={logo}
										alt={client}
										width={64}
										height={64}
										className="object-contain"
									/>
								</div>
								<div>
									<Badge variant="secondary" className="mb-2">
										{year}
									</Badge>
									<h3 className="text-2xl @md:text-4xl font-bold text-white">
										{title}
									</h3>
									<p className="text-white/80">{client}</p>
								</div>
							</div>

							<div className="flex gap-3">
								<Button variant="secondary" className="gap-2" asChild>
									<Link href={liveUrl}>
										Visit Live <ArrowUpRight className="size-4" />
									</Link>
								</Button>
								<Button className="gap-2" asChild>
									<Link href={caseStudyUrl}>
										Case Study <ArrowUpRight className="size-4" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Details */}
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-3 gap-8">
					{/* Description */}
					<div className="@lg:col-span-2">
						<h4 className="font-semibold text-lg mb-3">About the Project</h4>
						<p className="text-muted-foreground mb-6">{description}</p>

						{/* Gallery */}
						<div className="grid grid-cols-3 gap-3">
							{gallery.map((img, i) => (
								<div
									key={i}
									className="group relative aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer"
								>
									<Image
										src={img}
										alt={`${title} Screenshot ${i + 1}`}
										fill
										className="object-cover transition-transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
										<ZoomIn className="size-6 text-white" />
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Highlights */}
						<Card className="p-5">
							<h4 className="font-semibold mb-4">Key Highlights</h4>
							<div className="space-y-3">
								{highlights.map((highlight, i) => (
									<div key={i} className="flex items-center gap-2">
										<div className="size-2 rounded-full bg-primary" />
										<span className="text-sm">{highlight}</span>
									</div>
								))}
							</div>
						</Card>

						{/* Tech stack */}
						<Card className="p-5">
							<h4 className="font-semibold mb-4">Technologies</h4>
							<div className="flex flex-wrap gap-2">
								{technologies.map((tech, i) => (
									<Badge key={i} variant="secondary">
										{tech}
									</Badge>
								))}
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};
