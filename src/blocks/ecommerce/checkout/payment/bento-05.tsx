'use client';

import {
	Building2,
	Check,
	CreditCard,
	FileText,
	Lock,
	Mail,
	Phone,
	User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const CompanyInfoCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Building2 className="size-4 text-primary" />
				<span className="font-semibold text-sm">Company</span>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			<Input placeholder="Company name" className="h-9" />
			<div className="grid grid-cols-2 gap-2">
				<Input placeholder="Tax ID" className="h-9" />
				<Input placeholder="PO Number" className="h-9" />
			</div>
		</CardContent>
	</Card>
);

const BillingContactCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<User className="size-4 text-primary" />
				<span className="font-semibold text-sm">Billing Contact</span>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="grid grid-cols-2 gap-2">
				<Input placeholder="First name" className="h-9" />
				<Input placeholder="Last name" className="h-9" />
			</div>
			<div className="grid grid-cols-2 gap-2">
				<div className="relative">
					<Mail className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
					<Input placeholder="Email" className="h-9 pl-7" />
				</div>
				<div className="relative">
					<Phone className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
					<Input placeholder="Phone" className="h-9 pl-7" />
				</div>
			</div>
		</CardContent>
	</Card>
);

const PaymentTermsCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm row-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<span className="font-semibold text-sm">Payment Terms</span>
				<Badge>Net 30</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="p-3 rounded-lg bg-muted/30 space-y-2">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Credit Limit</span>
					<span className="font-medium">$100,000</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Available</span>
					<span className="font-medium text-emerald-600">$85,000</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">This Order</span>
					<span className="font-medium">$15,000</span>
				</div>
			</div>
			<div className="flex items-center gap-2 text-sm text-emerald-600">
				<Check className="size-4" />
				<span>Order within credit limit</span>
			</div>
		</CardContent>
	</Card>
);

const CardPaymentCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<CreditCard className="size-4 text-primary" />
				<span className="font-semibold text-sm">Card Payment (Optional)</span>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="relative">
				<CreditCard className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
				<Input placeholder="Card number" className="h-9 pl-7" />
			</div>
			<div className="grid grid-cols-2 gap-2">
				<Input placeholder="MM/YY" className="h-9" />
				<Input placeholder="CVV" type="password" className="h-9" />
			</div>
		</CardContent>
	</Card>
);

const ApprovalCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardContent className="p-4 space-y-3">
			<div className="flex items-start gap-3">
				<Checkbox id="approval" className="mt-0.5" />
				<Label htmlFor="approval" className="text-sm cursor-pointer">
					This order requires additional approval
				</Label>
			</div>
			<Input placeholder="Approver email" className="h-9" disabled />
		</CardContent>
	</Card>
);

const OrderSummaryCell = ({
	subtotal,
	tax,
	total,
}: {
	subtotal: string;
	tax: string;
	total: string;
}) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm col-span-2">
		<CardContent className="p-4 flex items-center justify-between gap-4">
			<div className="space-y-1">
				<div className="flex justify-between text-sm gap-6">
					<span className="text-muted-foreground">Subtotal</span>
					<span>{subtotal}</span>
				</div>
				<div className="flex justify-between text-sm gap-6">
					<span className="text-muted-foreground">Tax (est.)</span>
					<span>{tax}</span>
				</div>
			</div>
			<Separator orientation="vertical" className="h-10" />
			<div className="text-right">
				<span className="text-sm text-muted-foreground">Total</span>
				<p className="text-2xl font-bold">{total}</p>
			</div>
			<Button className="gap-2">
				<FileText className="size-4" />
				Submit Order
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 gap-4">
					<CompanyInfoCell />
					<BillingContactCell />
					<PaymentTermsCell />
					<CardPaymentCell />
					<ApprovalCell />
					<OrderSummaryCell
						subtotal="$12,500.00"
						tax="$1,000.00"
						total="$13,500.00"
					/>
				</div>
			</div>
		</section>
	);
}
