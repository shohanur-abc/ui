import { MapPin, Truck, Check, Clock, Package, Edit2, Plus, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const StepIndicator = ({
	steps,
	currentStep,
}: {
	steps: string[];
	currentStep: number;
}) => (
	<div className="flex items-center justify-between mb-8">
		{steps.map((step, i) => (
			<div key={i} className="flex items-center">
				<div className={`
					flex size-8 items-center justify-center rounded-full text-sm font-medium
					${i < currentStep ? 'bg-primary text-primary-foreground' : i === currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
				`}>
					{i < currentStep ? <Check className="size-4" /> : i + 1}
				</div>
				<span className={`ml-2 text-sm hidden @sm:inline ${i <= currentStep ? 'font-medium' : 'text-muted-foreground'}`}>
					{step}
				</span>
				{i < steps.length - 1 && <div className="w-8 @sm:w-12 @md:w-16 h-0.5 mx-2 bg-muted" />}
			</div>
		))}
	</div>
);

const AddressOption = ({
	value,
	label,
	name,
	address,
	isDefault,
}: {
	value: string;
	label: string;
	name: string;
	address: string;
	isDefault?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex-1">
			<div className="flex items-center gap-2 mb-1">
				<span className="font-medium">{label}</span>
				{isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
			</div>
			<p className="text-sm text-muted-foreground">{name}</p>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
		<Button variant="ghost" size="icon">
			<Edit2 className="size-4" />
		</Button>
	</Label>
);

const ShippingOption = ({
	value,
	carrier,
	logo,
	name,
	time,
	price,
	recommended,
}: {
	value: string;
	carrier: string;
	logo: string;
	name: string;
	time: string;
	price: string;
	recommended?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			relative flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all
			hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
			${recommended ? 'ring-2 ring-primary/20' : ''}
		`}
	>
		{recommended && <Badge className="absolute -top-2.5 right-4">Recommended</Badge>}
		<RadioGroupItem value={value} id={value} />
		<Avatar className="size-10">
			<AvatarImage src={logo} />
			<AvatarFallback>{carrier[0]}</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{carrier}</span>
				<span className="text-muted-foreground">·</span>
				<span className="text-sm text-muted-foreground">{name}</span>
			</div>
			<div className="flex items-center gap-1 text-sm text-muted-foreground">
				<Clock className="size-3.5" />
				<span>{time}</span>
			</div>
		</div>
		<span className="text-lg font-bold text-primary">{price}</span>
	</Label>
);

const OrderItem = ({
	name,
	quantity,
	price,
	image,
}: {
	name: string;
	quantity: number;
	price: string;
	image: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="size-12 rounded-lg bg-muted overflow-hidden">
			<img src={image} alt={name} className="size-full object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium truncate">{name}</p>
			<p className="text-sm text-muted-foreground">Qty: {quantity}</p>
		</div>
		<span className="font-medium">{price}</span>
	</div>
);

export default function Main() {
	const steps = ['Cart', 'Shipping', 'Payment', 'Review'];

	const addresses = [
		{ value: 'home', label: 'Home', name: 'John Doe', address: '123 Main St, Apt 4B, New York, NY 10001', isDefault: true },
		{ value: 'work', label: 'Work', name: 'John Doe', address: '456 Business Ave, Floor 12, New York, NY 10002' },
	];

	const shippingOptions = [
		{ value: 'usps', carrier: 'USPS', logo: '/api/placeholder/40/40', name: 'Priority Mail', time: '2-3 days', price: '$7.99' },
		{ value: 'ups', carrier: 'UPS', logo: '/api/placeholder/40/40', name: 'Ground', time: '3-5 days', price: '$9.99', recommended: true },
		{ value: 'fedex', carrier: 'FedEx', logo: '/api/placeholder/40/40', name: 'Express', time: '1-2 days', price: '$15.99' },
	];

	const orderItems = [
		{ name: 'Wireless Headphones', quantity: 1, price: '$79.99', image: '/api/placeholder/48/48' },
		{ name: 'Phone Case', quantity: 2, price: '$29.98', image: '/api/placeholder/48/48' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<StepIndicator steps={steps} currentStep={1} />

				<h1 className="text-3xl font-bold mb-8">Shipping</h1>

				{/* Address Selection */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold flex items-center gap-2">
							<MapPin className="size-5 text-primary" />
							Shipping Address
						</h2>
						<Button variant="outline" size="sm" className="gap-2">
							<Plus className="size-4" />
							Add New
						</Button>
					</div>
					<RadioGroup defaultValue="home" className="space-y-3">
						{addresses.map((addr) => (
							<AddressOption key={addr.value} {...addr} />
						))}
					</RadioGroup>
				</div>

				<Separator className="my-6" />

				{/* Shipping Method */}
				<div className="mb-8">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Truck className="size-5 text-primary" />
						Shipping Method
					</h2>
					<RadioGroup defaultValue="ups" className="space-y-3">
						{shippingOptions.map((option) => (
							<ShippingOption key={option.value} {...option} />
						))}
					</RadioGroup>
				</div>

				<Separator className="my-6" />

				{/* Order Summary */}
				<Card className="mb-8 bg-muted/30">
					<CardHeader className="pb-2">
						<CardTitle className="text-base flex items-center gap-2">
							<Package className="size-5 text-primary" />
							Order Summary
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{orderItems.map((item, i) => (
							<OrderItem key={i} {...item} />
						))}
					</CardContent>
				</Card>

				<Button className="w-full h-12 text-base">
					Continue to Payment
					<ChevronRight className="size-5 ml-2" />
				</Button>
			</div>
		</section>
	);
}
