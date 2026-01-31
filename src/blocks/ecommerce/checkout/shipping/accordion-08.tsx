import { Package, Truck, Clock, MapPin, Check, AlertTriangle, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const ItemShipping = ({
	item,
	image,
	options,
	defaultOption,
	delay,
}: {
	item: string;
	image: string;
	options: { value: string; name: string; time: string; price: string }[];
	defaultOption: string;
	delay?: string;
}) => (
	<AccordionItem value={item} className="border rounded-xl px-4">
		<AccordionTrigger className="hover:no-underline py-4">
			<div className="flex items-center gap-3 w-full">
				<Avatar className="size-12 rounded-lg">
					<AvatarImage src={image} />
					<AvatarFallback className="rounded-lg">{item[0]}</AvatarFallback>
				</Avatar>
				<div className="flex-1 text-left">
					<div className="flex items-center gap-2">
						<span className="font-medium">{item}</span>
						{delay && <Badge variant="outline" className="text-amber-600 border-amber-300">Pre-order</Badge>}
					</div>
					<p className="text-sm text-muted-foreground">Select shipping method</p>
				</div>
			</div>
		</AccordionTrigger>
		<AccordionContent className="pb-4">
			{delay && (
				<Alert className="mb-4 border-amber-300 bg-amber-50 dark:bg-amber-950/20">
					<AlertTriangle className="size-4 text-amber-600" />
					<AlertDescription className="text-amber-700 dark:text-amber-400">
						This item ships in {delay}. Other items may ship earlier.
					</AlertDescription>
				</Alert>
			)}
			<RadioGroup defaultValue={defaultOption} className="space-y-2">
				{options.map((opt) => (
					<Label
						key={opt.value}
						htmlFor={`${item}-${opt.value}`}
						className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
					>
						<div className="flex items-center gap-3">
							<RadioGroupItem value={opt.value} id={`${item}-${opt.value}`} />
							<span className="font-medium">{opt.name}</span>
							<span className="text-sm text-muted-foreground">{opt.time}</span>
						</div>
						<span className="font-bold text-primary">{opt.price}</span>
					</Label>
				))}
			</RadioGroup>
		</AccordionContent>
	</AccordionItem>
);

export default function Main() {
	const items = [
		{
			item: 'Wireless Earbuds Pro',
			image: '/products/earbuds.jpg',
			defaultOption: 'express',
			options: [
				{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$3.99' },
				{ value: 'express', name: 'Express', time: '2-3 days', price: '$7.99' },
				{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$14.99' },
			],
		},
		{
			item: 'Smart Watch Series 5',
			image: '/products/watch.jpg',
			defaultOption: 'standard',
			delay: '2 weeks',
			options: [
				{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$4.99' },
				{ value: 'express', name: 'Express', time: '2-3 days', price: '$9.99' },
			],
		},
		{
			item: 'Phone Case - Black',
			image: '/products/case.jpg',
			defaultOption: 'standard',
			options: [
				{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$2.99' },
				{ value: 'express', name: 'Express', time: '2-3 days', price: '$5.99' },
				{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$9.99' },
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Item Shipping</h1>
					<p className="text-muted-foreground">Choose shipping for each item individually</p>
				</div>

				<Accordion type="multiple" defaultValue={[items[0].item]} className="space-y-4">
					{items.map((item) => (
						<ItemShipping key={item.item} {...item} />
					))}
				</Accordion>

				<Separator className="my-6" />

				<div className="p-4 rounded-xl bg-muted/50 mb-6">
					<div className="flex items-start gap-3">
						<Info className="size-5 text-muted-foreground shrink-0 mt-0.5" />
						<div className="text-sm text-muted-foreground">
							<p className="font-medium text-foreground mb-1">Shipping Summary</p>
							<p>Items will be shipped separately based on availability. You'll receive tracking for each package.</p>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between p-4 rounded-xl border mb-6">
					<div>
						<p className="text-sm text-muted-foreground">Total Shipping</p>
						<p className="text-2xl font-bold">$16.97</p>
					</div>
					<Badge variant="secondary">3 packages</Badge>
				</div>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
