import {
	AlertTriangle,
	CheckCircle2,
	Circle,
	Download,
	FileText,
	RefreshCw,
	Server,
	Shield,
	XCircle,
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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

type ComplianceItem = {
	id: string;
	name: string;
	description: string;
	status: 'compliant' | 'non-compliant' | 'pending';
	lastChecked: string;
};

type AuditLog = {
	id: string;
	period: string;
	status: 'completed' | 'in-progress' | 'scheduled';
	findings: number;
	date: string;
};

type Certificate = {
	id: string;
	name: string;
	issuer: string;
	validUntil: string;
	status: 'valid' | 'expiring' | 'expired';
};

const ComplianceRow = ({
	name,
	description,
	status,
	lastChecked,
}: ComplianceItem) => (
	<div className="flex items-start gap-4 py-4">
		<div
			className={`mt-0.5 ${
				status === 'compliant'
					? 'text-emerald-500'
					: status === 'non-compliant'
						? 'text-destructive'
						: 'text-amber-500'
			}`}
		>
			{status === 'compliant' ? (
				<CheckCircle2 className="size-5" />
			) : status === 'non-compliant' ? (
				<XCircle className="size-5" />
			) : (
				<Circle className="size-5" />
			)}
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{name}</span>
				<Badge
					variant={status === 'compliant' ? 'default' : 'secondary'}
					className={
						status === 'compliant'
							? 'bg-emerald-500/10 text-emerald-500 border-0'
							: status === 'non-compliant'
								? 'bg-destructive/10 text-destructive border-0'
								: ''
					}
				>
					{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
				</Badge>
			</div>
			<p className="mt-1 text-sm text-muted-foreground">{description}</p>
			<p className="mt-1 text-xs text-muted-foreground">
				Last checked: {lastChecked}
			</p>
		</div>
		<Button variant="outline" size="sm">
			Check Now
		</Button>
	</div>
);

const AuditLogRow = ({ period, status, findings, date }: AuditLog) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<FileText className="size-5 text-muted-foreground" />
			<div>
				<p className="font-medium">{period}</p>
				<p className="text-xs text-muted-foreground">{date}</p>
			</div>
		</div>
		<div className="flex items-center gap-3">
			{status === 'completed' && (
				<span className="text-sm text-muted-foreground">
					{findings} findings
				</span>
			)}
			<Badge
				variant={
					status === 'completed'
						? 'default'
						: status === 'in-progress'
							? 'secondary'
							: 'outline'
				}
				className={
					status === 'completed'
						? 'bg-emerald-500/10 text-emerald-500 border-0'
						: ''
				}
			>
				{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
			</Badge>
			{status === 'completed' && (
				<Button variant="ghost" size="icon-sm">
					<Download className="size-4" />
				</Button>
			)}
		</div>
	</div>
);

const CertificateCard = ({ name, issuer, validUntil, status }: Certificate) => (
	<div
		className={`flex items-center gap-4 rounded-lg border p-4 ${
			status === 'valid'
				? 'border-emerald-500/20 bg-emerald-500/5'
				: status === 'expiring'
					? 'border-amber-500/20 bg-amber-500/5'
					: 'border-destructive/20 bg-destructive/5'
		}`}
	>
		<div
			className={`flex size-10 items-center justify-center rounded-lg ${
				status === 'valid'
					? 'bg-emerald-500/10 text-emerald-500'
					: status === 'expiring'
						? 'bg-amber-500/10 text-amber-500'
						: 'bg-destructive/10 text-destructive'
			}`}
		>
			<Shield className="size-5" />
		</div>
		<div className="flex-1">
			<h4 className="font-medium">{name}</h4>
			<p className="text-sm text-muted-foreground">
				{issuer} • Valid until {validUntil}
			</p>
		</div>
		<Badge
			className={
				status === 'valid'
					? 'bg-emerald-500/10 text-emerald-500 border-0'
					: status === 'expiring'
						? 'bg-amber-500/10 text-amber-500 border-0'
						: 'bg-destructive/10 text-destructive border-0'
			}
		>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	</div>
);

export default function Main() {
	const complianceItems: ComplianceItem[] = [
		{
			id: '1',
			name: 'GDPR Compliance',
			description: 'General Data Protection Regulation requirements',
			status: 'compliant',
			lastChecked: 'Jan 20, 2026',
		},
		{
			id: '2',
			name: 'PCI DSS',
			description: 'Payment Card Industry Data Security Standard',
			status: 'compliant',
			lastChecked: 'Jan 15, 2026',
		},
		{
			id: '3',
			name: 'SOC 2 Type II',
			description: 'Service Organization Control audit',
			status: 'pending',
			lastChecked: 'In Progress',
		},
		{
			id: '4',
			name: 'Data Encryption',
			description: 'Encryption at rest and in transit',
			status: 'compliant',
			lastChecked: 'Jan 18, 2026',
		},
	];

	const auditLogs: AuditLog[] = [
		{
			id: '1',
			period: 'Q4 2025 Audit',
			status: 'completed',
			findings: 2,
			date: 'Jan 15, 2026',
		},
		{
			id: '2',
			period: 'Q1 2026 Audit',
			status: 'in-progress',
			findings: 0,
			date: 'In Progress',
		},
		{
			id: '3',
			period: 'Q2 2026 Audit',
			status: 'scheduled',
			findings: 0,
			date: 'Apr 1, 2026',
		},
	];

	const certificates: Certificate[] = [
		{
			id: '1',
			name: 'SSL/TLS Certificate',
			issuer: "Let's Encrypt",
			validUntil: 'Mar 15, 2026',
			status: 'valid',
		},
		{
			id: '2',
			name: 'Code Signing Certificate',
			issuer: 'DigiCert',
			validUntil: 'Feb 10, 2026',
			status: 'expiring',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @md:grid-cols-3">
						<Card className="bg-emerald-500/5 border-emerald-500/20">
							<CardContent className="pt-6 text-center">
								<div className="text-3xl font-bold text-emerald-500">94%</div>
								<p className="text-sm text-muted-foreground">
									Compliance Score
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6 text-center">
								<div className="text-3xl font-bold">12</div>
								<p className="text-sm text-muted-foreground">Checks Passed</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6 text-center">
								<div className="text-3xl font-bold text-amber-500">2</div>
								<p className="text-sm text-muted-foreground">Pending Items</p>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Shield className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Compliance Status</CardTitle>
										<CardDescription>
											Security and regulatory compliance checks
										</CardDescription>
									</div>
								</div>
								<Button variant="outline" className="gap-2">
									<RefreshCw className="size-4" />
									Run All Checks
								</Button>
							</div>
						</CardHeader>
						<CardContent className="divide-y pt-2">
							{complianceItems.map((item) => (
								<ComplianceRow key={item.id} {...item} />
							))}
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Audit Reports</CardTitle>
								<CardDescription>Security audit history</CardDescription>
							</CardHeader>
							<CardContent className="divide-y">
								{auditLogs.map((log) => (
									<AuditLogRow key={log.id} {...log} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Certificates</CardTitle>
								<CardDescription>SSL and signing certificates</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								{certificates.map((cert) => (
									<CertificateCard key={cert.id} {...cert} />
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
