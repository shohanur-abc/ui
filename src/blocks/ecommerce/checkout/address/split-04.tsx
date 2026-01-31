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
import { Separator } from '@/components/ui/separator';
import { Globe, Percent, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
	className?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
	className?: string;
}

interface PromoCodeProps {
	placeholder: string;
	buttonText: string;
}

interface SummaryRowProps {
	items: { label: string; value: string; type?: 'default' | 'discount' | 'total' }[];
}

const BrandHeader = ({
	logo,
	subtitle,
}: {
	logo: string;
	subtitle: string;
}) => (
	<div className="mb-8 @lg:mb-0">
		<h1 className="text-2xl font-bold">{logo}</h1>
		<p className="text-sm text-muted-foreground">{subtitle}</p>
	</div>
);

const StepBreadcrumb = ({
	items,
}: {
	items: { label: string; active?: boolean }[];
}) => (
	<div className="flex items-center gap-2 text-sm mb-8">
		{items.map((item, i) => (
			<div key={i} className="flex items-center gap-2">
				<span
					className={
						item.active ? 'text-primary font-medium' : 'text-muted-foreground'
					}
				>
					{item.label}
				</span>
				{i < items.length - 1 && (
					<ChevronRight className="size-4 text-muted-foreground" />
				)}
			</div>
		))}
	</div>
);

const Field = ({
	label,
	placeholder,
	type = 'text',
	className,
}: FieldProps) => (
	<div className={`space-y-2 ${className}`}>
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({
	label,
	placeholder,
	options,
	className,
}: SelectFieldProps) => (
	<div className={`space-y-2 ${className}`}>
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

const PromoCode = ({ placeholder, buttonText }: PromoCodeProps) => (
	<div className="flex gap-2">
		<div className="flex-1 relative">
			<Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder={placeholder} className="pl-10" />
		</div>
		<Button variant="secondary">{buttonText}</Button>
	</div>
);

const SummaryRows = ({ items }: SummaryRowProps) => (
	<div className="space-y-3">
		{items.map((item, i) => (
			<div
				key={i}
				className={`flex justify-between ${
					item.type === 'total' ? 'text-lg font-semibold pt-3 border-t border-border' : 'text-sm'
				}`}
			>
				<span
					className={
						item.type === 'discount'
							? 'text-green-500'
							: item.type === 'total'
								? ''
								: 'text-muted-foreground'
					}
				>
					{item.label}
				</span>
				<span className={item.type === 'discount' ? 'text-green-500' : ''}>
					{item.value}
				</span>
			</div>
		))}
	</div>
);

const OrderProduct = ({
	items,
}: {
	items: { name: string; variant: string; price: string; qty: number }[];
}) => (
	<div className="space-y-4">
		{items.map((item, i) => (
			<div key={i} className="flex gap-4">
				<div className="relative">
					<div className="size-16 rounded-lg bg-muted" />
					<span className="absolute -top-2 -right-2 size-5 rounded-full bg-muted-foreground text-background text-xs flex items-center justify-center">
						{item.qty}
					</span>
				</div>
				<div className="flex-1">
					<p className="font-medium text-sm">{item.name}</p>
					<p className="text-xs text-muted-foreground">{item.variant}</p>
				</div>
				<span className="text-sm font-medium">{item.price}</span>
			</div>
		))}
	</div>
);

export default function Main() {
	const steps = [
		{ label: 'Cart' },
		{ label: 'Information', active: true },
		{ label: 'Shipping' },
		{ label: 'Payment' },
	];

	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	const products = [
		{
			name: 'Classic Leather Backpack',
			variant: 'Brown / Medium',
			price: '$189.00',
			qty: 1,
		},
		{
			name: 'Minimalist Watch',
			variant: 'Silver / 40mm',
			price: '$249.00',
			qty: 1,
		},
	];

	const summaryItems = [
		{ label: 'Subtotal', value: '$438.00' },
		{ label: 'Discount', value: '-$43.80', type: 'discount' as const },
		{ label: 'Shipping', value: 'Calculated next' },
		{ label: 'Total', value: '$394.20', type: 'total' as const },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="grid @lg:grid-cols-2 gap-0">
					<div className="p-6 @md:p-10 @lg:pr-12">
						<BrandHeader logo="STORE" subtitle="Secure Checkout" />
						<StepBreadcrumb items={steps} />

						<div className="space-y-6">
							<div>
								<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
									<Globe className="size-5 text-primary" />
									Contact Information
								</h2>
								<Field
									label="Email"
									placeholder="your@email.com"
									type="email"
								/>
							</div>

							<Separator />

							<div>
								<h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
								<div className="space-y-4">
									<SelectField
										label="Country / Region"
										placeholder="Select country"
										options={countries}
									/>
									<div className="grid grid-cols-2 gap-4">
										<Field label="First Name" placeholder="John" />
										<Field label="Last Name" placeholder="Doe" />
									</div>
									<Field label="Address" placeholder="Street address" />
									<Field label="Apartment, suite, etc." placeholder="Optional" />
									<div className="grid grid-cols-6 gap-4">
										<Field label="City" placeholder="City" className="col-span-3" />
										<SelectField
											label="State"
											placeholder="State"
											options={states}
											className="col-span-2"
										/>
										<Field label="ZIP" placeholder="12345" className="col-span-1" />
									</div>
									<Field
										label="Phone"
										placeholder="+1 (555) 000-0000"
										type="tel"
									/>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<Checkbox id="save-info" />
								<Label htmlFor="save-info" className="text-sm font-normal cursor-pointer">
									Save this information for next time
								</Label>
							</div>
						</div>

						<div className="flex justify-between items-center mt-8">
							<Button variant="ghost" className="gap-2">
								<ChevronLeft className="size-4" />
								Return to cart
							</Button>
							<Button size="lg">Continue to shipping</Button>
						</div>
					</div>

					<div className="bg-muted/30 p-6 @md:p-10 @lg:pl-12 border-l border-border">
						<h3 className="font-semibold mb-6">Order Summary</h3>
						<OrderProduct items={products} />
						<Separator className="my-6" />
						<PromoCode placeholder="Discount code" buttonText="Apply" />
						<Separator className="my-6" />
						<SummaryRows items={summaryItems} />
					</div>
				</div>
			</div>
		</section>
	);
}
