import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, type LucideIcon } from 'lucide-react';

interface ProgressStatProps {
	label: string;
	description: string;
	value: number;
	status: 'complete' | 'in-progress' | 'pending';
}

const ProgressStat = ({ label, description, value, status }: ProgressStatProps) => {
	const statusConfig = {
		complete: { icon: CheckCircle, badge: 'Complete', variant: 'default' as const },
		'in-progress': { icon: Circle, badge: 'In Progress', variant: 'secondary' as const },
		pending: { icon: Circle, badge: 'Pending', variant: 'outline' as const },
	};

	const { icon: Icon, badge, variant } = statusConfig[status];

	return (
		<div className="group flex gap-4 p-4 transition-colors hover:bg-secondary/30">
			<div className={`mt-0.5 rounded-full p-1 ${status === 'complete' ? 'text-accent' : 'text-muted-foreground'}`}>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 space-y-3">
				<div className="flex items-start justify-between">
					<div>
						<p className="font-medium">{label}</p>
						<p className="text-xs text-muted-foreground">{description}</p>
					</div>
					<Badge variant={variant} className="text-[10px]">{badge}</Badge>
				</div>
				<div className="space-y-1">
					<Progress value={value} className="h-1.5" />
					<p className="text-right text-xs text-muted-foreground">{value}%</p>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const stats: ProgressStatProps[] = [
		{ label: 'Q1 Revenue Target', description: 'Target: $2.5M', value: 100, status: 'complete' },
		{ label: 'Q2 Revenue Target', description: 'Target: $3.2M', value: 78, status: 'in-progress' },
		{ label: 'Customer Acquisition', description: 'Target: 50K new customers', value: 64, status: 'in-progress' },
		{ label: 'Platform Expansion', description: 'Launch in 5 new markets', value: 20, status: 'pending' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="divide-y divide-border overflow-hidden">
					{stats.map((stat, i) => (
						<ProgressStat key={i} {...stat} />
					))}
				</Card>
			</div>
		</section>
	);
}
