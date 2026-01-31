import { ArrowUpRight, Package, ShoppingCart, Star, Truck, Users } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type QuickAction = {
	id: string;
	label: string;
	count?: number;
	icon: React.ElementType;
};

type RecentItem = {
	id: string;
	title: string;
	subtitle: string;
	value: string;
	initials: string;
};

type GoalItem = {
	id: string;
	label: string;
	current: number;
	target: number;
};

const QuickActionButton = ({ label, count, icon: Icon }: QuickAction) => (
	<Button variant="outline" className="flex h-auto flex-col gap-1 p-3">
		<Icon className="size-5 text-primary" />
		<span className="text-xs">{label}</span>
		{count !== undefined && (
			<Badge variant="secondary" className="mt-1 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const RecentItemRow = ({ title, subtitle, value, initials }: RecentItem) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-8">
			<AvatarFallback className="text-xs">{initials}</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<p className="text-sm font-medium">{title}</p>
			<p className="text-xs text-muted-foreground">{subtitle}</p>
		</div>
		<span className="text-sm font-medium">{value}</span>
	</div>
);

const GoalProgress = ({ label, current, target }: GoalItem) => (
	<div>
		<div className="flex justify-between text-sm">
			<span>{label}</span>
			<span className="font-medium">{current}/{target}</span>
		</div>
		<Progress value={(current / target) * 100} className="mt-1.5 h-1.5" />
	</div>
);

export default function Main() {
	const actions: QuickAction[] = [
		{ id: '1', label: 'Orders', count: 24, icon: ShoppingCart },
		{ id: '2', label: 'Products', icon: Package },
		{ id: '3', label: 'Customers', icon: Users },
		{ id: '4', label: 'Shipping', count: 12, icon: Truck },
	];

	const recentItems: RecentItem[] = [
		{ id: '1', title: 'John Doe', subtitle: '3 items', value: '$234.50', initials: 'JD' },
		{ id: '2', title: 'Jane Smith', subtitle: '2 items', value: '$189.00', initials: 'JS' },
		{ id: '3', title: 'Bob Wilson', subtitle: '5 items', value: '$456.20', initials: 'BW' },
	];

	const goals: GoalItem[] = [
		{ id: '1', label: 'Revenue', current: 48200, target: 60000 },
		{ id: '2', label: 'Orders', current: 1284, target: 1500 },
		{ id: '3', label: 'Customers', current: 845, target: 1000 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @lg:grid-cols-3">
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-sm">Quick Actions</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-4 gap-2">
								{actions.map((action) => (
									<QuickActionButton key={action.id} {...action} />
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex-row items-center justify-between pb-3">
							<CardTitle className="text-sm">Recent Orders</CardTitle>
							<Button variant="ghost" size="sm" className="h-7 text-xs">
								View All
								<ArrowUpRight className="ml-1 size-3" />
							</Button>
						</CardHeader>
						<CardContent className="space-y-3">
							{recentItems.map((item) => (
								<RecentItemRow key={item.id} {...item} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-sm">Monthly Goals</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{goals.map((goal) => (
								<GoalProgress key={goal.id} {...goal} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
