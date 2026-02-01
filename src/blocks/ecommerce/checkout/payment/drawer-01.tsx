'use client';

import { ArrowRight, Check, CreditCard, Lock, Shield, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface OrderItem {
	name: string;
	quantity: number;
	price: string;
}

const DrawerHeader = ({
	title,
	subtitle,
	onClose,
}: {
	title: string;
	subtitle: string;
	onClose: () => void;
}) => (
	<div className="flex items-start justify-between">
		<div>
			<h2 className="text-xl font-semibold">{title}</h2>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
		<Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
			<X className="size-4" />
		</Button>
	</div>
);

const OrderPreview = ({
	items,
	total,
}: {
	items: OrderItem[];
	total: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-3">
		{items.map((item, index) => (
			<div key={index} className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">
					{item.quantity}x {item.name}
				</span>
				<span>{item.price}</span>
			</div>
		))}
		<Separator />
		<div className="flex items-center justify-between font-semibold">
			<span>Total</span>
			<span className="text-lg">{total}</span>
		</div>
	</div>
);

const CardForm = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Name on Card</Label>
			<Input placeholder="JOHN DOE" />
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Expiry Date</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
	</div>
);

const TrustIndicators = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>Encrypted</span>
		</div>
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>PCI DSS</span>
		</div>
		<div className="flex items-center gap-1">
			<Check className="size-3" />
			<span>Verified</span>
		</div>
	</div>
);

const SlideInDrawer = ({
	isOpen,
	children,
}: {
	isOpen: boolean;
	children: React.ReactNode;
}) => (
	<div
		className={`fixed inset-y-0 right-0 w-full @sm:max-w-md bg-background shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
	>
		<div className="h-full flex flex-col overflow-y-auto">{children}</div>
	</div>
);

export default function Main() {
	const isOpen = true;

	const items: OrderItem[] = [
		{ name: 'Product A', quantity: 2, price: '$99.98' },
		{ name: 'Product B', quantity: 1, price: '$49.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm @sm:max-w-md mx-auto">
					<CardHeader>
						<DrawerHeader
							title="Checkout"
							subtitle="Complete your purchase"
							onClose={() => {}}
						/>
					</CardHeader>
					<CardContent className="space-y-6">
						<OrderPreview items={items} total="$149.97" />
						<CardForm />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<Button className="w-full gap-2">
							<Lock className="size-4" />
							Pay $149.97
						</Button>
						<TrustIndicators />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
