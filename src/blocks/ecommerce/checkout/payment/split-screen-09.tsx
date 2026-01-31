import { ArrowLeft, Check, Clock, CreditCard, Download, Lock, Mail, Shield } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface DigitalProductProps {
	name: string;
	type: string;
	size: string;
	image: string;
	initials: string;
	price: string;
}

interface LicenseProps {
	type: string;
	description: string;
	selected?: boolean;
}

interface BenefitProps {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

const BackLink = ({ label }: { label: string }) => (
	<Button variant="ghost" size="sm" className="gap-2 -ml-2">
		<ArrowLeft className="size-4" />
		{label}
	</Button>
);

const ProductCard = ({ name, type, size, image, initials, price }: DigitalProductProps) => (
	<div className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
		<div className="size-24 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden shrink-0">
			<Avatar className="size-16">
				<AvatarImage src={image} alt={name} />
				<AvatarFallback className="text-xl bg-primary/10">{initials}</AvatarFallback>
			</Avatar>
		</div>
		<div className="flex-1 space-y-2">
			<div>
				<h3 className="font-semibold">{name}</h3>
				<p className="text-sm text-muted-foreground">{type}</p>
			</div>
			<div className="flex items-center gap-3 text-xs text-muted-foreground">
				<span className="flex items-center gap-1">
					<Download className="size-3" />
					{size}
				</span>
				<span className="flex items-center gap-1">
					<Clock className="size-3" />
					Instant delivery
				</span>
			</div>
			<p className="text-lg font-bold">{price}</p>
		</div>
	</div>
);

const LicenseOption = ({ type, description, selected }: LicenseProps) => (
	<div
		className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
			selected ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'
		}`}
	>
		<div className={`size-5 rounded-full border-2 flex items-center justify-center ${
			selected ? 'border-primary bg-primary' : 'border-muted-foreground'
		}`}>
			{selected && <Check className="size-3 text-primary-foreground" />}
		</div>
		<div className="flex-1">
			<p className="font-medium text-sm">{type}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</div>
);

const LicenseOptions = ({ options }: { options: LicenseProps[] }) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">License Type</Label>
		{options.map((option, index) => (
			<LicenseOption key={index} {...option} />
		))}
	</div>
);

const Benefit = ({ icon: Icon, text }: BenefitProps) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

const Benefits = ({ items }: { items: BenefitProps[] }) => (
	<div className="grid grid-cols-2 gap-3">
		{items.map((item, index) => (
			<Benefit key={index} {...item} />
		))}
	</div>
);

const FormField = ({
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

const PriceSummary = ({ items }: { items: { label: string; value: string; isTotal?: boolean }[] }) => (
	<div className="space-y-2 p-4 rounded-xl bg-muted/30">
		{items.map((item, index) => (
			<div key={index}>
				{item.isTotal && <Separator className="my-2" />}
				<div className={`flex justify-between ${item.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}>
					<span className={item.isTotal ? '' : 'text-muted-foreground'}>{item.label}</span>
					<span>{item.value}</span>
				</div>
			</div>
		))}
	</div>
);

const PurchaseButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

const DeliveryNote = ({ email }: { email: string }) => (
	<div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
		<Mail className="size-4 text-primary" />
		<span>Download link will be sent to <strong>{email}</strong></span>
	</div>
);

export default function Main() {
	const product: DigitalProductProps = {
		name: 'UI Design Kit Pro',
		type: 'Figma Template',
		size: '48 MB',
		image: '',
		initials: 'UI',
		price: '$79.00',
	};

	const licenses: LicenseProps[] = [
		{ type: 'Personal License', description: 'Use for personal projects only', selected: true },
		{ type: 'Commercial License', description: 'Use for client & commercial work (+$40)' },
	];

	const benefits: BenefitProps[] = [
		{ icon: Download, text: 'Instant download' },
		{ icon: Shield, text: 'Lifetime access' },
		{ icon: Clock, text: 'Free updates' },
		{ icon: Mail, text: '24/7 support' },
	];

	const priceItems = [
		{ label: 'UI Design Kit Pro', value: '$79.00' },
		{ label: 'Personal License', value: '$0.00' },
		{ label: 'Total', value: '$79.00', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<BackLink label="Back to product" />
				<div className="grid gap-8 @lg:grid-cols-2 mt-6">
					<div className="space-y-6">
						<ProductCard {...product} />
						<LicenseOptions options={licenses} />
						<Separator />
						<Benefits items={benefits} />
					</div>
					<div>
						<Card className="border-border/50 bg-card/50 backdrop-blur-sm @lg:sticky @lg:top-8">
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<h3 className="font-semibold">Complete Purchase</h3>
									<Badge variant="outline" className="gap-1">
										<Lock className="size-3" />
										Secure
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<FormField id="email" label="Email Address" placeholder="john@example.com" icon={Mail} />
								<FormField id="card" label="Card Number" placeholder="1234 5678 9012 3456" icon={CreditCard} />
								<div className="grid grid-cols-2 gap-4">
									<FormField id="exp" label="Expiry" placeholder="MM/YY" />
									<FormField id="cvc" label="CVC" placeholder="123" type="password" />
								</div>
								<PriceSummary items={priceItems} />
								<DeliveryNote email="john@example.com" />
							</CardContent>
							<CardFooter>
								<PurchaseButton label="Purchase $79.00" />
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
