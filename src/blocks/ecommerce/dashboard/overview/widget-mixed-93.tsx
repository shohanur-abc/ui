import {
	ArrowUpRight,
	Clock,
	DollarSign,
	Package,
	ShoppingCart,
	TrendingUp,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type WidgetItem = {
	id: string;
	type: 'stat' | 'progress' | 'list';
	title: string;
	value?: string;
	icon?: React.ElementType;
	progress?: number;
	items?: { label: string; value: string }[];
};

const StatWidget = ({ title, value, icon: Icon }: WidgetItem) => (
	<Card>
		<CardContent className="flex items-center gap-3 p-3">
			{Icon && (
				<div className="rounded-lg bg-primary/10 p-2.5">
					<Icon className="size-5 text-primary" />
				</div>
			)}
			<div>
				<p className="text-xs text-muted-foreground">{title}</p>
				<p className="text-xl font-bold">{value}</p>
			</div>
		</CardContent>
	</Card>
);

const ProgressWidget = ({ title, value, progress }: WidgetItem) => (
	<Card>
		<CardContent className="p-3">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium">{title}</p>
				<p className="text-sm font-bold">{value}</p>
			</div>
			<Progress value={progress} className="mt-2 h-1.5" />
		</CardContent>
	</Card>
);

const ListWidget = ({ title, items }: WidgetItem) => (
	<Card>
		<CardContent className="p-3">
			<p className="text-sm font-medium">{title}</p>
			<div className="mt-2 space-y-1">
				{items?.map((item, i) => (
					<div key={i} className="flex items-center justify-between text-xs">
						<span className="text-muted-foreground">{item.label}</span>
						<span className="font-medium">{item.value}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const widgets: WidgetItem[] = [
		{
			id: '1',
			type: 'stat',
			title: 'Revenue',
			value: '$48.2K',
			icon: DollarSign,
		},
		{
			id: '2',
			type: 'stat',
			title: 'Orders',
			value: '1,284',
			icon: ShoppingCart,
		},
		{
			id: '3',
			type: 'progress',
			title: 'Monthly Goal',
			value: '72%',
			progress: 72,
		},
		{
			id: '4',
			type: 'progress',
			title: 'Weekly Target',
			value: '85%',
			progress: 85,
		},
		{ id: '5', type: 'stat', title: 'Customers', value: '3,845', icon: Users },
		{ id: '6', type: 'stat', title: 'Products', value: '542', icon: Package },
		{
			id: '7',
			type: 'list',
			title: 'Top Categories',
			items: [
				{ label: 'Electronics', value: '$12.4K' },
				{ label: 'Clothing', value: '$8.2K' },
				{ label: 'Accessories', value: '$5.8K' },
			],
		},
		{
			id: '8',
			type: 'list',
			title: 'Recent',
			items: [
				{ label: 'New Orders', value: '24' },
				{ label: 'Pending', value: '12' },
				{ label: 'Shipped', value: '18' },
			],
		},
	];

	const renderWidget = (widget: WidgetItem) => {
		switch (widget.type) {
			case 'stat':
				return <StatWidget key={widget.id} {...widget} />;
			case 'progress':
				return <ProgressWidget key={widget.id} {...widget} />;
			case 'list':
				return <ListWidget key={widget.id} {...widget} />;
		}
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-4">
					{widgets.map(renderWidget)}
				</div>
			</div>
		</section>
	);
}
