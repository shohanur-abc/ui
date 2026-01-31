import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Book,
	Calendar,
	Download,
	GraduationCap,
	Star,
	User,
	Video,
} from 'lucide-react';

interface StudentProps {
	name: string;
	email: string;
	enrollmentDate: string;
}

interface CourseProps {
	title: string;
	instructor: string;
	category: string;
	hours: number;
	rating: number;
	price: number;
	originalPrice: number;
}

interface TotalsProps {
	original: number;
	discount: number;
	total: number;
	currency: string;
}

const PurchaseHeader = ({
	orderNumber,
	date,
}: {
	orderNumber: string;
	date: string;
}) => (
	<div className="py-6">
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-3">
				<GraduationCap className="size-8 text-primary" />
				<div>
					<h1 className="text-2xl font-bold">Course Purchase Receipt</h1>
					<p className="text-sm text-muted-foreground">
						Thank you for your purchase!
					</p>
				</div>
			</div>
			<div className="text-right">
				<p className="text-xs text-muted-foreground">Order Number</p>
				<p className="font-mono font-bold">{orderNumber}</p>
				<p className="text-xs text-muted-foreground mt-1">{date}</p>
			</div>
		</div>
	</div>
);

const StudentSection = ({ student }: { student: StudentProps }) => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Student Information
		</p>
		<div className="flex items-center gap-4">
			<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
				<User className="size-6 text-primary" />
			</div>
			<div>
				<p className="font-bold">{student.name}</p>
				<p className="text-sm text-muted-foreground">{student.email}</p>
				<p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
					<Calendar className="size-3" />
					Member since {student.enrollmentDate}
				</p>
			</div>
		</div>
	</div>
);

const CourseRow = ({
	course,
	currency,
}: {
	course: CourseProps;
	currency: string;
}) => (
	<>
		<div className="py-4">
			<div className="flex items-start justify-between">
				<div className="flex gap-4">
					<div className="size-20 rounded-lg bg-muted flex items-center justify-center">
						<Video className="size-8 text-muted-foreground" />
					</div>
					<div>
						<Badge variant="outline" className="text-xs mb-1">
							{course.category}
						</Badge>
						<h3 className="font-bold">{course.title}</h3>
						<p className="text-sm text-muted-foreground">
							By {course.instructor}
						</p>
						<div className="flex items-center gap-4 mt-2 text-sm">
							<span className="flex items-center gap-1">
								<Book className="size-3 text-muted-foreground" />
								{course.hours} hours
							</span>
							<span className="flex items-center gap-1">
								<Star className="size-3 fill-amber-400 text-amber-400" />
								{course.rating}
							</span>
						</div>
					</div>
				</div>
				<div className="text-right">
					{course.originalPrice > course.price && (
						<p className="text-sm text-muted-foreground line-through">
							{currency}
							{course.originalPrice.toFixed(2)}
						</p>
					)}
					<p className="font-bold text-lg">
						{currency}
						{course.price.toFixed(2)}
					</p>
				</div>
			</div>
		</div>
		<Separator />
	</>
);

const TotalsSection = ({
	original,
	discount,
	total,
	currency,
}: TotalsProps) => (
	<div className="py-4 space-y-3">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Original Price</span>
			<span>
				{currency}
				{original.toFixed(2)}
			</span>
		</div>
		{discount > 0 && (
			<>
				<Separator />
				<div className="flex justify-between text-sm text-green-600">
					<span>Discount</span>
					<span>
						-{currency}
						{discount.toFixed(2)}
					</span>
				</div>
			</>
		)}
		<Separator />
		<div className="flex justify-between text-xl font-bold pt-2">
			<span>Total Paid</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

const AccessInfo = () => (
	<div className="py-4">
		<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
			Access Information
		</p>
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Access Duration</span>
				<span className="font-medium">Lifetime</span>
			</div>
			<Separator />
			<div className="flex justify-between">
				<span className="text-muted-foreground">Certificate</span>
				<span className="font-medium">Upon Completion</span>
			</div>
			<Separator />
			<div className="flex justify-between">
				<span className="text-muted-foreground">Mobile Access</span>
				<span className="font-medium">iOS & Android</span>
			</div>
			<Separator />
			<div className="flex justify-between">
				<span className="text-muted-foreground">Downloadable Resources</span>
				<span className="font-medium">Included</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const student: StudentProps = {
		name: 'Alex Thompson',
		email: 'alex.t@email.com',
		enrollmentDate: 'January 2023',
	};

	const courses: CourseProps[] = [
		{
			title: 'Complete React Developer Course',
			instructor: 'Sarah Chen',
			category: 'Web Development',
			hours: 42,
			rating: 4.8,
			price: 89.99,
			originalPrice: 199.99,
		},
		{
			title: 'Advanced TypeScript Masterclass',
			instructor: 'Michael Brown',
			category: 'Programming',
			hours: 28,
			rating: 4.9,
			price: 74.99,
			originalPrice: 149.99,
		},
		{
			title: 'System Design for Interviews',
			instructor: 'David Park',
			category: 'Career',
			hours: 18,
			rating: 4.7,
			price: 59.99,
			originalPrice: 129.99,
		},
	];

	const totals: TotalsProps = {
		original: 479.97,
		discount: 254.97,
		total: 224.97,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<PurchaseHeader
					orderNumber="ORD-2024-EDU-456"
					date="February 20, 2024"
				/>
				<Separator />
				<StudentSection student={student} />
				<Separator />
				<div className="py-4">
					<p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
						Courses Purchased
					</p>
				</div>
				{courses.map((course, index) => (
					<CourseRow key={index} course={course} currency="$" />
				))}
				<div className="grid @md:grid-cols-2 gap-8">
					<AccessInfo />
					<TotalsSection {...totals} />
				</div>
				<Separator className="my-4" />
				<div className="flex items-center justify-between">
					<div>
						<p className="font-medium">Start Learning Now!</p>
						<p className="text-sm text-muted-foreground">
							Your courses are ready in your dashboard
						</p>
					</div>
					<div className="flex gap-4">
						<Button variant="outline" className="gap-2">
							<Download className="size-4" />
							Download Receipt
						</Button>
						<Button>Go to Dashboard</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
