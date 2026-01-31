import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	GraduationCap,
	Users,
	Sparkles,
	Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-2">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const Benefits = ({
	items,
}: {
	items: { icon: React.ElementType; title: string; description: string }[];
}) => (
	<div className="grid @sm:grid-cols-2 gap-4">
		{items.map(({ icon: Icon, title, description }, i) => (
			<div key={i} className="flex gap-4 p-4 rounded-xl border bg-card">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
					<Icon className="size-5 text-primary" />
				</div>
				<div>
					<h3 className="font-semibold">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		))}
	</div>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: React.ElementType;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

const StudentCard = ({
	discount,
	code,
}: {
	discount: string;
	code: string;
}) => (
	<div className="relative">
		<div className="relative rounded-3xl overflow-hidden border bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-8">
			<div className="absolute top-0 right-0 size-32 bg-primary/10 rounded-full blur-3xl" />
			<div className="relative z-10 text-center space-y-6">
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border">
					<GraduationCap className="size-5 text-primary" />
					<span className="font-medium">Student Exclusive</span>
				</div>
				<div>
					<p className="text-6xl @md:text-7xl font-bold text-primary">
						{discount}
					</p>
					<p className="text-lg text-muted-foreground">Off Your Order</p>
				</div>
				<div className="p-4 rounded-xl border bg-background/80 backdrop-blur">
					<p className="text-sm text-muted-foreground mb-1">
						Use code at checkout:
					</p>
					<p className="text-2xl font-bold font-mono">{code}</p>
				</div>
				<p className="text-xs text-muted-foreground">
					Valid student ID required. Terms apply.
				</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={GraduationCap} text="Student Discount" />
						<Title text="Students Save" highlight="Big" />
						<Description text="We believe great style shouldn't break the bank, especially for students. Verify your student status and enjoy exclusive discounts year-round." />
						<Benefits
							items={[
								{
									icon: Sparkles,
									title: 'Exclusive Deals',
									description: 'Access student-only promotions',
								},
								{
									icon: Users,
									title: 'Easy Verification',
									description: 'Quick one-time verification',
								},
								{
									icon: Calendar,
									title: 'Year-Round Savings',
									description: 'Discount valid all year',
								},
							]}
						/>
						<CTA
							items={[
								{
									label: 'Verify Student Status',
									href: '/student-verify',
									icon: GraduationCap,
								},
								{
									label: 'Learn More',
									href: '/student-program',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<StudentCard discount="20%" code="STUDENT20" />
				</div>
			</div>
		</section>
	);
}
