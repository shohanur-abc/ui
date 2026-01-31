import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Briefcase, Code, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="space-y-32">
					<HeroBlock
						src="https://picsum.photos/seed/zz4/800/600"
						name="Sarah Chen"
						role="Product Designer"
						tagline="Designing experiences that matter"
						stats={[
							{ icon: Briefcase, value: '10+', label: 'Years' },
							{ icon: Code, value: '100+', label: 'Projects' },
							{ icon: Users, value: '50+', label: 'Clients' },
							{ icon: Award, value: '15', label: 'Awards' },
						]}
						reverse={false}
					/>
					<StoryBlock
						src="https://picsum.photos/seed/zz5/800/600"
						eyebrow="My Journey"
						title="From Curiosity to Craft"
						paragraphs={[
							'I fell in love with design when I was 12, creating custom themes for my blog. That curiosity led me to study design at RISD.',
							"Over the past decade, I've designed products for companies like Google, Airbnb, and Stripe. I've learned that great design isn't about making things pretty—it's about solving problems.",
						]}
						reverse={true}
					/>
					<ApproachBlock
						src="https://picsum.photos/seed/zz6/800/600"
						eyebrow="Philosophy"
						title="My Design Approach"
						points={[
							{
								title: 'User First',
								description:
									'Every decision starts with understanding user needs.',
							},
							{
								title: 'Simplicity Wins',
								description: 'The best solutions are often the simplest ones.',
							},
							{
								title: 'Details Matter',
								description: 'Polish and craft make the difference.',
							},
						]}
						reverse={false}
					/>
					<CTABlock
						src="https://picsum.photos/seed/zz7/800/600"
						title="Ready to Start?"
						description="Let's create something amazing together. I'm currently available for freelance projects."
						primaryCTA={{ label: 'Start a Project', href: '/contact' }}
						secondaryCTA={{ label: 'View Work', href: '/projects' }}
						reverse={true}
					/>
				</div>
			</div>
		</section>
	);
}

interface StatItem {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

interface HeroBlockProps {
	src: string;
	name: string;
	role: string;
	tagline: string;
	stats: StatItem[];
	reverse: boolean;
}

const HeroBlock = ({
	src,
	name,
	role,
	tagline,
	stats,
	reverse,
}: HeroBlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
				<Image src={src} alt={name} fill className="object-cover" />
			</div>
		</div>
		<div className="@lg:w-1/2">
			<Badge className="mb-4">{role}</Badge>
			<h1 className="text-4xl @xl:text-5xl font-bold mb-4">{name}</h1>
			<p className="text-xl text-muted-foreground mb-8">{tagline}</p>
			<div className="grid grid-cols-4 gap-4">
				{stats.map(({ icon: Icon, value, label }) => (
					<div key={label} className="text-center">
						<Icon className="size-5 text-primary mx-auto mb-1" />
						<div className="text-2xl font-bold">{value}</div>
						<div className="text-xs text-muted-foreground">{label}</div>
					</div>
				))}
			</div>
		</div>
	</div>
);

interface StoryBlockProps {
	src: string;
	eyebrow: string;
	title: string;
	paragraphs: string[];
	reverse: boolean;
}

const StoryBlock = ({
	src,
	eyebrow,
	title,
	paragraphs,
	reverse,
}: StoryBlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
				<Image src={src} alt={title} fill className="object-cover" />
			</div>
		</div>
		<div className="@lg:w-1/2">
			<Badge variant="outline" className="mb-4">
				{eyebrow}
			</Badge>
			<h2 className="text-3xl font-bold mb-6">{title}</h2>
			<div className="space-y-4 text-lg text-muted-foreground">
				{paragraphs.map((p, i) => (
					<p key={i}>{p}</p>
				))}
			</div>
		</div>
	</div>
);

interface ApproachPoint {
	title: string;
	description: string;
}

interface ApproachBlockProps {
	src: string;
	eyebrow: string;
	title: string;
	points: ApproachPoint[];
	reverse: boolean;
}

const ApproachBlock = ({
	src,
	eyebrow,
	title,
	points,
	reverse,
}: ApproachBlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
				<Image src={src} alt={title} fill className="object-cover" />
			</div>
		</div>
		<div className="@lg:w-1/2">
			<Badge variant="outline" className="mb-4">
				{eyebrow}
			</Badge>
			<h2 className="text-3xl font-bold mb-8">{title}</h2>
			<div className="space-y-6">
				{points.map((point, i) => (
					<div key={i} className="flex gap-4">
						<div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 text-sm">
							{i + 1}
						</div>
						<div>
							<h3 className="font-semibold mb-1">{point.title}</h3>
							<p className="text-muted-foreground">{point.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
);

interface CTAData {
	label: string;
	href: string;
}

interface CTABlockProps {
	src: string;
	title: string;
	description: string;
	primaryCTA: CTAData;
	secondaryCTA: CTAData;
	reverse: boolean;
}

const CTABlock = ({
	src,
	title,
	description,
	primaryCTA,
	secondaryCTA,
	reverse,
}: CTABlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
				<Image src={src} alt={title} fill className="object-cover" />
			</div>
		</div>
		<div className="@lg:w-1/2">
			<h2 className="text-3xl font-bold mb-4">{title}</h2>
			<p className="text-lg text-muted-foreground mb-8">{description}</p>
			<div className="flex gap-4">
				<Button size="lg" asChild>
					<Link href={primaryCTA.href}>{primaryCTA.label}</Link>
				</Button>
				<Button variant="outline" size="lg" asChild>
					<Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
				</Button>
			</div>
		</div>
	</div>
);
