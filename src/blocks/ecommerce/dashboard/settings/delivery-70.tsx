import {
	AlertCircle,
	ArrowRight,
	Calendar,
	Check,
	Clock,
	Package,
	Plus,
	Settings2,
	Truck,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type DeliverySlot = {
	id: string;
	day: string;
	slots: { time: string; available: boolean }[];
};

type DeliveryOption = {
	id: string;
	name: string;
	description: string;
	leadTime: string;
	enabled: boolean;
};

const DeliverySlotCard = ({ day, slots }: DeliverySlot) => (
	<div className="rounded-lg border p-3">
		<p className="font-medium mb-2">{day}</p>
		<div className="flex flex-wrap gap-2">
			{slots.map((slot) => (
				<Badge
					key={slot.time}
					variant={slot.available ? 'outline' : 'secondary'}
					className={`cursor-pointer ${
						slot.available
							? 'hover:bg-primary/10 hover:border-primary'
							: 'opacity-50'
					}`}
				>
					{slot.time}
				</Badge>
			))}
		</div>
	</div>
);

const DeliveryOptionRow = ({
	name,
	description,
	leadTime,
	enabled,
}: DeliveryOption) => (
	<div className="flex items-center justify-between rounded-lg border p-4">
		<div className="flex items-center gap-4">
			<div
				className={`flex size-10 items-center justify-center rounded-lg ${
					enabled
						? 'bg-primary/10 text-primary'
						: 'bg-muted text-muted-foreground'
				}`}
			>
				<Clock className="size-5" />
			</div>
			<div>
				<div className="flex items-center gap-2">
					<h4 className="font-medium">{name}</h4>
					<Badge variant="outline" className="text-xs">
						{leadTime}
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

export default function Main() {
	const deliverySlots: DeliverySlot[] = [
		{
			id: 'mon',
			day: 'Monday',
			slots: [
				{ time: '9-12 AM', available: true },
				{ time: '12-3 PM', available: true },
				{ time: '3-6 PM', available: true },
				{ time: '6-9 PM', available: false },
			],
		},
		{
			id: 'tue',
			day: 'Tuesday',
			slots: [
				{ time: '9-12 AM', available: true },
				{ time: '12-3 PM', available: true },
				{ time: '3-6 PM', available: true },
				{ time: '6-9 PM', available: true },
			],
		},
		{
			id: 'wed',
			day: 'Wednesday',
			slots: [
				{ time: '9-12 AM', available: true },
				{ time: '12-3 PM', available: false },
				{ time: '3-6 PM', available: true },
				{ time: '6-9 PM', available: true },
			],
		},
	];

	const deliveryOptions: DeliveryOption[] = [
		{ id: '1', name: 'Same-Day Delivery', description: 'Order by 12 PM for delivery today', leadTime: '0 days', enabled: true },
		{ id: '2', name: 'Next-Day Delivery', description: 'Order by 6 PM for delivery tomorrow', leadTime: '1 day', enabled: true },
		{ id: '3', name: 'Scheduled Delivery', description: 'Choose your preferred date and time', leadTime: '2-5 days', enabled: true },
		{ id: '4', name: 'Weekend Delivery', description: 'Saturday and Sunday delivery', leadTime: 'Varies', enabled: false },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Calendar className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Delivery Options</CardTitle>
									<CardDescription>
										Configure available delivery methods
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							{deliveryOptions.map((option) => (
								<DeliveryOptionRow key={option.id} {...option} />
							))}
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Delivery Time Slots</CardTitle>
								<CardDescription>
									Available time windows for delivery
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{deliverySlots.map((slot) => (
									<DeliverySlotCard key={slot.id} {...slot} />
								))}
								<Button variant="outline" className="w-full gap-2">
									<Plus className="size-4" />
									Configure More Days
								</Button>
							</CardContent>
						</Card>

						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle className="text-base">Delivery Settings</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label>Cut-off Time</Label>
										<Select defaultValue="12">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="10">10:00 AM</SelectItem>
												<SelectItem value="12">12:00 PM</SelectItem>
												<SelectItem value="14">2:00 PM</SelectItem>
												<SelectItem value="16">4:00 PM</SelectItem>
											</SelectContent>
										</Select>
										<p className="text-xs text-muted-foreground">
											Orders after this time ship next day
										</p>
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div>
											<Label>Allow Time Selection</Label>
											<p className="text-xs text-muted-foreground">
												Customers choose delivery time
											</p>
										</div>
										<Switch defaultChecked />
									</div>
									<div className="flex items-center justify-between">
										<div>
											<Label>Allow Date Selection</Label>
											<p className="text-xs text-muted-foreground">
												Customers choose delivery date
											</p>
										</div>
										<Switch defaultChecked />
									</div>
								</CardContent>
							</Card>

							<Card className="border-primary/20 bg-primary/5">
								<CardContent className="pt-6 text-center">
									<Truck className="mx-auto size-8 text-primary" />
									<h4 className="mt-2 font-semibold">
										{deliveryOptions.filter((o) => o.enabled).length} Active Options
									</h4>
									<p className="mt-1 text-sm text-muted-foreground">
										Offering flexible delivery to customers
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
