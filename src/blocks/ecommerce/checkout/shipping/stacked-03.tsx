import {
	MapPin,
	Truck,
	Calendar,
	Clock,
	Check,
	Edit2,
	Plus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const SectionTitle = ({
	icon: Icon,
	title,
	action,
	onAction,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	action?: string;
	onAction?: () => void;
}) => (
	<div className="flex items-center justify-between mb-4">
		<h2 className="text-lg font-semibold flex items-center gap-2">
			<Icon className="size-5 text-primary" />
			{title}
		</h2>
		{action && (
			<Button variant="ghost" size="sm" onClick={onAction}>
				{action}
			</Button>
		)}
	</div>
);

const AddressCard = ({
	value,
	type,
	name,
	address,
	isDefault,
}: {
	value: string;
	type: string;
	name: string;
	address: string;
	isDefault?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex-1">
			<div className="flex items-center gap-2 mb-1">
				<span className="font-medium">{type}</span>
				{isDefault && (
					<Badge variant="secondary" className="text-xs">
						Default
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{name}</p>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
		<Button variant="ghost" size="icon" className="shrink-0">
			<Edit2 className="size-4" />
		</Button>
	</Label>
);

const SpeedOption = ({
	value,
	name,
	time,
	price,
	recommended,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	recommended?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			relative flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all
			hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
			${recommended ? 'ring-2 ring-primary/20' : ''}
		`}
	>
		{recommended && (
			<Badge className="absolute -top-2.5 left-4">Recommended</Badge>
		)}
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<div>
				<span className="font-medium">{name}</span>
				<div className="flex items-center gap-1 text-sm text-muted-foreground">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
			</div>
		</div>
		<span className="text-lg font-bold text-primary">{price}</span>
	</Label>
);

const DateSlot = ({
	value,
	day,
	date,
	month,
	available,
}: {
	value: string;
	day: string;
	date: string;
	month: string;
	available: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			flex flex-col items-center justify-center p-3 min-w-[70px] rounded-xl border-2 cursor-pointer transition-all
			${available ? 'hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground' : 'opacity-50 cursor-not-allowed'}
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
		<span className="text-xs text-muted-foreground has-[:checked]:text-primary-foreground/70">
			{month}
		</span>
	</Label>
);

export default function Main() {
	const addresses = [
		{
			value: 'home',
			type: 'Home',
			name: 'John Doe',
			address: '123 Main St, Apt 4B, New York, NY 10001',
			isDefault: true,
		},
		{
			value: 'work',
			type: 'Work',
			name: 'John Doe',
			address: '456 Business Ave, Floor 12, New York, NY 10002',
		},
	];

	const speedOptions = [
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
		{
			value: 'express',
			name: 'Express',
			time: '2-3 days',
			price: '$12.99',
			recommended: true,
		},
		{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$24.99' },
	];

	const dateSlots = [
		{ value: 'jan-15', day: 'Mon', date: '15', month: 'Jan', available: true },
		{ value: 'jan-16', day: 'Tue', date: '16', month: 'Jan', available: true },
		{ value: 'jan-17', day: 'Wed', date: '17', month: 'Jan', available: true },
		{ value: 'jan-18', day: 'Thu', date: '18', month: 'Jan', available: false },
		{ value: 'jan-19', day: 'Fri', date: '19', month: 'Jan', available: true },
		{ value: 'jan-20', day: 'Sat', date: '20', month: 'Jan', available: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-8">Delivery Options</h1>

				{/* Shipping Address */}
				<div className="mb-8">
					<SectionTitle icon={MapPin} title="Ship To" action="Add New" />
					<RadioGroup defaultValue="home" className="space-y-3">
						{addresses.map((addr) => (
							<AddressCard key={addr.value} {...addr} />
						))}
					</RadioGroup>
				</div>

				<Separator className="my-6" />

				{/* Shipping Speed */}
				<div className="mb-8">
					<SectionTitle icon={Truck} title="Delivery Speed" />
					<RadioGroup defaultValue="express" className="space-y-3">
						{speedOptions.map((option) => (
							<SpeedOption key={option.value} {...option} />
						))}
					</RadioGroup>
				</div>

				<Separator className="my-6" />

				{/* Delivery Date */}
				<div className="mb-8">
					<SectionTitle icon={Calendar} title="Preferred Delivery Date" />
					<RadioGroup
						defaultValue="jan-16"
						className="flex gap-2 overflow-x-auto pb-2"
					>
						{dateSlots.map((slot) => (
							<DateSlot key={slot.value} {...slot} />
						))}
					</RadioGroup>
				</div>

				<Button className="w-full h-12 text-base">Continue to Payment</Button>
			</div>
		</section>
	);
}
