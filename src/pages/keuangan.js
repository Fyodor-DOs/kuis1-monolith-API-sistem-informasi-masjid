import { useEffect, useState } from 'react';

export default function KeuanganPage() {
    const [keuangan, setKeuangan] = useState([]);
    const [filter, setFilter] = useState('Semua');

    useEffect(() => {
        fetchKeuangan();
    }, []);

    const fetchKeuangan = async () => {
        try {
            const res = await fetch('/api/keuangan');
            const data = await res.json();
            setKeuangan(data);
        } catch (error) {
            console.error('Gagal mengambil data', error);
        }
    };

    const filteredKeuangan = keuangan.filter(item =>
        filter === 'Semua' ? true : item.jenis === filter
    );

    const totalJumlah = filteredKeuangan.reduce((acc, item) => acc + parseFloat(item.jumlah), 0);

    return (
        <div>
            <h2>Data Keuangan</h2>
            <br></br>
            <label>Filter: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="Semua">Semua</option>
                <option value="Pemasukan">Pemasukan</option>
                <option value="Pengeluaran">Pengeluaran</option>
            </select>

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
                            <td>Rp {parseFloat(item.jumlah).toLocaleString()}</td>
                            <td>{item.deskripsi || '-'}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.id_takmir || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}