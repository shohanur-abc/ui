import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CheckCircle2,
	CreditCard,
	FileText,
	Gift,
	Lock,
	MapPin,
	Package,
	Receipt,
	Shield,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	name: string;
	options: string;
	price: number;
	qty: number;
	img: string;
}

const WizardStep = ({
	step,
	title,
	active,
	complete,
}: {
	step: number;
	title: string;
	active?: boolean;
	complete?: boolean;
}) => (
	<div className="flex items-center gap-3">
		<div
			className={`flex size-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
				complete
					? 'bg-green-500 text-white'
					: active
						? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{complete ? <CheckCircle2 className="size-5" /> : step}
		</div>
		<span
			className={`text-sm font-medium ${active ? 'text-foreground' : 'text-muted-foreground'}`}
		>
			{title}
		</span>
	</div>
);

const WizardConnector = ({ complete }: { complete?: boolean }) => (
	<div className={`mx-5 h-px w-8 ${complete ? 'bg-green-500' : 'bg-border'}`} />
);

const ProductRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-3">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
			<Image src={item.img} alt={item.name} fill className="object-cover" />
			<div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
				{item.qty}
			</div>
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<p className="font-medium">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.options}</p>
			</div>
			<p className="font-semibold">${item.price.toFixed(2)}</p>
		</div>
	</div>
);

const ReviewSection = ({
	icon: Icon,
	title,
	verified,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	verified?: boolean;
	children: React.ReactNode;
}) => (
	<div className="rounded-2xl border bg-card p-5">
		<div className="mb-4 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Icon className="size-5 text-primary" />
				<h3 className="font-semibold">{title}</h3>
			</div>
			{verified && (
				<Badge variant="secondary" className="gap-1 text-xs">
					<CheckCircle2 className="size-3 text-green-500" />
					Verified
				</Badge>
			)}
		</div>
		{children}
	</div>
);

const AddressInfo = ({
	label,
	name,
	lines,
}: {
	label: string;
	name: string;
	lines: string[];
}) => (
	<div className="rounded-lg bg-muted/50 p-4">
		<p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
			{label}
		</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const PaymentCard = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
			<CreditCard className="size-7 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const DeliveryOption = ({
	name,
	date,
	price,
}: {
	name: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
		<Truck className="size-6 text-primary" />
		<div className="flex-1">
			<p className="font-medium">{name}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<Badge variant="outline">{price}</Badge>
	</div>
);

const GiftOption = ({ message }: { message: string }) => (
	<div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
		<Gift className="mt-0.5 size-5 text-primary" />
		<div>
			<p className="text-sm font-medium">Gift wrapping included</p>
			<p className="text-sm text-muted-foreground">
				Message: &quot;{message}&quot;
			</p>
		</div>
	</div>
);

const PriceLine = ({
	label,
	value,
	large,
	green,
}: {
	label: string;
	value: string;
	large?: boolean;
	green?: boolean;
}) => (
	<div
		className={`flex justify-between ${large ? 'text-xl font-bold' : 'text-sm'}`}
	>
		<span className={large ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

const TermsCheckbox = ({ label }: { label: string }) => (
	<div className="flex items-start gap-3">
		<Checkbox id="terms" className="mt-0.5" />
		<label
			htmlFor="terms"
			className="text-sm text-muted-foreground leading-relaxed"
		>
			{label}
		</label>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Fitness Tracker Pro',
			options: 'Black / Large',
			price: 199.99,
			qty: 1,
			img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Extra Band Set',
			options: 'Multicolor / 3-Pack',
			price: 29.99,
			qty: 1,
			img: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10 flex flex-wrap items-center justify-center gap-2">
					<WizardStep step={1} title="Cart" complete />
					<WizardConnector complete />
					<WizardStep step={2} title="Shipping" complete />
					<WizardConnector complete />
					<WizardStep step={3} title="Payment" complete />
					<WizardConnector complete />
					<WizardStep step={4} title="Review" active />
				</div>

				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Review & Confirm
					</h1>
					<p className="mt-2 text-muted-foreground">
						You&apos;re one step away from completing your order
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-6">
						<ReviewSection icon={Package} title="Items (2)" verified>
							<div className="divide-y">
								{items.map((item) => (
									<ProductRow key={item.id} item={item} />
								))}
							</div>
						</ReviewSection>

						<ReviewSection icon={MapPin} title="Addresses" verified>
							<div className="grid gap-4 @md:grid-cols-2">
								<AddressInfo
									label="Ship To"
									name="Robert Kim"
									lines={['456 Fitness Way', 'Suite 100', 'Chicago, IL 60601']}
								/>
								<AddressInfo
									label="Bill To"
									name="Robert Kim"
									lines={['456 Fitness Way', 'Suite 100', 'Chicago, IL 60601']}
								/>
							</div>
						</ReviewSection>

						<ReviewSection icon={Truck} title="Delivery" verified>
							<DeliveryOption
								name="Priority Express"
								date="Arrives Dec 21-22, 2025"
								price="$19.99"
							/>
						</ReviewSection>

						<ReviewSection icon={CreditCard} title="Payment" verified>
							<PaymentCard brand="Discover" last4="6789" exp="01/28" />
						</ReviewSection>

						<ReviewSection icon={Gift} title="Gift Options">
							<GiftOption message="Stay healthy and keep moving!" />
						</ReviewSection>
					</div>

					<div className="@lg:sticky @lg:top-8 @lg:self-start">
						<Card className="overflow-hidden">
							<CardHeader className="bg-gradient-to-br from-primary/10 to-transparent">
								<CardTitle className="flex items-center gap-2">
									<Receipt className="size-5" />
									Order Total
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								<PriceLine label="Subtotal" value="$229.98" />
								<PriceLine label="Shipping" value="$19.99" />
								<PriceLine label="Tax" value="$21.25" />
								<PriceLine label="Gift Wrap" value="$5.00" />
								<Separator className="my-4" />
								<PriceLine label="Total" value="$276.22" large />
							</CardContent>
							<CardFooter className="flex-col gap-4 bg-muted/30 pt-6">
								<TermsCheckbox label="I agree to the Terms of Service and Privacy Policy. I understand this order is final." />
								<Button size="lg" className="w-full gap-2">
									<Lock className="size-4" />
									Pay $276.22
									<ArrowRight className="size-4" />
								</Button>
								<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
									<Shield className="size-3.5" />
									<span>Protected by Secure Payment</span>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
