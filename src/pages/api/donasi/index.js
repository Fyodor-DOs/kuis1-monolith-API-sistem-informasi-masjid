import pool from '@/config/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id_jamaah, jumlah, metode_pembayaran, tanggal } = req.body;

        if (!id_jamaah || !jumlah || !metode_pembayaran || !tanggal) {
            return res.status(400).json({ success: false, message: 'Semua field harus diisi' });
        }

        try {
            const [donasiResult] = await pool.query(
                'INSERT INTO donasi (id_jamaah, jumlah, metode_pembayaran, tanggal, status) VALUES (?, ?, ?, ?, ?)',
                [id_jamaah, jumlah, metode_pembayaran, tanggal, 'Sukses']
            );

            const donasiId = donasiResult.insertId;

            await pool.query(
                'INSERT INTO keuangan (jenis, jumlah, deskripsi, tanggal, id_takmir) VALUES (?, ?, ?, ?, ?)',
                ['Pemasukan', jumlah, `Donasi #${donasiId}`, tanggal, null]  
            );

            return res.status(201).json({
                success: true,
                message: 'Donasi berhasil disimpan dan masuk ke keuangan',
                donasiId
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan', error });
        }
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
