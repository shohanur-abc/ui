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
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	User,
	CreditCard,
	MapPin,
	Shield,
	Lock,
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

const AccountHeader = () => (
	<div className="flex items-center gap-4 mb-6">
		<Avatar className="size-14">
			<AvatarImage src="/avatar.jpg" />
			<AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
				JD
			</AvatarFallback>
		</Avatar>
		<div>
			<h2 className="text-lg font-semibold">Welcome back, John!</h2>
			<p className="text-sm text-muted-foreground">
				You&apos;re signed in as john@example.com
			</p>
		</div>
		<Badge variant="secondary" className="ml-auto hidden @sm:block">
			<Shield className="size-3 mr-1" />
			Verified
		</Badge>
	</div>
);

const ContactInfoSection = () => (
	<div className="space-y-4 pt-4">
		<div className="p-4 rounded-lg bg-muted/30 border border-border">
			<p className="text-sm text-muted-foreground mb-1">Contact Email</p>
			<p className="font-medium">john@example.com</p>
		</div>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
		<div className="flex items-center gap-2">
			<Checkbox id="update-profile" />
			<Label
				htmlFor="update-profile"
				className="text-sm font-normal cursor-pointer"
			>
				Update my profile with this information
			</Label>
		</div>
	</div>
);

const ShippingAddressSection = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4">
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="flex flex-wrap gap-4">
			<div className="flex items-center gap-2">
				<Checkbox id="save-address" defaultChecked />
				<Label
					htmlFor="save-address"
					className="text-sm font-normal cursor-pointer"
				>
					Save to my addresses
				</Label>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox id="make-default" />
				<Label
					htmlFor="make-default"
					className="text-sm font-normal cursor-pointer"
				>
					Make default
				</Label>
			</div>
		</div>
	</div>
);

const BillingSection = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4">
		<div className="flex items-center gap-2 mb-4">
			<Checkbox id="same-as-shipping" defaultChecked />
			<Label
				htmlFor="same-as-shipping"
				className="text-sm font-normal cursor-pointer"
			>
				Same as shipping address
			</Label>
		</div>
		<div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3">
			<Lock className="size-5 text-primary shrink-0 mt-0.5" />
			<div className="text-sm">
				<p className="font-medium">Billing address will match shipping</p>
				<p className="text-muted-foreground">
					Uncheck above to enter a different billing address
				</p>
			</div>
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
						<AccountHeader />
					</CardHeader>
					<CardContent>
						<Accordion type="multiple" defaultValue={['contact', 'shipping']}>
							<AccordionItem value="contact">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
											<User className="size-4 text-primary" />
										</div>
										<span className="font-semibold">Contact Info</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<ContactInfoSection />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="shipping">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
											<MapPin className="size-4 text-primary" />
										</div>
										<span className="font-semibold">Shipping Address</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<ShippingAddressSection
										countries={countries}
										states={states}
									/>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="billing">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
											<CreditCard className="size-4 text-primary" />
										</div>
										<span className="font-semibold">Billing Address</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<BillingSection countries={countries} states={states} />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Proceed to Shipping Method
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
