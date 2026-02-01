import {
	Bell,
	Check,
	Code,
	Copy,
	Edit2,
	Eye,
	Image,
	Mail,
	MoreVertical,
	Plus,
	Smartphone,
	Trash2,
	Type,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

type EmailTemplate = {
	id: string;
	name: string;
	subject: string;
	category: string;
	lastEdited: string;
	isDefault: boolean;
};

type Variable = {
	name: string;
	description: string;
};

const TemplateCard = ({
	name,
	subject,
	category,
	lastEdited,
	isDefault,
}: EmailTemplate) => (
	<Card className="group transition-all hover:border-primary/50">
		<CardContent className="pt-6">
			<div className="flex items-start justify-between">
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<h4 className="font-medium truncate">{name}</h4>
						{isDefault && (
							<Badge variant="secondary" className="text-xs">
								Default
							</Badge>
						)}
					</div>
					<p className="mt-1 text-sm text-muted-foreground truncate">
						{subject}
					</p>
					<div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
						<Badge variant="outline" className="text-xs">
							{category}
						</Badge>
						<span>•</span>
						<span>{lastEdited}</span>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon-sm"
							className="opacity-0 group-hover:opacity-100"
						>
							<MoreVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Edit2 className="mr-2 size-4" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Eye className="mr-2 size-4" />
							Preview
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Copy className="mr-2 size-4" />
							Duplicate
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							<Trash2 className="mr-2 size-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="mt-4 flex gap-2">
				<Button variant="outline" size="sm" className="flex-1 gap-2">
					<Eye className="size-4" />
					Preview
				</Button>
				<Button size="sm" className="flex-1 gap-2">
					<Edit2 className="size-4" />
					Edit
				</Button>
			</div>
		</CardContent>
	</Card>
);

const VariableTag = ({ name, description }: Variable) => (
	<button
		type="button"
		className="group flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all hover:border-primary/50 hover:bg-primary/5"
	>
		<Code className="size-4 text-primary" />
		<div>
			<code className="text-sm font-medium">{`{{${name}}}`}</code>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		<Copy className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
	</button>
);

export default function Main() {
	const templates: EmailTemplate[] = [
		{
			id: '1',
			name: 'Order Confirmation',
			subject: 'Your order #{{order_id}} has been confirmed!',
			category: 'Transactional',
			lastEdited: 'Jan 20, 2026',
			isDefault: true,
		},
		{
			id: '2',
			name: 'Shipping Notification',
			subject: 'Your order is on its way!',
			category: 'Transactional',
			lastEdited: 'Jan 18, 2026',
			isDefault: true,
		},
		{
			id: '3',
			name: 'Welcome Email',
			subject: 'Welcome to {{store_name}}!',
			category: 'Onboarding',
			lastEdited: 'Jan 15, 2026',
			isDefault: true,
		},
		{
			id: '4',
			name: 'Abandoned Cart',
			subject: 'You left something behind...',
			category: 'Marketing',
			lastEdited: 'Jan 10, 2026',
			isDefault: false,
		},
		{
			id: '5',
			name: 'Review Request',
			subject: 'How was your experience?',
			category: 'Engagement',
			lastEdited: 'Jan 5, 2026',
			isDefault: false,
		},
		{
			id: '6',
			name: 'Flash Sale Alert',
			subject: '⚡ Limited Time Offer!',
			category: 'Marketing',
			lastEdited: 'Dec 28, 2025',
			isDefault: false,
		},
	];

	const variables: Variable[] = [
		{ name: 'customer_name', description: "Customer's full name" },
		{ name: 'order_id', description: 'Order reference number' },
		{ name: 'store_name', description: 'Your store name' },
		{ name: 'tracking_url', description: 'Shipment tracking link' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Tabs defaultValue="templates">
						<div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
							<TabsList>
								<TabsTrigger value="templates">Templates</TabsTrigger>
								<TabsTrigger value="editor">Editor</TabsTrigger>
								<TabsTrigger value="variables">Variables</TabsTrigger>
							</TabsList>
							<Button className="gap-2">
								<Plus className="size-4" />
								New Template
							</Button>
						</div>

						<TabsContent value="templates" className="mt-6">
							<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
								{templates.map((template) => (
									<TemplateCard key={template.id} {...template} />
								))}
							</div>
						</TabsContent>

						<TabsContent value="editor" className="mt-6">
							<Card>
								<CardHeader className="border-b">
									<CardTitle className="text-base">Template Editor</CardTitle>
									<CardDescription>
										Design your notification template
									</CardDescription>
								</CardHeader>
								<CardContent className="pt-6">
									<div className="grid gap-6 @lg:grid-cols-2">
										<div className="space-y-4">
											<div className="space-y-2">
												<Label htmlFor="templateName">Template Name</Label>
												<Input
													id="templateName"
													placeholder="e.g., Order Confirmation"
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="subject">Email Subject</Label>
												<Input
													id="subject"
													placeholder="e.g., Your order #{{order_id}} is confirmed!"
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="body">Email Body</Label>
												<Textarea
													id="body"
													placeholder="Write your email content here..."
													rows={10}
												/>
											</div>
										</div>
										<div className="rounded-lg border bg-muted/30 p-4">
											<h4 className="mb-4 text-sm font-medium">Preview</h4>
											<div className="rounded-lg border bg-background p-4">
												<div className="space-y-4 text-sm">
													<p className="text-muted-foreground">
														[Email preview will appear here]
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="mt-6 flex justify-end gap-3">
										<Button variant="outline">Cancel</Button>
										<Button>Save Template</Button>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="variables" className="mt-6">
							<Card>
								<CardHeader className="border-b">
									<CardTitle className="text-base">
										Template Variables
									</CardTitle>
									<CardDescription>
										Use these variables in your templates
									</CardDescription>
								</CardHeader>
								<CardContent className="pt-6">
									<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-3">
										{variables.map((variable) => (
											<VariableTag key={variable.name} {...variable} />
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</section>
	);
}
