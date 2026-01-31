'use client';

import { ArrowRight, Building2, Check, CreditCard, DollarSign, FileText, Lock, Receipt, Shield, Upload } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface PaymentTerm {
	id: string;
	name: string;
	description: string;
	discount?: string;
}

const CompanyInfoContent = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Company Name</Label>
			<div className="relative">
				<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Acme Corporation" className="pl-10" />
			</div>
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Tax ID / VAT Number</Label>
				<Input placeholder="US123456789" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">D-U-N-S Number</Label>
				<Input placeholder="12-345-6789" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Billing Email</Label>
			<Input type="email" placeholder="billing@acme.com" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Accounts Payable Contact</Label>
			<Input placeholder="John Smith" />
		</div>
	</div>
);

const BillingAddressContent = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Street Address</Label>
			<Input placeholder="123 Business Park Drive" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Suite / Floor</Label>
			<Input placeholder="Suite 500" />
		</div>
		<div className="grid grid-cols-3 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">City</Label>
				<Input placeholder="San Francisco" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">State</Label>
				<Input placeholder="CA" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">ZIP</Label>
				<Input placeholder="94105" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Country</Label>
			<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
				<option>United States</option>
				<option>Canada</option>
				<option>United Kingdom</option>
				<option>Germany</option>
			</select>
		</div>
	</div>
);

const PaymentTermsContent = ({ terms }: { terms: PaymentTerm[] }) => (
	<div className="space-y-3 pt-4">
		<RadioGroup defaultValue={terms[1]?.id || terms[0].id} className="space-y-3">
			{terms.map((term) => (
				<Label
					key={term.id}
					htmlFor={term.id}
					className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
				>
					<RadioGroupItem value={term.id} id={term.id} />
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-medium">{term.name}</span>
							{term.discount && <Badge variant="secondary" className="text-xs text-emerald-600">{term.discount}</Badge>}
						</div>
						<p className="text-xs text-muted-foreground">{term.description}</p>
					</div>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const PaymentMethodContent = () => (
	<div className="space-y-4 pt-4">
		<RadioGroup defaultValue="wire" className="space-y-3">
			<Label htmlFor="wire" className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<RadioGroupItem value="wire" id="wire" />
				<Building2 className="size-5" />
				<div className="flex-1">
					<span className="font-medium">Wire Transfer / ACH</span>
					<p className="text-xs text-muted-foreground">Direct bank payment</p>
				</div>
			</Label>
			<Label htmlFor="card-corp" className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<RadioGroupItem value="card-corp" id="card-corp" />
				<CreditCard className="size-5" />
				<div className="flex-1">
					<span className="font-medium">Corporate Card</span>
					<p className="text-xs text-muted-foreground">Credit or debit card</p>
				</div>
			</Label>
			<Label htmlFor="po" className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<RadioGroupItem value="po" id="po" />
				<FileText className="size-5" />
				<div className="flex-1">
					<span className="font-medium">Purchase Order</span>
					<p className="text-xs text-muted-foreground">Net 30 terms available</p>
				</div>
			</Label>
		</RadioGroup>
	</div>
);

const PurchaseOrderContent = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">PO Number</Label>
			<Input placeholder="PO-2024-001234" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Upload PO Document (Optional)</Label>
			<div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
				<Upload className="size-8 mx-auto mb-2 text-muted-foreground" />
				<p className="text-sm text-muted-foreground">Drop PDF here or click to browse</p>
				<p className="text-xs text-muted-foreground mt-1">Max 10MB</p>
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Special Instructions</Label>
			<textarea
				className="w-full min-h-20 px-3 py-2 rounded-md border border-input bg-transparent text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
				placeholder="Any additional billing instructions..."
			/>
		</div>
	</div>
);

const TaxExemptContent = () => (
	<div className="space-y-4 pt-4">
		<div className="flex items-center gap-3 p-4 rounded-xl border">
			<Checkbox id="exempt" />
			<Label htmlFor="exempt" className="flex-1 cursor-pointer">
				<span className="font-medium">We are tax exempt</span>
				<p className="text-xs text-muted-foreground">Upload exemption certificate to remove tax</p>
			</Label>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Exemption Certificate</Label>
			<div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
				<Upload className="size-8 mx-auto mb-2 text-muted-foreground" />
				<p className="text-sm text-muted-foreground">Upload tax exemption certificate</p>
			</div>
		</div>
	</div>
);

const InvoiceSummary = ({ lines }: { lines: { label: string; value: string; isTotal?: boolean; isDiscount?: boolean }[] }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		<div className="flex items-center gap-2 mb-3">
			<Receipt className="size-4 text-muted-foreground" />
			<span className="font-medium">Invoice Summary</span>
		</div>
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}>
					<span className={line.isDiscount ? 'text-emerald-600' : line.isTotal ? '' : 'text-muted-foreground'}>
						{line.label}
					</span>
					<span className={line.isDiscount ? 'text-emerald-600' : ''}>{line.value}</span>
				</div>
			</div>
		))}
	</div>
);

const SubmitButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const paymentTerms: PaymentTerm[] = [
		{ id: 'prepay', name: 'Prepay (Due Now)', description: 'Pay in full before order processing', discount: '3% off' },
		{ id: 'net30', name: 'Net 30', description: 'Payment due within 30 days of invoice' },
		{ id: 'net60', name: 'Net 60', description: 'Payment due within 60 days of invoice' },
	];

	const invoiceLines = [
		{ label: 'Enterprise License (Annual)', value: '$24,999.00' },
		{ label: 'Implementation Services', value: '$5,000.00' },
		{ label: 'Premium Support Package', value: '$2,499.00' },
		{ label: 'Early Payment Discount (3%)', value: '-$974.94', isDiscount: true },
		{ label: 'Tax (8.5%)', value: '$2,684.47' },
		{ label: 'Total Due', value: '$34,207.53', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Building2 className="size-5 text-primary" />
								<h2 className="text-xl font-semibold">Enterprise Purchase</h2>
							</div>
							<Badge variant="outline" className="gap-1">
								<Shield className="size-3" />
								B2B
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<Accordion type="multiple" defaultValue={['company', 'terms']} className="w-full">
							<AccordionItem value="company">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Building2 className="size-4" />
										<span className="font-medium">Company Information</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<CompanyInfoContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="billing">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<FileText className="size-4" />
										<span className="font-medium">Billing Address</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<BillingAddressContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="terms">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<DollarSign className="size-4" />
										<span className="font-medium">Payment Terms</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PaymentTermsContent terms={paymentTerms} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="method">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<CreditCard className="size-4" />
										<span className="font-medium">Payment Method</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PaymentMethodContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="po">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<FileText className="size-4" />
										<span className="font-medium">Purchase Order Details</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PurchaseOrderContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="tax">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Receipt className="size-4" />
										<span className="font-medium">Tax Exemption</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<TaxExemptContent />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<InvoiceSummary lines={invoiceLines} />
						<SubmitButton label="Submit Purchase Order" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
