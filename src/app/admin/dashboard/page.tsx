'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ApplicationList from '@/components/admin/ApplicationList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// @ts-ignore
import { ApplicationStatus } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';

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
};

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchApplications();
        }
    }, [status]);

    const fetchApplications = async () => {
        try {
            const response = await fetch('/api/admin/applications');
            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }
            const data = await response.json();
            setApplications(data);

            // 統計情報の計算
            const total = data.length;
            const pending = data.filter((app: Application) => app.status === 'PENDING').length;
            const accepted = data.filter((app: Application) => app.status === 'ACCEPTED').length;
            const rejected = data.filter((app: Application) => app.status === 'REJECTED').length;

            setStats({ total, pending, accepted, rejected });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching applications:', error);
            setLoading(false);
        }
    };

    const updateApplicationStatus = async (id: number, status: ApplicationStatus, statusMessage?: string) => {
        try {
            const response = await fetch(`/api/admin/applications/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status, statusMessage }),
            });

            if (!response.ok) {
                throw new Error('Failed to update application status');
            }

            // アプリケーションリストを更新
            fetchApplications();
        } catch (error) {
            console.error('Error updating application:', error);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <AdminLayout>
                <div className="container mx-auto py-8 px-4">
                    <h1 className="text-2xl font-bold mb-6">応募管理ダッシュボード</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {[...Array(4)].map((_, i) => (
                            <Card key={i}>
                                <CardHeader className="pb-2">
                                    <Skeleton className="h-5 w-24" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-8 w-16" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-6">応募管理ダッシュボード</h1>

                {/* 統計カード */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-gray-500">総応募数</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{stats.total}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-gray-500">審査待ち</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-gray-500">承認済み</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-green-500">{stats.accepted}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-gray-500">却下</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-red-500">{stats.rejected}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* タブ付きの応募リスト */}
                <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                        <TabsTrigger value="all">すべて ({stats.total})</TabsTrigger>
                        <TabsTrigger value="pending">審査待ち ({stats.pending})</TabsTrigger>
                        <TabsTrigger value="accepted">承認 ({stats.accepted})</TabsTrigger>
                        <TabsTrigger value="rejected">却下 ({stats.rejected})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <ApplicationList
                            applications={applications}
                            onUpdateStatus={updateApplicationStatus}
                        />
                    </TabsContent>

                    <TabsContent value="pending">
                        <ApplicationList
                            applications={applications.filter(app => app.status === 'PENDING')}
                            onUpdateStatus={updateApplicationStatus}
                        />
                    </TabsContent>

                    <TabsContent value="accepted">
                        <ApplicationList
                            applications={applications.filter(app => app.status === 'ACCEPTED')}
                            onUpdateStatus={updateApplicationStatus}
                        />
                    </TabsContent>

                    <TabsContent value="rejected">
                        <ApplicationList
                            applications={applications.filter(app => app.status === 'REJECTED')}
                            onUpdateStatus={updateApplicationStatus}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}