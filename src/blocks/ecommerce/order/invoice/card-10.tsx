import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Activity,
	Calendar,
	Check,
	Clock,
	Dumbbell,
	Heart,
	Sparkles,
	Trophy,
	User,
	Zap,
} from 'lucide-react';

interface TrainerCardProps {
	name: string;
	certifications: string[];
	specialties: string[];
	rating: number;
	totalClients: number;
}

interface ClientCardProps {
	name: string;
	email: string;
	memberSince: string;
	fitnessGoal: string;
}

interface SessionPackageCardProps {
	name: string;
	sessionsTotal: number;
	sessionsUsed: number;
	sessionDuration: string;
	pricePerSession: number;
	totalPrice: number;
	validUntil: string;
	currency: string;
}

interface SessionHistoryCardProps {
	sessions: { date: string; type: string; duration: string }[];
}

interface PaymentCardProps {
	invoiceNumber: string;
	invoiceDate: string;
	packagePrice: number;
	discount: number;
	discountReason: string;
	total: number;
	paymentStatus: string;
	paymentMethod: string;
	currency: string;
}

const TrainerCard = ({
	name,
	certifications,
	specialties,
	rating,
	totalClients,
}: TrainerCardProps) => (
	<Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Dumbbell className="size-4" />
				Personal Trainer
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="size-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
					<User className="size-7 text-white" />
				</div>
				<div>
					<p className="text-lg font-bold">{name}</p>
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-1">
							<Trophy className="size-3 text-amber-500" />
							<span className="text-sm font-medium">{rating}</span>
						</div>
						<span className="text-sm text-muted-foreground">
							• {totalClients} clients
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap gap-1">
				{certifications.map((cert, index) => (
					<Badge key={index} variant="outline" className="text-xs">
						{cert}
					</Badge>
				))}
			</div>
			<div className="flex flex-wrap gap-2">
				{specialties.map((specialty, index) => (
					<Badge key={index} variant="secondary" className="text-xs">
						{specialty}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);

const ClientCard = ({
	name,
	email,
	memberSince,
	fitnessGoal,
}: ClientCardProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Heart className="size-4" />
				Client Profile
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div>
				<p className="font-semibold">{name}</p>
				<p className="text-sm text-muted-foreground">{email}</p>
			</div>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div>
					<p className="text-muted-foreground">Member Since</p>
					<p className="font-medium">{memberSince}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Goal</p>
					<Badge variant="secondary">{fitnessGoal}</Badge>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SessionPackageCard = ({
	name,
	sessionsTotal,
	sessionsUsed,
	sessionDuration,
	pricePerSession,
	totalPrice,
	validUntil,
	currency,
}: SessionPackageCardProps) => (
	<Card className="border-primary">
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Zap className="size-4 text-primary" />
					<CardTitle className="text-base">{name}</CardTitle>
				</div>
				<Badge variant="default">{sessionsTotal} Sessions</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-center py-4">
				<div className="relative size-32">
					<svg className="size-full -rotate-90" viewBox="0 0 36 36">
						<circle
							cx="18"
							cy="18"
							r="15.9"
							fill="none"
							className="stroke-muted"
							strokeWidth="2"
						/>
						<circle
							cx="18"
							cy="18"
							r="15.9"
							fill="none"
							className="stroke-primary"
							strokeWidth="2"
							strokeDasharray={`${(sessionsUsed / sessionsTotal) * 100} 100`}
							strokeLinecap="round"
						/>
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-2xl font-bold">{sessionsUsed}</span>
						<span className="text-xs text-muted-foreground">
							of {sessionsTotal} used
						</span>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div className="flex items-center gap-2">
					<Clock className="size-4 text-muted-foreground" />
					<span>{sessionDuration} each</span>
				</div>
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-muted-foreground" />
					<span>Valid until {validUntil}</span>
				</div>
			</div>
			<Separator />
			<div className="flex justify-between font-semibold">
				<span>
					{sessionsTotal} × {currency}
					{pricePerSession}
				</span>
				<span className="text-primary">
					{currency}
					{totalPrice.toLocaleString()}
				</span>
			</div>
		</CardContent>
	</Card>
);

const SessionHistoryCard = ({ sessions }: SessionHistoryCardProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Activity className="size-4" />
				Recent Sessions
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{sessions.map((session, index) => (
				<div
					key={index}
					className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
				>
					<div className="flex items-center gap-3">
						<div className="size-8 rounded-full bg-green-500/10 flex items-center justify-center">
							<Check className="size-4 text-green-500" />
						</div>
						<div>
							<p className="text-sm font-medium">{session.type}</p>
							<p className="text-xs text-muted-foreground">{session.date}</p>
						</div>
					</div>
					<Badge variant="outline">{session.duration}</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const PaymentCard = ({
	invoiceNumber,
	invoiceDate,
	packagePrice,
	discount,
	discountReason,
	total,
	paymentStatus,
	paymentMethod,
	currency,
}: PaymentCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="pt-6 space-y-4">
			<div className="flex items-center justify-between text-sm">
				<span className="font-mono opacity-80">{invoiceNumber}</span>
				<span className="opacity-80">{invoiceDate}</span>
			</div>
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="opacity-80">Package Price</span>
					<span>
						{currency}
						{packagePrice.toLocaleString()}
					</span>
				</div>
				{discount > 0 && (
					<div className="flex justify-between text-green-300">
						<span>{discountReason}</span>
						<span>
							-{currency}
							{discount}
						</span>
					</div>
				)}
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-xl">
				<span>Total</span>
				<span>
					{currency}
					{total.toLocaleString()}
				</span>
			</div>
			<div className="flex justify-between items-center text-sm">
				<span className="opacity-80">{paymentMethod}</span>
				<Badge variant="secondary" className="gap-1">
					<Check className="size-3" />
					{paymentStatus}
				</Badge>
			</div>
			<Button variant="secondary" className="w-full gap-2">
				<Sparkles className="size-4" />
				Book Next Session
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const trainer: TrainerCardProps = {
		name: 'Marcus Rodriguez',
		certifications: ['NASM-CPT', 'ACE', 'Precision Nutrition'],
		specialties: ['Strength Training', 'HIIT', 'Sports Performance'],
		rating: 4.9,
		totalClients: 127,
	};

	const client: ClientCardProps = {
		name: 'Jennifer Walsh',
		email: 'jennifer.walsh@email.com',
		memberSince: 'October 2023',
		fitnessGoal: 'Muscle Building',
	};

	const sessionPackage: SessionPackageCardProps = {
		name: 'Elite Training Package',
		sessionsTotal: 12,
		sessionsUsed: 5,
		sessionDuration: '60 minutes',
		pricePerSession: 95,
		totalPrice: 1140,
		validUntil: 'May 15, 2024',
		currency: '$',
	};

	const sessions = [
		{ date: 'Feb 20, 2024', type: 'Full Body Strength', duration: '60 min' },
		{ date: 'Feb 18, 2024', type: 'HIIT Circuit', duration: '45 min' },
		{ date: 'Feb 15, 2024', type: 'Upper Body Focus', duration: '60 min' },
		{ date: 'Feb 13, 2024', type: 'Core & Cardio', duration: '45 min' },
	];

	const payment: PaymentCardProps = {
		invoiceNumber: 'INV-2024-0678',
		invoiceDate: 'Feb 1, 2024',
		packagePrice: 1140,
		discount: 114,
		discountReason: 'Loyalty Discount (10%)',
		total: 1026,
		paymentStatus: 'Paid',
		paymentMethod: 'Credit Card ****4521',
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="space-y-4">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							<Dumbbell className="size-5 text-primary" />
							<h1 className="text-xl font-bold">Training Package Invoice</h1>
						</div>
					</div>
					<div className="grid @md:grid-cols-2 gap-4">
						<TrainerCard {...trainer} />
						<ClientCard {...client} />
					</div>
					<SessionPackageCard {...sessionPackage} />
					<div className="grid @md:grid-cols-2 gap-4">
						<SessionHistoryCard sessions={sessions} />
						<PaymentCard {...payment} />
					</div>
				</div>
			</div>
		</section>
	);
}
