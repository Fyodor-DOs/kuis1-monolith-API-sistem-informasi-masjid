import { useEffect, useState } from 'react';

export default function Kegiatan() {
    const [kegiatan, setKegiatan] = useState([]);

    useEffect(() => {
        fetchKegiatan();
    }, []);

    const fetchKegiatan = async () => {
        try {
            const res = await fetch('/api/kegiatan');
            const data = await res.json();
            setKegiatan(data);
        } catch (error) {
            console.error('Error fetching kegiatan:', error);
        }
    };

    return (
        <div>
            <h2>Daftar Kegiatan</h2>
            <br></br>
            <table width="80%">
                <thead>
                    <tr>
                        <th>Nama Kegiatan</th>
                        <th>Deskripsi</th>
                        <th>Tanggal</th>
                        <th>Waktu</th>
                        <th>Lokasi</th>
                        <th>ID Takmir</th>
                    </tr>
                </thead>
                <tbody>
                    {kegiatan.map((item) => (
                        <tr key={item.id_kegiatan}>
                            <td>{item.nama_kegiatan}</td>
                            <td>{item.deskripsi}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.waktu}</td>
                            <td>{item.lokasi}</td>
                            <td>{item.id_takmir}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
