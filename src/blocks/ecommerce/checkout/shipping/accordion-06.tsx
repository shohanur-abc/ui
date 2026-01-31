import { Package, Clock, Truck, MapPin, Check, Calendar, User, Phone, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const FormSection = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<div className="space-y-4">
		<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</h3>
		{children}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Shipping Details</h1>
					<p className="text-muted-foreground">Complete all sections to continue</p>
				</div>

				<Accordion type="multiple" defaultValue={['contact', 'address']} className="space-y-4">
					<AccordionItem value="contact" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</div>
								<div className="text-left">
									<span className="font-semibold">Contact Information</span>
									<p className="text-sm text-muted-foreground">How can we reach you?</p>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4 space-y-4">
							<div className="grid @sm:grid-cols-2 gap-4">
								<div>
									<Label>First Name</Label>
									<Input placeholder="John" />
								</div>
								<div>
									<Label>Last Name</Label>
									<Input placeholder="Doe" />
								</div>
							</div>
							<div>
								<Label>Email</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
									<Input placeholder="john@example.com" className="pl-10" />
								</div>
							</div>
							<div>
								<Label>Phone</Label>
								<div className="relative">
									<Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
									<Input placeholder="(555) 123-4567" className="pl-10" />
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="address" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</div>
								<div className="text-left">
									<span className="font-semibold">Delivery Address</span>
									<p className="text-sm text-muted-foreground">Where should we deliver?</p>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4 space-y-4">
							<div>
								<Label>Street Address</Label>
								<Input placeholder="123 Main Street" />
							</div>
							<div>
								<Label>Apartment, Suite, etc. (optional)</Label>
								<Input placeholder="Apt 4B" />
							</div>
							<div className="grid @sm:grid-cols-3 gap-4">
								<div>
									<Label>City</Label>
									<Input placeholder="New York" />
								</div>
								<div>
									<Label>State</Label>
									<Input placeholder="NY" />
								</div>
								<div>
									<Label>ZIP Code</Label>
									<Input placeholder="10001" />
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="method" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-bold">3</div>
								<div className="text-left">
									<span className="font-semibold">Shipping Method</span>
									<p className="text-sm text-muted-foreground">Choose delivery speed</p>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<RadioGroup defaultValue="express" className="space-y-2">
								{[
									{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
									{ value: 'express', name: 'Express', time: '2-3 days', price: '$12.99' },
									{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$24.99' },
								].map((opt) => (
									<Label
										key={opt.value}
										htmlFor={opt.value}
										className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
									>
										<div className="flex items-center gap-3">
											<RadioGroupItem value={opt.value} id={opt.value} />
											<span className="font-medium">{opt.name}</span>
											<span className="text-sm text-muted-foreground">{opt.time}</span>
										</div>
										<span className="font-bold text-primary">{opt.price}</span>
									</Label>
								))}
							</RadioGroup>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="instructions" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-bold">4</div>
								<div className="text-left">
									<span className="font-semibold">Delivery Instructions</span>
									<Badge variant="secondary" className="ml-2 text-xs">Optional</Badge>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<Textarea placeholder="E.g., Leave at front door, ring doorbell, etc." rows={3} />
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
