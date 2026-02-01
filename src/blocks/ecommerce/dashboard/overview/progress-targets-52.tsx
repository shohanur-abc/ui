import {
	DollarSign,
	Package,
	ShoppingCart,
	Star,
	Target,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type TargetItem = {
	title: string;
	current: string;
	target: string;
	progress: number;
	trend: string;
	icon: LucideIcon;
};

type TeamTarget = {
	team: string;
	progress: number;
	color: string;
};

const TargetRow = ({
	title,
	current,
	target,
	progress,
	trend,
	icon: Icon,
}: TargetItem) => (
	<div className="flex items-center gap-4">
		<div className="rounded-lg bg-primary/10 p-2">
			<Icon className="size-4 text-primary" />
		</div>
		<div className="flex-1 space-y-2">
			<div className="flex items-center justify-between">
				<span className="font-medium">{title}</span>
				<span className="text-xs text-emerald-500">{trend}</span>
			</div>
			<Progress value={progress} className="h-2" />
			<div className="flex items-center justify-between text-xs text-muted-foreground">
				<span>{current}</span>
				<span>Target: {target}</span>
			</div>
		</div>
	</div>
);

const TeamProgressBar = ({ team, progress, color }: TeamTarget) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between text-sm">
			<span>{team}</span>
			<span className="font-medium">{progress}%</span>
		</div>
		<div className="h-2 overflow-hidden rounded-full bg-muted">
			<div
				className={`h-full rounded-full ${color}`}
				style={{ width: `${progress}%` }}
			/>
		</div>
	</div>
);

export default function Main() {
	const targets: TargetItem[] = [
		{
			title: 'Revenue',
			current: '$248,632',
			target: '$300,000',
			progress: 83,
			trend: '+28%',
			icon: DollarSign,
		},
		{
			title: 'Orders',
			current: '6,842',
			target: '8,000',
			progress: 85,
			trend: '+22%',
			icon: ShoppingCart,
		},
		{
			title: 'Customers',
			current: '3,847',
			target: '4,000',
			progress: 96,
			trend: '+18%',
			icon: Users,
		},
		{
			title: 'Avg Order Value',
			current: '$36.33',
			target: '$40.00',
			progress: 91,
			trend: '+5%',
			icon: TrendingUp,
		},
	];

	const teamTargets: TeamTarget[] = [
		{ team: 'Sales Team', progress: 92, color: 'bg-primary' },
		{ team: 'Marketing', progress: 78, color: 'bg-emerald-500' },
		{ team: 'Customer Success', progress: 85, color: 'bg-amber-500' },
		{ team: 'Operations', progress: 95, color: 'bg-blue-500' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Target className="size-5 text-primary" />
								Monthly Targets
							</CardTitle>
							<CardDescription>Progress towards monthly goals</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{targets.map((target, i) => (
								<TargetRow key={i} {...target} />
							))}
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Team Performance</CardTitle>
							<CardDescription>Target completion by team</CardDescription>
						</CardHeader>
						<CardContent className="space-y-5">
							{teamTargets.map((team, i) => (
								<TeamProgressBar key={i} {...team} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
