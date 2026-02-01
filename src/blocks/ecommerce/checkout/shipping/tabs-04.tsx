import {
	Calendar,
	Clock,
	Truck,
	ChevronLeft,
	ChevronRight,
	Check,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const DateCard = ({
	value,
	day,
	date,
	available,
	slots,
}: {
	value: string;
	day: string;
	date: string;
	available: boolean;
	slots?: number;
}) => (
	<Label
		htmlFor={value}
		className={`
			flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer min-w-[70px] transition-all
			${available ? 'hover:border-primary/50' : 'opacity-50 cursor-not-allowed'}
			has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground
		`}
	>
		<RadioGroupItem
			value={value}
			id={value}
			className="sr-only"
			disabled={!available}
		/>
		<span className="text-xs uppercase text-muted-foreground has-[:checked]:text-primary-foreground/70">
			{day}
		</span>
		<span className="text-xl font-bold">{date}</span>
		{slots && (
			<span className="text-xs text-muted-foreground has-[:checked]:text-primary-foreground/70">
				{slots} left
			</span>
		)}
	</Label>
);

const TimeSlot = ({
	value,
	time,
	available,
	popular,
}: {
	value: string;
	time: string;
	available: boolean;
	popular?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-all
			${available ? 'hover:border-primary/50 hover:bg-accent/50' : 'opacity-50 cursor-not-allowed'}
			has-[:checked]:border-primary has-[:checked]:bg-primary/10
		`}
	>
		<RadioGroupItem
			value={value}
			id={value}
			className="sr-only"
			disabled={!available}
		/>
		<Clock className="size-4 text-muted-foreground" />
		<span className="font-medium">{time}</span>
		{popular && <Badge className="text-xs">Popular</Badge>}
	</Label>
);

export default function Main() {
	const thisWeekDates = [
		{ value: 'mon', day: 'Mon', date: '15', available: true, slots: 8 },
		{ value: 'tue', day: 'Tue', date: '16', available: true, slots: 12 },
		{ value: 'wed', day: 'Wed', date: '17', available: true, slots: 3 },
		{ value: 'thu', day: 'Thu', date: '18', available: false },
		{ value: 'fri', day: 'Fri', date: '19', available: true, slots: 15 },
		{ value: 'sat', day: 'Sat', date: '20', available: true, slots: 10 },
		{ value: 'sun', day: 'Sun', date: '21', available: true, slots: 6 },
	];

	const nextWeekDates = [
		{ value: 'next-mon', day: 'Mon', date: '22', available: true, slots: 20 },
		{ value: 'next-tue', day: 'Tue', date: '23', available: true, slots: 20 },
		{ value: 'next-wed', day: 'Wed', date: '24', available: true, slots: 18 },
		{ value: 'next-thu', day: 'Thu', date: '25', available: true, slots: 16 },
		{ value: 'next-fri', day: 'Fri', date: '26', available: true, slots: 20 },
		{ value: 'next-sat', day: 'Sat', date: '27', available: true, slots: 15 },
		{ value: 'next-sun', day: 'Sun', date: '28', available: true, slots: 12 },
	];

	const timeSlots = [
		{ value: 'morning-1', time: '8:00 - 10:00 AM', available: true },
		{
			value: 'morning-2',
			time: '10:00 - 12:00 PM',
			available: true,
			popular: true,
		},
		{ value: 'afternoon-1', time: '12:00 - 2:00 PM', available: false },
		{ value: 'afternoon-2', time: '2:00 - 4:00 PM', available: true },
		{ value: 'evening-1', time: '4:00 - 6:00 PM', available: true },
		{ value: 'evening-2', time: '6:00 - 8:00 PM', available: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
						<Truck className="size-4" />
						Scheduled Delivery
					</div>
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Choose Delivery Time
					</h1>
					<p className="text-muted-foreground">
						Select when you'd like to receive your order
					</p>
				</div>

				<Card className="mb-6">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center gap-2">
								<Calendar className="size-5 text-primary" />
								Select Date
							</CardTitle>
							<Badge variant="outline">January 2025</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="this-week" className="w-full">
							<TabsList className="grid w-full grid-cols-2 mb-4">
								<TabsTrigger value="this-week">This Week</TabsTrigger>
								<TabsTrigger value="next-week">Next Week</TabsTrigger>
							</TabsList>

							<TabsContent value="this-week">
								<RadioGroup
									defaultValue="tue"
									className="flex gap-2 overflow-x-auto pb-2"
								>
									{thisWeekDates.map((date) => (
										<DateCard key={date.value} {...date} />
									))}
								</RadioGroup>
							</TabsContent>

							<TabsContent value="next-week">
								<RadioGroup className="flex gap-2 overflow-x-auto pb-2">
									{nextWeekDates.map((date) => (
										<DateCard key={date.value} {...date} />
									))}
								</RadioGroup>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="size-5 text-primary" />
							Select Time Slot
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup
							defaultValue="morning-2"
							className="grid @sm:grid-cols-2 @md:grid-cols-3 gap-3"
						>
							{timeSlots.map((slot) => (
								<TimeSlot key={slot.value} {...slot} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1">Confirm Delivery Time</Button>
				</div>
			</div>
		</section>
	);
}
