'use client';

import {
	ArrowUpRight,
	Flame,
	type LucideIcon,
	Sparkles,
	Target,
	Trophy,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type GradientCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	target: string;
	progress: number;
	gradient: string;
};

const GradientCard = ({
	icon: Icon,
	label,
	value,
	target,
	progress,
	gradient,
}: GradientCardProps) => (
	<Card
		className={`group relative overflow-hidden border-0 ${gradient} text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
	>
		<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
		<CardContent className="relative p-5 @sm:p-6">
			<div className="flex items-start justify-between mb-4">
				<div className="rounded-xl bg-white/20 backdrop-blur-sm p-2.5 ring-1 ring-white/30">
					<Icon className="size-5 text-white" />
				</div>
				<ArrowUpRight className="size-5 text-white/60 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
			</div>
			<p className="text-sm font-medium text-white/80 mb-1">{label}</p>
			<p className="text-3xl @sm:text-4xl font-bold tracking-tight mb-4">
				{value}
			</p>
			<div className="space-y-2">
				<Progress
					value={progress}
					className="h-1.5 bg-white/20 [&>div]:bg-white"
				/>
				<div className="flex items-center justify-between text-xs text-white/70">
					<span>{progress}% complete</span>
					<span>Target: {target}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const gradientCards: GradientCardProps[] = [
	{
		icon: Trophy,
		label: 'Monthly Goal',
		value: '$82,430',
		target: '$100K',
		progress: 82,
		gradient: 'bg-gradient-to-br from-violet-600 to-indigo-700',
	},
	{
		icon: Target,
		label: 'Quarterly Sales',
		value: '2,847',
		target: '3,500',
		progress: 81,
		gradient: 'bg-gradient-to-br from-cyan-600 to-blue-700',
	},
	{
		icon: Flame,
		label: 'Hot Leads',
		value: '156',
		target: '200',
		progress: 78,
		gradient: 'bg-gradient-to-br from-orange-500 to-rose-600',
	},
	{
		icon: Sparkles,
		label: 'Customer Score',
		value: '94.2',
		target: '100',
		progress: 94,
		gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @lg:gap-6">
					{gradientCards.map((card, i) => (
						<GradientCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
