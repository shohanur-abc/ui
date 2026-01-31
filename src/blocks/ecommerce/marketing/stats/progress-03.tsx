import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Globe, Smartphone, Laptop, Store, type LucideIcon } from 'lucide-react';

interface ChannelStatProps {
	icon: LucideIcon;
	channel: string;
	sales: string;
	percentage: number;
	color: string;
}

const ChannelStat = ({ icon: Icon, channel, sales, percentage, color }: ChannelStatProps) => (
	<div className="group space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Icon className="size-4 text-muted-foreground" />
				<span className="text-sm font-medium">{channel}</span>
			</div>
			<span className="text-sm font-semibold">{sales}</span>
		</div>
		<div className="relative h-2 overflow-hidden rounded-full bg-secondary">
			<div
				className="h-full rounded-full transition-all duration-500"
				style={{ width: `${percentage}%`, backgroundColor: `var(--${color})` }}
			/>
		</div>
		<p className="text-right text-xs text-muted-foreground">{percentage}% of total</p>
	</div>
);

export default function Main() {
	const stats: ChannelStatProps[] = [
		{ icon: Globe, channel: 'Website', sales: '$1.2M', percentage: 48, color: 'chart-1' },
		{ icon: Smartphone, channel: 'Mobile App', sales: '$847K', percentage: 34, color: 'chart-2' },
		{ icon: Store, channel: 'Retail', sales: '$324K', percentage: 13, color: 'chart-3' },
		{ icon: Laptop, channel: 'Marketplace', sales: '$128K', percentage: 5, color: 'chart-4' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="p-6 @md:p-8">
					<div className="mb-6 flex items-center justify-between">
						<h3 className="font-semibold">Sales by Channel</h3>
						<Badge variant="outline">Last 30 days</Badge>
					</div>
					<div className="space-y-6">
						{stats.map((stat, i) => (
							<ChannelStat key={i} {...stat} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
