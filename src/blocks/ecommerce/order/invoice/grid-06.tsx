import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Activity,
	Heart,
	Pill,
	Stethoscope,
	TestTube,
	User,
} from 'lucide-react';

interface PatientProps {
	name: string;
	dob: string;
	memberId: string;
	visitDate: string;
}

interface ServiceProps {
	icon: React.ReactNode;
	category: string;
	description: string;
	quantity: number;
	charge: number;
	covered: number;
}

interface CoverageProps {
	type: string;
	deductible: number;
	deductibleMet: number;
	outOfPocket: number;
	outOfPocketMet: number;
}

interface SummaryProps {
	totalCharges: number;
	insuranceAdjustment: number;
	insurancePaid: number;
	patientResponsibility: number;
	currency: string;
}

const PatientCard = ({ name, dob, memberId, visitDate }: PatientProps) => (
	<Card>
		<CardContent className="pt-4">
			<div className="flex items-center gap-3">
				<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
					<User className="size-6 text-primary" />
				</div>
				<div>
					<p className="font-bold">{name}</p>
					<p className="text-xs text-muted-foreground">DOB: {dob}</p>
					<p className="text-xs text-muted-foreground">Member ID: {memberId}</p>
				</div>
			</div>
			<div className="mt-3 pt-3 border-t">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Visit Date</span>
					<span className="font-medium">{visitDate}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ServiceCard = ({
	service,
	currency,
}: {
	service: ServiceProps;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="size-8 rounded bg-primary/10 flex items-center justify-center">
						{service.icon}
					</div>
					<Badge variant="outline" className="text-[10px]">
						{service.category}
					</Badge>
				</div>
				<span className="font-bold">
					{currency}
					{service.charge.toFixed(2)}
				</span>
			</div>
			<p className="text-sm">{service.description}</p>
			<div className="flex items-center justify-between text-xs text-muted-foreground">
				<span>Qty: {service.quantity}</span>
				<span className="text-green-600">
					Covered: {currency}
					{service.covered.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const CoverageCard = ({
	type,
	deductible,
	deductibleMet,
	outOfPocket,
	outOfPocketMet,
}: CoverageProps) => (
	<Card>
		<CardHeader className="pb-2">
			<CardTitle className="text-sm">{type} Coverage</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="space-y-1">
				<div className="flex justify-between text-xs">
					<span className="text-muted-foreground">Deductible</span>
					<span>
						${deductibleMet} / ${deductible}
					</span>
				</div>
				<Progress value={(deductibleMet / deductible) * 100} className="h-2" />
			</div>
			<div className="space-y-1">
				<div className="flex justify-between text-xs">
					<span className="text-muted-foreground">Out-of-Pocket Max</span>
					<span>
						${outOfPocketMet} / ${outOfPocket}
					</span>
				</div>
				<Progress
					value={(outOfPocketMet / outOfPocket) * 100}
					className="h-2"
				/>
			</div>
		</CardContent>
	</Card>
);

const SummaryCard = ({
	totalCharges,
	insuranceAdjustment,
	insurancePaid,
	patientResponsibility,
	currency,
}: SummaryProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm text-primary-foreground">
				Payment Summary
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			<div className="flex justify-between text-sm opacity-80">
				<span>Total Charges</span>
				<span>
					{currency}
					{totalCharges.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Insurance Adjustment</span>
				<span>
					-{currency}
					{insuranceAdjustment.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm text-green-300">
				<span>Insurance Paid</span>
				<span>
					-{currency}
					{insurancePaid.toFixed(2)}
				</span>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-lg">
				<span>You Owe</span>
				<span>
					{currency}
					{patientResponsibility.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const patient: PatientProps = {
		name: 'Michael Johnson',
		dob: 'March 15, 1985',
		memberId: 'XYZ-123456789',
		visitDate: 'February 10, 2024',
	};

	const services: ServiceProps[] = [
		{
			icon: <Stethoscope className="size-4 text-primary" />,
			category: 'Office Visit',
			description: 'Established patient office visit, 45 min',
			quantity: 1,
			charge: 250.0,
			covered: 200.0,
		},
		{
			icon: <TestTube className="size-4 text-primary" />,
			category: 'Lab Work',
			description: 'Comprehensive metabolic panel',
			quantity: 1,
			charge: 185.0,
			covered: 165.0,
		},
		{
			icon: <Activity className="size-4 text-primary" />,
			category: 'Diagnostic',
			description: 'Electrocardiogram (ECG)',
			quantity: 1,
			charge: 150.0,
			covered: 120.0,
		},
		{
			icon: <Heart className="size-4 text-primary" />,
			category: 'Imaging',
			description: 'Chest X-ray, 2 views',
			quantity: 1,
			charge: 320.0,
			covered: 280.0,
		},
		{
			icon: <Pill className="size-4 text-primary" />,
			category: 'Pharmacy',
			description: 'Prescription medication (30 day)',
			quantity: 1,
			charge: 45.0,
			covered: 35.0,
		},
		{
			icon: <Stethoscope className="size-4 text-primary" />,
			category: 'Procedure',
			description: 'Venipuncture blood draw',
			quantity: 1,
			charge: 25.0,
			covered: 20.0,
		},
	];

	const coverage: CoverageProps = {
		type: 'In-Network',
		deductible: 1500,
		deductibleMet: 975,
		outOfPocket: 6000,
		outOfPocketMet: 1250,
	};

	const summary: SummaryProps = {
		totalCharges: 975.0,
		insuranceAdjustment: 155.0,
		insurancePaid: 680.0,
		patientResponsibility: 140.0,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-xl font-bold">Explanation of Benefits</h1>
						<p className="text-sm text-muted-foreground">
							Claim #CLM-2024-789456
						</p>
					</div>
					<Badge>Processed</Badge>
				</div>
				<div className="grid @md:grid-cols-3 gap-4">
					<PatientCard {...patient} />
					<CoverageCard {...coverage} />
					<SummaryCard {...summary} />
				</div>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 mt-4">
					{services.map((service, index) => (
						<ServiceCard key={index} service={service} currency="$" />
					))}
				</div>
			</div>
		</section>
	);
}
