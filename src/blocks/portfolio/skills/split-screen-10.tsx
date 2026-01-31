import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Code2,
	Fingerprint,
	GitBranch,
	Globe2,
	Layers,
	Rocket,
	Shield,
	Sparkles,
	Terminal,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @3xl:grid-cols-2 gap-12 @xl:gap-20 items-start">
					<HeroContent
						badge="Full Stack Developer"
						title="Turning Complex Problems Into Elegant Solutions"
						description="I specialize in building high-performance web applications with modern technologies, focusing on clean architecture and exceptional user experiences."
						highlights={[
							{ icon: Zap, text: 'Lightning-fast performance' },
							{ icon: Shield, text: 'Security-first approach' },
							{ icon: Sparkles, text: 'Pixel-perfect implementation' },
						]}
						cta={{ label: 'Explore My Work', href: '#portfolio' }}
					/>

					<TechStack
						categories={[
							{
								title: 'Frontend',
								icon: Globe2,
								skills: [
									{ name: 'React', years: 6 },
									{ name: 'Next.js', years: 4 },
									{ name: 'TypeScript', years: 5 },
									{ name: 'Tailwind', years: 4 },
								],
							},
							{
								title: 'Backend',
								icon: Terminal,
								skills: [
									{ name: 'Node.js', years: 6 },
									{ name: 'Python', years: 4 },
									{ name: 'Go', years: 2 },
									{ name: 'GraphQL', years: 3 },
								],
							},
							{
								title: 'Infrastructure',
								icon: Layers,
								skills: [
									{ name: 'AWS', years: 5 },
									{ name: 'Docker', years: 4 },
									{ name: 'K8s', years: 2 },
									{ name: 'Terraform', years: 2 },
								],
							},
						]}
						tools={[
							{ icon: Code2, name: 'VS Code' },
							{ icon: GitBranch, name: 'Git' },
							{ icon: Rocket, name: 'Vercel' },
							{ icon: Fingerprint, name: 'Auth0' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface Highlight {
	icon: ComponentType<{ className?: string }>;
	text: string;
}

interface HeroContentProps {
	badge: string;
	title: string;
	description: string;
	highlights: Highlight[];
	cta: { label: string; href: string };
}

const HeroContent = ({
	badge,
	title,
	description,
	highlights,
	cta,
}: HeroContentProps) => (
	<div>
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-6">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg mb-8 leading-relaxed">
			{description}
		</p>

		<div className="space-y-3 mb-8">
			{highlights.map(({ icon: Icon, text }, i) => (
				<div key={i} className="flex items-center gap-3">
					<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
						<Icon className="size-4 text-primary" />
					</div>
					<span className="text-sm font-medium">{text}</span>
				</div>
			))}
		</div>

		<Button size="lg" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4 ml-2" />
			</Link>
		</Button>
	</div>
);

interface SkillWithYears {
	name: string;
	years: number;
}

interface Category {
	title: string;
	icon: ComponentType<{ className?: string }>;
	skills: SkillWithYears[];
}

interface Tool {
	icon: ComponentType<{ className?: string }>;
	name: string;
}

interface TechStackProps {
	categories: Category[];
	tools: Tool[];
}

const TechStack = ({ categories, tools }: TechStackProps) => (
	<div className="space-y-4">
		{categories.map((category, i) => (
			<CategoryRow key={i} {...category} />
		))}

		<Card className="bg-muted/50">
			<CardContent className="p-4">
				<p className="text-xs text-muted-foreground mb-3">Favorite Tools</p>
				<div className="flex justify-around">
					{tools.map(({ icon: Icon, name }, i) => (
						<div
							key={i}
							className="flex flex-col items-center gap-1.5 group cursor-default"
						>
							<Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
							<span className="text-xs">{name}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	</div>
);

const CategoryRow = ({ title, icon: Icon, skills }: Category) => (
	<Card className="group hover:border-primary/50 transition-all duration-300">
		<CardContent className="p-5">
			<div className="flex items-center gap-3 mb-4">
				<div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
					<Icon className="size-4 text-primary" />
				</div>
				<h3 className="font-semibold">{title}</h3>
			</div>
			<div className="grid grid-cols-2 gap-3">
				{skills.map(({ name, years }, i) => (
					<div key={i} className="flex items-center justify-between text-sm">
						<span>{name}</span>
						<Badge variant="outline" className="text-xs">
							{years}y
						</Badge>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);
