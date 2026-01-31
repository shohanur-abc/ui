import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="space-y-24">
					<IntroBlock
						src="https://picsum.photos/seed/zz8/700/500"
						name="Mike Kim"
						role="Full-Stack Developer"
						bio="I build web applications that are fast, accessible, and delightful to use. With 8 years of experience, I've shipped products used by millions of users worldwide."
						status="Available for hire"
						reverse={false}
					/>
					<SkillsBlock
						src="https://picsum.photos/seed/zz9/700/500"
						title="Technical Skills"
						skills={[
							{ name: 'React / Next.js', level: 95 },
							{ name: 'TypeScript', level: 90 },
							{ name: 'Node.js', level: 88 },
							{ name: 'PostgreSQL', level: 85 },
							{ name: 'AWS / Cloud', level: 78 },
						]}
						reverse={true}
					/>
					<ServicesBlock
						src="https://picsum.photos/seed/zz10/700/500"
						title="What I Offer"
						services={[
							'Custom web application development',
							'API design and development',
							'Performance optimization',
							'Code review and consulting',
							'Technical architecture planning',
						]}
						cta={{
							label: 'View Services',
							href: '/services',
							icon: ArrowRight,
						}}
						reverse={false}
					/>
				</div>
			</div>
		</section>
	);
}

interface IntroBlockProps {
	src: string;
	name: string;
	role: string;
	bio: string;
	status: string;
	reverse: boolean;
}

const IntroBlock = ({
	src,
	name,
	role,
	bio,
	status,
	reverse,
}: IntroBlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<div className="relative aspect-[7/5] rounded-2xl overflow-hidden">
				<Image src={src} alt={name} fill className="object-cover" />
			</div>
		</div>
		<div className="@lg:w-1/2">
			<Badge className="mb-4">{role}</Badge>
			<h1 className="text-4xl @xl:text-5xl font-bold mb-4">{name}</h1>
			<p className="text-lg text-muted-foreground mb-6">{bio}</p>
			<Badge className="bg-green-500/10 text-green-600 border-green-500/20">
				<span className="size-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
				{status}
			</Badge>
		</div>
	</div>
);

interface SkillItem {
	name: string;
	level: number;
}

interface SkillsBlockProps {
	src: string;
	title: string;
	skills: SkillItem[];
	reverse: boolean;
}

const SkillsBlock = ({ src, title, skills, reverse }: SkillsBlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<div className="relative aspect-[7/5] rounded-2xl overflow-hidden">
				<Image src={src} alt={title} fill className="object-cover" />
			</div>
		</div>
		<div className="@lg:w-1/2">
			<h2 className="text-3xl font-bold mb-8">{title}</h2>
			<Card>
				<CardContent className="p-6 space-y-5">
					{skills.map((skill) => (
						<div key={skill.name}>
							<div className="flex justify-between mb-2">
								<span className="text-sm font-medium">{skill.name}</span>
								<span className="text-sm text-muted-foreground">
									{skill.level}%
								</span>
							</div>
							<Progress value={skill.level} className="h-2" />
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	</div>
);

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ServicesBlockProps {
	src: string;
	title: string;
	services: string[];
	cta: CTAData;
	reverse: boolean;
}

const ServicesBlock = ({
	src,
	title,
	services,
	cta,
	reverse,
}: ServicesBlockProps) => (
	<div
		className={`flex flex-col @lg:flex-row gap-12 items-center ${reverse ? '@lg:flex-row-reverse' : ''}`}
	>
		<div className="@lg:w-1/2">
			<div className="relative aspect-[7/5] rounded-2xl overflow-hidden">
				<Image src={src} alt={title} fill className="object-cover" />
			</div>
		</div>
		<div className="@lg:w-1/2">
			<h2 className="text-3xl font-bold mb-8">{title}</h2>
			<div className="space-y-4 mb-8">
				{services.map((service) => (
					<div key={service} className="flex items-center gap-3">
						<CheckCircle2 className="size-5 text-green-500 shrink-0" />
						<span className="text-muted-foreground">{service}</span>
					</div>
				))}
			</div>
			<Button className="gap-2" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);
