import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	BookOpen,
	Calendar,
	GraduationCap,
	Library,
	MapPin,
	Users,
} from 'lucide-react';

interface StudentProps {
	name: string;
	studentId: string;
	program: string;
	semester: string;
	year: string;
}

interface CourseProps {
	code: string;
	name: string;
	credits: number;
	tuitionPerCredit: number;
	instructor: string;
}

interface FeeProps {
	name: string;
	amount: number;
}

interface AidProps {
	name: string;
	amount: number;
	type: string;
}

interface TotalsProps {
	tuition: number;
	fees: number;
	aid: number;
	balance: number;
	currency: string;
}

const StudentCard = ({
	name,
	studentId,
	program,
	semester,
	year,
}: StudentProps) => (
	<Card className="@md:col-span-2">
		<CardContent className="pt-4">
			<div className="flex items-start gap-4">
				<div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
					<GraduationCap className="size-7 text-primary" />
				</div>
				<div className="flex-1">
					<h2 className="text-lg font-bold">{name}</h2>
					<p className="text-sm text-muted-foreground">ID: {studentId}</p>
					<div className="grid grid-cols-2 gap-4 mt-3">
						<div>
							<p className="text-xs text-muted-foreground">Program</p>
							<p className="text-sm font-medium">{program}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Term</p>
							<p className="text-sm font-medium">
								{semester} {year}
							</p>
						</div>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CourseCard = ({
	course,
	currency,
}: {
	course: CourseProps;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-4 space-y-2">
			<div className="flex items-center justify-between">
				<Badge variant="outline">{course.code}</Badge>
				<span className="font-bold">
					{currency}
					{(course.credits * course.tuitionPerCredit).toLocaleString()}
				</span>
			</div>
			<p className="font-medium text-sm">{course.name}</p>
			<div className="flex items-center justify-between text-xs text-muted-foreground">
				<span className="flex items-center gap-1">
					<BookOpen className="size-3" />
					{course.credits} credits
				</span>
				<span className="flex items-center gap-1">
					<Users className="size-3" />
					{course.instructor}
				</span>
			</div>
		</CardContent>
	</Card>
);

const FeesCard = ({
	fees,
	currency,
}: {
	fees: FeeProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-2">
			<CardTitle className="text-sm">Fees & Charges</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			{fees.map((fee, index) => (
				<div key={index} className="flex justify-between text-sm">
					<span className="text-muted-foreground">{fee.name}</span>
					<span>
						{currency}
						{fee.amount.toLocaleString()}
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const AidCard = ({
	aids,
	currency,
}: {
	aids: AidProps[];
	currency: string;
}) => (
	<Card className="bg-green-50 dark:bg-green-950">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm">Financial Aid</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			{aids.map((aid, index) => (
				<div key={index} className="flex justify-between text-sm">
					<div>
						<span>{aid.name}</span>
						<Badge variant="outline" className="ml-2 text-[10px]">
							{aid.type}
						</Badge>
					</div>
					<span className="text-green-600 font-medium">
						-{currency}
						{aid.amount.toLocaleString()}
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const TotalsCard = ({ tuition, fees, aid, balance, currency }: TotalsProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm text-primary-foreground">
				Account Summary
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			<div className="flex justify-between text-sm opacity-80">
				<span>Tuition</span>
				<span>
					{currency}
					{tuition.toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Fees</span>
				<span>
					{currency}
					{fees.toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between text-sm text-green-300">
				<span>Financial Aid</span>
				<span>
					-{currency}
					{aid.toLocaleString()}
				</span>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-lg">
				<span>Balance Due</span>
				<span>
					{currency}
					{balance.toLocaleString()}
				</span>
			</div>
			<p className="text-xs opacity-60 text-center mt-2">
				Due: January 15, 2024
			</p>
		</CardContent>
	</Card>
);

export default function Main() {
	const student: StudentProps = {
		name: 'Emily Chen',
		studentId: 'STU-2024-45678',
		program: 'B.S. Computer Science',
		semester: 'Spring',
		year: '2024',
	};

	const courses: CourseProps[] = [
		{
			code: 'CS 301',
			name: 'Data Structures & Algorithms',
			credits: 4,
			tuitionPerCredit: 650,
			instructor: 'Dr. Smith',
		},
		{
			code: 'CS 350',
			name: 'Operating Systems',
			credits: 4,
			tuitionPerCredit: 650,
			instructor: 'Dr. Johnson',
		},
		{
			code: 'MATH 240',
			name: 'Linear Algebra',
			credits: 3,
			tuitionPerCredit: 650,
			instructor: 'Prof. Williams',
		},
		{
			code: 'CS 380',
			name: 'Database Systems',
			credits: 3,
			tuitionPerCredit: 650,
			instructor: 'Dr. Brown',
		},
		{
			code: 'ENG 200',
			name: 'Technical Writing',
			credits: 3,
			tuitionPerCredit: 650,
			instructor: 'Prof. Davis',
		},
	];

	const fees: FeeProps[] = [
		{ name: 'Technology Fee', amount: 450 },
		{ name: 'Student Activity Fee', amount: 175 },
		{ name: 'Health Services', amount: 350 },
		{ name: 'Library Fee', amount: 75 },
	];

	const aids: AidProps[] = [
		{ name: 'Academic Scholarship', amount: 5000, type: 'Merit' },
		{ name: 'Federal Pell Grant', amount: 3500, type: 'Grant' },
		{ name: 'Work-Study Award', amount: 1500, type: 'Work-Study' },
	];

	const totals: TotalsProps = {
		tuition: 11050,
		fees: 1050,
		aid: 10000,
		balance: 2100,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8">
				<div className="grid @md:grid-cols-3 gap-4">
					<StudentCard {...student} />
					<TotalsCard {...totals} />
				</div>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 mt-4">
					{courses.map((course, index) => (
						<CourseCard key={index} course={course} currency="$" />
					))}
				</div>
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					<FeesCard fees={fees} currency="$" />
					<AidCard aids={aids} currency="$" />
				</div>
				<div className="flex justify-end mt-4 gap-4">
					<Button variant="outline">Payment Plan</Button>
					<Button>Pay Now</Button>
				</div>
			</div>
		</section>
	);
}
