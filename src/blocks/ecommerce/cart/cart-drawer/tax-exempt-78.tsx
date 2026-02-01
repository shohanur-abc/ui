'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { FileCheck, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface TaxExemptInfo {
	isExempt: boolean;
	exemptionId: string;
	exemptionType: string;
	verificationStatus: 'verified' | 'pending' | 'none';
}

interface CartDrawerProps {
	title: string;
	taxExemptLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	taxExempt: TaxExemptInfo;
	taxRate: number;
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

const TaxExemptSection = ({
	label,
	taxExempt,
	taxSavings,
}: {
	label: string;
	taxExempt: TaxExemptInfo;
	taxSavings: number;
}) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<FileCheck className="size-4 text-muted-foreground" />
				<span className="font-medium">{label}</span>
			</div>
			{taxExempt.verificationStatus === 'verified' && (
				<Badge className="bg-green-500">Verified</Badge>
			)}
			{taxExempt.verificationStatus === 'pending' && (
				<Badge variant="outline" className="border-amber-500 text-amber-600">
					Pending
				</Badge>
			)}
		</div>
		{taxExempt.verificationStatus === 'verified' ? (
			<div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/30 p-4 space-y-2">
				<div className="flex items-center gap-2">
					<Checkbox id="apply-exempt" defaultChecked={taxExempt.isExempt} />
					<Label htmlFor="apply-exempt" className="font-medium">
						Apply tax exemption
					</Label>
				</div>
				<div className="ml-6 space-y-1 text-sm">
					<p className="text-muted-foreground">
						Exemption ID:{' '}
						<span className="font-medium">{taxExempt.exemptionId}</span>
					</p>
					<p className="text-muted-foreground">
						Type: <span className="font-medium">{taxExempt.exemptionType}</span>
					</p>
					{taxExempt.isExempt && (
						<p className="text-green-600 font-medium">
							You save: ${taxSavings.toFixed(2)} in taxes
						</p>
					)}
				</div>
			</div>
		) : (
			<div className="rounded-lg border border-border p-4 space-y-3">
				<p className="text-sm text-muted-foreground">
					Enter your tax exemption certificate to save on taxes.
				</p>
				<div className="space-y-1.5">
					<Label className="text-xs">Exemption Certificate Number</Label>
					<Input placeholder="Enter certificate number" />
				</div>
				<Button variant="outline" size="sm" className="w-full">
					Verify Exemption
				</Button>
			</div>
		)}
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
	subtotal,
	tax,
	total,
	isExempt,
	checkoutLabel,
}: {
	subtotal: number;
	tax: number;
	total: number;
	isExempt: boolean;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			<div className="flex justify-between">
				<span
					className={`text-muted-foreground ${isExempt ? 'line-through' : ''}`}
				>
					Tax
				</span>
				<span className={isExempt ? 'text-green-600' : ''}>
					{isExempt ? 'Exempt' : `$${tax.toFixed(2)}`}
				</span>
			</div>
		</div>
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		taxExemptLabel: 'Tax Exemption',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				quantity: 1,
			},
		],
		taxExempt: {
			isExempt: true,
			exemptionId: 'EX-2024-78901',
			exemptionType: 'Non-profit Organization',
			verificationStatus: 'verified',
		},
		taxRate: 0.0875,
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const tax = cartData.taxExempt.isExempt ? 0 : subtotal * cartData.taxRate;
	const taxSavings = subtotal * cartData.taxRate;
	const total = subtotal + tax;
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
							<TaxExemptSection
								label={cartData.taxExemptLabel}
								taxExempt={cartData.taxExempt}
								taxSavings={taxSavings}
							/>
						</ScrollArea>
						<Summary
							subtotal={subtotal}
							tax={tax}
							total={total}
							isExempt={cartData.taxExempt.isExempt}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
