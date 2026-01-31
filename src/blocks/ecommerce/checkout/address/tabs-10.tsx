'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Clock,
	Calendar,
	Sun,
	Moon,
	ArrowRight,
	Truck,
} from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

const Field = ({ label, placeholder, type = 'text' }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({ label, placeholder, options }: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const TimeSlot = ({
	time,
	available,
	selected,
}: {
	time: string;
	available: boolean;
	selected?: boolean;
}) => (
	<button
		type="button"
		disabled={!available}
		className={`p-3 rounded-lg border text-center transition-colors ${
			selected
				? 'border-primary bg-primary/10 text-primary'
				: available
					? 'border-border hover:bg-muted/50'
					: 'border-border bg-muted/30 text-muted-foreground cursor-not-allowed'
		}`}
	>
		<span className="text-sm font-medium">{time}</span>
		{!available && <span className="block text-xs">Unavailable</span>}
	</button>
);

const StandardTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border">
			<Truck className="size-5 text-primary" />
			<div className="flex-1">
				<span className="font-medium">Standard Delivery</span>
				<p className="text-sm text-muted-foreground">3-5 business days</p>
			</div>
			<Badge variant="secondary">FREE</Badge>
		</div>
		<Separator />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="123 Main Street" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</div>
);

const ScheduledTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="space-y-3">
			<Label className="text-sm flex items-center gap-2">
				<Calendar className="size-4" />
				Select Delivery Date
			</Label>
			<div className="grid grid-cols-3 @sm:grid-cols-5 gap-2">
				{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
					<button
						key={day}
						type="button"
						className={`p-3 rounded-lg border text-center transition-colors ${
							i === 2
								? 'border-primary bg-primary/10'
								: 'border-border hover:bg-muted/50'
						}`}
					>
						<span className="block text-xs text-muted-foreground">{day}</span>
						<span className="text-sm font-medium">{15 + i}</span>
					</button>
				))}
			</div>
		</div>
		<div className="space-y-3">
			<Label className="text-sm flex items-center gap-2">
				<Clock className="size-4" />
				Select Time Slot
			</Label>
			<div className="grid grid-cols-2 @sm:grid-cols-3 gap-2">
				<TimeSlot time="9AM - 12PM" available />
				<TimeSlot time="12PM - 3PM" available selected />
				<TimeSlot time="3PM - 6PM" available />
				<TimeSlot time="6PM - 9PM" available={false} />
			</div>
		</div>
		<Separator />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Full Name" placeholder="John Doe" />
			<Field label="Phone" placeholder="+1 (555) 000-0000" />
		</div>
		<Field label="Street Address" placeholder="123 Main Street" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</div>
);

const ExpressTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-3">
			<label className="p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<input
					type="radio"
					name="express"
					className="sr-only"
					defaultChecked
				/>
				<div className="flex items-center gap-3">
					<Sun className="size-5 text-yellow-500" />
					<div>
						<span className="font-medium">Morning</span>
						<p className="text-xs text-muted-foreground">Before 12PM</p>
					</div>
					<span className="ml-auto font-bold">$14.99</span>
				</div>
			</label>
			<label className="p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<input type="radio" name="express" className="sr-only" />
				<div className="flex items-center gap-3">
					<Moon className="size-5 text-blue-500" />
					<div>
						<span className="font-medium">Evening</span>
						<p className="text-xs text-muted-foreground">Before 8PM</p>
					</div>
					<span className="ml-auto font-bold">$9.99</span>
				</div>
			</label>
		</div>
		<Separator />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Full Name" placeholder="John Doe" />
			<Field label="Phone" placeholder="+1 (555) 000-0000" />
		</div>
		<Field label="Street Address" placeholder="123 Main Street" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="call-delivery" />
			<Label htmlFor="call-delivery" className="text-sm font-normal cursor-pointer">
				Call me before delivery
			</Label>
		</div>
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold mb-2">
						Delivery Options
					</h1>
					<p className="text-muted-foreground">
						Choose when you want your order delivered
					</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Tabs defaultValue="scheduled">
							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="standard" className="gap-2">
									<Truck className="size-4" />
									<span className="hidden @sm:inline">Standard</span>
								</TabsTrigger>
								<TabsTrigger value="scheduled" className="gap-2">
									<Calendar className="size-4" />
									<span className="hidden @sm:inline">Scheduled</span>
								</TabsTrigger>
								<TabsTrigger value="express" className="gap-2">
									<Clock className="size-4" />
									<span className="hidden @sm:inline">Express</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="standard">
								<StandardTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="scheduled">
								<ScheduledTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="express">
								<ExpressTab countries={countries} states={states} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Payment
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
