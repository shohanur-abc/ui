import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, ShoppingBag, DollarSign, Package, Clock, Users, RotateCcw, Truck, CheckCircle2 } from 'lucide-react';

interface StatCard {
	title: string;
	value: string;
	change: string;
	changeType: 'positive' | 'negative' | 'neutral';
	icon: React.ComponentType<{ className?: string }>;
	iconColor: string;
	iconBgColor: string;
	subtitle?: string;
}

interface StatGridCardProps {
	stat: StatCard;
}

const StatGridCard = ({ stat }: StatGridCardProps) => {
	const changeColors = {
		positive: 'text-accent',
		negative: 'text-destructive',
		neutral: 'text-muted-foreground',
	};
	const TrendIcon = stat.changeType === 'positive' ? TrendingUp : stat.changeType === 'negative' ? TrendingDown : null;

	return (
		<Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-md transition-all">
			<CardContent className="p-4">
				<div className="flex items-start justify-between mb-3">
					<div className={`size-10 rounded-lg flex items-center justify-center ${stat.iconBgColor}`}>
						<stat.icon className={`size-5 ${stat.iconColor}`} />
					</div>
					{TrendIcon && (
						<div className={`flex items-center gap-1 text-sm ${changeColors[stat.changeType]}`}>
							<TrendIcon className="size-4" />
							<span className="font-medium">{stat.change}</span>
						</div>
					)}
				</div>

				<p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
				<p className="text-2xl font-bold mb-1">{stat.value}</p>
				{stat.subtitle && (
					<p className="text-xs text-muted-foreground">{stat.subtitle}</p>
				)}
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const stats: StatCard[] = [
		{ title: 'Total Orders', value: '1,284', change: '+12.5%', changeType: 'positive', icon: ShoppingBag, iconColor: 'text-primary', iconBgColor: 'bg-primary/10', subtitle: 'This month' },
		{ title: 'Revenue', value: '$45,231', change: '+8.2%', changeType: 'positive', icon: DollarSign, iconColor: 'text-accent', iconBgColor: 'bg-accent/10', subtitle: 'This month' },
		{ title: 'Pending Orders', value: '23', change: '-5.1%', changeType: 'positive', icon: Clock, iconColor: 'text-yellow-500', iconBgColor: 'bg-yellow-500/10', subtitle: 'Awaiting processing' },
		{ title: 'Processing', value: '45', change: '+15%', changeType: 'neutral', icon: Package, iconColor: 'text-blue-500', iconBgColor: 'bg-blue-500/10', subtitle: 'Being prepared' },
		{ title: 'Shipped', value: '156', change: '+22%', changeType: 'positive', icon: Truck, iconColor: 'text-indigo-500', iconBgColor: 'bg-indigo-500/10', subtitle: 'In transit' },
		{ title: 'Delivered', value: '892', change: '+18%', changeType: 'positive', icon: CheckCircle2, iconColor: 'text-accent', iconBgColor: 'bg-accent/10', subtitle: 'Completed' },
		{ title: 'Returns', value: '34', change: '+3.2%', changeType: 'negative', icon: RotateCcw, iconColor: 'text-destructive', iconBgColor: 'bg-destructive/10', subtitle: 'Return rate: 2.6%' },
		{ title: 'Active Customers', value: '2,847', change: '+9.8%', changeType: 'positive', icon: Users, iconColor: 'text-purple-500', iconBgColor: 'bg-purple-500/10', subtitle: 'This month' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
					{stats.map((stat, i) => (
						<StatGridCard key={i} stat={stat} />
					))}
				</div>
			</div>
		</section>
	);
}
