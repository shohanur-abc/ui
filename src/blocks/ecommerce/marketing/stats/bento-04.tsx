import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Store, Globe, Smartphone, Laptop } from 'lucide-react';

interface ChannelStatProps {
	icon: React.ElementType;
	channel: string;
	revenue: string;
	percentage: number;
	orders: string;
}

interface TotalStatProps {
	label: string;
	value: string;
	subtitle: string;
}

const TotalCard = ({ label, value, subtitle }: TotalStatProps) => (
	<Card className="relative overflow-hidden p-8 @md:col-span-2 @xl:col-span-1 @xl:row-span-2">
		<div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
		<div className="relative flex h-full flex-col justify-center text-primary-foreground">
			<p className="text-sm font-medium opacity-80">{label}</p>
			<p className="mt-2 text-5xl font-bold tracking-tighter @lg:text-6xl">{value}</p>
			<p className="mt-4 text-sm opacity-70">{subtitle}</p>
		</div>
	</Card>
);

const ChannelCard = ({ icon: Icon, channel, revenue, percentage, orders }: ChannelStatProps) => (
	<Card className="group relative overflow-hidden p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-secondary p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<span className="text-sm font-medium">{channel}</span>
			</div>
			<div className="space-y-2">
				<div className="flex items-baseline justify-between">
					<p className="text-2xl font-bold">{revenue}</p>
					<span className="text-sm text-muted-foreground">{percentage}%</span>
				</div>
				<Progress value={percentage} className="h-1.5" />
			</div>
			<Separator />
			<p className="text-xs text-muted-foreground">{orders} orders</p>
		</div>
	</Card>
);

export default function Main() {
	const total: TotalStatProps = {
		label: 'Total Revenue',
		value: '$3.2M',
		subtitle: 'Across all sales channels',
	};

	const channels: ChannelStatProps[] = [
		{ icon: Globe, channel: 'Website', revenue: '$1.84M', percentage: 58, orders: '12,847' },
		{ icon: Smartphone, channel: 'Mobile App', revenue: '$896K', percentage: 28, orders: '6,492' },
		{ icon: Store, channel: 'In-Store', revenue: '$320K', percentage: 10, orders: '2,184' },
		{ icon: Laptop, channel: 'Marketplace', revenue: '$128K', percentage: 4, orders: '847' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @lg:gap-6 @xl:grid-cols-3">
					<TotalCard {...total} />
					{channels.map((channel, i) => (
						<ChannelCard key={i} {...channel} />
					))}
				</div>
			</div>
		</section>
	);
}
