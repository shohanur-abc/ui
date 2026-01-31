import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Award,
	Calendar,
	Clock,
	GraduationCap,
	MapPin,
	User,
	Users,
} from 'lucide-react';

interface CourseProps {
	title: string;
	instructor: string;
	dates: string;
	duration: string;
	location: string;
}

interface ParticipantProps {
	name: string;
	email: string;
	company: string;
}

interface ItemProps {
	description: string;
	quantity: number;
	price: number;
}

interface TotalsProps {
	subtotal: number;
	discount: number;
	total: number;
	currency: string;
}

const CourseHeader = ({
	title,
	instructor,
	dates,
	duration,
	location,
}: CourseProps) => (
	<div className="border-8 border-double border-primary p-6">
		<Badge variant="default" className="mb-3 rounded-none">
			Professional Development
		</Badge>
		<h1 className="text-2xl font-bold mb-2">{title}</h1>
		<div className="grid @sm:grid-cols-2 gap-4 mt-4 text-sm">
			<div className="flex items-center gap-2">
				<User className="size-4 text-primary" />
				<span>{instructor}</span>
			</div>
			<div className="flex items-center gap-2">
				<Calendar className="size-4 text-primary" />
				<span>{dates}</span>
			</div>
			<div className="flex items-center gap-2">
				<Clock className="size-4 text-primary" />
				<span>{duration}</span>
			</div>
			<div className="flex items-center gap-2">
				<MapPin className="size-4 text-primary" />
				<span>{location}</span>
			</div>
		</div>
	</div>
);

const ParticipantCard = ({
	participant,
	index,
}: {
	participant: ParticipantProps;
	index: number;
}) => (
	<div className="border-2 border-foreground">
		<div className="bg-muted px-4 py-2 border-b-2 border-foreground flex items-center justify-between">
			<p className="text-xs font-bold uppercase tracking-widest">
				Participant {index + 1}
			</p>
			<Badge variant="outline" className="rounded-none">
				{participant.company}
			</Badge>
		</div>
		<div className="p-4">
			<p className="font-bold">{participant.name}</p>
			<p className="text-sm text-muted-foreground">{participant.email}</p>
		</div>
	</div>
);

const ItemRow = ({ item, currency }: { item: ItemProps; currency: string }) => (
	<div className="flex items-center justify-between p-4 border-x-2 border-b-2 border-foreground">
		<div className="flex-1">
			<p className="font-medium">{item.description}</p>
		</div>
		<div className="flex items-center gap-8">
			<div className="text-center border-l-2 border-foreground/30 pl-4">
				<p className="text-xs text-muted-foreground">Qty</p>
				<p className="font-bold">{item.quantity}</p>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Price</p>
				<p className="font-medium">
					{currency}
					{item.price.toFixed(2)}
				</p>
			</div>
			<div className="text-right border-l-2 border-foreground/30 pl-4 min-w-[100px]">
				<p className="text-xs text-muted-foreground">Total</p>
				<p className="font-bold">
					{currency}
					{(item.quantity * item.price).toFixed(2)}
				</p>
			</div>
		</div>
	</div>
);

const TotalsSection = ({
	subtotal,
	discount,
	total,
	currency,
}: TotalsProps) => (
	<div className="border-2 border-foreground">
		<div className="p-4 space-y-2">
			<div className="flex justify-between text-sm">
				<span>Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			{discount > 0 && (
				<div className="flex justify-between text-sm text-green-600">
					<span>Group Discount (10%)</span>
					<span>
						-{currency}
						{discount.toFixed(2)}
					</span>
				</div>
			)}
			<Separator />
			<div className="flex justify-between font-bold text-xl">
				<span>Total</span>
				<span className="text-primary">
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</div>
		<div className="bg-primary text-primary-foreground p-4 text-center">
			<p className="text-sm">Payment due before course start date</p>
		</div>
	</div>
);

const CertificateNote = () => (
	<div className="border-2 border-dashed border-primary/50 p-4 flex items-start gap-3">
		<div className="size-10 border-2 border-primary flex items-center justify-center">
			<Award className="size-5 text-primary" />
		</div>
		<div>
			<p className="font-bold text-sm">Certificate of Completion</p>
			<p className="text-sm text-muted-foreground">
				Each participant will receive a professional certificate upon successful
				completion of the course.
			</p>
		</div>
	</div>
);

export default function Main() {
	const course: CourseProps = {
		title: 'Advanced Project Management Certification',
		instructor: 'Dr. James Mitchell, PMP',
		dates: 'March 15-17, 2024',
		duration: '24 hours (3 days)',
		location: 'Conference Center, Downtown Seattle',
	};

	const participants: ParticipantProps[] = [
		{
			name: 'Sarah Williams',
			email: 's.williams@techcorp.com',
			company: 'TechCorp',
		},
		{ name: 'David Chen', email: 'd.chen@techcorp.com', company: 'TechCorp' },
		{
			name: 'Emily Rodriguez',
			email: 'e.rodriguez@techcorp.com',
			company: 'TechCorp',
		},
	];

	const items: ItemProps[] = [
		{
			description: 'Course Registration Fee (per person)',
			quantity: 3,
			price: 1495.0,
		},
		{ description: 'Course Materials & Textbook', quantity: 3, price: 125.0 },
		{ description: 'Exam Preparation Kit', quantity: 3, price: 75.0 },
		{ description: 'Certification Exam Fee', quantity: 3, price: 350.0 },
	];

	const totals: TotalsProps = {
		subtotal: 6135.0,
		discount: 613.5,
		total: 5521.5,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<CourseHeader {...course} />
				<div className="mt-4">
					<div className="flex items-center gap-2 mb-2">
						<Users className="size-4" />
						<p className="text-xs font-bold uppercase tracking-widest">
							Registered Participants
						</p>
					</div>
					<div className="grid @md:grid-cols-3 gap-2">
						{participants.map((participant, index) => (
							<ParticipantCard
								key={index}
								participant={participant}
								index={index}
							/>
						))}
					</div>
				</div>
				<div className="mt-4">
					<div className="bg-foreground text-background px-4 py-2 border-2 border-foreground border-b-0">
						<p className="text-xs font-bold uppercase tracking-widest">
							Invoice Items
						</p>
					</div>
					{items.map((item, index) => (
						<ItemRow key={index} item={item} currency="$" />
					))}
				</div>
				<div className="grid @md:grid-cols-2 gap-4 mt-4">
					<CertificateNote />
					<TotalsSection {...totals} />
				</div>
				<div className="flex justify-end gap-4 mt-4">
					<Button variant="outline" className="rounded-none">
						Download Invoice
					</Button>
					<Button className="rounded-none">Pay Now</Button>
				</div>
			</div>
		</section>
	);
}
