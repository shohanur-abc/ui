import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	RefreshCw,
	Users,
	DollarSign,
	Calendar,
	TrendingUp,
} from 'lucide-react';

interface RepeatPurchaseStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

interface CohortPurchaseProps {
	cohort: string;
	firstPurchase: string;
	secondPurchase: string;
	thirdPlus: string;
}

const RepeatMetric = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: RepeatPurchaseStatProps) => (
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

const CohortRow = ({
	cohort,
	firstPurchase,
	secondPurchase,
	thirdPlus,
}: CohortPurchaseProps) => (
	<div className="flex items-center gap-4 py-3">
		<div className="w-24 font-medium">{cohort}</div>
		<div className="flex-1 text-center">
			<p className="font-semibold">{firstPurchase}</p>
		</div>
		<div className="flex-1 text-center">
			<p className="font-semibold">{secondPurchase}</p>
		</div>
		<div className="flex-1 text-center">
			<p className="font-semibold">{thirdPlus}</p>
		</div>
	</div>
);

export default function Main() {
	const metrics: RepeatPurchaseStatProps[] = [
		{
			icon: RefreshCw,
			label: 'Repeat Rate',
			value: '42%',
			change: '+5%',
			positive: true,
		},
		{
			icon: Users,
			label: 'Repeat Customers',
			value: '24,847',
			change: '+18%',
			positive: true,
		},
		{
			icon: DollarSign,
			label: 'Repeat Revenue',
			value: '$1.8M',
			change: '+24%',
			positive: true,
		},
		{
			icon: Calendar,
			label: 'Avg. Time to 2nd',
			value: '28 days',
			change: '-4d',
			positive: true,
		},
	];

	const cohorts: CohortPurchaseProps[] = [
		{
			cohort: 'Jan 2024',
			firstPurchase: '2,847',
			secondPurchase: '1,284',
			thirdPlus: '524',
		},
		{
			cohort: 'Feb 2024',
			firstPurchase: '3,124',
			secondPurchase: '1,428',
			thirdPlus: '612',
		},
		{
			cohort: 'Mar 2024',
			firstPurchase: '2,984',
			secondPurchase: '1,348',
			thirdPlus: '584',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-2">
						{metrics.map((metric, i) => (
							<RepeatMetric key={i} {...metric} />
						))}
					</div>
					<Card className="p-5">
						<h3 className="flex items-center gap-2 font-semibold">
							<TrendingUp className="size-4 text-primary" />
							Purchase Frequency
						</h3>
						<Separator className="my-4" />
						<div className="mb-2 flex items-center gap-4 text-xs text-muted-foreground">
							<div className="w-24">Cohort</div>
							<div className="flex-1 text-center">1st</div>
							<div className="flex-1 text-center">2nd</div>
							<div className="flex-1 text-center">3rd+</div>
						</div>
						<div className="divide-y">
							{cohorts.map((cohort, i) => (
								<CohortRow key={i} {...cohort} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
