import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Binary, Blocks, Cpu, Database, Network, Sparkles } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<HeroText
					label="Tech Stack"
					title="Engineering Excellence"
					subtitle="Building robust systems with cutting-edge technologies"
				/>

				<DiagonalBento
					featured={{
						icon: Blocks,
						title: 'Full Stack Development',
						description:
							'End-to-end application development from database design to pixel-perfect UIs. Specializing in TypeScript ecosystems.',
						metrics: [
							{ label: 'Projects Delivered', value: '50+' },
							{ label: 'Years Experience', value: '8+' },
							{ label: 'Technologies', value: '30+' },
						],
					}}
					skills={[
						{
							icon: Binary,
							name: 'Languages',
							items: ['TypeScript', 'Python', 'Go', 'Rust'],
							proficiency: 90,
						},
						{
							icon: Network,
							name: 'APIs',
							items: ['REST', 'GraphQL', 'tRPC', 'gRPC'],
							proficiency: 88,
						},
						{
							icon: Database,
							name: 'Data',
							items: ['PostgreSQL', 'Redis', 'Elasticsearch'],
							proficiency: 85,
						},
						{
							icon: Cpu,
							name: 'Infrastructure',
							items: ['AWS', 'Docker', 'Kubernetes'],
							proficiency: 82,
						},
						{
							icon: Sparkles,
							name: 'AI/ML',
							items: ['OpenAI', 'LangChain', 'Vector DBs'],
							proficiency: 75,
						},
					]}
				/>
			</div>
		</section>
	);
}

interface HeroTextProps {
	label: string;
	title: string;
	subtitle: string;
}

const HeroText = ({ label, title, subtitle }: HeroTextProps) => (
	<div className="mb-12 @md:mb-16 @xl:mb-20 max-w-3xl">
		<Badge variant="outline" className="mb-4">
			{label}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-lg @md:text-xl">{subtitle}</p>
	</div>
);

interface FeaturedSkill {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	metrics: { label: string; value: string }[];
}

interface SkillCategory {
	icon: ComponentType<{ className?: string }>;
	name: string;
	items: string[];
	proficiency: number;
}

interface DiagonalBentoProps {
	featured: FeaturedSkill;
	skills: SkillCategory[];
}

const DiagonalBento = ({ featured, skills }: DiagonalBentoProps) => (
	<div className="grid @lg:grid-cols-5 gap-4 @md:gap-6">
		<FeaturedCard {...featured} />
		<div className="@lg:col-span-3 grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6">
			{skills.map((skill, i) => (
				<SkillCategoryCard key={i} {...skill} />
			))}
		</div>
	</div>
);

const FeaturedCard = ({
	icon: Icon,
	title,
	description,
	metrics,
}: FeaturedSkill) => (
	<Card className="@lg:col-span-2 group hover:border-primary/50 transition-all duration-300">
		<CardContent className="p-6 @md:p-8 h-full flex flex-col">
			<div className="size-16 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-6">
				<Icon className="size-8 text-primary-foreground" />
			</div>
			<h3 className="text-2xl @md:text-3xl font-bold mb-3">{title}</h3>
			<p className="text-muted-foreground mb-8 flex-grow">{description}</p>
			<div className="grid grid-cols-3 gap-4 pt-6 border-t">
				{metrics.map(({ label, value }, i) => (
					<div key={i} className="text-center">
						<p className="text-2xl font-bold text-primary">{value}</p>
						<p className="text-xs text-muted-foreground">{label}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const SkillCategoryCard = ({
	icon: Icon,
	name,
	items,
	proficiency,
}: SkillCategory) => (
	<Card className="group hover:border-primary/50 transition-all duration-300">
		<CardContent className="p-5">
			<div className="flex items-center gap-3 mb-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
					<Icon className="size-5 text-primary" />
				</div>
				<h4 className="font-semibold">{name}</h4>
			</div>
			<div className="flex flex-wrap gap-1.5 mb-4">
				{items.map((item, i) => (
					<Badge key={i} variant="secondary" className="text-xs">
						{item}
					</Badge>
				))}
			</div>
			<div className="flex items-center gap-2">
				<Progress value={proficiency} className="h-1.5 flex-1" />
				<span className="text-xs text-muted-foreground font-medium">
					{proficiency}%
				</span>
			</div>
		</CardContent>
	</Card>
);
