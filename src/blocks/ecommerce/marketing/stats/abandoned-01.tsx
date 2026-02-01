import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	ShoppingCart,
	XCircle,
	Clock,
	DollarSign,
	TrendingUp,
} from 'lucide-react';

interface AbandonedStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

interface RecoveryStatProps {
	stage: string;
	count: string;
	value: string;
	rate: string;
}

const AbandonedMetric = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: AbandonedStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center justify-between">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-4 text-primary" />
			</div>
			<Badge variant={positive ? 'default' : 'destructive'}>{change}</Badge>
		</div>
		<p className="mt-4 text-2xl font-bold">{value}</p>
		<p className="text-sm text-muted-foreground">{label}</p>
	</Card>
);

const RecoveryRow = ({ stage, count, value, rate }: RecoveryStatProps) => (
	<div className="flex items-center gap-4 py-3">
		<div className="flex-1">
			<p className="font-medium">{stage}</p>
			<p className="text-xs text-muted-foreground">{count} carts</p>
		</div>
		<div className="text-right">
			<p className="font-semibold">{value}</p>
			<p className="text-xs text-muted-foreground">{rate} recovery</p>
		</div>
	</div>
);

export default function Main() {
	const metrics: AbandonedStatProps[] = [
		{
			icon: ShoppingCart,
			label: 'Abandoned Carts',
			value: '8,294',
			change: '-12%',
			positive: true,
		},
		{
			icon: DollarSign,
			label: 'Lost Revenue',
			value: '$524K',
			change: '-8%',
			positive: true,
		},
		{
			icon: TrendingUp,
			label: 'Recovery Rate',
			value: '24%',
			change: '+5%',
			positive: true,
		},
		{
			icon: Clock,
			label: 'Avg. Abandon Time',
			value: '4:32',
			change: '-0:28',
			positive: true,
		},
	];

	const recoveryStages: RecoveryStatProps[] = [
		{ stage: 'Email Sent (1hr)', count: '8,294', value: '$148K', rate: '28%' },
		{ stage: 'Email Sent (24hr)', count: '5,847', value: '$84K', rate: '16%' },
		{ stage: 'SMS Reminder', count: '2,847', value: '$42K', rate: '8%' },
		{ stage: 'Exit Intent Popup', count: '4,284', value: '$62K', rate: '12%' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-2">
						{metrics.map((metric, i) => (
							<AbandonedMetric key={i} {...metric} />
						))}
					</div>
					<Card className="p-5">
						<div className="flex items-center gap-2">
							<XCircle className="size-4 text-primary" />
							<h3 className="font-semibold">Recovery Stages</h3>
						</div>
						<Separator className="my-4" />
						<div className="divide-y">
							{recoveryStages.map((stage, i) => (
								<RecoveryRow key={i} {...stage} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
