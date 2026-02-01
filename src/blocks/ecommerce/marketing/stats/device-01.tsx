import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Monitor, Tablet, Tv, Watch } from 'lucide-react';

interface DeviceStatProps {
	icon: React.ElementType;
	device: string;
	sessions: string;
	percentage: number;
	conversion: string;
}

const DeviceStat = ({
	icon: Icon,
	device,
	sessions,
	percentage,
	conversion,
}: DeviceStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<p className="font-medium">{device}</p>
				<p className="text-xs text-muted-foreground">
					{percentage}% of traffic
				</p>
			</div>
		</div>
		<div className="mt-4 space-y-3">
			<Progress value={percentage} className="h-1.5" />
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Sessions</span>
				<span className="font-medium">{sessions}</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Conversion</span>
				<Badge variant="outline">{conversion}</Badge>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const devices: DeviceStatProps[] = [
		{
			icon: Smartphone,
			device: 'Mobile',
			sessions: '124,847',
			percentage: 58,
			conversion: '3.2%',
		},
		{
			icon: Monitor,
			device: 'Desktop',
			sessions: '68,294',
			percentage: 32,
			conversion: '4.8%',
		},
		{
			icon: Tablet,
			device: 'Tablet',
			sessions: '18,284',
			percentage: 8,
			conversion: '3.8%',
		},
		{
			icon: Tv,
			device: 'Smart TV',
			sessions: '4,284',
			percentage: 2,
			conversion: '1.2%',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{devices.map((device, i) => (
						<DeviceStat key={i} {...device} />
					))}
				</div>
			</div>
		</section>
	);
}
