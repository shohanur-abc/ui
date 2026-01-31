import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, MapPin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="space-y-24">
					<IntroBlock
						src="https://picsum.photos/seed/zz1/600/600"
						fallback="JD"
						name="John Doe"
						role="Software Engineer"
						location="San Francisco, CA"
						bio="I'm a software engineer with 8+ years of experience building web applications. I specialize in React, TypeScript, and Node.js."
						socials={[
							{ icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
							{ icon: Github, href: 'https://github.com', label: 'GitHub' },
							{
								icon: Linkedin,
								href: 'https://linkedin.com',
								label: 'LinkedIn',
							},
						]}
						reverse={false}
					/>
					<StoryBlock
						src="https://picsum.photos/seed/zz2/600/600"
						title="My Story"
						paragraphs={[
							'I started coding when I was 14, building simple games in JavaScript. That curiosity led me to study Computer Science at Stanford, where I discovered my passion for web development.',
							"Over the past 8 years, I've worked at Google, Meta, and several startups. I've learned that the best products come from teams that care deeply about their users.",
						]}
						reverse={true}
					/>
					<CTABlock
						src="https://picsum.photos/seed/zz3/600/600"
						title="Let's Work Together"
						description="I'm always open to discussing new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out."
						cta={{ label: 'Get in Touch', href: '/contact', icon: ArrowRight }}
						reverse={false}
					/>
				</div>
			</div>
		</section>
	);
}

interface SocialItem {
	icon: React.ComponentType<{ className?: string }>;
	href: string;
	label: string;
}

interface IntroBlockProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	location: string;
	bio: string;
	socials: SocialItem[];
	reverse: boolean;
}

const IntroBlock = ({
	src,
	fallback,
	name,
	role,
	location,
	bio,
	socials,
	reverse,
}: IntroBlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<Avatar className="size-80 mx-auto ring-4 ring-border">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-6xl bg-primary text-primary-foreground">
					{fallback}
				</AvatarFallback>
			</Avatar>
		</div>
		<div className="@lg:w-1/2 text-center @lg:text-left">
			<Badge variant="secondary" className="mb-4">
				{role}
			</Badge>
			<h1 className="text-4xl @xl:text-5xl font-bold mb-4">{name}</h1>
			<div className="flex items-center justify-center @lg:justify-start gap-1 text-muted-foreground mb-4">
				<MapPin className="size-4" />
				<span>{location}</span>
			</div>
			<p className="text-lg text-muted-foreground mb-6">{bio}</p>
			<div className="flex gap-2 justify-center @lg:justify-start">
				{socials.map(({ icon: Icon, href, label }) => (
					<Button key={label} variant="outline" size="icon" asChild>
						<Link href={href} aria-label={label}>
							<Icon className="size-4" />
						</Link>
					</Button>
				))}
			</div>
		</div>
	</div>
);

interface StoryBlockProps {
	src: string;
	title: string;
	paragraphs: string[];
	reverse: boolean;
}

const StoryBlock = ({ src, title, paragraphs, reverse }: StoryBlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<div className="relative aspect-square rounded-2xl overflow-hidden">
				<Image src={src} alt={title} fill className="object-cover" />
			</div>
		</div>
		<div className="@lg:w-1/2">
			<h2 className="text-3xl font-bold mb-6">{title}</h2>
			<div className="space-y-4 text-lg text-muted-foreground">
				{paragraphs.map((p, i) => (
					<p key={i}>{p}</p>
				))}
			</div>
		</div>
	</div>
);

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface CTABlockProps {
	src: string;
	title: string;
	description: string;
	cta: CTAData;
	reverse: boolean;
}

const CTABlock = ({ src, title, description, cta, reverse }: CTABlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<div className="relative aspect-square rounded-2xl overflow-hidden">
				<Image src={src} alt={title} fill className="object-cover" />
			</div>
		</div>
		<div className="@lg:w-1/2">
			<h2 className="text-3xl font-bold mb-4">{title}</h2>
			<p className="text-lg text-muted-foreground mb-8">{description}</p>
			<Button size="lg" className="gap-2" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-5" />
				</Link>
			</Button>
		</div>
	</div>
);
