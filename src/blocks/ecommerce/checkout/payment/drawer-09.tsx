'use client';

import {
	Check,
	CreditCard,
	Download,
	Gift,
	Key,
	Lock,
	Mail,
	Shield,
	Star,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface Product {
	name: string;
	type: string;
	price: string;
	features: string[];
}

const DrawerHeader = ({
	title,
	onClose,
}: {
	title: string;
	onClose: () => void;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Download className="size-5 text-primary" />
			<h2 className="text-lg font-semibold">{title}</h2>
		</div>
		<Button variant="ghost" size="icon" onClick={onClose}>
			<X className="size-4" />
		</Button>
	</div>
);

const ProductPreview = ({ product }: { product: Product }) => (
	<div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
		<div className="flex items-start justify-between mb-3">
			<div>
				<Badge variant="secondary" className="mb-2">
					{product.type}
				</Badge>
				<h3 className="font-semibold">{product.name}</h3>
			</div>
			<span className="text-2xl font-bold">{product.price}</span>
		</div>
		<div className="space-y-2">
			{product.features.map((feature, index) => (
				<div key={index} className="flex items-center gap-2 text-sm">
					<Check className="size-4 text-primary shrink-0" />
					<span className="text-muted-foreground">{feature}</span>
				</div>
			))}
		</div>
	</div>
);

const AccountForm = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 mb-2">
			<Mail className="size-4 text-primary" />
			<span className="font-medium">Your Account</span>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Email Address</Label>
			<div className="relative">
				<Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input type="email" placeholder="you@example.com" className="pl-10" />
			</div>
			<p className="text-xs text-muted-foreground">
				License key will be sent to this email
			</p>
		</div>
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
			<Checkbox id="account" defaultChecked />
			<Label htmlFor="account" className="text-sm cursor-pointer">
				Create an account to manage licenses
			</Label>
		</div>
	</div>
);

const CardForm = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 mb-2">
			<CreditCard className="size-4 text-primary" />
			<span className="font-medium">Payment Details</span>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
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

const GiftCodeSection = () => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Gift className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">Have a gift code?</span>
		</div>
		<div className="flex gap-2">
			<Input placeholder="Enter code" className="flex-1" />
			<Button variant="outline">Redeem</Button>
		</div>
	</div>
);

const LicenseTerms = () => (
	<div className="flex items-start gap-3">
		<Checkbox id="terms" className="mt-0.5" />
		<Label
			htmlFor="terms"
			className="text-xs cursor-pointer text-muted-foreground"
		>
			I agree to the{' '}
			<a href="#" className="text-primary underline">
				License Agreement
			</a>{' '}
			and understand this is a digital product with no physical delivery
		</Label>
	</div>
);

const DeliveryInfo = () => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-3">
		<div className="flex items-center gap-2">
			<Zap className="size-4 text-primary" />
			<span className="font-medium">Instant Delivery</span>
		</div>
		<div className="grid grid-cols-2 gap-4 text-sm">
			<div className="flex items-center gap-2">
				<Download className="size-4 text-muted-foreground" />
				<span>Download link</span>
			</div>
			<div className="flex items-center gap-2">
				<Key className="size-4 text-muted-foreground" />
				<span>License key</span>
			</div>
		</div>
	</div>
);

const SecurityBadges = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>Secure</span>
		</div>
		<div className="flex items-center gap-1">
			<Zap className="size-3" />
			<span>Instant</span>
		</div>
		<div className="flex items-center gap-1">
			<Star className="size-3" />
			<span>30-Day Refund</span>
		</div>
	</div>
);

export default function Main() {
	const product: Product = {
		name: 'Pro Design Kit',
		type: 'Digital Download',
		price: '$79',
		features: [
			'100+ Design Templates',
			'Source Files Included',
			'Lifetime Updates',
			'Commercial License',
		],
	};

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm @sm:max-w-md mx-auto">
					<CardHeader>
						<DrawerHeader title="Digital Purchase" onClose={() => {}} />
					</CardHeader>
					<CardContent className="space-y-6">
						<ProductPreview product={product} />
						<AccountForm />
						<Separator />
						<CardForm />
						<GiftCodeSection />
						<DeliveryInfo />
						<LicenseTerms />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<Button className="w-full gap-2">
							<Lock className="size-4" />
							Purchase for $79
						</Button>
						<SecurityBadges />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
