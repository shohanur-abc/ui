import {
	Package,
	HelpCircle,
	Truck,
	Clock,
	Shield,
	Leaf,
	Gift,
	Star,
	Check,
	Info,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const FAQItem = ({
	question,
	answer,
}: {
	question: string;
	answer: string;
}) => (
	<AccordionItem value={question} className="border-b-0">
		<AccordionTrigger className="hover:no-underline py-3 text-left">
			<span className="font-medium">{question}</span>
		</AccordionTrigger>
		<AccordionContent className="text-muted-foreground pb-3">
			{answer}
		</AccordionContent>
	</AccordionItem>
);

const ShippingOption = ({
	icon: Icon,
	name,
	time,
	price,
	selected,
	onClick,
}: {
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	selected?: boolean;
	onClick?: () => void;
}) => (
	<button
		type="button"
		onClick={onClick}
		className={`
			flex items-center gap-3 p-4 rounded-xl border-2 transition-all w-full text-left
			${selected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}
		`}
	>
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
		>
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<span className="font-medium">{name}</span>
			<div className="flex items-center gap-1 text-sm text-muted-foreground">
				<Clock className="size-3.5" />
				<span>{time}</span>
			</div>
		</div>
		<span className="font-bold text-primary">{price}</span>
		{selected && <Check className="size-5 text-primary" />}
	</button>
);

export default function Main() {
	const faqs = [
		{
			question: 'What carriers do you use?',
			answer:
				'We partner with major carriers including FedEx, UPS, USPS, and DHL to ensure reliable delivery across all regions. The specific carrier is selected based on your location and chosen shipping speed.',
		},
		{
			question: 'Can I change my shipping address after ordering?',
			answer:
				"You can modify your shipping address within 1 hour of placing your order. After that, please contact our support team and we'll do our best to accommodate your request before the order ships.",
		},
		{
			question: 'Do you offer international shipping?',
			answer:
				'Yes! We ship to over 100 countries worldwide. International shipping rates and delivery times vary by destination. Import duties and taxes may apply and are the responsibility of the recipient.',
		},
		{
			question: 'What if my package is lost or damaged?',
			answer:
				'All orders include basic carrier liability coverage. We recommend adding Shipping Insurance for full protection. If your package is lost or damaged, contact us within 48 hours of expected delivery for a full refund or replacement.',
		},
		{
			question: 'Can I track my order?',
			answer:
				"Yes, you'll receive a tracking number via email once your order ships. You can track your package in real-time through our website or the carrier's tracking page.",
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Shipping Method
					</h1>
					<p className="text-muted-foreground">
						Select your preferred shipping option
					</p>
				</div>

				<div className="space-y-3 mb-8">
					<ShippingOption
						icon={Package}
						name="Standard"
						time="5-7 days"
						price="$5.99"
					/>
					<ShippingOption
						icon={Truck}
						name="Express"
						time="2-3 days"
						price="$12.99"
						selected
					/>
					<ShippingOption
						icon={Star}
						name="Overnight"
						time="1 day"
						price="$24.99"
					/>
				</div>

				<div className="p-4 rounded-xl bg-muted/50 mb-8">
					<div className="flex items-center gap-2 mb-3">
						<Info className="size-5 text-primary" />
						<span className="font-medium">Included with Express:</span>
					</div>
					<div className="grid @sm:grid-cols-2 gap-2">
						{[
							'Real-time tracking',
							'SMS notifications',
							'Signature required',
							'Insurance up to $100',
						].map((feature, i) => (
							<div key={i} className="flex items-center gap-2 text-sm">
								<Check className="size-4 text-primary" />
								<span>{feature}</span>
							</div>
						))}
					</div>
				</div>

				<Separator className="my-8" />

				<div className="mb-6">
					<div className="flex items-center gap-2 mb-4">
						<HelpCircle className="size-5 text-primary" />
						<h2 className="text-lg font-semibold">
							Frequently Asked Questions
						</h2>
					</div>
					<Accordion
						type="single"
						collapsible
						className="border rounded-xl px-4"
					>
						{faqs.map((faq) => (
							<FAQItem key={faq.question} {...faq} />
						))}
					</Accordion>
				</div>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
