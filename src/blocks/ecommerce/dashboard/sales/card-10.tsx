'use client';

import { Target, Zap, Award, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type AchievementCardProps = {
	title: string;
	description: string;
	value: string;
	icon: React.ReactNode;
	achieved: boolean;
};

const AchievementCard = ({
	title,
	description,
	value,
	icon,
	achieved,
}: AchievementCardProps) => (
	<Card
		className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${achieved ? 'hover:shadow-primary/10 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent' : 'hover:shadow-muted/10'}`}
	>
		<CardContent className="pt-6">
			<div className="flex items-start gap-4">
				<div
					className={`p-3 rounded-xl ${achieved ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}
				>
					{icon}
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between gap-2 mb-1">
						<h3 className="font-semibold truncate">{title}</h3>
						{achieved && (
							<span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
								Achieved
							</span>
						)}
					</div>
					<p className="text-sm text-muted-foreground mb-3">{description}</p>
					<p
						className={`text-2xl font-bold ${achieved ? 'text-primary' : 'text-foreground'}`}
					>
						{value}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const achievements: AchievementCardProps[] = [
		{
			title: 'Revenue Milestone',
			description: 'Reach $100K in monthly revenue',
			value: '$124,500',
			icon: <Target className="size-5" />,
			achieved: true,
		},
		{
			title: 'Speed Demon',
			description: 'Process 500 orders in a single day',
			value: '523 orders',
			icon: <Zap className="size-5" />,
			achieved: true,
		},
		{
			title: 'Top Performer',
			description: 'Achieve 95% customer satisfaction',
			value: '92.5%',
			icon: <Award className="size-5" />,
			achieved: false,
		},
		{
			title: 'Quick Responder',
			description: 'Average response time under 2 hours',
			value: '1h 45m',
			icon: <Clock className="size-5" />,
			achieved: true,
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-4 @md:gap-6">
					{achievements.map((achievement, idx) => (
						<AchievementCard key={idx} {...achievement} />
					))}
				</div>
			</div>
		</section>
	);
}
