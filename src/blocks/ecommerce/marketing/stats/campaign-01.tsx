import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Megaphone,
	MousePointer,
	Eye,
	ShoppingCart,
	DollarSign,
	Target,
} from 'lucide-react';

interface CampaignStatProps {
	name: string;
	status: 'active' | 'paused' | 'ended';
	metrics: { icon: React.ElementType; label: string; value: string }[];
}

const CampaignCard = ({ name, status, metrics }: CampaignStatProps) => {
	const statusConfig = {
		active: { color: 'bg-accent text-accent-foreground', label: 'Active' },
		paused: { color: 'bg-yellow-500 text-white', label: 'Paused' },
		ended: { color: 'bg-secondary text-secondary-foreground', label: 'Ended' },
	};

	return (
		<Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
			<div className="flex items-center justify-between p-4">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-primary/10 p-2">
						<Megaphone className="size-4 text-primary" />
					</div>
					<span className="font-semibold">{name}</span>
				</div>
				<Badge className={statusConfig[status].color}>
					{statusConfig[status].label}
				</Badge>
			</div>
			<Separator />
			<div className="grid grid-cols-2 divide-x divide-y @md:grid-cols-4 @md:divide-y-0">
				{metrics.map((metric, i) => (
					<div key={i} className="p-4 text-center">
						<metric.icon className="mx-auto size-4 text-muted-foreground" />
						<p className="mt-2 text-lg font-bold">{metric.value}</p>
						<p className="text-xs text-muted-foreground">{metric.label}</p>
					</div>
				))}
			</div>
		</Card>
	);
};

export default function Main() {
	const campaigns: CampaignStatProps[] = [
		{
			name: 'Summer Sale 2024',
			status: 'active',
			metrics: [
				{ icon: Eye, label: 'Impressions', value: '2.4M' },
				{ icon: MousePointer, label: 'Clicks', value: '124K' },
				{ icon: ShoppingCart, label: 'Conversions', value: '8,294' },
				{ icon: DollarSign, label: 'Revenue', value: '$284K' },
			],
		},
		{
			name: 'New Arrivals',
			status: 'active',
			metrics: [
				{ icon: Eye, label: 'Impressions', value: '1.8M' },
				{ icon: MousePointer, label: 'Clicks', value: '98K' },
				{ icon: ShoppingCart, label: 'Conversions', value: '4,847' },
				{ icon: DollarSign, label: 'Revenue', value: '$142K' },
			],
		},
		{
			name: 'Flash Sale',
			status: 'ended',
			metrics: [
				{ icon: Eye, label: 'Impressions', value: '3.2M' },
				{ icon: MousePointer, label: 'Clicks', value: '248K' },
				{ icon: ShoppingCart, label: 'Conversions', value: '12,847' },
				{ icon: DollarSign, label: 'Revenue', value: '$524K' },
			],
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-4">
					{campaigns.map((campaign, i) => (
						<CampaignCard key={i} {...campaign} />
					))}
				</div>
			</div>
		</section>
	);
}
