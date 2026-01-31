import { Package, Truck, Clock, Check, Calendar, AlertCircle, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const MultiPackageTimeline = ({
	packages,
}: {
	packages: {
		id: string;
		items: { name: string; image: string }[];
		status: 'processing' | 'shipped' | 'delivered';
		eta: string;
		carrier: string;
	}[];
}) => (
	<div className="space-y-6">
		{packages.map((pkg, pkgIdx) => (
			<div key={pkg.id} className="relative">
				<div className="flex items-center gap-3 mb-3">
					<div className={`flex size-8 items-center justify-center rounded-full ${
						pkg.status === 'delivered' ? 'bg-green-500' : pkg.status === 'shipped' ? 'bg-blue-500' : 'bg-amber-500'
					} text-white`}>
						{pkg.status === 'delivered' ? <Check className="size-4" /> : <Package className="size-4" />}
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-medium">Package {pkgIdx + 1}</span>
							<Badge variant={pkg.status === 'delivered' ? 'default' : 'secondary'} className="text-xs capitalize">
								{pkg.status}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">{pkg.carrier} • {pkg.eta}</p>
					</div>
				</div>
				<div className="ml-11 flex gap-2 overflow-x-auto pb-2">
					{pkg.items.map((item, i) => (
						<div key={i} className="flex items-center gap-2 shrink-0 p-2 rounded-lg bg-muted/50">
							<Avatar className="size-8 rounded-lg">
								<AvatarImage src={item.image} />
								<AvatarFallback className="rounded-lg text-xs">{item.name[0]}</AvatarFallback>
							</Avatar>
							<span className="text-sm font-medium truncate max-w-[100px]">{item.name}</span>
						</div>
					))}
				</div>
				{pkgIdx < packages.length - 1 && <Separator className="mt-4" />}
			</div>
		))}
	</div>
);

const DeliveryDate = ({
	value,
	day,
	date,
	month,
	price,
	fastest,
}: {
	value: string;
	day: string;
	date: string;
	month: string;
	price: string;
	fastest?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			relative flex flex-col items-center p-3 min-w-[80px] rounded-xl border-2 cursor-pointer transition-all
			hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground
		`}
	>
		{fastest && <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs">Fastest</Badge>}
		<RadioGroupItem value={value} id={value} className="sr-only" />
		<span className="text-xs uppercase opacity-70">{day}</span>
		<span className="text-2xl font-bold">{date}</span>
		<span className="text-xs opacity-70">{month}</span>
		<span className="text-xs font-medium mt-1">{price}</span>
	</Label>
);

export default function Main() {
	const packages = [
		{
			id: 'pkg-1',
			items: [
				{ name: 'Wireless Earbuds', image: '/products/earbuds.jpg' },
				{ name: 'Phone Case', image: '/products/case.jpg' },
			],
			status: 'shipped' as const,
			eta: 'Arrives Jan 17',
			carrier: 'FedEx',
		},
		{
			id: 'pkg-2',
			items: [
				{ name: 'Smart Watch', image: '/products/watch.jpg' },
			],
			status: 'processing' as const,
			eta: 'Ships Jan 20',
			carrier: 'UPS',
		},
	];

	const dates = [
		{ value: 'd1', day: 'Mon', date: '15', month: 'Jan', price: '$14.99', fastest: true },
		{ value: 'd2', day: 'Tue', date: '16', month: 'Jan', price: '$9.99' },
		{ value: 'd3', day: 'Wed', date: '17', month: 'Jan', price: '$7.99' },
		{ value: 'd4', day: 'Thu', date: '18', month: 'Jan', price: '$5.99' },
		{ value: 'd5', day: 'Fri', date: '19', month: 'Jan', price: 'Free' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-8">Shipping & Tracking</h1>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Package className="size-5 text-primary" />
							Your Packages
						</CardTitle>
					</CardHeader>
					<CardContent>
						<MultiPackageTimeline packages={packages} />
					</CardContent>
				</Card>

				<Alert className="mb-6">
					<AlertCircle className="size-4" />
					<AlertDescription>
						Package 2 is being prepared. Select a delivery date for when all items are ready.
					</AlertDescription>
				</Alert>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="size-5 text-primary" />
							Preferred Delivery Date
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="d3" className="flex gap-2 overflow-x-auto pb-2">
							{dates.map((date) => (
								<DeliveryDate key={date.value} {...date} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Button className="w-full h-12 text-base">
					Confirm Shipping
					<ArrowRight className="size-5 ml-2" />
				</Button>
			</div>
		</section>
	);
}
