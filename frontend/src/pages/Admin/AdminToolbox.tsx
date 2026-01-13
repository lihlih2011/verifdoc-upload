import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import {
    Activity, Server, Database, Mail,
    ShieldAlert, Terminal, RefreshCw, Cpu, HardDrive
} from 'lucide-react';

interface SystemStats {
    cpu_usage: number;
    ram_usage: number;
    disk_free: number;
    db_status: boolean;
    db_latency_ms: number;
}

export const AdminToolbox = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [loading, setLoading] = useState(false);

    // Email Tester
    const [testEmail, setTestEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState('');

    // Fetch Health
    const fetchHealth = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/api/admin/health`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(res.data);
        } catch (err) {
            console.error("Health Check Failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHealth();
        const interval = setInterval(fetchHealth, 10000); // 10s refresh
        return () => clearInterval(interval);
    }, []);

    // Send Test Email
    const handleSendTestEmail = async () => {
        if (!testEmail) return;
        setEmailStatus('sending');
        try {
            await axios.post(`${API_URL}/api/admin/test-email`, { target_email: testEmail }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEmailStatus('success');
        } catch (err) {
            setEmailStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8 font-mono">
            <header className="mb-8 flex justify-between items-center border-b border-slate-700 pb-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 text-emerald-400">
                        <Terminal size={32} />
                        VERIFDOC GOD MODE
                    </h1>
                    <p className="text-slate-400 mt-1">System Control Center - Authorized Personnel Only</p>
                </div>
                <button
                    onClick={fetchHealth}
                    className={`p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-all ${loading ? 'animate-spin' : ''}`}
                >
                    <RefreshCw size={20} />
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* COLUMN 1: VITALS */}
                <div className="space-y-6">
                    <section className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                            <Activity /> REAL-TIME VITALS
                        </h2>

                        <div className="space-y-4">
                            {/* CPU */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="flex items-center gap-2"><Cpu size={14} /> CPU LOAD</span>
                                    <span className={(stats?.cpu_usage || 0) > 80 ? 'text-red-500' : 'text-emerald-500'}>
                                        {stats?.cpu_usage ?? 0}%
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${(stats?.cpu_usage || 0) > 80 ? 'bg-red-500' : 'bg-blue-500'} transition-all duration-500`}
                                        style={{ width: `${stats?.cpu_usage ?? 0}%` }}
                                    />
                                </div>
                            </div>

                            {/* RAM */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="flex items-center gap-2"><Server size={14} /> RAM USAGE</span>
                                    <span className={(stats?.ram_usage || 0) > 80 ? 'text-orange-500' : 'text-emerald-500'}>
                                        {stats?.ram_usage ?? 0}%
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 transition-all duration-500"
                                        style={{ width: `${stats?.ram_usage ?? 0}%` }}
                                    />
                                </div>
                            </div>

                            {/* DB */}
                            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Database className={stats?.db_status ? "text-emerald-400" : "text-red-500"} />
                                    <div>
                                        <div className="font-bold">DATABASE</div>
                                        <div className="text-xs text-slate-400">PostgreSQL 15</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`font-bold ${stats?.db_status ? "text-emerald-400" : "text-red-500"}`}>
                                        {stats?.db_status ? "CONNECTED" : "OFFLINE"}
                                    </div>
                                    <div className="text-xs text-slate-500">{stats?.db_latency_ms ?? 0} ms</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* COLUMN 2: TOOLS */}
                <div className="space-y-6">
                    <section className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                            <Mail /> SMTP DIAGNOSTIC
                        </h2>
                        <div className="space-y-4">
                            <p className="text-sm text-slate-400">
                                Send a prioritized test email to verify SMTP configuration and latency.
                            </p>
                            <input
                                type="email"
                                value={testEmail}
                                onChange={(e) => setTestEmail(e.target.value)}
                                placeholder="target@email.com"
                                className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-yellow-500 outline-none"
                            />
                            <button
                                onClick={handleSendTestEmail}
                                disabled={emailStatus === 'sending' || !testEmail}
                                className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 rounded transition-colors disabled:opacity-50"
                            >
                                {emailStatus === 'sending' ? "TRANSMITTING..." : "FIRE TEST EMAIL"}
                            </button>

                            {emailStatus === 'success' && (
                                <div className="p-2 bg-emerald-900/30 text-emerald-400 text-sm rounded border border-emerald-900 text-center">
                                    ✅ EMAIL SENT SUCCESSFULLY
                                </div>
                            )}
                            {emailStatus === 'error' && (
                                <div className="p-2 bg-red-900/30 text-red-400 text-sm rounded border border-red-900 text-center">
                                    ❌ SMTP ERROR - CHECK LOGS
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* COLUMN 3: ALERTS */}
                <div className="space-y-6">
                    <section className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl h-full">
                        <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                            <ShieldAlert /> CRITICAL LOGS
                        </h2>
                        <div className="bg-black p-4 rounded-lg font-mono text-xs text-slate-300 h-64 overflow-y-auto border border-slate-800">
                            <p className="text-emerald-500">[SYSTEM] Admin Dashboard Initialized...</p>
                            <p className="text-blue-500">[INFO] Monitoring Agents Active.</p>
                            {stats?.db_status ?
                                <p className="text-emerald-500">[DB] Connection Established ({stats.db_latency_ms}ms)</p> :
                                <p className="text-red-500 animate-pulse">[CRITICAL] DATABASE CONNECTION FAILED</p>
                            }
                            {/* Simulator for Logs */}
                            <p className="text-slate-600">-- End of Live Stream --</p>
                        </div>
                    </section>
                </div>

            </div>

            <footer className="mt-12 border-t border-slate-800 pt-6 text-center text-slate-600 text-sm">
                VERIFDOC ADMIN TOOLKIT v1.0 • ACCESS LEVEL: 5 (SUPERADMIN)
            </footer>
        </div>
    );
};
