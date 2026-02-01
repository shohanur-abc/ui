'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Goal = {
	label: string;
	current: number;
	target: number;
	color: string;
	icon: string;
};

const goals: Goal[] = [
	{
		label: 'Revenue',
		current: 84500,
		target: 100000,
		color: 'stroke-cyan-500',
		icon: '💰',
	},
	{
		label: 'Orders',
		current: 1850,
		target: 2000,
		color: 'stroke-emerald-500',
		icon: '📦',
	},
	{
		label: 'Customers',
		current: 342,
		target: 500,
		color: 'stroke-purple-500',
		icon: '👥',
	},
	{
		label: 'Reviews',
		current: 128,
		target: 200,
		color: 'stroke-amber-500',
		icon: '⭐',
	},
];

const CircularProgress = ({
	current,
	target,
	color,
	size = 120,
}: {
	current: number;
	target: number;
	color: string;
	size?: number;
}) => {
	const percent = Math.min((current / target) * 100, 100);
	const radius = (size - 12) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percent / 100) * circumference;

	return (
		<svg width={size} height={size} className="transform -rotate-90">
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				strokeWidth={8}
				fill="none"
				className="stroke-muted/30"
			/>
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				strokeWidth={8}
				fill="none"
				strokeLinecap="round"
				className={color}
				style={{
					strokeDasharray: circumference,
					strokeDashoffset: offset,
					transition: 'stroke-dashoffset 0.5s ease',
				}}
			/>
		</svg>
	);
};

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
						<p className="text-xs text-muted-foreground">
							Circular progress indicators
						</p>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="grid grid-cols-2 @lg:grid-cols-4 gap-6">
							{goals.map((goal, i) => {
								const percent = ((goal.current / goal.target) * 100).toFixed(0);

								return (
									<div key={i} className="flex flex-col items-center">
										<div className="relative">
											<CircularProgress
												current={goal.current}
												target={goal.target}
												color={goal.color}
											/>
											<div className="absolute inset-0 flex flex-col items-center justify-center">
												<span className="text-2xl">{goal.icon}</span>
												<span className="text-lg font-semibold">
													{percent}%
												</span>
											</div>
										</div>
										<div className="mt-3 text-center">
											<p className="font-medium">{goal.label}</p>
											<p className="text-xs text-muted-foreground">
												{goal.current.toLocaleString()} /{' '}
												{goal.target.toLocaleString()}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
