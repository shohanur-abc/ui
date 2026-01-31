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
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
	ChevronRight,
	Gift,
	Truck,
	Clock,
	MessageCircle,
	ArrowRight,
} from 'lucide-react';
import { useState } from 'react';

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

interface CollapsibleCardProps {
	icon: React.ElementType;
	title: string;
	subtitle: string;
	badge?: string;
	isOpen: boolean;
	onToggle: () => void;
	children: React.ReactNode;
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

const CollapsibleCard = ({
	icon: Icon,
	title,
	subtitle,
	badge,
	isOpen,
	onToggle,
	children,
}: CollapsibleCardProps) => (
	<Card>
		<Collapsible open={isOpen} onOpenChange={onToggle}>
			<CollapsibleTrigger asChild>
				<CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors rounded-t-xl">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="size-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
								<Icon className="size-6 text-primary" />
							</div>
							<div>
								<div className="flex items-center gap-2">
									<CardTitle className="text-lg">{title}</CardTitle>
									{badge && (
										<Badge variant="secondary" className="text-xs">
											{badge}
										</Badge>
									)}
								</div>
								<p className="text-sm text-muted-foreground">{subtitle}</p>
							</div>
						</div>
						<ChevronRight
							className={`size-5 text-muted-foreground transition-transform ${
								isOpen ? 'rotate-90' : ''
							}`}
						/>
					</div>
				</CardHeader>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<CardContent className="pt-0">{children}</CardContent>
			</CollapsibleContent>
		</Collapsible>
	</Card>
);

const ShippingAddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</div>
);

const ScheduleDeliveryForm = () => {
	const dates = [
		{ value: 'asap', label: 'As Soon As Possible' },
		{ value: 'tomorrow', label: 'Tomorrow' },
		{ value: 'weekend', label: 'This Weekend' },
	];

	const times = [
		{ value: 'morning', label: 'Morning (8AM - 12PM)' },
		{ value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
		{ value: 'evening', label: 'Evening (5PM - 9PM)' },
	];

	return (
		<div className="space-y-4">
			<SelectField
				label="Preferred Date"
				placeholder="Choose delivery date"
				options={dates}
			/>
			<SelectField
				label="Preferred Time"
				placeholder="Choose time window"
				options={times}
			/>
			<div className="flex items-center gap-2">
				<Checkbox id="leave-door" />
				<Label htmlFor="leave-door" className="text-sm font-normal cursor-pointer">
					Leave at door if no one is home
				</Label>
			</div>
		</div>
	);
};

const GiftOptionsForm = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2">
			<Checkbox id="gift-wrap" />
			<Label htmlFor="gift-wrap" className="text-sm font-normal cursor-pointer">
				Add gift wrapping (+$5.99)
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="gift-receipt" />
			<Label htmlFor="gift-receipt" className="text-sm font-normal cursor-pointer">
				Include gift receipt (prices hidden)
			</Label>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Gift Message</Label>
			<Textarea placeholder="Add a personal message..." className="min-h-[80px]" />
		</div>
	</div>
);

const DeliveryNotesForm = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Delivery Instructions</Label>
			<Textarea
				placeholder="Gate code, building access, special instructions..."
				className="min-h-[80px]"
			/>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="signature" />
			<Label htmlFor="signature" className="text-sm font-normal cursor-pointer">
				Require signature upon delivery
			</Label>
		</div>
	</div>
);

export default function Main() {
	const [openSections, setOpenSections] = useState<string[]>(['shipping']);

	const toggleSection = (section: string) => {
		setOpenSections((prev) =>
			prev.includes(section)
				? prev.filter((s) => s !== section)
				: [...prev, section]
		);
	};

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
				<h1 className="text-2xl @md:text-3xl font-bold text-center mb-8">
					Delivery Preferences
				</h1>

				<div className="space-y-4">
					<CollapsibleCard
						icon={Truck}
						title="Shipping Address"
						subtitle="Where should we deliver?"
						isOpen={openSections.includes('shipping')}
						onToggle={() => toggleSection('shipping')}
					>
						<ShippingAddressForm countries={countries} states={states} />
					</CollapsibleCard>

					<CollapsibleCard
						icon={Clock}
						title="Schedule Delivery"
						subtitle="Choose your preferred delivery time"
						badge="Optional"
						isOpen={openSections.includes('schedule')}
						onToggle={() => toggleSection('schedule')}
					>
						<ScheduleDeliveryForm />
					</CollapsibleCard>

					<CollapsibleCard
						icon={Gift}
						title="Gift Options"
						subtitle="Add wrapping and message"
						badge="Optional"
						isOpen={openSections.includes('gift')}
						onToggle={() => toggleSection('gift')}
					>
						<GiftOptionsForm />
					</CollapsibleCard>

					<CollapsibleCard
						icon={MessageCircle}
						title="Delivery Notes"
						subtitle="Special instructions for the driver"
						badge="Optional"
						isOpen={openSections.includes('notes')}
						onToggle={() => toggleSection('notes')}
					>
						<DeliveryNotesForm />
					</CollapsibleCard>
				</div>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Payment
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
