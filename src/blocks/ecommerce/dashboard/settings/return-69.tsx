import {
	AlertTriangle,
	ArrowLeftRight,
	Check,
	ChevronRight,
	Clock,
	FileText,
	MessageSquare,
	Package,
	RotateCcw,
	Truck,
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

type ReturnReason = {
	id: string;
	reason: string;
	requiresPhoto: boolean;
	autoApprove: boolean;
};

type ReturnStat = {
	label: string;
	value: string;
	icon: React.ComponentType<{ className?: string }>;
};

const ReturnReasonCard = ({
	reason,
	requiresPhoto,
	autoApprove,
}: ReturnReason) => (
	<div className="flex items-center justify-between rounded-lg border p-3">
		<div className="flex items-center gap-3">
			<div
				className={`flex size-8 items-center justify-center rounded-full ${
					autoApprove
						? 'bg-emerald-500/10 text-emerald-500'
						: 'bg-muted text-muted-foreground'
				}`}
			>
				{autoApprove ? (
					<Check className="size-4" />
				) : (
					<Clock className="size-4" />
				)}
			</div>
			<div>
				<p className="font-medium">{reason}</p>
				<div className="flex items-center gap-2 mt-1">
					{requiresPhoto && (
						<Badge variant="outline" className="text-xs">
							Photo Required
						</Badge>
					)}
					{autoApprove && (
						<Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
							Auto-approve
						</Badge>
					)}
				</div>
			</div>
		</div>
		<Button variant="ghost" size="sm">
			Edit
		</Button>
	</div>
);

const StatCard = ({ label, value, icon: Icon }: ReturnStat) => (
	<div className="flex items-center gap-3 rounded-lg border p-4">
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-sm text-muted-foreground">{label}</p>
		</div>
	</div>
);

export default function Main() {
	const returnReasons: ReturnReason[] = [
		{
			id: '1',
			reason: 'Wrong item received',
			requiresPhoto: true,
			autoApprove: true,
		},
		{
			id: '2',
			reason: 'Item damaged in shipping',
			requiresPhoto: true,
			autoApprove: true,
		},
		{
			id: '3',
			reason: 'Product defective',
			requiresPhoto: true,
			autoApprove: false,
		},
		{
			id: '4',
			reason: 'Item not as described',
			requiresPhoto: true,
			autoApprove: false,
		},
		{
			id: '5',
			reason: 'Changed mind',
			requiresPhoto: false,
			autoApprove: false,
		},
		{
			id: '6',
			reason: "Doesn't fit",
			requiresPhoto: false,
			autoApprove: false,
		},
	];

	const stats: ReturnStat[] = [
		{ label: 'Return Rate', value: '3.2%', icon: RotateCcw },
		{ label: 'Pending Returns', value: '12', icon: Clock },
		{ label: 'Avg Processing', value: '2.1 days', icon: Truck },
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

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<RotateCcw className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Return Policy</CardTitle>
										<CardDescription>Configure return handling</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
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
								<div className="flex items-center justify-between">
									<div>
										<Label>Allow Exchanges</Label>
										<p className="text-sm text-muted-foreground">
											Swap for different item
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<div className="flex items-center justify-between">
									<div>
										<Label>Restocking Fee</Label>
										<p className="text-sm text-muted-foreground">
											Charge fee on returns
										</p>
									</div>
									<Switch />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Return Reasons</CardTitle>
									<Button variant="outline" size="sm">
										Add Reason
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{returnReasons.map((reason) => (
									<ReturnReasonCard key={reason.id} {...reason} />
								))}
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Return Instructions</CardTitle>
							<CardDescription>
								Instructions shown to customers when initiating a return
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<Textarea
								className="min-h-32"
								defaultValue={`To return an item:

1. Pack the item securely in its original packaging
2. Include all accessories and documentation
3. Attach the prepaid return label to the package
4. Drop off at any authorized shipping location

Returns are processed within 3-5 business days of receipt. Refunds will be issued to your original payment method.`}
							/>
							<Button size="sm" className="mt-4">
								Save Instructions
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
