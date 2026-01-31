import { Truck, Calendar, Clock, MapPin, Package, Check, ChevronRight, Edit2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SummaryRow = ({
	icon: Icon,
	label,
	value,
	action,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	action?: string;
}) => (
	<div className="flex items-center gap-3 py-2">
		<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
			<Icon className="size-4 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="font-medium">{value}</p>
		</div>
		{action && (
			<Button variant="ghost" size="sm" className="gap-1">
				<Edit2 className="size-3.5" />
				{action}
			</Button>
		)}
	</div>
);

const TimeSlot = ({
	value,
	time,
	available,
}: {
	value: string;
	time: string;
	available: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all
			${available ? 'hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground' : 'opacity-50 cursor-not-allowed'}
		`}
	>
		<RadioGroupItem value={value} id={value} className="sr-only" disabled={!available} />
		<span className="font-medium">{time}</span>
	</Label>
);

export default function Main() {
	const dates = [
		{ value: 'd1', day: 'Mon', date: '15', selected: false },
		{ value: 'd2', day: 'Tue', date: '16', selected: true },
		{ value: 'd3', day: 'Wed', date: '17', selected: false },
		{ value: 'd4', day: 'Thu', date: '18', selected: false },
		{ value: 'd5', day: 'Fri', date: '19', selected: false },
	];

	const timeSlots = [
		{ value: 't1', time: '8AM - 12PM', available: true },
		{ value: 't2', time: '12PM - 4PM', available: true },
		{ value: 't3', time: '4PM - 8PM', available: false },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Schedule Delivery</h1>
					<p className="text-muted-foreground">Choose when and how you'd like to receive your order</p>
				</div>

				<Card className="mb-6">
					<CardContent className="p-4">
						<SummaryRow icon={MapPin} label="Delivering to" value="123 Main Street, Apt 4B, New York, NY 10001" action="Change" />
					</CardContent>
				</Card>

				<Accordion type="single" defaultValue="date" className="space-y-4">
					<AccordionItem value="date" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<Calendar className="size-5 text-primary" />
								<div className="text-left">
									<span className="font-semibold">Delivery Date</span>
									<p className="text-sm text-muted-foreground">Tuesday, January 16</p>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<RadioGroup defaultValue="d2" className="flex gap-2">
								{dates.map((date) => (
									<Label
										key={date.value}
										htmlFor={date.value}
										className="flex-1 flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
									>
										<RadioGroupItem value={date.value} id={date.value} className="sr-only" />
										<span className="text-xs uppercase opacity-70">{date.day}</span>
										<span className="text-2xl font-bold">{date.date}</span>
									</Label>
								))}
							</RadioGroup>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="time" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<Clock className="size-5 text-primary" />
								<div className="text-left">
									<span className="font-semibold">Time Window</span>
									<p className="text-sm text-muted-foreground">Select a time slot</p>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<RadioGroup defaultValue="t1" className="grid grid-cols-3 gap-2">
								{timeSlots.map((slot) => (
									<TimeSlot key={slot.value} {...slot} />
								))}
							</RadioGroup>
							<p className="text-xs text-muted-foreground mt-3">
								* Evening slots may be unavailable for some areas
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="speed" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<Truck className="size-5 text-primary" />
								<div className="text-left">
									<span className="font-semibold">Shipping Speed</span>
									<p className="text-sm text-muted-foreground">Express - $12.99</p>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<RadioGroup defaultValue="express" className="space-y-2">
								{[
									{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
									{ value: 'express', name: 'Express', time: '2-3 days', price: '$12.99' },
									{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$24.99' },
								].map((opt) => (
									<Label
										key={opt.value}
										htmlFor={`speed-${opt.value}`}
										className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
									>
										<div className="flex items-center gap-3">
											<RadioGroupItem value={opt.value} id={`speed-${opt.value}`} />
											<span className="font-medium">{opt.name}</span>
											<span className="text-sm text-muted-foreground">{opt.time}</span>
										</div>
										<span className="font-bold text-primary">{opt.price}</span>
									</Label>
								))}
							</RadioGroup>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Separator className="my-6" />

				<div className="flex items-center justify-between mb-6">
					<div>
						<p className="text-sm text-muted-foreground">Scheduled Delivery</p>
						<p className="font-semibold">Tue, Jan 16 • 8AM - 12PM</p>
					</div>
					<div className="text-right">
						<p className="text-sm text-muted-foreground">Shipping Cost</p>
						<p className="text-xl font-bold text-primary">$12.99</p>
					</div>
				</div>

				<Button className="w-full h-12 text-base">
					Continue to Payment
					<ChevronRight className="size-5 ml-2" />
				</Button>
			</div>
		</section>
	);
}
