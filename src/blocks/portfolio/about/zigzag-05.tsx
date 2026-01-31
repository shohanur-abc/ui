import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="space-y-24">
					<HeroBlock
						src="https://picsum.photos/seed/zz15/800/600"
						name="David Lee"
						title="Engineering Manager"
						company="Netflix"
						bio="Building and scaling engineering teams. 15+ years in tech, from individual contributor to management."
						reverse={false}
					/>
					<ExperienceBlock
						src="https://picsum.photos/seed/zz16/800/600"
						title="Work Experience"
						experiences={[
							{
								role: 'Engineering Manager',
								company: 'Netflix',
								period: '2021 - Present',
							},
							{
								role: 'Senior Staff Engineer',
								company: 'Google',
								period: '2017 - 2021',
							},
							{
								role: 'Staff Engineer',
								company: 'Amazon',
								period: '2014 - 2017',
							},
						]}
						reverse={true}
					/>
					<PhilosophyBlock
						src="https://picsum.photos/seed/zz17/800/600"
						eyebrow="Philosophy"
						title="Leadership Principles"
						principles={[
							{
								title: 'People First',
								description: 'Great products come from happy, empowered teams.',
							},
							{
								title: 'Technical Excellence',
								description: 'Stay hands-on and maintain high standards.',
							},
							{
								title: 'Clear Communication',
								description: 'Over-communicate context and decisions.',
							},
						]}
						reverse={false}
					/>
					<CTABlock
						primaryCTA={{
							label: 'Connect on LinkedIn',
							href: 'https://linkedin.com',
							icon: ExternalLink,
						}}
						secondaryCTA={{
							label: 'Download Resume',
							href: '/resume.pdf',
							icon: ArrowRight,
						}}
						reverse={true}
					/>
				</div>
			</div>
		</section>
	);
}

interface HeroBlockProps {
	src: string;
	name: string;
	title: string;
	company: string;
	bio: string;
	reverse: boolean;
}

const HeroBlock = ({
	src,
	name,
	title,
	company,
	bio,
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
			<Badge className="mb-4">
				{title} at {company}
			</Badge>
			<h1 className="text-4xl @xl:text-5xl font-bold mb-4">{name}</h1>
			<p className="text-lg text-muted-foreground">{bio}</p>
		</div>
	</div>
);

interface ExperienceItem {
	role: string;
	company: string;
	period: string;
}

interface ExperienceBlockProps {
	src: string;
	title: string;
	experiences: ExperienceItem[];
	reverse: boolean;
}

const ExperienceBlock = ({
	src,
	title,
	experiences,
	reverse,
}: ExperienceBlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
				<Image src={src} alt={title} fill className="object-cover" />
			</div>
		</div>
		<div className="@lg:w-1/2">
			<h2 className="text-3xl font-bold mb-8">{title}</h2>
			<div className="space-y-4">
				{experiences.map((exp) => (
					<Card key={exp.company}>
						<CardContent className="p-4 flex items-center justify-between">
							<div>
								<h3 className="font-semibold">{exp.role}</h3>
								<p className="text-sm text-primary">{exp.company}</p>
							</div>
							<Badge variant="secondary" className="shrink-0">
								<Calendar className="size-3 mr-1" />
								{exp.period}
							</Badge>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	</div>
);

interface PrincipleItem {
	title: string;
	description: string;
}

interface PhilosophyBlockProps {
	src: string;
	eyebrow: string;
	title: string;
	principles: PrincipleItem[];
	reverse: boolean;
}

const PhilosophyBlock = ({
	src,
	eyebrow,
	title,
	principles,
	reverse,
}: PhilosophyBlockProps) => (
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
				{principles.map((principle, i) => (
					<div key={i} className="flex gap-4">
						<div className="size-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0 text-sm">
							{i + 1}
						</div>
						<div>
							<h3 className="font-semibold mb-1">{principle.title}</h3>
							<p className="text-sm text-muted-foreground">
								{principle.description}
							</p>
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
	icon: React.ComponentType<{ className?: string }>;
}

interface CTABlockProps {
	primaryCTA: CTAData;
	secondaryCTA: CTAData;
	reverse: boolean;
}

const CTABlock = ({ primaryCTA, secondaryCTA, reverse }: CTABlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<Card className="bg-muted/50">
				<CardContent className="p-8 text-center">
					<h2 className="text-2xl font-bold mb-4">Let&apos;s Connect</h2>
					<p className="text-muted-foreground mb-6">
						Always happy to chat about engineering, leadership, or career
						growth.
					</p>
					<div className="flex flex-col @sm:flex-row gap-4 justify-center">
						<Button className="gap-2" asChild>
							<Link href={primaryCTA.href}>
								{primaryCTA.label}
								<primaryCTA.icon className="size-4" />
							</Link>
						</Button>
						<Button variant="outline" className="gap-2" asChild>
							<Link href={secondaryCTA.href}>
								{secondaryCTA.label}
								<secondaryCTA.icon className="size-4" />
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
		<div className="@lg:w-1/2">
			<div className="grid grid-cols-2 gap-4">
				<div className="relative aspect-square rounded-xl overflow-hidden">
					<Image
						src="https://picsum.photos/seed/g4/400/400"
						alt="Work"
						fill
						className="object-cover"
					/>
				</div>
				<div className="relative aspect-square rounded-xl overflow-hidden">
					<Image
						src="https://picsum.photos/seed/g5/400/400"
						alt="Team"
						fill
						className="object-cover"
					/>
				</div>
				<div className="relative aspect-square rounded-xl overflow-hidden">
					<Image
						src="https://picsum.photos/seed/g6/400/400"
						alt="Office"
						fill
						className="object-cover"
					/>
				</div>
				<div className="relative aspect-square rounded-xl overflow-hidden">
					<Image
						src="https://picsum.photos/seed/g7/400/400"
						alt="Speaking"
						fill
						className="object-cover"
					/>
				</div>
			</div>
		</div>
	</div>
);
