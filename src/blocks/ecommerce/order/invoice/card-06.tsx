import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	BookOpen,
	Calendar,
	Clock,
	DollarSign,
	GraduationCap,
	Library,
	User,
} from 'lucide-react';

interface StudentCardProps {
	name: string;
	studentId: string;
	program: string;
	year: string;
	email: string;
}

interface SemesterCardProps {
	semester: string;
	academicYear: string;
	enrollmentStatus: string;
	credits: number;
}

interface TuitionItemCardProps {
	category: string;
	description: string;
	credits?: number;
	amount: number;
	currency: string;
}

interface FinancialAidCardProps {
	grants: { name: string; amount: number }[];
	loans: { name: string; amount: number }[];
	scholarships: { name: string; amount: number }[];
	totalAid: number;
	currency: string;
}

interface BalanceSummaryCardProps {
	totalCharges: number;
	totalAid: number;
	previousBalance: number;
	amountDue: number;
	dueDate: string;
	currency: string;
}

const StudentCard = ({
	name,
	studentId,
	program,
	year,
	email,
}: StudentCardProps) => (
	<Card className="bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-blue-500/20">
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<User className="size-4" />
				Student Information
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div>
				<p className="text-xl font-bold">{name}</p>
				<p className="text-sm font-mono text-muted-foreground">{studentId}</p>
			</div>
			<div className="flex gap-2">
				<Badge variant="secondary">{program}</Badge>
				<Badge variant="outline">{year}</Badge>
			</div>
			<p className="text-sm text-muted-foreground">{email}</p>
		</CardContent>
	</Card>
);

const SemesterCard = ({
	semester,
	academicYear,
	enrollmentStatus,
	credits,
}: SemesterCardProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Calendar className="size-4" />
				Term Details
			</CardTitle>
		</CardHeader>
		<CardContent className="grid grid-cols-2 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground">Semester</p>
				<p className="font-medium">{semester}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Academic Year</p>
				<p className="font-medium">{academicYear}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Status</p>
				<Badge variant="default">{enrollmentStatus}</Badge>
			</div>
			<div>
				<p className="text-muted-foreground">Credits</p>
				<p className="font-medium">{credits} credits</p>
			</div>
		</CardContent>
	</Card>
);

const TuitionItemCard = ({
	category,
	description,
	credits,
	amount,
	currency,
}: TuitionItemCardProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
						{category === 'Tuition' ? (
							<GraduationCap className="size-5" />
						) : category === 'Fees' ? (
							<Library className="size-5" />
						) : (
							<BookOpen className="size-5" />
						)}
					</div>
					<div>
						<p className="font-medium">{description}</p>
						{credits && (
							<p className="text-sm text-muted-foreground">{credits} credits</p>
						)}
						<Badge variant="outline" className="text-xs">
							{category}
						</Badge>
					</div>
				</div>
				<p className="font-bold text-lg">
					{currency}
					{amount.toLocaleString()}
				</p>
			</div>
		</CardContent>
	</Card>
);

const FinancialAidCard = ({
	grants,
	loans,
	scholarships,
	totalAid,
	currency,
}: FinancialAidCardProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<DollarSign className="size-4" />
				Financial Aid Applied
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{scholarships.length > 0 && (
				<div className="space-y-2">
					<p className="text-sm font-medium text-muted-foreground">
						Scholarships
					</p>
					{scholarships.map((item, index) => (
						<div key={index} className="flex justify-between text-sm">
							<span>{item.name}</span>
							<span className="text-green-600">
								-{currency}
								{item.amount.toLocaleString()}
							</span>
						</div>
					))}
				</div>
			)}
			{grants.length > 0 && (
				<div className="space-y-2">
					<p className="text-sm font-medium text-muted-foreground">Grants</p>
					{grants.map((item, index) => (
						<div key={index} className="flex justify-between text-sm">
							<span>{item.name}</span>
							<span className="text-green-600">
								-{currency}
								{item.amount.toLocaleString()}
							</span>
						</div>
					))}
				</div>
			)}
			{loans.length > 0 && (
				<div className="space-y-2">
					<p className="text-sm font-medium text-muted-foreground">Loans</p>
					{loans.map((item, index) => (
						<div key={index} className="flex justify-between text-sm">
							<span>{item.name}</span>
							<span className="text-blue-600">
								-{currency}
								{item.amount.toLocaleString()}
							</span>
						</div>
					))}
				</div>
			)}
			<Separator />
			<div className="flex justify-between font-semibold">
				<span>Total Aid</span>
				<span className="text-green-600">
					-{currency}
					{totalAid.toLocaleString()}
				</span>
			</div>
		</CardContent>
	</Card>
);

const BalanceSummaryCard = ({
	totalCharges,
	totalAid,
	previousBalance,
	amountDue,
	dueDate,
	currency,
}: BalanceSummaryCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="pt-6 space-y-4">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="opacity-80">Total Charges</span>
					<span>
						{currency}
						{totalCharges.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Financial Aid</span>
					<span>
						-{currency}
						{totalAid.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Previous Balance</span>
					<span>
						{currency}
						{previousBalance.toLocaleString()}
					</span>
				</div>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="space-y-1">
				<p className="text-sm opacity-80">Amount Due by {dueDate}</p>
				<p className="text-3xl font-bold">
					{currency}
					{amountDue.toLocaleString()}
				</p>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<Button variant="secondary">Pay Now</Button>
				<Button variant="secondary">Payment Plan</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const student: StudentCardProps = {
		name: 'Emily Martinez',
		studentId: 'STU-2024-78901',
		program: 'Computer Science',
		year: 'Junior',
		email: 'emily.martinez@university.edu',
	};

	const semester: SemesterCardProps = {
		semester: 'Spring 2024',
		academicYear: '2023-2024',
		enrollmentStatus: 'Full-Time',
		credits: 15,
	};

	const tuitionItems: TuitionItemCardProps[] = [
		{
			category: 'Tuition',
			description: 'Undergraduate Tuition',
			credits: 15,
			amount: 12500,
			currency: '$',
		},
		{
			category: 'Fees',
			description: 'Student Activity Fee',
			amount: 350,
			currency: '$',
		},
		{
			category: 'Fees',
			description: 'Technology Fee',
			amount: 275,
			currency: '$',
		},
		{
			category: 'Fees',
			description: 'Health Services Fee',
			amount: 450,
			currency: '$',
		},
		{
			category: 'Housing',
			description: 'Residence Hall - Double',
			amount: 4500,
			currency: '$',
		},
		{
			category: 'Meal Plan',
			description: 'Meal Plan - Standard',
			amount: 2200,
			currency: '$',
		},
	];

	const financialAid: FinancialAidCardProps = {
		scholarships: [
			{ name: "Dean's Merit Scholarship", amount: 5000 },
			{ name: 'CS Department Award', amount: 1500 },
		],
		grants: [{ name: 'Federal Pell Grant', amount: 3500 }],
		loans: [{ name: 'Direct Subsidized Loan', amount: 2750 }],
		totalAid: 12750,
		currency: '$',
	};

	const balance: BalanceSummaryCardProps = {
		totalCharges: 20275,
		totalAid: 12750,
		previousBalance: 0,
		amountDue: 7525,
		dueDate: 'Jan 15, 2024',
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-4">
					<div className="flex items-center gap-2 mb-2">
						<GraduationCap className="size-5 text-primary" />
						<h1 className="text-xl font-bold">Student Account Statement</h1>
					</div>
					<div className="grid @md:grid-cols-2 gap-4">
						<StudentCard {...student} />
						<SemesterCard {...semester} />
					</div>
					<div className="space-y-3">
						<h3 className="font-semibold text-sm text-muted-foreground">
							Charges
						</h3>
						<div className="grid @md:grid-cols-2 gap-3">
							{tuitionItems.map((item, index) => (
								<TuitionItemCard key={index} {...item} />
							))}
						</div>
					</div>
					<div className="grid @md:grid-cols-2 gap-4">
						<FinancialAidCard {...financialAid} />
						<BalanceSummaryCard {...balance} />
					</div>
				</div>
			</div>
		</section>
	);
}
