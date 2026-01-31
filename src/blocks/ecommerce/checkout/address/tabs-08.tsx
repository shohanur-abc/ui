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
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
	User,
	MapPin,
	Truck,
	ArrowRight,
	ArrowLeft,
	CheckCircle2,
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

const StepIndicator = ({
	steps,
	currentStep,
}: {
	steps: { id: string; label: string; icon: React.ElementType }[];
	currentStep: string;
}) => {
	const currentIndex = steps.findIndex((s) => s.id === currentStep);
	const progress = ((currentIndex + 1) / steps.length) * 100;

	return (
		<div className="space-y-4 mb-6">
			<div className="flex justify-between">
				{steps.map((step, index) => {
					const Icon = step.icon;
					const isActive = step.id === currentStep;
					const isComplete = index < currentIndex;

					return (
						<div key={step.id} className="flex items-center gap-2">
							<div
								className={`size-8 rounded-full flex items-center justify-center ${
									isActive
										? 'bg-primary text-primary-foreground'
										: isComplete
											? 'bg-green-500 text-white'
											: 'bg-muted text-muted-foreground'
								}`}
							>
								{isComplete ? (
									<CheckCircle2 className="size-4" />
								) : (
									<Icon className="size-4" />
								)}
							</div>
							<span
								className={`text-sm hidden @md:inline ${
									isActive ? 'font-medium' : 'text-muted-foreground'
								}`}
							>
								{step.label}
							</span>
						</div>
					);
				})}
			</div>
			<Progress value={progress} className="h-1" />
		</div>
	);
};

const ContactTab = () => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="newsletter" />
			<Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
				Subscribe to newsletter for exclusive offers
			</Label>
		</div>
	</div>
);

const AddressTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="billing-same" defaultChecked />
			<Label htmlFor="billing-same" className="text-sm font-normal cursor-pointer">
				Billing address same as shipping
			</Label>
		</div>
	</div>
);

const DeliveryTab = () => (
	<div className="space-y-6">
		<div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
			<div className="flex items-center gap-3 mb-3">
				<Truck className="size-5 text-primary" />
				<span className="font-medium">Delivery Options</span>
			</div>
			<div className="space-y-3">
				<label className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border cursor-pointer has-[:checked]:border-primary">
					<input
						type="radio"
						name="delivery"
						defaultChecked
						className="accent-primary"
					/>
					<div className="flex-1">
						<div className="flex justify-between">
							<span className="font-medium">Standard Delivery</span>
							<Badge variant="secondary">FREE</Badge>
						</div>
						<p className="text-sm text-muted-foreground">3-5 business days</p>
					</div>
				</label>
				<label className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border cursor-pointer has-[:checked]:border-primary">
					<input type="radio" name="delivery" className="accent-primary" />
					<div className="flex-1">
						<div className="flex justify-between">
							<span className="font-medium">Express Delivery</span>
							<span className="font-bold">$9.99</span>
						</div>
						<p className="text-sm text-muted-foreground">1-2 business days</p>
					</div>
				</label>
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Delivery Instructions (Optional)</Label>
			<Input placeholder="Leave at the front door, ring doorbell, etc." />
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

	const steps = [
		{ id: 'contact', label: 'Contact', icon: User },
		{ id: 'address', label: 'Address', icon: MapPin },
		{ id: 'delivery', label: 'Delivery', icon: Truck },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold mb-2">Checkout</h1>
					<p className="text-muted-foreground">Complete your shipping details</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Tabs defaultValue="contact">
							<StepIndicator steps={steps} currentStep="address" />

							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="contact" className="gap-2">
									<User className="size-4" />
									<span className="hidden @sm:inline">Contact</span>
								</TabsTrigger>
								<TabsTrigger value="address" className="gap-2">
									<MapPin className="size-4" />
									<span className="hidden @sm:inline">Address</span>
								</TabsTrigger>
								<TabsTrigger value="delivery" className="gap-2">
									<Truck className="size-4" />
									<span className="hidden @sm:inline">Delivery</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="contact">
								<ContactTab />
							</TabsContent>

							<TabsContent value="address">
								<AddressTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="delivery">
								<DeliveryTab />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<div className="flex gap-4 mt-8">
					<Button variant="outline" size="lg" className="gap-2">
						<ArrowLeft className="size-4" />
						Back
					</Button>
					<Button size="lg" className="flex-1 gap-2">
						Continue
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
