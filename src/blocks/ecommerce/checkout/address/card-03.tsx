'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Home, Building2, Store, Plus, X } from 'lucide-react';

interface AddressTypeProps {
	items: {
		icon: React.ElementType;
		label: string;
		value: string;
	}[];
	selected: string;
}

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

const AddressTypeSelector = ({ items, selected }: AddressTypeProps) => (
	<div className="grid grid-cols-3 gap-3 mb-6">
		{items.map((item) => {
			const Icon = item.icon;
			const isSelected = item.value === selected;
			return (
				<button
					key={item.value}
					type="button"
					className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
						isSelected
							? 'border-primary bg-primary/5 text-primary'
							: 'border-border hover:border-primary/40'
					}`}
				>
					<Icon className="size-5" />
					<span className="text-sm font-medium">{item.label}</span>
				</button>
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

const AddressTag = ({
	label,
	onRemove,
}: {
	label: string;
	onRemove?: () => void;
}) => (
	<Badge variant="secondary" className="gap-1.5 pr-1">
		{label}
		<button
			type="button"
			onClick={onRemove}
			className="hover:bg-muted rounded p-0.5"
		>
			<X className="size-3" />
		</button>
	</Badge>
);

const SavedAddressCard = ({
	label,
	address,
	isActive,
}: {
	label: string;
	address: string;
	isActive?: boolean;
}) => (
	<div
		className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
			isActive
				? 'border-primary bg-primary/5'
				: 'border-border hover:border-primary/40'
		}`}
	>
		<div className="flex items-center justify-between mb-2">
			<span className="font-medium">{label}</span>
			{isActive && (
				<Badge variant="default" className="text-xs">
					Selected
				</Badge>
			)}
		</div>
		<p className="text-sm text-muted-foreground">{address}</p>
	</div>
);

export default function Main() {
	const addressTypes = [
		{ icon: Home, label: 'Home', value: 'home' },
		{ icon: Building2, label: 'Office', value: 'office' },
		{ icon: Store, label: 'Pickup', value: 'pickup' },
	];

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
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">
						Where should we deliver?
					</h1>
					<p className="text-muted-foreground mt-1">
						Choose or add a delivery address
					</p>
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<div>
						<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
							Saved Addresses
						</h3>
						<div className="space-y-3">
							<SavedAddressCard
								label="Home"
								address="123 Main Street, Apt 4B, San Francisco, CA 94102"
								isActive
							/>
							<SavedAddressCard
								label="Office"
								address="456 Market Street, Suite 100, San Francisco, CA 94103"
							/>
						</div>
						<Button variant="outline" className="w-full mt-4 gap-2">
							<Plus className="size-4" />
							Add New Address
						</Button>
					</div>

					<div>
						<Card>
							<CardContent className="pt-6">
								<h3 className="font-semibold mb-4">New Address</h3>
								<AddressTypeSelector items={addressTypes} selected="home" />

								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<Field label="First Name" placeholder="John" />
										<Field label="Last Name" placeholder="Doe" />
									</div>
									<Field
										label="Phone"
										placeholder="+1 (555) 000-0000"
										type="tel"
									/>
									<Field label="Street Address" placeholder="123 Main Street" />
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
									<SelectField
										label="Country"
										placeholder="Select country"
										options={countries}
									/>

									<div className="pt-2">
										<Label className="text-sm mb-2 block">Address Labels</Label>
										<div className="flex flex-wrap gap-2">
											<AddressTag label="Home" />
											<AddressTag label="Default" />
											<Button variant="outline" size="sm" className="h-6 gap-1">
												<Plus className="size-3" />
												Add Tag
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="flex gap-3 mt-8">
					<Button variant="outline" size="lg" className="flex-1">
						Cancel
					</Button>
					<Button size="lg" className="flex-1">
						Save & Continue
					</Button>
				</div>
			</div>
		</section>
	);
}
