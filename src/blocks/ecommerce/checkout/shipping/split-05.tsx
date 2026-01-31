import { Store, Truck as TruckIcon, Calendar, MapPin, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const DeliveryTab = ({
	value,
	icon: Icon,
	label,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}) => (
	<TabsTrigger value={value} className="flex-1 gap-2 py-3">
		<Icon className="size-4" />
		{label}
	</TabsTrigger>
);

const StoreLocation = ({
	value,
	name,
	address,
	distance,
	hours,
}: {
	value: string;
	name: string;
	address: string;
	distance: string;
	hours: string;
}) => (
	<Label
		htmlFor={value}
		className="flex gap-4 p-4 rounded-xl border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex-1 space-y-2">
			<div className="flex items-start justify-between">
				<span className="font-semibold">{name}</span>
				<span className="text-sm text-muted-foreground">{distance}</span>
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<MapPin className="size-3.5" />
				<span>{address}</span>
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Clock className="size-3.5" />
				<span>{hours}</span>
			</div>
		</div>
	</Label>
);

const FormField = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

const DateTimeSelector = ({
	dateLabel,
	timeLabel,
	dates,
	times,
}: {
	dateLabel: string;
	timeLabel: string;
	dates: string[];
	times: string[];
}) => (
	<div className="space-y-4">
		<div>
			<Label className="mb-3 block">{dateLabel}</Label>
			<div className="flex gap-2 overflow-x-auto pb-2">
				{dates.map((date, i) => (
					<Button key={i} variant={i === 0 ? 'default' : 'outline'} className="shrink-0">
						{date}
					</Button>
				))}
			</div>
		</div>
		<div>
			<Label className="mb-3 block">{timeLabel}</Label>
			<div className="grid grid-cols-3 @sm:grid-cols-4 gap-2">
				{times.map((time, i) => (
					<Button key={i} variant={i === 0 ? 'default' : 'outline'} size="sm">
						{time}
					</Button>
				))}
			</div>
		</div>
	</div>
);

export default function Main() {
	const stores = [
		{ value: 'downtown', name: 'Downtown Store', address: '123 Main St, New York', distance: '0.5 mi', hours: 'Open until 9 PM' },
		{ value: 'midtown', name: 'Midtown Location', address: '456 5th Ave, New York', distance: '1.2 mi', hours: 'Open until 8 PM' },
		{ value: 'brooklyn', name: 'Brooklyn Store', address: '789 Atlantic Ave, Brooklyn', distance: '3.4 mi', hours: 'Open until 7 PM' },
	];

	const pickupDates = ['Today', 'Tomorrow', 'Wed 15', 'Thu 16', 'Fri 17'];
	const pickupTimes = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-3xl font-bold text-center mb-2">Choose Delivery Method</h1>
					<p className="text-muted-foreground text-center mb-10">Select how you'd like to receive your order</p>

					<Tabs defaultValue="delivery" className="space-y-8">
						<TabsList className="grid grid-cols-2 h-auto p-1">
							<DeliveryTab value="delivery" icon={TruckIcon} label="Home Delivery" />
							<DeliveryTab value="pickup" icon={Store} label="Store Pickup" />
						</TabsList>

						<div className="grid @lg:grid-cols-2 gap-8">
							<TabsContent value="delivery" className="mt-0 space-y-6">
								<div className="p-6 rounded-2xl border bg-card space-y-5">
									<h3 className="font-semibold text-lg">Delivery Address</h3>
									<div className="grid @sm:grid-cols-2 gap-4">
										<FormField label="First Name" placeholder="John" />
										<FormField label="Last Name" placeholder="Doe" />
									</div>
									<FormField label="Street Address" placeholder="123 Main Street" />
									<FormField label="Apt / Suite" placeholder="Apartment 4B" />
									<div className="grid @sm:grid-cols-3 gap-4">
										<FormField label="City" placeholder="New York" />
										<FormField label="State" placeholder="NY" />
										<FormField label="ZIP" placeholder="10001" />
									</div>
									<FormField label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
								</div>
							</TabsContent>

							<TabsContent value="pickup" className="mt-0 space-y-6">
								<div className="p-6 rounded-2xl border bg-card">
									<h3 className="font-semibold text-lg mb-4">Select Store</h3>
									<RadioGroup defaultValue="downtown" className="space-y-3">
										{stores.map((store) => (
											<StoreLocation key={store.value} {...store} />
										))}
									</RadioGroup>
								</div>
							</TabsContent>

							<div className="p-6 rounded-2xl border bg-muted/30">
								<div className="flex items-center gap-3 mb-6">
									<Calendar className="size-5 text-primary" />
									<h3 className="font-semibold text-lg">Schedule Pickup</h3>
								</div>
								<DateTimeSelector
									dateLabel="Select Date"
									timeLabel="Select Time"
									dates={pickupDates}
									times={pickupTimes}
								/>
							</div>
						</div>

						<div className="flex gap-3">
							<Button variant="outline" className="flex-1">Back to Cart</Button>
							<Button className="flex-1">Continue to Payment</Button>
						</div>
					</Tabs>
				</div>
			</div>
		</section>
	);
}
