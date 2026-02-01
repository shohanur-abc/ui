import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Gift,
	Heart,
	Calendar,
	Mail,
	MessageSquare,
	Sparkles,
	ArrowRight,
	Eye,
	Palette,
	Clock,
	Send,
} from 'lucide-react';
import Link from 'next/link';

interface GiftDetailsProps {
	productName: string;
	productPrice: number;
	currency: string;
	wrappingStyle: string;
	greetingCard: boolean;
}

interface RecipientProps {
	name: string;
	email: string;
	avatar?: string;
	deliveryDate: string;
	deliveryTime: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({
	orderNumber,
	purchaseDate,
}: {
	orderNumber: string;
	purchaseDate: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="size-14 rounded-full bg-pink-500/10 flex items-center justify-center">
			<Gift className="size-7 text-pink-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-3xl font-bold">Gift Sent!</h1>
			<p className="text-muted-foreground">
				Order #{orderNumber} • {purchaseDate}
			</p>
		</div>
	</div>
);

const GiftPreviewCard = ({
	message,
	senderName,
	recipientName,
	wrappingStyle,
}: {
	message: string;
	senderName: string;
	recipientName: string;
	wrappingStyle: string;
}) => (
	<Card className="overflow-hidden">
		<div
			className={`p-8 text-center ${
				wrappingStyle === 'elegant'
					? 'bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600'
					: wrappingStyle === 'celebration'
						? 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500'
						: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600'
			} text-white`}
		>
			<div className="size-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
				<Gift className="size-10" />
			</div>
			<h3 className="text-2xl font-bold mb-2">
				A Gift for You, {recipientName}!
			</h3>
			<p className="opacity-90">From {senderName}</p>
		</div>
		<CardContent className="pt-6">
			<div className="p-6 rounded-xl bg-muted/30 text-center italic">
				<MessageSquare className="size-6 mx-auto mb-3 text-muted-foreground" />
				<p className="text-lg">&ldquo;{message}&rdquo;</p>
			</div>
		</CardContent>
	</Card>
);

const RecipientCard = ({
	name,
	email,
	avatar,
	deliveryDate,
	deliveryTime,
}: RecipientProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Heart className="size-4 text-pink-500" />
				Recipient Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center gap-4">
				<Avatar className="size-14">
					<AvatarImage src={avatar} />
					<AvatarFallback className="text-lg font-bold bg-pink-100 text-pink-600">
						{name
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-lg">{name}</p>
					<p className="text-sm text-muted-foreground">{email}</p>
				</div>
			</div>
			<Separator />
			<div className="grid grid-cols-2 gap-4">
				<div className="flex items-start gap-2">
					<Calendar className="size-4 text-muted-foreground mt-0.5" />
					<div>
						<p className="text-sm text-muted-foreground">Delivery Date</p>
						<p className="font-medium">{deliveryDate}</p>
					</div>
				</div>
				<div className="flex items-start gap-2">
					<Clock className="size-4 text-muted-foreground mt-0.5" />
					<div>
						<p className="text-sm text-muted-foreground">Delivery Time</p>
						<p className="font-medium">{deliveryTime}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const GiftDetailsCard = ({
	productName,
	productPrice,
	currency,
	wrappingStyle,
	greetingCard,
}: GiftDetailsProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Sparkles className="size-4" />
				Gift Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center gap-4">
				<div className="size-20 rounded-xl bg-pink-500/10 flex items-center justify-center">
					<Gift className="size-10 text-pink-500" />
				</div>
				<div className="flex-1">
					<p className="font-semibold">{productName}</p>
					<p className="text-sm text-muted-foreground">Digital Gift Card</p>
				</div>
				<p className="text-xl font-bold">
					{currency}
					{productPrice.toFixed(2)}
				</p>
			</div>
			<Separator />
			<div className="flex items-center justify-between text-sm">
				<div className="flex items-center gap-2">
					<Palette className="size-4 text-muted-foreground" />
					<span>Wrapping Style</span>
				</div>
				<Badge variant="secondary" className="capitalize">
					{wrappingStyle}
				</Badge>
			</div>
			<div className="flex items-center justify-between text-sm">
				<div className="flex items-center gap-2">
					<MessageSquare className="size-4 text-muted-foreground" />
					<span>Greeting Card</span>
				</div>
				<Badge variant={greetingCard ? 'secondary' : 'outline'}>
					{greetingCard ? 'Included' : 'Not Included'}
				</Badge>
			</div>
		</CardContent>
	</Card>
);

const DeliveryStatusCard = ({
	status,
	timeline,
}: {
	status: string;
	timeline: { step: string; completed: boolean }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Send className="size-4" />
				Delivery Status
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<Badge className="bg-pink-500">{status}</Badge>
			<div className="space-y-3">
				{timeline.map((item, i) => (
					<div key={i} className="flex items-center gap-3">
						<div
							className={`size-6 rounded-full flex items-center justify-center ${
								item.completed
									? 'bg-pink-500 text-white'
									: 'bg-muted text-muted-foreground'
							}`}
						>
							{item.completed ? '✓' : i + 1}
						</div>
						<span className={item.completed ? '' : 'text-muted-foreground'}>
							{item.step}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const EmailPreviewCard = () => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<div className="flex items-center gap-3">
				<Mail className="size-5 text-muted-foreground" />
				<div className="flex-1">
					<p className="font-medium text-sm">Email Preview</p>
					<p className="text-xs text-muted-foreground">
						See what your recipient will receive
					</p>
				</div>
				<Button variant="outline" size="sm" className="gap-2">
					<Eye className="size-4" />
					Preview
				</Button>
			</div>
		</CardContent>
	</Card>
);

const OrderSummaryCard = ({
	subtotal,
	wrappingFee,
	total,
	currency,
}: {
	subtotal: number;
	wrappingFee: number;
	total: number;
	currency: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Order Summary</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Gift Card Value</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Gift Wrapping</span>
				<span>
					{currency}
					{wrappingFee.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between font-semibold">
				<span>Total Paid</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const deliveryTimeline = [
		{ step: 'Gift purchased', completed: true },
		{ step: 'Gift wrapped & ready', completed: true },
		{ step: 'Scheduled for delivery', completed: true },
		{ step: 'Delivered to recipient', completed: false },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader
					orderNumber="GFT-2024-78432"
					purchaseDate="January 15, 2024"
				/>

				<GiftPreviewCard
					message="Wishing you the happiest birthday ever! May all your dreams come true. With love and warmest wishes on your special day!"
					senderName="Alex"
					recipientName="Sarah"
					wrappingStyle="elegant"
				/>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-6">
						<RecipientCard
							name="Sarah Johnson"
							email="sarah@example.com"
							deliveryDate="January 20, 2024"
							deliveryTime="9:00 AM"
						/>
						<GiftDetailsCard
							productName="$100 Store Gift Card"
							productPrice={100}
							currency="$"
							wrappingStyle="elegant"
							greetingCard={true}
						/>
					</div>
					<div className="space-y-6">
						<DeliveryStatusCard
							status="Scheduled"
							timeline={deliveryTimeline}
						/>
						<EmailPreviewCard />
						<OrderSummaryCard
							subtotal={100}
							wrappingFee={4.99}
							total={104.99}
							currency="$"
						/>
					</div>
				</div>

				<CTA
					items={[
						{ label: 'Track Delivery', href: '/track', icon: ArrowRight },
						{ label: 'Send Another Gift', href: '/gifts', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
