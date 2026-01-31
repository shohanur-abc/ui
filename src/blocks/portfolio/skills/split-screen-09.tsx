import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Blocks,
	CircuitBoard,
	Cloud,
	Code2,
	Compass,
	Database,
	Layers,
	Lightbulb,
	Palette,
	Server,
	Settings,
	Smartphone,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @3xl:grid-cols-5 gap-10 @xl:gap-16">
					<SkillsShowcase
						primarySkills={[
							{
								icon: Code2,
								name: 'Frontend',
								description: 'React, Next.js, TypeScript',
								level: 'Expert',
							},
							{
								icon: Server,
								name: 'Backend',
								description: 'Node.js, Python, Go',
								level: 'Expert',
							},
							{
								icon: Database,
								name: 'Database',
								description: 'PostgreSQL, MongoDB',
								level: 'Advanced',
							},
						]}
						secondarySkills={[
							{ icon: Cloud, name: 'Cloud' },
							{ icon: Smartphone, name: 'Mobile' },
							{ icon: Palette, name: 'Design' },
							{ icon: Settings, name: 'DevOps' },
							{ icon: CircuitBoard, name: 'IoT' },
							{ icon: Lightbulb, name: 'AI/ML' },
						]}
					/>

					<MethodologyPanel
						badge="How I Work"
						title="Development Philosophy"
						methodologies={[
							{
								icon: Compass,
								title: 'User-Centered',
								description:
									'Every decision starts with understanding user needs',
							},
							{
								icon: Layers,
								title: 'Iterative',
								description: 'Build, measure, learn, and improve continuously',
							},
							{
								icon: Blocks,
								title: 'Modular',
								description: 'Composable components for maximum reusability',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface PrimarySkill {
	icon: ComponentType<{ className?: string }>;
	name: string;
	description: string;
	level: string;
}

interface SecondarySkill {
	icon: ComponentType<{ className?: string }>;
	name: string;
}

interface SkillsShowcaseProps {
	primarySkills: PrimarySkill[];
	secondarySkills: SecondarySkill[];
}

const SkillsShowcase = ({
	primarySkills,
	secondarySkills,
}: SkillsShowcaseProps) => (
	<div className="@3xl:col-span-3 space-y-6">
		<div className="grid gap-4">
			{primarySkills.map((skill, i) => (
				<PrimarySkillCard key={i} {...skill} />
			))}
		</div>

		<div className="grid grid-cols-3 @sm:grid-cols-6 gap-3">
			{secondarySkills.map((skill, i) => (
				<SecondarySkillBadge key={i} {...skill} />
			))}
		</div>
	</div>
);

const PrimarySkillCard = ({
	icon: Icon,
	name,
	description,
	level,
}: PrimarySkill) => (
	<Card className="group hover:border-primary/50 transition-all duration-300">
		<CardContent className="p-5 flex items-center gap-4">
			<div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all">
				<Icon className="size-7 text-primary group-hover:text-primary-foreground transition-colors" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="font-semibold">{name}</h3>
					<Badge variant="secondary" className="text-xs">
						{level}
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardContent>
	</Card>
);

const SecondarySkillBadge = ({ icon: Icon, name }: SecondarySkill) => (
	<div className="flex flex-col items-center gap-2 p-3 rounded-xl border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all cursor-default group">
		<Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
		<span className="text-xs font-medium">{name}</span>
	</div>
);

interface Methodology {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

interface MethodologyPanelProps {
	badge: string;
	title: string;
	methodologies: Methodology[];
}

const MethodologyPanel = ({
	badge,
	title,
	methodologies,
}: MethodologyPanelProps) => (
	<div className="@3xl:col-span-2">
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-2xl @md:text-3xl @xl:text-4xl font-bold tracking-tight mb-6">
			{title}
		</h2>

		<div className="space-y-6">
			{methodologies.map((method, i) => (
				<MethodologyCard key={i} {...method} />
			))}
		</div>
	</div>
);

const MethodologyCard = ({ icon: Icon, title, description }: Methodology) => (
	<div className="flex gap-4 group">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<h4 className="font-semibold mb-1">{title}</h4>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);
