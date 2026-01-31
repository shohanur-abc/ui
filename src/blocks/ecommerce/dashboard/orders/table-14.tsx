import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Globe, MapPin, TrendingUp, Package, DollarSign, Users } from 'lucide-react';

interface RegionOrder {
	region: string;
	flag: string;
	orders: number;
	revenue: string;
	avgOrderValue: string;
	growth: number;
	topProduct: string;
	fulfillmentRate: number;
}

interface GrowthIndicatorProps {
	growth: number;
}

interface FulfillmentBarProps {
	rate: number;
}

interface RegionCellProps {
	region: string;
	flag: string;
}

const GrowthIndicator = ({ growth }: GrowthIndicatorProps) => (
	<div className={`flex items-center gap-1 ${growth >= 0 ? 'text-accent' : 'text-destructive'}`}>
		<TrendingUp className={`size-4 ${growth < 0 ? 'rotate-180' : ''}`} />
		<span className="font-medium">{growth >= 0 ? '+' : ''}{growth}%</span>
	</div>
);

const FulfillmentBar = ({ rate }: FulfillmentBarProps) => (
	<div className="flex items-center gap-3 min-w-32">
		<Progress value={rate} className="h-2 flex-1" />
		<span className="text-sm text-muted-foreground w-10">{rate}%</span>
	</div>
);

const RegionCell = ({ region, flag }: RegionCellProps) => (
	<div className="flex items-center gap-3">
		<span className="text-2xl">{flag}</span>
		<div>
			<p className="font-medium">{region}</p>
		</div>
	</div>
);

const MetricCell = ({ icon: Icon, value }: { icon: React.ComponentType<{ className?: string }>; value: string | number }) => (
	<div className="flex items-center gap-2">
		<Icon className="size-4 text-muted-foreground" />
		<span>{value}</span>
	</div>
);

const RegionRow = ({ data }: { data: RegionOrder }) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell>
			<RegionCell region={data.region} flag={data.flag} />
		</TableCell>
		<TableCell>
			<MetricCell icon={Package} value={data.orders.toLocaleString()} />
		</TableCell>
		<TableCell className="font-semibold">{data.revenue}</TableCell>
		<TableCell className="text-muted-foreground">{data.avgOrderValue}</TableCell>
		<TableCell>
			<GrowthIndicator growth={data.growth} />
		</TableCell>
		<TableCell className="max-w-32 truncate text-muted-foreground">{data.topProduct}</TableCell>
		<TableCell>
			<FulfillmentBar rate={data.fulfillmentRate} />
		</TableCell>
	</TableRow>
);

export default function Main() {
	const regions: RegionOrder[] = [
		{ region: 'United States', flag: '🇺🇸', orders: 12450, revenue: '$1.2M', avgOrderValue: '$96.39', growth: 15.2, topProduct: 'Wireless Headphones', fulfillmentRate: 98 },
		{ region: 'United Kingdom', flag: '🇬🇧', orders: 4890, revenue: '$456K', avgOrderValue: '$93.25', growth: 8.7, topProduct: 'Smart Watch', fulfillmentRate: 95 },
		{ region: 'Germany', flag: '🇩🇪', orders: 3670, revenue: '$378K', avgOrderValue: '$103.00', growth: 12.4, topProduct: 'Laptop Stand', fulfillmentRate: 97 },
		{ region: 'Canada', flag: '🇨🇦', orders: 2340, revenue: '$234K', avgOrderValue: '$100.00', growth: -3.2, topProduct: 'USB-C Hub', fulfillmentRate: 94 },
		{ region: 'Australia', flag: '🇦🇺', orders: 1890, revenue: '$198K', avgOrderValue: '$104.76', growth: 22.1, topProduct: 'Mechanical Keyboard', fulfillmentRate: 91 },
		{ region: 'Japan', flag: '🇯🇵', orders: 1560, revenue: '$187K', avgOrderValue: '$119.87', growth: 18.5, topProduct: 'Wireless Earbuds', fulfillmentRate: 99 },
		{ region: 'France', flag: '🇫🇷', orders: 1230, revenue: '$118K', avgOrderValue: '$95.93', growth: 5.8, topProduct: 'Phone Case', fulfillmentRate: 93 },
	];

	const headers = ['Region', 'Orders', 'Revenue', 'AOV', 'Growth', 'Top Product', 'Fulfillment'];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<div className="p-2.5 rounded-lg bg-primary/10">
							<Globe className="size-5 text-primary" />
						</div>
						<div>
							<h2 className="text-xl font-semibold">Orders by Region</h2>
							<p className="text-sm text-muted-foreground">Geographic distribution of orders</p>
						</div>
					</div>
					<Button variant="outline" size="sm">View Map</Button>
				</div>
				<div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/30 hover:bg-muted/30 border-border/50">
								{headers.map((header) => (
									<TableHead key={header}>{header}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{regions.map((region) => (
								<RegionRow key={region.region} data={region} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
