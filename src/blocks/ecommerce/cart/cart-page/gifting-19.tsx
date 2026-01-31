import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Minus, Plus, Trash2, Gift, MessageSquare, Heart, ArrowRight, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface GiftItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface Recipient {
	id: string;
	name: string;
	avatar: string;
	message: string;
	items: GiftItem[];
}

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="flex items-center gap-4">
		<div className="rounded-full bg-primary/10 p-3">
			<Gift className="size-6 text-primary" />
		</div>
		<div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
			<p className="text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

const RecipientHeader = ({
	name,
	avatar,
	itemCount,
}: {
	name: string;
	avatar: string;
	itemCount: number;
}) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-10 ring-2 ring-primary/20">
			<AvatarImage src={avatar} alt={name} />
			<AvatarFallback>{name.charAt(0)}</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<h3 className="font-semibold">For {name}</h3>
			<p className="text-sm text-muted-foreground">{itemCount} gifts</p>
		</div>
		<Button variant="ghost" size="icon-sm" className="text-muted-foreground">
			<Share2 className="size-4" />
		</Button>
	</div>
);

const GiftMessage = ({ message }: { message: string }) => (
	<div className="flex gap-2 rounded-lg bg-muted/50 p-3">
		<MessageSquare className="size-4 text-primary shrink-0 mt-0.5" />
		<p className="text-sm italic text-muted-foreground">"{message}"</p>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemDetails = ({ name, price }: { name: string; price: number }) => (
	<div className="min-w-0 flex-1">
		<h4 className="font-medium line-clamp-1">{name}</h4>
		<p className="text-sm font-semibold text-primary">${price.toFixed(2)}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-1 rounded border">
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Minus className="size-3" />
		</Button>
		<span className="w-5 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Plus className="size-3" />
		</Button>
	</div>
);

const GiftItemRow = ({ item }: { item: GiftItem }) => (
	<div className="flex items-center gap-3 py-3">
		<ItemImage src={item.image} alt={item.name} />
		<ItemDetails name={item.name} price={item.price} />
		<QuantityControl quantity={item.quantity} />
		<p className="font-semibold w-16 text-right">${(item.price * item.quantity).toFixed(2)}</p>
		<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
			<Trash2 className="size-4" />
		</Button>
	</div>
);

const RecipientActions = ({ saveLabel, removeLabel }: { saveLabel: string; removeLabel: string }) => (
	<div className="flex gap-2 text-sm">
		<Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
			<Heart className="size-3" />
			{saveLabel}
		</Button>
		<Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-destructive">
			<Trash2 className="size-3" />
			{removeLabel}
		</Button>
	</div>
);

const RecipientCard = ({ recipient }: { recipient: Recipient }) => {
	const subtotal = recipient.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

	return (
		<Card className="overflow-hidden">
			<CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
				<RecipientHeader
					name={recipient.name}
					avatar={recipient.avatar}
					itemCount={recipient.items.length}
				/>
			</CardHeader>
			<CardContent className="space-y-4 pt-4">
				{recipient.message && <GiftMessage message={recipient.message} />}
				<div className="divide-y">
					{recipient.items.map((item) => (
						<GiftItemRow key={item.id} item={item} />
					))}
				</div>
			</CardContent>
			<CardFooter className="justify-between bg-muted/30">
				<RecipientActions saveLabel="Save for later" removeLabel="Remove all" />
				<div className="text-right">
					<p className="text-sm text-muted-foreground">Subtotal</p>
					<p className="text-lg font-bold">${subtotal.toFixed(2)}</p>
				</div>
			</CardFooter>
		</Card>
	);
};

const AddRecipientButton = ({ label }: { label: string }) => (
	<Button variant="outline" className="w-full gap-2 border-dashed">
		<Gift className="size-4" />
		{label}
	</Button>
);

const PriceLine = ({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant?: 'default' | 'highlight' | 'total';
}) => (
	<div className={`flex justify-between ${variant === 'total' ? 'text-xl font-bold' : ''}`}>
		<span className={variant === 'total' ? '' : 'text-muted-foreground'}>{label}</span>
		<span
			className={
				variant === 'total'
					? 'text-primary'
					: variant === 'highlight'
						? 'text-green-500'
						: ''
			}
		>
			{value}
		</span>
	</div>
);

const GiftOptions = ({ options }: { options: { label: string; included: boolean }[] }) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm flex items-center gap-2">
				<Gift className="size-4 text-primary" />
				Gift Options
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{options.map((opt, i) => (
				<div key={i} className="flex items-center justify-between text-sm">
					<span>{opt.label}</span>
					{opt.included ? (
						<Badge variant="secondary" className="text-xs">Included</Badge>
					) : (
						<Button variant="link" size="sm" className="h-auto p-0 text-xs">
							Add
						</Button>
					)}
				</div>
			))}
		</CardContent>
	</Card>
);

const OrderSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	lines: { label: string; value: string; variant?: 'default' | 'highlight' | 'total' }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.variant === 'total' && <Separator className="my-3" />}
					<PriceLine {...line} />
				</div>
			))}
		</CardContent>
		<CardFooter>
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const recipients: Recipient[] = [
		{
			id: '1',
			name: 'Sarah',
			avatar: '/avatars/sarah.jpg',
			message: 'Happy Birthday! Hope you love these picks! 🎂',
			items: [
				{
					id: '1a',
					image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop',
					name: 'Silk Scarf',
					price: 89.99,
					quantity: 1,
				},
				{
					id: '1b',
					image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&h=100&fit=crop',
					name: 'Wireless Earbuds',
					price: 149.99,
					quantity: 1,
				},
			],
		},
		{
			id: '2',
			name: 'Mom',
			avatar: '/avatars/mom.jpg',
			message: "Thank you for everything! Love you! ❤️",
			items: [
				{
					id: '2a',
					image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop',
					name: 'Luxury Candle Set',
					price: 79.99,
					quantity: 1,
				},
			],
		},
	];

	const giftOptions = [
		{ label: 'Gift wrapping', included: true },
		{ label: 'Personal message', included: true },
		{ label: 'Gift receipt (no prices)', included: false },
	];

	const allItems = recipients.flatMap((r) => r.items);
	const subtotal = allItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Gift Wrapping', value: 'Included', variant: 'highlight' as const },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${(subtotal * 0.08).toFixed(2)}` },
		{ label: 'Total', value: `$${(subtotal * 1.08).toFixed(2)}`, variant: 'total' as const },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<PageHeader
					title="Gift Cart"
					subtitle={`Sending gifts to ${recipients.length} people`}
				/>

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-6 @xl:col-span-3">
						{recipients.map((recipient) => (
							<RecipientCard key={recipient.id} recipient={recipient} />
						))}
						<AddRecipientButton label="Add Another Recipient" />
					</div>

					<div className="space-y-4 @xl:col-span-2">
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Proceed to Checkout"
							checkoutHref="/checkout"
						/>
						<GiftOptions options={giftOptions} />
					</div>
				</div>
			</div>
		</section>
	);
}
