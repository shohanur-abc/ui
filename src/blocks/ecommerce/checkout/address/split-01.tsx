'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { MapPin, Package } from 'lucide-react';

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

interface OrderItemProps {
	items: { name: string; variant: string; price: string; quantity: number }[];
}

interface PanelHeaderProps {
	icon: React.ElementType;
	title: string;
}

const PanelHeader = ({ icon: Icon, title }: PanelHeaderProps) => (
	<div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
		<Icon className="size-5 text-primary" />
		<h2 className="text-lg font-semibold">{title}</h2>
	</div>
);

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

const OrderItems = ({ items }: OrderItemProps) => (
	<div className="space-y-4">
		{items.map((item, i) => (
			<div key={i} className="flex gap-4">
				<div className="size-16 rounded-lg bg-muted shrink-0" />
				<div className="flex-1 min-w-0">
					<p className="font-medium truncate">{item.name}</p>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
					<p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
				</div>
				<span className="font-medium">{item.price}</span>
			</div>
		))}
	</div>
);

const OrderSummary = ({
	items,
}: {
	items: { label: string; value: string; bold?: boolean }[];
}) => (
	<div className="space-y-2 pt-4 border-t border-border">
		{items.map((item, i) => (
			<div
				key={i}
				className={`flex justify-between text-sm ${item.bold ? 'font-semibold text-base pt-2' : ''}`}
			>
				<span className={item.bold ? '' : 'text-muted-foreground'}>
					{item.label}
				</span>
				<span>{item.value}</span>
			</div>
		))}
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

	const orderItems = [
		{
			name: 'Wireless Bluetooth Headphones',
			variant: 'Black / Over-ear',
			price: '$249.00',
			quantity: 1,
		},
		{
			name: 'USB-C Charging Cable',
			variant: '2m Length',
			price: '$29.00',
			quantity: 2,
		},
	];

	const summaryItems = [
		{ label: 'Subtotal', value: '$307.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$24.56' },
		{ label: 'Total', value: '$331.56', bold: true },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12">
					<div className="p-6 @md:p-8 rounded-2xl border border-border bg-card">
						<PanelHeader icon={MapPin} title="Shipping Address" />

						<div className="space-y-4">
							<div className="grid @sm:grid-cols-2 gap-4">
								<Field label="First Name" placeholder="John" />
								<Field label="Last Name" placeholder="Doe" />
							</div>
							<Field label="Email" placeholder="john@example.com" type="email" />
							<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
							<Field label="Street Address" placeholder="123 Main Street" />
							<Field label="Apt / Suite" placeholder="Optional" />
							<div className="grid @sm:grid-cols-3 gap-4">
								<Field label="City" placeholder="City" />
								<SelectField label="State" placeholder="State" options={states} />
								<Field label="ZIP" placeholder="12345" />
							</div>
							<SelectField
								label="Country"
								placeholder="Select country"
								options={countries}
							/>
						</div>

						<Button className="w-full mt-8" size="lg">
							Continue to Shipping Method
						</Button>
					</div>

					<div className="p-6 @md:p-8 rounded-2xl border border-border bg-muted/30">
						<PanelHeader icon={Package} title="Order Summary" />
						<OrderItems items={orderItems} />
						<OrderSummary items={summaryItems} />
					</div>
				</div>
			</div>
		</section>
	);
}
