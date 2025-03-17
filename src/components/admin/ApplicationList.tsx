'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import {
    UserCheck,
    UserX,
    Clock,
    ExternalLink,
    Edit,
    Info,
    Search,
    ChevronDown,
    ChevronUp,
    Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ApplicationStatus } from '@prisma/client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Application = {
    id: number;
    name: string;
    email: string;
    discordUsername: string;
    channelLink: string;
    xLink: string;
    followsTodomen: boolean;
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
    verificationCode: string | null;
    statusMessage: string | null;
    streamingFrequency?: string | null;
    additionalInfo?: string | null;
};

type ApplicationListProps = {
    applications: Application[];
    onUpdateStatus: (id: number, status: ApplicationStatus, statusMessage?: string) => Promise<void>;
};

export default function ApplicationList({ applications, onUpdateStatus }: ApplicationListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [isDetailsOpen, setIsDetailsOpen] = useState<number | null>(null);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Application;
        direction: 'asc' | 'desc';
    }>({
        key: 'createdAt',
        direction: 'desc',
    });

    // 並び替え
    const sortedApplications = [...applications].sort((a, b) => {
        const aValue = a[sortConfig.key] ?? '';
        const bValue = b[sortConfig.key] ?? '';
        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // 検索でフィルタリング
    const filteredApplications = sortedApplications.filter((application) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            application.name.toLowerCase().includes(searchTermLower) ||
            application.email.toLowerCase().includes(searchTermLower) ||
            application.discordUsername.toLowerCase().includes(searchTermLower)
        );
    });

    // 並び替えの切り替え
    const requestSort = (key: keyof Application) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // ステータスバッジのレンダリング
    const renderStatusBadge = (status: ApplicationStatus) => {
        switch (status) {
            case 'PENDING':
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        <Clock className="h-3 w-3 mr-1" />
                        審査中
                    </Badge>
                );
            case 'ACCEPTED':
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        <UserCheck className="h-3 w-3 mr-1" />
                        承認済
                    </Badge>
                );
            case 'REJECTED':
                return (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                        <UserX className="h-3 w-3 mr-1" />
                        不承認
                    </Badge>
                );
            default:
                return null;
        }
    };

    // 詳細表示の切り替え
    const toggleDetails = (id: number) => {
        setIsDetailsOpen(isDetailsOpen === id ? null : id);
    };

    // ステータス更新ダイアログの表示
    const openStatusUpdateDialog = (application: Application) => {
        setSelectedApplication(application);
        setStatusMessage(application.statusMessage || '');
    };

    // ステータス更新の実行
    const handleStatusUpdate = async (status: ApplicationStatus) => {
        if (selectedApplication) {
            await onUpdateStatus(selectedApplication.id, status, statusMessage);
            setSelectedApplication(null);
        }
    };

    return (
        <div>
            {/* 検索・フィルター */}
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="名前、メール、Discordで検索..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                            <Filter className="h-4 w-4 mr-2" />
                            <span className="mr-1">並び替え</span>
                            {sortConfig.direction === 'asc' ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => requestSort('createdAt')}>
                            申請日
                            {sortConfig.key === 'createdAt' && (
                                sortConfig.direction === 'asc' ? (
                                    <ChevronUp className="h-4 w-4 ml-2" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 ml-2" />
                                )
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => requestSort('name')}>
                            名前
                            {sortConfig.key === 'name' && (
                                sortConfig.direction === 'asc' ? (
                                    <ChevronUp className="h-4 w-4 ml-2" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 ml-2" />
                                )
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => requestSort('status')}>
                            ステータス
                            {sortConfig.key === 'status' && (
                                sortConfig.direction === 'asc' ? (
                                    <ChevronUp className="h-4 w-4 ml-2" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 ml-2" />
                                )
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* 応募リスト */}
            {filteredApplications.length === 0 ? (
                <Card className="p-6 text-center text-gray-500">
                    応募データがありません
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredApplications.map((application) => (
                        <Card key={application.id} className="p-4 hover:shadow transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                        <h3 className="font-medium text-lg">{application.name}</h3>
                                        {renderStatusBadge(application.status)}
                                        <span className="text-gray-500 text-sm">
                      {formatDistanceToNow(new Date(application.createdAt), {
                          addSuffix: true,
                          locale: ja,
                      })}
                    </span>
                                    </div>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>Discord: {application.discordUsername}</p>
                                        <p>Email: {application.email}</p>
                                        {application.statusMessage && (
                                            <p className="text-blue-600">{application.statusMessage}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex mt-2 md:mt-0 gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleDetails(application.id)}
                                    >
                                        <Info className="h-4 w-4 mr-1" />
                                        詳細
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => openStatusUpdateDialog(application)}
                                            >
                                                <Edit className="h-4 w-4 mr-1" />
                                                審査
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>応募審査</DialogTitle>
                                            </DialogHeader>
                                            <div className="py-4">
                                                <div className="mb-4">
                                                    <h3 className="font-medium">{selectedApplication?.name}</h3>
                                                    <p className="text-sm text-gray-600">Discord: {selectedApplication?.discordUsername}</p>
                                                    <p className="text-sm text-gray-600">Email: {selectedApplication?.email}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium mb-1">
                                                        審査ステータスメッセージ
                                                    </label>
                                                    <Textarea
                                                        value={statusMessage}
                                                        onChange={(e) => setStatusMessage(e.target.value)}
                                                        placeholder="審査結果や連絡事項を入力してください"
                                                        className="h-24"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter className="flex flex-col sm:flex-row gap-2">
                                                <Button
                                                    className="bg-yellow-500 hover:bg-yellow-600 w-full sm:w-auto"
                                                    onClick={() => handleStatusUpdate('PENDING')}
                                                >
                                                    <Clock className="h-4 w-4 mr-2" />
                                                    審査中
                                                </Button>
                                                <Button
                                                    className="bg-green-500 hover:bg-green-600 w-full sm:w-auto"
                                                    onClick={() => handleStatusUpdate('ACCEPTED')}
                                                >
                                                    <UserCheck className="h-4 w-4 mr-2" />
                                                    承認
                                                </Button>
                                                <Button
                                                    className="bg-red-500 hover:bg-red-600 w-full sm:w-auto"
                                                    onClick={() => handleStatusUpdate('REJECTED')}
                                                >
                                                    <UserX className="h-4 w-4 mr-2" />
                                                    不承認
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            {/* 詳細情報（折りたたみ可能） */}
                            {isDetailsOpen === application.id && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                                    <h4 className="font-medium mb-2">詳細情報</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="font-medium">チャンネルリンク</p>
                                            <a
                                                href={application.channelLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-blue-600 hover:underline"
                                            >
                                                {application.channelLink}
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                            </a>
                                        </div>
                                        <div>
                                            <p className="font-medium">X(Twitter)リンク</p>
                                            <a
                                                href={application.xLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-blue-600 hover:underline"
                                            >
                                                {application.xLink}
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                            </a>
                                        </div>
                                        <div>
                                            <p className="font-medium">配信頻度</p>
                                            <p>{application.streamingFrequency || '未回答'}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">とどめんをフォロー</p>
                                            <p>{application.followsTodomen ? 'はい' : 'いいえ'}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="font-medium">追加情報</p>
                                            <p className="whitespace-pre-wrap">{application.additionalInfo || '追加情報なし'}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">認証コード</p>
                                            <p className="font-mono">{application.verificationCode || 'なし'}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">申請日時</p>
                                            <p>{new Date(application.createdAt).toLocaleString('ja-JP')}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}