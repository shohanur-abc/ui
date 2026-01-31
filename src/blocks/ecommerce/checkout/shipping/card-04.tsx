import { Calendar, Clock, Truck, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const DateCard = ({
	value,
	day,
	date,
	month,
	available,
	slots,
}: {
	value: string;
	day: string;
	date: string;
	month: string;
	available: boolean;
	slots: number;
}) => (
	<Label
		htmlFor={value}
		className={`
			cursor-pointer flex flex-col items-center p-3 rounded-xl border-2 transition-all min-w-[80px]
			${available ? 'hover:border-primary/50' : 'opacity-50 cursor-not-allowed'}
			has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground
		`}
	>
		<RadioGroupItem value={value} id={value} className="sr-only" disabled={!available} />
		<span className="text-xs uppercase tracking-wider text-muted-foreground has-[:checked]:text-primary-foreground/80">
			{day}
		</span>
		<span className="text-2xl font-bold">{date}</span>
		<span className="text-xs text-muted-foreground has-[:checked]:text-primary-foreground/80">{month}</span>
		{available && (
			<span className="text-[10px] mt-1 text-muted-foreground has-[:checked]:text-primary-foreground/80">
				{slots} slots
			</span>
		)}
	</Label>
);

const TimeSlotCard = ({
	value,
	time,
	period,
	available,
}: {
	value: string;
	time: string;
	period: string;
	available: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			cursor-pointer flex items-center justify-center gap-2 p-3 rounded-lg border transition-all
			${available ? 'hover:border-primary/50 hover:bg-accent/50' : 'opacity-50 cursor-not-allowed'}
			has-[:checked]:border-primary has-[:checked]:bg-primary/10
		`}
	>
		<RadioGroupItem value={value} id={value} className="sr-only" disabled={!available} />
		<Clock className="size-4 text-muted-foreground has-[:checked]:text-primary" />
		<span className="font-medium">{time}</span>
		<span className="text-sm text-muted-foreground">{period}</span>
	</Label>
);

const SectionHeader = ({
	icon: Icon,
	title,
	action,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	action?: React.ReactNode;
}) => (
	<div className="flex items-center justify-between mb-4">
		<div className="flex items-center gap-2">
			<Icon className="size-5 text-primary" />
			<h3 className="font-semibold">{title}</h3>
		</div>
		{action}
	</div>
);

export default function Main() {
	const dates = [
		{ value: 'mon', day: 'Mon', date: '15', month: 'Jan', available: true, slots: 8 },
		{ value: 'tue', day: 'Tue', date: '16', month: 'Jan', available: true, slots: 12 },
		{ value: 'wed', day: 'Wed', date: '17', month: 'Jan', available: true, slots: 5 },
		{ value: 'thu', day: 'Thu', date: '18', month: 'Jan', available: false, slots: 0 },
		{ value: 'fri', day: 'Fri', date: '19', month: 'Jan', available: true, slots: 15 },
		{ value: 'sat', day: 'Sat', date: '20', month: 'Jan', available: true, slots: 10 },
		{ value: 'sun', day: 'Sun', date: '21', month: 'Jan', available: true, slots: 6 },
	];

	const timeSlots = [
		{ value: 'morning-1', time: '8:00 - 10:00', period: 'AM', available: true },
		{ value: 'morning-2', time: '10:00 - 12:00', period: 'AM', available: true },
		{ value: 'afternoon-1', time: '12:00 - 2:00', period: 'PM', available: false },
		{ value: 'afternoon-2', time: '2:00 - 4:00', period: 'PM', available: true },
		{ value: 'evening-1', time: '4:00 - 6:00', period: 'PM', available: true },
		{ value: 'evening-2', time: '6:00 - 8:00', period: 'PM', available: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
						<Truck className="size-4" />
						<span className="text-sm font-medium">Scheduled Delivery</span>
					</div>
					<h1 className="text-3xl font-bold tracking-tight mb-2">Choose Delivery Time</h1>
					<p className="text-muted-foreground">Select your preferred delivery date and time slot</p>
				</div>

				<Card className="mb-6">
					<CardHeader>
						<SectionHeader
							icon={Calendar}
							title="Select Date"
							action={
								<div className="flex gap-1">
									<Button variant="ghost" size="icon" className="size-8">
										<ChevronLeft className="size-4" />
									</Button>
									<Button variant="ghost" size="icon" className="size-8">
										<ChevronRight className="size-4" />
									</Button>
								</div>
							}
						/>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="tue" className="flex gap-2 overflow-x-auto pb-2">
							{dates.map((date) => (
								<DateCard key={date.value} {...date} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<SectionHeader icon={Clock} title="Select Time Slot" />
						<Badge variant="outline" className="w-fit">
							Tuesday, January 16
						</Badge>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="morning-2" className="grid @sm:grid-cols-2 @md:grid-cols-3 gap-3">
							{timeSlots.map((slot) => (
								<TimeSlotCard key={slot.value} {...slot} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Confirm Schedule</Button>
				</div>
			</div>
		</section>
	);
}
