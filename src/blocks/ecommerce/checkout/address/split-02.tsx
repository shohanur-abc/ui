'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ArrowRight, ShoppingBag, Truck } from 'lucide-react';

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

interface FeatureItemProps {
	items: { icon: React.ElementType; title: string; description: string }[];
}

const PageTitle = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="mb-8">
		<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-1">{subtitle}</p>
	</div>
);

const Field = ({ label, placeholder, type = 'text' }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({ label, placeholder, options }: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">{label}</Label>
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

const FeatureItems = ({ items }: FeatureItemProps) => (
	<div className="space-y-4">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border"
			>
				<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<item.icon className="size-5" />
				</div>
				<div>
					<h4 className="font-medium">{item.title}</h4>
					<p className="text-sm text-muted-foreground">{item.description}</p>
				</div>
			</div>
		))}
	</div>
);

const SidebarHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between mb-6">
		<h3 className="text-lg font-semibold">{title}</h3>
		<span className="text-sm text-muted-foreground">{count} items</span>
	</div>
);

const CartItem = ({
	items,
}: {
	items: { name: string; price: string; image?: string }[];
}) => (
	<div className="space-y-3">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
			>
				<div className="size-12 rounded-md bg-muted shrink-0" />
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium truncate">{item.name}</p>
				</div>
				<span className="text-sm font-medium">{item.price}</span>
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

	const features = [
		{
			icon: Truck,
			title: 'Free Shipping',
			description: 'On orders over $50',
		},
		{
			icon: ShoppingBag,
			title: 'Easy Returns',
			description: '30-day return policy',
		},
	];

	const cartItems = [
		{ name: 'Premium Wireless Earbuds', price: '$199.00' },
		{ name: 'Charging Case', price: '$49.00' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-5 gap-8 @lg:gap-12">
					<div className="@lg:col-span-3">
						<PageTitle
							title="Shipping Address"
							subtitle="Enter your delivery information"
						/>

						<div className="space-y-5">
							<div className="grid @sm:grid-cols-2 gap-4">
								<Field label="First Name" placeholder="John" />
								<Field label="Last Name" placeholder="Doe" />
							</div>
							<Field
								label="Email Address"
								placeholder="john@example.com"
								type="email"
							/>
							<Field
								label="Phone Number"
								placeholder="+1 (555) 000-0000"
								type="tel"
							/>
							<SelectField
								label="Country"
								placeholder="Select country"
								options={countries}
							/>
							<Field label="Street Address" placeholder="123 Main Street" />
							<Field label="Apartment, Suite, etc." placeholder="Optional" />
							<div className="grid @sm:grid-cols-3 gap-4">
								<Field label="City" placeholder="San Francisco" />
								<SelectField
									label="State"
									placeholder="State"
									options={states}
								/>
								<Field label="ZIP Code" placeholder="94102" />
							</div>

							<div className="flex items-center gap-3 pt-2">
								<Checkbox id="same-billing" />
								<Label
									htmlFor="same-billing"
									className="text-sm font-normal cursor-pointer"
								>
									Use same address for billing
								</Label>
							</div>
						</div>

						<div className="flex gap-3 mt-8">
							<Button variant="outline" size="lg">
								Back
							</Button>
							<Button size="lg" className="flex-1 gap-2">
								Continue
								<ArrowRight className="size-4" />
							</Button>
						</div>
					</div>

					<div className="@lg:col-span-2 @lg:pl-8 @lg:border-l border-border">
						<SidebarHeader title="Your Cart" count={2} />
						<CartItem items={cartItems} />

						<div className="mt-6 pt-4 border-t border-border space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Subtotal</span>
								<span>$248.00</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Shipping</span>
								<span className="text-primary">Free</span>
							</div>
							<div className="flex justify-between font-semibold pt-2">
								<span>Total</span>
								<span>$248.00</span>
							</div>
						</div>

						<div className="mt-8">
							<FeatureItems items={features} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
