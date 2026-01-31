import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Download, Mail, Phone } from 'lucide-react';

interface LineItem {
	description: string;
	details: string;
	amount: number;
}

interface ProfileHeaderProps {
	avatarSrc: string;
	avatarFallback: string;
	name: string;
	role: string;
	email: string;
	phone: string;
}

interface InvoiceMetaProps {
	number: string;
	date: string;
	dueDate: string;
	status: 'paid' | 'pending' | 'overdue';
}

interface LineItemRowProps {
	item: LineItem;
	currency: string;
}

interface TotalBlockProps {
	subtotal: number;
	discount: number;
	tax: number;
	total: number;
	currency: string;
}

interface PaymentConfirmationProps {
	message: string;
	date: string;
	method: string;
}

const ProfileHeader = ({
	avatarSrc,
	avatarFallback,
	name,
	role,
	email,
	phone,
}: ProfileHeaderProps) => (
	<div className="flex flex-col items-center text-center space-y-3">
		<Avatar className="size-20 ring-4 ring-primary/20">
			<AvatarImage src={avatarSrc} alt={name} />
			<AvatarFallback className="text-2xl">{avatarFallback}</AvatarFallback>
		</Avatar>
		<div>
			<h1 className="text-xl font-bold">{name}</h1>
			<p className="text-sm text-muted-foreground">{role}</p>
		</div>
		<div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
			<span className="flex items-center gap-1">
				<Mail className="size-3" />
				{email}
			</span>
			<span className="flex items-center gap-1">
				<Phone className="size-3" />
				{phone}
			</span>
		</div>
	</div>
);

const InvoiceMeta = ({ number, date, dueDate, status }: InvoiceMetaProps) => {
	const statusVariant =
		status === 'paid'
			? 'default'
			: status === 'overdue'
				? 'destructive'
				: 'secondary';
	return (
		<div className="p-4 rounded-lg bg-muted/40 space-y-3">
			<div className="flex items-center justify-between">
				<span className="text-lg font-bold">Invoice {number}</span>
				<Badge variant={statusVariant} className="capitalize">
					{status}
				</Badge>
			</div>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div>
					<p className="text-muted-foreground">Issue Date</p>
					<p className="font-medium">{date}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Due Date</p>
					<p className="font-medium">{dueDate}</p>
				</div>
			</div>
		</div>
	);
};

const LineItemRow = ({ item, currency }: LineItemRowProps) => (
	<div className="p-4 rounded-lg border space-y-1">
		<div className="flex items-start justify-between gap-4">
			<div>
				<p className="font-medium">{item.description}</p>
				<p className="text-sm text-muted-foreground">{item.details}</p>
			</div>
			<p className="font-semibold whitespace-nowrap">
				{currency}
				{item.amount.toFixed(2)}
			</p>
		</div>
	</div>
);

const TotalBlock = ({
	subtotal,
	discount,
	tax,
	total,
	currency,
}: TotalBlockProps) => (
	<div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5 space-y-3">
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			{discount > 0 && (
				<div className="flex justify-between text-green-600">
					<span>Discount</span>
					<span>
						-{currency}
						{discount.toFixed(2)}
					</span>
				</div>
			)}
			<div className="flex justify-between">
				<span className="text-muted-foreground">Tax</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
		</div>
		<Separator />
		<div className="flex justify-between text-xl font-bold">
			<span>Total</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

const PaymentConfirmation = ({
	message,
	date,
	method,
}: PaymentConfirmationProps) => (
	<div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 space-y-2">
		<div className="flex items-center gap-2 text-green-600">
			<Check className="size-5" />
			<span className="font-semibold">{message}</span>
		</div>
		<div className="text-sm text-muted-foreground">
			<p>
				Paid on {date} via {method}
			</p>
		</div>
	</div>
);

export default function Main() {
	const profile: ProfileHeaderProps = {
		avatarSrc: '',
		avatarFallback: 'JD',
		name: 'Jessica Davis',
		role: 'Freelance Designer',
		email: 'jessica@design.co',
		phone: '+1 555-123-4567',
	};

	const meta: InvoiceMetaProps = {
		number: '#JD-2024-012',
		date: 'January 15, 2024',
		dueDate: 'February 15, 2024',
		status: 'paid',
	};

	const items: LineItem[] = [
		{
			description: 'Brand Identity Package',
			details: 'Logo, color palette, typography',
			amount: 2500.0,
		},
		{
			description: 'Business Card Design',
			details: 'Front and back, print-ready',
			amount: 350.0,
		},
		{
			description: 'Social Media Kit',
			details: 'Templates for 5 platforms',
			amount: 800.0,
		},
	];

	const totals: TotalBlockProps = {
		subtotal: 3650.0,
		discount: 182.5,
		tax: 277.4,
		total: 3744.9,
		currency: '$',
	};

	const payment: PaymentConfirmationProps = {
		message: 'Payment Received',
		date: 'January 20, 2024',
		method: 'Bank Transfer',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader className="border-b">
						<ProfileHeader {...profile} />
					</CardHeader>
					<CardContent className="space-y-6 pt-6">
						<InvoiceMeta {...meta} />
						<div className="space-y-3">
							<p className="text-sm font-semibold">Services Rendered</p>
							{items.map((item, index) => (
								<LineItemRow key={index} item={item} currency="$" />
							))}
						</div>
						<TotalBlock {...totals} />
						<PaymentConfirmation {...payment} />
						<Button variant="outline" className="w-full gap-2">
							<Download className="size-4" />
							Download Receipt
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
