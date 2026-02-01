import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin } from 'lucide-react';

interface RegionStatProps {
	region: string;
	revenue: string;
	orders: string;
	percentage: number;
	flag: string;
}

interface HeaderProps {
	title: string;
	subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => (
	<div className="mb-8 flex items-center justify-between">
		<div>
			<h2 className="text-2xl font-bold">{title}</h2>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
		<Badge variant="outline" className="gap-1.5">
			<Globe className="size-3" />
			Global
		</Badge>
	</div>
);

const RegionStat = ({
	region,
	revenue,
	orders,
	percentage,
	flag,
}: RegionStatProps) => (
	<div className="group flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-secondary/50">
		<div className="flex size-10 items-center justify-center rounded-full bg-secondary text-lg">
			{flag}
		</div>
		<div className="flex-1">
			<p className="font-medium">{region}</p>
			<p className="text-sm text-muted-foreground">{orders} orders</p>
		</div>
		<div className="text-right">
			<p className="font-semibold">{revenue}</p>
			<p className="text-xs text-muted-foreground">{percentage}% of total</p>
		</div>
	</div>
);

export default function Main() {
	const header: HeaderProps = {
		title: 'Sales by Region',
		subtitle: 'Revenue distribution across markets',
	};

	const stats: RegionStatProps[] = [
		{
			region: 'North America',
			revenue: '$847K',
			orders: '12,847',
			percentage: 42,
			flag: '🇺🇸',
		},
		{
			region: 'Europe',
			revenue: '$524K',
			orders: '8,294',
			percentage: 26,
			flag: '🇪🇺',
		},
		{
			region: 'Asia Pacific',
			revenue: '$384K',
			orders: '6,847',
			percentage: 19,
			flag: '🇯🇵',
		},
		{
			region: 'Latin America',
			revenue: '$168K',
			orders: '2,847',
			percentage: 8,
			flag: '🇧🇷',
		},
		{
			region: 'Rest of World',
			revenue: '$102K',
			orders: '1,847',
			percentage: 5,
			flag: '🌍',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="p-6 @md:p-8">
					<Header {...header} />
					<div className="space-y-2">
						{stats.map((stat, i) => (
							<RegionStat key={i} {...stat} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
