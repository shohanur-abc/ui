import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	ShieldCheck,
	Lock,
	CreditCard,
	AlertTriangle,
	CheckCircle,
	XCircle,
	Eye,
	Ban,
} from 'lucide-react';

interface FraudCheck {
	name: string;
	status: 'passed' | 'warning' | 'failed';
	detail: string;
}

interface SecureOrderCardProps {
	order: {
		id: string;
		customer: { name: string; email: string; avatar: string; initials: string };
		riskScore: number;
		riskLevel: 'low' | 'medium' | 'high';
		verificationStatus: 'verified' | 'pending' | 'failed';
		paymentMethod: string;
		ipAddress: string;
		location: string;
		fraudChecks: FraudCheck[];
		amount: string;
	};
	labels: {
		riskScore: string;
		verification: string;
		payment: string;
		ipAddress: string;
		location: string;
		fraudChecks: string;
		approve: string;
		review: string;
		block: string;
	};
}

interface RiskScoreIndicatorProps {
	score: number;
	level: SecureOrderCardProps['order']['riskLevel'];
}

interface FraudCheckRowProps {
	check: FraudCheck;
}

const RiskScoreIndicator = ({ score, level }: RiskScoreIndicatorProps) => {
	const config: Record<
		typeof level,
		{ color: string; bgColor: string; label: string }
	> = {
		low: { color: 'text-accent', bgColor: 'bg-accent', label: 'Low Risk' },
		medium: {
			color: 'text-yellow-500',
			bgColor: 'bg-yellow-500',
			label: 'Medium Risk',
		},
		high: {
			color: 'text-destructive',
			bgColor: 'bg-destructive',
			label: 'High Risk',
		},
	};
	const { color, bgColor, label } = config[level];
	return (
		<div className="flex items-center gap-3">
			<div className="relative size-16">
				<svg className="size-16 -rotate-90">
					<circle
						cx="32"
						cy="32"
						r="28"
						fill="none"
						stroke="currentColor"
						strokeWidth="4"
						className="text-muted/30"
					/>
					<circle
						cx="32"
						cy="32"
						r="28"
						fill="none"
						stroke="currentColor"
						strokeWidth="4"
						strokeDasharray={`${score * 1.76} 176`}
						className={color}
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className={`text-lg font-bold ${color}`}>{score}</span>
				</div>
			</div>
			<div>
				<p className={`font-semibold ${color}`}>{label}</p>
				<p className="text-xs text-muted-foreground">Fraud Score</p>
			</div>
		</div>
	);
};

const FraudCheckRow = ({ check }: FraudCheckRowProps) => {
	const icons: Record<
		FraudCheck['status'],
		{ icon: typeof CheckCircle; className: string }
	> = {
		passed: { icon: CheckCircle, className: 'text-accent' },
		warning: { icon: AlertTriangle, className: 'text-yellow-500' },
		failed: { icon: XCircle, className: 'text-destructive' },
	};
	const { icon: Icon, className } = icons[check.status];
	return (
		<div className="flex items-center gap-3 py-2">
			<Icon className={`size-4 ${className}`} />
			<div className="flex-1">
				<p className="text-sm font-medium">{check.name}</p>
				<p className="text-xs text-muted-foreground">{check.detail}</p>
			</div>
		</div>
	);
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const SecureOrderCard = ({ order, labels }: SecureOrderCardProps) => (
	<Card
		className={`border-border/50 bg-card/50 backdrop-blur-sm ${order.riskLevel === 'high' ? 'border-destructive/30' : ''}`}
	>
		<CardHeader className="pb-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
						<ShieldCheck className="size-5 text-primary" />
					</div>
					<div>
						<CardTitle className="text-base font-mono">{order.id}</CardTitle>
						<CardDescription>Security Review</CardDescription>
					</div>
				</div>
				<Badge
					variant={
						order.verificationStatus === 'verified'
							? 'default'
							: order.verificationStatus === 'pending'
								? 'secondary'
								: 'destructive'
					}
					className="gap-1"
				>
					<Lock className="size-3" />
					{order.verificationStatus}
				</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center gap-4">
				<Avatar className="size-10">
					<AvatarImage src={order.customer.avatar} alt={order.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary">
						{order.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<p className="font-medium">{order.customer.name}</p>
					<p className="text-sm text-muted-foreground">
						{order.customer.email}
					</p>
				</div>
				<span className="text-xl font-bold">{order.amount}</span>
			</div>

			<Separator />

			<RiskScoreIndicator score={order.riskScore} level={order.riskLevel} />

			<div className="space-y-2 p-3 rounded-lg bg-muted/20 border border-border/50">
				<InfoRow label={labels.payment} value={order.paymentMethod} />
				<InfoRow label={labels.ipAddress} value={order.ipAddress} />
				<InfoRow label={labels.location} value={order.location} />
			</div>

			<div>
				<p className="text-sm font-medium mb-2">{labels.fraudChecks}</p>
				<div className="divide-y divide-border/50">
					{order.fraudChecks.map((check, i) => (
						<FraudCheckRow key={i} check={check} />
					))}
				</div>
			</div>
		</CardContent>
		<CardFooter className="gap-3 border-t border-border/50">
			<Button
				variant="ghost"
				className="flex-1 gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
			>
				<Ban className="size-4" />
				{labels.block}
			</Button>
			<Button variant="outline" className="flex-1 gap-1.5">
				<Eye className="size-4" />
				{labels.review}
			</Button>
			<Button className="flex-1" disabled={order.riskLevel === 'high'}>
				{labels.approve}
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const labels = {
		riskScore: 'Risk Score',
		verification: 'Verification',
		payment: 'Payment',
		ipAddress: 'IP Address',
		location: 'Location',
		fraudChecks: 'Security Checks',
		approve: 'Approve',
		review: 'Review',
		block: 'Block',
	};

	const order = {
		id: 'ORD-2024-001',
		customer: {
			name: 'John Smith',
			email: 'john.smith@email.com',
			avatar: '',
			initials: 'JS',
		},
		riskScore: 35,
		riskLevel: 'medium' as const,
		verificationStatus: 'pending' as const,
		paymentMethod: 'Visa •••• 4242',
		ipAddress: '192.168.1.100',
		location: 'New York, US',
		amount: '$1,249.00',
		fraudChecks: [
			{
				name: 'Card Verification',
				status: 'passed' as const,
				detail: 'CVV and AVS match',
			},
			{
				name: 'IP Geolocation',
				status: 'warning' as const,
				detail: 'Different from billing address',
			},
			{
				name: 'Velocity Check',
				status: 'passed' as const,
				detail: 'Normal order frequency',
			},
			{
				name: 'Device Fingerprint',
				status: 'passed' as const,
				detail: 'Known device',
			},
		],
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<SecureOrderCard order={order} labels={labels} />
			</div>
		</section>
	);
}
