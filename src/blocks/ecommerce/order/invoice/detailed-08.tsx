import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
	BookOpen,
	Calendar,
	CheckCircle,
	Clock,
	Download,
	GraduationCap,
	MapPin,
	Star,
	User,
	Users,
} from 'lucide-react';

interface ProgramInfoProps {
	institutionName: string;
	programName: string;
	degree: string;
	department: string;
	campusLocation: string;
	academicYear: string;
	semester: string;
	enrollmentStatus: string;
}

interface StudentInfoProps {
	name: string;
	studentId: string;
	email: string;
	phone: string;
	enrollmentDate: string;
	expectedGraduation: string;
	academicStanding: string;
	gpa: number;
}

interface CourseProps {
	code: string;
	title: string;
	credits: number;
	instructor: string;
	schedule: string;
	tuitionPerCredit: number;
	status: string;
}

interface FeeItemProps {
	category: string;
	description: string;
	amount: number;
	required: boolean;
}

interface FinancialAidProps {
	type: string;
	name: string;
	amount: number;
	status: string;
	disbursementDate: string;
}

interface PaymentPlanProps {
	installment: number;
	dueDate: string;
	amount: number;
	status: string;
	paidDate?: string;
}

interface AccountSummaryProps {
	tuition: number;
	fees: number;
	totalCharges: number;
	financialAid: number;
	payments: number;
	balance: number;
	currency: string;
}

const ProgramInfo = ({
	institutionName,
	programName,
	degree,
	department,
	campusLocation,
	academicYear,
	semester,
	enrollmentStatus,
}: ProgramInfoProps) => (
	<Card className="bg-gradient-to-r from-indigo-500/5 to-violet-500/5 border-indigo-500/20">
		<CardContent className="pt-6">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div className="size-16 rounded-lg bg-indigo-500/10 flex items-center justify-center">
						<GraduationCap className="size-8 text-indigo-500" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">{institutionName}</h1>
						<p className="text-muted-foreground">{programName}</p>
					</div>
				</div>
				<Badge variant="default" className="text-sm">
					{enrollmentStatus}
				</Badge>
			</div>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mt-6 text-sm">
				<div>
					<p className="text-xs text-muted-foreground">Degree</p>
					<p className="font-medium">{degree}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Department</p>
					<p className="font-medium">{department}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Academic Year</p>
					<p className="font-medium">{academicYear}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Term</p>
					<p className="font-medium">{semester}</p>
				</div>
			</div>
			<div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-center gap-2 text-sm">
				<MapPin className="size-4 text-muted-foreground" />
				<span>{campusLocation}</span>
			</div>
		</CardContent>
	</Card>
);

const StudentInfo = ({
	name,
	studentId,
	email,
	phone,
	enrollmentDate,
	expectedGraduation,
	academicStanding,
	gpa,
}: StudentInfoProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
				<User className="size-4" />
				Student Information
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<p className="font-semibold text-lg">{name}</p>
				<p className="text-sm text-muted-foreground font-mono">{studentId}</p>
			</div>
			<div className="grid grid-cols-2 gap-3 text-sm">
				<div>
					<p className="text-xs text-muted-foreground">Email</p>
					<p className="truncate">{email}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Phone</p>
					<p>{phone}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Enrolled</p>
					<p>{enrollmentDate}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Expected Graduation</p>
					<p>{expectedGraduation}</p>
				</div>
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<div>
					<p className="text-xs text-muted-foreground">Academic Standing</p>
					<Badge variant="default" className="mt-1">
						{academicStanding}
					</Badge>
				</div>
				<div className="text-right">
					<p className="text-xs text-muted-foreground">Cumulative GPA</p>
					<div className="flex items-center gap-1 mt-1">
						<Star className="size-4 text-yellow-500 fill-yellow-500" />
						<span className="text-xl font-bold">{gpa.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CoursesTable = ({
	courses,
	currency,
}: {
	courses: CourseProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<BookOpen className="size-4" />
				Course Registration
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-24">Code</TableHead>
						<TableHead>Course Title</TableHead>
						<TableHead className="text-center">Credits</TableHead>
						<TableHead>Instructor</TableHead>
						<TableHead>Schedule</TableHead>
						<TableHead className="text-right">Per Credit</TableHead>
						<TableHead className="text-right">Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{courses.map((course, index) => (
						<TableRow key={index}>
							<TableCell className="font-mono font-medium">
								{course.code}
							</TableCell>
							<TableCell>
								{course.title}
								{course.status === 'Waitlist' && (
									<Badge variant="secondary" className="ml-2">
										Waitlist
									</Badge>
								)}
							</TableCell>
							<TableCell className="text-center">{course.credits}</TableCell>
							<TableCell>{course.instructor}</TableCell>
							<TableCell className="text-sm text-muted-foreground">
								{course.schedule}
							</TableCell>
							<TableCell className="text-right">
								{currency}
								{course.tuitionPerCredit}
							</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{(course.credits * course.tuitionPerCredit).toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="flex justify-end mt-4 text-sm">
				<div className="flex items-center gap-4">
					<span className="text-muted-foreground">Total Credits:</span>
					<span className="font-bold">
						{courses.reduce((acc, c) => acc + c.credits, 0)}
					</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const FeesTable = ({
	fees,
	currency,
}: {
	fees: FeeItemProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Users className="size-4" />
				Student Fees
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Category</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="text-center">Required</TableHead>
						<TableHead className="text-right">Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{fees.map((fee, index) => (
						<TableRow key={index}>
							<TableCell>
								<Badge variant="outline">{fee.category}</Badge>
							</TableCell>
							<TableCell>{fee.description}</TableCell>
							<TableCell className="text-center">
								{fee.required ? (
									<CheckCircle className="size-4 text-green-500 mx-auto" />
								) : (
									<span className="text-xs text-muted-foreground">
										Optional
									</span>
								)}
							</TableCell>
							<TableCell className="text-right font-medium">
								{currency}
								{fee.amount.toFixed(2)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const FinancialAidTable = ({
	aid,
	currency,
}: {
	aid: FinancialAidProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Download className="size-4" />
				Financial Aid & Scholarships
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Type</TableHead>
						<TableHead>Award Name</TableHead>
						<TableHead className="text-center">Status</TableHead>
						<TableHead>Disbursement</TableHead>
						<TableHead className="text-right">Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{aid.map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								<Badge variant="secondary">{item.type}</Badge>
							</TableCell>
							<TableCell className="font-medium">{item.name}</TableCell>
							<TableCell className="text-center">
								<Badge
									variant={item.status === 'Disbursed' ? 'default' : 'outline'}
								>
									{item.status}
								</Badge>
							</TableCell>
							<TableCell>{item.disbursementDate}</TableCell>
							<TableCell className="text-right font-medium text-green-600">
								-{currency}
								{item.amount.toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const PaymentPlanTable = ({
	plan,
	currency,
}: {
	plan: PaymentPlanProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Calendar className="size-4" />
				Payment Plan
			</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-24">Installment</TableHead>
						<TableHead>Due Date</TableHead>
						<TableHead className="text-right">Amount</TableHead>
						<TableHead className="text-center">Status</TableHead>
						<TableHead>Paid Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{plan.map((payment) => (
						<TableRow key={payment.installment}>
							<TableCell className="font-medium">
								#{payment.installment}
							</TableCell>
							<TableCell>{payment.dueDate}</TableCell>
							<TableCell className="text-right">
								{currency}
								{payment.amount.toLocaleString()}
							</TableCell>
							<TableCell className="text-center">
								<Badge
									variant={
										payment.status === 'Paid'
											? 'default'
											: payment.status === 'Due'
												? 'destructive'
												: 'secondary'
									}
									className="gap-1"
								>
									{payment.status === 'Paid' && (
										<CheckCircle className="size-3" />
									)}
									{payment.status === 'Due' && <Clock className="size-3" />}
									{payment.status}
								</Badge>
							</TableCell>
							<TableCell>{payment.paidDate || '-'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
);

const AccountSummary = ({
	tuition,
	fees,
	totalCharges,
	financialAid,
	payments,
	balance,
	currency,
}: AccountSummaryProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="pb-3">
			<CardTitle className="text-base text-primary-foreground">
				Account Summary
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="opacity-80">Tuition</span>
					<span>
						{currency}
						{tuition.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="opacity-80">Fees</span>
					<span>
						{currency}
						{fees.toLocaleString()}
					</span>
				</div>
				<Separator className="bg-primary-foreground/20" />
				<div className="flex justify-between font-medium">
					<span>Total Charges</span>
					<span>
						{currency}
						{totalCharges.toLocaleString()}
					</span>
				</div>
			</div>
			<div className="space-y-2 text-sm">
				<div className="flex justify-between text-green-300">
					<span>Financial Aid</span>
					<span>
						-{currency}
						{financialAid.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between text-green-300">
					<span>Payments Made</span>
					<span>
						-{currency}
						{payments.toLocaleString()}
					</span>
				</div>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-2xl">
				<span>Balance Due</span>
				<span>
					{currency}
					{balance.toLocaleString()}
				</span>
			</div>
			<div className="space-y-2">
				<Progress
					value={((totalCharges - balance) / totalCharges) * 100}
					className="h-2 bg-primary-foreground/20"
				/>
				<p className="text-xs text-center opacity-80">
					{(((totalCharges - balance) / totalCharges) * 100).toFixed(0)}% of
					charges covered
				</p>
			</div>
			<Button variant="secondary" className="w-full">
				Make Payment
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const program: ProgramInfoProps = {
		institutionName: 'Pacific Coast University',
		programName: 'Master of Business Administration',
		degree: 'MBA',
		department: 'School of Business',
		campusLocation: 'Main Campus - Building A, 1000 University Drive',
		academicYear: '2023-2024',
		semester: 'Spring 2024',
		enrollmentStatus: 'Full-Time',
	};

	const student: StudentInfoProps = {
		name: 'Alexander Chen',
		studentId: 'STU-2023-456789',
		email: 'a.chen@pcu.edu',
		phone: '(555) 345-6789',
		enrollmentDate: 'Aug 2023',
		expectedGraduation: 'May 2025',
		academicStanding: 'Good Standing',
		gpa: 3.78,
	};

	const courses: CourseProps[] = [
		{
			code: 'MBA 610',
			title: 'Corporate Finance',
			credits: 3,
			instructor: 'Dr. Williams',
			schedule: 'Mon/Wed 6:00-7:30 PM',
			tuitionPerCredit: 1850,
			status: 'Enrolled',
		},
		{
			code: 'MBA 620',
			title: 'Marketing Strategy',
			credits: 3,
			instructor: 'Dr. Garcia',
			schedule: 'Tue/Thu 6:00-7:30 PM',
			tuitionPerCredit: 1850,
			status: 'Enrolled',
		},
		{
			code: 'MBA 650',
			title: 'Operations Management',
			credits: 3,
			instructor: 'Dr. Johnson',
			schedule: 'Sat 9:00 AM-12:00 PM',
			tuitionPerCredit: 1850,
			status: 'Enrolled',
		},
		{
			code: 'MBA 680',
			title: 'Business Analytics',
			credits: 3,
			instructor: 'Dr. Lee',
			schedule: 'Mon 7:45-10:15 PM',
			tuitionPerCredit: 1850,
			status: 'Enrolled',
		},
	];

	const fees: FeeItemProps[] = [
		{
			category: 'Technology',
			description: 'Technology Fee',
			amount: 450,
			required: true,
		},
		{
			category: 'Student Services',
			description: 'Student Activity Fee',
			amount: 275,
			required: true,
		},
		{
			category: 'Health',
			description: 'Student Health Insurance',
			amount: 1250,
			required: true,
		},
		{
			category: 'Parking',
			description: 'Parking Permit (Semester)',
			amount: 350,
			required: false,
		},
		{
			category: 'Library',
			description: 'Library Access Fee',
			amount: 125,
			required: true,
		},
	];

	const financialAid: FinancialAidProps[] = [
		{
			type: 'Scholarship',
			name: "Dean's Excellence Scholarship",
			amount: 5000,
			status: 'Disbursed',
			disbursementDate: 'Jan 15, 2024',
		},
		{
			type: 'Grant',
			name: 'Graduate Student Grant',
			amount: 2500,
			status: 'Disbursed',
			disbursementDate: 'Jan 15, 2024',
		},
		{
			type: 'Loan',
			name: 'Federal Direct Unsubsidized Loan',
			amount: 10250,
			status: 'Pending',
			disbursementDate: 'Feb 1, 2024',
		},
	];

	const paymentPlan: PaymentPlanProps[] = [
		{
			installment: 1,
			dueDate: 'Jan 10, 2024',
			amount: 3000,
			status: 'Paid',
			paidDate: 'Jan 8, 2024',
		},
		{ installment: 2, dueDate: 'Feb 10, 2024', amount: 3000, status: 'Due' },
		{
			installment: 3,
			dueDate: 'Mar 10, 2024',
			amount: 3000,
			status: 'Upcoming',
		},
		{
			installment: 4,
			dueDate: 'Apr 10, 2024',
			amount: 2850,
			status: 'Upcoming',
		},
	];

	const summary: AccountSummaryProps = {
		tuition: 22200,
		fees: 2450,
		totalCharges: 24650,
		financialAid: 17750,
		payments: 3000,
		balance: 3900,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-6">
					<ProgramInfo {...program} />
					<StudentInfo {...student} />
					<CoursesTable courses={courses} currency="$" />
					<FeesTable fees={fees} currency="$" />
					<FinancialAidTable aid={financialAid} currency="$" />
					<div className="grid @md:grid-cols-3 gap-4">
						<div className="@md:col-span-2">
							<PaymentPlanTable plan={paymentPlan} currency="$" />
						</div>
						<AccountSummary {...summary} />
					</div>
					<Card>
						<CardContent className="pt-6 text-sm text-muted-foreground">
							<p className="font-medium text-foreground mb-2">
								Important Dates & Deadlines:
							</p>
							<div className="grid @md:grid-cols-2 gap-2">
								<p>• Last day to add/drop courses: Jan 26, 2024</p>
								<p>• Last day to withdraw: Mar 15, 2024</p>
								<p>• Spring Break: Mar 11-15, 2024</p>
								<p>• Final Exams: May 6-10, 2024</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
