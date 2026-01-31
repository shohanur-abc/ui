import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Activity,
	Bell,
	Calendar,
	ChevronRight,
	Clock,
	Flame,
	Heart,
	LogOut,
	MapPin,
	Moon,
	Pill,
	Scale,
	Settings,
	Stethoscope,
	Target,
	Thermometer,
	User,
	Watch,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const HealthSidebar = ({
	src,
	fallback,
	name,
	age,
	bloodType,
	healthScore,
}: {
	src: string;
	fallback: string;
	name: string;
	age: number;
	bloodType: string;
	healthScore: number;
}) => (
	<div className="space-y-4">
		<div className="text-center">
			<Avatar className="size-20 mx-auto ring-4 ring-green-500/20">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="bg-green-500 text-white text-xl">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<h2 className="font-bold mt-3">{name}</h2>
			<p className="text-sm text-muted-foreground">{age} years old</p>
			<Badge variant="outline" className="mt-2">Blood: {bloodType}</Badge>
		</div>
		<div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm font-medium">Health Score</span>
				<span className="text-xl font-bold text-green-600">{healthScore}</span>
			</div>
			<Progress value={healthScore} className="h-2" />
			<p className="text-xs text-muted-foreground mt-2 text-center">Excellent condition</p>
		</div>
	</div>
);

const VitalStats = ({
	vitals,
}: {
	vitals: { icon: React.ElementType; label: string; value: string; status: 'normal' | 'warning' | 'alert' }[];
}) => (
	<div className="space-y-2">
		{vitals.map((vital, i) => (
			<div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
				<div className="flex items-center gap-2">
					<vital.icon className={`size-4 ${
						vital.status === 'normal' ? 'text-green-500' :
						vital.status === 'warning' ? 'text-amber-500' : 'text-red-500'
					}`} />
					<span className="text-sm">{vital.label}</span>
				</div>
				<span className="font-medium text-sm">{vital.value}</span>
			</div>
		))}
	</div>
);

const HealthNav = ({
	items,
	activeHref,
}: {
	items: { icon: React.ElementType; label: string; href: string; badge?: string }[];
	activeHref: string;
}) => (
	<nav className="space-y-1">
		{items.map((item, i) => (
			<Link
				key={i}
				href={item.href}
				className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
					item.href === activeHref
						? 'bg-green-500 text-white'
						: 'hover:bg-muted'
				}`}
			>
				<item.icon className="size-5" />
				<span className="flex-1 text-sm font-medium">{item.label}</span>
				{item.badge && (
					<Badge variant={item.href === activeHref ? 'secondary' : 'outline'}>
						{item.badge}
					</Badge>
				)}
			</Link>
		))}
	</nav>
);

const DailyProgress = ({
	metrics,
}: {
	metrics: { icon: React.ElementType; label: string; current: number; target: number; unit: string; color: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h3 className="font-semibold flex items-center gap-2">
				<Target className="size-5 text-green-500" />
				Today's Progress
			</h3>
		</CardHeader>
		<CardContent className="space-y-4">
			{metrics.map((metric, i) => (
				<div key={i} className="space-y-2">
					<div className="flex justify-between text-sm">
						<div className="flex items-center gap-2">
							<metric.icon className={`size-4 ${metric.color}`} />
							<span>{metric.label}</span>
						</div>
						<span className="text-muted-foreground">
							{metric.current.toLocaleString()} / {metric.target.toLocaleString()} {metric.unit}
						</span>
					</div>
					<Progress value={(metric.current / metric.target) * 100} className="h-2" />
				</div>
			))}
		</CardContent>
	</Card>
);

const Medications = ({
	medications,
}: {
	medications: { name: string; dosage: string; time: string; taken: boolean }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Pill className="size-5 text-blue-500" />
					Medications
				</h3>
				<Button variant="ghost" size="sm">Manage</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{medications.map((med, i) => (
				<div key={i} className={`flex items-center justify-between p-3 rounded-lg ${
					med.taken ? 'bg-green-500/10' : 'bg-muted/30'
				}`}>
					<div>
						<p className="font-medium">{med.name}</p>
						<p className="text-sm text-muted-foreground">{med.dosage} • {med.time}</p>
					</div>
					<Button
						size="sm"
						variant={med.taken ? 'ghost' : 'default'}
						className={med.taken ? 'text-green-600' : ''}
					>
						{med.taken ? '✓ Taken' : 'Take Now'}
					</Button>
				</div>
			))}
		</CardContent>
	</Card>
);

const Appointments = ({
	appointments,
}: {
	appointments: { doctor: string; specialty: string; date: string; time: string; location: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Calendar className="size-5 text-purple-500" />
					Upcoming Appointments
				</h3>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/appointments">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{appointments.map((apt, i) => (
				<div key={i} className="p-4 rounded-lg border">
					<div className="flex items-start justify-between">
						<div>
							<p className="font-medium">{apt.doctor}</p>
							<p className="text-sm text-muted-foreground">{apt.specialty}</p>
						</div>
						<Badge variant="secondary">{apt.date}</Badge>
					</div>
					<div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
						<div className="flex items-center gap-1">
							<Clock className="size-4" />
							{apt.time}
						</div>
						<div className="flex items-center gap-1">
							<MapPin className="size-4" />
							{apt.location}
						</div>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
			fallback: 'LM',
			name: 'Lisa Martinez',
			age: 32,
			bloodType: 'A+',
			healthScore: 87,
		},
		vitals: [
			{ icon: Heart, label: 'Heart Rate', value: '72 bpm', status: 'normal' as const },
			{ icon: Activity, label: 'Blood Pressure', value: '120/80', status: 'normal' as const },
			{ icon: Scale, label: 'Weight', value: '145 lbs', status: 'normal' as const },
			{ icon: Moon, label: 'Sleep', value: '7.5 hrs', status: 'normal' as const },
		],
		nav: [
			{ icon: Activity, label: 'Dashboard', href: '/health' },
			{ icon: Pill, label: 'Medications', href: '/medications', badge: '3' },
			{ icon: Calendar, label: 'Appointments', href: '/appointments', badge: '2' },
			{ icon: Stethoscope, label: 'Records', href: '/records' },
			{ icon: Watch, label: 'Devices', href: '/devices' },
			{ icon: Settings, label: 'Settings', href: '/settings' },
		],
		dailyProgress: [
			{ icon: Flame, label: 'Calories', current: 1450, target: 2000, unit: 'kcal', color: 'text-orange-500' },
			{ icon: Target, label: 'Steps', current: 6824, target: 10000, unit: 'steps', color: 'text-blue-500' },
			{ icon: Zap, label: 'Active Minutes', current: 32, target: 60, unit: 'min', color: 'text-green-500' },
			{ icon: Heart, label: 'Water', current: 5, target: 8, unit: 'glasses', color: 'text-cyan-500' },
		],
		medications: [
			{ name: 'Vitamin D3', dosage: '1000 IU', time: '8:00 AM', taken: true },
			{ name: 'Omega-3', dosage: '1000 mg', time: '12:00 PM', taken: true },
			{ name: 'Multivitamin', dosage: '1 tablet', time: '6:00 PM', taken: false },
		],
		appointments: [
			{ doctor: 'Dr. Sarah Chen', specialty: 'General Practitioner', date: 'Feb 5', time: '10:00 AM', location: 'Clinic A' },
			{ doctor: 'Dr. Michael Park', specialty: 'Dermatologist', date: 'Feb 12', time: '2:30 PM', location: 'Medical Center' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="flex flex-col @lg:flex-row gap-8">
					<aside className="w-full @lg:w-72 shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6 space-y-6">
								<HealthSidebar {...profileData.sidebar} />
								<Separator />
								<VitalStats vitals={profileData.vitals} />
								<Separator />
								<HealthNav items={profileData.nav} activeHref="/health" />
								<Separator />
								<Button variant="ghost" className="w-full justify-start gap-3 text-destructive">
									<LogOut className="size-5" />
									Sign Out
								</Button>
							</CardContent>
						</Card>
					</aside>
					<div className="flex-1 space-y-6">
						<h1 className="text-2xl font-bold">Health Dashboard</h1>
						<DailyProgress metrics={profileData.dailyProgress} />
						<div className="grid @xl:grid-cols-2 gap-6">
							<Medications medications={profileData.medications} />
							<Appointments appointments={profileData.appointments} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
