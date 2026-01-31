import { Package, Truck, Clock, Check, MapPin, Calendar, ArrowRight, Shield, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ShipmentCard = ({
	shipment,
	items,
	warehouse,
	options,
	selectedOption,
}: {
	shipment: number;
	items: { name: string; image: string; qty: number }[];
	warehouse: string;
	options: { value: string; name: string; time: string; price: string }[];
	selectedOption: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<CardTitle className="text-base flex items-center gap-2">
					<Package className="size-5 text-primary" />
					Shipment {shipment}
				</CardTitle>
				<Badge variant="secondary">{warehouse}</Badge>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex gap-2 mb-4 overflow-x-auto pb-2">
				{items.map((item, i) => (
					<div key={i} className="flex items-center gap-2 shrink-0 p-2 rounded-lg bg-muted/50">
						<Avatar className="size-10 rounded-lg">
							<AvatarImage src={item.image} />
							<AvatarFallback className="rounded-lg">{item.name[0]}</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-medium truncate max-w-[120px]">{item.name}</p>
							<p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
						</div>
					</div>
				))}
			</div>
			<RadioGroup defaultValue={selectedOption} className="grid grid-cols-2 @sm:grid-cols-4 gap-2">
				{options.map((opt) => (
					<Label
						key={opt.value}
						htmlFor={`s${shipment}-${opt.value}`}
						className="flex flex-col items-center p-2 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground transition-all text-center"
					>
						<RadioGroupItem value={opt.value} id={`s${shipment}-${opt.value}`} className="sr-only" />
						<span className="font-medium text-sm">{opt.name}</span>
						<span className="text-xs opacity-70">{opt.time}</span>
						<span className="font-bold mt-1">{opt.price}</span>
					</Label>
				))}
			</RadioGroup>
		</CardContent>
	</Card>
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
	<div className="flex items-center justify-between">
		<span className="text-muted-foreground">{label}</span>
		<span className={highlight ? 'font-bold text-primary text-lg' : 'font-medium'}>{value}</span>
	</div>
);

export default function Main() {
	const shipments = [
		{
			shipment: 1,
			warehouse: 'East Coast',
			items: [
				{ name: 'Wireless Earbuds', image: '/products/earbuds.jpg', qty: 1 },
				{ name: 'Phone Case', image: '/products/case.jpg', qty: 2 },
			],
			options: [
				{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$4.99' },
				{ value: 'express', name: 'Express', time: '2-3 days', price: '$9.99' },
				{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$19.99' },
				{ value: 'pickup', name: 'Pickup', time: '2 hrs', price: 'Free' },
			],
			selectedOption: 'express',
		},
		{
			shipment: 2,
			warehouse: 'West Coast',
			items: [
				{ name: 'Smart Watch', image: '/products/watch.jpg', qty: 1 },
			],
			options: [
				{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$3.99' },
				{ value: 'express', name: 'Express', time: '2-3 days', price: '$7.99' },
				{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$14.99' },
				{ value: 'pickup', name: 'Pickup', time: 'N/A', price: 'N/A' },
			],
			selectedOption: 'standard',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Multi-Shipment Order</h1>
					<p className="text-muted-foreground">Your items will ship from multiple locations</p>
				</div>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-4">
						{shipments.map((shipment) => (
							<ShipmentCard key={shipment.shipment} {...shipment} />
						))}

						<Card className="border-dashed bg-muted/30">
							<CardContent className="p-4 flex items-start gap-3">
								<Info className="size-5 text-muted-foreground shrink-0 mt-0.5" />
								<div>
									<p className="text-sm font-medium">Multiple Shipments</p>
									<p className="text-sm text-muted-foreground">Items ship from different warehouses for faster delivery. Each shipment has its own tracking.</p>
								</div>
							</CardContent>
						</Card>
					</div>

					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Shipping Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<SummaryRow label="Shipment 1 (Express)" value="$9.99" />
								<SummaryRow label="Shipment 2 (Standard)" value="$3.99" />
								<Separator />
								<SummaryRow label="Total Shipping" value="$13.98" highlight />
								<div className="text-sm text-muted-foreground space-y-1 pt-2">
									<div className="flex items-center gap-2">
										<Calendar className="size-4" />
										<span>Est. delivery: Jan 15-18</span>
									</div>
									<div className="flex items-center gap-2">
										<Shield className="size-4" />
										<span>All shipments insured</span>
									</div>
								</div>
								<Button className="w-full mt-4">
									Continue to Payment
									<ArrowRight className="size-4 ml-2" />
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
