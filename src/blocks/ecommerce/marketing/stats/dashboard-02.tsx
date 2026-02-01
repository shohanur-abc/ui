import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	TrendingUp,
	DollarSign,
	ShoppingCart,
	Users,
	Clock,
	Target,
	BarChart3,
} from 'lucide-react';

interface MainStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	progress: number;
}

interface SmallStatProps {
	label: string;
	value: string;
}

const MainStat = ({
	icon: Icon,
	label,
	value,
	change,
	progress,
}: MainStatProps) => (
	<Card className="p-6">
		<div className="flex items-start justify-between">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Icon className="size-5 text-primary" />
			</div>
			<Badge variant="secondary" className="gap-1">
				<TrendingUp className="size-3" />
				{change}
			</Badge>
		</div>
		<div className="mt-4 space-y-3">
			<div>
				<p className="text-sm text-muted-foreground">{label}</p>
				<p className="text-3xl font-bold tracking-tight">{value}</p>
			</div>
			<Progress value={progress} className="h-1.5" />
		</div>
	</Card>
);

const SmallStat = ({ label, value }: SmallStatProps) => (
	<div className="text-center">
		<p className="text-xl font-bold">{value}</p>
		<p className="text-xs text-muted-foreground">{label}</p>
	</div>
);

export default function Main() {
	const mainStats: MainStatProps[] = [
		{
			icon: DollarSign,
			label: 'Total Revenue',
			value: '$1.24M',
			change: '+24%',
			progress: 78,
		},
		{
			icon: ShoppingCart,
			label: 'Total Orders',
			value: '48,294',
			change: '+18%',
			progress: 65,
		},
		{
			icon: Users,
			label: 'Customers',
			value: '124,847',
			change: '+32%',
			progress: 82,
		},
	];

	const smallStats: SmallStatProps[] = [
		{ label: 'Avg. Order Value', value: '$142' },
		{ label: 'Repeat Rate', value: '68%' },
		{ label: 'Cart Abandonment', value: '32%' },
		{ label: 'Return Rate', value: '4.2%' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					{mainStats.map((stat, i) => (
						<MainStat key={i} {...stat} />
					))}
				</div>
				<Card className="mt-6 p-6">
					<div className="grid gap-6 @sm:grid-cols-2 @lg:grid-cols-4">
						{smallStats.map((stat, i) => (
							<SmallStat key={i} {...stat} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
