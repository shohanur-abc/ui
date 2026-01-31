import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Activity,
	Calendar,
	Clock,
	FileText,
	Heart,
	MapPin,
	Phone,
	Pill,
	Stethoscope,
	User,
} from 'lucide-react';

interface PatientInfoProps {
	name: string;
	dateOfBirth: string;
	gender: string;
	patientId: string;
	ssn: string;
	phone: string;
	address: string;
}

interface InsuranceInfoProps {
	primaryInsurance: string;
	memberId: string;
	groupNumber: string;
	policyHolder: string;
	relationship: string;
	effectiveDate: string;
	secondaryInsurance?: string;
}

interface VisitInfoProps {
	visitDate: string;
	visitType: string;
	facility: string;
	department: string;
	admittingPhysician: string;
	attendingPhysician: string;
	referringPhysician: string;
	claimNumber: string;
}

interface DiagnosisProps {
	code: string;
	description: string;
	type: string;
}

interface ProcedureProps {
	code: string;
	description: string;
	date: string;
	physician: string;
	charges: number;
}

interface ChargeItemProps {
	date: string;
	department: string;
	description: string;
	code: string;
	quantity: number;
	unitPrice: number;
	total: number;
}

interface PaymentSummaryProps {
	totalCharges: number;
	insuranceAdjustments: number;
	insurancePaid: number;
	patientResponsibility: number;
	deductible: number;
	copay: number;
	coinsurance: number;
	amountDue: number;
	currency: string;
}

const PatientInfo = ({
	name,
	dateOfBirth,
	gender,
	patientId,
	ssn,
	phone,
	address,
}: PatientInfoProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				<User className="size-4" />
				Patient Information
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="flex items-center gap-3">
				<Avatar className="size-12">
					<AvatarFallback className="bg-primary/10 text-primary">
						{name
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-lg">{name}</p>
					<p className="text-sm text-muted-foreground">
						{gender} • DOB: {dateOfBirth}
					</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-2 text-sm">
				<div>
					<p className="text-xs text-muted-foreground">Patient ID</p>
					<p className="font-mono">{patientId}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">SSN</p>
					<p className="font-mono">{ssn}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Phone</p>
					<p>{phone}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Address</p>
					<p className="truncate">{address}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const InsuranceInfo = ({
	primaryInsurance,
	memberId,
	groupNumber,
	policyHolder,
	relationship,
	effectiveDate,
	secondaryInsurance,
}: InsuranceInfoProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				<Heart className="size-4" />
				Insurance Information
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3 text-sm">
			<div>
				<p className="text-xs text-muted-foreground">Primary Insurance</p>
				<p className="font-semibold">{primaryInsurance}</p>
			</div>
			<div className="grid grid-cols-2 gap-2">
				<div>
					<p className="text-xs text-muted-foreground">Member ID</p>
					<p className="font-mono">{memberId}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Group Number</p>
					<p className="font-mono">{groupNumber}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Policy Holder</p>
					<p>{policyHolder}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Relationship</p>
					<p>{relationship}</p>
				</div>
			</div>
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<Calendar className="size-3" />
				<span>Effective: {effectiveDate}</span>
			</div>
			{secondaryInsurance && (
				<div className="pt-2 border-t">
					<p className="text-xs text-muted-foreground">Secondary Insurance</p>
					<p>{secondaryInsurance}</p>
				</div>
			)}
		</CardContent>
	</Card>
);

const VisitInfo = ({
	visitDate,
	visitType,
	facility,
	department,
	admittingPhysician,
	attendingPhysician,
	referringPhysician,
	claimNumber,
}: VisitInfoProps) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
					<Activity className="size-4" />
					Visit Details
				</CardTitle>
				<Badge variant="secondary">{visitType}</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-3 text-sm">
			<div className="flex items-center gap-2">
				<Calendar className="size-4 text-muted-foreground" />
				<span className="font-medium">{visitDate}</span>
			</div>
			<div className="flex items-center gap-2">
				<MapPin className="size-4 text-muted-foreground" />
				<span>
					{facility} - {department}
				</span>
			</div>
			<Separator />
			<div className="grid grid-cols-1 gap-2">
				<div className="flex items-center gap-2">
					<Stethoscope className="size-4 text-muted-foreground" />
					<span className="text-muted-foreground">Attending:</span>
					<span>{attendingPhysician}</span>
				</div>
				<div className="flex items-center gap-2">
					<User className="size-4 text-muted-foreground" />
					<span className="text-muted-foreground">Admitting:</span>
					<span>{admittingPhysician}</span>
				</div>
				<div className="flex items-center gap-2">
					<Phone className="size-4 text-muted-foreground" />
					<span className="text-muted-foreground">Referring:</span>
					<span>{referringPhysician}</span>
				</div>
			</div>
			<div className="pt-2">
				<p className="text-xs text-muted-foreground">Claim Number</p>
				<p className="font-mono font-semibold">{claimNumber}</p>
			</div>
		</CardContent>
	</Card>
);

const DiagnosisTable = ({ diagnoses }: { diagnoses: DiagnosisProps[] }) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<FileText className="size-4" />
				Diagnosis Codes (ICD-10)
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-24">Code</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="text-center">Type</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{diagnoses.map((dx, index) => (
						<TableRow key={index}>
							<TableCell className="font-mono font-medium">{dx.code}</TableCell>
							<TableCell>{dx.description}</TableCell>
							<TableCell className="text-center">
								<Badge
									variant={dx.type === 'Principal' ? 'default' : 'outline'}
								>
									{dx.type}
								</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const ProceduresTable = ({
	procedures,
	currency,
}: {
	procedures: ProcedureProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Stethoscope className="size-4" />
				Procedures (CPT/HCPCS)
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-24">Code</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Physician</TableHead>
						<TableHead className="text-right">Charges</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{procedures.map((proc, index) => (
						<TableRow key={index}>
							<TableCell className="font-mono font-medium">
								{proc.code}
							</TableCell>
							<TableCell>{proc.description}</TableCell>
							<TableCell>{proc.date}</TableCell>
							<TableCell>{proc.physician}</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{proc.charges.toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const ChargesTable = ({
	items,
	currency,
}: {
	items: ChargeItemProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Pill className="size-4" />
				Itemized Charges
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-24">Date</TableHead>
						<TableHead>Department</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="w-24">Code</TableHead>
						<TableHead className="text-center">Qty</TableHead>
						<TableHead className="text-right">Unit Price</TableHead>
						<TableHead className="text-right">Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item, index) => (
						<TableRow key={index}>
							<TableCell>{item.date}</TableCell>
							<TableCell>
								<Badge variant="outline">{item.department}</Badge>
							</TableCell>
							<TableCell>{item.description}</TableCell>
							<TableCell className="font-mono text-xs">{item.code}</TableCell>
							<TableCell className="text-center">{item.quantity}</TableCell>
							<TableCell className="text-right">
								{currency}
								{item.unitPrice.toFixed(2)}
							</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{item.total.toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const PaymentSummary = ({
	totalCharges,
	insuranceAdjustments,
	insurancePaid,
	patientResponsibility,
	deductible,
	copay,
	coinsurance,
	amountDue,
	currency,
}: PaymentSummaryProps) => (
	<Card>
		<CardContent className="pt-6 space-y-4">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Total Charges</span>
					<span className="font-medium">
						{currency}
						{totalCharges.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between text-green-600">
					<span>Insurance Adjustments</span>
					<span>
						-{currency}
						{insuranceAdjustments.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between text-green-600">
					<span>Insurance Paid</span>
					<span>
						-{currency}
						{insurancePaid.toLocaleString()}
					</span>
				</div>
			</div>
			<Separator />
			<div className="flex justify-between font-medium">
				<span>Patient Responsibility</span>
				<span>
					{currency}
					{patientResponsibility.toLocaleString()}
				</span>
			</div>
			<div className="p-3 rounded-lg bg-muted/50 space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Deductible</span>
					<span>
						{currency}
						{deductible.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Copay</span>
					<span>
						{currency}
						{copay.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Coinsurance (20%)</span>
					<span>
						{currency}
						{coinsurance.toFixed(2)}
					</span>
				</div>
			</div>
			<Separator />
			<div className="flex justify-between font-bold text-xl text-primary">
				<span>Amount Due</span>
				<span>
					{currency}
					{amountDue.toLocaleString()}
				</span>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<Button variant="outline">Payment Plan</Button>
				<Button>Pay Now</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const patient: PatientInfoProps = {
		name: 'Margaret Elizabeth Thompson',
		dateOfBirth: 'May 15, 1965',
		gender: 'Female',
		patientId: 'PT-2024-78901',
		ssn: '***-**-4567',
		phone: '(555) 234-5678',
		address: '456 Oak Street, Portland, OR 97201',
	};

	const insurance: InsuranceInfoProps = {
		primaryInsurance: 'Blue Cross Blue Shield of Oregon',
		memberId: 'XYZ789456123',
		groupNumber: 'BCB-87654',
		policyHolder: 'Margaret Thompson',
		relationship: 'Self',
		effectiveDate: 'Jan 1, 2024',
		secondaryInsurance: 'Medicare Part B',
	};

	const visit: VisitInfoProps = {
		visitDate: 'February 10-12, 2024',
		visitType: 'Inpatient',
		facility: 'Providence Portland Medical Center',
		department: 'Orthopedic Surgery',
		admittingPhysician: 'Dr. James Wilson, MD',
		attendingPhysician: 'Dr. Sarah Chen, MD',
		referringPhysician: 'Dr. Michael Brown, MD',
		claimNumber: 'CLM-2024-00456789',
	};

	const diagnoses: DiagnosisProps[] = [
		{
			code: 'M17.11',
			description: 'Primary osteoarthritis, right knee',
			type: 'Principal',
		},
		{
			code: 'E11.9',
			description: 'Type 2 diabetes mellitus without complications',
			type: 'Secondary',
		},
		{
			code: 'I10',
			description: 'Essential (primary) hypertension',
			type: 'Secondary',
		},
		{
			code: 'Z79.4',
			description: 'Long term (current) use of insulin',
			type: 'Secondary',
		},
	];

	const procedures: ProcedureProps[] = [
		{
			code: '27447',
			description: 'Total knee arthroplasty',
			date: 'Feb 11',
			physician: 'Dr. Chen',
			charges: 18500,
		},
		{
			code: '20610',
			description: 'Arthrocentesis, major joint',
			date: 'Feb 10',
			physician: 'Dr. Wilson',
			charges: 450,
		},
		{
			code: '99223',
			description: 'Initial hospital care, high complexity',
			date: 'Feb 10',
			physician: 'Dr. Chen',
			charges: 385,
		},
		{
			code: '99232',
			description: 'Subsequent hospital care, moderate',
			date: 'Feb 11',
			physician: 'Dr. Chen',
			charges: 145,
		},
		{
			code: '99238',
			description: 'Hospital discharge day management',
			date: 'Feb 12',
			physician: 'Dr. Chen',
			charges: 185,
		},
	];

	const charges: ChargeItemProps[] = [
		{
			date: 'Feb 10',
			department: 'Lab',
			description: 'Comprehensive metabolic panel',
			code: '80053',
			quantity: 1,
			unitPrice: 125,
			total: 125,
		},
		{
			date: 'Feb 10',
			department: 'Lab',
			description: 'Complete blood count',
			code: '85025',
			quantity: 1,
			unitPrice: 85,
			total: 85,
		},
		{
			date: 'Feb 10',
			department: 'Imaging',
			description: 'X-ray knee, complete',
			code: '73564',
			quantity: 1,
			unitPrice: 245,
			total: 245,
		},
		{
			date: 'Feb 11',
			department: 'OR',
			description: 'Operating room services',
			code: 'OR-001',
			quantity: 3,
			unitPrice: 2800,
			total: 8400,
		},
		{
			date: 'Feb 11',
			department: 'Anesthesia',
			description: 'General anesthesia',
			code: '00400',
			quantity: 3,
			unitPrice: 850,
			total: 2550,
		},
		{
			date: 'Feb 11',
			department: 'Implants',
			description: 'Knee prosthesis system',
			code: 'IMP-TKA',
			quantity: 1,
			unitPrice: 12500,
			total: 12500,
		},
		{
			date: 'Feb 11',
			department: 'Pharmacy',
			description: 'IV medications',
			code: 'PHARM',
			quantity: 1,
			unitPrice: 1250,
			total: 1250,
		},
		{
			date: 'Feb 11-12',
			department: 'Room',
			description: 'Semi-private room',
			code: 'RM-SP',
			quantity: 2,
			unitPrice: 1850,
			total: 3700,
		},
		{
			date: 'Feb 12',
			department: 'PT',
			description: 'Physical therapy evaluation',
			code: '97161',
			quantity: 1,
			unitPrice: 195,
			total: 195,
		},
	];

	const payment: PaymentSummaryProps = {
		totalCharges: 48715,
		insuranceAdjustments: 22450,
		insurancePaid: 19812,
		patientResponsibility: 6453,
		deductible: 2500,
		copay: 350,
		coinsurance: 3603,
		amountDue: 6453,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-6">
					<Card className="bg-gradient-to-r from-rose-500/5 to-pink-500/5 border-rose-500/20">
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="size-16 rounded-lg bg-rose-500/10 flex items-center justify-center">
										<FileText className="size-8 text-rose-500" />
									</div>
									<div>
										<h1 className="text-2xl font-bold">Hospital Statement</h1>
										<p className="text-muted-foreground">
											Explanation of Benefits & Patient Bill
										</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-xs text-muted-foreground">
										Statement Date
									</p>
									<p className="font-medium">February 20, 2024</p>
									<p className="text-xs text-muted-foreground mt-1">
										Account: #789012345
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<div className="grid @md:grid-cols-3 gap-4">
						<PatientInfo {...patient} />
						<InsuranceInfo {...insurance} />
						<VisitInfo {...visit} />
					</div>
					<DiagnosisTable diagnoses={diagnoses} />
					<ProceduresTable procedures={procedures} currency="$" />
					<ChargesTable items={charges} currency="$" />
					<div className="grid @md:grid-cols-3 gap-4">
						<div className="@md:col-span-2 p-4 rounded-lg border bg-muted/30 text-sm space-y-3">
							<p className="font-medium">Important Information:</p>
							<ul className="list-disc list-inside text-muted-foreground space-y-1 text-xs">
								<li>
									This is a combined Explanation of Benefits and Patient Bill
								</li>
								<li>Your insurance has processed this claim</li>
								<li>Payment is due within 30 days of statement date</li>
								<li>
									Financial assistance may be available - call (555) 100-2000
								</li>
								<li>
									For billing questions, contact Patient Financial Services
								</li>
							</ul>
							<div className="flex items-center gap-4 pt-2 border-t text-xs">
								<div className="flex items-center gap-1">
									<Clock className="size-3" />
									<span>Payment Due: March 22, 2024</span>
								</div>
							</div>
						</div>
						<PaymentSummary {...payment} />
					</div>
				</div>
			</div>
		</section>
	);
}
