import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	BarChart3,
	BookOpen,
	Code2,
	Layout,
	Sparkles,
	Target,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="emerald"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
					<HeroCell
						title="Track Your Learning Progress"
						className="col-span-2 @md:col-span-2 row-span-2"
					/>
					<ProgressCell
						title="This Week"
						articles={12}
						goal={15}
						className=""
					/>
					<StreakCell days={23} className="" />
					<SkillCell
						skills={[
							{ name: 'React', level: 85, color: 'bg-blue-500' },
							{ name: 'TypeScript', level: 72, color: 'bg-sky-500' },
							{ name: 'Node.js', level: 68, color: 'bg-green-500' },
						]}
						className="col-span-2"
					/>
				</div>
			</div>
		</section>
	);
}

interface HeroCellProps {
	title: string;
	className?: string;
}

const HeroCell = ({ title, className }: HeroCellProps) => (
	<Card
		className={`relative overflow-hidden bg-gradient-to-br from-primary/15 via-card to-accent/10 border-primary/20 flex flex-col justify-center ${className}`}
	>
		<CardContent className="p-6 @md:p-8">
			<Badge className="mb-4 bg-primary/10 text-primary border-0">
				<BarChart3 className="size-3.5 mr-1.5" />
				Your Dashboard
			</Badge>
			<h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4">
				{title}
			</h1>
			<p className="text-muted-foreground mb-6 max-w-sm">
				Visualize your growth, set goals, and stay motivated with personalized
				insights.
			</p>
			<Button size="lg" asChild className="gap-2">
				<Link href="/dashboard">
					View Dashboard
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

interface ProgressCellProps {
	title: string;
	articles: number;
	goal: number;
	className?: string;
}

const ProgressCell = ({
	title,
	articles,
	goal,
	className,
}: ProgressCellProps) => (
	<Card className={`${className}`}>
		<CardContent className="p-5 flex flex-col justify-center h-full">
			<div className="flex items-center justify-between mb-3">
				<span className="text-sm font-medium">{title}</span>
				<BookOpen className="size-4 text-muted-foreground" />
			</div>
			<div className="flex items-baseline gap-1 mb-2">
				<span className="text-3xl font-bold">{articles}</span>
				<span className="text-muted-foreground">/ {goal}</span>
			</div>
			<div className="h-2 bg-secondary rounded-full overflow-hidden">
				<div
					className="h-full bg-primary rounded-full transition-all"
					style={{ width: `${(articles / goal) * 100}%` }}
				/>
			</div>
			<p className="text-xs text-muted-foreground mt-2">articles read</p>
		</CardContent>
	</Card>
);

interface StreakCellProps {
	days: number;
	className?: string;
}

const StreakCell = ({ days, className }: StreakCellProps) => (
	<Card className={`bg-gradient-to-br from-orange-500/10 to-card ${className}`}>
		<CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
			<div className="text-3xl mb-2">🔥</div>
			<p className="text-3xl font-bold">{days}</p>
			<p className="text-sm text-muted-foreground">day streak</p>
		</CardContent>
	</Card>
);

interface Skill {
	name: string;
	level: number;
	color: string;
}

interface SkillCellProps {
	skills: Skill[];
	className?: string;
}

const SkillCell = ({ skills, className }: SkillCellProps) => (
	<Card className={`${className}`}>
		<CardContent className="p-5">
			<div className="flex items-center justify-between mb-4">
				<span className="font-semibold">Skill Progress</span>
				<Target className="size-4 text-muted-foreground" />
			</div>
			<div className="space-y-3">
				{skills.map((skill) => (
					<div key={skill.name}>
						<div className="flex items-center justify-between text-sm mb-1">
							<span>{skill.name}</span>
							<span className="text-muted-foreground">{skill.level}%</span>
						</div>
						<div className="h-2 bg-secondary rounded-full overflow-hidden">
							<div
								className={`h-full rounded-full ${skill.color}`}
								style={{ width: `${skill.level}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);
