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
import { MapPin, CreditCard, Package, ChevronRight } from 'lucide-react';

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

interface TimelineStepProps {
	items: {
		icon: React.ElementType;
		title: string;
		active: boolean;
		completed: boolean;
	}[];
}

const TimelineSteps = ({ items }: TimelineStepProps) => (
	<div className="hidden @lg:flex flex-col gap-0 mb-8">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div key={i} className="flex items-start gap-4">
					<div className="flex flex-col items-center">
						<div
							className={`size-10 rounded-full flex items-center justify-center ${
								item.completed
									? 'bg-primary text-primary-foreground'
									: item.active
										? 'bg-primary/20 text-primary border-2 border-primary'
										: 'bg-muted text-muted-foreground'
							}`}
						>
							<Icon className="size-5" />
						</div>
						{i < items.length - 1 && (
							<div
								className={`w-0.5 h-12 ${item.completed ? 'bg-primary' : 'bg-border'}`}
							/>
						)}
					</div>
					<div className="pt-2">
						<span
							className={`font-medium ${item.active ? 'text-primary' : 'text-muted-foreground'}`}
						>
							{item.title}
						</span>
					</div>
				</div>
			);
		})}
	</div>
);

const MobileSteps = ({ items }: TimelineStepProps) => (
	<div className="flex @lg:hidden items-center justify-between mb-8">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div key={i} className="flex items-center gap-2">
					<div
						className={`size-8 rounded-full flex items-center justify-center ${
							item.completed
								? 'bg-primary text-primary-foreground'
								: item.active
									? 'bg-primary/20 text-primary border-2 border-primary'
									: 'bg-muted text-muted-foreground'
						}`}
					>
						<Icon className="size-4" />
					</div>
					{i < items.length - 1 && (
						<ChevronRight className="size-4 text-muted-foreground" />
					)}
				</div>
			);
		})}
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

const OrderPreview = ({
	items,
	total,
}: {
	items: { name: string; price: string }[];
	total: string;
}) => (
	<div className="rounded-xl border border-border bg-muted/30 p-4">
		<h4 className="font-medium mb-3">Order Preview</h4>
		<div className="space-y-2">
			{items.map((item, i) => (
				<div key={i} className="flex justify-between text-sm">
					<span className="text-muted-foreground">{item.name}</span>
					<span>{item.price}</span>
				</div>
			))}
		</div>
		<Separator className="my-3" />
		<div className="flex justify-between font-semibold">
			<span>Total</span>
			<span>{total}</span>
		</div>
	</div>
);

export default function Main() {
	const steps = [
		{ icon: MapPin, title: 'Address', active: true, completed: false },
		{ icon: Package, title: 'Shipping', active: false, completed: false },
		{ icon: CreditCard, title: 'Payment', active: false, completed: false },
	];

	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	const orderItems = [
		{ name: 'Product 1 × 2', price: '$198.00' },
		{ name: 'Product 2 × 1', price: '$89.00' },
		{ name: 'Shipping', price: 'Free' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-4 gap-8 @lg:gap-12">
					<div className="@lg:col-span-1">
						<TimelineSteps items={steps} />
					</div>

					<div className="@lg:col-span-3">
						<MobileSteps items={steps} />

						<div className="grid @md:grid-cols-3 gap-6">
							<div className="@md:col-span-2 space-y-6">
								<div>
									<h2 className="text-xl font-semibold mb-1">
										Shipping Address
									</h2>
									<p className="text-sm text-muted-foreground mb-6">
										Enter your delivery details
									</p>
								</div>

								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<Field label="First Name" placeholder="John" />
										<Field label="Last Name" placeholder="Doe" />
									</div>
									<Field
										label="Email"
										placeholder="john@example.com"
										type="email"
									/>
									<Field
										label="Phone"
										placeholder="+1 (555) 000-0000"
										type="tel"
									/>
									<SelectField
										label="Country"
										placeholder="Select country"
										options={countries}
									/>
									<Field
										label="Street Address"
										placeholder="123 Main Street"
									/>
									<Field label="Apt / Suite" placeholder="Optional" />
									<div className="grid grid-cols-3 gap-4">
										<Field label="City" placeholder="City" />
										<SelectField
											label="State"
											placeholder="State"
											options={states}
										/>
										<Field label="ZIP" placeholder="12345" />
									</div>
								</div>

								<div className="flex items-center gap-3 pt-2">
									<Checkbox id="save-default" />
									<Label
										htmlFor="save-default"
										className="text-sm font-normal cursor-pointer"
									>
										Save as default address
									</Label>
								</div>
							</div>

							<div className="@md:col-span-1">
								<OrderPreview items={orderItems} total="$287.00" />
							</div>
						</div>

						<div className="flex justify-between mt-10 pt-6 border-t border-border">
							<Button variant="ghost">Back</Button>
							<Button size="lg">Continue</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
