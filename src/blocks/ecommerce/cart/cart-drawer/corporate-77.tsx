'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	Building2,
	CreditCard,
	Minus,
	Plus,
	ShoppingBag,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface CorporateAccount {
	companyName: string;
	department: string;
	costCenter: string;
	approver: string;
	creditLimit: number;
	available: number;
}

interface CartDrawerProps {
	title: string;
	corporateLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	account: CorporateAccount;
}

const CartTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const CorporateSection = ({
	label,
	account,
}: {
	label: string;
	account: CorporateAccount;
}) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Building2 className="size-4 text-muted-foreground" />
				<span className="font-medium">{label}</span>
			</div>
			<Badge variant="secondary">{account.companyName}</Badge>
		</div>
		<div className="rounded-lg border border-border p-3 space-y-3">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Credit Limit</span>
				<span>${account.creditLimit.toLocaleString()}</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Available</span>
				<span className="font-medium text-green-600">
					${account.available.toLocaleString()}
				</span>
			</div>
		</div>
		<div className="space-y-3">
			<div className="space-y-1.5">
				<Label className="text-xs">Department</Label>
				<Select defaultValue={account.department}>
					<SelectTrigger>
						<SelectValue placeholder="Select department" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="marketing">Marketing</SelectItem>
						<SelectItem value="sales">Sales</SelectItem>
						<SelectItem value="engineering">Engineering</SelectItem>
						<SelectItem value="operations">Operations</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-1.5">
				<Label className="text-xs">Cost Center</Label>
				<Input
					defaultValue={account.costCenter}
					placeholder="Enter cost center"
				/>
			</div>
			<div className="space-y-1.5">
				<Label className="text-xs">Approver</Label>
				<Select defaultValue={account.approver}>
					<SelectTrigger>
						<SelectValue placeholder="Select approver" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="john">John Smith (Manager)</SelectItem>
						<SelectItem value="jane">Jane Doe (Director)</SelectItem>
						<SelectItem value="auto">Auto-approve under $500</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	</div>
);

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<h4 className="truncate text-sm font-medium">{item.name}</h4>
				<Button size="icon-sm" variant="ghost" className="size-5">
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 rounded border border-border">
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Minus className="size-2.5" />
					</Button>
					<span className="w-5 text-center text-xs">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Plus className="size-2.5" />
					</Button>
				</div>
				<span className="text-sm font-medium">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const Summary = ({
	total,
	checkoutLabel,
}: {
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			<Building2 className="mr-2 size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		corporateLabel: 'Corporate Account',
		checkoutLabel: 'Submit for Approval',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 5,
			},
		],
		account: {
			companyName: 'Acme Corp',
			department: 'marketing',
			costCenter: 'CC-4521',
			approver: 'john',
			creditLimit: 50000,
			available: 42500,
		},
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<CartTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
							<Separator className="my-4" />
							<CorporateSection
								label={cartData.corporateLabel}
								account={cartData.account}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
