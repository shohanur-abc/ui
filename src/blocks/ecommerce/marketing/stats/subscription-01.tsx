import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, DollarSign, Users, Zap, TrendingUp } from 'lucide-react';

interface SubscriptionStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

interface PlanStatProps {
	name: string;
	subscribers: string;
	revenue: string;
	churn: string;
}

const SubscriptionMetric = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: SubscriptionStatProps) => (
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

const PlanRow = ({ name, subscribers, revenue, churn }: PlanStatProps) => (
	<div className="flex items-center gap-4 py-3">
		<div className="flex-1">
			<p className="font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">{subscribers} subscribers</p>
		</div>
		<div className="text-right">
			<p className="font-semibold">{revenue}</p>
			<p className="text-xs text-muted-foreground">{churn} churn</p>
		</div>
	</div>
);

export default function Main() {
	const metrics: SubscriptionStatProps[] = [
		{
			icon: Users,
			label: 'Active Subscriptions',
			value: '12,847',
			change: '+18%',
			positive: true,
		},
		{
			icon: DollarSign,
			label: 'Monthly Recurring',
			value: '$284K',
			change: '+24%',
			positive: true,
		},
		{
			icon: Zap,
			label: 'Avg. LTV',
			value: '$847',
			change: '+12%',
			positive: true,
		},
		{
			icon: TrendingUp,
			label: 'Net Revenue Retention',
			value: '118%',
			change: '+5%',
			positive: true,
		},
	];

	const plans: PlanStatProps[] = [
		{ name: 'Enterprise', subscribers: '847', revenue: '$148K', churn: '2%' },
		{
			name: 'Professional',
			subscribers: '4,284',
			revenue: '$98K',
			churn: '4%',
		},
		{ name: 'Basic', subscribers: '7,716', revenue: '$38K', churn: '8%' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-2">
						{metrics.map((metric, i) => (
							<SubscriptionMetric key={i} {...metric} />
						))}
					</div>
					<Card className="p-5">
						<div className="flex items-center gap-2">
							<FileText className="size-4 text-primary" />
							<h3 className="font-semibold">By Plan</h3>
						</div>
						<Separator className="my-4" />
						<div className="divide-y">
							{plans.map((plan, i) => (
								<PlanRow key={i} {...plan} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
