'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Home,
	Building2,
	MoreVertical,
	MapPin,
	Edit,
	Trash2,
	Star,
	Copy,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AddressCardProps {
	type: 'home' | 'work';
	label: string;
	name: string;
	address: string;
	phone: string;
	isDefault?: boolean;
	selected?: boolean;
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-start justify-between mb-8">
		<div>
			<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
			<p className="text-muted-foreground mt-1">{subtitle}</p>
		</div>
		<Button>Add New</Button>
	</div>
);

const AddressCard = ({
	type,
	label,
	name,
	address,
	phone,
	isDefault,
	selected,
}: AddressCardProps) => {
	const TypeIcon = type === 'home' ? Home : Building2;
	return (
		<Card
			className={`relative group cursor-pointer transition-all ${
				selected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
			}`}
		>
			<CardContent className="pt-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center gap-3">
						<div
							className={`size-10 rounded-xl flex items-center justify-center ${
								type === 'home'
									? 'bg-blue-500/10 text-blue-500'
									: 'bg-purple-500/10 text-purple-500'
							}`}
						>
							<TypeIcon className="size-5" />
						</div>
						<div>
							<div className="flex items-center gap-2">
								<span className="font-semibold">{label}</span>
								{isDefault && (
									<Badge variant="outline" className="text-xs gap-1">
										<Star className="size-2.5 fill-current" />
										Default
									</Badge>
								)}
							</div>
						</div>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon-sm"
								className="opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<MoreVertical className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<Edit className="size-4 mr-2" />
								Edit Address
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Copy className="size-4 mr-2" />
								Duplicate
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Star className="size-4 mr-2" />
								Set as Default
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-destructive">
								<Trash2 className="size-4 mr-2" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="space-y-2 text-sm">
					<div className="flex items-start gap-2">
						<MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
						<div>
							<p className="font-medium">{name}</p>
							<p className="text-muted-foreground">{address}</p>
						</div>
					</div>
					<p className="text-muted-foreground ml-6">{phone}</p>
				</div>

				{selected && (
					<div className="absolute -top-1 -right-1 size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
						<svg
							className="size-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={3}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const addresses = [
		{
			type: 'home' as const,
			label: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			phone: '+1 (555) 123-4567',
			isDefault: true,
			selected: true,
		},
		{
			type: 'work' as const,
			label: 'Office',
			name: 'John Doe',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
			phone: '+1 (555) 987-6543',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageHeader
					title="Delivery Address"
					subtitle="Select or manage your addresses"
				/>

				<div className="space-y-4">
					{addresses.map((addr, i) => (
						<AddressCard key={i} {...addr} />
					))}
				</div>

				<Separator className="my-8" />

				<div className="flex flex-col @sm:flex-row gap-3">
					<Button variant="outline" size="lg" className="flex-1">
						Back
					</Button>
					<Button size="lg" className="flex-1">
						Continue to Shipping
					</Button>
				</div>
			</div>
		</section>
	);
}
