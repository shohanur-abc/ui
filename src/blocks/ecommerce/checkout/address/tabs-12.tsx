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
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Package, Users, Gift, ArrowRight, Plus, Trash2 } from 'lucide-react';

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

interface RecipientFormProps {
	index: number;
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
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

const RecipientForm = ({ index, countries, states }: RecipientFormProps) => (
	<div className="p-4 rounded-xl border border-border space-y-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Badge variant="outline">Recipient {index + 1}</Badge>
			</div>
			{index > 0 && (
				<Button variant="ghost" size="icon" className="size-8 text-destructive">
					<Trash2 className="size-4" />
				</Button>
			)}
		</div>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="Jane" />
			<Field label="Last Name" placeholder="Smith" />
		</div>
		<Field label="Email" placeholder="jane@example.com" type="email" />
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Street Address" placeholder="123 Friend Lane" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</div>
);

const SingleAddressTab = ({
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
		<Separator />
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
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="save-single" />
			<Label
				htmlFor="save-single"
				className="text-sm font-normal cursor-pointer"
			>
				Save for future orders
			</Label>
		</div>
	</div>
);

const MultipleAddressesTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-muted/30 border border-border">
			<p className="text-sm text-muted-foreground">
				Ship items to multiple recipients. Each recipient will receive their
				portion of the order.
			</p>
		</div>
		<RecipientForm index={0} countries={countries} states={states} />
		<RecipientForm index={1} countries={countries} states={states} />
		<Button variant="outline" className="w-full gap-2">
			<Plus className="size-4" />
			Add Another Recipient
		</Button>
	</div>
);

const GiftRegistryTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-primary/5 border border-pink-500/20">
			<div className="flex items-center gap-2 mb-2">
				<Gift className="size-5 text-pink-500" />
				<span className="font-medium">Gift Registry Order</span>
			</div>
			<p className="text-sm text-muted-foreground">
				Ship directly to the registry holder&apos;s preferred address
			</p>
		</div>
		<SelectField
			label="Select Registry"
			placeholder="Choose a gift registry"
			options={[
				{ value: 'wedding', label: 'John & Jane Wedding Registry' },
				{ value: 'baby', label: 'Smith Baby Shower' },
				{ value: 'housewarming', label: 'Mike New Home Registry' },
			]}
		/>
		<div className="p-4 rounded-xl border border-border bg-muted/30">
			<p className="text-sm font-medium mb-1">Ship to Registry Address</p>
			<p className="text-sm text-muted-foreground">
				123 Registry Lane, San Francisco, CA 94102
			</p>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Gift Message</Label>
			<Textarea
				placeholder="Write a personal message for the recipient..."
				className="min-h-[80px]"
			/>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="gift-wrap" />
			<Label htmlFor="gift-wrap" className="text-sm font-normal cursor-pointer">
				Add gift wrapping (+$5.00)
			</Label>
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
				<div className="text-center mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold mb-2">
						Shipping Details
					</h1>
					<p className="text-muted-foreground">
						Choose where to ship your order
					</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Tabs defaultValue="single">
							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="single" className="gap-2">
									<Package className="size-4" />
									<span className="hidden @sm:inline">Single</span>
								</TabsTrigger>
								<TabsTrigger value="multiple" className="gap-2">
									<Users className="size-4" />
									<span className="hidden @sm:inline">Multiple</span>
								</TabsTrigger>
								<TabsTrigger value="registry" className="gap-2">
									<Gift className="size-4" />
									<span className="hidden @sm:inline">Registry</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="single">
								<SingleAddressTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="multiple">
								<MultipleAddressesTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="registry">
								<GiftRegistryTab countries={countries} states={states} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Payment
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
