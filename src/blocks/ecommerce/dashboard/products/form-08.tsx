'use client';

import * as React from 'react';
import {
	Settings,
	Package,
	Truck,
	CreditCard,
	Bell,
	Shield,
	Globe,
	Palette,
	Save,
	RotateCcw,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SettingsSectionProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

const SettingsSection = ({
	title,
	description,
	children,
}: SettingsSectionProps) => (
	<div className="space-y-4">
		<div>
			<h3 className="font-medium">{title}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		{children}
	</div>
);

interface SettingsToggleProps {
	label: string;
	description: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
}

const SettingsToggle = ({
	label,
	description,
	checked,
	onCheckedChange,
}: SettingsToggleProps) => (
	<div className="flex items-center justify-between rounded-lg border p-4">
		<div>
			<Label>{label}</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch checked={checked} onCheckedChange={onCheckedChange} />
	</div>
);

interface GeneralSettingsProps {
	settings: Record<string, string | boolean>;
	onUpdate: (key: string, value: string | boolean) => void;
}

const GeneralSettings = ({ settings, onUpdate }: GeneralSettingsProps) => (
	<div className="space-y-6">
		<SettingsSection
			title="Product Display"
			description="Configure how products appear in your store"
		>
			<div className="grid gap-4 @sm:grid-cols-2">
				<div className="space-y-2">
					<Label>Default View</Label>
					<Select
						value={settings.defaultView as string}
						onValueChange={(v) => onUpdate('defaultView', v)}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="grid">Grid View</SelectItem>
							<SelectItem value="list">List View</SelectItem>
							<SelectItem value="table">Table View</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label>Products per Page</Label>
					<Select
						value={settings.perPage as string}
						onValueChange={(v) => onUpdate('perPage', v)}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="12">12</SelectItem>
							<SelectItem value="24">24</SelectItem>
							<SelectItem value="48">48</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</SettingsSection>

		<Separator />

		<SettingsSection
			title="Product Features"
			description="Enable or disable product features"
		>
			<div className="space-y-3">
				<SettingsToggle
					label="Enable Reviews"
					description="Allow customers to leave product reviews"
					checked={settings.enableReviews as boolean}
					onCheckedChange={(v) => onUpdate('enableReviews', v)}
				/>
				<SettingsToggle
					label="Enable Wishlist"
					description="Allow customers to save products to wishlist"
					checked={settings.enableWishlist as boolean}
					onCheckedChange={(v) => onUpdate('enableWishlist', v)}
				/>
				<SettingsToggle
					label="Enable Compare"
					description="Allow customers to compare products"
					checked={settings.enableCompare as boolean}
					onCheckedChange={(v) => onUpdate('enableCompare', v)}
				/>
			</div>
		</SettingsSection>
	</div>
);

interface InventorySettingsProps {
	settings: Record<string, string | boolean | number>;
	onUpdate: (key: string, value: string | boolean | number) => void;
}

const InventorySettings = ({ settings, onUpdate }: InventorySettingsProps) => (
	<div className="space-y-6">
		<SettingsSection
			title="Stock Management"
			description="Configure inventory tracking settings"
		>
			<div className="space-y-3">
				<SettingsToggle
					label="Track Inventory"
					description="Enable stock level tracking for products"
					checked={settings.trackInventory as boolean}
					onCheckedChange={(v) => onUpdate('trackInventory', v)}
				/>
				<SettingsToggle
					label="Allow Backorders"
					description="Allow orders when product is out of stock"
					checked={settings.allowBackorders as boolean}
					onCheckedChange={(v) => onUpdate('allowBackorders', v)}
				/>
			</div>
		</SettingsSection>

		<Separator />

		<SettingsSection
			title="Low Stock Alerts"
			description="Configure when to receive low stock notifications"
		>
			<div className="grid gap-4 @sm:grid-cols-2">
				<div className="space-y-2">
					<Label>Low Stock Threshold</Label>
					<Input
						type="number"
						value={settings.lowStockThreshold as number}
						onChange={(e) =>
							onUpdate('lowStockThreshold', parseInt(e.target.value) || 0)
						}
					/>
				</div>
				<div className="space-y-2">
					<Label>Notification Email</Label>
					<Input
						type="email"
						value={settings.notificationEmail as string}
						onChange={(e) => onUpdate('notificationEmail', e.target.value)}
					/>
				</div>
			</div>
		</SettingsSection>
	</div>
);

interface NotificationSettingsProps {
	settings: Record<string, boolean>;
	onUpdate: (key: string, value: boolean) => void;
}

const NotificationSettings = ({
	settings,
	onUpdate,
}: NotificationSettingsProps) => (
	<div className="space-y-6">
		<SettingsSection
			title="Email Notifications"
			description="Choose which events trigger email notifications"
		>
			<div className="space-y-3">
				<SettingsToggle
					label="New Product Added"
					description="Notify when a new product is created"
					checked={settings.newProduct}
					onCheckedChange={(v) => onUpdate('newProduct', v)}
				/>
				<SettingsToggle
					label="Low Stock Alert"
					description="Notify when stock falls below threshold"
					checked={settings.lowStock}
					onCheckedChange={(v) => onUpdate('lowStock', v)}
				/>
				<SettingsToggle
					label="Out of Stock"
					description="Notify when a product goes out of stock"
					checked={settings.outOfStock}
					onCheckedChange={(v) => onUpdate('outOfStock', v)}
				/>
				<SettingsToggle
					label="Product Updated"
					description="Notify when product details are changed"
					checked={settings.productUpdated}
					onCheckedChange={(v) => onUpdate('productUpdated', v)}
				/>
			</div>
		</SettingsSection>
	</div>
);

export default function Main() {
	const [generalSettings, setGeneralSettings] = React.useState({
		defaultView: 'grid',
		perPage: '24',
		enableReviews: true,
		enableWishlist: true,
		enableCompare: false,
	});

	const [inventorySettings, setInventorySettings] = React.useState({
		trackInventory: true,
		allowBackorders: false,
		lowStockThreshold: 10,
		notificationEmail: 'admin@example.com',
	});

	const [notificationSettings, setNotificationSettings] = React.useState({
		newProduct: true,
		lowStock: true,
		outOfStock: true,
		productUpdated: false,
	});

	const [hasChanges, setHasChanges] = React.useState(false);

	const handleSave = () => {
		setHasChanges(false);
	};

	const handleReset = () => {
		setHasChanges(false);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Settings className="size-5" />
						<h2 className="text-xl font-semibold">Product Settings</h2>
					</div>
					{hasChanges && <Badge variant="secondary">Unsaved changes</Badge>}
				</div>

				<Tabs defaultValue="general" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="general" className="gap-2">
							<Package className="size-4" />
							General
						</TabsTrigger>
						<TabsTrigger value="inventory" className="gap-2">
							<Truck className="size-4" />
							Inventory
						</TabsTrigger>
						<TabsTrigger value="notifications" className="gap-2">
							<Bell className="size-4" />
							Notifications
						</TabsTrigger>
					</TabsList>

					<TabsContent value="general">
						<Card>
							<CardHeader>
								<CardTitle>General Settings</CardTitle>
								<CardDescription>
									Configure general product display and feature settings
								</CardDescription>
							</CardHeader>
							<CardContent>
								<GeneralSettings
									settings={generalSettings}
									onUpdate={(key, value) => {
										setGeneralSettings((prev) => ({ ...prev, [key]: value }));
										setHasChanges(true);
									}}
								/>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="inventory">
						<Card>
							<CardHeader>
								<CardTitle>Inventory Settings</CardTitle>
								<CardDescription>
									Configure stock management and tracking settings
								</CardDescription>
							</CardHeader>
							<CardContent>
								<InventorySettings
									settings={inventorySettings}
									onUpdate={(key, value) => {
										setInventorySettings((prev) => ({ ...prev, [key]: value }));
										setHasChanges(true);
									}}
								/>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="notifications">
						<Card>
							<CardHeader>
								<CardTitle>Notification Settings</CardTitle>
								<CardDescription>
									Configure email notification preferences
								</CardDescription>
							</CardHeader>
							<CardContent>
								<NotificationSettings
									settings={notificationSettings}
									onUpdate={(key, value) => {
										setNotificationSettings((prev) => ({
											...prev,
											[key]: value,
										}));
										setHasChanges(true);
									}}
								/>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				<div className="flex justify-end gap-2">
					<Button
						variant="outline"
						onClick={handleReset}
						disabled={!hasChanges}
						className="gap-2"
					>
						<RotateCcw className="size-4" />
						Reset
					</Button>
					<Button onClick={handleSave} disabled={!hasChanges} className="gap-2">
						<Save className="size-4" />
						Save Settings
					</Button>
				</div>
			</div>
		</section>
	);
}
