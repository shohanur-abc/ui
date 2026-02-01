import {
	Package,
	Shield,
	Gift,
	Leaf,
	Clock,
	Check,
	Info,
	HelpCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

const AddonAccordion = ({
	value,
	icon: Icon,
	title,
	description,
	price,
	details,
	recommended,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	price: string;
	details: string[];
	recommended?: boolean;
}) => (
	<AccordionItem
		value={value}
		className={`border rounded-xl ${recommended ? 'ring-2 ring-primary/30' : ''}`}
	>
		<div className="flex items-center gap-3 px-4 py-3">
			<Checkbox id={value} />
			<AccordionTrigger className="hover:no-underline flex-1 py-0">
				<div className="flex items-center gap-3 w-full">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Icon className="size-5" />
					</div>
					<div className="flex-1 text-left">
						<div className="flex items-center gap-2">
							<span className="font-medium">{title}</span>
							{recommended && <Badge className="text-xs">Recommended</Badge>}
						</div>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
					<span className="font-bold text-primary mr-2">{price}</span>
				</div>
			</AccordionTrigger>
		</div>
		<AccordionContent className="px-4 pb-4">
			<div className="pl-14 space-y-2">
				{details.map((detail, i) => (
					<div key={i} className="flex items-center gap-2 text-sm">
						<Check className="size-4 text-primary shrink-0" />
						<span>{detail}</span>
					</div>
				))}
			</div>
		</AccordionContent>
	</AccordionItem>
);

export default function Main() {
	const addons = [
		{
			value: 'insurance',
			icon: Shield,
			title: 'Shipping Insurance',
			description: 'Protect your order against loss or damage',
			price: '+$3.99',
			recommended: true,
			details: [
				'Coverage up to $200',
				'Full refund if package is lost',
				'Damage protection included',
				'Easy claims process',
			],
		},
		{
			value: 'gift',
			icon: Gift,
			title: 'Gift Wrapping',
			description: 'Premium gift wrap with custom message',
			price: '+$5.99',
			details: [
				'Premium wrapping paper',
				'Decorative ribbon',
				'Custom gift message',
				'Price hidden from receipt',
			],
		},
		{
			value: 'carbon',
			icon: Leaf,
			title: 'Carbon Neutral Shipping',
			description: 'Offset the carbon footprint of your delivery',
			price: '+$0.99',
			details: [
				'100% carbon offset',
				'Supports renewable energy projects',
				'Verified by third party',
				'Certificate provided',
			],
		},
		{
			value: 'express',
			icon: Package,
			title: 'Express Upgrade',
			description: 'Upgrade to express shipping',
			price: '+$7.00',
			details: [
				'2-3 day delivery instead of 5-7',
				'Priority handling',
				'Real-time tracking updates',
				'Dedicated support line',
			],
		},
	];

	const selectedTotal = 3.99 + 0.99;

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Shipping Add-ons
					</h1>
					<p className="text-muted-foreground">
						Customize your shipping experience
					</p>
				</div>

				<TooltipProvider>
					<Accordion type="multiple" className="space-y-3">
						{addons.map((addon) => (
							<AddonAccordion key={addon.value} {...addon} />
						))}
					</Accordion>
				</TooltipProvider>

				<Separator className="my-6" />

				<div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 mb-6">
					<div>
						<p className="text-sm text-muted-foreground">Add-ons Total</p>
						<p className="text-2xl font-bold">${selectedTotal.toFixed(2)}</p>
					</div>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon">
								<HelpCircle className="size-5 text-muted-foreground" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>This amount will be added to your shipping cost</p>
						</TooltipContent>
					</Tooltip>
				</div>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1">
						Skip Add-ons
					</Button>
					<Button className="flex-1">Continue with Add-ons</Button>
				</div>
			</div>
		</section>
	);
}
