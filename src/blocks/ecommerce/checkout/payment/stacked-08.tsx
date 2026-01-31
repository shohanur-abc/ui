import { Calendar, CreditCard, DollarSign, Lock, Percent, Split } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

interface InstallmentPlanProps {
	id: string;
	months: number;
	monthlyAmount: string;
	totalAmount: string;
	interestRate: string;
	recommended?: boolean;
}

interface CardFieldProps {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}

const SectionTitle = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
	<div className="flex items-center gap-2">
		<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
			<Icon className="size-4 text-primary" />
		</div>
		<h3 className="font-semibold">{text}</h3>
	</div>
);

const InstallmentPlan = ({ id, months, monthlyAmount, totalAmount, interestRate, recommended }: InstallmentPlanProps) => (
	<Label
		htmlFor={id}
		className="relative flex items-center gap-4 p-4 rounded-xl border border-border/50 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} />
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-semibold">{months} Months</span>
				{recommended && <Badge className="text-xs">Best Value</Badge>}
			</div>
			<p className="text-sm text-muted-foreground">
				{monthlyAmount}/month • Total: {totalAmount}
			</p>
		</div>
		<div className="text-right">
			<span className="text-xs text-muted-foreground">{interestRate} APR</span>
		</div>
	</Label>
);

const InstallmentPlans = ({ plans }: { plans: InstallmentPlanProps[] }) => (
	<RadioGroup defaultValue={plans.find(p => p.recommended)?.id || plans[0]?.id} className="space-y-3">
		{plans.map((plan) => (
			<InstallmentPlan key={plan.id} {...plan} />
		))}
	</RadioGroup>
);

const PaymentBreakdown = ({ items }: { items: { label: string; value: string; highlight?: boolean }[] }) => (
	<div className="p-4 rounded-xl bg-muted/50 space-y-3">
		{items.map((item, index) => (
			<div key={index} className={`flex justify-between ${item.highlight ? 'font-semibold text-primary' : 'text-sm'}`}>
				<span className={item.highlight ? '' : 'text-muted-foreground'}>{item.label}</span>
				<span>{item.value}</span>
			</div>
		))}
	</div>
);

const DownPaymentSlider = ({ label, value, max }: { label: string; value: number; max: number }) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<Label className="text-sm">{label}</Label>
			<span className="text-sm font-medium">${value}</span>
		</div>
		<Slider defaultValue={[value]} max={max} step={10} className="w-full" />
		<div className="flex justify-between text-xs text-muted-foreground">
			<span>$0</span>
			<span>${max}</span>
		</div>
	</div>
);

const CardInputField = ({ id, label, placeholder, type = 'text', icon: Icon }: CardFieldProps) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">{label}</Label>
		<div className="relative">
			{Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />}
			<Input id={id} type={type} placeholder={placeholder} className={Icon ? 'pl-10' : ''} />
		</div>
	</div>
);

const CardFields = ({ fields }: { fields: CardFieldProps[] }) => (
	<div className="space-y-4">
		{fields.slice(0, 2).map((field) => (
			<CardInputField key={field.id} {...field} />
		))}
		<div className="grid grid-cols-2 gap-4">
			{fields.slice(2).map((field) => (
				<CardInputField key={field.id} {...field} />
			))}
		</div>
	</div>
);

const ScheduleInfo = ({ text }: { text: string }) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
		<Calendar className="size-4 text-primary" />
		<p className="text-sm">{text}</p>
	</div>
);

const SubmitButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const installmentPlans: InstallmentPlanProps[] = [
		{ id: '3m', months: 3, monthlyAmount: '$83.33', totalAmount: '$250.00', interestRate: '0%' },
		{ id: '6m', months: 6, monthlyAmount: '$42.50', totalAmount: '$255.00', interestRate: '2%', recommended: true },
		{ id: '12m', months: 12, monthlyAmount: '$22.08', totalAmount: '$265.00', interestRate: '6%' },
	];

	const breakdownItems = [
		{ label: 'Product Price', value: '$250.00' },
		{ label: 'Down Payment', value: '$50.00' },
		{ label: 'Financed Amount', value: '$200.00' },
		{ label: 'Interest (2%)', value: '$4.00' },
		{ label: 'Monthly Payment', value: '$34.00/mo', highlight: true },
	];

	const cardFields: CardFieldProps[] = [
		{ id: 'card', label: 'Card Number', placeholder: '1234 5678 9012 3456', icon: CreditCard },
		{ id: 'name', label: 'Cardholder Name', placeholder: 'John Doe' },
		{ id: 'expiry', label: 'Expiry', placeholder: 'MM/YY' },
		{ id: 'cvv', label: 'CVV', placeholder: '123', type: 'password' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="space-y-1 pb-4">
						<SectionTitle icon={Split} text="Installment Payment" />
						<p className="text-sm text-muted-foreground">Split your purchase into easy monthly payments</p>
					</CardHeader>
					<CardContent className="space-y-6">
						<InstallmentPlans plans={installmentPlans} />
						<Separator />
						<DownPaymentSlider label="Down Payment" value={50} max={250} />
						<PaymentBreakdown items={breakdownItems} />
						<Separator />
						<div className="space-y-4">
							<SectionTitle icon={CreditCard} text="Payment Method" />
							<CardFields fields={cardFields} />
						</div>
						<ScheduleInfo text="First payment will be charged today. Subsequent payments on the 1st of each month." />
						<SubmitButton label="Start Installment Plan" />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
