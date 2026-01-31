import { Calendar, Clock, Check } from 'lucide-react';

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
	price,
	slots,
	fastest,
}: {
	value: string;
	day: string;
	date: string;
	month: string;
	price: string;
	slots: number;
	fastest?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className={`
				relative h-full transition-all hover:shadow-md hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground
				${fastest ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{fastest && <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">Fastest</Badge>}
			<CardContent className="p-4 text-center">
				<RadioGroupItem value={value} id={value} className="sr-only" />
				<span className="text-xs uppercase tracking-wider opacity-70">{day}</span>
				<div className="text-3xl font-bold my-1">{date}</div>
				<span className="text-sm opacity-70">{month}</span>
				<div className="mt-3 pt-3 border-t border-current/20">
					<span className="font-bold block">{price}</span>
					<span className="text-xs opacity-70">{slots} slots left</span>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const TimeSlotGrid = ({
	slots,
}: {
	slots: { value: string; time: string; available: boolean }[];
}) => (
	<RadioGroup className="grid grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 gap-3">
		{slots.map((slot) => (
			<Label
				key={slot.value}
				htmlFor={slot.value}
				className={`
					flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-all
					${slot.available ? 'hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground' : 'opacity-50 cursor-not-allowed'}
				`}
			>
				<RadioGroupItem value={slot.value} id={slot.value} className="sr-only" disabled={!slot.available} />
				<Clock className="size-4" />
				<span className="font-medium">{slot.time}</span>
			</Label>
		))}
	</RadioGroup>
);

export default function Main() {
	const dates = [
		{ value: 'd1', day: 'Mon', date: '15', month: 'Jan', price: '$12.99', slots: 3, fastest: true },
		{ value: 'd2', day: 'Tue', date: '16', month: 'Jan', price: '$9.99', slots: 5 },
		{ value: 'd3', day: 'Wed', date: '17', month: 'Jan', price: '$7.99', slots: 8 },
		{ value: 'd4', day: 'Thu', date: '18', month: 'Jan', price: '$7.99', slots: 6 },
		{ value: 'd5', day: 'Fri', date: '19', month: 'Jan', price: '$5.99', slots: 4 },
		{ value: 'd6', day: 'Sat', date: '20', month: 'Jan', price: 'Free', slots: 2 },
		{ value: 'd7', day: 'Sun', date: '21', month: 'Jan', price: 'Free', slots: 3 },
	];

	const timeSlots = [
		{ value: 't1', time: '8-10 AM', available: true },
		{ value: 't2', time: '10-12 PM', available: true },
		{ value: 't3', time: '12-2 PM', available: false },
		{ value: 't4', time: '2-4 PM', available: true },
		{ value: 't5', time: '4-6 PM', available: true },
		{ value: 't6', time: '6-8 PM', available: false },
		{ value: 't7', time: '8-10 PM', available: true },
		{ value: 't8', time: '10-12 AM', available: false },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Schedule Delivery</h1>
					<p className="text-muted-foreground">Pick a date and time that works for you</p>
				</div>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="size-5 text-primary" />
							Select Date
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="d2" className="grid grid-cols-4 @sm:grid-cols-7 gap-3">
							{dates.map((date) => (
								<DateCard key={date.value} {...date} />
							))}
						</RadioGroup>
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
						<TimeSlotGrid slots={timeSlots} />
					</CardContent>
				</Card>

				<div className="flex gap-3 pt-8 justify-center">
					<Button variant="outline">Back</Button>
					<Button>Confirm Schedule</Button>
				</div>
			</div>
		</section>
	);
}
