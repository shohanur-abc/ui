import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building, Store, Globe, TrendingUp, DollarSign } from 'lucide-react';

interface ChannelStatProps {
	icon: React.ElementType;
	channel: string;
	orders: string;
	revenue: string;
	growth: string;
	positive: boolean;
}

const ChannelCard = ({
	icon: Icon,
	channel,
	orders,
	revenue,
	growth,
	positive,
}: ChannelStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<p className="font-semibold">{channel}</p>
				<p className="text-xs text-muted-foreground">{orders} orders</p>
			</div>
			<Badge variant={positive ? 'default' : 'destructive'}>{growth}</Badge>
		</div>
		<Separator className="my-4" />
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">Revenue</span>
			<span className="text-2xl font-bold">{revenue}</span>
		</div>
	</Card>
);

export default function Main() {
	const channels: ChannelStatProps[] = [
		{
			icon: Globe,
			channel: 'Online Store',
			orders: '24,847',
			revenue: '$1.2M',
			growth: '+28%',
			positive: true,
		},
		{
			icon: Store,
			channel: 'Retail Stores',
			orders: '8,294',
			revenue: '$524K',
			growth: '+8%',
			positive: true,
		},
		{
			icon: Building,
			channel: 'Wholesale',
			orders: '2,847',
			revenue: '$847K',
			growth: '+12%',
			positive: true,
		},
		{
			icon: TrendingUp,
			channel: 'Marketplace',
			orders: '12,847',
			revenue: '$428K',
			growth: '+42%',
			positive: true,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{channels.map((channel, i) => (
						<ChannelCard key={i} {...channel} />
					))}
				</div>
			</div>
		</section>
	);
}
