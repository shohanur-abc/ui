import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle2,
	Cloud,
	Code2,
	Figma,
	GitBranch,
	Palette,
	Server,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<IntroBlock
					label="Expertise Areas"
					title="Skills & Technologies"
					subtitle="Comprehensive knowledge across the development spectrum"
				/>

				<ChecklistBento
					mainSkill={{
						icon: Code2,
						title: 'Full Stack Development',
						description:
							'Building complete web applications from frontend to backend with modern tools and best practices.',
						checklist: [
							'React & Next.js Applications',
							'TypeScript Type Safety',
							'API Design & Integration',
							'Database Architecture',
							'Performance Optimization',
							'Testing & Quality Assurance',
						],
					}}
					supportingSkills={[
						{
							icon: Server,
							title: 'Backend',
							items: ['Node.js', 'Python', 'Go', 'REST APIs', 'GraphQL'],
						},
						{
							icon: Cloud,
							title: 'Cloud & DevOps',
							items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
						},
						{
							icon: Palette,
							title: 'Design',
							items: ['UI/UX', 'Figma', 'Design Systems', 'Prototyping'],
						},
					]}
					toolIcons={[
						{ icon: Figma, name: 'Figma' },
						{ icon: GitBranch, name: 'Git' },
						{ icon: Zap, name: 'Vercel' },
					]}
				/>
			</div>
		</section>
	);
}

interface IntroBlockProps {
	label: string;
	title: string;
	subtitle: string;
}

const IntroBlock = ({ label, title, subtitle }: IntroBlockProps) => (
	<div className="text-center mb-12 @md:mb-16 @xl:mb-20">
		<Badge className="mb-4">{label}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

interface MainSkillProps {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	checklist: string[];
}

interface SupportingSkillProps {
	icon: ComponentType<{ className?: string }>;
	title: string;
	items: string[];
}

interface ToolIconProps {
	icon: ComponentType<{ className?: string }>;
	name: string;
}

interface ChecklistBentoProps {
	mainSkill: MainSkillProps;
	supportingSkills: SupportingSkillProps[];
	toolIcons: ToolIconProps[];
}

const ChecklistBento = ({
	mainSkill,
	supportingSkills,
	toolIcons,
}: ChecklistBentoProps) => (
	<div className="grid @lg:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		<MainSkillCard {...mainSkill} />
		<div className="@xl:col-span-2 grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
			{supportingSkills.map((skill, i) => (
				<SupportingSkillCard key={i} {...skill} />
			))}
			<ToolsCard tools={toolIcons} />
		</div>
	</div>
);

const MainSkillCard = ({
	icon: Icon,
	title,
	description,
	checklist,
}: MainSkillProps) => (
	<Card className="@xl:row-span-2 group hover:border-primary/50 transition-all duration-300">
		<CardContent className="p-6 @md:p-8 h-full flex flex-col">
			<div className="size-14 rounded-2xl bg-primary flex items-center justify-center mb-6">
				<Icon className="size-7 text-primary-foreground" />
			</div>
			<h3 className="text-2xl font-bold mb-2">{title}</h3>
			<p className="text-muted-foreground text-sm mb-6">{description}</p>
			<ul className="space-y-3 mt-auto">
				{checklist.map((item, i) => (
					<li key={i} className="flex items-center gap-3 text-sm">
						<CheckCircle2 className="size-4 text-primary shrink-0" />
						<span>{item}</span>
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);

const SupportingSkillCard = ({
	icon: Icon,
	title,
	items,
}: SupportingSkillProps) => (
	<Card className="group hover:border-primary/50 transition-all duration-300">
		<CardContent className="p-5">
			<div className="flex items-center gap-3 mb-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
					<Icon className="size-5 text-primary" />
				</div>
				<h4 className="font-semibold">{title}</h4>
			</div>
			<div className="flex flex-wrap gap-1.5">
				{items.map((item, i) => (
					<Badge key={i} variant="secondary" className="text-xs">
						{item}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);

const ToolsCard = ({ tools }: { tools: ToolIconProps[] }) => (
	<Card className="@sm:col-span-2 @xl:col-span-3 group hover:border-primary/50 transition-all duration-300">
		<CardContent className="p-5">
			<h4 className="font-semibold mb-4">Favorite Tools</h4>
			<div className="flex items-center justify-around">
				{tools.map(({ icon: Icon, name }, i) => (
					<div key={i} className="flex flex-col items-center gap-2 group/tool">
						<div className="size-12 rounded-xl bg-muted flex items-center justify-center group-hover/tool:bg-primary/10 transition-colors">
							<Icon className="size-6 text-muted-foreground group-hover/tool:text-primary transition-colors" />
						</div>
						<span className="text-xs text-muted-foreground">{name}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);
