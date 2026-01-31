import { Building2, CircleDollarSign, CreditCard, Lock, Smartphone, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface ProductProps {
	name: string;
	price: string;
	image: string;
	initials: string;
	rating: number;
	reviews: number;
}

interface SellerProps {
	name: string;
	avatar: string;
	initials: string;
	verified: boolean;
}

interface PaymentOptionProps {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	detail: string;
}

const ProductDisplay = ({ name, price, image, initials, rating, reviews }: ProductProps) => (
	<div className="space-y-4">
		<div className="aspect-square rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
			<Avatar className="size-32">
				<AvatarImage src={image} alt={name} />
				<AvatarFallback className="text-4xl bg-primary/10">{initials}</AvatarFallback>
			</Avatar>
		</div>
		<div className="space-y-2">
			<h2 className="text-xl font-semibold">{name}</h2>
			<div className="flex items-center gap-2">
				<div className="flex items-center gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							className={`size-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
						/>
					))}
				</div>
				<span className="text-sm text-muted-foreground">({reviews} reviews)</span>
			</div>
			<p className="text-3xl font-bold">{price}</p>
		</div>
	</div>
);

const SellerInfo = ({ name, avatar, initials, verified }: SellerProps) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
		<Avatar className="size-10">
			<AvatarImage src={avatar} alt={name} />
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium text-sm">{name}</span>
				{verified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
			</div>
			<p className="text-xs text-muted-foreground">Seller</p>
		</div>
	</div>
);

const Guarantee = ({ items }: { items: string[] }) => (
	<div className="space-y-2">
		{items.map((item, index) => (
			<div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
				<div className="size-1.5 rounded-full bg-primary" />
				<span>{item}</span>
			</div>
		))}
	</div>
);

const PaymentOption = ({ id, icon: Icon, label, detail }: PaymentOptionProps) => (
	<Label
		htmlFor={id}
		className="flex items-center gap-3 p-3 rounded-lg border border-border/50 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} />
		<Icon className="size-5 text-muted-foreground" />
		<div className="flex-1">
			<span className="text-sm font-medium">{label}</span>
		</div>
		<span className="text-xs text-muted-foreground">{detail}</span>
	</Label>
);

const PaymentOptions = ({ options }: { options: PaymentOptionProps[] }) => (
	<RadioGroup defaultValue={options[0]?.id} className="space-y-2">
		{options.map((option) => (
			<PaymentOption key={option.id} {...option} />
		))}
	</RadioGroup>
);

const CardInput = ({
	id,
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">{label}</Label>
		<div className="relative">
			{Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />}
			<Input id={id} type={type} placeholder={placeholder} className={Icon ? 'pl-10' : ''} />
		</div>
	</div>
);

const PurchaseButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const product: ProductProps = {
		name: 'Premium Wireless Earbuds',
		price: '$249.99',
		image: '',
		initials: 'PE',
		rating: 4,
		reviews: 128,
	};

	const seller: SellerProps = {
		name: 'TechStore Official',
		avatar: '',
		initials: 'TS',
		verified: true,
	};

	const guarantees = [
		'30-day money-back guarantee',
		'1-year manufacturer warranty',
		'Free shipping & returns',
	];

	const paymentOptions: PaymentOptionProps[] = [
		{ id: 'card', icon: CreditCard, label: 'Credit Card', detail: 'No fee' },
		{ id: 'mobile', icon: Smartphone, label: 'Apple Pay', detail: 'Instant' },
		{ id: 'bank', icon: Building2, label: 'Bank Transfer', detail: '1-2 days' },
		{ id: 'crypto', icon: CircleDollarSign, label: 'Crypto', detail: '1% off' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid gap-8 @lg:grid-cols-2">
					<div className="space-y-6">
						<ProductDisplay {...product} />
						<Separator />
						<SellerInfo {...seller} />
						<Separator />
						<Guarantee items={guarantees} />
					</div>
					<div>
						<Card className="border-border/50 bg-card/50 backdrop-blur-sm @lg:sticky @lg:top-8">
							<CardHeader className="pb-4">
								<h3 className="font-semibold">Complete Purchase</h3>
								<p className="text-sm text-muted-foreground">Select payment method</p>
							</CardHeader>
							<CardContent className="space-y-6">
								<PaymentOptions options={paymentOptions} />
								<Separator />
								<div className="space-y-4">
									<CardInput id="card" label="Card Number" placeholder="4242 4242 4242 4242" icon={CreditCard} />
									<CardInput id="name" label="Name on Card" placeholder="John Doe" />
									<div className="grid grid-cols-2 gap-4">
										<CardInput id="exp" label="Expiry" placeholder="MM/YY" />
										<CardInput id="cvc" label="CVV" placeholder="123" type="password" />
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<PurchaseButton label="Pay $249.99" />
								<p className="text-xs text-center text-muted-foreground">
									By purchasing, you agree to our Terms of Service
								</p>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
