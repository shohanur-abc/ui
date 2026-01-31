'use client';

import { ArrowLeft, Building2, Check, CreditCard, FileText, Lock, Mail, Phone, Shield, Upload, User, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const DrawerHeader = ({ title, subtitle, onClose }: { title: string; subtitle: string; onClose: () => void }) => (
	<div className="flex items-start justify-between">
		<div>
			<Badge variant="secondary" className="mb-2">B2B</Badge>
			<h2 className="text-lg font-semibold">{title}</h2>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
		<Button variant="ghost" size="icon" onClick={onClose}>
			<X className="size-4" />
		</Button>
	</div>
);

const CompanyInfoForm = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 mb-2">
			<Building2 className="size-4 text-primary" />
			<span className="font-medium">Company Information</span>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Company Name</Label>
			<Input placeholder="Acme Corporation" />
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Tax ID</Label>
				<Input placeholder="XX-XXXXXXX" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">PO Number</Label>
				<Input placeholder="PO-12345" />
			</div>
		</div>
	</div>
);

const ContactInfoForm = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 mb-2">
			<User className="size-4 text-primary" />
			<span className="font-medium">Billing Contact</span>
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">First Name</Label>
				<Input placeholder="John" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Last Name</Label>
				<Input placeholder="Doe" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Email</Label>
			<div className="relative">
				<Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input type="email" placeholder="billing@company.com" className="pl-10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Phone</Label>
			<div className="relative">
				<Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="+1 (555) 000-0000" className="pl-10" />
			</div>
		</div>
	</div>
);

const PaymentMethodTabs = () => (
	<Tabs defaultValue="invoice" className="w-full">
		<TabsList className="grid w-full grid-cols-3">
			<TabsTrigger value="invoice">Invoice</TabsTrigger>
			<TabsTrigger value="card">Card</TabsTrigger>
			<TabsTrigger value="wire">Wire</TabsTrigger>
		</TabsList>
		<div className="mt-4">
			<TabsContent value="invoice" className="space-y-4 m-0">
				<div className="p-4 rounded-xl bg-muted/30 space-y-3">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Payment Terms</span>
						<Badge>Net 30</Badge>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Credit Limit</span>
						<span className="font-medium">$50,000</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Available Credit</span>
						<span className="font-medium text-emerald-600">$42,500</span>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="card" className="space-y-4 m-0">
				<div className="space-y-2">
					<Label className="text-sm">Card Number</Label>
					<div className="relative">
						<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
						<Input placeholder="1234 5678 9012 3456" className="pl-10" />
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-2">
						<Label className="text-sm">Expiry</Label>
						<Input placeholder="MM/YY" />
					</div>
					<div className="space-y-2">
						<Label className="text-sm">CVV</Label>
						<Input type="password" placeholder="•••" />
					</div>
				</div>
			</TabsContent>
			<TabsContent value="wire" className="space-y-4 m-0">
				<div className="p-4 rounded-xl bg-muted/30 space-y-2 text-sm">
					<div className="flex justify-between">
						<span className="text-muted-foreground">Bank</span>
						<span>First National Bank</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Account</span>
						<span>•••• 4567</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Routing</span>
						<span>021000089</span>
					</div>
				</div>
			</TabsContent>
		</div>
	</Tabs>
);

const NotesSection = () => (
	<div className="space-y-2">
		<Label className="text-sm">Order Notes</Label>
		<Textarea placeholder="Add any special instructions..." className="h-20 resize-none" />
	</div>
);

const ApprovalCheckbox = () => (
	<div className="flex items-start gap-3">
		<Checkbox id="approval" className="mt-0.5" />
		<Label htmlFor="approval" className="text-xs cursor-pointer text-muted-foreground">
			This order requires additional approval from finance@company.com
		</Label>
	</div>
);

const OrderTotal = ({ subtotal, tax, total }: { subtotal: string; tax: string; total: string }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>{subtotal}</span>
		</div>
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Tax (estimated)</span>
			<span>{tax}</span>
		</div>
		<Separator />
		<div className="flex justify-between font-semibold text-lg">
			<span>Total</span>
			<span>{total}</span>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm @sm:max-w-md mx-auto">
					<CardHeader>
						<DrawerHeader title="Business Checkout" subtitle="Complete your B2B order" onClose={() => {}} />
					</CardHeader>
					<CardContent className="space-y-6">
						<CompanyInfoForm />
						<Separator />
						<ContactInfoForm />
						<Separator />
						<PaymentMethodTabs />
						<NotesSection />
						<ApprovalCheckbox />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderTotal subtotal="$7,500.00" tax="$600.00" total="$8,100.00" />
						<Button className="w-full gap-2">
							<FileText className="size-4" />
							Submit Order
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
