import {
	ArrowRight,
	Ban,
	CheckCircle,
	Clock,
	ExternalLink,
	FileText,
	Flag,
	MessageCircle,
	MoreHorizontal,
	Search,
	Shield,
	ShieldAlert,
	Star,
	ThumbsDown,
	ThumbsUp,
	Trash2,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CustomerReview {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
		verified: boolean;
	};
	product: string;
	rating: number;
	title: string;
	status: 'pending' | 'approved' | 'flagged' | 'rejected';
	helpful: number;
	notHelpful: number;
	date: string;
	hasImages: boolean;
}

const TabHeader = ({
	tabs,
}: {
	tabs: { value: string; label: string; count: number }[];
}) => (
	<div className="border-b px-6 py-4">
		<TabsList className="h-9">
			{tabs.map((tab) => (
				<TabsTrigger key={tab.value} value={tab.value} className="gap-2">
					{tab.label}
					<Badge variant="secondary" className="h-5 px-1.5 text-xs">
						{tab.count}
					</Badge>
				</TabsTrigger>
			))}
		</TabsList>
	</div>
);

const SearchHeader = ({ searchPlaceholder }: { searchPlaceholder: string }) => (
	<div className="flex items-center gap-3 border-b px-6 py-4">
		<div className="relative flex-1">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="max-w-sm pl-9" />
		</div>
	</div>
);

const RatingStars = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-0.5">
		{Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`size-3.5 ${
					i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
				}`}
			/>
		))}
	</div>
);

const StatusBadge = ({ status }: { status: CustomerReview['status'] }) => {
	const config = {
		pending: {
			label: 'Pending',
			icon: Clock,
			className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
		},
		approved: {
			label: 'Approved',
			icon: CheckCircle,
			className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
		},
		flagged: {
			label: 'Flagged',
			icon: Flag,
			className: 'bg-red-500/10 text-red-500 border-red-500/20',
		},
		rejected: {
			label: 'Rejected',
			icon: Ban,
			className: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
		},
	};
	const Icon = config[status].icon;
	return (
		<Badge variant="outline" className={`${config[status].className} gap-1`}>
			<Icon className="size-3" />
			{config[status].label}
		</Badge>
	);
};

const HelpfulStats = ({
	helpful,
	notHelpful,
}: {
	helpful: number;
	notHelpful: number;
}) => (
	<div className="flex items-center gap-3 text-sm">
		<span className="text-emerald-500 flex items-center gap-1">
			<ThumbsUp className="size-3.5" />
			{helpful}
		</span>
		<span className="text-muted-foreground flex items-center gap-1">
			<ThumbsDown className="size-3.5" />
			{notHelpful}
		</span>
	</div>
);

const ReviewRow = ({ review }: { review: CustomerReview }) => (
	<TableRow className="group">
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative">
					<Avatar className="size-9">
						<AvatarImage
							src={review.customer.avatar}
							alt={review.customer.name}
						/>
						<AvatarFallback className="bg-primary/10 text-primary text-xs">
							{review.customer.initials}
						</AvatarFallback>
					</Avatar>
					{review.customer.verified && (
						<Shield className="absolute -right-0.5 -bottom-0.5 size-4 text-emerald-500 fill-background" />
					)}
				</div>
				<div>
					<p className="font-medium">{review.customer.name}</p>
					<p className="text-muted-foreground text-xs">
						{review.customer.email}
					</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<div className="max-w-[150px]">
				<p className="truncate text-sm font-medium">{review.product}</p>
			</div>
		</TableCell>
		<TableCell>
			<div className="space-y-1">
				<RatingStars rating={review.rating} />
				<p className="max-w-[200px] truncate text-sm font-medium">
					{review.title}
				</p>
			</div>
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<StatusBadge status={review.status} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<HelpfulStats helpful={review.helpful} notHelpful={review.notHelpful} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			{review.date}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<ExternalLink className="mr-2 size-4" />
						View full review
					</DropdownMenuItem>
					<DropdownMenuItem>
						<User className="mr-2 size-4" />
						View customer
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					{review.status === 'pending' && (
						<>
							<DropdownMenuItem className="text-emerald-500">
								<CheckCircle className="mr-2 size-4" />
								Approve
							</DropdownMenuItem>
							<DropdownMenuItem className="text-red-500">
								<Ban className="mr-2 size-4" />
								Reject
							</DropdownMenuItem>
						</>
					)}
					{review.status === 'approved' && (
						<DropdownMenuItem className="text-amber-500">
							<Flag className="mr-2 size-4" />
							Flag for review
						</DropdownMenuItem>
					)}
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const tabs = [
		{ value: 'all', label: 'All Reviews', count: 234 },
		{ value: 'pending', label: 'Pending', count: 12 },
		{ value: 'flagged', label: 'Flagged', count: 5 },
	];

	const reviews: CustomerReview[] = [
		{
			id: '1',
			customer: {
				name: 'Julia Roberts',
				email: 'julia.r@email.com',
				initials: 'JR',
				verified: true,
			},
			product: 'Wireless Headphones Pro',
			rating: 5,
			title: 'Best headphones I have ever owned!',
			status: 'approved',
			helpful: 45,
			notHelpful: 2,
			date: 'Jan 15, 2024',
			hasImages: true,
		},
		{
			id: '2',
			customer: {
				name: 'Mark Spencer',
				email: 'mark.s@email.com',
				initials: 'MS',
				verified: false,
			},
			product: 'Smart Watch Series 5',
			rating: 4,
			title: 'Great watch, battery could be better',
			status: 'pending',
			helpful: 12,
			notHelpful: 1,
			date: 'Jan 14, 2024',
			hasImages: false,
		},
		{
			id: '3',
			customer: {
				name: 'Nancy Drew',
				email: 'nancy.d@email.com',
				initials: 'ND',
				verified: true,
			},
			product: 'Running Shoes Ultra',
			rating: 2,
			title: 'Quality issues after 2 weeks',
			status: 'flagged',
			helpful: 8,
			notHelpful: 15,
			date: 'Jan 12, 2024',
			hasImages: true,
		},
		{
			id: '4',
			customer: {
				name: 'Oscar Wilde',
				email: 'oscar.w@email.com',
				initials: 'OW',
				verified: false,
			},
			product: 'Laptop Stand Adjustable',
			rating: 5,
			title: 'Perfect for my home office setup',
			status: 'approved',
			helpful: 28,
			notHelpful: 0,
			date: 'Jan 10, 2024',
			hasImages: false,
		},
		{
			id: '5',
			customer: {
				name: 'Penny Lane',
				email: 'penny.l@email.com',
				initials: 'PL',
				verified: true,
			},
			product: 'Bluetooth Speaker Mini',
			rating: 1,
			title: 'Does not work as advertised',
			status: 'rejected',
			helpful: 3,
			notHelpful: 25,
			date: 'Jan 8, 2024',
			hasImages: false,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="bg-primary/10 text-primary rounded-lg p-2.5">
							<MessageCircle className="size-5" />
						</div>
						<div>
							<h1 className="text-2xl font-bold tracking-tight">
								Customer Reviews
							</h1>
							<p className="text-muted-foreground text-sm">
								Moderate and respond to customer reviews
							</p>
						</div>
					</div>
					<Button variant="outline" size="sm" className="gap-2">
						<FileText className="size-4" />
						Export
					</Button>
				</div>

				<Tabs defaultValue="all" className="w-full">
					<div className="overflow-hidden rounded-xl border bg-card">
						<TabHeader tabs={tabs} />
						<SearchHeader searchPlaceholder="Search reviews..." />
						<TabsContent value="all" className="m-0">
							<Table>
								<TableHeader>
									<TableRow className="hover:bg-transparent">
										<TableHead>Customer</TableHead>
										<TableHead className="hidden @md:table-cell">
											Product
										</TableHead>
										<TableHead>Review</TableHead>
										<TableHead className="hidden @lg:table-cell">
											Status
										</TableHead>
										<TableHead className="hidden @xl:table-cell">
											Helpful
										</TableHead>
										<TableHead className="hidden @xl:table-cell">
											Date
										</TableHead>
										<TableHead className="w-12" />
									</TableRow>
								</TableHeader>
								<TableBody>
									{reviews.map((review) => (
										<ReviewRow key={review.id} review={review} />
									))}
								</TableBody>
							</Table>
						</TabsContent>
						<TabsContent value="pending" className="m-0">
							<Table>
								<TableHeader>
									<TableRow className="hover:bg-transparent">
										<TableHead>Customer</TableHead>
										<TableHead className="hidden @md:table-cell">
											Product
										</TableHead>
										<TableHead>Review</TableHead>
										<TableHead className="hidden @lg:table-cell">
											Status
										</TableHead>
										<TableHead className="hidden @xl:table-cell">
											Helpful
										</TableHead>
										<TableHead className="hidden @xl:table-cell">
											Date
										</TableHead>
										<TableHead className="w-12" />
									</TableRow>
								</TableHeader>
								<TableBody>
									{reviews
										.filter((r) => r.status === 'pending')
										.map((review) => (
											<ReviewRow key={review.id} review={review} />
										))}
								</TableBody>
							</Table>
						</TabsContent>
						<TabsContent value="flagged" className="m-0">
							<Table>
								<TableHeader>
									<TableRow className="hover:bg-transparent">
										<TableHead>Customer</TableHead>
										<TableHead className="hidden @md:table-cell">
											Product
										</TableHead>
										<TableHead>Review</TableHead>
										<TableHead className="hidden @lg:table-cell">
											Status
										</TableHead>
										<TableHead className="hidden @xl:table-cell">
											Helpful
										</TableHead>
										<TableHead className="hidden @xl:table-cell">
											Date
										</TableHead>
										<TableHead className="w-12" />
									</TableRow>
								</TableHeader>
								<TableBody>
									{reviews
										.filter((r) => r.status === 'flagged')
										.map((review) => (
											<ReviewRow key={review.id} review={review} />
										))}
								</TableBody>
							</Table>
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</section>
	);
}
