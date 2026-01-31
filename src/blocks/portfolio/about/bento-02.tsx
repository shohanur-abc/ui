import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @md:grid-cols-3 @xl:grid-cols-4 gap-4">
					<ProfileCard
						src="https://picsum.photos/seed/bento2/600/800"
						name="Maria Santos"
						role="Frontend Developer"
						className="@md:row-span-2"
					/>
					<IntroCard
						title="About Me"
						text="I craft beautiful, accessible user interfaces. 6 years of experience building web apps with React and TypeScript."
						className="@xl:col-span-2"
					/>
					<SocialCard
						socials={[
							{ icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
							{ icon: Github, href: 'https://github.com', label: 'GitHub' },
							{
								icon: Linkedin,
								href: 'https://linkedin.com',
								label: 'LinkedIn',
							},
						]}
					/>
					<SkillsCard
						skills={[
							{ name: 'React', value: 95 },
							{ name: 'TypeScript', value: 90 },
							{ name: 'CSS/Tailwind', value: 92 },
						]}
						className="@xl:col-span-2"
					/>
					<CTACard title="Let's Connect" href="/contact" icon={ArrowUpRight} />
				</div>
			</div>
		</section>
	);
}

interface ProfileCardProps {
	src: string;
	name: string;
	role: string;
	className?: string;
}

const ProfileCard = ({ src, name, role, className }: ProfileCardProps) => (
	<Card className={`overflow-hidden py-0 ${className}`}>
		<CardContent className="p-0 h-full relative">
			<Image src={src} alt={name} fill className="object-cover" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
			<div className="absolute bottom-4 left-4 right-4 text-white">
				<h1 className="text-2xl font-bold mb-1">{name}</h1>
				<p className="text-white/80">{role}</p>
			</div>
		</CardContent>
	</Card>
);

interface IntroCardProps {
	title: string;
	text: string;
	className?: string;
}

const IntroCard = ({ title, text, className }: IntroCardProps) => (
	<Card className={className}>
		<CardContent className="p-6">
			<Badge variant="outline" className="mb-3">
				{title}
			</Badge>
			<p className="text-muted-foreground leading-relaxed">{text}</p>
		</CardContent>
	</Card>
);

interface SocialItem {
	icon: React.ComponentType<{ className?: string }>;
	href: string;
	label: string;
}

const SocialCard = ({ socials }: { socials: SocialItem[] }) => (
	<Card className="bg-muted/50 border-none">
		<CardContent className="p-6 flex flex-col justify-center h-full">
			<p className="text-sm font-medium mb-3">Connect</p>
			<div className="flex gap-2">
				{socials.map(({ icon: Icon, href, label }) => (
					<Button key={label} variant="outline" size="icon" asChild>
						<Link href={href} aria-label={label}>
							<Icon className="size-4" />
						</Link>
					</Button>
				))}
			</div>
		</CardContent>
	</Card>
);

interface SkillItem {
	name: string;
	value: number;
}

interface SkillsCardProps {
	skills: SkillItem[];
	className?: string;
}

const SkillsCard = ({ skills, className }: SkillsCardProps) => (
	<Card className={className}>
		<CardContent className="p-6">
			<p className="text-sm font-medium mb-4">Top Skills</p>
			<div className="space-y-3">
				{skills.map(({ name, value }) => (
					<div key={name}>
						<div className="flex justify-between mb-1">
							<span className="text-sm">{name}</span>
							<span className="text-sm text-muted-foreground">{value}%</span>
						</div>
						<Progress value={value} className="h-1.5" />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

interface CTACardProps {
	title: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

const CTACard = ({ title, href, icon: Icon }: CTACardProps) => (
	<Card className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
		<Link href={href} className="block h-full">
			<CardContent className="p-6 flex flex-col justify-between h-full">
				<Icon className="size-6 ml-auto" />
				<p className="font-semibold text-lg">{title}</p>
			</CardContent>
		</Link>
	</Card>
);
