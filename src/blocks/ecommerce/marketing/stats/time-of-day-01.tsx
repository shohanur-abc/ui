import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	Clock,
	TrendingUp,
	ShoppingCart,
	DollarSign,
	Timer,
} from 'lucide-react';

interface TimeOfDayStatProps {
	timeSlot: string;
	orders: string;
	revenue: string;
	percentage: number;
	peak: boolean;
}

const TimeSlotCard = ({
	timeSlot,
	orders,
	revenue,
	percentage,
	peak,
}: TimeOfDayStatProps) => (
	<Card
		className={`group p-4 transition-all duration-300 hover:shadow-md ${peak ? 'ring-2 ring-primary' : ''}`}
	>
		<div className="flex items-center justify-between">
			<span className="font-medium">{timeSlot}</span>
			{peak && <Badge>Peak</Badge>}
		</div>
		<div className="mt-3 space-y-2">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Orders</span>
				<span className="font-semibold">{orders}</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Revenue</span>
				<span className="font-semibold">{revenue}</span>
			</div>
			<Progress value={percentage} className="h-1.5" />
		</div>
	</Card>
);

export default function Main() {
	const timeSlots: TimeOfDayStatProps[] = [
		{
			timeSlot: '6AM - 9AM',
			orders: '2,847',
			revenue: '$84K',
			percentage: 15,
			peak: false,
		},
		{
			timeSlot: '9AM - 12PM',
			orders: '8,294',
			revenue: '$248K',
			percentage: 45,
			peak: false,
		},
		{
			timeSlot: '12PM - 3PM',
			orders: '12,847',
			revenue: '$384K',
			percentage: 68,
			peak: true,
		},
		{
			timeSlot: '3PM - 6PM',
			orders: '10,284',
			revenue: '$308K',
			percentage: 55,
			peak: false,
		},
		{
			timeSlot: '6PM - 9PM',
			orders: '14,847',
			revenue: '$445K',
			percentage: 78,
			peak: true,
		},
		{
			timeSlot: '9PM - 12AM',
			orders: '6,284',
			revenue: '$188K',
			percentage: 35,
			peak: false,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="mb-6 flex items-center gap-3">
					<div className="rounded-lg bg-primary/10 p-2">
						<Clock className="size-5 text-primary" />
					</div>
					<div>
						<h3 className="font-semibold">Sales by Time of Day</h3>
						<p className="text-sm text-muted-foreground">
							Last 30 days performance
						</p>
					</div>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-6">
					{timeSlots.map((slot, i) => (
						<TimeSlotCard key={i} {...slot} />
					))}
				</div>
			</div>
		</section>
	);
}
