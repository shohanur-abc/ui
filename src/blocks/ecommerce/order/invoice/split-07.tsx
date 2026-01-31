import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Award, GraduationCap, Play, Timer, Trophy, Users } from 'lucide-react';

interface CourseFeatureProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}

interface CourseInfoProps {
	title: string;
	instructor: string;
	rating: number;
	students: number;
	features: CourseFeatureProps[];
}

interface EnrollmentDetailsProps {
	enrollmentId: string;
	enrolledDate: string;
	status: string;
	accessType: string;
}

interface CourseSyllabusProps {
	modules: { name: string; lessons: number; duration: string }[];
}

interface PaymentDetailsProps {
	originalPrice: number;
	discount: number;
	discountCode: string;
	total: number;
	currency: string;
	paymentMethod: string;
}

const CourseInfo = ({
	title,
	instructor,
	rating,
	students,
	features,
}: CourseInfoProps) => (
	<div className="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 space-y-4">
		<div>
			<Badge variant="secondary" className="mb-2">
				Online Course
			</Badge>
			<h2 className="text-xl font-bold">{title}</h2>
			<p className="text-sm text-muted-foreground">by {instructor}</p>
		</div>
		<div className="flex items-center gap-4 text-sm">
			<div className="flex items-center gap-1">
				<Trophy className="size-4 text-amber-500" />
				<span className="font-medium">{rating}</span>
			</div>
			<div className="flex items-center gap-1 text-muted-foreground">
				<Users className="size-4" />
				<span>{students.toLocaleString()} students</span>
			</div>
		</div>
		<div className="grid grid-cols-2 gap-3">
			{features.map((feature, index) => (
				<div key={index} className="flex items-center gap-2 text-sm">
					<feature.icon className="size-4 text-muted-foreground" />
					<span className="text-muted-foreground">{feature.label}:</span>
					<span className="font-medium">{feature.value}</span>
				</div>
			))}
		</div>
	</div>
);

const EnrollmentDetails = ({
	enrollmentId,
	enrolledDate,
	status,
	accessType,
}: EnrollmentDetailsProps) => (
	<div className="p-4 rounded-lg bg-muted/40 space-y-3">
		<div className="flex items-center justify-between">
			<div>
				<p className="text-xs text-muted-foreground">Enrollment ID</p>
				<p className="font-mono font-bold">{enrollmentId}</p>
			</div>
			<Badge variant="default">{status}</Badge>
		</div>
		<div className="grid grid-cols-2 gap-4 text-sm">
			<div>
				<p className="text-muted-foreground">Enrolled</p>
				<p className="font-medium">{enrolledDate}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Access</p>
				<p className="font-medium">{accessType}</p>
			</div>
		</div>
	</div>
);

const CourseSyllabus = ({ modules }: CourseSyllabusProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<p className="font-semibold">Course Content</p>
		<div className="space-y-2">
			{modules.map((module, index) => (
				<div
					key={index}
					className="flex items-center justify-between p-2 rounded hover:bg-muted/50"
				>
					<div className="flex items-center gap-3">
						<Play className="size-4 text-muted-foreground" />
						<span className="text-sm font-medium">{module.name}</span>
					</div>
					<div className="text-xs text-muted-foreground">
						{module.lessons} lessons • {module.duration}
					</div>
				</div>
			))}
		</div>
	</div>
);

const PaymentDetails = ({
	originalPrice,
	discount,
	discountCode,
	total,
	currency,
	paymentMethod,
}: PaymentDetailsProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<p className="font-semibold">Payment Details</p>
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Original Price</span>
				<span className="line-through text-muted-foreground">
					{currency}
					{originalPrice.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-green-600">
				<span>Discount ({discountCode})</span>
				<span>
					-{currency}
					{discount.toFixed(2)}
				</span>
			</div>
		</div>
		<Separator />
		<div className="flex justify-between font-bold text-lg">
			<span>Total Paid</span>
			<span className="text-primary">
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
		<p className="text-xs text-muted-foreground">
			Payment method: {paymentMethod}
		</p>
	</div>
);

export default function Main() {
	const courseFeatures: CourseFeatureProps[] = [
		{ icon: Timer, label: 'Duration', value: '12 hours' },
		{ icon: Play, label: 'Lectures', value: '85' },
		{ icon: Award, label: 'Certificate', value: 'Yes' },
		{ icon: GraduationCap, label: 'Level', value: 'Intermediate' },
	];

	const course: CourseInfoProps = {
		title: 'Complete Web Development Bootcamp',
		instructor: 'Dr. Angela Yu',
		rating: 4.9,
		students: 125000,
		features: courseFeatures,
	};

	const enrollment: EnrollmentDetailsProps = {
		enrollmentId: 'CRS-2024-56789',
		enrolledDate: 'February 14, 2024',
		status: 'Active',
		accessType: 'Lifetime Access',
	};

	const modules = [
		{ name: 'Introduction to Web Development', lessons: 8, duration: '1h 30m' },
		{ name: 'HTML Fundamentals', lessons: 12, duration: '2h 15m' },
		{ name: 'CSS Mastery', lessons: 15, duration: '3h 00m' },
		{ name: 'JavaScript Essentials', lessons: 20, duration: '4h 00m' },
		{ name: 'React Framework', lessons: 18, duration: '3h 30m' },
	];

	const payment: PaymentDetailsProps = {
		originalPrice: 199.99,
		discount: 150.0,
		discountCode: 'LEARN2024',
		total: 49.99,
		currency: '$',
		paymentMethod: 'PayPal',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="pt-6">
						<div className="grid @lg:grid-cols-5 gap-6">
							<div className="@lg:col-span-2 space-y-4">
								<CourseInfo {...course} />
								<PaymentDetails {...payment} />
							</div>
							<div className="@lg:col-span-3 space-y-4">
								<h2 className="text-xl font-bold">Enrollment Confirmation</h2>
								<EnrollmentDetails {...enrollment} />
								<CourseSyllabus modules={modules} />
								<div className="flex gap-3">
									<Button className="flex-1 gap-2">
										<Play className="size-4" />
										Start Learning
									</Button>
									<Button variant="outline" className="flex-1">
										Download Invoice
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
