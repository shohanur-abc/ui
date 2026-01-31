import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Braces,
	Cloud,
	Database,
	Layout,
	Server,
	Smartphone,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<PageTitle
					label="Skills Overview"
					title="Technical Proficiency Levels"
					subtitle="Honest assessment of my capabilities across different domains"
				/>

				<SkillMeter
					skills={[
						{
							icon: Braces,
							name: 'Frontend Development',
							level: 95,
							status: 'Expert',
						},
						{
							icon: Server,
							name: 'Backend Development',
							level: 88,
							status: 'Advanced',
						},
						{
							icon: Database,
							name: 'Database Design',
							level: 85,
							status: 'Advanced',
						},
						{
							icon: Cloud,
							name: 'Cloud & DevOps',
							level: 80,
							status: 'Advanced',
						},
						{
							icon: Smartphone,
							name: 'Mobile Development',
							level: 72,
							status: 'Intermediate',
						},
						{
							icon: Layout,
							name: 'UI/UX Design',
							level: 78,
							status: 'Advanced',
						},
					]}
				/>

				<LegendBlock
					items={[
						{ range: '90-100%', label: 'Expert', color: 'bg-green-500' },
						{ range: '75-89%', label: 'Advanced', color: 'bg-blue-500' },
						{ range: '60-74%', label: 'Intermediate', color: 'bg-yellow-500' },
						{ range: '40-59%', label: 'Beginner', color: 'bg-orange-500' },
					]}
				/>
			</div>
		</section>
	);
}

interface PageTitleProps {
	label: string;
	title: string;
	subtitle: string;
}

const PageTitle = ({ label, title, subtitle }: PageTitleProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge className="mb-4">{label}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

interface SkillItem {
	icon: ComponentType<{ className?: string }>;
	name: string;
	level: number;
	status: string;
}

const SkillMeter = ({ skills }: { skills: SkillItem[] }) => (
	<div className="grid @md:grid-cols-2 gap-4 @md:gap-6 max-w-5xl mx-auto mb-12">
		{skills.map((skill, i) => (
			<MeterCard key={i} {...skill} />
		))}
	</div>
);

const MeterCard = ({ icon: Icon, name, level, status }: SkillItem) => {
	const getStatusColor = (l: number) => {
		if (l >= 90) return 'text-green-500';
		if (l >= 75) return 'text-blue-500';
		if (l >= 60) return 'text-yellow-500';
		return 'text-orange-500';
	};

	return (
		<Card className="group hover:border-primary/50 transition-all duration-300">
			<CardContent className="p-5 @md:p-6">
				<div className="flex items-center gap-4 mb-4">
					<div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
						<Icon className="size-5 text-primary" />
					</div>
					<div className="flex-1">
						<h3 className="font-semibold">{name}</h3>
						<div className="flex items-center gap-2">
							<span className={`text-sm font-medium ${getStatusColor(level)}`}>
								{status}
							</span>
							<span className="text-sm text-muted-foreground">• {level}%</span>
						</div>
					</div>
				</div>
				<Progress value={level} className="h-2.5" />
			</CardContent>
		</Card>
	);
};

interface LegendItem {
	range: string;
	label: string;
	color: string;
}

const LegendBlock = ({ items }: { items: LegendItem[] }) => (
	<div className="flex flex-wrap justify-center gap-4 @md:gap-6">
		{items.map(({ range, label, color }, i) => (
			<div key={i} className="flex items-center gap-2">
				<div className={`size-3 rounded-full ${color}`} />
				<span className="text-sm">
					<span className="font-medium">{label}</span>
					<span className="text-muted-foreground"> ({range})</span>
				</span>
			</div>
		))}
	</div>
);
