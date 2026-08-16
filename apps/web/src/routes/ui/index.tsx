import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@acme/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@acme/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@acme/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Badge } from "@acme/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@acme/ui/breadcrumb";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { Checkbox } from "@acme/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import { Progress } from "@acme/ui/progress";
import { RadioGroup, RadioGroupItem } from "@acme/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@acme/ui/select";
import { Separator } from "@acme/ui/separator";
import { Skeleton } from "@acme/ui/skeleton";
import { Slider } from "@acme/ui/slider";
import { Switch } from "@acme/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui/tabs";
import { Textarea } from "@acme/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@acme/ui/tooltip";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/ui/")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) {
      throw notFound();
    }
  },
  component: UiShowcasePage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="rounded-lg border p-6">{children}</div>
    </section>
  );
}

const invoices = [
  { id: "INV-001", status: "支払い済み", method: "クレジットカード", amount: "¥25,000" },
  { id: "INV-002", status: "保留中", method: "銀行振込", amount: "¥15,000" },
  { id: "INV-003", status: "未払い", method: "クレジットカード", amount: "¥35,000" },
];

function UiShowcasePage() {
  return (
    <TooltipProvider>
      <main className="mx-auto max-w-4xl space-y-10 px-6 py-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">UI コンポーネント一覧</h1>
          <p className="text-muted-foreground">
            @acme/ui に含まれる shadcn/ui コンポーネントの見た目を確認できます。
          </p>
        </div>

        <Section title="Button">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <Section title="Badge">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Section>

        <Section title="Input / Textarea / Label">
          <div className="grid max-w-sm gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">メッセージ</Label>
              <Textarea id="message" placeholder="メッセージを入力してください" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="disabled-input">無効状態</Label>
              <Input id="disabled-input" disabled placeholder="入力できません" />
            </div>
          </div>
        </Section>

        <Section title="Checkbox / Radio Group / Switch">
          <div className="grid gap-6">
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">利用規約に同意する</Label>
            </div>
            <RadioGroup defaultValue="light" className="flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light">ライト</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark">ダーク</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="system" id="theme-system" />
                <Label htmlFor="theme-system">システム</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Switch id="notifications" defaultChecked />
              <Label htmlFor="notifications">通知を受け取る</Label>
            </div>
          </div>
        </Section>

        <Section title="Select">
          <Select defaultValue="apple">
            <SelectTrigger className="w-56">
              <SelectValue placeholder="フルーツを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">りんご</SelectItem>
              <SelectItem value="banana">バナナ</SelectItem>
              <SelectItem value="orange">オレンジ</SelectItem>
              <SelectItem value="grape">ぶどう</SelectItem>
            </SelectContent>
          </Select>
        </Section>

        <Section title="Slider / Progress">
          <div className="grid max-w-md gap-8">
            <Slider defaultValue={[40]} max={100} step={1} />
            <Progress value={60} />
          </div>
        </Section>

        <Section title="Card">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>プロジェクトを作成</CardTitle>
              <CardDescription>新しいプロジェクトを1クリックでデプロイします。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="project-name">プロジェクト名</Label>
                <Input id="project-name" placeholder="my-project" />
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">キャンセル</Button>
              <Button>作成</Button>
            </CardFooter>
          </Card>
        </Section>

        <Section title="Table">
          <Table>
            <TableCaption>最近の請求書一覧</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>請求書</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>支払い方法</TableHead>
                <TableHead className="text-right">金額</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>{invoice.method}</TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section title="Tabs">
          <Tabs defaultValue="account" className="max-w-md">
            <TabsList>
              <TabsTrigger value="account">アカウント</TabsTrigger>
              <TabsTrigger value="password">パスワード</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="text-sm text-muted-foreground">
              アカウント情報をここで変更できます。
            </TabsContent>
            <TabsContent value="password" className="text-sm text-muted-foreground">
              パスワードをここで変更できます。
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Accordion">
          <Accordion type="single" collapsible className="max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger>アクセシブルですか?</AccordionTrigger>
              <AccordionContent>
                はい。WAI-ARIA のデザインパターンに準拠しています。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>スタイルは変更できますか?</AccordionTrigger>
              <AccordionContent>
                はい。Tailwind CSS のクラスで自由にカスタマイズできます。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section title="Alert">
          <div className="grid max-w-xl gap-4">
            <Alert>
              <AlertTitle>お知らせ</AlertTitle>
              <AlertDescription>CLI からコンポーネントを追加できます。</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>エラー</AlertTitle>
              <AlertDescription>
                セッションの有効期限が切れました。再ログインしてください。
              </AlertDescription>
            </Alert>
          </div>
        </Section>

        <Section title="Dialog / Alert Dialog">
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Dialog を開く</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>プロフィール編集</DialogTitle>
                  <DialogDescription>変更後に保存ボタンを押してください。</DialogDescription>
                </DialogHeader>
                <div className="grid gap-2">
                  <Label htmlFor="dialog-name">名前</Label>
                  <Input id="dialog-name" defaultValue="山田 太郎" />
                </div>
                <DialogFooter>
                  <Button>保存</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Alert Dialog を開く</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>本当に削除しますか?</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は取り消せません。データは完全に削除されます。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction>削除する</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Section>

        <Section title="Dropdown Menu / Popover / Tooltip">
          <div className="flex flex-wrap gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">メニュー</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>プロフィール</DropdownMenuItem>
                <DropdownMenuItem>設定</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">ログアウト</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="text-sm">
                サイズや余白などの詳細設定をここに表示できます。
              </PopoverContent>
            </Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">ホバーしてね</Button>
              </TooltipTrigger>
              <TooltipContent>ツールチップの表示例です</TooltipContent>
            </Tooltip>
          </div>
        </Section>

        <Section title="Avatar / Skeleton / Separator">
          <div className="flex items-center gap-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>YT</AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" className="h-10!" />
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/ui">コンポーネント</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>
      </main>
    </TooltipProvider>
  );
}
