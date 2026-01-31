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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Zap,
	Leaf,
	Timer,
	ArrowRight,
	Package,
	Clock,
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

const AddressFields = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="123 Main Street" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</>
);

const ExpressTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
			<div className="flex items-center gap-3 mb-3">
				<div className="size-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
					<Zap className="size-5 text-yellow-500" />
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-medium">Express Delivery</span>
						<Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/30">
							Fastest
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">
						Guaranteed delivery within 24 hours
					</p>
				</div>
				<span className="font-bold text-lg">$24.99</span>
			</div>
			<div className="flex items-center gap-4 text-xs text-muted-foreground">
				<span className="flex items-center gap-1">
					<Clock className="size-3" />
					Order in 2h 15m
				</span>
				<span className="flex items-center gap-1">
					<Truck className="size-3" />
					Get it tomorrow
				</span>
			</div>
		</div>
		<Separator />
		<AddressFields countries={countries} states={states} />
		<div className="flex items-center justify-between pt-2">
			<div>
				<Label className="text-sm">Priority Handling</Label>
				<p className="text-xs text-muted-foreground">
					Your order gets processed first
				</p>
			</div>
			<Switch />
		</div>
	</div>
);

const EcoFriendlyTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
			<div className="flex items-center gap-3 mb-3">
				<div className="size-10 rounded-lg bg-green-500/20 flex items-center justify-center">
					<Leaf className="size-5 text-green-500" />
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-medium">Eco-Friendly Delivery</span>
						<Badge className="bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30">
							Green
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">
						Carbon-neutral shipping with recyclable packaging
					</p>
				</div>
				<span className="font-bold text-lg">FREE</span>
			</div>
			<div className="flex items-center gap-4 text-xs text-muted-foreground">
				<span className="flex items-center gap-1">
					<Package className="size-3" />
					5-7 business days
				</span>
				<span className="flex items-center gap-1">
					<Leaf className="size-3" />
					-2.5kg CO₂ saved
				</span>
			</div>
		</div>
		<Separator />
		<AddressFields countries={countries} states={states} />
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="plant-tree" defaultChecked />
			<Label htmlFor="plant-tree" className="text-sm font-normal cursor-pointer">
				Plant a tree with your order (+$1)
			</Label>
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
		<div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
			<div className="flex items-center gap-3 mb-3">
				<div className="size-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
					<Timer className="size-5 text-blue-500" />
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-medium">Scheduled Delivery</span>
						<Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30">
							Flexible
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">
						Choose your preferred date and time
					</p>
				</div>
				<span className="font-bold text-lg">$4.99</span>
			</div>
		</div>
		<div className="grid @sm:grid-cols-2 gap-4">
			<div className="space-y-2">
				<Label className="text-sm">Preferred Date</Label>
				<Input type="date" />
			</div>
			<SelectField
				label="Time Window"
				placeholder="Select time"
				options={[
					{ value: 'morning', label: '8AM - 12PM' },
					{ value: 'afternoon', label: '12PM - 5PM' },
					{ value: 'evening', label: '5PM - 9PM' },
				]}
			/>
		</div>
		<Separator />
		<AddressFields countries={countries} states={states} />
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="sms-notify" defaultChecked />
			<Label htmlFor="sms-notify" className="text-sm font-normal cursor-pointer">
				Send SMS notification before delivery
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
						<CardTitle className="text-2xl">Delivery Preference</CardTitle>
						<p className="text-sm text-muted-foreground">
							Select your preferred shipping speed
						</p>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="eco">
							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="express" className="gap-2">
									<Zap className="size-4" />
									<span className="hidden @sm:inline">Express</span>
								</TabsTrigger>
								<TabsTrigger value="eco" className="gap-2">
									<Leaf className="size-4" />
									<span className="hidden @sm:inline">Eco</span>
								</TabsTrigger>
								<TabsTrigger value="scheduled" className="gap-2">
									<Timer className="size-4" />
									<span className="hidden @sm:inline">Schedule</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="express">
								<ExpressTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="eco">
								<EcoFriendlyTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="scheduled">
								<ScheduledTab countries={countries} states={states} />
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
