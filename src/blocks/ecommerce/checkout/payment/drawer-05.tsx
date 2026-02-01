'use client';

import {
	ArrowLeft,
	Check,
	CreditCard,
	Lock,
	QrCode,
	Shield,
	Smartphone,
	Star,
	Wallet,
	X,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SavedCard {
	id: string;
	brand: string;
	last4: string;
	expiry: string;
	isDefault?: boolean;
}

const DrawerHeader = ({
	title,
	onClose,
}: {
	title: string;
	onClose: () => void;
}) => (
	<div className="flex items-center justify-between">
		<h2 className="text-xl font-semibold">{title}</h2>
		<Button variant="ghost" size="icon" onClick={onClose}>
			<X className="size-4" />
		</Button>
	</div>
);

const AmountDisplay = ({
	amount,
	currency,
}: {
	amount: string;
	currency: string;
}) => (
	<div className="text-center py-4">
		<span className="text-3xl font-bold">
			{currency}
			{amount}
		</span>
		<p className="text-sm text-muted-foreground">Total amount due</p>
	</div>
);

const SavedCardsList = ({
	cards,
	selected,
	onSelect,
}: {
	cards: SavedCard[];
	selected: string;
	onSelect: (id: string) => void;
}) => (
	<div className="space-y-2">
		{cards.map((card) => (
			<div
				key={card.id}
				onClick={() => onSelect(card.id)}
				className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
					selected === card.id
						? 'border-primary bg-primary/5'
						: 'border-border hover:border-primary/30'
				}`}
			>
				<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
					<CreditCard className="size-5" />
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-medium">
							{card.brand} •••• {card.last4}
						</span>
						{card.isDefault && (
							<Badge variant="secondary" className="text-xs">
								Default
							</Badge>
						)}
					</div>
					<p className="text-xs text-muted-foreground">Expires {card.expiry}</p>
				</div>
				{selected === card.id && <Check className="size-5 text-primary" />}
			</div>
		))}
	</div>
);

const NewCardForm = () => (
	<div className="space-y-4">
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
				<Label className="text-sm">Expiry</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
	</div>
);

const QrCodePayment = () => (
	<div className="text-center space-y-4">
		<div className="mx-auto size-40 rounded-xl bg-white p-3 flex items-center justify-center">
			<QrCode className="size-full text-gray-800" />
		</div>
		<p className="text-sm text-muted-foreground">
			Scan with your banking app to pay instantly
		</p>
		<Badge variant="outline" className="gap-1">
			<Zap className="size-3" />
			Instant confirmation
		</Badge>
	</div>
);

const MobilePayOptions = () => (
	<div className="space-y-3">
		<Button
			variant="outline"
			className="w-full h-14 gap-3 text-left justify-start"
		>
			<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
				<Smartphone className="size-5" />
			</div>
			<div>
				<span className="font-medium">Apple Pay</span>
				<p className="text-xs text-muted-foreground">
					Pay with Touch ID or Face ID
				</p>
			</div>
		</Button>
		<Button
			variant="outline"
			className="w-full h-14 gap-3 text-left justify-start"
		>
			<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
				<Wallet className="size-5" />
			</div>
			<div>
				<span className="font-medium">Google Pay</span>
				<p className="text-xs text-muted-foreground">Use your saved cards</p>
			</div>
		</Button>
	</div>
);

const SecurityInfo = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>Encrypted</span>
		</div>
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>PCI Compliant</span>
		</div>
	</div>
);

export default function Main() {
	const savedCards: SavedCard[] = [
		{
			id: 'card1',
			brand: 'Visa',
			last4: '4242',
			expiry: '12/25',
			isDefault: true,
		},
		{ id: 'card2', brand: 'Mastercard', last4: '8888', expiry: '06/24' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm @sm:max-w-md mx-auto">
					<CardHeader>
						<DrawerHeader title="Quick Pay" onClose={() => {}} />
						<AmountDisplay amount="149.99" currency="$" />
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="cards" className="w-full">
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="cards" className="text-xs">
									Cards
								</TabsTrigger>
								<TabsTrigger value="mobile" className="text-xs">
									Mobile Pay
								</TabsTrigger>
								<TabsTrigger value="qr" className="text-xs">
									QR Code
								</TabsTrigger>
							</TabsList>
							<div className="mt-6">
								<TabsContent value="cards" className="space-y-4 m-0">
									<SavedCardsList
										cards={savedCards}
										selected="card1"
										onSelect={() => {}}
									/>
									<Separator />
									<Button variant="ghost" className="w-full gap-2 text-primary">
										<CreditCard className="size-4" />
										Add new card
									</Button>
								</TabsContent>
								<TabsContent value="mobile" className="m-0">
									<MobilePayOptions />
								</TabsContent>
								<TabsContent value="qr" className="m-0">
									<QrCodePayment />
								</TabsContent>
							</div>
						</Tabs>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<Button className="w-full gap-2">
							<Lock className="size-4" />
							Pay $149.99
						</Button>
						<SecurityInfo />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
