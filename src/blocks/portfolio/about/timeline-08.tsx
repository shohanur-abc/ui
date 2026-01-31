import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle2, Circle, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-5 gap-8 @xl:gap-12">
					<div className="@lg:col-span-2">
						<ProfileCard
							src="https://picsum.photos/seed/timeline8/600/800"
							name="Alex Rivera"
							role="Aspiring Tech Leader"
							quote="The best time to start was yesterday. The next best time is now."
						/>
					</div>
					<div className="@lg:col-span-3">
						<GoalsTimeline
							completed={[
								{ title: 'Learn to code', year: '2018' },
								{ title: 'Land first tech job', year: '2019' },
								{ title: 'Become senior engineer', year: '2021' },
								{ title: 'Speak at a conference', year: '2022' },
							]}
							current={{
								title: 'Build a startup',
								progress: 65,
								milestones: [
									'Idea validated',
									'MVP launched',
									'First 100 users',
									'Seeking funding',
								],
							}}
							future={[
								{ title: 'Scale to 1M users', year: '2025' },
								{ title: 'Write a book', year: '2026' },
								{ title: 'Mentor 100 developers', year: '2027' },
							]}
						/>
						<CTA label="Join My Journey" href="/newsletter" icon={ArrowRight} />
					</div>
				</div>
			</div>
		</section>
	);
}

interface ProfileCardProps {
	src: string;
	name: string;
	role: string;
	quote: string;
}

const ProfileCard = ({ src, name, role, quote }: ProfileCardProps) => (
	<div className="sticky top-8">
		<Card className="overflow-hidden py-0">
			<div className="relative aspect-[3/4]">
				<Image src={src} alt={name} fill className="object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
				<div className="absolute bottom-4 left-4 right-4">
					<h1 className="text-2xl font-bold text-white mb-1">{name}</h1>
					<p className="text-white/80 text-sm">{role}</p>
				</div>
			</div>
			<CardContent className="p-4">
				<p className="text-sm text-muted-foreground italic">
					&ldquo;{quote}&rdquo;
				</p>
			</CardContent>
		</Card>
	</div>
);

interface CompletedItem {
	title: string;
	year: string;
}

interface CurrentGoal {
	title: string;
	progress: number;
	milestones: string[];
}

interface FutureItem {
	title: string;
	year: string;
}

interface GoalsTimelineProps {
	completed: CompletedItem[];
	current: CurrentGoal;
	future: FutureItem[];
}

const GoalsTimeline = ({ completed, current, future }: GoalsTimelineProps) => (
	<div className="space-y-8">
		<div>
			<div className="flex items-center gap-2 mb-4">
				<CheckCircle2 className="size-5 text-green-500" />
				<h2 className="font-semibold">Completed</h2>
			</div>
			<div className="grid grid-cols-2 gap-3">
				{completed.map((item, i) => (
					<div
						key={i}
						className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
					>
						<CheckCircle2 className="size-4 text-green-500" />
						<div>
							<p className="text-sm font-medium">{item.title}</p>
							<p className="text-xs text-muted-foreground">{item.year}</p>
						</div>
					</div>
				))}
			</div>
		</div>
		<div>
			<div className="flex items-center gap-2 mb-4">
				<Target className="size-5 text-primary" />
				<h2 className="font-semibold">Current Goal</h2>
			</div>
			<Card className="border-primary/50">
				<CardContent className="p-4">
					<div className="flex items-center justify-between mb-3">
						<h3 className="font-semibold">{current.title}</h3>
						<Badge>{current.progress}%</Badge>
					</div>
					<Progress value={current.progress} className="h-2 mb-4" />
					<div className="grid grid-cols-2 gap-2">
						{current.milestones.map((milestone, i) => (
							<div key={i} className="flex items-center gap-2 text-sm">
								<CheckCircle2
									className={`size-4 ${i < 2 ? 'text-green-500' : 'text-muted-foreground'}`}
								/>
								<span className={i < 2 ? '' : 'text-muted-foreground'}>
									{milestone}
								</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
		<div>
			<div className="flex items-center gap-2 mb-4">
				<Circle className="size-5 text-muted-foreground" />
				<h2 className="font-semibold">Future Goals</h2>
			</div>
			<div className="space-y-2">
				{future.map((item, i) => (
					<div
						key={i}
						className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
					>
						<Circle className="size-4 text-muted-foreground" />
						<div>
							<p className="text-sm font-medium">{item.title}</p>
							<p className="text-xs text-muted-foreground">{item.year}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
);

interface CTAProps {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
	<div className="mt-8">
		<Button className="gap-2" asChild>
			<Link href={href}>
				{label}
				<Icon className="size-4" />
			</Link>
		</Button>
	</div>
);
