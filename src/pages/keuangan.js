import { useEffect, useState } from 'react';

export default function KeuanganPage() {
    const [keuangan, setKeuangan] = useState([]);
    const [filter, setFilter] = useState('Semua');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchKeuangan();
    }, []);

    const fetchKeuangan = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/keuangan');
            if (!res.ok) throw new Error('Gagal mengambil data');
            const data = await res.json();
            setKeuangan(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
            setKeuangan([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredKeuangan = keuangan.filter(item =>
        filter === 'Semua' ? true : item.jenis === filter
    );

    const totalJumlah = filteredKeuangan.reduce((acc, item) => acc + parseFloat(item.jumlah || 0), 0);

    return (
        <div>
            <h2>Data Keuangan</h2>
            <br />
            <label>Filter: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="Semua">Semua</option>
                <option value="Pemasukan">Pemasukan</option>
                <option value="Pengeluaran">Pengeluaran</option>
            </select>

            <button onClick={fetchKeuangan} style={{ marginLeft: '10px' }}>Refresh</button>

            {loading && <p>Memuat data...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h3>Total {filter}: Rp {totalJumlah.toLocaleString()}</h3>

            <table border="1" width="80%" style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Jenis</th>
                        <th>Jumlah</th>
                        <th>Deskripsi</th>
                        <th>Tanggal</th>
                        <th>ID Takmir</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredKeuangan.map((item) => (
                        <tr key={item.id_keuangan}>
                            <td>{item.id_keuangan}</td>
                            <td>{item.jenis}</td>
                            <td>Rp {parseFloat(item.jumlah || 0).toLocaleString()}</td>
                            <td>{item.deskripsi || '-'}</td>
                            <td>{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                            <td>{item.id_takmir || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
