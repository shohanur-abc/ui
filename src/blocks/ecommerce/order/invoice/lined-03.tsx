import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Download, FileText, User } from 'lucide-react';

interface PatientProps {
	name: string;
	dob: string;
	memberId: string;
	groupNumber: string;
}

interface ProviderProps {
	name: string;
	specialty: string;
	npi: string;
	taxId: string;
}

interface ServiceProps {
	date: string;
	code: string;
	description: string;
	billed: number;
	allowed: number;
	adjustment: number;
	patientOwes: number;
}

interface SummaryProps {
	totalBilled: number;
	totalAllowed: number;
	insurancePaid: number;
	patientOwes: number;
	currency: string;
}

const StatementHeader = ({
	claimNumber,
	statementDate,
}: {
	claimNumber: string;
	statementDate: string;
}) => (
	<div className="py-6">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<FileText className="size-8 text-primary" />
				<div>
					<h1 className="text-2xl font-bold">Explanation of Benefits</h1>
					<p className="text-sm text-muted-foreground">This is not a bill</p>
				</div>
			</div>
			<div className="text-right">
				<p className="text-xs text-muted-foreground">Claim Number</p>
				<p className="font-mono font-bold">{claimNumber}</p>
				<p className="text-xs text-muted-foreground mt-1">{statementDate}</p>
			</div>
		</div>
	</div>
);

const PatientSection = ({ patient }: { patient: PatientProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Patient Information
		</p>
		<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground flex items-center gap-1">
					<User className="size-3" />
					Name
				</p>
				<p className="font-medium">{patient.name}</p>
			</div>
			<div>
				<p className="text-muted-foreground flex items-center gap-1">
					<Calendar className="size-3" />
					DOB
				</p>
				<p className="font-medium">{patient.dob}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Member ID</p>
				<p className="font-mono font-medium">{patient.memberId}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Group Number</p>
				<p className="font-mono font-medium">{patient.groupNumber}</p>
			</div>
		</div>
	</div>
);

const ProviderSection = ({ provider }: { provider: ProviderProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Provider Information
		</p>
		<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground">Provider</p>
				<p className="font-medium">{provider.name}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Specialty</p>
				<p className="font-medium">{provider.specialty}</p>
			</div>
			<div>
				<p className="text-muted-foreground">NPI</p>
				<p className="font-mono font-medium">{provider.npi}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Tax ID</p>
				<p className="font-mono font-medium">{provider.taxId}</p>
			</div>
		</div>
	</div>
);

const ServiceRow = ({
	service,
	currency,
}: {
	service: ServiceProps;
	currency: string;
}) => (
	<>
		<div className="py-4">
			<div className="flex items-center gap-4 mb-2 text-sm">
				<span className="flex items-center gap-1 text-muted-foreground">
					<Calendar className="size-3" />
					{service.date}
				</span>
				<Badge variant="outline" className="font-mono text-xs">
					{service.code}
				</Badge>
			</div>
			<p className="font-medium mb-3">{service.description}</p>
			<div className="grid grid-cols-4 gap-4 text-sm">
				<div>
					<p className="text-muted-foreground">Billed</p>
					<p className="font-medium">
						{currency}
						{service.billed.toFixed(2)}
					</p>
				</div>
				<div>
					<p className="text-muted-foreground">Allowed</p>
					<p className="font-medium">
						{currency}
						{service.allowed.toFixed(2)}
					</p>
				</div>
				<div>
					<p className="text-muted-foreground">Adjustment</p>
					<p className="font-medium text-red-600">
						-{currency}
						{service.adjustment.toFixed(2)}
					</p>
				</div>
				<div>
					<p className="text-muted-foreground">You Owe</p>
					<p className="font-bold">
						{currency}
						{service.patientOwes.toFixed(2)}
					</p>
				</div>
			</div>
		</div>
		<Separator />
	</>
);

const SummarySection = ({
	totalBilled,
	totalAllowed,
	insurancePaid,
	patientOwes,
	currency,
}: SummaryProps) => (
	<div className="py-4 space-y-3">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Claim Summary
		</p>
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Total Billed</span>
			<span>
				{currency}
				{totalBilled.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Allowed Amount</span>
			<span>
				{currency}
				{totalAllowed.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm text-green-600">
			<span>Insurance Paid</span>
			<span>
				-{currency}
				{insurancePaid.toFixed(2)}
			</span>
		</div>
		<Separator />
		<div className="flex justify-between text-xl font-bold pt-2">
			<span>Your Responsibility</span>
			<span className="text-primary">
				{currency}
				{patientOwes.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const patient: PatientProps = {
		name: 'Jennifer Martinez',
		dob: 'April 15, 1985',
		memberId: 'XYZ123456789',
		groupNumber: 'GRP-45678',
	};

	const provider: ProviderProps = {
		name: 'Dr. Sarah Johnson',
		specialty: 'Family Medicine',
		npi: '1234567890',
		taxId: 'XX-XXXXX45',
	};

	const services: ServiceProps[] = [
		{
			date: 'Feb 10, 2024',
			code: '99214',
			description: 'Office visit, established patient, moderate complexity',
			billed: 250.0,
			allowed: 175.0,
			adjustment: 75.0,
			patientOwes: 35.0,
		},
		{
			date: 'Feb 10, 2024',
			code: '80053',
			description: 'Comprehensive metabolic panel',
			billed: 185.0,
			allowed: 95.0,
			adjustment: 90.0,
			patientOwes: 19.0,
		},
		{
			date: 'Feb 10, 2024',
			code: '85025',
			description: 'Complete blood count (CBC)',
			billed: 75.0,
			allowed: 45.0,
			adjustment: 30.0,
			patientOwes: 9.0,
		},
	];

	const summary: SummaryProps = {
		totalBilled: 510.0,
		totalAllowed: 315.0,
		insurancePaid: 252.0,
		patientOwes: 63.0,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<StatementHeader
					claimNumber="CLM-2024-789456"
					statementDate="February 15, 2024"
				/>
				<Separator />
				<PatientSection patient={patient} />
				<Separator />
				<ProviderSection provider={provider} />
				<Separator />
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
						Services
					</p>
				</div>
				{services.map((service, index) => (
					<ServiceRow key={index} service={service} currency="$" />
				))}
				<SummarySection {...summary} />
				<Separator className="my-4" />
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">
						Questions? Call Member Services: 1-800-555-0123
					</p>
					<Button className="gap-2">
						<Download className="size-4" />
						Download EOB
					</Button>
				</div>
			</div>
		</section>
	);
}
