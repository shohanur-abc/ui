import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Users,
	UserPlus,
	UserCheck,
	UserX,
	Crown,
	TrendingUp,
} from 'lucide-react';

interface CohortStatProps {
	period: string;
	acquired: number;
	retained: number[];
}

const CohortRow = ({ period, acquired, retained }: CohortStatProps) => (
	<div className="flex items-center gap-2">
		<div className="w-24 shrink-0 text-sm font-medium">{period}</div>
		<div className="w-16 shrink-0 text-center text-sm font-semibold">
			{acquired.toLocaleString()}
		</div>
		{retained.map((rate, i) => {
			const opacity = rate / 100;
			return (
				<div
					key={i}
					className="flex size-12 items-center justify-center rounded text-xs font-medium"
					style={{
						backgroundColor: `oklch(var(--primary) / ${opacity * 0.8})`,
						color: opacity > 0.4 ? 'white' : 'inherit',
					}}
				>
					{rate}%
				</div>
			);
		})}
	</div>
);

export default function Main() {
	const cohorts: CohortStatProps[] = [
		{ period: 'Jan 2024', acquired: 2847, retained: [100, 68, 52, 41, 35, 28] },
		{ period: 'Feb 2024', acquired: 3124, retained: [100, 72, 58, 45, 38] },
		{ period: 'Mar 2024', acquired: 2984, retained: [100, 65, 48, 42] },
		{ period: 'Apr 2024', acquired: 3428, retained: [100, 70, 54] },
		{ period: 'May 2024', acquired: 3892, retained: [100, 74] },
		{ period: 'Jun 2024', acquired: 4128, retained: [100] },
	];

	const headers = ['Cohort', 'Users', 'M0', 'M1', 'M2', 'M3', 'M4', 'M5'];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="overflow-x-auto p-6">
					<div className="mb-6 flex items-center gap-3">
						<div className="rounded-lg bg-primary/10 p-2">
							<Users className="size-5 text-primary" />
						</div>
						<div>
							<h3 className="font-semibold">Customer Retention Cohorts</h3>
							<p className="text-sm text-muted-foreground">
								Monthly retention by acquisition cohort
							</p>
						</div>
					</div>
					<Separator className="mb-6" />
					<div className="min-w-[600px] space-y-2">
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							{headers.map((h, i) => (
								<div
									key={h}
									className={
										i === 0
											? 'w-24 shrink-0'
											: i === 1
												? 'w-16 shrink-0 text-center'
												: 'size-12 text-center'
									}
								>
									{h}
								</div>
							))}
						</div>
						{cohorts.map((cohort, i) => (
							<CohortRow key={i} {...cohort} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
