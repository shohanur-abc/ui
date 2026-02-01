import {
	ChevronDown,
	CreditCard,
	Gift,
	HelpCircle,
	Lock,
	MessageCircle,
	Percent,
	Receipt,
	Tag,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface DiscountProps {
	code: string;
	description: string;
	discount: string;
}

interface OrderItemProps {
	name: string;
	sku: string;
	price: string;
	originalPrice?: string;
}

interface SummaryLineProps {
	label: string;
	value: string;
	type?: 'normal' | 'discount' | 'total';
}

const CollapsibleSection = ({
	title,
	icon: Icon,
	badge,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	badge?: string;
	children: React.ReactNode;
}) => (
	<Collapsible className="border border-border/50 rounded-xl">
		<CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/30 transition-colors rounded-xl">
			<div className="flex items-center gap-3">
				<Icon className="size-4 text-muted-foreground" />
				<span className="font-medium text-sm">{title}</span>
				{badge && (
					<Badge variant="secondary" className="text-xs">
						{badge}
					</Badge>
				)}
			</div>
			<ChevronDown className="size-4 text-muted-foreground transition-transform [[data-state=open]_&]:rotate-180" />
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="px-4 pb-4 pt-0">{children}</div>
		</CollapsibleContent>
	</Collapsible>
);

const AvailableDiscount = ({ code, description, discount }: DiscountProps) => (
	<div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
		<div className="flex items-center gap-3">
			<Tag className="size-4 text-primary" />
			<div>
				<p className="text-sm font-medium">{code}</p>
				<p className="text-xs text-muted-foreground">{description}</p>
			</div>
		</div>
		<Button variant="outline" size="sm">
			{discount}
		</Button>
	</div>
);

const OrderItem = ({ name, sku, price, originalPrice }: OrderItemProps) => (
	<div className="flex justify-between py-2">
		<div>
			<p className="text-sm font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">{sku}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-medium">{price}</p>
			{originalPrice && (
				<p className="text-xs text-muted-foreground line-through">
					{originalPrice}
				</p>
			)}
		</div>
	</div>
);

const OrderItems = ({ items }: { items: OrderItemProps[] }) => (
	<div className="divide-y divide-border/50">
		{items.map((item, index) => (
			<OrderItem key={index} {...item} />
		))}
	</div>
);

const SummaryLine = ({ label, value, type = 'normal' }: SummaryLineProps) => (
	<div
		className={`flex justify-between ${type === 'total' ? 'text-lg font-semibold' : 'text-sm'}`}
	>
		<span
			className={
				type === 'normal'
					? 'text-muted-foreground'
					: type === 'discount'
						? 'text-primary'
						: ''
			}
		>
			{label}
		</span>
		<span className={type === 'discount' ? 'text-primary' : ''}>{value}</span>
	</div>
);

const PromoInput = ({
	placeholder,
	buttonLabel,
}: {
	placeholder: string;
	buttonLabel: string;
}) => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<Percent className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder={placeholder} className="pl-10" />
		</div>
		<Button variant="outline">{buttonLabel}</Button>
	</div>
);

const GiftCardInput = ({
	placeholder,
	buttonLabel,
}: {
	placeholder: string;
	buttonLabel: string;
}) => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder={placeholder} className="pl-10" />
		</div>
		<Button variant="outline">{buttonLabel}</Button>
	</div>
);

const PaymentField = ({
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

const HelpLink = ({ text }: { text: string }) => (
	<button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
		<HelpCircle className="size-3" />
		{text}
	</button>
);

const PayButton = ({ amount }: { amount: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		Pay {amount}
	</Button>
);

const SupportLink = ({ text }: { text: string }) => (
	<button className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-full">
		<MessageCircle className="size-3" />
		{text}
	</button>
);

export default function Main() {
	const discounts: DiscountProps[] = [
		{
			code: 'WELCOME20',
			description: 'First purchase discount',
			discount: 'Apply',
		},
	];

	const orderItems: OrderItemProps[] = [
		{
			name: 'Premium Widget',
			sku: 'SKU: WDG-001',
			price: '$89.00',
			originalPrice: '$99.00',
		},
		{ name: 'Addon Pack', sku: 'SKU: ADD-002', price: '$29.00' },
	];

	const summaryLines: SummaryLineProps[] = [
		{ label: 'Subtotal', value: '$118.00' },
		{ label: 'Discount (WELCOME20)', value: '-$10.00', type: 'discount' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$8.64' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid gap-8 @lg:grid-cols-2">
					<div className="space-y-4">
						<h2 className="text-xl font-semibold flex items-center gap-2">
							<Receipt className="size-5" />
							Order Details
						</h2>
						<CollapsibleSection
							title="Available Discounts"
							icon={Tag}
							badge="1 available"
						>
							<div className="space-y-3">
								{discounts.map((discount, index) => (
									<AvailableDiscount key={index} {...discount} />
								))}
							</div>
						</CollapsibleSection>
						<CollapsibleSection title="Order Items" icon={Receipt}>
							<OrderItems items={orderItems} />
						</CollapsibleSection>
						<CollapsibleSection title="Add Promo Code" icon={Percent}>
							<PromoInput placeholder="Enter promo code" buttonLabel="Apply" />
						</CollapsibleSection>
						<CollapsibleSection title="Add Gift Card" icon={Gift}>
							<GiftCardInput
								placeholder="Enter gift card code"
								buttonLabel="Apply"
							/>
						</CollapsibleSection>
						<Card className="border-border/50 bg-muted/30">
							<CardContent className="pt-4 space-y-2">
								{summaryLines.map((line, index) => (
									<SummaryLine key={index} {...line} />
								))}
								<Separator className="my-2" />
								<SummaryLine label="Total" value="$116.64" type="total" />
							</CardContent>
						</Card>
					</div>
					<div>
						<Card className="border-border/50 bg-card/50 backdrop-blur-sm @lg:sticky @lg:top-8">
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<h3 className="font-semibold">Payment</h3>
									<HelpLink text="Need help?" />
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<PaymentField
									id="card"
									label="Card Number"
									placeholder="1234 5678 9012 3456"
									icon={CreditCard}
								/>
								<PaymentField
									id="name"
									label="Name on Card"
									placeholder="John Doe"
								/>
								<div className="grid grid-cols-2 gap-4">
									<PaymentField id="exp" label="Expiry" placeholder="MM/YY" />
									<PaymentField
										id="cvc"
										label="CVC"
										placeholder="123"
										type="password"
									/>
								</div>
							</CardContent>
							<CardFooter className="flex-col gap-4">
								<PayButton amount="$116.64" />
								<SupportLink text="Chat with support" />
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
