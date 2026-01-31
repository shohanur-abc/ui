'use client';

import { BadgeCheck, Building2, Check, CreditCard, Globe, HelpCircle, Lock, Shield, Smartphone, Wallet } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SavedCard {
	id: string;
	brand: string;
	last4: string;
	expiry: string;
	isDefault?: boolean;
}

const SavedCardRow = ({ id, brand, last4, expiry, isDefault, selected, onSelect }: SavedCard & { selected: boolean; onSelect: (id: string) => void }) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
			selected ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'
		}`}
	>
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
			<CreditCard className="size-5" />
		</div>
		<div className="flex-1 text-left">
			<div className="flex items-center gap-2">
				<span className="font-medium">{brand} •••• {last4}</span>
				{isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
			</div>
			<p className="text-xs text-muted-foreground">Expires {expiry}</p>
		</div>
		{selected && (
			<div className="size-5 rounded-full bg-primary flex items-center justify-center">
				<Check className="size-3 text-primary-foreground" />
			</div>
		)}
	</button>
);

const SavedCardsContent = ({ cards }: { cards: SavedCard[] }) => (
	<div className="space-y-3 pt-4">
		{cards.map((card) => (
			<SavedCardRow key={card.id} {...card} selected={card.isDefault || false} onSelect={() => {}} />
		))}
		<Button variant="outline" className="w-full gap-2">
			<CreditCard className="size-4" />
			Add New Card
		</Button>
	</div>
);

const NewCardContent = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Cardholder Name</Label>
			<Input placeholder="JOHN DOE" />
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Expiry Date</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<div className="flex items-center gap-1">
					<Label className="text-sm">CVV</Label>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<HelpCircle className="size-3 text-muted-foreground cursor-help" />
							</TooltipTrigger>
							<TooltipContent>
								<p className="text-xs">3 or 4 digits on the back of your card</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
	</div>
);

const DigitalWalletContent = () => (
	<div className="space-y-3 pt-4">
		<Button variant="outline" className="w-full h-14 justify-between">
			<div className="flex items-center gap-3">
				<Smartphone className="size-5" />
				<span>Apple Pay</span>
			</div>
			<Badge variant="secondary" className="gap-1">
				<BadgeCheck className="size-3" />
				Connected
			</Badge>
		</Button>
		<Button variant="outline" className="w-full h-14 justify-between">
			<div className="flex items-center gap-3">
				<Smartphone className="size-5" />
				<span>Google Pay</span>
			</div>
			<span className="text-xs text-primary">Connect</span>
		</Button>
		<Button variant="outline" className="w-full h-14 justify-between">
			<div className="flex items-center gap-3">
				<Wallet className="size-5" />
				<span>PayPal</span>
			</div>
			<span className="text-xs text-muted-foreground">john@email.com</span>
		</Button>
	</div>
);

const BankContent = () => (
	<div className="space-y-4 pt-4">
		<div className="grid grid-cols-2 gap-2">
			{['Chase', 'Bank of America', 'Wells Fargo', 'Citibank'].map((bank) => (
				<Button key={bank} variant="outline" className="h-12 justify-start gap-2 text-sm">
					<Building2 className="size-4" />
					{bank}
				</Button>
			))}
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Other Banks</Label>
			<div className="relative">
				<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Search for your bank..." className="pl-10" />
			</div>
		</div>
		<div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
			You'll be redirected to your bank to authorize the payment
		</div>
	</div>
);

const InternationalContent = () => (
	<div className="space-y-4 pt-4">
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Country</Label>
				<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
					<option>United States</option>
					<option>United Kingdom</option>
					<option>Canada</option>
					<option>Germany</option>
				</select>
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Currency</Label>
				<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
					<option>USD</option>
					<option>EUR</option>
					<option>GBP</option>
					<option>CAD</option>
				</select>
			</div>
		</div>
		<div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
			<div className="flex justify-between">
				<span>Converted amount</span>
				<span className="font-medium">€275.08 EUR</span>
			</div>
			<p className="text-xs text-muted-foreground mt-1">Rate: 1 USD = 0.92 EUR</p>
		</div>
	</div>
);

const CvvConfirmation = () => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-3">
		<Label className="text-sm font-medium">Enter CVV to confirm</Label>
		<div className="flex gap-3">
			<Input type="password" placeholder="•••" className="w-24" />
			<span className="text-xs text-muted-foreground self-center">For security verification</span>
		</div>
	</div>
);

const TotalDisplay = ({ amount }: { amount: string }) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
		<span className="font-medium">Total</span>
		<span className="text-2xl font-bold">{amount}</span>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const savedCards: SavedCard[] = [
		{ id: 'visa', brand: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
		{ id: 'mc', brand: 'Mastercard', last4: '8888', expiry: '06/25' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Payment Options</h2>
							<Badge variant="outline" className="gap-1">
								<Shield className="size-3" />
								Secure
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<Accordion type="single" collapsible defaultValue="saved" className="w-full">
							<AccordionItem value="saved">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<CreditCard className="size-4" />
										<span className="font-medium">Saved Cards</span>
										<Badge variant="secondary" className="text-xs">{savedCards.length}</Badge>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<SavedCardsContent cards={savedCards} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="new">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<CreditCard className="size-4" />
										<span className="font-medium">New Card</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<NewCardContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="wallet">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Wallet className="size-4" />
										<span className="font-medium">Digital Wallets</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<DigitalWalletContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="bank">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Building2 className="size-4" />
										<span className="font-medium">Bank Transfer</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<BankContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="international">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Globe className="size-4" />
										<span className="font-medium">International Payment</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<InternationalContent />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<div className="mt-6">
							<CvvConfirmation />
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<TotalDisplay amount="$299.00" />
						<PayButton label="Complete Payment" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
