import { Bookmark, Edit3, Plus, MapPin, Building, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

const SavedAddressCard = ({
	value,
	type,
	icon: Icon,
	name,
	address,
	phone,
	isDefault,
}: {
	value: string;
	type: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	address: string;
	phone: string;
	isDefault?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="group relative flex flex-col p-5 rounded-2xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<div className="absolute top-4 right-4 flex items-center gap-2">
			{isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
			<Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100 transition-opacity">
				<Edit3 className="size-4" />
			</Button>
		</div>

		<RadioGroupItem value={value} id={value} className="absolute opacity-0" />

		<div className="flex items-center gap-3 mb-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Icon className="size-5 text-muted-foreground" />
			</div>
			<span className="font-semibold">{type}</span>
		</div>

		<div className="space-y-1 text-sm">
			<p className="font-medium">{name}</p>
			<p className="text-muted-foreground">{address}</p>
			<p className="text-muted-foreground">{phone}</p>
		</div>

		<div className="absolute bottom-4 right-4 size-5 rounded-full border-2 border-muted has-[:checked]:border-primary has-[:checked]:bg-primary flex items-center justify-center">
			<div className="size-2 rounded-full bg-primary-foreground scale-0 has-[:checked]:scale-100 transition-transform" />
		</div>
	</Label>
);

const AddNewAddressCard = ({ label }: { label: string }) => (
	<DialogTrigger asChild>
		<button className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed text-muted-foreground hover:text-primary hover:border-primary transition-colors">
			<div className="flex size-12 items-center justify-center rounded-full bg-muted">
				<Plus className="size-6" />
			</div>
			<span className="font-medium">{label}</span>
		</button>
	</DialogTrigger>
);

const FormInput = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

const RecentOrder = ({
	orderNumber,
	date,
	address,
}: {
	orderNumber: string;
	date: string;
	address: string;
}) => (
	<div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
		<Bookmark className="size-5 text-muted-foreground shrink-0" />
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium">Order {orderNumber}</p>
			<p className="text-xs text-muted-foreground truncate">{address}</p>
		</div>
		<span className="text-xs text-muted-foreground shrink-0">{date}</span>
	</div>
);

export default function Main() {
	const savedAddresses = [
		{
			value: 'home',
			type: 'Home',
			icon: Home,
			name: 'John Doe',
			address: '123 Main Street, Apt 4B, New York, NY 10001',
			phone: '+1 (555) 123-4567',
			isDefault: true,
		},
		{
			value: 'office',
			type: 'Office',
			icon: Building,
			name: 'John Doe',
			address: '456 Business Ave, Floor 12, New York, NY 10002',
			phone: '+1 (555) 987-6543',
		},
	];

	const recentOrders = [
		{ orderNumber: '#12345', date: 'Jan 15', address: '789 Another St, Brooklyn, NY' },
		{ orderNumber: '#12290', date: 'Dec 20', address: '321 Different Ave, Queens, NY' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<MapPin className="size-6" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">Shipping Address</h1>
						<p className="text-muted-foreground">Select or add a delivery address</p>
					</div>
				</div>

				<div className="grid @xl:grid-cols-[1fr,360px] gap-8">
					<Dialog>
						<div className="space-y-6">
							<RadioGroup defaultValue="home" className="grid @sm:grid-cols-2 gap-4">
								{savedAddresses.map((addr) => (
									<SavedAddressCard key={addr.value} {...addr} />
								))}
								<AddNewAddressCard label="Add New Address" />
							</RadioGroup>

							<div className="flex gap-3 pt-4">
								<Button variant="outline" className="flex-1">Back</Button>
								<Button className="flex-1">Continue to Payment</Button>
							</div>
						</div>

						<DialogContent className="max-w-lg">
							<DialogHeader>
								<DialogTitle>Add New Address</DialogTitle>
							</DialogHeader>
							<div className="space-y-4 pt-4">
								<div className="grid @sm:grid-cols-2 gap-4">
									<FormInput label="First Name" placeholder="John" />
									<FormInput label="Last Name" placeholder="Doe" />
								</div>
								<FormInput label="Street Address" placeholder="123 Main Street" />
								<FormInput label="Apt / Suite / Unit" placeholder="Apartment 4B" />
								<div className="grid @sm:grid-cols-3 gap-4">
									<FormInput label="City" placeholder="New York" />
									<FormInput label="State" placeholder="NY" />
									<FormInput label="ZIP Code" placeholder="10001" />
								</div>
								<FormInput label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
								<div className="flex gap-3 pt-4">
									<Button variant="outline" className="flex-1">Cancel</Button>
									<Button className="flex-1">Save Address</Button>
								</div>
							</div>
						</DialogContent>
					</Dialog>

					<div className="space-y-6 @xl:sticky @xl:top-6 @xl:self-start">
						<div className="rounded-2xl border bg-card p-6">
							<h3 className="font-semibold mb-4">Recent Deliveries</h3>
							<div className="space-y-3">
								{recentOrders.map((order, i) => (
									<RecentOrder key={i} {...order} />
								))}
							</div>
						</div>

						<div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6">
							<h4 className="font-semibold mb-2">Need help?</h4>
							<p className="text-sm text-muted-foreground mb-4">
								Contact our support team for any shipping questions
							</p>
							<Button variant="outline" size="sm" className="w-full">
								Contact Support
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
