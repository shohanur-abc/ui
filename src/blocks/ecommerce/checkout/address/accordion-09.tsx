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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
	Users,
	MapPin,
	Truck,
	Check,
	ChevronRight,
	Package,
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

interface RecipientCardProps {
	name: string;
	items: number;
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

const RecipientCard = ({ name, items }: RecipientCardProps) => (
	<div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
				<span className="text-primary font-bold text-sm">
					{name
						.split(' ')
						.map((n) => n[0])
						.join('')}
				</span>
			</div>
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-sm text-muted-foreground">{items} items</p>
			</div>
		</div>
		<Button variant="ghost" size="sm">
			Edit
		</Button>
	</div>
);

const RecipientsSection = () => (
	<div className="space-y-4 pt-4">
		<div className="flex items-center justify-between">
			<h4 className="font-medium">Current Recipients</h4>
			<Badge variant="secondary">3 addresses</Badge>
		</div>
		<div className="space-y-3">
			<RecipientCard name="John Doe" items={2} />
			<RecipientCard name="Jane Smith" items={1} />
			<RecipientCard name="Bob Wilson" items={3} />
		</div>
		<Button variant="outline" className="w-full">
			<Users className="size-4 mr-2" />
			Add Another Recipient
		</Button>
	</div>
);

const NewRecipientSection = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Recipient Name" placeholder="Full name" />
			<Field label="Email" placeholder="Email address" type="email" />
		</div>
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<Separator />
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

const ItemAssignmentSection = () => (
	<div className="space-y-4 pt-4">
		<p className="text-sm text-muted-foreground">
			Assign items from your cart to each recipient
		</p>
		<div className="space-y-3">
			{['Wireless Headphones', 'Smart Watch', 'Phone Case', 'Laptop Stand', 'USB Cable', 'Power Bank'].map(
				(item) => (
					<div
						key={item}
						className="flex items-center gap-4 p-3 rounded-lg border border-border"
					>
						<Checkbox id={item} />
						<div className="size-10 rounded bg-muted flex items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
						<Label htmlFor={item} className="flex-1 cursor-pointer font-normal">
							{item}
						</Label>
						<Select>
							<SelectTrigger className="w-36">
								<SelectValue placeholder="Recipient" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="john">John Doe</SelectItem>
								<SelectItem value="jane">Jane Smith</SelectItem>
								<SelectItem value="bob">Bob Wilson</SelectItem>
							</SelectContent>
						</Select>
					</div>
				)
			)}
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
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Card>
					<CardHeader>
						<div className="flex items-center gap-3">
							<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
								<Truck className="size-6 text-primary" />
							</div>
							<div>
								<CardTitle className="text-2xl">Multi-Address Shipping</CardTitle>
								<p className="text-sm text-muted-foreground">
									Ship items to multiple addresses in one order
								</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Accordion type="single" collapsible defaultValue="recipients">
							<AccordionItem value="recipients">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<Users className="size-5 text-primary" />
										<span className="font-semibold">Manage Recipients</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<RecipientsSection />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="new">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<MapPin className="size-5 text-primary" />
										<span className="font-semibold">Add New Address</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<NewRecipientSection
										countries={countries}
										states={states}
									/>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="assign">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-3">
										<Package className="size-5 text-primary" />
										<span className="font-semibold">Assign Items</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<ItemAssignmentSection />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>

				<div className="flex gap-4 mt-8">
					<Button variant="outline" size="lg" className="flex-1">
						Back to Cart
					</Button>
					<Button size="lg" className="flex-1 gap-2">
						Continue
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
