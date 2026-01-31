import Link from 'next/link';
import { Mail, Phone, ArrowRight, ArrowLeft, Bell, ShoppingBag, Check, MessageSquare, Mail as MailIcon, Smartphone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const StepIndicator = ({
	steps,
	currentStep,
}: {
	steps: string[];
	currentStep: number;
}) => (
	<div className="space-y-2 mb-6">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Step {currentStep} of {steps.length}</span>
			<span className="font-medium">{steps[currentStep - 1]}</span>
		</div>
		<Progress value={(currentStep / steps.length) * 100} className="h-2" />
	</div>
);

const PreferenceToggle = ({
	id,
	icon: Icon,
	title,
	description,
	defaultChecked,
}: {
	id: string;
	icon: React.ElementType;
	title: string;
	description: string;
	defaultChecked?: boolean;
}) => (
	<div className="flex items-start justify-between gap-4 p-3 rounded-lg border border-border/50">
		<div className="flex items-start gap-3">
			<div className="flex size-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
				<Icon className="size-4 text-muted-foreground" />
			</div>
			<div>
				<Label htmlFor={id} className="font-medium text-sm cursor-pointer">
					{title}
				</Label>
				<p className="text-xs text-muted-foreground">{description}</p>
			</div>
		</div>
		<Switch id={id} defaultChecked={defaultChecked} />
	</div>
);

const NavigationButtons = ({
	showBack,
	nextLabel,
	nextIcon: NextIcon,
}: {
	showBack: boolean;
	nextLabel: string;
	nextIcon?: React.ElementType;
}) => (
	<div className="flex gap-3">
		{showBack && (
			<Button type="button" variant="outline" className="gap-2">
				<ArrowLeft className="size-4" />
				Back
			</Button>
		)}
		<Button type="submit" className="flex-1 gap-2 group">
			{nextLabel}
			{NextIcon && <NextIcon className="size-4 transition-transform group-hover:translate-x-0.5" />}
		</Button>
	</div>
);

const NotificationsStep = () => (
	<form className="space-y-4">
		<p className="text-sm text-muted-foreground">
			Choose how you&apos;d like to receive updates about your orders and special offers.
		</p>

		<div className="space-y-3">
			<h4 className="text-sm font-medium">Order Updates</h4>
			<PreferenceToggle
				id="email-orders"
				icon={MailIcon}
				title="Email Notifications"
				description="Get order confirmations and shipping updates"
				defaultChecked
			/>
			<PreferenceToggle
				id="sms-orders"
				icon={Smartphone}
				title="SMS Notifications"
				description="Receive text updates for delivery status"
				defaultChecked
			/>
		</div>

		<Separator />

		<div className="space-y-3">
			<h4 className="text-sm font-medium">Marketing</h4>
			<PreferenceToggle
				id="promo-emails"
				icon={Bell}
				title="Promotional Emails"
				description="Sales, new arrivals, and exclusive offers"
			/>
			<PreferenceToggle
				id="personalized"
				icon={MessageSquare}
				title="Personalized Recommendations"
				description="Product suggestions based on your interests"
			/>
		</div>

		<NavigationButtons showBack={true} nextLabel="Complete Setup" nextIcon={Check} />
	</form>
);

export default function Main() {
	const steps = ['Account', 'Profile', 'Preferences', 'Notifications'];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="ShopNow" icon={ShoppingBag} />
						</div>
						<CardTitle className="text-2xl">Notification Preferences</CardTitle>
						<CardDescription>Stay updated on orders and deals</CardDescription>
					</CardHeader>
					<CardContent>
						<StepIndicator steps={steps} currentStep={4} />
						<NotificationsStep />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
