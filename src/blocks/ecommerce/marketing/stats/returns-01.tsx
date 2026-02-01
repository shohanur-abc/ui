import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	RotateCcw,
	Package,
	DollarSign,
	AlertCircle,
	CheckCircle,
} from 'lucide-react';

interface ReturnStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	rate: number;
	status: 'good' | 'warning' | 'bad';
}

const ReturnStat = ({
	icon: Icon,
	label,
	value,
	rate,
	status,
}: ReturnStatProps) => {
	const statusColors = {
		good: 'text-accent',
		warning: 'text-yellow-500',
		bad: 'text-destructive',
	};

	return (
		<Card className="group p-5 transition-all duration-300 hover:shadow-md">
			<div className="flex items-center justify-between">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className={`size-4 ${statusColors[status]}`} />
				</div>
				<span className={`text-sm font-medium ${statusColors[status]}`}>
					{rate}%
				</span>
			</div>
			<div className="mt-4">
				<p className="text-2xl font-bold">{value}</p>
				<p className="mt-1 text-sm text-muted-foreground">{label}</p>
			</div>
			<Progress value={rate} className="mt-4 h-1" />
		</Card>
	);
};

export default function Main() {
	const stats: ReturnStatProps[] = [
		{
			icon: RotateCcw,
			label: 'Total Returns',
			value: '847',
			rate: 4.2,
			status: 'good',
		},
		{
			icon: Package,
			label: 'Returned Items',
			value: '1,284',
			rate: 6.8,
			status: 'warning',
		},
		{
			icon: DollarSign,
			label: 'Refund Value',
			value: '$42.8K',
			rate: 3.1,
			status: 'good',
		},
		{
			icon: AlertCircle,
			label: 'Quality Issues',
			value: '128',
			rate: 15,
			status: 'bad',
		},
		{
			icon: CheckCircle,
			label: 'Processed',
			value: '724',
			rate: 85,
			status: 'good',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @xl:grid-cols-3 @3xl:grid-cols-5">
					{stats.map((stat, i) => (
						<ReturnStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
