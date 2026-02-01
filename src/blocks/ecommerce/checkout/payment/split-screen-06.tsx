import {
	Award,
	CheckCircle2,
	CreditCard,
	Lock,
	RefreshCw,
	Shield,
	Sparkles,
	Star,
	Zap,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface PlanProps {
	name: string;
	price: string;
	period: string;
	features: string[];
	popular?: boolean;
}

interface TestimonialProps {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	initials: string;
}

interface TrustItemProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

const PlanHeader = ({
	name,
	price,
	period,
	popular,
}: Omit<PlanProps, 'features'>) => (
	<div className="space-y-2">
		<div className="flex items-center gap-2">
			<h2 className="text-2xl font-bold">{name}</h2>
			{popular && (
				<Badge className="gap-1">
					<Sparkles className="size-3" />
					Popular
				</Badge>
			)}
		</div>
		<div className="flex items-baseline gap-1">
			<span className="text-4xl font-bold">{price}</span>
			<span className="text-muted-foreground">/{period}</span>
		</div>
	</div>
);

const FeatureItem = ({ text }: { text: string }) => (
	<div className="flex items-center gap-2">
		<CheckCircle2 className="size-4 text-primary shrink-0" />
		<span className="text-sm">{text}</span>
	</div>
);

const FeaturesList = ({ features }: { features: string[] }) => (
	<div className="space-y-3">
		{features.map((feature, index) => (
			<FeatureItem key={index} text={feature} />
		))}
	</div>
);

const Testimonial = ({
	quote,
	author,
	role,
	avatar,
	initials,
}: TestimonialProps) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-3">
		<div className="flex gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star key={i} className="size-4 fill-amber-400 text-amber-400" />
			))}
		</div>
		<p className="text-sm italic">"{quote}"</p>
		<div className="flex items-center gap-3">
			<Avatar className="size-8">
				<AvatarImage src={avatar} alt={author} />
				<AvatarFallback className="text-xs">{initials}</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-sm font-medium">{author}</p>
				<p className="text-xs text-muted-foreground">{role}</p>
			</div>
		</div>
	</div>
);

const TrustBadges = ({ items }: { items: TrustItemProps[] }) => (
	<div className="grid grid-cols-3 gap-4">
		{items.map((item, index) => (
			<div
				key={index}
				className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50"
			>
				<item.icon className="size-5 text-primary" />
				<span className="text-xs text-center text-muted-foreground">
					{item.label}
				</span>
			</div>
		))}
	</div>
);

const PaymentField = ({
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
		<Label htmlFor={id} className="text-sm">
			{label}
		</Label>
		<div className="relative">
			{Icon && (
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			)}
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				className={Icon ? 'pl-10' : ''}
			/>
		</div>
	</div>
);

const BillingToggle = ({
	monthly,
	annual,
}: {
	monthly: string;
	annual: string;
}) => (
	<div className="flex items-center justify-center gap-3 p-2 rounded-lg bg-muted/50">
		<Button variant="default" size="sm">
			{monthly}
		</Button>
		<Button variant="ghost" size="sm" className="gap-1">
			{annual}
			<Badge variant="secondary" className="text-xs ml-1">
				Save 20%
			</Badge>
		</Button>
	</div>
);

const SubscribeButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Zap className="size-4" />
		{label}
	</Button>
);

const SecurityNote = () => (
	<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
		<Lock className="size-3.5" />
		<span>Cancel anytime. No commitment.</span>
	</div>
);

export default function Main() {
	const plan: PlanProps = {
		name: 'Pro Plan',
		price: '$29',
		period: 'month',
		popular: true,
		features: [
			'Unlimited projects',
			'Advanced analytics',
			'Priority support',
			'Custom integrations',
			'Team collaboration',
			'API access',
		],
	};

	const testimonial: TestimonialProps = {
		quote:
			'This tool has transformed how we work. The ROI was visible within the first week.',
		author: 'Sarah Chen',
		role: 'CEO at TechCorp',
		avatar: '',
		initials: 'SC',
	};

	const trustItems: TrustItemProps[] = [
		{ icon: Shield, label: 'Secure' },
		{ icon: RefreshCw, label: '30-day refund' },
		{ icon: Award, label: 'Top rated' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid gap-8 @lg:grid-cols-2">
					<div className="space-y-6">
						<PlanHeader {...plan} />
						<BillingToggle monthly="Monthly" annual="Annual" />
						<Separator />
						<FeaturesList features={plan.features} />
						<Separator />
						<Testimonial {...testimonial} />
						<TrustBadges items={trustItems} />
					</div>
					<div>
						<Card className="border-border/50 bg-card/50 backdrop-blur-sm @lg:sticky @lg:top-8">
							<CardHeader className="pb-4">
								<h3 className="font-semibold">Subscribe to Pro</h3>
								<p className="text-sm text-muted-foreground">
									Enter payment details to start
								</p>
							</CardHeader>
							<CardContent className="space-y-4">
								<PaymentField
									id="email"
									label="Email"
									placeholder="john@example.com"
								/>
								<PaymentField
									id="card"
									label="Card Number"
									placeholder="1234 5678 9012 3456"
									icon={CreditCard}
								/>
								<PaymentField
									id="name"
									label="Name on Card"
									placeholder="John Doe"
								/>
								<div className="grid grid-cols-2 gap-4">
									<PaymentField id="exp" label="Expiry" placeholder="MM/YY" />
									<PaymentField
										id="cvc"
										label="CVC"
										placeholder="123"
										type="password"
									/>
								</div>
								<div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
									<div className="flex justify-between text-sm">
										<span>Pro Plan (Monthly)</span>
										<span className="font-medium">$29.00</span>
									</div>
									<div className="flex justify-between text-sm text-muted-foreground mt-1">
										<span>Tax</span>
										<span>$2.32</span>
									</div>
									<Separator className="my-2" />
									<div className="flex justify-between font-semibold">
										<span>Total today</span>
										<span>$31.32</span>
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex-col gap-4">
								<SubscribeButton label="Subscribe Now" />
								<SecurityNote />
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
