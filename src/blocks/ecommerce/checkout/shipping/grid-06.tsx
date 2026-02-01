import { Package, Truck, Clock, Check, Info, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProductShippingCard = ({
	product,
	image,
	options,
	selected,
}: {
	product: string;
	image: string;
	options: { value: string; name: string; time: string; price: string }[];
	selected: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-3 mb-4">
				<Avatar className="rounded-lg size-12">
					<AvatarImage src={image} />
					<AvatarFallback className="rounded-lg">{product[0]}</AvatarFallback>
				</Avatar>
				<div>
					<h3 className="font-semibold">{product}</h3>
					<p className="text-sm text-muted-foreground">
						Select shipping for this item
					</p>
				</div>
			</div>
			<RadioGroup
				defaultValue={selected}
				className="grid grid-cols-2 @sm:grid-cols-4 gap-2"
			>
				{options.map((opt) => (
					<Label
						key={opt.value}
						htmlFor={`${product}-${opt.value}`}
						className="flex flex-col items-center p-2 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all text-center"
					>
						<RadioGroupItem
							value={opt.value}
							id={`${product}-${opt.value}`}
							className="sr-only"
						/>
						<span className="font-medium text-sm">{opt.name}</span>
						<span className="text-xs text-muted-foreground">{opt.time}</span>
						<span className="text-sm font-bold text-primary mt-1">
							{opt.price}
						</span>
					</Label>
				))}
			</RadioGroup>
		</CardContent>
	</Card>
);

const BundleOption = ({
	value,
	title,
	description,
	savings,
	deliveries,
	totalPrice,
}: {
	value: string;
	title: string;
	description: string;
	savings?: string;
	deliveries: { items: number; date: string }[];
	totalPrice: string;
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className={`
				h-full transition-all hover:shadow-md hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${savings ? 'ring-2 ring-green-500/30' : ''}
			`}
		>
			{savings && (
				<Badge className="absolute -top-2.5 right-4 bg-green-600">
					Save {savings}
				</Badge>
			)}
			<CardContent className="p-4 relative">
				<div className="flex items-start gap-3">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex-1">
						<h3 className="font-semibold">{title}</h3>
						<p className="text-sm text-muted-foreground mb-3">{description}</p>
						<div className="space-y-1">
							{deliveries.map((d, i) => (
								<div key={i} className="flex items-center gap-2 text-sm">
									<Package className="size-3.5 text-muted-foreground" />
									<span>{d.items} items</span>
									<span className="text-muted-foreground">·</span>
									<span className="text-muted-foreground">{d.date}</span>
								</div>
							))}
						</div>
						<div className="mt-3 pt-3 border-t flex items-center justify-between">
							<span className="text-sm text-muted-foreground">
								Total shipping
							</span>
							<span className="font-bold text-primary">{totalPrice}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

export default function Main() {
	const products = [
		{
			product: 'Wireless Headphones',
			image: '/products/headphones.jpg',
			selected: 'express',
			options: [
				{
					value: 'standard',
					name: 'Standard',
					time: '5-7 days',
					price: '$3.99',
				},
				{ value: 'express', name: 'Express', time: '2-3 days', price: '$7.99' },
				{
					value: 'overnight',
					name: 'Overnight',
					time: '1 day',
					price: '$14.99',
				},
				{ value: 'pickup', name: 'Pickup', time: '2 hours', price: 'Free' },
			],
		},
		{
			product: 'Smart Watch',
			image: '/products/watch.jpg',
			selected: 'standard',
			options: [
				{
					value: 'standard',
					name: 'Standard',
					time: '5-7 days',
					price: '$3.99',
				},
				{ value: 'express', name: 'Express', time: '2-3 days', price: '$7.99' },
				{
					value: 'overnight',
					name: 'Overnight',
					time: '1 day',
					price: '$14.99',
				},
				{ value: 'pickup', name: 'Pickup', time: '2 hours', price: 'Free' },
			],
		},
	];

	const bundleOptions = [
		{
			value: 'separate',
			title: 'Ship Items Separately',
			description: 'Each item ships as soon as available',
			deliveries: [
				{ items: 1, date: 'Jan 15' },
				{ items: 1, date: 'Jan 18' },
			],
			totalPrice: '$11.98',
		},
		{
			value: 'together',
			title: 'Ship Together',
			description: 'Wait for all items to ship at once',
			savings: '$3.99',
			deliveries: [{ items: 2, date: 'Jan 20' }],
			totalPrice: '$7.99',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Shipping Options
					</h1>
					<p className="text-muted-foreground">
						Choose shipping for each item or bundle
					</p>
				</div>

				<div className="space-y-4 mb-8">
					{products.map((product, i) => (
						<ProductShippingCard key={i} {...product} />
					))}
				</div>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Bundle Options</CardTitle>
						<CardDescription>
							Ship items together to save on shipping
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RadioGroup
							defaultValue="together"
							className="grid @md:grid-cols-2 gap-4"
						>
							{bundleOptions.map((option) => (
								<BundleOption key={option.value} {...option} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<div className="flex gap-3 justify-center">
					<Button variant="outline">Back</Button>
					<Button>Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
