import {
	AlertCircle,
	Building,
	Check,
	Download,
	FileText,
	Globe,
	Mail,
	MoreVertical,
	Pencil,
	Plus,
	Trash2,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type BillingAddress = {
	id: string;
	name: string;
	company?: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	isDefault: boolean;
};

const BillingAddressCard = ({
	name,
	company,
	address,
	city,
	state,
	zip,
	country,
	isDefault,
}: BillingAddress) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			isDefault ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-start justify-between">
			<div>
				<div className="flex items-center gap-2">
					<h4 className="font-medium">{name}</h4>
					{isDefault && (
						<Badge className="bg-primary/10 text-primary border-0 text-xs">
							Default
						</Badge>
					)}
				</div>
				{company && (
					<p className="text-sm text-muted-foreground">{company}</p>
				)}
				<div className="mt-2 text-sm text-muted-foreground">
					<p>{address}</p>
					<p>
						{city}, {state} {zip}
					</p>
					<p>{country}</p>
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
							<Check className="mr-2 size-4" />
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
	const billingAddresses: BillingAddress[] = [
		{
			id: '1',
			name: 'John Doe',
			company: 'Acme Corp',
			address: '123 Business Ave, Suite 100',
			city: 'San Francisco',
			state: 'CA',
			zip: '94102',
			country: 'United States',
			isDefault: true,
		},
		{
			id: '2',
			name: 'John Doe',
			address: '456 Home Street',
			city: 'Oakland',
			state: 'CA',
			zip: '94612',
			country: 'United States',
			isDefault: false,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-2">
					<div className="space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<Building className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Billing Addresses</CardTitle>
											<CardDescription>
												Manage your billing addresses
											</CardDescription>
										</div>
									</div>
									<Button size="sm" className="gap-2">
										<Plus className="size-4" />
										Add
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{billingAddresses.map((address) => (
									<BillingAddressCard key={address.id} {...address} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Invoice Settings</CardTitle>
								<CardDescription>
									Configure your invoice preferences
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="space-y-2">
									<Label>Tax ID / VAT Number</Label>
									<Input placeholder="Enter your tax ID" defaultValue="US123456789" />
								</div>
								<div className="space-y-2">
									<Label>Company Name (for invoices)</Label>
									<Input placeholder="Enter company name" defaultValue="Acme Corp" />
								</div>
								<div className="space-y-2">
									<Label>Invoice Email</Label>
									<Input
										type="email"
										placeholder="billing@company.com"
										defaultValue="billing@acme.com"
									/>
								</div>
								<div className="space-y-2">
									<Label>Preferred Currency</Label>
									<Select defaultValue="usd">
										<SelectTrigger>
											<SelectValue placeholder="Select currency" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="usd">USD - US Dollar</SelectItem>
											<SelectItem value="eur">EUR - Euro</SelectItem>
											<SelectItem value="gbp">GBP - British Pound</SelectItem>
											<SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Include Tax ID on Invoices</Label>
										<p className="text-sm text-muted-foreground">
											Display tax ID on all invoices
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Invoice History</CardTitle>
							</CardHeader>
							<CardContent className="pt-4">
								{[
									{ id: 'INV-001', date: 'Jan 2026', amount: '$99.00' },
									{ id: 'INV-002', date: 'Dec 2025', amount: '$99.00' },
									{ id: 'INV-003', date: 'Nov 2025', amount: '$99.00' },
								].map((invoice) => (
									<div
										key={invoice.id}
										className="flex items-center justify-between py-3 border-b last:border-0"
									>
										<div className="flex items-center gap-3">
											<FileText className="size-4 text-muted-foreground" />
											<div>
												<p className="font-medium">{invoice.id}</p>
												<p className="text-xs text-muted-foreground">
													{invoice.date}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium">{invoice.amount}</span>
											<Button variant="ghost" size="icon-sm">
												<Download className="size-4" />
											</Button>
										</div>
									</div>
								))}
								<Button variant="link" className="w-full mt-2">
									View All Invoices
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
