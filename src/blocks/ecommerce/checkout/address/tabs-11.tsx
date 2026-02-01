'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import {
	Home,
	Briefcase,
	Store,
	MapPin,
	Clock,
	ArrowRight,
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

interface PickupLocationProps {
	value: string;
	name: string;
	address: string;
	hours: string;
	distance: string;
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

const PickupLocation = ({
	value,
	name,
	address,
	hours,
	distance,
}: PickupLocationProps) => (
	<label className="flex items-start gap-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
		<RadioGroupItem value={value} className="mt-1" />
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
			<Store className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<div className="flex items-center justify-between mb-1">
				<span className="font-medium">{name}</span>
				<Badge variant="secondary">{distance}</Badge>
			</div>
			<p className="text-sm text-muted-foreground">{address}</p>
			<p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
				<Clock className="size-3" />
				{hours}
			</p>
		</div>
	</label>
);

const HomeDeliveryTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<RadioGroup defaultValue="home" className="space-y-3 mb-4">
			<label className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary">
				<RadioGroupItem value="home" />
				<Home className="size-5 text-muted-foreground" />
				<div className="flex-1">
					<span className="font-medium">Home</span>
					<p className="text-sm text-muted-foreground">
						123 Main Street, SF, CA 94102
					</p>
				</div>
				<Badge variant="secondary">Default</Badge>
			</label>
			<label className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary">
				<RadioGroupItem value="work" />
				<Briefcase className="size-5 text-muted-foreground" />
				<div className="flex-1">
					<span className="font-medium">Work</span>
					<p className="text-sm text-muted-foreground">
						456 Corporate Blvd, SF, CA 94105
					</p>
				</div>
			</label>
		</RadioGroup>
		<Button variant="outline" className="w-full gap-2">
			<MapPin className="size-4" />
			Add New Address
		</Button>
	</div>
);

const PickupTab = () => (
	<div className="space-y-4">
		<div className="flex gap-2 mb-4">
			<Input placeholder="Enter ZIP or city" className="flex-1" />
			<Button>Search</Button>
		</div>
		<RadioGroup defaultValue="downtown" className="space-y-3">
			<PickupLocation
				value="downtown"
				name="Downtown Store"
				address="100 Market Street, SF"
				hours="9AM - 9PM"
				distance="0.5 mi"
			/>
			<PickupLocation
				value="mission"
				name="Mission District"
				address="2000 Mission St, SF"
				hours="10AM - 8PM"
				distance="1.2 mi"
			/>
			<PickupLocation
				value="soma"
				name="SOMA Location"
				address="500 Howard St, SF"
				hours="8AM - 10PM"
				distance="0.8 mi"
			/>
		</RadioGroup>
	</div>
);

const LockerTab = () => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
			<h3 className="font-medium mb-2 flex items-center gap-2">
				<Store className="size-4 text-primary" />
				Package Locker
			</h3>
			<p className="text-sm text-muted-foreground">
				Get a code to pick up your package 24/7 from a secure locker
			</p>
		</div>
		<div className="flex gap-2 mb-4">
			<Input placeholder="Enter ZIP or city" className="flex-1" />
			<Button>Search</Button>
		</div>
		<RadioGroup defaultValue="walgreens" className="space-y-3">
			<PickupLocation
				value="walgreens"
				name="Walgreens Locker"
				address="789 Van Ness Ave, SF"
				hours="24/7 Access"
				distance="0.3 mi"
			/>
			<PickupLocation
				value="safeway"
				name="Safeway Locker"
				address="1234 Polk St, SF"
				hours="24/7 Access"
				distance="0.6 mi"
			/>
		</RadioGroup>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="locker-notify" defaultChecked />
			<Label
				htmlFor="locker-notify"
				className="text-sm font-normal cursor-pointer"
			>
				Send me pickup code via SMS
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
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-3">
							<MapPin className="size-5 text-primary" />
							Delivery Method
						</CardTitle>
						<p className="text-sm text-muted-foreground">
							Choose how you want to receive your order
						</p>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="home">
							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="home" className="gap-2">
									<Home className="size-4" />
									<span className="hidden @sm:inline">Home</span>
								</TabsTrigger>
								<TabsTrigger value="pickup" className="gap-2">
									<Store className="size-4" />
									<span className="hidden @sm:inline">Pickup</span>
								</TabsTrigger>
								<TabsTrigger value="locker" className="gap-2">
									<Store className="size-4" />
									<span className="hidden @sm:inline">Locker</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="home">
								<HomeDeliveryTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="pickup">
								<PickupTab />
							</TabsContent>

							<TabsContent value="locker">
								<LockerTab />
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
