import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Minus } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-4 gap-8 @xl:gap-12">
					<SidebarContent
						eyebrow="Skills"
						title="Technical Proficiency"
						description="A comprehensive overview of my technical skills and proficiency levels."
					/>

					<div className="@xl:col-span-3">
						<SkillsMatrix
							categories={[
								{
									name: 'Frontend',
									skills: [
										{ name: 'React', level: 'expert' },
										{ name: 'Next.js', level: 'expert' },
										{ name: 'TypeScript', level: 'expert' },
										{ name: 'Vue.js', level: 'proficient' },
										{ name: 'Svelte', level: 'learning' },
									],
								},
								{
									name: 'Backend',
									skills: [
										{ name: 'Node.js', level: 'expert' },
										{ name: 'Python', level: 'proficient' },
										{ name: 'Go', level: 'learning' },
										{ name: 'GraphQL', level: 'expert' },
										{ name: 'REST APIs', level: 'expert' },
									],
								},
								{
									name: 'DevOps',
									skills: [
										{ name: 'Docker', level: 'proficient' },
										{ name: 'AWS', level: 'proficient' },
										{ name: 'CI/CD', level: 'expert' },
										{ name: 'Kubernetes', level: 'learning' },
										{ name: 'Terraform', level: 'learning' },
									],
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

interface SidebarContentProps {
	eyebrow: string;
	title: string;
	description: string;
}

const SidebarContent = ({
	eyebrow,
	title,
	description,
}: SidebarContentProps) => (
	<div className="@xl:sticky @xl:top-8">
		<Badge variant="outline" className="mb-3 @md:mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
			{title}
		</h2>
		<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6">
			{description}
		</p>

		<div className="space-y-2">
			<LegendItem
				icon={CheckCircle}
				label="Expert"
				className="text-green-500"
			/>
			<LegendItem icon={Minus} label="Proficient" className="text-blue-500" />
			<LegendItem icon={Clock} label="Learning" className="text-orange-500" />
		</div>
	</div>
);

interface LegendItemProps {
	icon: ComponentType<{ className?: string }>;
	label: string;
	className: string;
}

const LegendItem = ({ icon: Icon, label, className }: LegendItemProps) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className={`size-4 ${className}`} />
		<span className="text-muted-foreground">{label}</span>
	</div>
);

type SkillLevel = 'expert' | 'proficient' | 'learning';

interface Skill {
	name: string;
	level: SkillLevel;
}

interface SkillCategory {
	name: string;
	skills: Skill[];
}

const SkillsMatrix = ({ categories }: { categories: SkillCategory[] }) => {
	const levelConfig: Record<
		SkillLevel,
		{ icon: ComponentType<{ className?: string }>; color: string }
	> = {
		expert: { icon: CheckCircle, color: 'text-green-500' },
		proficient: { icon: Minus, color: 'text-blue-500' },
		learning: { icon: Clock, color: 'text-orange-500' },
	};

	return (
		<div className="space-y-6 @md:space-y-8">
			{categories.map(({ name, skills }, i) => (
				<Card key={i} className="py-0">
					<CardContent className="p-5 @md:p-6">
						<h3 className="font-bold text-lg mb-4">{name}</h3>
						<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-3">
							{skills.map(({ name, level }, j) => {
								const { icon: Icon, color } = levelConfig[level];
								return (
									<div
										key={j}
										className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
									>
										<span className="text-sm font-medium">{name}</span>
										<Icon className={`size-4 ${color}`} />
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
