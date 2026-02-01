import {
	Truck,
	Shield,
	Gift,
	Leaf,
	Recycle,
	Heart,
	Clock,
	Check,
	Plus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const AddonCard = ({
	id,
	icon: Icon,
	title,
	description,
	price,
	popular,
}: {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	price: string;
	popular?: boolean;
}) => (
	<Label htmlFor={id} className="cursor-pointer">
		<Card
			className={`
				relative h-full transition-all hover:shadow-md hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${popular ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{popular && <Badge className="absolute -top-2.5 right-4">Popular</Badge>}
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<Checkbox id={id} className="mt-1" />
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Icon className="size-5" />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center justify-between gap-2">
							<span className="font-semibold">{title}</span>
							<span className="font-bold text-primary shrink-0">{price}</span>
						</div>
						<p className="text-sm text-muted-foreground mt-1">{description}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const ShippingOption = ({
	id,
	name,
	time,
	price,
	selected,
}: {
	id: string;
	name: string;
	time: string;
	price: string;
	selected?: boolean;
}) => (
	<Label
		htmlFor={id}
		className={`
			flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
			hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground
		`}
	>
		<div className="flex items-center gap-3">
			<Checkbox id={id} className="rounded-full" defaultChecked={selected} />
			<div>
				<span className="font-medium">{name}</span>
				<div className="flex items-center gap-1 text-sm opacity-70">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
			</div>
		</div>
		<span className="font-bold">{price}</span>
	</Label>
);

export default function Main() {
	const addons = [
		{
			id: 'insurance',
			icon: Shield,
			title: 'Shipping Insurance',
			description: 'Protection up to $200',
			price: '+$3.99',
			popular: true,
		},
		{
			id: 'gift',
			icon: Gift,
			title: 'Gift Wrapping',
			description: 'Premium gift wrap with ribbon',
			price: '+$4.99',
		},
		{
			id: 'carbon',
			icon: Leaf,
			title: 'Carbon Neutral',
			description: 'Offset shipping emissions',
			price: '+$0.99',
		},
		{
			id: 'recycle',
			icon: Recycle,
			title: 'Eco Packaging',
			description: '100% recyclable materials',
			price: '+$1.99',
		},
		{
			id: 'priority',
			icon: Truck,
			title: 'Priority Handling',
			description: 'Your order ships first',
			price: '+$2.99',
		},
		{
			id: 'charity',
			icon: Heart,
			title: 'Round Up for Charity',
			description: 'Donate to a good cause',
			price: '+$1.00',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Shipping Add-ons
					</h1>
					<p className="text-muted-foreground">
						Enhance your shipping experience
					</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Shipping Speed</CardTitle>
					</CardHeader>
					<CardContent className="grid @sm:grid-cols-3 gap-3">
						<ShippingOption
							id="standard"
							name="Standard"
							time="5-7 days"
							price="$5.99"
						/>
						<ShippingOption
							id="express"
							name="Express"
							time="2-3 days"
							price="$12.99"
							selected
						/>
						<ShippingOption
							id="overnight"
							name="Overnight"
							time="1 day"
							price="$24.99"
						/>
					</CardContent>
				</Card>

				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Plus className="size-5 text-primary" />
						Optional Extras
					</h2>
					<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
						{addons.map((addon) => (
							<AddonCard key={addon.id} {...addon} />
						))}
					</div>
				</div>

				<Separator className="my-8" />

				<div className="flex items-center justify-between">
					<div>
						<span className="text-sm text-muted-foreground">
							Estimated Total
						</span>
						<p className="text-2xl font-bold">$16.98</p>
					</div>
					<div className="flex gap-3">
						<Button variant="outline">Back</Button>
						<Button>Continue to Payment</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
