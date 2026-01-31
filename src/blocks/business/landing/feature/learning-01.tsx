import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	BookMarked,
	GraduationCap,
	Lightbulb,
	Play,
	Sparkles,
	Video,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface LearningPath {
	icon: ComponentType<{ className?: string }>;
	level: string;
	title: string;
	lessons: number;
	duration: string;
	progress?: number;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={GraduationCap} text="Learning Hub" />
					<Title text="Learn at Your" highlight="Own Pace" />
					<Description text="Comprehensive learning paths designed to take you from beginner to expert. Interactive lessons, hands-on projects, and certifications." />
				</div>

				<LearningPathGrid
					items={[
						{
							icon: Lightbulb,
							level: 'Beginner',
							title: 'Getting Started',
							lessons: 8,
							duration: '2 hours',
							progress: 100,
						},
						{
							icon: BookMarked,
							level: 'Intermediate',
							title: 'Core Features',
							lessons: 12,
							duration: '4 hours',
							progress: 60,
						},
						{
							icon: Video,
							level: 'Advanced',
							title: 'Power User',
							lessons: 10,
							duration: '3 hours',
						},
						{
							icon: GraduationCap,
							level: 'Expert',
							title: 'Mastery',
							lessons: 15,
							duration: '6 hours',
						},
					]}
				/>

				<CTASection href="/learn" />
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const LearningPathGrid = ({ items }: { items: LearningPath[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-4 max-w-5xl mx-auto">
		{items.map((path) => (
			<Link key={path.title} href={`/learn/${path.level.toLowerCase()}`}>
				<Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
					<CardContent className="p-5 @md:p-6">
						<Badge variant="secondary" className="mb-4">
							{path.level}
						</Badge>
						<div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15">
							<path.icon className="size-6 text-primary" />
						</div>
						<h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
							{path.title}
						</h3>
						<p className="text-sm text-muted-foreground mb-4">
							{path.lessons} lessons • {path.duration}
						</p>

						{path.progress !== undefined ? (
							<div>
								<div className="flex items-center justify-between text-xs mb-1">
									<span className="text-muted-foreground">Progress</span>
									<span className="text-primary font-medium">
										{path.progress}%
									</span>
								</div>
								<div className="h-2 rounded-full bg-muted overflow-hidden">
									<div
										className="h-full bg-primary rounded-full transition-all"
										style={{ width: `${path.progress}%` }}
									/>
								</div>
							</div>
						) : (
							<span className="text-sm text-primary font-medium flex items-center gap-1">
								<Play className="size-3" />
								Start Learning
							</span>
						)}
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);

const CTASection = ({ href }: { href: string }) => (
	<div className="mt-10 text-center">
		<Link
			href={href}
			className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
		>
			Browse all courses <ArrowRight className="size-3" />
		</Link>
	</div>
);
