import {
	Check,
	ChevronLeft,
	ChevronRight,
	Home,
	Truck,
	CreditCard,
	PartyPopper,
	Clock,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const MobileProgress = ({
	current,
	total,
	label,
}: {
	current: number;
	total: number;
	label: string;
}) => (
	<div className="flex items-center gap-3 mb-6">
		<div className="flex gap-1">
			{Array.from({ length: total }).map((_, i) => (
				<div
					key={i}
					className={`h-1 w-6 rounded-full ${i < current ? 'bg-primary' : 'bg-muted'}`}
				/>
			))}
		</div>
		<span className="text-sm text-muted-foreground">{label}</span>
	</div>
);

const CompactShippingOption = ({
	value,
	icon: Icon,
	label,
	time,
	price,
	best,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	time: string;
	price: string;
	best?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
			<Icon className="size-5 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{label}</span>
				{best && <Badge className="text-xs">Best</Badge>}
			</div>
			<div className="flex items-center gap-1 text-sm text-muted-foreground">
				<Clock className="size-3" />
				{time}
			</div>
		</div>
		<span className="font-bold text-primary">{price}</span>
	</Label>
);

const AddressSummary = ({
	type,
	name,
	address,
	onEdit,
}: {
	type: string;
	name: string;
	address: string;
	onEdit?: () => void;
}) => (
	<Card className="bg-muted/30">
		<CardContent className="p-4">
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Home className="size-5" />
					</div>
					<div>
						<p className="font-medium">{type}</p>
						<p className="text-sm text-muted-foreground">{name}</p>
						<p className="text-sm text-muted-foreground">{address}</p>
					</div>
				</div>
				<Button variant="ghost" size="sm" onClick={onEdit}>
					Edit
				</Button>
			</div>
		</CardContent>
	</Card>
);

const OrderSummary = ({
	items,
	total,
}: {
	items: { label: string; value: string }[];
	total: { label: string; value: string };
}) => (
	<Card className="bg-muted/30">
		<CardHeader className="pb-2">
			<CardTitle className="text-base">Order Summary</CardTitle>
		</CardHeader>
		<CardContent className="pb-4">
			<div className="space-y-2">
				{items.map((item, i) => (
					<div key={i} className="flex justify-between text-sm">
						<span className="text-muted-foreground">{item.label}</span>
						<span>{item.value}</span>
					</div>
				))}
			</div>
			<Separator className="my-3" />
			<div className="flex justify-between font-semibold">
				<span>{total.label}</span>
				<span className="text-primary">{total.value}</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const shippingOptions = [
		{
			value: 'free',
			icon: Truck,
			label: 'Free Shipping',
			time: '5-7 days',
			price: '$0.00',
		},
		{
			value: 'express',
			icon: Truck,
			label: 'Express',
			time: '2-3 days',
			price: '$12.99',
			best: true,
		},
		{
			value: 'overnight',
			icon: Truck,
			label: 'Overnight',
			time: '1 day',
			price: '$29.99',
		},
	];

	const summaryItems = [
		{ label: 'Subtotal (3 items)', value: '$159.97' },
		{ label: 'Shipping', value: '$12.99' },
		{ label: 'Tax', value: '$14.40' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<MobileProgress current={2} total={4} label="Step 2 of 4" />

				<h1 className="text-2xl font-bold mb-6">Shipping Method</h1>

				<div className="space-y-6">
					<AddressSummary
						type="Ship to"
						name="John Doe"
						address="123 Main St, Apt 4B, New York, NY 10001"
					/>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Select Shipping</CardTitle>
						</CardHeader>
						<CardContent>
							<RadioGroup defaultValue="express" className="space-y-3">
								{shippingOptions.map((option) => (
									<CompactShippingOption key={option.value} {...option} />
								))}
							</RadioGroup>
						</CardContent>
					</Card>

					<OrderSummary
						items={summaryItems}
						total={{ label: 'Total', value: '$187.36' }}
					/>
				</div>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" size="lg" className="gap-2">
						<ChevronLeft className="size-4" />
						Back
					</Button>
					<Button size="lg" className="flex-1 gap-2">
						Continue
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
