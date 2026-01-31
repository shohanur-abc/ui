import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Award,
	Briefcase,
	Building2,
	Calendar,
	ChevronRight,
	Clock,
	DollarSign,
	ExternalLink,
	FileText,
	Linkedin,
	Mail,
	MapPin,
	MessageSquare,
	Phone,
	Plus,
	Settings,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const ProfessionalHeader = ({
	src,
	fallback,
	name,
	title,
	company,
	location,
	availability,
}: {
	src: string;
	fallback: string;
	name: string;
	title: string;
	company: string;
	location: string;
	availability: string;
}) => (
	<Card className="col-span-full @lg:col-span-2 row-span-2 bg-gradient-to-br from-slate-500/10 to-zinc-500/10">
		<CardContent className="p-6 h-full flex flex-col">
			<div className="flex items-start justify-between mb-4">
				<Avatar className="size-20 ring-4 ring-primary/20">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
				</Avatar>
				<Badge className="bg-green-500/20 text-green-600">{availability}</Badge>
			</div>
			<div className="flex-1">
				<h1 className="text-xl font-bold">{name}</h1>
				<p className="text-muted-foreground">{title}</p>
				<div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
					<Building2 className="size-4" />
					{company}
				</div>
				<div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
					<MapPin className="size-4" />
					{location}
				</div>
			</div>
			<div className="flex gap-2 mt-4">
				<Button className="flex-1">
					<MessageSquare className="size-4 mr-2" />
					Message
				</Button>
				<Button variant="outline" size="icon">
					<Settings className="size-4" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

const StatCard = ({
	icon: Icon,
	label,
	value,
	sublabel,
	color,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	sublabel?: string;
	color: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<Icon className={`size-5 ${color} mb-2`} />
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
			{sublabel && <p className="text-xs text-primary mt-1">{sublabel}</p>}
		</CardContent>
	</Card>
);

const ProjectsCard = ({
	projects,
}: {
	projects: { name: string; client: string; status: string; value: string; deadline: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Briefcase className="size-5" />
					Active Projects
				</h3>
				<Button variant="ghost" size="sm">View All</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{projects.map((project, i) => (
				<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
					<div className="flex-1 min-w-0">
						<p className="font-medium truncate">{project.name}</p>
						<p className="text-xs text-muted-foreground">{project.client} • Due {project.deadline}</p>
					</div>
					<div className="text-right shrink-0">
						<Badge variant={project.status === 'In Progress' ? 'default' : 'secondary'}>{project.status}</Badge>
						<p className="text-sm font-medium mt-1">{project.value}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const EarningsCard = ({
	thisMonth,
	lastMonth,
	pending,
	change,
}: {
	thisMonth: string;
	lastMonth: string;
	pending: string;
	change: string;
}) => (
	<Card className="col-span-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10">
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-3">
				<DollarSign className="size-5 text-emerald-500" />
				<span className="font-semibold">Earnings</span>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<p className="text-2xl font-bold text-emerald-600">{thisMonth}</p>
					<p className="text-xs text-muted-foreground">This Month</p>
				</div>
				<div>
					<p className="text-xl font-bold">{lastMonth}</p>
					<p className="text-xs text-muted-foreground">Last Month</p>
				</div>
				<div>
					<p className="text-xl font-bold text-amber-600">{pending}</p>
					<p className="text-xs text-muted-foreground">Pending</p>
				</div>
			</div>
			<div className="flex items-center gap-1 mt-3 text-sm text-emerald-600">
				<TrendingUp className="size-4" />
				{change} from last month
			</div>
		</CardContent>
	</Card>
);

const SkillsCard = ({
	skills,
}: {
	skills: { name: string; endorsements: number }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Skills</h3>
				<Button variant="ghost" size="icon">
					<Plus className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill, i) => (
					<Badge key={i} variant="secondary" className="gap-1 py-1.5">
						{skill.name}
						<span className="text-xs bg-background/50 px-1.5 rounded">{skill.endorsements}</span>
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);

const ClientCard = ({
	name,
	logo,
	projectCount,
	totalValue,
}: {
	name: string;
	logo: string;
	projectCount: number;
	totalValue: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<Avatar className="size-10 rounded-lg">
					<AvatarImage src={logo} alt={name} />
					<AvatarFallback className="rounded-lg">{name[0]}</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<p className="font-medium truncate">{name}</p>
					<p className="text-xs text-muted-foreground">{projectCount} projects</p>
				</div>
			</div>
			<p className="text-sm font-medium mt-2">{totalValue}</p>
		</CardContent>
	</Card>
);

const ReviewsCard = ({
	rating,
	count,
	recent,
}: {
	rating: number;
	count: number;
	recent: { name: string; avatar: string; rating: number; comment: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h3 className="font-semibold">Reviews</h3>
					<div className="flex items-center gap-1">
						<Star className="size-4 fill-amber-500 text-amber-500" />
						<span className="font-medium">{rating}</span>
						<span className="text-muted-foreground">({count})</span>
					</div>
				</div>
				<Button variant="ghost" size="sm">View All</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{recent.map((review, i) => (
				<div key={i} className="p-3 rounded-lg bg-muted/30">
					<div className="flex items-center gap-2 mb-2">
						<Avatar className="size-8">
							<AvatarImage src={review.avatar} />
							<AvatarFallback>{review.name[0]}</AvatarFallback>
						</Avatar>
						<span className="font-medium text-sm">{review.name}</span>
						<div className="flex items-center gap-0.5 ml-auto">
							{Array.from({ length: 5 }).map((_, j) => (
								<Star
									key={j}
									className={`size-3 ${j < review.rating ? 'fill-amber-500 text-amber-500' : 'text-muted'}`}
								/>
							))}
						</div>
					</div>
					<p className="text-sm text-muted-foreground line-clamp-2">"{review.comment}"</p>
				</div>
			))}
		</CardContent>
	</Card>
);

const CertificationsCard = ({
	certifications,
}: {
	certifications: { name: string; issuer: string; year: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold flex items-center gap-2">
				<Award className="size-5 text-amber-500" />
				Certifications
			</h3>
		</CardHeader>
		<CardContent className="space-y-2">
			{certifications.map((cert, i) => (
				<div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
					<div className="flex items-center gap-2">
						<Award className="size-4 text-amber-500" />
						<div>
							<p className="font-medium text-sm">{cert.name}</p>
							<p className="text-xs text-muted-foreground">{cert.issuer}</p>
						</div>
					</div>
					<Badge variant="outline">{cert.year}</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
			fallback: 'RJ',
			name: 'Ryan Jackson',
			title: 'Senior Product Designer',
			company: 'Freelance',
			location: 'Austin, TX',
			availability: 'Available',
		},
		stats: [
			{ icon: Briefcase, label: 'Projects', value: '86', color: 'text-blue-500' },
			{ icon: Users, label: 'Clients', value: '24', color: 'text-green-500' },
			{ icon: Clock, label: 'Hours', value: '2.4K', color: 'text-purple-500' },
			{ icon: Star, label: 'Rating', value: '4.9', sublabel: '142 reviews', color: 'text-amber-500' },
		],
		projects: [
			{ name: 'E-commerce Redesign', client: 'TechCorp', status: 'In Progress', value: '$8,500', deadline: 'Feb 15' },
			{ name: 'Mobile App Design', client: 'StartupXYZ', status: 'Review', value: '$12,000', deadline: 'Feb 28' },
		],
		earnings: { thisMonth: '$14,250', lastMonth: '$11,800', pending: '$5,200', change: '+21%' },
		skills: [
			{ name: 'UI Design', endorsements: 89 },
			{ name: 'UX Research', endorsements: 67 },
			{ name: 'Figma', endorsements: 124 },
			{ name: 'Prototyping', endorsements: 56 },
			{ name: 'Design Systems', endorsements: 45 },
		],
		clients: [
			{ name: 'Google', logo: 'https://logo.clearbit.com/google.com', projectCount: 5, totalValue: '$45K' },
			{ name: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com', projectCount: 3, totalValue: '$28K' },
		],
		reviews: {
			rating: 4.9,
			count: 142,
			recent: [
				{ name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/32?img=1', rating: 5, comment: 'Ryan delivered exceptional work. His attention to detail and creative solutions exceeded our expectations.' },
				{ name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/32?img=2', rating: 5, comment: 'Great communication and professional delivery. Would definitely hire again!' },
			],
		},
		certifications: [
			{ name: 'Google UX Design', issuer: 'Google', year: '2023' },
			{ name: 'Figma Advanced', issuer: 'Figma', year: '2022' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<ProfessionalHeader {...profileData.user} />
					{profileData.stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
					<EarningsCard {...profileData.earnings} />
					<ProjectsCard projects={profileData.projects} />
					<SkillsCard skills={profileData.skills} />
					{profileData.clients.map((client, i) => (
						<ClientCard key={i} {...client} />
					))}
					<ReviewsCard {...profileData.reviews} />
					<CertificationsCard certifications={profileData.certifications} />
				</div>
			</div>
		</section>
	);
}
