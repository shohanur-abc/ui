import { Globe2, Plane, Ship, AlertCircle, Clock, Check, FileText, DollarSign } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const ShippingMethodRadio = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	features,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	features: string[];
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center justify-between mb-1">
				<span className="font-semibold">{name}</span>
				<span className="font-bold text-primary">{price}</span>
			</div>
			<div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
				<Clock className="size-3.5" />
				<span>{time}</span>
			</div>
			<div className="flex flex-wrap gap-1">
				{features.map((f, i) => (
					<Badge key={i} variant="secondary" className="text-xs font-normal">{f}</Badge>
				))}
			</div>
		</div>
	</Label>
);

export default function Main() {
	const shippingMethods = [
		{ value: 'economy', icon: Ship, name: 'Economy Sea Freight', time: '30-45 days', price: '$29.99', features: ['Tracking', 'Insurance'] },
		{ value: 'standard', icon: Globe2, name: 'Standard Air', time: '14-21 days', price: '$49.99', features: ['Full tracking', 'Insurance included'] },
		{ value: 'express', icon: Plane, name: 'Express Air', time: '5-7 days', price: '$79.99', features: ['Priority handling', 'Customs cleared'] },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<Globe2 className="size-8 text-primary" />
					<div>
						<h1 className="text-2xl font-bold">International Shipping</h1>
						<p className="text-muted-foreground">Shipping to United Kingdom</p>
					</div>
				</div>

				<Accordion type="multiple" defaultValue={['country', 'method']} className="space-y-4">
					<AccordionItem value="country" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<span className="text-2xl">🇬🇧</span>
								<div className="text-left">
									<span className="font-semibold">Destination Country</span>
									<p className="text-sm text-muted-foreground">United Kingdom</p>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<Label className="mb-2 block">Select Country</Label>
							<Select defaultValue="uk">
								<SelectTrigger>
									<SelectValue placeholder="Select country" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
									<SelectItem value="de">🇩🇪 Germany</SelectItem>
									<SelectItem value="fr">🇫🇷 France</SelectItem>
									<SelectItem value="jp">🇯🇵 Japan</SelectItem>
									<SelectItem value="au">🇦🇺 Australia</SelectItem>
								</SelectContent>
							</Select>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="method" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<Plane className="size-5 text-primary" />
								<span className="font-semibold">Shipping Method</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<RadioGroup defaultValue="standard" className="space-y-3">
								{shippingMethods.map((method) => (
									<ShippingMethodRadio key={method.value} {...method} />
								))}
							</RadioGroup>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="customs" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<FileText className="size-5 text-primary" />
								<div className="text-left">
									<span className="font-semibold">Customs & Duties</span>
									<Badge variant="secondary" className="ml-2">Important</Badge>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4 space-y-4">
							<Alert>
								<AlertCircle className="size-4" />
								<AlertDescription>
									Import duties and taxes may apply and are the responsibility of the recipient.
								</AlertDescription>
							</Alert>
							<div className="space-y-3 text-sm">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Estimated Duties</span>
									<span className="font-medium">$12.50 - $25.00</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">VAT (20%)</span>
									<span className="font-medium">~$18.00</span>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<span className="font-medium">Est. Total on Delivery</span>
									<span className="font-bold">$30.50 - $43.00</span>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="restrictions" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<AlertCircle className="size-5 text-primary" />
								<span className="font-semibold">Shipping Restrictions</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<ul className="space-y-2 text-sm">
								<li className="flex items-start gap-2">
									<Check className="size-4 text-green-500 mt-0.5 shrink-0" />
									<span>All items in your order can be shipped to UK</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="size-4 text-green-500 mt-0.5 shrink-0" />
									<span>No restricted items detected</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="size-4 text-green-500 mt-0.5 shrink-0" />
									<span>Electronics warranty valid internationally</span>
								</li>
							</ul>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
