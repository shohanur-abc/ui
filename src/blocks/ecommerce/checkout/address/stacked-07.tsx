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
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, Clock, ChevronRight } from 'lucide-react';

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

interface OrderSummaryItemProps {
	items: { label: string; value: string; highlight?: boolean }[];
}

interface DeliveryInfoProps {
	icon: React.ElementType;
	title: string;
	description: string;
	badge?: string;
}

const OrderSummaryItem = ({ items }: OrderSummaryItemProps) => (
	<div className="space-y-2">
		{items.map((item, i) => (
			<div key={i} className="flex justify-between text-sm">
				<span className="text-muted-foreground">{item.label}</span>
				<span className={item.highlight ? 'font-semibold text-primary' : ''}>
					{item.value}
				</span>
			</div>
		))}
	</div>
);

const DeliveryInfo = ({
	icon: Icon,
	title,
	description,
	badge,
}: DeliveryInfoProps) => (
	<div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{title}</span>
				{badge && (
					<Badge variant="secondary" className="text-xs">
						{badge}
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const Field = ({ label, placeholder, type = 'text' }: FieldProps) => (
	<div className="space-y-1.5">
		<Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
			{label}
		</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({ label, placeholder, options }: SelectFieldProps) => (
	<div className="space-y-1.5">
		<Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
			{label}
		</Label>
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
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$23.92' },
		{ label: 'Total', value: '$322.92', highlight: true },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-5 gap-8 @lg:gap-12">
					<div className="@lg:col-span-3 space-y-6">
						<div className="flex items-center gap-2 mb-6">
							<Package className="size-5 text-primary" />
							<h2 className="text-xl font-semibold">Shipping Information</h2>
						</div>

						<div className="space-y-4">
							<div className="grid @sm:grid-cols-2 gap-4">
								<Field label="First Name" placeholder="John" />
								<Field label="Last Name" placeholder="Doe" />
							</div>
							<Field
								label="Email Address"
								placeholder="john@example.com"
								type="email"
							/>
							<Field label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
							<Field label="Street Address" placeholder="123 Main Street" />
							<Field
								label="Apt / Suite / Unit"
								placeholder="Apartment, suite, unit"
							/>
							<div className="grid @sm:grid-cols-3 gap-4">
								<Field label="City" placeholder="San Francisco" />
								<SelectField
									label="State"
									placeholder="Select"
									options={states}
								/>
								<Field label="ZIP Code" placeholder="94102" />
							</div>
							<SelectField
								label="Country"
								placeholder="Select country"
								options={countries}
							/>
						</div>

						<div className="pt-4 space-y-3">
							<DeliveryInfo
								icon={Truck}
								title="Standard Delivery"
								description="Estimated delivery in 5-7 business days"
								badge="Free"
							/>
							<DeliveryInfo
								icon={Clock}
								title="Express Delivery"
								description="Estimated delivery in 2-3 business days"
							/>
						</div>
					</div>

					<div className="@lg:col-span-2">
						<Card className="sticky top-6">
							<CardContent className="pt-6">
								<h3 className="font-semibold mb-4">Order Summary</h3>
								<div className="space-y-4">
									<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
										<div className="size-12 rounded-lg bg-muted" />
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium truncate">
												Premium Wireless Headphones
											</p>
											<p className="text-xs text-muted-foreground">Qty: 1</p>
										</div>
										<span className="text-sm font-medium">$299.00</span>
									</div>
									<OrderSummaryItem items={orderItems} />
								</div>
								<Button className="w-full mt-6 gap-2" size="lg">
									Continue to Payment
									<ChevronRight className="size-4" />
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
