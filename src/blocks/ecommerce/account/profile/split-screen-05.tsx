import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
	Camera,
	Check,
	Mail,
	MapPin,
	Pencil,
	Phone,
	Save,
	User,
	X,
} from 'lucide-react';
import Link from 'next/link';

const EditableAvatar = ({
	src,
	fallback,
	name,
	canEdit,
}: {
	src: string;
	fallback: string;
	name: string;
	canEdit?: boolean;
}) => (
	<div className="relative group">
		<Avatar className="size-28 @md:size-32 ring-4 ring-border">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-3xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		{canEdit && (
			<Button
				size="icon"
				variant="secondary"
				className="absolute bottom-0 right-0 size-9 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<Camera className="size-4" />
			</Button>
		)}
	</div>
);

const ProfileField = ({
	icon: Icon,
	label,
	value,
	editable,
	verified,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	editable?: boolean;
	verified?: boolean;
}) => (
	<div className="space-y-2">
		<label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
			<Icon className="size-4" />
			{label}
			{verified && (
				<Badge variant="secondary" className="text-xs gap-1 bg-green-500/20 text-green-600">
					<Check className="size-3" />
					Verified
				</Badge>
			)}
		</label>
		{editable ? (
			<Input defaultValue={value} className="h-11" />
		) : (
			<p className="text-sm py-2 px-3 rounded-md bg-muted/50">{value}</p>
		)}
	</div>
);

const AddressCard = ({
	type,
	address,
	isDefault,
}: {
	type: string;
	address: string;
	isDefault?: boolean;
}) => (
	<div className={`p-4 rounded-lg border ${isDefault ? 'border-primary bg-primary/5' : 'bg-muted/30'}`}>
		<div className="flex items-start justify-between mb-2">
			<div className="flex items-center gap-2">
				<MapPin className="size-4 text-muted-foreground" />
				<span className="font-medium">{type}</span>
			</div>
			{isDefault && (
				<Badge variant="default" className="text-xs">Default</Badge>
			)}
		</div>
		<p className="text-sm text-muted-foreground">{address}</p>
		<div className="flex gap-2 mt-3">
			<Button variant="ghost" size="sm" className="text-xs">
				Edit
			</Button>
			{!isDefault && (
				<Button variant="ghost" size="sm" className="text-xs">
					Set as Default
				</Button>
			)}
		</div>
	</div>
);

const FormActions = ({
	onSave,
	onCancel,
}: {
	onSave?: string;
	onCancel?: string;
}) => (
	<div className="flex items-center gap-3 pt-4">
		<Button className="gap-2">
			<Save className="size-4" />
			Save Changes
		</Button>
		<Button variant="outline" className="gap-2">
			<X className="size-4" />
			Cancel
		</Button>
	</div>
);

export default function Main() {
	const profileData = {
		avatar: {
			src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
			fallback: 'EJ',
			name: 'Emily Johnson',
			canEdit: true,
		},
		fields: [
			{ icon: User, label: 'Full Name', value: 'Emily Johnson', editable: true },
			{ icon: Mail, label: 'Email Address', value: 'emily.j@example.com', editable: false, verified: true },
			{ icon: Phone, label: 'Phone Number', value: '+1 (555) 234-5678', editable: true, verified: true },
		],
		addresses: [
			{
				type: 'Home',
				address: '123 Maple Street, Apt 4B, San Francisco, CA 94102',
				isDefault: true,
			},
			{
				type: 'Work',
				address: '456 Tech Boulevard, Suite 200, San Francisco, CA 94105',
				isDefault: false,
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="p-6">
						<div className="grid @lg:grid-cols-[200px_1fr] gap-8">
							<div className="flex flex-col items-center text-center space-y-4">
								<EditableAvatar {...profileData.avatar} />
								<div>
									<h2 className="font-semibold">{profileData.avatar.name}</h2>
									<p className="text-sm text-muted-foreground">Member since 2023</p>
								</div>
							</div>
							<div className="space-y-6">
								<div>
									<h3 className="text-lg font-semibold mb-4">Personal Information</h3>
									<div className="grid @md:grid-cols-2 gap-4">
										{profileData.fields.map((field, i) => (
											<ProfileField key={i} {...field} />
										))}
									</div>
								</div>
								<Separator />
								<div>
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-semibold">Saved Addresses</h3>
										<Button variant="outline" size="sm">
											Add New
										</Button>
									</div>
									<div className="grid @md:grid-cols-2 gap-4">
										{profileData.addresses.map((address, i) => (
											<AddressCard key={i} {...address} />
										))}
									</div>
								</div>
								<FormActions />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
