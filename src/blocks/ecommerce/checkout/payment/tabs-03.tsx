'use client';

import {
	Check,
	CreditCard,
	Gift,
	Lock,
	Percent,
	Settings,
	Shield,
	User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StepTabProps {
	value: string;
	step: number;
	label: string;
	completed?: boolean;
}

const StepTabs = ({
	tabs,
	children,
}: {
	tabs: StepTabProps[];
	children: React.ReactNode;
}) => (
	<Tabs defaultValue={tabs[0]?.value} className="w-full">
		<TabsList className="w-full flex h-auto p-0 bg-transparent border-b border-border rounded-none gap-0">
			{tabs.map((tab) => (
				<TabsTrigger
					key={tab.value}
					value={tab.value}
					className="flex-1 flex items-center gap-2 py-4 px-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
				>
					<div
						className={`size-6 rounded-full flex items-center justify-center text-xs font-medium ${
							tab.completed
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground'
						}`}
					>
						{tab.completed ? <Check className="size-3" /> : tab.step}
					</div>
					<span className="hidden @sm:inline text-sm">{tab.label}</span>
				</TabsTrigger>
			))}
		</TabsList>
		<div className="mt-6">{children}</div>
	</Tabs>
);

const FormField = ({
	id,
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">
			{label}
		</Label>
		<div className="relative">
			{Icon && (
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			)}
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				className={Icon ? 'pl-10' : ''}
			/>
		</div>
	</div>
);

const BillingInfoContent = () => (
	<div className="space-y-4">
		<h3 className="font-semibold">Billing Information</h3>
		<div className="grid gap-4 @sm:grid-cols-2">
			<FormField id="first-name" label="First Name" placeholder="John" />
			<FormField id="last-name" label="Last Name" placeholder="Doe" />
			<FormField id="email" label="Email" placeholder="john@example.com" />
			<FormField id="phone" label="Phone" placeholder="+1 (555) 000-0000" />
			<div className="@sm:col-span-2">
				<FormField
					id="address"
					label="Billing Address"
					placeholder="123 Main St"
				/>
			</div>
			<FormField id="city" label="City" placeholder="New York" />
			<FormField id="zip" label="ZIP Code" placeholder="10001" />
		</div>
	</div>
);

const PaymentContent = () => (
	<div className="space-y-4">
		<h3 className="font-semibold">Payment Details</h3>
		<div className="space-y-4">
			<FormField
				id="card-number"
				label="Card Number"
				placeholder="1234 5678 9012 3456"
				icon={CreditCard}
			/>
			<FormField
				id="card-holder"
				label="Cardholder Name"
				placeholder="JOHN DOE"
			/>
			<div className="grid grid-cols-2 gap-4">
				<FormField id="expiry" label="Expiry Date" placeholder="MM/YY" />
				<FormField
					id="cvc"
					label="Security Code"
					placeholder="CVC"
					type="password"
				/>
			</div>
		</div>
		<div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
			<Checkbox id="save" />
			<Label htmlFor="save" className="text-sm cursor-pointer">
				Save card for future purchases
			</Label>
		</div>
	</div>
);

const DiscountsContent = () => (
	<div className="space-y-4">
		<h3 className="font-semibold">Discounts & Rewards</h3>
		<div className="space-y-4">
			<div className="space-y-2">
				<Label className="text-sm">Promo Code</Label>
				<div className="flex gap-2">
					<div className="relative flex-1">
						<Percent className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
						<Input placeholder="Enter promo code" className="pl-10" />
					</div>
					<Button variant="outline">Apply</Button>
				</div>
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Gift Card</Label>
				<div className="flex gap-2">
					<div className="relative flex-1">
						<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
						<Input placeholder="Enter gift card code" className="pl-10" />
					</div>
					<Button variant="outline">Apply</Button>
				</div>
			</div>
			<div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Badge variant="secondary">VIP</Badge>
						<span className="text-sm font-medium">Member Discount</span>
					</div>
					<span className="text-sm text-primary font-medium">-10%</span>
				</div>
			</div>
		</div>
	</div>
);

const ReviewContent = () => (
	<div className="space-y-4">
		<h3 className="font-semibold">Review Order</h3>
		<div className="space-y-3">
			<div className="p-4 rounded-xl bg-muted/30">
				<div className="flex items-center gap-2 mb-2">
					<User className="size-4 text-muted-foreground" />
					<span className="text-sm font-medium">Billing</span>
				</div>
				<p className="text-sm text-muted-foreground">
					John Doe, john@example.com
				</p>
				<p className="text-sm text-muted-foreground">
					123 Main St, New York 10001
				</p>
			</div>
			<div className="p-4 rounded-xl bg-muted/30">
				<div className="flex items-center gap-2 mb-2">
					<CreditCard className="size-4 text-muted-foreground" />
					<span className="text-sm font-medium">Payment</span>
				</div>
				<p className="text-sm text-muted-foreground">Visa ending in 4242</p>
			</div>
			<div className="p-4 rounded-xl bg-muted/30">
				<div className="flex items-center gap-2 mb-2">
					<Percent className="size-4 text-muted-foreground" />
					<span className="text-sm font-medium">Discounts</span>
				</div>
				<p className="text-sm text-muted-foreground">VIP Member -10%</p>
			</div>
		</div>
	</div>
);

const OrderTotal = ({
	items,
}: {
	items: { label: string; value: string; isTotal?: boolean }[];
}) => (
	<div className="p-4 rounded-xl bg-muted/50 space-y-2">
		{items.map((item, index) => (
			<div key={index}>
				{item.isTotal && <Separator className="my-2" />}
				<div
					className={`flex justify-between ${item.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}
				>
					<span className={item.isTotal ? '' : 'text-muted-foreground'}>
						{item.label}
					</span>
					<span>{item.value}</span>
				</div>
			</div>
		))}
	</div>
);

const NavigationButtons = ({
	backLabel,
	nextLabel,
}: {
	backLabel: string;
	nextLabel: string;
}) => (
	<div className="flex gap-3">
		<Button variant="outline" className="flex-1">
			{backLabel}
		</Button>
		<Button className="flex-1 gap-2">
			<Lock className="size-4" />
			{nextLabel}
		</Button>
	</div>
);

export default function Main() {
	const tabs: StepTabProps[] = [
		{ value: 'billing', step: 1, label: 'Billing', completed: true },
		{ value: 'payment', step: 2, label: 'Payment', completed: false },
		{ value: 'discounts', step: 3, label: 'Discounts' },
		{ value: 'review', step: 4, label: 'Review' },
	];

	const orderItems = [
		{ label: 'Subtotal', value: '$249.00' },
		{ label: 'VIP Discount (10%)', value: '-$24.90' },
		{ label: 'Tax', value: '$17.93' },
		{ label: 'Total', value: '$242.03', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-0">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Checkout</h2>
							<Badge variant="outline" className="gap-1">
								<Shield className="size-3" />
								Secure
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="pt-6">
						<StepTabs tabs={tabs}>
							<TabsContent value="billing">
								<BillingInfoContent />
							</TabsContent>
							<TabsContent value="payment">
								<PaymentContent />
							</TabsContent>
							<TabsContent value="discounts">
								<DiscountsContent />
							</TabsContent>
							<TabsContent value="review">
								<ReviewContent />
							</TabsContent>
						</StepTabs>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderTotal items={orderItems} />
						<NavigationButtons backLabel="Back" nextLabel="Continue" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
