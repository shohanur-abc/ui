import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Cloud, Code, Database, Layout, Terminal } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @3xl:grid-cols-2 gap-16 @xl:gap-24">
					<VisualSkills
						title="Technical Proficiency"
						skills={[
							{
								icon: Code,
								name: 'Frontend',
								level: 95,
								color: 'from-blue-500 to-cyan-500',
							},
							{
								icon: Terminal,
								name: 'Backend',
								level: 88,
								color: 'from-green-500 to-emerald-500',
							},
							{
								icon: Database,
								name: 'Databases',
								level: 85,
								color: 'from-purple-500 to-violet-500',
							},
							{
								icon: Cloud,
								name: 'Cloud/DevOps',
								level: 80,
								color: 'from-orange-500 to-amber-500',
							},
							{
								icon: Layout,
								name: 'UI/UX',
								level: 75,
								color: 'from-pink-500 to-rose-500',
							},
							{
								icon: Brain,
								name: 'AI/ML',
								level: 70,
								color: 'from-indigo-500 to-purple-500',
							},
						]}
					/>

					<SkillDetails
						badge="Expertise"
						title="Deep Knowledge"
						description="Years of hands-on experience building production-grade applications with modern technologies."
						specializations={[
							{
								title: 'React Ecosystem',
								description: 'Next.js, React Query, Zustand, Tailwind CSS',
							},
							{
								title: 'API Development',
								description: 'REST, GraphQL, tRPC, WebSockets',
							},
							{
								title: 'Cloud Architecture',
								description: 'AWS, Serverless, Edge Computing',
							},
							{
								title: 'Performance',
								description: 'Core Web Vitals, Caching, Optimization',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface SkillItem {
	icon: ComponentType<{ className?: string }>;
	name: string;
	level: number;
	color: string;
}

interface VisualSkillsProps {
	title: string;
	skills: SkillItem[];
}

const VisualSkills = ({ title, skills }: VisualSkillsProps) => (
	<div>
		<h2 className="text-2xl @md:text-3xl font-bold mb-8">{title}</h2>
		<div className="space-y-8">
			{skills.map((skill, i) => (
				<VisualSkillBar key={i} {...skill} />
			))}
		</div>
	</div>
);

const VisualSkillBar = ({ icon: Icon, name, level, color }: SkillItem) => (
	<div className="group">
		<div className="flex items-center gap-4 mb-3">
			<div
				className={`size-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
			>
				<Icon className="size-5 text-white" />
			</div>
			<div className="flex-1">
				<div className="flex items-center justify-between">
					<span className="font-semibold">{name}</span>
					<span className="text-sm font-medium">{level}%</span>
				</div>
			</div>
		</div>
		<div className="relative h-3 bg-muted rounded-full overflow-hidden">
			<div
				className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color} rounded-full transition-all duration-500 group-hover:opacity-80`}
				style={{ width: `${level}%` }}
			/>
		</div>
	</div>
);

interface Specialization {
	title: string;
	description: string;
}

interface SkillDetailsProps {
	badge: string;
	title: string;
	description: string;
	specializations: Specialization[];
}

const SkillDetails = ({
	badge,
	title,
	description,
	specializations,
}: SkillDetailsProps) => (
	<div>
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg mb-8 leading-relaxed">
			{description}
		</p>

		<div className="space-y-6">
			{specializations.map((spec, i) => (
				<div
					key={i}
					className="border-l-2 border-primary/30 pl-4 hover:border-primary transition-colors"
				>
					<h4 className="font-semibold mb-1">{spec.title}</h4>
					<p className="text-sm text-muted-foreground">{spec.description}</p>
				</div>
			))}
		</div>
	</div>
);
