import { Check, MapPin, Truck, CreditCard, Gift, ChevronDown, Edit2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const StepStatus = ({
	completed,
	current,
}: {
	completed?: boolean;
	current?: boolean;
}) => {
	if (completed) {
		return (
			<div className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
				<Check className="size-4" />
			</div>
		);
	}
	if (current) {
		return (
			<div className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
				2
			</div>
		);
	}
	return (
		<div className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">
			3
		</div>
	);
};

const AccordionStepHeader = ({
	icon: Icon,
	title,
	completed,
	current,
	summary,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	completed?: boolean;
	current?: boolean;
	summary?: string;
}) => (
	<div className="flex items-center gap-3 flex-1">
		<StepStatus completed={completed} current={current} />
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<span className="font-semibold">{title}</span>
			{summary && <p className="text-sm text-muted-foreground">{summary}</p>}
		</div>
		{completed && (
			<Button variant="ghost" size="sm" className="gap-1">
				<Edit2 className="size-3" />
				Edit
			</Button>
		)}
	</div>
);

const ShippingSpeed = ({
	value,
	name,
	time,
	price,
	best,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	best?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={value} id={value} />
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{name}</span>
				{best && <Badge className="text-xs">Fastest</Badge>}
			</div>
			<span className="text-sm text-muted-foreground">{time}</span>
		</div>
		<span className="font-bold text-primary">{price}</span>
	</Label>
);

const SummaryRow = ({
	label,
	value,
	highlight,
}: {
	label: string;
	value: string;
	highlight?: boolean;
}) => (
	<div className={`flex justify-between ${highlight ? 'font-semibold text-lg' : 'text-sm'}`}>
		<span className={highlight ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={highlight ? 'text-primary' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const shippingOptions = [
		{ value: 'standard', name: 'Standard', time: '5-7 business days', price: 'Free' },
		{ value: 'express', name: 'Express', time: '2-3 business days', price: '$12.99' },
		{ value: 'overnight', name: 'Overnight', time: 'Next business day', price: '$29.99', best: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<Badge variant="outline" className="mb-3">Secure Checkout</Badge>
					<h1 className="text-3xl font-bold">Complete Your Order</h1>
				</div>

				<div className="grid @lg:grid-cols-[1fr_340px] gap-8">
					<div>
						<Accordion type="single" defaultValue="shipping" className="space-y-4">
							<AccordionItem value="address" className="border rounded-xl px-4">
								<AccordionTrigger className="hover:no-underline py-4">
									<AccordionStepHeader
										icon={MapPin}
										title="Shipping Address"
										completed
										summary="123 Main St, New York, NY 10001"
									/>
								</AccordionTrigger>
								<AccordionContent className="pb-4">
									<Card className="bg-muted/30">
										<CardContent className="p-4">
											<p className="font-medium">John Doe</p>
											<p className="text-sm text-muted-foreground">123 Main Street, Apt 4B</p>
											<p className="text-sm text-muted-foreground">New York, NY 10001</p>
											<p className="text-sm text-muted-foreground">United States</p>
										</CardContent>
									</Card>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="shipping" className="border rounded-xl px-4 border-primary">
								<AccordionTrigger className="hover:no-underline py-4">
									<AccordionStepHeader
										icon={Truck}
										title="Shipping Method"
										current
									/>
								</AccordionTrigger>
								<AccordionContent className="pb-4">
									<RadioGroup defaultValue="express" className="space-y-3">
										{shippingOptions.map((option) => (
											<ShippingSpeed key={option.value} {...option} />
										))}
									</RadioGroup>

									<div className="flex gap-3 mt-6">
										<Button variant="outline">Back</Button>
										<Button className="flex-1">Continue to Payment</Button>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="payment" className="border rounded-xl px-4">
								<AccordionTrigger className="hover:no-underline py-4" disabled>
									<AccordionStepHeader
										icon={CreditCard}
										title="Payment Method"
									/>
								</AccordionTrigger>
							</AccordionItem>
						</Accordion>
					</div>

					<Card className="h-fit sticky top-4">
						<CardHeader>
							<CardTitle className="text-base">Order Summary</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3 mb-4">
								<SummaryRow label="Subtotal (3 items)" value="$179.97" />
								<SummaryRow label="Shipping" value="$12.99" />
								<SummaryRow label="Tax" value="$17.37" />
							</div>

							<Separator className="my-4" />

							<SummaryRow label="Total" value="$210.33" highlight />

							<div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/20">
								<div className="flex items-center gap-2 text-sm">
									<Gift className="size-4 text-primary" />
									<span>Free shipping on orders over $200!</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
