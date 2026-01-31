import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, ShoppingBag, PartyPopper } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const SuccessIcon = () => (
	<div className="flex justify-center mb-6">
		<div className="relative">
			<div className="size-20 rounded-full bg-green-500/10 flex items-center justify-center">
				<CheckCircle2 className="size-10 text-green-500" />
			</div>
			<div className="absolute -top-1 -right-1">
				<PartyPopper className="size-6 text-amber-500" />
			</div>
		</div>
	</div>
);

const ActionButton = ({
	label,
	icon: Icon,
	href,
	variant = 'default',
}: {
	label: string;
	icon?: React.ElementType;
	href: string;
	variant?: 'default' | 'outline';
}) => (
	<Button variant={variant} size="lg" className="w-full gap-2 group" asChild>
		<Link href={href}>
			{label}
			{Icon && (
				<Icon className="size-4 transition-transform group-hover:translate-x-0.5" />
			)}
		</Link>
	</Button>
);

const NextSteps = ({
	steps,
}: {
	steps: Array<{ number: number; text: string }>;
}) => (
	<div className="p-4 rounded-xl bg-muted/50 border border-border/50 mb-6">
		<p className="text-sm font-medium mb-3">Next steps</p>
		<div className="space-y-2">
			{steps.map((step) => (
				<div key={step.number} className="flex items-center gap-3">
					<div className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
						{step.number}
					</div>
					<span className="text-sm text-muted-foreground">{step.text}</span>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const steps = [
		{ number: 1, text: 'Add items to your cart' },
		{ number: 2, text: 'Proceed to checkout' },
		{ number: 3, text: 'Enjoy your purchase!' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="ShopNow" icon={ShoppingBag} />
						</div>
					</CardHeader>
					<CardContent className="text-center">
						<SuccessIcon />
						<CardTitle className="text-2xl mb-2">Account created!</CardTitle>
						<CardDescription className="mb-6">
							Welcome to ShopNow! Your account has been successfully created.
						</CardDescription>
						<NextSteps steps={steps} />
						<ActionButton label="Start Shopping" icon={ArrowRight} href="/shop" />
					</CardContent>
					<CardFooter className="justify-center">
						<p className="text-sm text-muted-foreground">
							Need help?{' '}
							<Link href="/support" className="text-primary hover:underline">
								Contact support
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
