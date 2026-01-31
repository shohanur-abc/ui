import { Calendar, Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const DateRadio = ({
	value,
	day,
	date,
	month,
	price,
	available,
	fastest,
}: {
	value: string;
	day: string;
	date: string;
	month: string;
	price: string;
	available: boolean;
	fastest?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			relative flex flex-col items-center p-3 min-w-[80px] rounded-xl border-2 cursor-pointer transition-all
			${available ? 'hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground' : 'opacity-50 cursor-not-allowed'}
		`}
	>
		{fastest && (
			<Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs">Fastest</Badge>
		)}
		<RadioGroupItem value={value} id={value} className="sr-only" disabled={!available} />
		<span className="text-xs uppercase text-muted-foreground has-[:checked]:text-primary-foreground/70">{day}</span>
		<span className="text-2xl font-bold">{date}</span>
		<span className="text-xs text-muted-foreground has-[:checked]:text-primary-foreground/70">{month}</span>
		<span className="text-xs font-medium mt-1 text-primary has-[:checked]:text-primary-foreground">{price}</span>
	</Label>
);

const TimeRadio = ({
	value,
	time,
	slots,
	available,
}: {
	value: string;
	time: string;
	slots: number;
	available: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all
			${available ? 'hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5' : 'opacity-50 cursor-not-allowed'}
		`}
	>
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} disabled={!available} />
			<span className="font-medium">{time}</span>
		</div>
		{available ? (
			<Badge variant="secondary">{slots} slots</Badge>
		) : (
			<Badge variant="outline">Full</Badge>
		)}
	</Label>
);

export default function Main() {
	const dates = [
		{ value: 'jan-15', day: 'Mon', date: '15', month: 'Jan', price: '$9.99', available: true, fastest: true },
		{ value: 'jan-16', day: 'Tue', date: '16', month: 'Jan', price: '$7.99', available: true },
		{ value: 'jan-17', day: 'Wed', date: '17', month: 'Jan', price: '$5.99', available: true },
		{ value: 'jan-18', day: 'Thu', date: '18', month: 'Jan', price: '$5.99', available: false },
		{ value: 'jan-19', day: 'Fri', date: '19', month: 'Jan', price: 'Free', available: true },
		{ value: 'jan-20', day: 'Sat', date: '20', month: 'Jan', price: 'Free', available: true },
	];

	const timeSlots = [
		{ value: 'morning', time: '8:00 AM - 12:00 PM', slots: 5, available: true },
		{ value: 'afternoon', time: '12:00 PM - 4:00 PM', slots: 3, available: true },
		{ value: 'evening', time: '4:00 PM - 8:00 PM', slots: 0, available: false },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Schedule Delivery</h1>
					<p className="text-muted-foreground">Choose a date and time that works for you</p>
				</div>

				<Card className="mb-6">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center gap-2">
								<Calendar className="size-5 text-primary" />
								Select Date
							</CardTitle>
							<div className="flex items-center gap-1">
								<Button variant="ghost" size="icon" className="size-8">
									<ChevronLeft className="size-4" />
								</Button>
								<span className="text-sm font-medium">January 2025</span>
								<Button variant="ghost" size="icon" className="size-8">
									<ChevronRight className="size-4" />
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="jan-16" className="flex gap-2 overflow-x-auto pb-2">
							{dates.map((date) => (
								<DateRadio key={date.value} {...date} />
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
						<RadioGroup defaultValue="morning" className="space-y-2">
							{timeSlots.map((slot) => (
								<TimeRadio key={slot.value} {...slot} />
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
