import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Dumbbell, Heart, Salad, Scale, Timer, Trophy } from 'lucide-react';

interface MemberProps {
	name: string;
	memberId: string;
	plan: string;
	validThrough: string;
}

interface ServiceProps {
	icon: React.ReactNode;
	name: string;
	sessions: number;
	usedSessions: number;
	pricePerSession: number;
	color: string;
}

interface AddOnProps {
	name: string;
	price: number;
	frequency: string;
}

interface TotalsProps {
	services: number;
	addOns: number;
	discount: number;
	total: number;
	currency: string;
}

const MemberCard = ({ name, memberId, plan, validThrough }: MemberProps) => (
	<Card className="@md:col-span-2 bg-gradient-to-br from-primary/10 to-primary/5">
		<CardContent className="pt-4">
			<div className="flex items-center gap-4">
				<div className="size-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
					{name
						.split(' ')
						.map((n) => n[0])
						.join('')}
				</div>
				<div className="flex-1">
					<h2 className="text-xl font-bold">{name}</h2>
					<p className="text-sm text-muted-foreground">{memberId}</p>
					<div className="flex items-center gap-4 mt-2">
						<Badge variant="default">{plan}</Badge>
						<span className="text-xs text-muted-foreground">
							Valid through {validThrough}
						</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ServiceCard = ({
	icon,
	name,
	sessions,
	usedSessions,
	pricePerSession,
	color,
	currency,
}: ServiceProps & { currency: string }) => (
	<Card>
		<CardContent className="pt-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div
						className={`size-8 rounded-lg flex items-center justify-center ${color}`}
					>
						{icon}
					</div>
					<span className="font-medium text-sm">{name}</span>
				</div>
				<span className="font-bold">
					{currency}
					{(sessions * pricePerSession).toFixed(0)}
				</span>
			</div>
			<div className="space-y-1">
				<div className="flex justify-between text-xs text-muted-foreground">
					<span>
						{usedSessions}/{sessions} sessions used
					</span>
					<span>
						{currency}
						{pricePerSession}/session
					</span>
				</div>
				<Progress value={(usedSessions / sessions) * 100} className="h-1.5" />
			</div>
		</CardContent>
	</Card>
);

const AddOnsCard = ({
	addOns,
	currency,
}: {
	addOns: AddOnProps[];
	currency: string;
}) => (
	<Card>
		<CardHeader className="pb-2">
			<CardTitle className="text-sm">Add-On Services</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{addOns.map((addOn, index) => (
				<div key={index} className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium">{addOn.name}</p>
						<p className="text-xs text-muted-foreground">{addOn.frequency}</p>
					</div>
					<span className="font-medium">
						{currency}
						{addOn.price}
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const TotalsCard = ({
	services,
	addOns,
	discount,
	total,
	currency,
}: TotalsProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm text-primary-foreground">
				Monthly Total
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			<div className="flex justify-between text-sm opacity-80">
				<span>Training Services</span>
				<span>
					{currency}
					{services}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Add-Ons</span>
				<span>
					{currency}
					{addOns}
				</span>
			</div>
			{discount > 0 && (
				<div className="flex justify-between text-sm text-green-300">
					<span>Member Discount</span>
					<span>
						-{currency}
						{discount}
					</span>
				</div>
			)}
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-lg">
				<span>Total</span>
				<span>
					{currency}
					{total}
				</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const member: MemberProps = {
		name: 'Alex Thompson',
		memberId: 'FIT-2024-8765',
		plan: 'Premium',
		validThrough: 'Dec 2024',
	};

	const services: ServiceProps[] = [
		{
			icon: <Dumbbell className="size-4 text-blue-600" />,
			name: 'Personal Training',
			sessions: 12,
			usedSessions: 8,
			pricePerSession: 75,
			color: 'bg-blue-100',
		},
		{
			icon: <Heart className="size-4 text-red-600" />,
			name: 'Cardio Classes',
			sessions: 20,
			usedSessions: 14,
			pricePerSession: 25,
			color: 'bg-red-100',
		},
		{
			icon: <Salad className="size-4 text-green-600" />,
			name: 'Nutrition Coaching',
			sessions: 4,
			usedSessions: 2,
			pricePerSession: 100,
			color: 'bg-green-100',
		},
		{
			icon: <Timer className="size-4 text-purple-600" />,
			name: 'HIIT Sessions',
			sessions: 8,
			usedSessions: 6,
			pricePerSession: 30,
			color: 'bg-purple-100',
		},
		{
			icon: <Trophy className="size-4 text-amber-600" />,
			name: 'Competition Prep',
			sessions: 4,
			usedSessions: 1,
			pricePerSession: 150,
			color: 'bg-amber-100',
		},
		{
			icon: <Scale className="size-4 text-cyan-600" />,
			name: 'Body Composition',
			sessions: 2,
			usedSessions: 1,
			pricePerSession: 50,
			color: 'bg-cyan-100',
		},
	];

	const addOns: AddOnProps[] = [
		{ name: 'Locker Rental', price: 25, frequency: 'Monthly' },
		{ name: 'Towel Service', price: 15, frequency: 'Monthly' },
		{ name: 'Parking Pass', price: 30, frequency: 'Monthly' },
	];

	const totals: TotalsProps = {
		services: 2140,
		addOns: 70,
		discount: 210,
		total: 2000,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8">
				<div className="grid @md:grid-cols-3 gap-4">
					<MemberCard {...member} />
					<TotalsCard {...totals} />
				</div>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 mt-4">
					{services.map((service, index) => (
						<ServiceCard key={index} {...service} currency="$" />
					))}
				</div>
				<div className="mt-4">
					<AddOnsCard addOns={addOns} currency="$" />
				</div>
			</div>
		</section>
	);
}
