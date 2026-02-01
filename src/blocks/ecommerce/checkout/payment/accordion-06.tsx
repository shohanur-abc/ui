'use client';

import {
	AlertCircle,
	Check,
	CreditCard,
	Gift,
	Lock,
	Package,
	Shield,
	Truck,
	Wallet,
} from 'lucide-react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface GiftOption {
	id: string;
	name: string;
	description: string;
	price: string;
}

const GiftWrappingContent = ({ options }: { options: GiftOption[] }) => (
	<div className="space-y-4 pt-4">
		<RadioGroup defaultValue="standard" className="space-y-3">
			{options.map((option) => (
				<Label
					key={option.id}
					htmlFor={option.id}
					className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
				>
					<RadioGroupItem value={option.id} id={option.id} />
					<div className="flex-1">
						<span className="font-medium">{option.name}</span>
						<p className="text-xs text-muted-foreground">
							{option.description}
						</p>
					</div>
					<span className="font-medium">{option.price}</span>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const GiftMessageContent = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Recipient's Name</Label>
			<Input placeholder="Enter recipient's name" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Gift Message</Label>
			<textarea
				className="w-full min-h-24 px-3 py-2 rounded-md border border-input bg-transparent text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
				placeholder="Write a personal message..."
			/>
		</div>
		<div className="flex items-center gap-2 text-xs text-muted-foreground">
			<AlertCircle className="size-3" />
			<span>
				Message will be printed on a gift card included with the order
			</span>
		</div>
	</div>
);

const GiftReceiptContent = () => (
	<div className="space-y-3 pt-4">
		<div className="flex items-center gap-3 p-4 rounded-xl border-2 border-primary bg-primary/5">
			<div className="size-5 rounded-full bg-primary flex items-center justify-center">
				<Check className="size-3 text-primary-foreground" />
			</div>
			<div className="flex-1">
				<span className="font-medium">Gift Receipt Enabled</span>
				<p className="text-xs text-muted-foreground">
					Prices will be hidden from the recipient
				</p>
			</div>
		</div>
		<p className="text-sm text-muted-foreground">
			A gift receipt will be included with the package, showing order details
			without prices.
		</p>
	</div>
);

const DeliveryScheduleContent = () => (
	<div className="space-y-4 pt-4">
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Delivery Date</Label>
				<Input type="date" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Time Window</Label>
				<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
					<option>Morning (8am-12pm)</option>
					<option>Afternoon (12pm-5pm)</option>
					<option>Evening (5pm-9pm)</option>
				</select>
			</div>
		</div>
		<div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
			<p className="font-medium">Scheduled delivery +$4.99</p>
			<p className="text-xs text-muted-foreground">
				Choose a specific date and time
			</p>
		</div>
	</div>
);

const PaymentMethodContent = () => (
	<div className="space-y-4 pt-4">
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
				<Label className="text-sm">Expiry</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
	</div>
);

const GiftCardContent = () => (
	<div className="space-y-4 pt-4">
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Enter gift card code" className="pl-10" />
			</div>
			<Button variant="outline">Apply</Button>
		</div>
		<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Gift className="size-4 text-emerald-500" />
				<div>
					<span className="text-sm font-medium">Gift Card Applied</span>
					<p className="text-xs text-muted-foreground">•••• 7890</p>
				</div>
			</div>
			<span className="text-sm font-medium text-emerald-600">-$50.00</span>
		</div>
	</div>
);

const OrderSummary = ({
	lines,
}: {
	lines: {
		label: string;
		value: string;
		isTotal?: boolean;
		isDiscount?: boolean;
	}[];
}) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div
					className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}
				>
					<span
						className={
							line.isDiscount
								? 'text-emerald-600'
								: line.isTotal
									? ''
									: 'text-muted-foreground'
						}
					>
						{line.label}
					</span>
					<span className={line.isDiscount ? 'text-emerald-600' : ''}>
						{line.value}
					</span>
				</div>
			</div>
		))}
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const giftOptions: GiftOption[] = [
		{
			id: 'none',
			name: 'No Gift Wrapping',
			description: 'Standard packaging',
			price: 'Free',
		},
		{
			id: 'standard',
			name: 'Standard Gift Wrap',
			description: 'Elegant gift paper with ribbon',
			price: '$5.99',
		},
		{
			id: 'premium',
			name: 'Premium Gift Box',
			description: 'Luxury box with satin ribbon',
			price: '$12.99',
		},
	];

	const orderLines = [
		{ label: 'Subtotal', value: '$199.00' },
		{ label: 'Gift Wrap', value: '$5.99' },
		{ label: 'Scheduled Delivery', value: '$4.99' },
		{ label: 'Gift Card', value: '-$50.00', isDiscount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$12.80' },
		{ label: 'Total', value: '$172.78', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Gift className="size-5 text-primary" />
								<h2 className="text-xl font-semibold">Gift Order</h2>
							</div>
							<Badge variant="secondary" className="gap-1">
								<Package className="size-3" />
								Gift Ready
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<Accordion
							type="multiple"
							defaultValue={['wrap', 'message', 'receipt']}
							className="w-full"
						>
							<AccordionItem value="wrap">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Gift className="size-4" />
										<span className="font-medium">Gift Wrapping</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<GiftWrappingContent options={giftOptions} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="message">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Gift className="size-4" />
										<span className="font-medium">Gift Message</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<GiftMessageContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="receipt">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Gift className="size-4" />
										<span className="font-medium">Gift Receipt</span>
										<Badge variant="secondary" className="text-xs">
											Enabled
										</Badge>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<GiftReceiptContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="schedule">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Truck className="size-4" />
										<span className="font-medium">Delivery Schedule</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<DeliveryScheduleContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="payment">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<CreditCard className="size-4" />
										<span className="font-medium">Payment Method</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PaymentMethodContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="giftcard">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Wallet className="size-4" />
										<span className="font-medium">Apply Gift Card</span>
										<Badge
											variant="secondary"
											className="text-xs text-emerald-600"
										>
											-$50
										</Badge>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<GiftCardContent />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary lines={orderLines} />
						<PayButton label="Complete Gift Order" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
