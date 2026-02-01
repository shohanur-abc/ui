import {
	AlertTriangle,
	ArrowLeftRight,
	Check,
	Clock,
	DollarSign,
	FileText,
	HelpCircle,
	Package,
	RotateCcw,
	Settings2,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

type RefundReason = {
	id: string;
	reason: string;
	autoApprove: boolean;
};

type RefundStat = {
	label: string;
	value: string;
	subtext?: string;
};

const RefundReasonRow = ({ reason, autoApprove }: RefundReason) => (
	<div className="flex items-center justify-between py-3">
		<span className="text-sm">{reason}</span>
		<Switch defaultChecked={autoApprove} />
	</div>
);

const StatCard = ({ label, value, subtext }: RefundStat) => (
	<Card>
		<CardContent className="pt-6 text-center">
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-sm text-muted-foreground">{label}</p>
			{subtext && (
				<p className="text-xs text-muted-foreground mt-1">{subtext}</p>
			)}
		</CardContent>
	</Card>
);

export default function Main() {
	const refundReasons: RefundReason[] = [
		{ id: '1', reason: 'Item not as described', autoApprove: true },
		{ id: '2', reason: 'Wrong item received', autoApprove: true },
		{ id: '3', reason: 'Item damaged/defective', autoApprove: true },
		{ id: '4', reason: 'Changed mind', autoApprove: false },
		{ id: '5', reason: 'Found better price', autoApprove: false },
		{ id: '6', reason: 'No longer needed', autoApprove: false },
	];

	const stats: RefundStat[] = [
		{ label: 'Refund Rate', value: '2.4%', subtext: 'Last 30 days' },
		{ label: 'Avg. Processing', value: '1.5 days' },
		{ label: 'Total Refunded', value: '$1,234', subtext: 'This month' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-3">
						{stats.map((stat) => (
							<StatCard key={stat.label} {...stat} />
						))}
					</div>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<RotateCcw className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Refund Policy</CardTitle>
									<CardDescription>
										Configure your refund and return settings
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-6 pt-6">
							<div className="grid gap-4 @sm:grid-cols-2">
								<div className="space-y-2">
									<Label>Return Window</Label>
									<Select defaultValue="30">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="14">14 days</SelectItem>
											<SelectItem value="30">30 days</SelectItem>
											<SelectItem value="60">60 days</SelectItem>
											<SelectItem value="90">90 days</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label>Refund Method</Label>
									<Select defaultValue="original">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="original">
												Original Payment Method
											</SelectItem>
											<SelectItem value="credit">Store Credit</SelectItem>
											<SelectItem value="choice">Customer's Choice</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<Separator />

							<div className="space-y-4">
								<Label className="text-base">Refund Eligibility</Label>
								<RadioGroup defaultValue="standard" className="space-y-3">
									{[
										{
											value: 'strict',
											label: 'Strict',
											description:
												'Only accept returns for defective/incorrect items',
										},
										{
											value: 'standard',
											label: 'Standard',
											description:
												'Accept most returns within the return window',
										},
										{
											value: 'flexible',
											label: 'Flexible',
											description: 'Accept all returns, no questions asked',
										},
									].map((policy) => (
										<Label
											key={policy.value}
											htmlFor={policy.value}
											className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/30 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
										>
											<RadioGroupItem
												value={policy.value}
												id={policy.value}
												className="mt-1"
											/>
											<div>
												<span className="font-medium">{policy.label}</span>
												<p className="text-sm text-muted-foreground">
													{policy.description}
												</p>
											</div>
										</Label>
									))}
								</RadioGroup>
							</div>
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">
									Auto-Approve Reasons
								</CardTitle>
								<CardDescription>
									Automatically approve refunds for these reasons
								</CardDescription>
							</CardHeader>
							<CardContent className="divide-y pt-2">
								{refundReasons.map((reason) => (
									<RefundReasonRow key={reason.id} {...reason} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Additional Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="flex items-center justify-between">
									<div>
										<Label>Restocking Fee</Label>
										<p className="text-sm text-muted-foreground">
											Charge a fee for returned items
										</p>
									</div>
									<Switch />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Free Return Shipping</Label>
										<p className="text-sm text-muted-foreground">
											Provide prepaid return labels
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Require Photos</Label>
										<p className="text-sm text-muted-foreground">
											Require proof photos for refund claims
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Exchange Option</Label>
										<p className="text-sm text-muted-foreground">
											Allow product exchanges instead of refunds
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
