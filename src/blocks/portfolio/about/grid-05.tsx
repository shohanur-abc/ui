import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="space-y-8">
					<HeaderSection
						src="https://picsum.photos/seed/gr5/400/400"
						fallback="DL"
						name="David Lee"
						role="Engineering Manager at Netflix"
						bio="Building and scaling engineering teams. 15+ years in tech."
					/>
					<div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-6">
						<ProjectCard
							title="Cloud Storage"
							company="Google"
							image="https://picsum.photos/seed/p1/400/300"
							description="Led architecture for petabyte-scale storage."
							link="https://example.com"
						/>
						<ProjectCard
							title="AWS S3"
							company="Amazon"
							image="https://picsum.photos/seed/p2/400/300"
							description="Core contributor to object storage service."
							link="https://example.com"
						/>
						<ProjectCard
							title="Streaming Platform"
							company="Netflix"
							image="https://picsum.photos/seed/p3/400/300"
							description="Building next-gen streaming infrastructure."
							link="https://example.com"
						/>
						<ProjectCard
							title="Azure Infrastructure"
							company="Microsoft"
							image="https://picsum.photos/seed/p4/400/300"
							description="Developer tools and infrastructure."
							link="https://example.com"
						/>
					</div>
					<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
						<TestimonialCard
							quote="David is one of the best engineering leaders I've worked with."
							author="Sarah Chen"
							role="VP Engineering, Google"
							avatar="https://picsum.photos/seed/av2/100/100"
							rating={5}
						/>
						<TestimonialCard
							quote="His technical depth combined with leadership skills is rare."
							author="Mike Johnson"
							role="CTO, Startup"
							avatar="https://picsum.photos/seed/av3/100/100"
							rating={5}
						/>
						<CTACard
							title="Let's Connect"
							description="Always happy to chat about engineering and leadership."
							cta={{
								label: 'Connect on LinkedIn',
								href: 'https://linkedin.com',
								icon: ArrowRight,
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

interface HeaderSectionProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	bio: string;
}

const HeaderSection = ({
	src,
	fallback,
	name,
	role,
	bio,
}: HeaderSectionProps) => (
	<div className="flex flex-col @md:flex-row items-center gap-6 text-center @md:text-left">
		<Avatar className="size-24 ring-4 ring-border">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="text-2xl bg-primary text-primary-foreground">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div>
			<h1 className="text-2xl @lg:text-3xl font-bold mb-1">{name}</h1>
			<p className="text-primary mb-2">{role}</p>
			<p className="text-muted-foreground">{bio}</p>
		</div>
	</div>
);

interface ProjectCardProps {
	title: string;
	company: string;
	image: string;
	description: string;
	link: string;
}

const ProjectCard = ({
	title,
	company,
	image,
	description,
	link,
}: ProjectCardProps) => (
	<Card className="overflow-hidden py-0">
		<div className="relative aspect-video">
			<Image src={image} alt={title} fill className="object-cover" />
		</div>
		<CardContent className="p-4">
			<Badge variant="outline" className="mb-2">
				{company}
			</Badge>
			<h3 className="font-semibold mb-1">{title}</h3>
			<p className="text-sm text-muted-foreground mb-3">{description}</p>
			<Button variant="ghost" size="sm" className="p-0 h-auto gap-1" asChild>
				<Link href={link}>
					View Project
					<ExternalLink className="size-3" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

interface TestimonialCardProps {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	rating: number;
}

const TestimonialCard = ({
	quote,
	author,
	role,
	avatar,
	rating,
}: TestimonialCardProps) => (
	<Card>
		<CardContent className="p-6">
			<div className="flex gap-0.5 mb-3">
				{Array.from({ length: rating }).map((_, i) => (
					<Star key={i} className="size-4 fill-yellow-500 text-yellow-500" />
				))}
			</div>
			<blockquote className="italic mb-4">&ldquo;{quote}&rdquo;</blockquote>
			<div className="flex items-center gap-3">
				<div className="relative size-10 rounded-full overflow-hidden">
					<Image src={avatar} alt={author} fill className="object-cover" />
				</div>
				<div>
					<p className="font-medium text-sm">{author}</p>
					<p className="text-xs text-muted-foreground">{role}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface CTACardProps {
	title: string;
	description: string;
	cta: CTAData;
}

const CTACard = ({ title, description, cta }: CTACardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader>
			<h2 className="text-lg font-bold">{title}</h2>
		</CardHeader>
		<CardContent>
			<p className="text-sm opacity-90 mb-4">{description}</p>
			<Button variant="secondary" className="gap-2" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);
