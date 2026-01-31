import { Truck, Clock, Calendar, AlertCircle, Check, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AsapOption = ({
	value,
	name,
	time,
	price,
	fastest,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	fastest?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className="relative transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
		>
			{fastest && <Badge className="absolute -top-2.5 left-4 bg-green-500">Fastest</Badge>}
			<CardContent className="p-5">
				<div className="flex items-center gap-4">
					<RadioGroupItem value={value} id={value} />
					<div className="flex-1">
						<h3 className="font-semibold">{name}</h3>
						<div className="flex items-center gap-1 text-sm text-muted-foreground">
							<Clock className="size-3.5" />
							<span>{time}</span>
						</div>
					</div>
					<span className="text-xl font-bold text-primary">{price}</span>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const ScheduleSlot = ({
	value,
	day,
	date,
	slots,
}: {
	value: string;
	day: string;
	date: string;
	slots: { time: string; available: boolean }[];
}) => (
	<Card className="mb-4">
		<CardHeader className="pb-2">
			<CardTitle className="text-base">
				{day}, {date}
			</CardTitle>
		</CardHeader>
		<CardContent>
			<RadioGroup className="grid @sm:grid-cols-3 gap-2">
				{slots.map((slot, i) => (
					<Label
						key={`${value}-${i}`}
						htmlFor={`${value}-${i}`}
						className={`
							flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all
							${slot.available ? 'hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10' : 'opacity-50 cursor-not-allowed'}
						`}
					>
						<RadioGroupItem
							value={`${value}-${i}`}
							id={`${value}-${i}`}
							className="sr-only"
							disabled={!slot.available}
						/>
						<span className={slot.available ? '' : 'line-through'}>{slot.time}</span>
					</Label>
				))}
			</RadioGroup>
		</CardContent>
	</Card>
);

export default function Main() {
	const asapOptions = [
		{ value: 'rush', name: 'Rush Delivery', time: '30-45 minutes', price: '$9.99', fastest: true },
		{ value: 'quick', name: 'Quick Delivery', time: '1-2 hours', price: '$5.99' },
		{ value: 'standard', name: 'Standard Delivery', time: '2-4 hours', price: '$2.99' },
	];

	const scheduleSlots = [
		{
			value: 'today',
			day: 'Today',
			date: 'Jan 15',
			slots: [
				{ time: '2:00 - 4:00 PM', available: false },
				{ time: '4:00 - 6:00 PM', available: true },
				{ time: '6:00 - 8:00 PM', available: true },
			],
		},
		{
			value: 'tomorrow',
			day: 'Tomorrow',
			date: 'Jan 16',
			slots: [
				{ time: '8:00 - 10:00 AM', available: true },
				{ time: '10:00 AM - 12:00 PM', available: true },
				{ time: '12:00 - 2:00 PM', available: true },
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<Truck className="size-6" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">Delivery Time</h1>
						<p className="text-muted-foreground">When do you need it?</p>
					</div>
				</div>

				<Tabs defaultValue="asap" className="w-full">
					<TabsList className="grid w-full grid-cols-2 mb-6">
						<TabsTrigger value="asap" className="gap-2">
							<Clock className="size-4" />
							As Soon As Possible
						</TabsTrigger>
						<TabsTrigger value="schedule" className="gap-2">
							<Calendar className="size-4" />
							Schedule for Later
						</TabsTrigger>
					</TabsList>

					<TabsContent value="asap">
						<Alert className="mb-4">
							<AlertCircle className="size-4" />
							<AlertDescription>
								Delivery times are estimates. Actual time may vary based on traffic and demand.
							</AlertDescription>
						</Alert>

						<RadioGroup defaultValue="quick" className="space-y-3">
							{asapOptions.map((option) => (
								<AsapOption key={option.value} {...option} />
							))}
						</RadioGroup>

						<Card className="mt-4 bg-muted/30">
							<CardContent className="p-4">
								<div className="flex items-center gap-2 text-sm">
									<Package className="size-4 text-primary" />
									<span>Your order will be prepared immediately after checkout</span>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="schedule">
						{scheduleSlots.map((schedule) => (
							<ScheduleSlot key={schedule.value} {...schedule} />
						))}

						<Card className="bg-muted/30">
							<CardContent className="p-4">
								<div className="flex items-start gap-2 text-sm">
									<Check className="size-4 text-primary shrink-0 mt-0.5" />
									<span>Scheduled delivery is free for all orders</span>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
