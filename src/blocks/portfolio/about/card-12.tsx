import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, CheckCircle2, Clock, Target } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-md mx-auto">
					<ProfileCard
						src="https://picsum.photos/seed/card12/400/400"
						fallback="AJ"
						name="Amy Johnson"
						role="Project Manager"
						status={{ icon: Clock, text: 'Currently available', active: true }}
						bio="Delivering complex projects on time and within budget. Expertise in agile methodologies and cross-functional team leadership."
						currentGoals={[
							{ text: 'PMP Certification', progress: 80 },
							{ text: 'Scrum Master', progress: 100 },
							{ text: 'Leadership Course', progress: 45 },
						]}
						achievements={[
							'50+ projects delivered',
							'$10M+ budget managed',
							'98% client satisfaction',
						]}
						cta={{
							label: 'Discuss Your Project',
							href: '/contact',
							icon: ArrowRight,
						}}
					/>
				</div>
			</div>
		</section>
	);
}

interface StatusData {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
	active: boolean;
}

interface GoalItem {
	text: string;
	progress: number;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ProfileCardProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	status: StatusData;
	bio: string;
	currentGoals: GoalItem[];
	achievements: string[];
	cta: CTAData;
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
	status,
	bio,
	currentGoals,
	achievements,
	cta,
}: ProfileCardProps) => (
	<Card>
		<CardContent className="p-6">
			<div className="flex items-start gap-4 mb-6">
				<Avatar className="size-16 ring-2 ring-border">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-xl bg-primary text-primary-foreground">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<h1 className="text-xl font-bold">{name}</h1>
					<p className="text-primary text-sm">{role}</p>
					<Badge
						className={`mt-2 ${
							status.active
								? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
								: 'bg-muted'
						}`}
					>
						<status.icon className="size-3 mr-1" />
						{status.text}
					</Badge>
				</div>
			</div>
			<p className="text-muted-foreground text-sm mb-6">{bio}</p>
			<div className="mb-6">
				<div className="flex items-center gap-2 mb-3">
					<Target className="size-4 text-primary" />
					<p className="text-sm font-medium">Current Goals</p>
				</div>
				<div className="space-y-3">
					{currentGoals.map(({ text, progress }) => (
						<div key={text}>
							<div className="flex justify-between mb-1">
								<span className="text-sm">{text}</span>
								<span className="text-xs text-muted-foreground">
									{progress === 100 ? (
										<Badge variant="secondary" className="text-xs gap-1">
											<CheckCircle2 className="size-3" />
											Complete
										</Badge>
									) : (
										`${progress}%`
									)}
								</span>
							</div>
							<Progress value={progress} className="h-1.5" />
						</div>
					))}
				</div>
			</div>
			<Separator className="my-4" />
			<div className="mb-6">
				<p className="text-sm font-medium mb-3">Key Achievements</p>
				<div className="space-y-2">
					{achievements.map((achievement) => (
						<div
							key={achievement}
							className="flex items-center gap-2 text-sm text-muted-foreground"
						>
							<CheckCircle2 className="size-4 text-primary" />
							<span>{achievement}</span>
						</div>
					))}
				</div>
			</div>
			<Button className="gap-2 w-full" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);
