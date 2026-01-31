import {
	Check,
	ChevronRight,
	Globe,
	MapPin,
	MoreVertical,
	Pencil,
	Plus,
	Star,
	Trash2,
	Truck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

type ShippingAddress = {
	id: string;
	label: string;
	name: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone?: string;
	isDefault: boolean;
};

const AddressCard = ({
	label,
	name,
	address,
	city,
	state,
	zip,
	country,
	phone,
	isDefault,
}: ShippingAddress) => (
	<div
		className={`relative rounded-lg border p-4 transition-all ${
			isDefault ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		{isDefault && (
			<Badge className="absolute -top-2 right-4 bg-primary/10 text-primary border-0 text-xs">
				<Star className="mr-1 size-3" />
				Default
			</Badge>
		)}
		<div className="flex items-start justify-between">
			<div>
				<h4 className="font-semibold">{label}</h4>
				<div className="mt-2 space-y-1 text-sm text-muted-foreground">
					<p>{name}</p>
					<p>{address}</p>
					<p>
						{city}, {state} {zip}
					</p>
					<p>{country}</p>
					{phone && <p>{phone}</p>}
				</div>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Pencil className="mr-2 size-4" />
						Edit
					</DropdownMenuItem>
					{!isDefault && (
						<DropdownMenuItem>
							<Star className="mr-2 size-4" />
							Set as Default
						</DropdownMenuItem>
					)}
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

export default function Main() {
	const addresses: ShippingAddress[] = [
		{
			id: '1',
			label: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apt 4B',
			city: 'San Francisco',
			state: 'CA',
			zip: '94102',
			country: 'United States',
			phone: '+1 (555) 123-4567',
			isDefault: true,
		},
		{
			id: '2',
			label: 'Work',
			name: 'John Doe',
			address: '456 Business Ave, Suite 100',
			city: 'Oakland',
			state: 'CA',
			zip: '94612',
			country: 'United States',
			phone: '+1 (555) 987-6543',
			isDefault: false,
		},
		{
			id: '3',
			label: "Parent's House",
			name: 'Jane Doe',
			address: '789 Family Lane',
			city: 'Los Angeles',
			state: 'CA',
			zip: '90001',
			country: 'United States',
			isDefault: false,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<MapPin className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Shipping Addresses</CardTitle>
											<CardDescription>
												Manage your delivery addresses
											</CardDescription>
										</div>
									</div>
									<Button className="gap-2">
										<Plus className="size-4" />
										Add Address
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{addresses.map((address) => (
									<AddressCard key={address.id} {...address} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Delivery Preferences</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<Label>Leave at Door</Label>
										<p className="text-xs text-muted-foreground">
											If no one is home
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<div className="flex items-center justify-between">
									<div>
										<Label>Signature Required</Label>
										<p className="text-xs text-muted-foreground">
											For valuable items
										</p>
									</div>
									<Switch />
								</div>
								<div className="flex items-center justify-between">
									<div>
										<Label>Text Notifications</Label>
										<p className="text-xs text-muted-foreground">
											Get delivery updates
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Delivery Instructions</CardTitle>
							</CardHeader>
							<CardContent>
								<textarea
									className="w-full min-h-24 rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
									placeholder="Special instructions for delivery..."
									defaultValue="Please ring the doorbell twice. If no answer, leave package at the side gate."
								/>
								<Button variant="outline" size="sm" className="mt-2">
									Save Instructions
								</Button>
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6 text-center">
								<MapPin className="mx-auto size-8 text-primary" />
								<h4 className="mt-2 font-semibold">
									{addresses.length} Saved Addresses
								</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									Add multiple addresses for faster checkout
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
