import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { adminService } from '../../services/adminService';

export default function StatsChart() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        adminService.getStatsHistory().then(setData).catch(console.error);
    }, []);

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="total_users" stroke="#4f46e5" strokeWidth={2} dot={{ fill: '#4f46e5' }} />
                <Line type="monotone" dataKey="total_analyses" stroke="#ec4899" strokeWidth={2} dot={{ fill: '#ec4899' }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
